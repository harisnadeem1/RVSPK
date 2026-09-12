import pool from "../config/db.js";
import { createPmexAccount } from "../services/pmexPlaywright.js";
import { sendDemoAccountEmail } from "../services/demoAccountEmail.js";

export const getDemoAccounts = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        id,
        first_name,
        last_name,
        email,
        phone,
        dummy_email,
        dummy_phone,
        pmex_login,
        pmex_password,
        status,
        created_at
      FROM demo_accounts
      ORDER BY created_at DESC
    `);

    return res.status(200).json({
      success: true,
      accounts: result.rows,
    });
  } catch (error) {
    console.error("Get demo accounts error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch demo accounts",
    });
  }
};


function generateRandomNumber() {
  return Array.from(
    { length: 10 },
    () => Math.floor(Math.random() * 10)
  ).join("");
}

export const createDemoAccount = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            phone
        } = req.body;

        if (!firstName || !lastName || !email || !phone) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        // 1. Store real customer details
        const result = await pool.query(
            `
            INSERT INTO demo_accounts
            (first_name, last_name, email, phone)
            VALUES ($1, $2, $3, $4)
            RETURNING *
            `,
            [
                firstName,
                lastName,
                email,
                phone
            ]
        );

        const customer = result.rows[0];

        // 2. Generate an alias tied to this database record
        const shortId = customer.id
            .replaceAll("-", "")
            .slice(0, 8);

        const cleanFirstName = firstName
            .toLowerCase()
            .replace(/[^a-z0-9]/g, "");

        const cleanLastName = lastName
            .toLowerCase()
            .replace(/[^a-z0-9]/g, "");

        const dummyEmail =
            `${cleanFirstName}.${cleanLastName}.${shortId}@gmail.com`;

        // Use an RVSPK-controlled/test number approved for this workflow
        const dummyPhone = generateRandomNumber();

        // 3. Save generated details
        await pool.query(
            `
            UPDATE demo_accounts
            SET
                dummy_email = $1,
                dummy_phone = $2
            WHERE id = $3
            `,
            [
                dummyEmail,
                dummyPhone,
                customer.id
            ]
        );

        // 4. Create PMEX account
        const pmex = await createPmexAccount({
            firstName,
            lastName,
            email: dummyEmail,
            phone: dummyPhone
        });

        // 5. Store PMEX credentials
        await pool.query(
            `
            UPDATE demo_accounts
            SET
                pmex_login = $1,
                pmex_password = $2,
                status = 'completed'
            WHERE id = $3
            `,
            [
                pmex.login,
                pmex.password,
                customer.id
            ]
        );

        // 6. Email credentials to REAL customer email
        await sendDemoAccountEmail({
            email,
            firstName,
            login: pmex.login,
            password: pmex.password
        });

        return res.json({
            success: true,
            message:
                "Demo account created. Credentials have been sent to your email."
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message:
                "Unable to create demo account"
        });
    }
};
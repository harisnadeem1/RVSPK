import pool from '../config/db.js';
import transporter from '../config/mailer.js';


// ==========================================
// PUBLIC NEWSWIRE SUBSCRIBE
// ==========================================

export const subscribeToNewswire = async (req, res) => {
  try {
    let { email, phone } = req.body;

    // Clean inputs
    email = email?.trim().toLowerCase();
    phone = phone?.trim();


    // ==========================================
    // VALIDATION
    // ==========================================

    // Public form requires both fields
    if (!email || !phone) {
      return res.status(400).json({
        message: 'Email and phone number are required.',
      });
    }


    // Validate email
    const emailRegex =
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: 'Please enter a valid email address.',
      });
    }


    // Phone must contain digits only
    const phoneRegex = /^\d+$/;

    if (!phoneRegex.test(phone)) {
      return res.status(400).json({
        message: 'Phone number must contain digits only.',
      });
    }


    // Phone length validation
    if (phone.length < 7 || phone.length > 15) {
      return res.status(400).json({
        message:
          'Phone number must be between 7 and 15 digits.',
      });
    }


    // ==========================================
    // CHECK EXISTING SUBSCRIBER
    // ==========================================

    const existing = await pool.query(
      `
        SELECT
          id,
          email,
          phone,
          is_active
        FROM newswire_subscribers
        WHERE LOWER(email) = LOWER($1)
        LIMIT 1
      `,
      [email]
    );


    if (existing.rows.length > 0) {
      const subscriber = existing.rows[0];


      // ==========================================
      // REACTIVATE DISABLED SUBSCRIBER
      // ==========================================

      if (!subscriber.is_active) {
        await pool.query(
          `
            UPDATE newswire_subscribers
            SET
              phone = $1,
              is_active = TRUE,
              updated_at = CURRENT_TIMESTAMP
            WHERE id = $2
          `,
          [
            phone,
            subscriber.id,
          ]
        );
      }


      // Already subscribed users do NOT trigger
      // another notification email
      return res.status(200).json({
        success: true,
        alreadySubscribed: true,
        message:
          'You are already subscribed to Daily Newswire.',
      });
    }


    // ==========================================
    // CREATE NEW SUBSCRIBER
    // ==========================================

    const result = await pool.query(
      `
        INSERT INTO newswire_subscribers
          (
            email,
            phone,
            source
          )
        VALUES
          (
            $1,
            $2,
            'website'
          )
        RETURNING *
      `,
      [
        email,
        phone,
      ]
    );


    const newSubscriber = result.rows[0];


    // ==========================================
    // RESPOND TO USER IMMEDIATELY
    // ==========================================

    res.status(201).json({
      success: true,
      subscriber: newSubscriber,
      message:
        'Successfully subscribed to Daily Newswire.',
    });


    // ==========================================
    // NOTIFY RVSPK IN BACKGROUND
    // ==========================================

    transporter.sendMail({
      from:
        `"RVSPK Website" <${process.env.GMAIL_USER}>`,

      to: 'hello@rvspk.com',

      subject: 'New Daily Newswire Subscriber',

      html: `
        <div
          style="
            font-family: Arial, Helvetica, sans-serif;
            max-width: 600px;
            margin: 0 auto;
            color: #222222;
          "
        >

          <!-- Header -->

          <div
            style="
              border-bottom: 3px solid #79AD14;
              padding-bottom: 15px;
              margin-bottom: 25px;
            "
          >

            <h2
              style="
                margin: 0;
                color: #79AD14;
                font-size: 22px;
              "
            >
              New Daily Newswire Subscriber
            </h2>

          </div>


          <!-- Message -->

          <p
            style="
              font-size: 14px;
              line-height: 1.6;
              color: #444444;
            "
          >
            A new user has subscribed to the
            <strong>Daily Newswire</strong>
            through the RVSPK website.
          </p>


          <!-- Subscriber Information -->

          <div
            style="
              margin-top: 20px;
              padding: 18px;
              background: #f7f7f7;
              border: 1px solid #eeeeee;
              border-radius: 8px;
            "
          >

            <p
              style="
                margin: 0 0 12px 0;
                font-size: 14px;
              "
            >
              <strong>Email:</strong>
              ${email}
            </p>


            <p
              style="
                margin: 0 0 12px 0;
                font-size: 14px;
              "
            >
              <strong>Phone:</strong>
              ${phone}
            </p>


            <p
              style="
                margin: 0;
                font-size: 14px;
              "
            >
              <strong>Source:</strong>
              Website
            </p>

          </div>


          <!-- Footer -->

          <p
            style="
              margin-top: 25px;
              font-size: 12px;
              line-height: 1.5;
              color: #888888;
            "
          >
            This is an automated notification from the
            Right Vision Securities website.
          </p>


          <p
            style="
              margin-top: 10px;
              font-size: 12px;
              color: #888888;
            "
          >
            Right Vision Securities (Private) Limited
          </p>

        </div>
      `,
    })
    .then(() => {
      console.log(
        `Newswire subscription notification sent for: ${email}`
      );
    })
    .catch((mailError) => {
      // Notification failure does NOT affect
      // the user's subscription
      console.error(
        `Newswire notification email failed for ${email}:`,
        mailError.message
      );
    });


  } catch (error) {
    console.error(
      'Newswire subscription error:',
      error
    );


    // Prevent trying to send another response
    // if response was already returned
    if (!res.headersSent) {
      return res.status(500).json({
        message:
          'Unable to subscribe. Please try again.',
      });
    }
  }
};
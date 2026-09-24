import pool from '../config/db.js';
import transporter from '../config/mailer.js';

// ==========================================
// HTML ESCAPE HELPER
// ==========================================

const escapeHtml = (value = '') =>
  String(value).replace(
    /[&<>"']/g,
    (char) =>
      ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
      })[char]
  );

// ==========================================
// PUBLIC NEWSWIRE SUBSCRIBE
// ==========================================

export const subscribeToNewswire = async (req, res) => {
  try {

    // ==========================================
    // GET AND CLEAN INPUTS
    // ==========================================

    let { name, email, phone } = req.body ?? {};

    name =
      typeof name === 'string'
        ? name.trim().replace(/\s+/g, ' ')
        : '';

    email =
      typeof email === 'string'
        ? email.trim().toLowerCase()
        : '';

    phone =
      typeof phone === 'string'
        ? phone.trim()
        : '';

    // ==========================================
    // VALIDATION
    // ==========================================

    if (!name || !email || !phone) {
      return res.status(400).json({
        success: false,
        message:
          'Full name, email and phone number are required.',
      });
    }

    // Validate name

    if (name.length < 2 || name.length > 120) {
      return res.status(400).json({
        success: false,
        message:
          'Full name must be between 2 and 120 characters.',
      });
    }

    // Validate email

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email) || email.length > 255) {
      return res.status(400).json({
        success: false,
        message:
          'Please enter a valid email address.',
      });
    }

    // Validate phone

    const phoneRegex = /^\d{7,15}$/;

    if (!phoneRegex.test(phone)) {
      return res.status(400).json({
        success: false,
        message:
          'Phone number must contain 7 to 15 digits.',
      });
    }

    // ==========================================
    // CHECK EXISTING SUBSCRIBER
    // ==========================================

    const existing = await pool.query(
      `
        SELECT
          id,
          name,
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

      // ========================================
      // REACTIVATE INACTIVE SUBSCRIBER
      // ========================================

      if (!subscriber.is_active) {

        const updated = await pool.query(
          `
            UPDATE newswire_subscribers
            SET
              name = $1,
              phone = $2,
              is_active = TRUE,
              updated_at = CURRENT_TIMESTAMP
            WHERE id = $3
            RETURNING
              id,
              name,
              email,
              phone,
              is_active
          `,
          [
            name,
            phone,
            subscriber.id,
          ]
        );

        return res.status(200).json({
          success: true,
          reactivated: true,
          alreadySubscribed: false,
          subscriber: updated.rows[0],
          message:
            'Your Daily Newswire subscription has been reactivated.',
        });

      }

      // ========================================
      // EXISTING ACTIVE SUBSCRIBER
      // ========================================

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
            name,
            email,
            phone,
            source
          )
        VALUES
          (
            $1,
            $2,
            $3,
            'website'
          )
        ON CONFLICT DO NOTHING
        RETURNING
          id,
          name,
          email,
          phone,
          source,
          is_active,
          created_at
      `,
      [
        name,
        email,
        phone,
      ]
    );

    // Handle concurrent duplicate subscriptions.

    if (result.rows.length === 0) {
      return res.status(200).json({
        success: true,
        alreadySubscribed: true,
        message:
          'This email is already registered. Please refresh and try again if you need to reactivate your subscription.',
      });
    }

    const newSubscriber = result.rows[0];

    // ==========================================
    // RESPOND TO USER
    // ==========================================

    res.status(201).json({
      success: true,
      alreadySubscribed: false,
      subscriber: newSubscriber,
      message:
        'Successfully subscribed to Daily Newswire.',
    });

    // ==========================================
    // NOTIFY RVSPK
    // ==========================================

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safePhone = escapeHtml(phone);

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

          <!-- HEADER -->

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

          <!-- MESSAGE -->

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

          <!-- SUBSCRIBER INFORMATION -->

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
              <strong>Full Name:</strong>
              ${safeName}
            </p>

            <p
              style="
                margin: 0 0 12px 0;
                font-size: 14px;
              "
            >
              <strong>Email:</strong>
              ${safeEmail}
            </p>

            <p
              style="
                margin: 0 0 12px 0;
                font-size: 14px;
              "
            >
              <strong>Phone:</strong>
              ${safePhone}
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

          <!-- FOOTER -->

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
          `Newswire notification sent for subscriber ID: ${newSubscriber.id}`
        );
      })
      .catch((mailError) => {
        console.error(
          'Newswire notification email failed:',
          mailError.message
        );
      });

  } catch (error) {

    console.error(
      'Newswire subscription error:',
      error
    );

    if (error.code === '23505') {
      return res.status(409).json({
        success: false,
        message:
          'This email is already registered.',
      });
    }

    if (!res.headersSent) {
      return res.status(500).json({
        success: false,
        message:
          'Unable to subscribe. Please try again.',
      });
    }

  }
};
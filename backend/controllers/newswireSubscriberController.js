import pool from '../config/db.js';
import transporter from '../config/mailer.js';
import { sendDiscordNotification } from "../utils/discordNotifier.js";

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

  void sendDiscordNotification({
  type: "Daily Newswire Subscription",
  name: newSubscriber.name,
  email: newSubscriber.email,
  phone: newSubscriber.phone,
  details: `Subscriber ID: ${newSubscriber.id}`,
});

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

      
    // ==========================================
    // SEND WELCOME EMAIL TO THE SUBSCRIBER
    // ==========================================

  
transporter
  .sendMail({
    from: `"Right Vision Securities" <${process.env.GMAIL_USER}>`,
    to: newSubscriber.email,
    subject:
      "Welcome to Right Vision Group of Companies | Daily Newswire Subscription",

    html: `
      <div
        style="
          font-family: Arial, Helvetica, sans-serif;
          max-width: 600px;
          margin: 0 auto;
          padding: 24px;
          color: #222222;
          line-height: 1.7;
        "
      >
        <div
          style="
            border-bottom: 3px solid #79AD14;
            padding-bottom: 16px;
            margin-bottom: 24px;
          "
        >
          <h2
            style="
              margin: 0;
              color: #466601;
              font-size: 23px;
              line-height: 1.4;
            "
          >
            Welcome to Right Vision Group of Companies
          </h2>
        </div>

        <p style="font-size: 15px; margin-bottom: 18px;">
          Dear Sir/Madam,
        </p>

        <p style="font-size: 14px; color: #444444;">
          We feel immense pleasure to welcome you warmly for your interest
          in subscribing to <strong>Daily Newswire</strong>, published by
          the Research, Training and Development Team of Right Vision
          Securities (Private) Limited (The Company).
        </p>

        <p style="font-size: 14px; color: #444444;">
          The Company aims to keep the investors well-informed about the
          global market trends and the latest geopolitical issues and events.
          Hence, as a first step in building a long lasting relationship
          with our valued subscribers, our team shall be delighted to
          contact you shortly.
        </p>

        <p style="font-size: 14px; color: #444444;">
          You may feel free to reply directly to this email if you have
          any question or clarification.
        </p>

        <p style="font-size: 14px; color: #444444;">
          We shall appreciate your feedback and suggestions for the
          improvement of the Website and Daily Newswire.
        </p>

        <div
          style="
            margin-top: 28px;
            padding-top: 20px;
            border-top: 1px solid #eeeeee;
          "
        >
          <p style="font-size: 14px; margin: 0 0 5px;">
            Kindest regards,
          </p>

          <p
            style="
              font-size: 14px;
              font-weight: bold;
              color: #466601;
              margin: 0;
            "
          >
            Customer Support, Marketing, Research &amp; Training Department
          </p>

          <p
            style="
              font-size: 14px;
              font-weight: bold;
              margin: 4px 0 16px;
            "
          >
            Right Vision Securities (Pvt.) Limited
          </p>

          <p style="font-size: 13px; color: #555555; margin: 5px 0;">
            74-R, GCP Society, Johar Town, Lahore
          </p>

          <p style="font-size: 13px; color: #555555; margin: 5px 0;">
            <strong>Landline #:</strong>
            <a
              href="tel:04235191194"
              style="color: #466601; text-decoration: none;"
            >042-35191194</a>;
            <a
              href="tel:04235191188"
              style="color: #466601; text-decoration: none;"
            >042-35191188</a>
          </p>

          <p style="font-size: 13px; color: #555555; margin: 5px 0;">
            <strong>WhatsApp #:</strong>
            <a
              href="https://wa.me/923108248717"
              style="color: #466601; text-decoration: none;"
            >0310-8248717</a>;
            <a
              href="https://wa.me/923108214202"
              style="color: #466601; text-decoration: none;"
            >03108214202</a>
          </p>

          <p style="font-size: 13px; color: #555555; margin: 5px 0;">
            <strong>Email Add.:</strong>
            <a
              href="mailto:hello@rvspk.com"
              style="color: #466601; text-decoration: none;"
            >hello@rvspk.com</a>
          </p>

          <p style="font-size: 13px; color: #555555; margin: 5px 0;">
            <strong>Website:</strong>
            <a
              href="https://www.rvspk.com"
              target="_blank"
              style="color: #466601; text-decoration: none;"
            >www.rvspk.com</a>
          </p>
        </div>

        <div
          style="
            margin-top: 24px;
            padding: 16px;
            background-color: #f8faf5;
            border: 1px solid #dce7cd;
            border-left: 4px solid #79AD14;
          "
        >
          <h3
            style="
              margin: 0 0 10px;
              color: #466601;
              font-size: 14px;
            "
          >
            RISK DISCLOSURE
          </h3>

          <p
            style="
              margin: 0;
              font-size: 12px;
              line-height: 1.7;
              color: #444444;
              font-style: italic;
            "
          >
            It is imperative to inform you that the Company does not
            provide advisory services. Be cautious that Future Trading
            in Commodities involve substantial leverage and risk.
            Hence, seek an independent professional financial advisor
            for trading strategies. Always use protective risk controls,
            independent judgment and disciplined position sizing.
            Past performance is not an indicate of future success.
            Responsibility of loss of money could not be imposed on
            the Company.
          </p>
        </div>
      </div>
    `,
  })
  .then(() => {
    console.log(
      `Newswire welcome email sent to subscriber ID: ${newSubscriber.id}`
    );
  })
  .catch((mailError) => {
    console.error(
      "Newswire welcome email failed:",
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
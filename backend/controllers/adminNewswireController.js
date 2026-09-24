import pool from '../config/db.js';
import transporter from '../config/mailer.js';

// ==========================================
// HELPERS
// ==========================================

const sleep = (ms) =>
  new Promise((resolve) => setTimeout(resolve, ms));

// Prevent HTML injection in email templates
const escapeHtml = (value = '') => {
  return String(value).replace(
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
};


// ==========================================
// GET ALL SUBSCRIBERS
// ==========================================

export const getSubscribers = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        id,
        name,
        email,
        phone,
        source,
        is_active,
        created_at,
        updated_at
      FROM newswire_subscribers
      ORDER BY created_at DESC
    `);

    return res.status(200).json({
      success: true,
      subscribers: result.rows,
    });

  } catch (error) {
    console.error(
      'Get subscribers error:',
      error
    );

    return res.status(500).json({
      success: false,
      message: 'Failed to fetch subscribers.',
    });
  }
};


// ==========================================
// ADMIN ADD SUBSCRIBER
// ==========================================

export const addSubscriber = async (req, res) => {
  try {
    let { name, email, phone } = req.body ?? {};

    // ========================================
    // CLEAN INPUTS
    // ========================================

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

    // ========================================
    // REQUIRED VALIDATION
    // ========================================

    // Name and email are required.
    // Phone remains optional for admins.

    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message:
          'Full name and email address are required.',
      });
    }

    // ========================================
    // NAME VALIDATION
    // ========================================

    if (name.length < 2 || name.length > 120) {
      return res.status(400).json({
        success: false,
        message:
          'Full name must be between 2 and 120 characters.',
      });
    }

    // ========================================
    // EMAIL VALIDATION
    // ========================================

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
      !emailRegex.test(email) ||
      email.length > 255
    ) {
      return res.status(400).json({
        success: false,
        message:
          'Please enter a valid email address.',
      });
    }

    // ========================================
    // PHONE VALIDATION
    // ========================================

    // Phone is optional for admin-added subscribers.
    // If provided, allow an optional + followed
    // by 7 to 15 digits.

    const phoneRegex = /^\+?\d{7,15}$/;

    if (phone && !phoneRegex.test(phone)) {
      return res.status(400).json({
        success: false,
        message:
          'Phone number must contain 7 to 15 digits.',
      });
    }

    // ========================================
    // CHECK EXISTING SUBSCRIBER
    // ========================================

    const existing = await pool.query(
      `
        SELECT
          id,
          name,
          email,
          is_active
        FROM newswire_subscribers
        WHERE LOWER(email) = LOWER($1)
        LIMIT 1
      `,
      [email]
    );

    if (existing.rows.length > 0) {
      return res.status(409).json({
        success: false,
        message:
          'This email is already subscribed.',
      });
    }

    // ========================================
    // CREATE NEW SUBSCRIBER
    // ========================================

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
            'admin'
          )
        RETURNING
          id,
          name,
          email,
          phone,
          source,
          is_active,
          created_at,
          updated_at
      `,
      [
        name,
        email,
        phone || null,
      ]
    );

    const newSubscriber = result.rows[0];

    return res.status(201).json({
      success: true,
      message:
        'Subscriber added successfully.',
      subscriber: newSubscriber,
    });

  } catch (error) {
    console.error(
      'Add subscriber error:',
      error
    );

    // Handle concurrent duplicate requests.

    if (error.code === '23505') {
      return res.status(409).json({
        success: false,
        message:
          'This email is already subscribed.',
      });
    }

    return res.status(500).json({
      success: false,
      message:
        'Failed to add subscriber.',
    });
  }
};


// ==========================================
// ENABLE / DISABLE SUBSCRIBER
// ==========================================

export const updateSubscriberStatus = async (
  req,
  res
) => {
  try {
    const { id } = req.params;
    const { is_active } = req.body ?? {};

    // ========================================
    // VALIDATION
    // ========================================

    if (typeof is_active !== 'boolean') {
      return res.status(400).json({
        success: false,
        message: 'Invalid status.',
      });
    }

    // ========================================
    // UPDATE STATUS
    // ========================================

    const result = await pool.query(
      `
        UPDATE newswire_subscribers
        SET
          is_active = $1,
          updated_at = CURRENT_TIMESTAMP
        WHERE id = $2
        RETURNING
          id,
          name,
          email,
          phone,
          source,
          is_active,
          created_at,
          updated_at
      `,
      [
        is_active,
        id,
      ]
    );

    if (!result.rows.length) {
      return res.status(404).json({
        success: false,
        message:
          'Subscriber not found.',
      });
    }

    return res.status(200).json({
      success: true,
      message:
        'Subscriber updated successfully.',
      subscriber: result.rows[0],
    });

  } catch (error) {
    console.error(
      'Update subscriber error:',
      error
    );

    return res.status(500).json({
      success: false,
      message:
        'Failed to update subscriber.',
    });
  }
};


// ==========================================
// DELETE SUBSCRIBER
// ==========================================

export const deleteSubscriber = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `
        DELETE FROM newswire_subscribers
        WHERE id = $1
        RETURNING id
      `,
      [id]
    );

    if (!result.rows.length) {
      return res.status(404).json({
        success: false,
        message:
          'Subscriber not found.',
      });
    }

    return res.status(200).json({
      success: true,
      message:
        'Subscriber removed successfully.',
    });

  } catch (error) {
    console.error(
      'Delete subscriber error:',
      error
    );

    return res.status(500).json({
      success: false,
      message:
        'Failed to remove subscriber.',
    });
  }
};


// ==========================================
// SEND DAILY NEWSWIRE
// ==========================================

export const sendDailyNewswire = async (
  req,
  res
) => {
  try {
    const {
      subject,
      message,
      pdfUrl,
    } = req.body ?? {};

    // ========================================
    // REQUIRED VALIDATION
    // ========================================

    if (
      typeof subject !== 'string' ||
      !subject.trim() ||
      typeof pdfUrl !== 'string' ||
      !pdfUrl.trim()
    ) {
      return res.status(400).json({
        success: false,
        message:
          'Subject and Newswire PDF URL are required.',
      });
    }

    if (
      message !== undefined &&
      message !== null &&
      typeof message !== 'string'
    ) {
      return res.status(400).json({
        success: false,
        message:
          'Message must be text.',
      });
    }

    // ========================================
    // VALIDATE PDF URL
    // ========================================

    let validPdfUrl;

    try {
      const parsedUrl = new URL(
        pdfUrl.trim()
      );

      if (
        !['https:', 'http:'].includes(
          parsedUrl.protocol
        )
      ) {
        throw new Error(
          'Invalid PDF URL protocol.'
        );
      }

      validPdfUrl = parsedUrl.href;

    } catch {
      return res.status(400).json({
        success: false,
        message:
          'Please provide a valid absolute HTTP or HTTPS PDF URL.',
      });
    }

    // ========================================
    // PREPARE EMAIL CONTENT
    // ========================================

    const cleanSubject = subject.trim();

    const cleanMessage =
      typeof message === 'string' &&
      message.trim()
        ? message.trim()
        : "Today's Daily Newswire from Right Vision Securities is now available.";

    // Escape HTML to prevent HTML injection.

    const safeMessage = escapeHtml(
      cleanMessage
    ).replace(/\r?\n/g, '<br />');

    const safePdfUrl = escapeHtml(
      validPdfUrl
    );

    // ========================================
    // GET ACTIVE SUBSCRIBERS
    // ========================================

    const result = await pool.query(`
      SELECT
        id,
        name,
        email
      FROM newswire_subscribers
      WHERE is_active = TRUE
      ORDER BY id ASC
    `);

    const subscribers = result.rows;

    if (!subscribers.length) {
      return res.status(400).json({
        success: false,
        message:
          'There are no active subscribers.',
      });
    }

    // ========================================
    // RESPOND TO ADMIN IMMEDIATELY
    // ========================================

    res.status(202).json({
      success: true,
      message:
        `Daily Newswire sending started for ${subscribers.length} subscribers.`,
      total: subscribers.length,
    });

    // ========================================
    // BACKGROUND EMAIL SENDING
    // ========================================

    void (async () => {

      const BATCH_SIZE = 10;
      const BATCH_DELAY = 2000;

      let sent = 0;
      let failed = 0;

      console.log(
        `Newswire sending started for ${subscribers.length} subscribers.`
      );

      // ======================================
      // PROCESS SUBSCRIBERS IN BATCHES
      // ======================================

      for (
        let i = 0;
        i < subscribers.length;
        i += BATCH_SIZE
      ) {

        const batch = subscribers.slice(
          i,
          i + BATCH_SIZE
        );

        // ====================================
        // SEND INDIVIDUAL EMAILS
        // ====================================

        for (const subscriber of batch) {
          try {

            // ==================================
            // PERSONALIZED SUBSCRIBER NAME
            // ==================================

            // Existing subscribers may not
            // have names in the database.

            const subscriberName =
              typeof subscriber.name === 'string' &&
              subscriber.name.trim()
                ? escapeHtml(
                    subscriber.name.trim()
                  )
                : 'Subscriber';

            // ==================================
            // SEND EMAIL
            // ==================================

            await transporter.sendMail({

              from:
                `"Right Vision Securities" <${process.env.GMAIL_USER}>`,

              to: subscriber.email,

              subject: cleanSubject,

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
                      Daily Newswire
                    </h2>

                  </div>


                  <!-- PERSONALIZED GREETING -->

                  <p
                    style="
                      font-size: 15px;
                      line-height: 1.6;
                      margin-bottom: 18px;
                    "
                  >
                    Dear ${subscriberName},
                  </p>


                  <!-- MESSAGE -->

                  <p
                    style="
                      font-size: 14px;
                      line-height: 1.8;
                      color: #444444;
                    "
                  >
                    ${safeMessage}
                  </p>


                  <!-- PDF BUTTON -->

                  <div
                    style="
                      margin: 30px 0;
                    "
                  >

                    <a
                      href="${safePdfUrl}"
                      target="_blank"
                      rel="noopener noreferrer"
                      style="
                        display: inline-block;
                        background: #79AD14;
                        color: #ffffff;
                        padding: 13px 24px;
                        text-decoration: none;
                        border-radius: 6px;
                        font-size: 14px;
                        font-weight: bold;
                      "
                    >
                      View Daily Newswire
                    </a>

                  </div>


                  <!-- FOOTER -->

                  <div
                    style="
                      margin-top: 30px;
                      border-top: 1px solid #eeeeee;
                      padding-top: 18px;
                    "
                  >

                    <p
                      style="
                        margin: 0;
                        font-size: 12px;
                        line-height: 1.6;
                        color: #777777;
                      "
                    >
                      Right Vision Securities
                      (Private) Limited
                    </p>

                    <p
                      style="
                        margin-top: 10px;
                        font-size: 11px;
                        line-height: 1.6;
                        color: #999999;
                      "
                    >
                      This is an automated email
                      from Right Vision Securities.
                    </p>

                  </div>

                </div>
              `,

            });

            // ==================================
            // SUCCESS
            // ==================================

            sent++;

            console.log(
              `Newswire sent to ${subscriber.email}`
            );

          } catch (mailError) {

            // ==================================
            // FAILURE
            // ==================================

            failed++;

            console.error(
              `Newswire failed for ${subscriber.email}:`,
              mailError.message
            );

          }
        }

        // ====================================
        // BATCH PROGRESS
        // ====================================

        console.log(
          `Newswire progress: ${sent} sent, ${failed} failed`
        );

        // ====================================
        // DELAY BEFORE NEXT BATCH
        // ====================================

        if (
          i + BATCH_SIZE <
          subscribers.length
        ) {
          await sleep(BATCH_DELAY);
        }
      }

      // ======================================
      // FINAL REPORT
      // ======================================

      console.log(
        `Newswire completed. Total: ${subscribers.length}, Sent: ${sent}, Failed: ${failed}`
      );

    })().catch((error) => {

      console.error(
        'Background Newswire sending error:',
        error
      );

    });

  } catch (error) {

    console.error(
      'Send Newswire error:',
      error
    );

    if (!res.headersSent) {
      return res.status(500).json({
        success: false,
        message:
          'Failed to start Daily Newswire sending.',
      });
    }
  }
};
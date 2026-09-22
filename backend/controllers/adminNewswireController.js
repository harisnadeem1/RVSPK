import pool from '../config/db.js';
import transporter from '../config/mailer.js';

const sleep = (ms) =>
  new Promise((resolve) => setTimeout(resolve, ms));


// GET ALL
export const getSubscribers = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        id,
        email,
        phone,
        source,
        is_active,
        created_at,
        updated_at
      FROM newswire_subscribers
      ORDER BY created_at DESC
    `);

    res.json({
      subscribers: result.rows,
    });

  } catch (error) {
    console.error('Get subscribers error:', error);

    res.status(500).json({
      message: 'Failed to fetch subscribers.',
    });
  }
};


// ADMIN ADD
export const addSubscriber = async (req, res) => {
  try {
    let { email, phone } = req.body;

    email = email?.trim().toLowerCase();
    phone = phone?.trim() || null;

    // Admin only requires email
    if (!email) {
      return res.status(400).json({
        message: 'Email is required.',
      });
    }

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: 'Please enter a valid email.',
      });
    }

    const existing = await pool.query(
      `
      SELECT id
      FROM newswire_subscribers
      WHERE LOWER(email) = LOWER($1)
      `,
      [email]
    );

    if (existing.rows.length > 0) {
      return res.status(409).json({
        message: 'This email is already subscribed.',
      });
    }

    const result = await pool.query(
      `
      INSERT INTO newswire_subscribers
        (email, phone, source)
      VALUES
        ($1, $2, 'admin')
      RETURNING *
      `,
      [email, phone]
    );

    res.status(201).json({
      message: 'Subscriber added successfully.',
      subscriber: result.rows[0],
    });

  } catch (error) {
    console.error('Add subscriber error:', error);

    res.status(500).json({
      message: 'Failed to add subscriber.',
    });
  }
};


// ENABLE / DISABLE
export const updateSubscriberStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { is_active } = req.body;

    if (typeof is_active !== 'boolean') {
      return res.status(400).json({
        message: 'Invalid status.',
      });
    }

    const result = await pool.query(
      `
      UPDATE newswire_subscribers
      SET
        is_active = $1,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $2
      RETURNING *
      `,
      [is_active, id]
    );

    if (!result.rows.length) {
      return res.status(404).json({
        message: 'Subscriber not found.',
      });
    }

    res.json({
      message: 'Subscriber updated.',
      subscriber: result.rows[0],
    });

  } catch (error) {
    console.error('Update subscriber error:', error);

    res.status(500).json({
      message: 'Failed to update subscriber.',
    });
  }
};


// DELETE
export const deleteSubscriber = async (req, res) => {
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
        message: 'Subscriber not found.',
      });
    }

    res.json({
      message: 'Subscriber removed successfully.',
    });

  } catch (error) {
    console.error('Delete subscriber error:', error);

    res.status(500).json({
      message: 'Failed to remove subscriber.',
    });
  }
};


export const sendDailyNewswire = async (req, res) => {
  try {
    const {
      subject,
      message,
      pdfUrl,
    } = req.body;

    if (!subject || !pdfUrl) {
      return res.status(400).json({
        message:
          'Subject and Newswire PDF URL are required.',
      });
    }

    // Get active subscribers
    const result = await pool.query(`
      SELECT id, email
      FROM newswire_subscribers
      WHERE is_active = TRUE
      ORDER BY id ASC
    `);

    const subscribers = result.rows;

    if (!subscribers.length) {
      return res.status(400).json({
        message:
          'There are no active subscribers.',
      });
    }

    // ==========================================
    // RESPOND TO ADMIN IMMEDIATELY
    // ==========================================

    res.status(202).json({
      success: true,
      message: `Daily Newswire is being sent to ${subscribers.length} subscribers in the background.`,
      total: subscribers.length,
    });

    // ==========================================
    // BACKGROUND EMAIL SENDING
    // ==========================================

    // Do NOT await this from the HTTP request.
    void (async () => {
      const BATCH_SIZE = 10;
      const BATCH_DELAY = 2000;

      let sent = 0;
      let failed = 0;

      console.log(
        `Newswire sending started for ${subscribers.length} subscribers.`
      );

      for (
        let i = 0;
        i < subscribers.length;
        i += BATCH_SIZE
      ) {
        const batch = subscribers.slice(
          i,
          i + BATCH_SIZE
        );

        for (const subscriber of batch) {
          try {
            await transporter.sendMail({
              from:
                `"Right Vision Securities" <${process.env.GMAIL_USER}>`,

              to: subscriber.email,

              subject,

              html: `
                <div style="
                  font-family: Arial, sans-serif;
                  max-width: 600px;
                  margin: auto;
                  color: #222;
                ">

                  <h2 style="color:#79AD14;">
                    Daily Newswire
                  </h2>

                  <p>
                    Dear Subscriber,
                  </p>

                  <p>
                    ${
                      message ||
                      "Today's Daily Newswire from Right Vision Securities is now available."
                    }
                  </p>

                  <p style="margin:25px 0;">
                    <a
                      href="${pdfUrl}"
                      style="
                        display:inline-block;
                        background:#79AD14;
                        color:#ffffff;
                        padding:12px 20px;
                        text-decoration:none;
                        border-radius:6px;
                        font-weight:bold;
                      "
                    >
                      View Daily Newswire
                    </a>
                  </p>

                  <p style="
                    font-size:12px;
                    color:#777;
                  ">
                    Right Vision Securities
                    (Private) Limited
                  </p>

                </div>
              `,
            });

            sent++;

            console.log(
              `Newswire sent to ${subscriber.email}`
            );

          } catch (mailError) {
            failed++;

            console.error(
              `Newswire failed for ${subscriber.email}:`,
              mailError.message
            );
          }
        }

        console.log(
          `Newswire progress: ${sent} sent, ${failed} failed`
        );

        // Delay before next batch
        if (
          i + BATCH_SIZE <
          subscribers.length
        ) {
          await sleep(BATCH_DELAY);
        }
      }

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

    // Only respond if response hasn't already been sent
    if (!res.headersSent) {
      res.status(500).json({
        message:
          'Failed to start Daily Newswire sending.',
      });
    }
  }
};
import transporter from '../config/mailer.js';

const PMEX_URL = 'https://demotrade.pmex.com.pk/terminal';

const escapeHtml = (value = '') =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');

export const sendDemoAccountEmail = async ({
  email,
  firstName,
  login,
  password,
}) => {
  const name = escapeHtml(firstName);
  const safeLogin = escapeHtml(login);
  const safePassword = escapeHtml(password);

  const text = `
Dear ${firstName},

Your PMEX demo account has been created.

Login: ${login}
Password: ${password}

Login here: ${PMEX_URL}

1. Enter your Login and Password.
2. Click "Connect to account".

Keep your credentials secure and do not share your password.

Need help?
hello@rvspk.com
+92 310 8248717

Right Vision Securities (Pvt.) Limited
  `.trim();

  const html = `
<!doctype html>
<html>
  <body style="margin:0;padding:24px;background:#f6f7f9;font-family:Arial,sans-serif;color:#1f2937;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
      <tr>
        <td align="center">
          <table
            role="presentation"
            width="600"
            cellspacing="0"
            cellpadding="0"
            border="0"
            style="width:100%;max-width:600px;background:#fff;border:1px solid #e5e7eb;border-radius:14px;overflow:hidden;"
          >
            <!-- Header -->
            <tr>
              <td align="center" style="padding:32px 24px;background:#0f172a;border-bottom:4px solid #d4a72c;">
                <p style="margin:0 0 8px;color:#d4a72c;font-size:11px;font-weight:bold;letter-spacing:2px;">
                  RIGHT VISION SECURITIES
                </p>
                <h1 style="margin:0;color:#fff;font-size:26px;">
                  Your PMEX Demo Account
                </h1>
                <p style="margin:10px 0 0;color:#cbd5e1;font-size:14px;">
                  Your trading credentials are ready.
                </p>
              </td>
            </tr>

            <!-- Greeting -->
            <tr>
              <td style="padding:30px 28px 18px;">
                <p style="margin:0 0 12px;font-size:16px;">
                  Dear ${name},
                </p>
                <p style="margin:0;color:#4b5563;font-size:15px;line-height:1.6;">
                  Your PMEX demo trading account has been created successfully.
                  Use the credentials below to access the demo trading terminal.
                </p>
              </td>
            </tr>

            <!-- Credentials -->
            <tr>
              <td style="padding:0 28px 20px;">
                <div style="border:1px solid #ead99c;border-radius:10px;overflow:hidden;background:#fffbeb;">
                  <p style="margin:0;padding:14px 16px;background:#fff7d6;color:#8a6512;font-size:12px;font-weight:bold;letter-spacing:1px;">
                    DEMO TRADING CREDENTIALS
                  </p>

                  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="padding:10px 16px;">
                    <tr>
                      <td style="padding:10px 0;color:#6b7280;font-size:14px;">Login</td>
                      <td align="right" style="padding:10px 0;color:#111827;font-size:14px;font-weight:bold;">
                        ${safeLogin}
                      </td>
                    </tr>
                    <tr>
                      <td style="padding:10px 0;color:#6b7280;font-size:14px;">Password</td>
                      <td align="right" style="padding:10px 0;color:#111827;font-size:14px;font-weight:bold;">
                        ${safePassword}
                      </td>
                    </tr>
                    
                  </table>
                </div>
              </td>
            </tr>

            <!-- Login Instructions -->
            <tr>
              <td style="padding:0 28px 24px;">
                <div style="padding:20px;border:1px solid #e2e8f0;border-radius:10px;background:#f8fafc;">
                  <p style="margin:0 0 8px;color:#b88713;font-size:12px;font-weight:bold;letter-spacing:1px;">
                    HOW TO LOG IN
                  </p>

                  <h2 style="margin:0 0 12px;color:#0f172a;font-size:20px;">
                    Access your PMEX demo terminal
                  </h2>

                  <p style="margin:0 0 16px;color:#475569;font-size:14px;line-height:1.6;">
                    Open the demo terminal, enter your credentials, and click
                    <strong>“Connect to account”</strong>.
                  </p>

                  <a
                    href="${PMEX_URL}"
                    target="_blank"
                    style="display:inline-block;padding:13px 18px;background:#b88713;border-radius:8px;color:#fff;font-size:14px;font-weight:bold;text-decoration:none;"
                  >
                    Open PMEX Demo Terminal
                  </a>

                  <ol style="margin:18px 0 0;padding-left:18px;color:#475569;font-size:14px;line-height:1.7;">
                    <li>Enter your Login and Password.</li>
                    <li>Click <strong>“Connect to account”</strong>.</li>
                  </ol>

                  <p style="margin:16px 0 0;color:#64748b;font-size:12px;line-height:1.5;">
                    If the button does not work, open:
                    <br />
                    <a href="${PMEX_URL}" style="color:#b88713;font-weight:bold;">
                      ${PMEX_URL}
                    </a>
                  </p>
                </div>
              </td>
            </tr>

            <!-- Security -->
            <tr>
              <td style="padding:0 28px 28px;">
                <div style="padding:14px 16px;border-left:4px solid #d4a72c;background:#f8fafc;">
                  <p style="margin:0 0 4px;font-size:14px;font-weight:bold;">
                    Keep your credentials secure
                  </p>
                  <p style="margin:0;color:#64748b;font-size:13px;line-height:1.5;">
                    Do not share your login details or password with anyone.
                    Right Vision Securities will never ask for your password by
                    email, WhatsApp, or phone call.
                  </p>
                </div>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td align="center" style="padding:22px 24px;background:#0f172a;">
                <p style="margin:0 0 6px;color:#fff;font-size:14px;font-weight:bold;">
                  Right Vision Securities (Pvt.) Limited
                </p>
                <p style="margin:0;color:#94a3b8;font-size:12px;line-height:1.5;">
                  74-R, GCP Society, Johar Town, Lahore, Pakistan
                  <br />
                  <a href="mailto:hello@rvspk.com" style="color:#d4a72c;text-decoration:none;">
                    hello@rvspk.com
                  </a>
                  &nbsp; | &nbsp;
                  <a href="tel:+923108248717" style="color:#d4a72c;text-decoration:none;">
                    +92 310 8248717
                  </a>
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
  `.trim();

  try {
    await transporter.sendMail({
      from: `"Right Vision Securities" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: 'Your PMEX Demo Account Credentials',
      text,
      html,
    });

    return true;
  } catch (error) {
    console.error('Failed to send demo account email:', error.message);
    throw error;
  }
};
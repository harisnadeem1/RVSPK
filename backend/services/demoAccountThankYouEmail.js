
import transporter from "../config/mailer.js";

export const sendDemoAccountThankYouEmail = async ({
  email,
  firstName,
}) => {
  const safeName = String(firstName || "Subscriber")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

  await transporter.sendMail({
    from: `"Right Vision Securities" <${process.env.GMAIL_USER}>`,
    to: email,
   
subject: "Thank You for Your Interest in Demo Account Online",

text: `
Dear Sir/Madam,

Welcome to Right Vision Group of Companies!

Sincere thanks for using the platform of Right Vision Securities (Pvt.) Limited for a Demo Account and for sparing your precious time to learn more about the commodity market. We truly admire your approach to gaining practical knowledge of trading before investing your capital in commodity futures contracts.

We are excited to show you how Right Vision Securities (Pvt.) Limited can help you better understand the features of the Demo Account and the trading platform.

Our dedicated support team is also here to assist you 24/7 and address any queries you may have.

Kindest regards,
Customer Support, Marketing, Research & Training Department
Right Vision Securities (Pvt.) Limited
74-R, GCP Society, Johar Town, Lahore

Landline: 042-35191194; 042-35191188
WhatsApp: 0310-8248717; 0310-8214202
Email: hello@rvspk.com
Website: https://www.rvspk.com/
`.trim(),

html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>

<body style="margin:0;padding:0;background-color:#f3f5f7;font-family:Arial,Helvetica,sans-serif;color:#344054;">

  <table role="presentation" width="100%" cellspacing="0" cellpadding="0"
    style="background-color:#f3f5f7;padding:32px 12px;">
    <tr>
      <td align="center">

        <table role="presentation" width="100%" cellspacing="0" cellpadding="0"
          style="max-width:620px;background:#ffffff;border:1px solid #e5e9ee;border-radius:8px;overflow:hidden;">

          <!-- Header -->
          <tr>
            <td style="padding:28px 36px 24px;border-bottom:4px solid #79AD14;">
              <p style="margin:0;color:#466601;font-size:12px;font-weight:bold;letter-spacing:1.5px;">
                RIGHT VISION GROUP OF COMPANIES
              </p>
              <h1 style="margin:12px 0 0;font-size:23px;line-height:1.4;color:#253047;">
                Thank You for Your Interest
              </h1>
              <p style="margin:6px 0 0;font-size:14px;color:#667085;line-height:1.6;">
                Demo Account Online
              </p>
            </td>
          </tr>

          <!-- Message -->
          <tr>
            <td style="padding:30px 36px;">

              <p style="margin:0 0 18px;font-size:15px;line-height:1.8;color:#344054;">
                Dear Sir/Madam,
              </p>

              <p style="margin:0 0 16px;font-size:16px;line-height:1.7;color:#466601;font-weight:bold;">
                Welcome to Right Vision Group of Companies!
              </p>

              <p style="margin:0 0 16px;font-size:14px;line-height:1.9;color:#475467;">
                Sincere thanks for using the platform of
                <strong>Right Vision Securities (Pvt.) Limited</strong>
                for a Demo Account and for sparing your precious time to learn
                more about the commodity market. We truly admire your approach
                to gaining practical knowledge of trading before investing
                your capital in commodity futures contracts.
              </p>

              <p style="margin:0 0 16px;font-size:14px;line-height:1.9;color:#475467;">
                We are excited to show you how Right Vision Securities (Pvt.) Limited
                can help you better understand the features of the Demo Account
                and the trading platform.
              </p>

              <table role="presentation" width="100%" cellspacing="0" cellpadding="0"
                style="background:#f7f9f3;border-left:4px solid #79AD14;margin:22px 0;">
                <tr>
                  <td style="padding:16px 18px;">
                    <p style="margin:0;font-size:14px;line-height:1.8;color:#475467;">
                      Our dedicated support team is here to assist you
                      <strong>24/7</strong> and address any queries you may have.
                      Please feel free to contact us whenever you need assistance.
                    </p>
                  </td>
                </tr>
              </table>

              <p style="margin:26px 0 5px;font-size:14px;line-height:1.7;color:#475467;">
                Kindest regards,
              </p>

              <p style="margin:0;font-size:14px;line-height:1.8;color:#253047;font-weight:bold;">
                Customer Support, Marketing, Research &amp; Training Department
              </p>
              <p style="margin:3px 0 0;font-size:14px;line-height:1.8;color:#466601;font-weight:bold;">
                Right Vision Securities (Pvt.) Limited
              </p>

            </td>
          </tr>

          <!-- Contact Information -->
          <tr>
            <td style="padding:24px 36px;background:#f8fafc;border-top:1px solid #e5e9ee;">

              <p style="margin:0 0 16px;font-size:12px;font-weight:bold;letter-spacing:1px;color:#466601;">
                CONTACT INFORMATION
              </p>

              <p style="margin:0 0 10px;font-size:13px;line-height:1.8;color:#667085;">
                <strong style="color:#344054;">Address:</strong><br />
                74-R, GCP Society, Johar Town, Lahore
              </p>

              <p style="margin:0 0 10px;font-size:13px;line-height:1.8;color:#667085;">
                <strong style="color:#344054;">Landline:</strong><br />
                <a href="tel:+924235191194" style="color:#466601;text-decoration:none;">042-35191194</a>
                &nbsp;|&nbsp;
                <a href="tel:+924235191188" style="color:#466601;text-decoration:none;">042-35191188</a>
              </p>

              <p style="margin:0 0 10px;font-size:13px;line-height:1.8;color:#667085;">
                <strong style="color:#344054;">WhatsApp:</strong><br />
                <a href="https://wa.me/923108248717" style="color:#466601;text-decoration:none;">0310-8248717</a>
                &nbsp;|&nbsp;
                <a href="https://wa.me/923108214202" style="color:#466601;text-decoration:none;">0310-8214202</a>
              </p>

              <p style="margin:0 0 10px;font-size:13px;line-height:1.8;color:#667085;">
                <strong style="color:#344054;">Email:</strong><br />
                <a href="mailto:hello@rvspk.com" style="color:#466601;text-decoration:none;">hello@rvspk.com</a>
              </p>

              <p style="margin:0;font-size:13px;line-height:1.8;color:#667085;">
                <strong style="color:#344054;">Website:</strong><br />
                <a href="https://www.rvspk.com/" style="color:#466601;text-decoration:none;">www.rvspk.com</a>
              </p>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:16px 24px;background:#466601;text-align:center;">
              <p style="margin:0;font-size:11px;line-height:1.7;color:#ffffff;">
                Right Vision Securities (Pvt.) Limited
              </p>
              <p style="margin:4px 0 0;font-size:11px;line-height:1.7;color:#e8efdc;">
                Thank you for your interest in our Demo Account platform.
              </p>
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>
`.trim(),

  });
};

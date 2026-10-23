import transporter from '../config/mailer.js';
import pool from '../config/db.js';
import { sendDiscordNotification } from '../utils/discordNotifier.js';

const DAY_NAMES = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

const ALLOWED_PROFESSIONS = new Set([
  'Student',
  'Business',
  'Service',
  'Household',
  'Retired',
  'Others',
]);

const ALLOWED_TIME_SLOTS = new Set([
  '9:00 AM',
  '9:30 AM',
  '10:00 AM',
  '10:30 AM',
  '11:00 AM',
  '11:30 AM',
  '12:00 PM',
  '12:30 PM',
  '1:00 PM',
  '1:30 PM',
  '2:00 PM',
  '2:30 PM',
  '3:00 PM',
  '3:30 PM',
  '4:00 PM',
  '4:30 PM',
]);

function escapeHtml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function sanitizeHeader(value = '') {
  return String(value)
    .replace(/[\r\n]+/g, ' ')
    .trim();
}

function sanitizePhone(value = '') {
  return String(value)
    .replace(/[\r\n]+/g, ' ')
    .trim();
}

function formatBookingDate(date) {
  return new Intl.DateTimeFormat('en-PK', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'Asia/Karachi',
  }).format(date);
}

function isValidDateString(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false;
  }

  const [year, month, day] = value.split('-').map(Number);
  const date = new Date(year, month - 1, day);

  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  );
}

export const sendBookingEmail = async (req, res) => {
  const {
    name,
    email,
    whatsappNumber,
    profession,
    city,
    country,
    subject,
    message,
    sessionDate,
    sessionTime,
  } = req.body;

  const cleanName = sanitizeHeader(name);
  const cleanEmail = sanitizeHeader(email).toLowerCase();
  const cleanWhatsappNumber = sanitizePhone(whatsappNumber);
  const cleanProfession = sanitizeHeader(profession);
  const cleanCity = sanitizeHeader(city);
  const cleanCountry = sanitizeHeader(country);
  const cleanSubject = sanitizeHeader(subject);
  const cleanSessionDate = sanitizeHeader(sessionDate);
  const cleanSessionTime = sanitizeHeader(sessionTime);
  const cleanMessage = String(message || '').trim();

  /*
    Required-field validation.
    Session date/time are handled separately because this controller
    can also support non-booking/general inquiry submissions.
  */
  if (
    !cleanName ||
    !cleanEmail ||
    !cleanWhatsappNumber ||
    !cleanProfession ||
    !cleanCity ||
    !cleanCountry ||
    !cleanSubject ||
    !cleanMessage
  ) {
    return res.status(400).json({
      success: false,
      error:
        'Name, email, WhatsApp number, profession, city, country, subject, and message are required.',
    });
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(cleanEmail)) {
    return res.status(400).json({
      success: false,
      error: 'Please provide a valid email address.',
    });
  }

  /*
    Accepts a practical international WhatsApp-number format:
    +92 300 1234567
    923001234567
    03001234567

    This is intentionally not country-specific. The number must contain
    7–20 digits after removing spaces, brackets, dashes, and plus signs.
  */
  const whatsappDigits = cleanWhatsappNumber.replace(/\D/g, '');

  if (whatsappDigits.length < 7 || whatsappDigits.length > 20) {
    return res.status(400).json({
      success: false,
      error: 'Please provide a valid WhatsApp number.',
    });
  }

  if (!ALLOWED_PROFESSIONS.has(cleanProfession)) {
    return res.status(400).json({
      success: false,
      error: 'Please select a valid profession.',
    });
  }

  /*
    Protect against excessively large/spam submissions.
  */
  if (
    cleanName.length > 100 ||
    cleanEmail.length > 254 ||
    cleanWhatsappNumber.length > 30 ||
    cleanProfession.length > 30 ||
    cleanCity.length > 100 ||
    cleanCountry.length > 100 ||
    cleanSubject.length > 180 ||
    cleanMessage.length > 5000
  ) {
    return res.status(400).json({
      success: false,
      error: 'One or more submitted fields are too long.',
    });
  }

  const hasSessionDate = Boolean(cleanSessionDate);
  const hasSessionTime = Boolean(cleanSessionTime);

  /*
    Session date and time must be supplied together.
  */
  if (hasSessionDate !== hasSessionTime) {
    return res.status(400).json({
      success: false,
      error: 'Please select both a session date and time.',
    });
  }

  let selectedDate = null;
  let formattedDate = null;
  let dayName = null;

  /*
    Validate the scheduling details only if this is an online-session
    booking rather than a general inquiry.
  */
  if (hasSessionDate && hasSessionTime) {
    if (!isValidDateString(cleanSessionDate)) {
      return res.status(400).json({
        success: false,
        error: 'Please select a valid session date.',
      });
    }

    const [year, month, day] = cleanSessionDate.split('-').map(Number);

    selectedDate = new Date(year, month - 1, day);
    selectedDate.setHours(0, 0, 0, 0);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      return res.status(400).json({
        success: false,
        error: 'A session cannot be booked for a past date.',
      });
    }

    const selectedDay = selectedDate.getDay();

    if (selectedDay === 0 || selectedDay === 6) {
      return res.status(400).json({
        success: false,
        error: 'Online sessions are available Monday to Friday only.',
      });
    }

    if (!ALLOWED_TIME_SLOTS.has(cleanSessionTime)) {
      return res.status(400).json({
        success: false,
        error: 'Please select a valid available time slot.',
      });
    }

    formattedDate = formatBookingDate(selectedDate);
    dayName = DAY_NAMES[selectedDay];
  }

  const safeName = escapeHtml(cleanName);
  const safeEmail = escapeHtml(cleanEmail);
  const safeWhatsappNumber = escapeHtml(cleanWhatsappNumber);
  const safeProfession = escapeHtml(cleanProfession);
  const safeCity = escapeHtml(cleanCity);
  const safeCountry = escapeHtml(cleanCountry);
  const safeSubject = escapeHtml(cleanSubject);
  const safeMessage = escapeHtml(cleanMessage).replace(/\n/g, '<br />');
  const safeSessionTime = escapeHtml(cleanSessionTime);
  const safeFormattedDate = formattedDate
    ? escapeHtml(formattedDate)
    : 'No session date selected';

  const bookingRecipients =
    process.env.BOOKING_RECEIVER || process.env.CONTACT_RECEIVER;

  if (!bookingRecipients) {
    console.error(
      'Booking email configuration error: BOOKING_RECEIVER or CONTACT_RECEIVER is missing.'
    );

    return res.status(500).json({
      success: false,
      error:
        'Booking email is not configured. Please contact the administrator.',
    });
  }

  const bookingDetailsHtml =
    hasSessionDate && hasSessionTime
      ? `
        <div style="margin-bottom: 22px; padding: 16px; background: #f4f9e8; border: 1px solid #d6e8ac; border-radius: 8px;">
          <p style="margin: 0 0 7px; font-size: 12px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; color: #52780C;">
            Requested session
          </p>

          <p style="margin: 0; font-size: 18px; font-weight: 700; color: #24310b;">
            ${safeFormattedDate}
          </p>

          <p style="margin: 5px 0 0; font-size: 15px; color: #42551d;">
            ${safeSessionTime} PKT · 30-minute online session
          </p>
        </div>
      `
      : `
        <div style="margin-bottom: 22px; padding: 16px; background: #f7f7f7; border: 1px solid #e5e7eb; border-radius: 8px;">
          <p style="margin: 0; font-size: 14px; color: #555555;">
            This is a general inquiry. No session date or time was selected.
          </p>
        </div>
      `;

  const htmlBody = `
    <div style="font-family: Arial, Helvetica, sans-serif; max-width: 640px; margin: 0 auto; color: #222222;">
      <div style="background: #79AD14; padding: 24px; border-radius: 10px 10px 0 0;">
        <h2 style="margin: 0; color: #ffffff; font-size: 22px;">
          New Online Session Request
        </h2>

        <p style="margin: 6px 0 0; color: rgba(255,255,255,0.88); font-size: 14px;">
          Right Vision Securities — Website Booking Form
        </p>
      </div>

      <div style="padding: 24px; border: 1px solid #e5e7eb; border-top: 0; background: #ffffff;">
        ${bookingDetailsHtml}

        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="width: 145px; padding: 11px 0; border-bottom: 1px solid #eeeeee; vertical-align: top;">
              <strong style="color: #555555;">Name</strong>
            </td>
            <td style="padding: 11px 0; border-bottom: 1px solid #eeeeee; color: #222222;">
              ${safeName}
            </td>
          </tr>

          <tr>
            <td style="width: 145px; padding: 11px 0; border-bottom: 1px solid #eeeeee; vertical-align: top;">
              <strong style="color: #555555;">Email</strong>
            </td>
            <td style="padding: 11px 0; border-bottom: 1px solid #eeeeee;">
              <a href="mailto:${safeEmail}" style="color: #52780C; text-decoration: none;">
                ${safeEmail}
              </a>
            </td>
          </tr>

          <tr>
            <td style="width: 145px; padding: 11px 0; border-bottom: 1px solid #eeeeee; vertical-align: top;">
              <strong style="color: #555555;">WhatsApp</strong>
            </td>
            <td style="padding: 11px 0; border-bottom: 1px solid #eeeeee; color: #222222;">
              ${safeWhatsappNumber}
            </td>
          </tr>

          <tr>
            <td style="width: 145px; padding: 11px 0; border-bottom: 1px solid #eeeeee; vertical-align: top;">
              <strong style="color: #555555;">Profession</strong>
            </td>
            <td style="padding: 11px 0; border-bottom: 1px solid #eeeeee; color: #222222;">
              ${safeProfession}
            </td>
          </tr>

          <tr>
            <td style="width: 145px; padding: 11px 0; border-bottom: 1px solid #eeeeee; vertical-align: top;">
              <strong style="color: #555555;">City</strong>
            </td>
            <td style="padding: 11px 0; border-bottom: 1px solid #eeeeee; color: #222222;">
              ${safeCity}
            </td>
          </tr>

          <tr>
            <td style="width: 145px; padding: 11px 0; border-bottom: 1px solid #eeeeee; vertical-align: top;">
              <strong style="color: #555555;">Country</strong>
            </td>
            <td style="padding: 11px 0; border-bottom: 1px solid #eeeeee; color: #222222;">
              ${safeCountry}
            </td>
          </tr>

          <tr>
            <td style="width: 145px; padding: 11px 0; border-bottom: 1px solid #eeeeee; vertical-align: top;">
              <strong style="color: #555555;">Subject</strong>
            </td>
            <td style="padding: 11px 0; border-bottom: 1px solid #eeeeee; color: #222222;">
              ${safeSubject}
            </td>
          </tr>

          <tr>
            <td style="width: 145px; padding: 11px 0; vertical-align: top;">
              <strong style="color: #555555;">Message</strong>
            </td>
            <td style="padding: 11px 0; color: #222222; line-height: 1.65;">
              ${safeMessage}
            </td>
          </tr>
        </table>
      </div>

      <div style="padding: 14px 24px; background: #f3f4f6; border-radius: 0 0 10px 10px; text-align: center;">
        <p style="margin: 0; color: #6b7280; font-size: 12px;">
          ${
            hasSessionDate
              ? `Requested for ${dayName} · Sent from rvspk.com booking form`
              : 'Sent from rvspk.com inquiry form'
          }
        </p>
      </div>
    </div>
  `;

  const plainTextBody = `
${hasSessionDate ? 'New Online Session Request' : 'New Website Inquiry'}
Right Vision Securities — Website

${
  hasSessionDate
    ? `REQUESTED SESSION
Date: ${formattedDate}
Time: ${cleanSessionTime} PKT
Duration: 30 minutes`
    : `SESSION DETAILS
No session date or time was selected.`
}

CLIENT DETAILS
Name: ${cleanName}
Email: ${cleanEmail}
WhatsApp: ${cleanWhatsappNumber}
Profession: ${cleanProfession}
City: ${cleanCity}
Country: ${cleanCountry}
Subject: ${cleanSubject}

MESSAGE
${cleanMessage}
`.trim();

  try {

const bookingResult = await pool.query(
  `
    INSERT INTO bookings (
      name,
      email,
      whatsapp_number,
      profession,
      city,
      country,
      subject,
      message,
      session_date,
      session_time
    )
    VALUES (
      $1, $2, $3, $4, $5,
      $6, $7, $8, $9, $10
    )
    RETURNING *
  `,
  [
    cleanName,
    cleanEmail,
    cleanWhatsappNumber,
    cleanProfession,
    cleanCity,
    cleanCountry,
    cleanSubject,
    cleanMessage,
    cleanSessionDate,
    cleanSessionTime,
  ]
);

const booking = bookingResult.rows[0];

if (hasSessionDate && hasSessionTime) {
  void sendDiscordNotification({
    type: "Online Session Booking",
    name: booking.name,
    email: booking.email,
    phone: booking.whatsapp_number,
    details: `Booking ID: ${booking.id}
Date: ${formattedDate}
Time: ${cleanSessionTime} PKT
Duration: 30 minutes`,
  });
}


    await transporter.sendMail({
      from: `"RVSPL Online Booking" <${process.env.GMAIL_USER}>`,
      to: bookingRecipients,
      replyTo: cleanEmail,
      subject: hasSessionDate
        ? `[RVSPL Booking] ${cleanSessionDate} ${cleanSessionTime} — ${cleanSubject}`
        : `[RVSPL Inquiry] ${cleanSubject}`,
      text: plainTextBody,
      html: htmlBody,

      disableFileAccess: true,
      disableUrlAccess: true,
    });

    

if (hasSessionDate && hasSessionTime) {
  await transporter.sendMail({
    from: `"Right Vision Securities" <${process.env.GMAIL_USER}>`,
    to: cleanEmail,
    subject: "Thank You for Your Interest in Booking an Online Session",

    text: `
Dear Sir/Madam,

Warmly welcome to Right Vision Group of Companies!

We offer our gratitude for your interest in Right Vision Securities (Pvt.) Limited and for reaching out to Book an Online Session. We truly appreciate you taking your precious time to learn more about commodities market and for considering the services offered by our Brokerage Company to facilitate you to start your journey to trade in commodities Futures Contracts.

We confirm your request for an Online Session as scheduled. Meanwhile, if you have any question or need assistance, please don't hesitate to reply to this email or may call/chat with our representative.

We look forward to connecting and helping you to achieve your investment goals.

Kindest regards,

Customer Support, Marketing, Research & Training Department
Right Vision Securities (Pvt.) Limited

74-R, GCP Society, Johar Town, Lahore

Landline #: 042-35191194; 042-35191188
WhatsApp #: 0310-8248717; 03108214202
Email Add.: hello@rvspk.com
Website: https://www.rvspk.com/

RISK DISCLOSURE:

It is imperative to inform you that the Company does not provide advisory services. Be cautious that Future Trading in Commodities involve substantial leverage and risk. Hence, seek an independent professional financial advisor for trading strategies. Always use protective risk controls, independent judgment and disciplined position sizing. Past performance is not an indicate of future success. Responsibility of loss of money could not be imposed on the Company.
    `.trim(),

    html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Thank You for Your Interest in Booking an Online Session</title>
</head>

<body style="margin:0;padding:0;background:#f3f5f7;font-family:Arial,Helvetica,sans-serif;color:#344054;">

  <table role="presentation" width="100%" cellspacing="0" cellpadding="0"
    style="background:#f3f5f7;padding:32px 12px;">
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
                Online Session Booking
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
                Warmly welcome to Right Vision Group of Companies!
              </p>

              <p style="margin:0 0 16px;font-size:14px;line-height:1.9;color:#475467;">
                We offer our gratitude for your interest in
                <strong>Right Vision Securities (Pvt.) Limited</strong>
                and for reaching out to Book an Online Session. We truly
                appreciate you taking your precious time to learn more about
                commodities market and for considering the services offered
                by our Brokerage Company to facilitate you to start your
                journey to trade in commodities Futures Contracts.
              </p>

              <p style="margin:0 0 16px;font-size:14px;line-height:1.9;color:#475467;">
                We confirm your request for an Online Session as scheduled.
                Meanwhile, if you have any question or need assistance,
                please don't hesitate to reply to this email or may
                call/chat with our representative.
              </p>

              <!-- Session Confirmation -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0"
                style="background:#f7f9f3;border:1px solid #dce8c7;border-left:4px solid #79AD14;border-radius:5px;margin:20px 0;">
                <tr>
                  <td style="padding:18px 20px;">
                    <p style="margin:0 0 12px;font-size:12px;font-weight:bold;letter-spacing:1px;color:#466601;">
                      YOUR SESSION DETAILS
                    </p>

                    <p style="margin:0 0 8px;font-size:14px;line-height:1.7;color:#344054;">
                      <strong>Date:</strong> ${escapeHtml(formattedDate)}
                    </p>

                    <p style="margin:0 0 8px;font-size:14px;line-height:1.7;color:#344054;">
                      <strong>Time:</strong> ${escapeHtml(cleanSessionTime)} PKT
                    </p>

                    <p style="margin:0;font-size:14px;line-height:1.7;color:#344054;">
                      <strong>Duration:</strong> 30 minutes
                    </p>
                  </td>
                </tr>
              </table>

              <p style="margin:0 0 24px;font-size:14px;line-height:1.9;color:#475467;">
                We look forward to connecting and helping you to achieve
                your investment goals.
              </p>

              <!-- Signature -->
              <p style="margin:0 0 5px;font-size:14px;color:#475467;">
                Kindest regards,
              </p>

              <p style="margin:0;font-size:14px;line-height:1.8;font-weight:bold;color:#253047;">
                Customer Support, Marketing, Research &amp; Training Department
              </p>

              <p style="margin:3px 0 0;font-size:14px;line-height:1.8;font-weight:bold;color:#466601;">
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
                <strong style="color:#344054;">Landline #:</strong><br />
                <a href="tel:+924235191194" style="color:#466601;text-decoration:none;">042-35191194</a>
                &nbsp;|&nbsp;
                <a href="tel:+924235191188" style="color:#466601;text-decoration:none;">042-35191188</a>
              </p>

              <p style="margin:0 0 10px;font-size:13px;line-height:1.8;color:#667085;">
                <strong style="color:#344054;">WhatsApp #:</strong><br />
                <a href="https://wa.me/923108248717" style="color:#466601;text-decoration:none;">0310-8248717</a>
                &nbsp;|&nbsp;
                <a href="https://wa.me/923108214202" style="color:#466601;text-decoration:none;">03108214202</a>
              </p>

              <p style="margin:0 0 10px;font-size:13px;line-height:1.8;color:#667085;">
                <strong style="color:#344054;">Email Add.:</strong><br />
                <a href="mailto:hello@rvspk.com" style="color:#466601;text-decoration:none;">hello@rvspk.com</a>
              </p>

              <p style="margin:0;font-size:13px;line-height:1.8;color:#667085;">
                <strong style="color:#344054;">Website:</strong><br />
                <a href="https://www.rvspk.com/" target="_blank" style="color:#466601;text-decoration:none;">www.rvspk.com</a>
              </p>

            </td>
          </tr>

          <!-- Risk Disclosure -->
          <tr>
            <td style="padding:24px 36px;background:#ffffff;">

              <table role="presentation" width="100%" cellspacing="0" cellpadding="0"
                style="background:#f7f9f3;border:1px solid #dce7cd;border-left:4px solid #79AD14;">
                <tr>
                  <td style="padding:18px;">

                    <h2 style="margin:0 0 12px;font-size:14px;line-height:1.6;color:#466601;letter-spacing:0.5px;">
                      RISK DISCLOSURE
                    </h2>

                    <p style="margin:0;font-size:12px;line-height:1.8;color:#475467;font-style:italic;">
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

                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:16px 24px;background:#466601;text-align:center;">
              <p style="margin:0;font-size:11px;line-height:1.7;color:#ffffff;">
                Right Vision Securities (Pvt.) Limited
              </p>

              <p style="margin:4px 0 0;font-size:11px;line-height:1.7;color:#e8efdc;">
                Thank you for your interest in booking an online session.
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

    disableFileAccess: true,
    disableUrlAccess: true,
  });
}



    return res.status(200).json({
      success: true,
      message:
        'Your online session request has been sent successfully. We will confirm your appointment shortly.',
    });
  } catch (error) {
    console.error('Booking email send error:', error);

    return res.status(500).json({
      success: false,
      error: 'Failed to send your booking request. Please try again.',
    });
  }
};


export const getBookings = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        b.id,
        b.name,
        b.email,
        b.whatsapp_number,
        b.profession,
        b.city,
        b.country,
        b.subject,
        b.message,
        b.session_date,
        b.session_time,

        b.status,
        b.admin_comment,

        b.status_updated_by,
        b.status_updated_at,

        b.created_at,
        b.updated_at,

        u.full_name AS status_updated_by_name,
        u.email AS status_updated_by_email

      FROM bookings b

      LEFT JOIN users u
        ON b.status_updated_by = u.id

      ORDER BY b.created_at DESC
    `);

    return res.status(200).json({
      success: true,
      bookings: result.rows,
    });

  } catch (error) {
    console.error(
      'Get bookings error:',
      error
    );

    return res.status(500).json({
      success: false,
      message: 'Failed to fetch bookings',
    });
  }
};


export const updateBookingStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, comment } = req.body;

    const allowedStatuses = [
      'pending',
      'in_process',
      'closed',
      'rejected',
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid booking status',
      });
    }

    const updatedBy = req.user.id;

    const result = await pool.query(
      `
        UPDATE bookings
        SET
          status = $1,
          admin_comment = $2,
          status_updated_by = $3,
          status_updated_at = NOW()
        WHERE id = $4
        RETURNING *
      `,
      [
        status,
        comment?.trim() || null,
        updatedBy,
        id,
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found',
      });
    }

    return res.status(200).json({
      success: true,
      message:
        'Booking updated successfully',
      booking: result.rows[0],
    });

  } catch (error) {
    console.error(
      'Update booking error:',
      error
    );

    return res.status(500).json({
      success: false,
      message:
        'Failed to update booking',
    });
  }
};
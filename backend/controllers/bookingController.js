import transporter from '../config/mailer.js';

const DAY_NAMES = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

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

export const sendBookingEmail = async (req, res) => {
  const {
    name,
    email,
    subject,
    message,
    sessionDate,
    sessionTime,
  } = req.body;

  const cleanName = sanitizeHeader(name);
  const cleanEmail = sanitizeHeader(email).toLowerCase();
  const cleanSubject = sanitizeHeader(subject);
  const cleanSessionDate = sanitizeHeader(sessionDate);
  const cleanSessionTime = sanitizeHeader(sessionTime);
  const cleanMessage = String(message || '').trim();

  /*
    Basic server-side required-field validation.
    Client validation is useful for UX but must never be the only validation.
  */
  if (!cleanName || !cleanEmail || !cleanSubject || !cleanMessage) {
  return res.status(400).json({
    success: false,
    error: 'Name, email, subject, and message are required.',
  });
}

  /*
    Basic email format validation.
    This is deliberately simple; email delivery is ultimately verified by mail transport.
  */
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(cleanEmail)) {
    return res.status(400).json({
      success: false,
      error: 'Please provide a valid email address.',
    });
  }

  /*
    Protect against excessively long spam submissions.
    Adjust these limits if your business needs longer messages.
  */
  if (
    cleanName.length > 100 ||
    cleanEmail.length > 254 ||
    cleanSubject.length > 180 ||
    cleanMessage.length > 5000
  ) {
    return res.status(400).json({
      success: false,
      error: 'One or more submitted fields are too long.',
    });
  }

  /*
    Validate YYYY-MM-DD exactly.
  */
const hasSessionDate = Boolean(cleanSessionDate);
const hasSessionTime = Boolean(cleanSessionTime);

/*
  The two values must either both exist or both be absent.
  This prevents a malformed request with a date but no time,
  or a time but no date.
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
  Validate date and time only when the frontend actually submitted them.
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
  const safeSubject = escapeHtml(cleanSubject);
  const safeMessage = escapeHtml(cleanMessage).replace(/\n/g, '<br />');
const safeSessionTime = escapeHtml(cleanSessionTime);
const safeFormattedDate = formattedDate
  ? escapeHtml(formattedDate)
  : 'No session date selected';

  /*
    You may supply one address:
    BOOKING_RECEIVER=hello@rvspk.com

    Or several comma-separated addresses:
    BOOKING_RECEIVER=hello@rvspk.com,manager@rvspk.com,operations@rvspk.com
  */
  const bookingRecipients =
    process.env.BOOKING_RECEIVER || process.env.CONTACT_RECEIVER;

  if (!bookingRecipients) {
    console.error(
      'Booking email configuration error: BOOKING_RECEIVER or CONTACT_RECEIVER is missing.'
    );

    return res.status(500).json({
      success: false,
      error: 'Booking email is not configured. Please contact the administrator.',
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

${hasSessionDate
  ? `REQUESTED SESSION
Date: ${formattedDate}
Time: ${cleanSessionTime} PKT
Duration: 30 minutes`
  : `SESSION DETAILS
No session date or time was selected.`}

CLIENT DETAILS
Name: ${cleanName}
Email: ${cleanEmail}
Subject: ${cleanSubject}

MESSAGE
${cleanMessage}
`.trim();

  try {
    await transporter.sendMail({
      from: `"RVSPL Online Booking" <${process.env.GMAIL_USER}>`,
      to: bookingRecipients,
      replyTo: cleanEmail,
      subject: hasSessionDate
  ? `[RVSPL Booking] ${cleanSessionDate} ${cleanSessionTime} — ${cleanSubject}`
  : `[RVSPL Inquiry] ${cleanSubject}`,
      text: plainTextBody,
      html: htmlBody,

      /*
        Prevent Nodemailer from reading local files or remote URLs
        if untrusted JSON is ever passed into message fields in the future.
      */
      disableFileAccess: true,
      disableUrlAccess: true,
    });

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
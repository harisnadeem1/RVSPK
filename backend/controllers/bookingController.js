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
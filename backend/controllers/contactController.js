import transporter from '../config/mailer.js'

export const sendContactEmail = async (req, res) => {
  const { name, email, phone, subject, message } = req.body

  if (!name || !email || !subject || !message) {
    return res.status(400).json({
      success: false,
      error: 'Name, email, subject, and message are required.'
    })
  }

  const htmlBody = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: #c0392b; padding: 24px; border-radius: 8px 8px 0 0;">
        <h2 style="color: #ffffff; margin: 0;">New Contact Form Submission</h2>
        <p style="color: rgba(255,255,255,0.8); margin: 4px 0 0;">Right Vision Securities — Website</p>
      </div>
      <div style="background: #f9f9f9; padding: 24px; border: 1px solid #e0e0e0;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #eee; width: 120px;">
              <b style="color: #555;">Name</b>
            </td>
            <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #222;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #eee;">
              <b style="color: #555;">Email</b>
            </td>
            <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #222;">
              <a href="mailto:${email}" style="color: #c0392b;">${email}</a>
            </td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #eee;">
              <b style="color: #555;">Phone</b>
            </td>
            <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #222;">
              ${phone || 'Not provided'}
            </td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #eee;">
              <b style="color: #555;">Subject</b>
            </td>
            <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #222;">${subject}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; vertical-align: top;">
              <b style="color: #555;">Message</b>
            </td>
            <td style="padding: 10px 0; color: #222; line-height: 1.6;">
              ${message.replace(/\n/g, '<br/>')}
            </td>
          </tr>
        </table>
      </div>
      <div style="background: #eee; padding: 14px 24px; border-radius: 0 0 8px 8px; text-align: center;">
        <p style="margin: 0; font-size: 12px; color: #888;">
          Sent from rvspk.com contact form · Right Vision Securities
        </p>
      </div>
    </div>
  `

  try {
    await transporter.sendMail({
      from: `"RVSPL Contact Form" <${process.env.GMAIL_USER}>`,
      to: process.env.CONTACT_RECEIVER,
      replyTo: email,
      subject: `[RVSPL] ${subject}`,
      html: htmlBody,
    })

    return res.status(200).json({
      success: true,
      message: 'Email sent successfully.'
    })

  } catch (error) {
    console.error('Email send error:', error)
    return res.status(500).json({
      success: false,
      error: 'Failed to send email. Please try again.'
    })
  }
}
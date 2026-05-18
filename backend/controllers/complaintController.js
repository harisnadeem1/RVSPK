import transporter from '../config/mailer.js'

export const submitComplaint = async (req, res) => {
  const {
    name, cnic, cell, email,
    accountType, address,
    complaintType, complaintAgainst,
    tradingAccount, details
  } = req.body

  if (!name || !cnic || !cell || !email || !complaintType || !details) {
    return res.status(400).json({
      success: false,
      error: 'Name, CNIC, cell, email, complaint type, and details are required.'
    })
  }

  const htmlBody = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: #c0392b; padding: 24px; border-radius: 8px 8px 0 0;">
        <h2 style="color: #ffffff; margin: 0;">New Complaint Registration</h2>
        <p style="color: rgba(255,255,255,0.8); margin: 4px 0 0;">Right Vision Securities — Compliance</p>
      </div>
      <div style="background: #f9f9f9; padding: 24px; border: 1px solid #e0e0e0;">

        <p style="margin: 0 0 12px; font-weight: bold; color: #c0392b; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em;">Personal Information</p>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #eee; width: 160px;"><b style="color: #555;">Name</b></td>
            <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #222;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #eee;"><b style="color: #555;">CNIC</b></td>
            <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #222;">${cnic}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #eee;"><b style="color: #555;">Cell</b></td>
            <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #222;">${cell}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #eee;"><b style="color: #555;">Email</b></td>
            <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #222;">
              <a href="mailto:${email}" style="color: #c0392b;">${email}</a>
            </td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #eee;"><b style="color: #555;">Account Type</b></td>
            <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #222;">${accountType || 'Not specified'}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0;"><b style="color: #555;">Address</b></td>
            <td style="padding: 10px 0; color: #222;">${address || 'Not provided'}</td>
          </tr>
        </table>

        <p style="margin: 0 0 12px; font-weight: bold; color: #c0392b; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em;">Complaint Details</p>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #eee; width: 160px;"><b style="color: #555;">Complaint Type</b></td>
            <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #222;">${complaintType}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #eee;"><b style="color: #555;">Complaint Against</b></td>
            <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #222;">${complaintAgainst || 'Not specified'}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #eee;"><b style="color: #555;">Trading Account</b></td>
            <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #222;">${tradingAccount || 'Not provided'}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; vertical-align: top;"><b style="color: #555;">Details</b></td>
            <td style="padding: 10px 0; color: #222; line-height: 1.6;">${details.replace(/\n/g, '<br/>')}</td>
          </tr>
        </table>

        ${req.files?.length ? `
        <p style="margin: 24px 0 8px; font-weight: bold; color: #c0392b; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em;">Attachments</p>
        <p style="color: #555; font-size: 13px;">${req.files.length} file(s) attached — see email attachments.</p>
        ` : ''}

      </div>
      <div style="background: #eee; padding: 14px 24px; border-radius: 0 0 8px 8px; text-align: center;">
        <p style="margin: 0; font-size: 12px; color: #888;">
          Sent from rvspk.com complaint form · Right Vision Securities
        </p>
      </div>
    </div>
  `

  try {
    await transporter.sendMail({
      from: `"RVSPL Complaint Form" <${process.env.GMAIL_USER}>`,
      to: process.env.COMPLAINT_RECEIVER,
      replyTo: email,
      subject: `[RVSPL Complaint] ${complaintType}`,
      html: htmlBody,
      attachments: req.files?.map(file => ({
        filename: file.originalname,
        content: file.buffer,
        contentType: file.mimetype,
      })) || []
    })

    return res.status(200).json({ success: true, message: 'Complaint submitted successfully.' })
  } catch (error) {
    console.error('Complaint email error:', error)
    return res.status(500).json({ success: false, error: 'Failed to submit complaint. Please try again.' })
  }
}
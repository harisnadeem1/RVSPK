import transporter from '../config/mailer.js'

export const submitWhistleblower = async (req, res) => {
  const {
    // Alleged person
    allegedName, allegedDesignation, allegedEmail, allegedCompany, allegedContact,
    // Disclosure
    reason, source, disclosureStatement,
    // Whistleblower identity (optional)
    anonymous,
    wbName, wbDesignation, wbCnic, wbAddress, wbEmail, wbContact,
  } = req.body

  if (!reason || !disclosureStatement) {
    return res.status(400).json({
      success: false,
      error: 'Reason and disclosure statement are required.'
    })
  }

  const isAnonymous = anonymous === 'true' || anonymous === true

  const htmlBody = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: #c0392b; padding: 24px; border-radius: 8px 8px 0 0;">
        <h2 style="color: #ffffff; margin: 0;">New Whistleblower Submission</h2>
        <p style="color: rgba(255,255,255,0.8); margin: 4px 0 0;">Right Vision Securities — Confidential</p>
      </div>
      <div style="background: #f9f9f9; padding: 24px; border: 1px solid #e0e0e0;">

        <p style="margin: 0 0 12px; font-weight: bold; color: #c0392b; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em;">Details of Alleged Person</p>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #eee; width: 160px;"><b style="color: #555;">Name</b></td>
            <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #222;">${allegedName || 'Not provided'}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #eee;"><b style="color: #555;">Designation</b></td>
            <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #222;">${allegedDesignation || 'Not provided'}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #eee;"><b style="color: #555;">Email</b></td>
            <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #222;">${allegedEmail || 'Not provided'}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #eee;"><b style="color: #555;">Company</b></td>
            <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #222;">${allegedCompany || 'Not provided'}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0;"><b style="color: #555;">Contact</b></td>
            <td style="padding: 10px 0; color: #222;">${allegedContact || 'Not provided'}</td>
          </tr>
        </table>

        <p style="margin: 0 0 12px; font-weight: bold; color: #c0392b; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em;">Disclosure</p>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #eee; width: 160px;"><b style="color: #555;">Reason</b></td>
            <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #222;">${reason}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #eee;"><b style="color: #555;">Source of Info</b></td>
            <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #222;">${source || 'Not provided'}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; vertical-align: top;"><b style="color: #555;">Statement</b></td>
            <td style="padding: 10px 0; color: #222; line-height: 1.6;">${disclosureStatement.replace(/\n/g, '<br/>')}</td>
          </tr>
        </table>

        <p style="margin: 0 0 12px; font-weight: bold; color: #c0392b; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em;">Whistleblower Identity</p>
        ${isAnonymous ? `
        <p style="color: #555; font-style: italic; font-size: 14px;">Submitted anonymously.</p>
        ` : `
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #eee; width: 160px;"><b style="color: #555;">Name</b></td>
            <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #222;">${wbName || 'Not provided'}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #eee;"><b style="color: #555;">Designation</b></td>
            <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #222;">${wbDesignation || 'Not provided'}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #eee;"><b style="color: #555;">CNIC</b></td>
            <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #222;">${wbCnic || 'Not provided'}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #eee;"><b style="color: #555;">Mailing Address</b></td>
            <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #222;">${wbAddress || 'Not provided'}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #eee;"><b style="color: #555;">Email</b></td>
            <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #222;">${wbEmail || 'Not provided'}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0;"><b style="color: #555;">Contact</b></td>
            <td style="padding: 10px 0; color: #222;">${wbContact || 'Not provided'}</td>
          </tr>
        </table>
        `}

      </div>
      <div style="background: #eee; padding: 14px 24px; border-radius: 0 0 8px 8px; text-align: center;">
        <p style="margin: 0; font-size: 12px; color: #888;">
          Sent from rvspk.com whistleblower form · Right Vision Securities · Confidential
        </p>
      </div>
    </div>
  `

  try {
    await transporter.sendMail({
      from: `"RVSPL Whistleblower Form" <${process.env.GMAIL_USER}>`,
      to: process.env.WHISTLEBLOWER_RECEIVER,
      // No replyTo — preserve anonymity when submitted anonymously
      ...(!isAnonymous && wbEmail ? { replyTo: wbEmail } : {}),
      subject: `[RVSPL Whistleblower] ${reason.substring(0, 60)}`,
      html: htmlBody,
    })

    return res.status(200).json({ success: true, message: 'Submission received. Your report is confidential.' })
  } catch (error) {
    console.error('Whistleblower email error:', error)
    return res.status(500).json({ success: false, error: 'Failed to submit report. Please try again.' })
  }
}
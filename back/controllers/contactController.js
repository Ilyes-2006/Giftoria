const nodemailer = require('nodemailer');

/**
 * POST /api/contact
 * Body: { fullName, email, subject, message }
 *
 * Sends an email to salahilyes194@gmail.com using the user's email as reply-to.
 *
 * NOTE: Fill in SMTP credentials below.
 * For Gmail, enable "App Passwords" in your Google account and use it here.
 */
const sendContactEmail = async (req, res) => {
  const { fullName, email, subject, message } = req.body;

  // Basic validation
  if (!fullName || !email || !subject || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  // Simple email format check
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email address.' });
  }

  // ── Configure your SMTP transporter ──────────────────────────────────────
  // Replace the values below with your real credentials.
  // For Gmail: use an "App Password" (not your regular password).
  const transporter = nodemailer.createTransport({
    service: 'gmail',          // or 'hotmail', 'yahoo', etc.
    auth: {
      user: process.env.SMTP_USER || 'your-sending-account@gmail.com',
      pass: process.env.SMTP_PASS || 'your-app-password',
    },
  });
  // ─────────────────────────────────────────────────────────────────────────

  const mailOptions = {
    from: `"Giftoria Contact Form" <${process.env.SMTP_USER || 'your-sending-account@gmail.com'}>`,
    to: 'salahilyes194@gmail.com',
    replyTo: email,                      // Reply goes back to the user
    subject: subject,
    html: `
      <div style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f8f9fa; padding: 0; border-radius: 12px; overflow: hidden;">
        <div style="background: #1F2A44; padding: 28px 32px;">
          <h1 style="color: white; margin: 0; font-size: 22px; letter-spacing: 0.5px;">📬 New Contact Message</h1>
          <p style="color: #C9A86A; margin: 6px 0 0; font-size: 14px;">via Giftoria Contact Form</p>
        </div>
        <div style="padding: 32px; background: white;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; color: #888; font-size: 13px; width: 110px; vertical-align: top;">From</td>
              <td style="padding: 10px 0; color: #1F2A44; font-weight: 600;">${fullName}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #888; font-size: 13px; vertical-align: top;">Email</td>
              <td style="padding: 10px 0;"><a href="mailto:${email}" style="color: #2C406F;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #888; font-size: 13px; vertical-align: top;">Subject</td>
              <td style="padding: 10px 0; color: #1F2A44; font-weight: 600;">${subject}</td>
            </tr>
          </table>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
          <h3 style="color: #1F2A44; margin: 0 0 12px; font-size: 15px; text-transform: uppercase; letter-spacing: 0.5px;">Message</h3>
          <p style="color: #444; font-size: 15px; line-height: 1.7; white-space: pre-wrap; margin: 0;">${message}</p>
        </div>
        <div style="background: #f8f9fa; padding: 16px 32px; text-align: center;">
          <p style="color: #aaa; font-size: 12px; margin: 0;">This email was sent from the Giftoria website contact form.</p>
        </div>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return res.status(200).json({ message: 'Your message has been sent successfully!' });
  } catch (err) {
    console.error('Email sending failed:', err.message);
    return res.status(500).json({ error: 'Failed to send your message. Please try again later.' });
  }
};

module.exports = { sendContactEmail };

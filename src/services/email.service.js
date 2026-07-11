const { Resend } = require('resend');
// We use a fallback string so the server doesn't crash on startup if you forget to add the key to Render!
const resend = new Resend(process.env.RESEND_API_KEY || 'missing_api_key');

/**
 * Sends a notification email when a new contact message is submitted.
 * @param {{ name: string, email: string, message: string }} contactData
 */
async function sendContactNotification({ name, email, message }) {
  await resend.emails.send({
    from: '"Portfolio Contact Form" <' + process.env.EMAIL_FROM + '>',
    to: process.env.EMAIL_TO,
    replyTo: email,
    subject: `New portfolio contact message from ${name}`,
    text: `From: ${name} (${email})\n\nMessage:\n${message}`,
    html: `
      <h3>New contact form submission</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <p>${message.replace(/\n/g, '<br>')}</p>
    `
  });
}

module.exports = { sendContactNotification };
const express = require('express');
const router = express.Router();
const { sendContactNotification } = require('../services/email.service');
const contactController = require('../controllers/contact.controller');

router.route('/contactMessages').post(async (req, res) => {
  const { name, email, message } = req.body;
  try {
    await sendContactNotification({ name, email, message });
    await contactController.createContactMessage(req, res);
  } catch (emailErr) {
    console.error('Failed to send notification email:', emailErr);
    if (!res.headersSent) {
      res.status(500).json({ success: false, error: 'Failed to send email' });
    }
  }
});
module.exports = router;

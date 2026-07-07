const express = require('express');
const router = express.Router();
const { sendContactNotification } = require('../services/email.service');
const contactController = require('../controllers/contact.controller');

// router.post('/portfolio/contactMessages', contactController.createContactMessage);
// router.route('/contactMessages').post(contactController.createContactMessage);
router.route('/contactMessages').post(async (req, res) => {
  const { name, email, message } = req.body;
  await sendContactNotification({ name, email, message });
  try {
    res.status(201).json({ success: true, /* ...existing response */ });
  } catch (emailErr) {
    console.error('Failed to send notification email:', emailErr);
    res.status(500).json({ success: false, error: 'Failed to send email' });
  }
});
module.exports = router;

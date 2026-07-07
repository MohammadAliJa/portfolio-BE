const express = require('express');
const router = express.Router();
const { sendContactNotification } = require('../services/email.service');
const contactController = require('../controllers/contact.controller');

// router.post('/portfolio/contactMessages', contactController.createContactMessage);
router.route('/contactMessages').post(contactController.createContactMessage);
try {
    await sendContactNotification({ name, email, message });
  } catch (emailErr) {
    // Don't fail the whole request if email fails — the message is already saved
    console.error('Failed to send notification email:', emailErr);
  }
  res.status(201).json({ success: true, /* ...existing response */ });
  
module.exports = router;

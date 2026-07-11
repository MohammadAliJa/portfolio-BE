const express = require('express');
const router = express.Router();
const { sendContactNotification } = require('../services/email.service');
const contactController = require('../controllers/contact.controller');

router.route('/contactMessages').post(async (req, res) => {
  const { name, email, message } = req.body;
  
  // 1. Try to send email (but don't fail the whole request if it fails)
  try {
    await sendContactNotification({ name, email, message });
  } catch (emailErr) {
    console.error('Failed to send notification email (Render/Gmail issue):', emailErr);
    // We continue execution so the message still gets saved to Firestore!
  }

  // 2. Save to Firestore and return success to user
  await contactController.createContactMessage(req, res);
});
module.exports = router;

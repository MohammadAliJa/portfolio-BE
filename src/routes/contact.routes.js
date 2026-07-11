const express = require('express');
const router = express.Router();
const { sendContactNotification } = require('../services/email.service');
const contactController = require('../controllers/contact.controller');

router.route('/contactMessages').post(async (req, res) => {
  const { name, email, message } = req.body;

  // 1. Save to Firestore and return success to user IMMEDIATELY
  await contactController.createContactMessage(req, res);

  // 2. Send email in the background. 
  // We do NOT use 'await' here, so the user doesn't have to wait 60 seconds for Render's SMTP timeout.
  sendContactNotification({ name, email, message })
    .catch(emailErr => {
      console.error('Background task: Failed to send notification email:', emailErr.message);
    });
});
module.exports = router;

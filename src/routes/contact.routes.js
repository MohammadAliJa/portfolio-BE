const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contact.controller');

// router.post('/portfolio/contactMessages', contactController.createContactMessage);
router.route('/contactMessages').post(contactController.createContactMessage);

module.exports = router;

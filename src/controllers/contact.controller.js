const { ContactMessage } = require('../models/contactMessage.model');

exports.createContactMessage = async (req, res) => {
    try {
        const { name, email, message } = req.body;
        if (!name || !email || !message) {
            return res.status(400).json({ success: false, error: 'All fields (name, email, message) are required.' });
        }
        if (message.length > 2000) {
            return res.status(400).json({ success: false, error: 'Message is too long (maximum 2000 characters).' });
        }
        const savedMessage = await ContactMessage.create({ name, email, message });
        return res.status(201).json({ success: true, data: savedMessage });
    } catch (error) {
        console.error('Error saving contact message to Firestore:', error);
        return res.status(500).json({ success: false, error: 'Internal server error' });
    }
};

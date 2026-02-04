const { ContactMessage } = require('../models/contactMessage.model');

exports.createContactMessage = async (req, res) => {
    try {
        const { name, email, message } = req.body;

        // Validate input
        if (!name || !email || !message) {
            return res.status(400).json({
                success: false,
                error: 'Missing required fields'
            });
        }

        // Create and save document
        const newMessage = new ContactMessage({ name, email, message });
        const savedMessage = await newMessage.save();

        // Success response
        return res.status(201).json({
            success: true,
            data: savedMessage
        });

    } catch (error) {
        console.error('Error saving contact message:', error);

        // Handle Mongoose validation errors
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                success: false,
                error: 'Validation failed',
                details: error.message
            });
        }

        // Generic server error
        return res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
};

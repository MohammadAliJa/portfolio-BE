const mongoose = require('mongoose');
const { Schema } = mongoose;

const contactMessageSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            trim: true
        },
        message: {
            type: String,
            required: true,
            trim: true
        }
    },
    {
        timestamps: true,
        collection: 'contactMessages'
    }
);

const ContactMessage = mongoose.model('ContactMessage', contactMessageSchema);

module.exports = { ContactMessage };

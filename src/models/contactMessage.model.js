const { db } = require('../config/db-firestore');

const ContactMessage = {
  create: async (data) => {
    const docRef = db.collection('contactMessages').doc();
    const now = new Date();
    const messageData = {
      name: data.name.trim(),
      email: data.email.trim(),
      message: data.message.trim(),
      createdAt: now.toISOString(),
      updatedAt: now.toISOString()
    };
    await docRef.set(messageData);

    return {
      _id: docRef.id,
      ...messageData
    };
  }
};

module.exports = { ContactMessage };

const admin = require('firebase-admin');
const path = require('path');

try {
  const serviceAccountJson = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;

  if (serviceAccountJson) {
    // Production (Render): Load from string environment variable
    const serviceAccount = JSON.parse(serviceAccountJson);
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
  } else {
    // Local: Load from file
    const serviceAccountKeyPath = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
    if (serviceAccountKeyPath) {
      const resolvedPath = path.isAbsolute(serviceAccountKeyPath) 
        ? serviceAccountKeyPath 
        : path.resolve(path.join(__dirname, '../../environments', serviceAccountKeyPath));
      const serviceAccount = require(resolvedPath);
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
      });
    } else {
      admin.initializeApp({ projectId: 'mohammad-ali-jarjoumah-36cc1' });
    }
  }
} catch (error) {
  if (!/already exists/.test(error.message)) {
    console.error('Firebase Admin initialization error:', error);
  }
}

const db = admin.firestore();
module.exports = { db };

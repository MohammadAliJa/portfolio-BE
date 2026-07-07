const admin = require('firebase-admin');
const path = require('path');

try {
  const serviceAccountKeyPath = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

  if (serviceAccountKeyPath) {
    console.log(`Initializing Firebase Admin with service account from: ${serviceAccountKeyPath}`);
    // Resolve absolute path if relative path is provided in .env
    const resolvedPath = path.isAbsolute(serviceAccountKeyPath) 
      ? serviceAccountKeyPath 
      : path.resolve(path.join(__dirname, '../../environments', serviceAccountKeyPath));
    
    const serviceAccount = require(resolvedPath);
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
  } else {
    console.log('Initializing Firebase Admin with default credentials');
    admin.initializeApp({
      projectId: process.env.FIREBASE_PROJECT_ID || 'mohammad-ali-jarjoumah-36cc1'
    });
  }
} catch (error) {
  // If already initialized
  if (!/already exists/.test(error.message)) {
    console.error('Firebase Admin initialization error:', error);
  }
}

const db = admin.firestore();

module.exports = { db };

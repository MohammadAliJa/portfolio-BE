const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');
require('dotenv').config({
    path: path.join(__dirname, './environments/.env')
});

// Initialize firebase admin
try {
  const serviceAccountKeyPath = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

  if (serviceAccountKeyPath) {
    console.log(`Initializing Firebase Admin with service account from: ${serviceAccountKeyPath}`);
    const resolvedPath = path.isAbsolute(serviceAccountKeyPath) 
      ? serviceAccountKeyPath 
      : path.resolve(path.join(__dirname, './environments', serviceAccountKeyPath));
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
  console.error('Firebase Admin initialization error:', error);
  process.exit(1);
}

const db = admin.firestore();

async function migrate() {
  const jsonPath = path.join(__dirname, './src/contactMessages.json');
  console.log(`Reading source data from: ${jsonPath}`);
  
  if (!fs.existsSync(jsonPath)) {
    console.error(`Error: File not found at ${jsonPath}`);
    process.exit(1);
  }

  const raw = fs.readFileSync(jsonPath, 'utf-8');
  const documents = JSON.parse(raw);
  
  console.log(`Loaded ${documents.length} messages. Commencing migration to Firestore...`);

  const colRef = db.collection('contactMessages');

  for (const doc of documents) {
    const createdAt = doc.createdAt && doc.createdAt.$date ? new Date(doc.createdAt.$date) : new Date();
    const updatedAt = doc.updatedAt && doc.updatedAt.$date ? new Date(doc.updatedAt.$date) : new Date();

    const cleanDoc = {
      name: doc.name || '',
      email: doc.email || '',
      message: doc.message || '',
      createdAt: admin.firestore.Timestamp.fromDate(createdAt),
      updatedAt: admin.firestore.Timestamp.fromDate(updatedAt)
    };

    // Use MongoDB ObjectID string as Firestore Document ID to prevent duplicates if re-run
    const docId = doc._id && doc._id.$oid ? doc._id.$oid : undefined;
    
    if (docId) {
      await colRef.doc(docId).set(cleanDoc);
      console.log(`✅ Migrated: Document ID ${docId} for ${cleanDoc.name}`);
    } else {
      const newDoc = await colRef.add(cleanDoc);
      console.log(`✅ Migrated: Document ID ${newDoc.id} for ${cleanDoc.name}`);
    }
  }

  console.log('\n🎉 All documents migrated to Firestore successfully!');
}

migrate().catch(err => {
  console.error('Migration failed:', err);
});

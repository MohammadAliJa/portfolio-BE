const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config({
    path: path.join(__dirname, '../environments/.env')
});
// Initialize Firestore
require('./config/db-firestore');

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api', require('./routes/contact.routes'));

const allowedOrigins = [
  'https://mohammadalijarjoumah.com',
  'https://mohammad-ali-jarjoumah-36cc1.web.app',
  'http://localhost:4200'
];
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));
module.exports = app;

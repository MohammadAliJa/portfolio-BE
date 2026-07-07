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

module.exports = app;

const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config({
    path: path.join(__dirname, '../environments/.env')
});
const { connectMongoDB } = require('./config/db-mongo');

const app = express();

// Connect to MongoDB
connectMongoDB();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api', require('./routes/user.routes'));
app.use('/api', require('./routes/contact.routes'));

module.exports = app;

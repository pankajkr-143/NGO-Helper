const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const connectToDb = require('./db/db');
const userRoutes = require('./routes/user.routes');
const cookieParser = require('cookie-parser');

connectToDb();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Serve static files from the frontend directory
app.use(express.static(path.join(__dirname, '../frontend_Testing')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend_Testing/index.html'));
});

app.use('/users', userRoutes);

app.use((req, res) => {
  res.status(404).send('<h1>Error 404: Resource not found</h1>');
});

module.exports = app;
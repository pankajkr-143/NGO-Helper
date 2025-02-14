const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
// const path = require('path');
const app = express();
const connectToDb = require('./db/db');
const cookieParser = require('cookie-parser');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const bodyParser = require('body-parser');

const userRoutes = require('./routes/user.routes');
const contactRoute = require('./routes/contact.routes');
const supportRoute = require('./routes/support.routes');
const paymentRoute = require('./routes/payment.routes');
const volunteerRoute = require('./routes/volunteer.routes');
const donationRoutes = require('./routes/donate.routes');
const paymentSuccessRoutes = require('./routes/paymentSuccess.routes');
const cancelRoute = require('./routes/cancel.routes');
const paymentHistoriesRoute = require('./routes/paymentHistories.routes');

const corsOptions = {
  origin: `${process.env.BASE_URL}`,
  methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
  credentials: true,
};

connectToDb();

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(bodyParser.raw({ type: 'application/json' }));

app.use('/donations', donationRoutes);
app.use('/payments_cancel', cancelRoute);
app.use('/payments/histories', paymentHistoriesRoute);
app.use('/payment_Success', paymentSuccessRoutes);

app.use('/users', userRoutes);
app.use('/contact_form', contactRoute);
app.use('/support_By_Donating', supportRoute);
app.use('/paymentHis', paymentRoute);
app.use('/volunteer', volunteerRoute);

app.get("/", (req, res) => {
  res.send("Welcome to the backend of the website");
}); 

app.use((req, res) => {
  res.status(404).json({ message: "Error 404: Resource not found" });
});

module.exports = app;
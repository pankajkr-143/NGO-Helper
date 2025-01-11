const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const connectToDb = require('./db/db');
const userRoutes = require('./routes/user.routes');
const cookieParser = require('cookie-parser');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
  credentials: true,
};

connectToDb();

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/', (req, res) => {
  // res.render("hello");
  res.json({ message: "Welcome to the API" });
});


app.post('/donate', async (req, res) => {
  try {
    const { price } = req.body; 
    // Log the received price 
    if (!price) { 
      throw new Error('Price is required'); 
    }

    const session = await stripe.checkout.sessions.create({
      line_items: [{
        price_data: {
          currency: 'inr',
          product_data: {
            name: 'Donation',
          },
          unit_amount: price * 100,
          // * 100 to convert to pesa "unit conversion"
  
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: `${process.env.BASE_URL}/complete?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.BASE_URL}/cancel`,
    });
    res.json({ url: session.url });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/complete', async (req, res) => {
  const session = await stripe.checkout.sessions.retrieve(req.query.session_id);
  console.log(session);
  // res.send('Payment successful');
  res.json({ message: "Payment successful", session});
});
app.get('/cancel', (req, res) => {
  // res.send('Payment failed');
  res.json({ message: "Payment failed"});
});


app.use('/users', userRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Error 404: Resource not found" });
});

module.exports = app;
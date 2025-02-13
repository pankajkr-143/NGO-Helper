const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const path = require('path');
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



const { savePayment } = require('./controllers/payment.controller');


app.get("/", (req, res) => {
  res.send("Welcome to the backend of the website");
}); 

app.post('/donate', async (req, res) => {
  try {
    const { price, userId } = req.body;
    console.log('Received donation request with price:', price);
    console.log('Received donation request with userId:', userId);

    if (!price || !userId) {
      console.log('Price or userId is missing in the request');
      throw new Error('Price and userId are required');
    }

    const session = await stripe.checkout.sessions.create({
      line_items: [{
        price_data: {
          currency: 'inr',
          product_data: {
            name: 'Donation',
          },
          unit_amount: price * 100,
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: `${process.env.INTERNAL_URL}/paymentSuccess?session_id={CHECKOUT_SESSION_ID}&userId=${userId}`,
      cancel_url: `${process.env.BASE_URL}/cancel`,
    });
    console.log(`userID: ${userId}, Stripe session created: ${session.id}`);
    res.json({ url: session.url });
  } catch (error) {
    console.error('Error creating donation session:', error);
    res.status(500).json({ error: error.message });
  }
});


app.get('/paymentSuccess', async (req, res) => {
  const { session_id, userId } = req.query;

  try {
    const session = await stripe.checkout.sessions.retrieve(session_id);
    console.log('Payment successful:', session);
    console.log(`Retrieved session for user ID: ${userId}`);


    // Save payment details to database
    const paymentDetails = {
      email: session.customer_details.email,
      userId: userId,
      transactionId: session.payment_intent, 
      amountTotal: session.amount_total / 100,
      currency: session.currency,
      paymentStatus: session.payment_status,
      createdAt: new Date(),
      
    };

    const formattedDate = paymentDetails.createdAt.toLocaleString('en-IN', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric', 
      hour: 'numeric', 
      minute: 'numeric', 
      second: 'numeric', 
      hour12: true 
    }); 
    // Include the formatted date in the response 
    paymentDetails.formattedCreatedAt = formattedDate;
    // Your function to save details
    await savePaymentDetailsToDatabase(paymentDetails);

    res.redirect(`${process.env.BASE_URL}/paymentHistory`);

  } catch (error) {
    console.error('Error retrieving session:', error);
    res.status(500).send('Error retrieving session details');
  }
});

// function to save payment details to database -- Your database logic here
async function savePaymentDetailsToDatabase(paymentDetails) {
  try {
    const Payment = require('./models/paymentDetails.models');
    const payment = new Payment(paymentDetails);
    await payment.save();
    console.log('Payment saved successfully:', paymentDetails);
  } catch (error) {
    console.error('Error saving payment details:', error);
  }
}


app.get('/complete', async (req, res) => {
  try {
    console.log('Payment completion request received with session_id:', req.query.session_id);
    
    const session = await stripe.checkout.sessions.retrieve(req.query.session_id);
    console.log('Retrieved session details:', session);
    
    const customer = await stripe.customers.retrieve(session.customer);
    console.log('Retrieved customer details:', customer);
    
    const paymentIntent = await stripe.paymentIntents.retrieve(session.payment_intent);
    console.log('Retrieved payment intent details:', paymentIntent);

    // Create a structured payment history object
    const paymentHistory = {
      userId: session.userId,
      transactionId: session.id,
      amount: session.amount_total / 100, // Convert from cents to actual currency
      currency: session.currency,
      status: session.payment_status,
      createdAt: new Date(session.created * 1000), // Convert Unix timestamp to Date
      customerEmail: session.customer_details.email,
      paymentMethod: paymentIntent.payment_method_types[0],
      receiptUrl: session.receipt_url || null,
    };

    // Send the structured data instead of redirecting
    res.status(200).json({
      message: "Payment successful",
      paymentHistory,
      rawData: {
        session,
        customer,
        paymentIntent
      }
    });

  } catch (error) {
    console.error('Error processing payment completion:', error);
    res.status(500).json({ error: error.message });
  }
});

app.get('/cancel', (req, res) => {
  console.log('Payment cancelled by user');
  res.json({ message: "Payment failed"});
});

app.get('/paymentHistories', async (req, res) => {
  try {
    const Payment = require('./models/paymentDetails.models');
    const payments = await Payment.find({});
    res.json(payments);
  } catch (error) {
    console.error('Error fetching payment histories:', error);
    res.status(500).json({ error: error.message });
  }
});


app.use('/users', userRoutes);
app.use('/contact_form', contactRoute);
app.use('/support_By_Donating', supportRoute);
app.use('/paymentHis', paymentRoute);
app.use('/volunteer', volunteerRoute);




app.use((req, res) => {
  res.status(404).json({ message: "Error 404: Resource not found" });
});


module.exports = app;
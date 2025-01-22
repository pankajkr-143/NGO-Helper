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
app.use(bodyParser.raw({ type: 'application/json' }));



const { savePayment } = require('./controllers/payment.controller');

app.get('/', (req, res) => {
  // res.render("hello");
  res.json({ message: "Welcome to the API" });
});


app.post('/donate', async (req, res) => {
  try {
    const { price, userId } = req.body; 
    console.log('Received donation request with price:', price);

    if (!price) { 
      console.log('Price is missing in the request');
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
      success_url: 'http://localhost:4000/paymentSuccess?session_id={CHECKOUT_SESSION_ID}',
      cancel_url: `${process.env.BASE_URL}/cancel`,
      metadata: {
        userId 
      }
    });
    console.log('Stripe session created:', session.id);
    res.json({ url: session.url });
  } catch (error) {
    console.error('Error creating donation session:', error);
    res.status(500).json({ error: error.message });
  }
});

app.get('/paymentSuccess', async (req, res) => {
  const { session_id } = req.query;

  try {
    const session = await stripe.checkout.sessions.retrieve(session_id);
    console.log('Payment successful:', session);
    // console.log('Session metadata:', session.metadata);


    // Save payment details to database
    const paymentDetails = {
      // userId: session.metadata.userId,
      sessionId: session.id,
      transactionId: session.payment_intent, 
      amountTotal: session.amount_total / 100,
      currency: session.currency,
      paymentStatus: session.payment_status,
      createdAt: new Date(),
    };

    // if (!paymentDetails.userId) {
    //   throw new Error('Save payment userId is required');
    // }

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
    paymentDetails.formattedCreatedAt = formattedDate;
    await savePaymentDetailsToDatabase(paymentDetails);

    // Send confirmation email -- Your function to send email
    // await sendConfirmationEmail(session.customer_email, paymentDetails); 

    // Update user account  -- Your function to update user account
    // await updateUserAccount(session.customer_email); 

    // res.send('Payment was successful!');
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
    // Ensure userId is included in paymentDetails
    // if (!paymentDetails.userId) {
    //   throw new Error('paymentDetails userId is required');
    // }
    const payment = new Payment(paymentDetails);
    await payment.save(); 
    console.log('Payment saved successfully:', paymentDetails); 
  } catch (error) { 
    console.error('Error saving payment details:', error); 
  } 
}

app.post('/savePayment', async (req, res) => {
  try {
    const paymentDetails = req.body;
    // Ensure userId is included in the request body
    if (!paymentDetails.userId) {
      return res.status(400).send({ error: 'request body userId is required' });
    }
    await savePaymentDetailsToDatabase(paymentDetails);
    res.status(200).send({ message: 'Payment details saved successfully' });
  } catch (error) {
    res.status(500).send({ error: 'Error saving payment details' });
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



app.use((req, res) => {
  res.status(404).json({ message: "Error 404: Resource not found" });
});


module.exports = app;

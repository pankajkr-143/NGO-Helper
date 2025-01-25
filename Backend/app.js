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
    const { price } = req.body; 
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
      // success_url: `${process.env.BASE_URL}/complete?session_id={CHECKOUT_SESSION_ID}`
      // success_url: `${process.env.BASE_URL}/paymentHistory`,
      // success_url: `${process.env.BASE_URL}/paymentHistory?session_id={CHECKOUT_SESSION_ID}`,
      success_url: 'http://localhost:4000/paymentSuccess?session_id={CHECKOUT_SESSION_ID}',
      cancel_url: `${process.env.BASE_URL}/cancel`,
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

    // Save payment details to database
    const paymentDetails = {
      // sessionId: session.id,
      transactionId: session.payment_intent, 
      amountTotal: session.amount_total / 100,
      currency: session.currency,
      paymentStatus: session.payment_status,
      createdAt: new Date()
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
    const payment = new Payment({
      ...paymentDetails,
      userId: paymentDetails.userId // Ensure userId is included
    });
    await payment.save(); 
    console.log('Payment saved successfully:', paymentDetails); 
  } catch (error) { 
    console.error('Error saving payment details:', error); 
  } 
}
// function to send confirmation email -- Your email sending logic here
// async function sendConfirmationEmail(email, paymentDetails) {
  // console.log('Sending confirmation email to:', email);
// }

// function to update user account
// async function updateUserAccount(email) {
  // Your user account updating logic here
  // console.log('Updating user account for:', email);
// }



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



app.use((req, res) => {
  res.status(404).json({ message: "Error 404: Resource not found" });
});


module.exports = app;

module.exports = app;
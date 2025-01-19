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
// const paymentRoute = require('./routes/payment.routes');

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


// const { savePayment } = require('./controllers/payment.controller');

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
      success_url: `${process.env.BASE_URL}/complete?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.BASE_URL}/cancel`,
    });
    console.log('Stripe session created:', session.id);
    res.json({ url: session.url });
  } catch (error) {
    console.error('Error creating donation session:', error);
    res.status(500).json({ error: error.message });
  }
});


// app.post('/webhook', async(req, res) => { 
//   const sig = req.headers['stripe-signature']; 
//   let event; 
//   try { 
//     event = stripe.webhooks.constructEvent(req.body, sig, 'YOUR_STRIPE_WEBHOOK_SECRET'); 
//   } catch (err) { 
//     return res.status(400).send(`Webhook Error: ${err.message}`); 
//   } 
//   if (event.type === 'checkout.session.completed') { 
//     const session = event.data.object; 
//     // Extract relevant payment details from session 
//     const paymentData = { 
//       userId: session.client_reference_id, transactionId: session.id, 
//       amount: session.amount_total / 100, currency: session.currency, 
//       paymentStatus: session.payment_status 
//     }; 

//     req.body.session = paymentData;

//     try {
      
//       await (async () => {
//         savePayment(req, res);
//       }) ();
//       if (!res.headersSent) { 
//         res.status(201).json({ message: 'Payment saved successfully' }); 
//       }
//     } catch (error) {
//       console.error('Error saving payment data:', error); 
//       res.status(500).json({ error: error.message });
//     }
//   } else {
//     res.json({ received: true});
//   } 
//   });

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

// app.get('/api/payments', async (req, res) => {
//   try {
//     // Replace with actual retrieval from your database
//     const payments = await Payment.find();
//     res.status(200).json(payments);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });



app.use('/users', userRoutes);
app.use('/contact_form', contactRoute);
app.use('/support_By_Donating', supportRoute);
// app.use('/paymentHis', paymentRoute);



app.use((req, res) => {
  res.status(404).json({ message: "Error 404: Resource not found" });
});

module.exports = app;
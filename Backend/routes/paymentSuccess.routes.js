const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { savePaymentDetailsToDatabase } = require('../controllers/savePaymentDetails.controller');

router.get('/paymentSuccess', async (req, res) => {
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

    // Save payment details to the database
    await savePaymentDetailsToDatabase(paymentDetails);

    res.redirect(`${process.env.BASE_URL}/paymentHistory`);

  } catch (error) {
    console.error('Error retrieving session:', error);
    res.status(500).send('Error retrieving session details');
  }
});

module.exports = router;

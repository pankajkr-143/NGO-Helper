const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

router.post('/donate', async (req, res) => {
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
      success_url: `${process.env.INTERNAL_URL}/payment_Success/paymentSuccess?session_id={CHECKOUT_SESSION_ID}&userId=${userId}`,
      cancel_url: `${process.env.INTERNAL_URL}/payments_cancel/cancel`,
    });
    console.log(`userID: ${userId}, Stripe session created: ${session.id}`);
    res.json({ url: session.url });
  } catch (error) {
    console.error('Error creating donation session:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

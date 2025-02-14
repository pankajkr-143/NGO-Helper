const express = require('express');
const router = express.Router();
const Payment = require('../models/paymentDetails.models');

router.get('/paymentHistories', async (req, res) => {
  try {
    const payments = await Payment.find({});
    res.json(payments);
  } catch (error) {
    console.error('Error fetching payment histories:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

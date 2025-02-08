const Payment = require('../models/paymentDetails.models');

const savePayment = async (req, res) => {
  try {
    const session = req.body.session;
    const userId = req.body.userId; // Ensure userId is included
    const payment = new Payment({
      ...session,
      userId: userId // Include userId in the payment details
    });
    await payment.save();
  
    res.status(201).json({ message: 'Payment saved successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { savePayment };
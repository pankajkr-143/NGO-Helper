const Payment = require('../models/paymentDetails.models');

async function savePaymentDetailsToDatabase(paymentDetails) {
  try {
    const payment = new Payment(paymentDetails);
    await payment.save();
    console.log('Payment saved successfully:', paymentDetails);
  } catch (error) {
    console.error('Error saving payment details:', error);
  }
}

module.exports = { savePaymentDetailsToDatabase };

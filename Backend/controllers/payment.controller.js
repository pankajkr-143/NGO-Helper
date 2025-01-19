const Payment = require('../models/paymentDetails.models');


const savePayment = async (req, res) => {
  try {
    const session = req.body.session; 
    const payment = new Payment(session); 
    await payment.save();
  
    res.status(201).json({ message: 'Payment saved successfully' }); 
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getPayments = async (req, res) => { 
  try { 
    const payments = await Payment.find(); 
    res.status(200).json(payments); 
  } catch (error) { 
    res.status(500).json({ error: error.message }); 
  } 
}; 

module.exports = { savePayment, getPayments, };
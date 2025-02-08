const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  userId: { 
    type: String,
    required: true,    
  },
  email: { 
    type: String,
    required: true,
  },
  transactionId: {
    type: String,
    required: true,
  },
  amountTotal: { 
    type: Number, 
    required: true, 
  }, 
  currency: { 
    type: String, 
    required: true, 
  }, 
  paymentStatus: { 
    type: String, 
    required: true, 
  }, 
  createdAt: { 
    type: Date, 
  },
});

module.exports = mongoose.model('Payment', paymentSchema);
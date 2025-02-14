const express = require('express');
const router = express.Router();

router.get('/cancel', (req, res) => {
  console.log('Payment cancelled by user');
  // res.json({ message: "Payment failed" });
  res.redirect(`${process.env.BASE_URL}/paymentHistory`);
});

module.exports = router;

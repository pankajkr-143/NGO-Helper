const express = require('express');

const router = express.Router();
const {savePayment, getPayments} = require("../controllers/payment.controller");

router.post('/save-payment', savePayment);
// router.get('/payments', getPayments);

module.exports = router;
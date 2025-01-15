const express = require("express");
const router = express.Router();
const supports = require("../controllers/support.controller")


router.route('/support').get(supports);

module.exports = router;



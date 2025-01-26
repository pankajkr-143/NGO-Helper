// Initialize express router
const express = require("express");
const router = express.Router();
const volunteerController = require("../controllers/volunteer.controller");

router.post("/volunteer", volunteerController.createVolunteer);

module.exports = router;

const volunteerModel = require('../models/volunteer.models');

// Create a new volunteer

module.exports.createVolunteer = async (req, res, next) => {
    try {
        const newVolunteer = new volunteerModel(req.body);
        await newVolunteer.save();
        res.status(201).json(newVolunteer);
    } catch (error) {
        next(error);
    }
};
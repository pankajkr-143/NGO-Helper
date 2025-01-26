const mongoose = require('mongoose');

const volunteerSchema = new mongoose.Schema({
  fullName:{
    type: String,
    required: true,
    minlength: 3,
  },
  Dob:{
    type: Date,
    required: true,
  },
  phoneNo:{
    type: Number,
    required: true,
    maxlength: 10,
  },
  email:{
    type: String,
    required: true,
  },
  city:{
    type: String,
    required: true,
  },
  state:{
    type: String,
    required: true,
  },
  address:{
    type: String,
    required: true,
  },
  pincode:{
    type: Number,
    required: true,
  },
  availability:{
    type: Date,
    required: true,
  },
  skills:{
    type: String,
    required: true,
  },
  experience:{
    type: String,
    required: true,
  },
  interest:{
    type: String,
    required: true,
  },
  reason:{
    type: String,
    required: true,
  },
  reference:{
    type: String,
    required: true,
  },
});

const volunteerModel = mongoose.model('volunteer', volunteerSchema);

module.exports = volunteerModel;

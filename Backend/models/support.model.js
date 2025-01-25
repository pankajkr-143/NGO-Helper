const mongoose = require('mongoose');

const supportSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageLink: {
    type: String,
    required: true,
  },
  alt: {
    type: String,
    required: true,
  },
  donationAmount: {
    type: Number,
    required: true,
  },
});


const Support = mongoose.model("Support", supportSchema);

module.exports = Support;
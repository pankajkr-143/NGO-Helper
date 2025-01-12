const { Schema, model } = require("mongoose");

const contactSchema = new Schema({
  username: { type: String, required: true},
  email: { type: String, required: true},
  subject: { type: String, required: true},
  message: { type: String, required: true},
});

const Contact = model("Contact", contactSchema);
module.exports = Contact;
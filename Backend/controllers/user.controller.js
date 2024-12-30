const userModel = require('../models/user.model');

const userService = require('../services/user.service');

const {validationResult} = require('express-validator');
// const bcrypt = require('bcrypt');

module.exports.registerUser = async(req, res, next) => {
  
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({errors : errors.array() });
  }

  const { fullname, email, password} = req.body;
  
  console.log(req.body);
  
  const hashedPassword = await userModel.hashPassword(password);
  // const hashedPassword = await bcrypt.hash(password, 10); 
  
  const user = await userService.createUser({ 
    firstname: fullname.firstname, 
    lastname: fullname.lastname, 
    email, 
    password: hashedPassword 
  });

  const token = user.generateAuthToken();

  res.status(201).json({ token, user});

}

module.exports.loginUser = async(req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({errors : errors.array() });
  }

  const { email, password } = req.body;

  const user = await userModel.findOne({ email }).select('+password');

  if (!user) {
    return res.status(401).json({message: 'Invalid Email'});
  }

  const isMatch = await userModel.comparePassword(password, user.password);

  if (!isMatch) {
    return res.status(401).json({message: 'Invalid Email'});
  }

  const token = user.generateAuthToken();

  res.status(200).json({ token, user });
}

// module.exports.getUserProfile = async(req, res, next) => {
//   res.status(200).json(req.user);
// }
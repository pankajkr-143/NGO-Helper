const userModel = require('../models/user.model');
const userService = require('../services/user.service');
const {validationResult} = require('express-validator');
const blacklistTokenModel = require('../models/blacklistToken.model');

// register a new user and verify the field values.

module.exports.registerUser = async(req, res, next) => {
  
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({errors : errors.array() });
  }

  const { fullname, email, password} = req.body;
  console.log(req.body);

  const isUserAlreadyExist = await userModel.findOne({ email });

  if (isUserAlreadyExist) {
    return res.status(400).json({message: 'User already exist'});
  }
  
  
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

// Login a user and verify the field values.

module.exports.loginUser = async(req, res, next) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({errors : errors.array() });
  }

  const { email, password } = req.body;

  const user = await userModel.findOne({ email }).select('+password');

  if (!user) {
    return res.status(401).json({message: 'Invalid Email or password'});
  }

  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    return res.status(401).json({message: 'Invalid Email or password'});
  }

  const token = user.generateAuthToken();

  res.cookie('token', token);

  res.status(200).json({ token, user });
}

// Get user profile

module.exports.getUserProfile = async(req, res, next) => {
  res.status(200).json(req.user);
}

// Logout a user

module.exports.logoutUser = async(req, res, next) => {
  res.clearCookie('token');
  const token = req.cookies.token || req.headers.authorization.split(' ')[1];

  await blacklistTokenModel.create({ token });

  res.status(200).json({message: 'Logged out successfully'});
}
const userModel = require('../models/user.model');

const userService = require('../services/user.service');

const {validationResult} = require('express-validator');
// const bcrypt = require('bcrypt');

module.exports.registerUser = async(req, res, next) => {
  
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({errors : errors.array() });
  }

  console.log(req.body);
  
  const { fullname, email, password} = req.body;

  const hashedPassword = await userModel.hashPassword(password);
  // const hashedPassword = await bcrypt.hash(password, 10); 
  
  // try { 
    const user = await userService.createUser({ 
    firstname: fullname.firstname, 
    lastname: fullname.lastname, 
    email, 
    password: hashedPassword 
  });

  // const user = await userService.createUser({
  //   firstname: fullname.firstname,
  //   lastname: fullname.lastname,
  //   email,
  //   password: hashedPassword
  // })

  const token = user.generateAuthToken();

  res.status(201).json({ token, user});

}
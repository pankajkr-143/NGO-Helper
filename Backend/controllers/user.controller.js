const userModel = require('../models/user.model');
const userService = require('../services/user.service');
const { validationResult } = require('express-validator');
const blacklistTokenModel = require('../models/blacklistToken.model');

// Helper function for validation
const handleValidationErrors = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
};

// Register a new user and verify the field values.
const registerUser = async (req, res) => {
  handleValidationErrors(req, res);  // Handle validation errors

  const { username, email, password, confirmPassword } = req.body;

  try {
    // Check if the user already exists
    const isUserAlreadyExist = await userModel.findOne({ email });
    if (isUserAlreadyExist) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash passwords
    const hashedPassword = await userModel.hashPassword(password);

    // Create new user
    const user = await userService.createUser({
      username,
      email,
      password: hashedPassword,
      confirmPassword: hashedPassword, // Save only the hashed password
    });

    if (user) {
      const token = user.generateAuthToken();
      res.status(201).json({ token, user: { userId: user._id } });
    } else {
      res.status(400).json({ message: 'Registration failed' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Login a user and verify the field values.
const loginUser = async (req, res) => {
  handleValidationErrors(req, res);  // Handle validation errors

  const { email, password } = req.body;

  try {
    // Check if the user exists
    const user = await userModel.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Compare passwords
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = user.generateAuthToken();
    const userId = user._id.toString();

    res.cookie('token', token);
    res.status(200).json({ token, userId, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get user profile
const getUserProfile = async (req, res) => {
  try {
    const userData = req.user;
    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ userData });
  } catch (error) {
    console.error(`Error getting user profile: ${error}`);
    res.status(500).json({ message: 'Server error' });
  }
};

// Logout a user
const logoutUser = async (req, res) => {
  try {
    res.clearCookie('token');
    const token = req.cookies.token || req.headers.authorization.split(' ')[1];

    await blacklistTokenModel.create({ token });

    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    console.error(`Error logging out user: ${error}`);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  logoutUser,
};

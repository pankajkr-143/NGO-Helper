const express = require('express');
const router = express.Router();
// Controller import
const userController = require('../controllers/user.controller');

console.log("userController :", userController);
// Authentication middleware
const { authMiddleware } = require('../middlewares/auth.middleware'); 

// Validation middleware import
const {
  validateRequest,
  registerValidationRules,
  loginValidationRules,
} = require('../middlewares/validationMiddleware');

// Registering a new user
router.post(
  '/register',
  registerValidationRules,   // Validation rules
  validateRequest,            // Validation middleware
  userController.registerUser
);

// Login a user
router.post(
  '/login',
  loginValidationRules,      // Validation rules
  validateRequest,           // Validation middleware
  userController.loginUser
);

// Get user profile
router.get(
  '/profile', 
  authMiddleware,
  userController.getUserProfile
);

// Logout a user
router.get(
  '/logout', 
  authMiddleware, 
  userController.logoutUser
);

module.exports = router;

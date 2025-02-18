const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const usergetProfileLogoutController = require('../controllers/getProfileLogout.controller');
// Authentication middleware
const { authUser } = require('../middlewares/auth.middleware'); 
// Validation middleware import
const {
  validateRequest,
  registerValidationRules,
  loginValidationRules,
} = require('../middlewares/validationMiddleware');

console.log('Logout User Function:', usergetProfileLogoutController.logoutUser);
console.log('Get User Profile Function:', usergetProfileLogoutController.getUserProfile);

// Registering a new user
router.post(
  '/register',
  registerValidationRules,   
  validateRequest,
  userController.registerUser
);
// Login a user
router.post(
  '/login',
  loginValidationRules,
  validateRequest,
  userController.loginUser
);
// Logout a user
router.get(
  '/logout', 
  authUser, 
  usergetProfileLogoutController.logoutUser
);
// Get user profile
router.get(
  '/profile', 
  authUser,
  usergetProfileLogoutController.getUserProfile
);

module.exports = router;

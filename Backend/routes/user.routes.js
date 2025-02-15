const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const usergetProfileLogoutController = require('../controllers/getProfilelogout.controller');
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
  authMiddleware, 
  usergetProfileLogoutController.logoutUser
);
// Get user profile
router.get(
  '/profile', 
  authMiddleware,
  usergetProfileLogoutController.getUserProfile
);

module.exports = router;

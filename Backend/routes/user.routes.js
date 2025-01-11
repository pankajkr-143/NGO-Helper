const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const userController = require("../controllers/user.controller");
const { authMiddleware } = require("../middlewares/auth.middleware");

// Registering a new user

router.post(
  "/register",
  [
    // checking Email
    body('email').isEmail().withMessage('Invalid Email'),
    // Checking length of name and verifying
    body('username')
      .isLength({ min: 3 })
      .withMessage(' name must be at least 3 character long'),
    // checking password length should not less than 6 char.
    body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 character long'),
    // checking confirm password
    body('confirmPassword')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 character long')
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error('Password confirmation does not match password');
        }
        return true;
      }),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('Validation errors:', errors.array());
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  userController.registerUser
)

// Login a user

router.post(
  '/login', 
  [
    // checking Email
    body('email').isEmail().withMessage('Invalid Email'),
    // checking password length should not less than 6 char.
    body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 character long'),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('Validation errors:', errors.array());
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  userController.loginUser
);

// Get user profile

router.get('/profile', authMiddleware, userController.getUserProfile);

// Logout a user

router.get('/logout', authMiddleware, userController.logoutUser);

module.exports = router;


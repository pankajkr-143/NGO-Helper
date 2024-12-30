const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const userController = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.post(
  "/register",
  [
    // checking Email
    body('email').isEmail().withMessage('Invalid Email'),
    // Checking length of name and verifying
    body('fullname.firstname')
      .isLength({ min: 3 })
      .withMessage(' name must be at least 3 character long'),
    // checking password length should not less than 6 char.
    body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 character long'),
  ],
  userController.registerUser
)

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
  userController.loginUser
);

// router.get('/profile', authMiddleware.authUser , userController.getUserProfile);

module.exports = router;

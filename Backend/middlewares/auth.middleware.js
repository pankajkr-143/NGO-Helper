const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const blackListTokenModel = require("../models/blacklistToken.model");

module.exports.authUser = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const isBlacklisted = await blackListTokenModel.findOne({ token: token });

  if (isBlacklisted) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded._id);

    req.user = user;

    return next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};
// verifying user to get user profile
module.exports.authMiddleware = async (req, res, next) => {
  // Log to check if middleware is called
  // console.log("authMiddleware called");
  const token = req.header("Authorization");

  if (!token) {
    console.log("No token provided");
    return res
      .status(401)
      .json({ message: "Unauthorized HTTP, Token not provided" });
  }
  

  const jwtToken = token.replace("Bearer", "").trim();
  console.log("token from auth middleware", jwtToken);

  try {
    const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET);
    console.log(decoded); 

    const user = await userModel.findById(decoded._id).select('username email');
    if (!user) {
      return res.status(401).json({ message: "Unauthorized. User not found." });
    }

    console.log(user); 
    req.user = user; // Attach user details to the request object
    req.token = token;
    req.userID = user._id;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized. Invalid token." });
  }
};

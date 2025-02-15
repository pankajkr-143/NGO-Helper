const userModel = require("../models/user.model");
const blacklistTokenModel = require("../models/blacklistToken.model");

const logoutUser = async (req, res) => {
  try {
    const token = req.cookies.token || req.headers.authorization.split(' ')[1];

    if (!token) {
      return res.status(400).json({ message: 'No token provided' });
    }

    await blacklistTokenModel.create({ token });

    res.clearCookie('token');
    return res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    console.error(`Error logging out user: ${error}`);
    res.status(500).json({ message: 'Server error' });
  }
};

const getUserProfile = async (req, res) => {
  try {
    const user = await userModel.findById(req.user._id).select("username email");
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ userData: user });
  } catch (error) {
    console.error(`Error fetching user profile: ${error}`);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  logoutUser,
  getUserProfile,
};

const userModel = require('../models/user.model');
module.exports.createUser = async ({
  username, email, password, confirmPassword
}) => {
  if (!username || !email || !password || !confirmPassword) {
    throw new Error('All fields are required');
  }
  const user = userModel.create({
    username,
    email,
    password,
    confirmPassword
  })

  return user;
}
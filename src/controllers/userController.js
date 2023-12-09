const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const RefreshToken = require("../models/refreshTokenModel");
// create Token
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: 60 });
};

// login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    RefreshToken.create({
      user: user._id,
      token: token,
    });
    res.status(200).json({ user, token });
  } catch (error) {
    res.status(400).json(error.message);
  }
};

// register
const signupUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.signup(email, password);
    const token = createToken(user._id);

    res.status(200).json({ user, token });
  } catch (error) {
    res.status(400).json(error.message);
  }
};
module.exports = { loginUser, signupUser };

const RefreshToken = require("../models/refreshTokenModel");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const requireAuth = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Authorization Token needed" });
  }
  const token = authorization.split(" ")[1];
  try {
    const tokenDoc = await RefreshToken.findOne({ token });
    if (!tokenDoc) {
      return res.status(401).json({ message: "Authentication failed" });
    }
    const { _id } = tokenDoc.user;
    req.user = await User.findOne({ _id }).select("_id");
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Request is not Authorized" });
  }
};
module.exports = requireAuth;

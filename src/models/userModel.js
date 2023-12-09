const mongoose = require("mongoose");
const brcypt = require("bcrypt");
const validator = require("validator");
const Schema = mongoose.Schema;

const userSchmena = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// signup
userSchmena.statics.signup = async function (email, password) {
  if (!email || !password) {
    throw Error("All Field Must be Fill");
  }
  if (!validator.isEmail(email)) {
    throw Error("Email is not Valid");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("Password is not Strong");
  }
  const exist = await this.findOne({ email });
  if (exist) {
    throw Error("Email Already In Use");
  }
  const salt = await brcypt.genSalt(10);
  const hash = await brcypt.hash(password, salt);

  const user = this.create({ email, password: hash });

  return user;
};

// login
userSchmena.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("All Field Must be Fill");
  }
  const user = await this.findOne({ email });
  if (!user) {
    throw Error("Invalid Email");
  }
  const match = await brcypt.compare(password, user.password);
  if (!match) {
    throw Error("Password Incorrect");
  }
  return user;
};
module.exports = mongoose.model("User", userSchmena);

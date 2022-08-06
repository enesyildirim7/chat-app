const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { Schema } = mongoose;
const { v4: uuidv4 } = require("uuid");

const UserModel = new Schema({
  _id: { type: String, default: uuidv4, immutable: true },
  username: { type: String, required: true, unique: true },
  firstName: { type: String, default: "" },
  lastName: { type: String, default: "" },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  isActive: { type: Boolean, default: true },
  isVerify: { type: Boolean, default: false },
  isAdmin: { type: Boolean, default: false },
  isStaff: { type: Boolean, default: false },
  created: { type: Date, default: Date.now(), immutable: true },
  updated: { type: Date, default: Date.now() },
  tokens: {
    accessToken: { type: String, default: "" },
    refreshToken: { type: String, default: "" },
  },
});

UserModel.pre("save", async (next) => {
  const user = this;
  const salt = bcrypt.genSalt(10);
  const hash = await bcrypt.hash(this.password, salt);
  this.password = hash;
  next();
});

UserModel.virtual("fullName").get(function () {
  return this.firstName + " " + this.lastName;
});

UserModel.methods.verifyPassword = async function (password) {
  const user = this;
  const compare = await bcrypt.compare(password, user.password);
  return compare;
};

UserModel.methods.setAccessToken = async function (accessToken) {
  const user = this;
  user.tokens.accessToken = accessToken;
};

UserModel.methods.setRefreshToken = async function (refreshToken) {
  const user = this;
  user.tokens.refreshToken = refreshToken;
};

UserModel.methods.getAccessToken = async function () {
  const user = this;
  return user.tokens.accessToken;
};

UserModel.methods.getRefreshToken = async function () {
  const user = this;
  return user.tokens.refreshToken;
};

UserModel.methods.removeAccessToken = async function () {
  const user = this;
  user.tokens.accessToken = "";
};

UserModel.methods.removeRefreshToken = async function () {
  const user = this;
  user.tokens.refreshToken = "";
};

module.exports = mongoose.model("User", UserModel);

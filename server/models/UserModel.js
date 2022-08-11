const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { Schema } = mongoose;
const { v4: uuidv4 } = require("uuid");

const UserModel = new Schema({
  _id: { type: String, default: uuidv4, immutable: true },
  username: { type: String, required: true, unique: true },
  firstName: { type: String, default: undefined },
  lastName: { type: String, default: undefined },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isActive: { type: Boolean, default: true },
  isVerify: { type: Boolean, default: false },
  isAdmin: { type: Boolean, default: false },
  isStaff: { type: Boolean, default: false },
  created: { type: Date, default: Date.now(), immutable: true },
  updated: { type: Date, default: Date.now() },
  tokens: {
    accessToken: { type: String, default: undefined },
    refreshToken: { type: String, default: undefined },
  },
});

UserModel.pre("save", function (next) {
  var user = this;

  if (!user.isModified("password")) return next();

  // generate a salt
  bcrypt.genSalt(10, function (err, salt) {
    if (err) return next(err);

    // hash the password using our new salt
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);
      // override the cleartext password with the hashed one
      user.password = hash;
      next();
    });
  });
});

UserModel.virtual("fullName").get(function () {
  return this.firstName + " " + this.lastName;
});

UserModel.methods.verifyPassword = async function (password = String) {
  const user = this;
  const compare = await bcrypt.compare(password, user.password);
  return compare;
};

UserModel.methods.setAccessToken = async function (accessToken = String) {
  this.tokens.accessToken = accessToken;
};

UserModel.methods.setRefreshToken = async function (refreshToken = String) {
  this.tokens.refreshToken = refreshToken;
};

UserModel.methods.getAccessToken = async function () {
  return this.tokens.accessToken;
};

UserModel.methods.getRefreshToken = async function () {
  return this.tokens.refreshToken;
};

UserModel.methods.removeAccessToken = async function () {
  this.tokens.accessToken = "";
};

UserModel.methods.removeRefreshToken = async function () {
  this.tokens.refreshToken = "";
};

module.exports = mongoose.model("User", UserModel);

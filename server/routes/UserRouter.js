const express = require("express");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const LocalStrategy = require("passport-local").Strategy;
const JwtCookieComboStrategy = require("passport-jwt-cookiecombo").Strategy;
const UserModel = require("../models/UserModel");
const {
  signup,
  login,
  logout,
  userData,
  getAllUsers,
  deleteUser,
  deleteAllUsers,
  refreshToken,
} = require("../controllers/UserControllers");
const { checkAuth, checkVerify } = require("../middlewares/auth");

const router = express.Router();

// User Create
router.post("/signup", signup);

// Login
router.post("/login", login);

// Get auth user info
router.get("/me", checkAuth, userData);

router.get("/checkauth", checkAuth, (req, res) => {
  res.status(200).send("Authorize");
});

// Logout
router.post("/logout", logout);

// Delete auth user
router.delete("/me", deleteUser);

// Get All Users
router.get("/all", getAllUsers);

// Delete All Users
router.delete("/delete/all", deleteAllUsers);

router.get("/refreshtoken", refreshToken);

module.exports = router;

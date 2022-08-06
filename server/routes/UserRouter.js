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
} = require("../controllers/UserControllers");
const { checkAuth } = require("../middlewares/auth");

const router = express.Router();

// User Create
router.post("/signup", signup);

// router.post("/login", passport.authenticate("jwt", { session: false }), login);

router.post("/login", login);

router.get("/me", checkAuth, userData);

router.get("/checkauth", checkAuth, async (req, res) => {
  res.clearCookie("access_token");
  res.cookie("access_token", newAccessToken, {
    httpOnly: true,
    secure: true,
  });
});

router.get("/logout", logout);

router.delete("/me", deleteUser);

// Get All Users
router.get("/all", getAllUsers);

router.delete("/delete/all", async (req, res) => {
  const idlist = [];
  const ids = await UserModel.find({});
  ids.forEach((user) => {
    idlist.push(user._id);
  });
  console.log(idlist);
  for (let i = 0; i < ids.length; i++) {
    UserModel.deleteOne({ _id: ids[i] });
  }
});

module.exports = router;

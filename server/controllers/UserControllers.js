const mongoose = require("mongoose");
const UserModel = require("../models/UserModel");
const jwt = require("jsonwebtoken");
const {
  signupVerify,
  loginVerify,
  signAccessJWT,
  signRefreshJWT,
} = require("../middlewares/auth");

const signup = async (req, res) => {
  if (req.body.username === undefined) {
    res.status(401).send("Username cannot be empty");
  } else if (req.body.email === undefined) {
    res.status(401).send("Email cannot be empty");
  } else {
    const checkUsername = await UserModel.findOne({ username: req.body.username });
    const checkEmail = await UserModel.findOne({ email: req.body.email });
    console.log(
      checkUsername?.username,
      "<->",
      req.body.username,
      " - ",
      checkEmail?.email,
      "<->",
      req.body.email
    );

    if (checkUsername?.username === req.body.username) {
      res.status(404).send("This username already exist.");
    } else if (checkEmail?.email === req.body.email) {
      res.status(404).send("This email already exist.");
    } else {
      const newUser = new UserModel({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
      });

      newUser
        .save()
        .then((data) => {
          res.status(201).send(data);
        })
        .catch(() => {
          res.status(404).send("User failed to registered");
        });
    }
  }
};

const login = async (req, res, next) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });
    if (!user) {
      res.status(401).send("This user does not exist.");
    } else {
      const validate = await user.verifyPassword(req.body.password);
      if (!validate) {
        res.status(401).send("Password is wrong.");
      } else {
        const accessToken = signAccessJWT(user._id, user.email);
        const refreshToken = signRefreshJWT(user._id, user.email);

        user.setAccessToken(accessToken);
        user.setRefreshToken(refreshToken);

        res.cookie("access_token", accessToken, {
          httpOnly: true,
          secure: true,
        });
        res.cookie("refresh_token", refreshToken, {
          httpOnly: true,
          secure: true,
        });

        return res
          .status(200)
          .send({ access_token: accessToken, refresh_token: refreshToken });
      }
    }
  } catch (error) {
    return next(error);
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("access_token");
    res.clearCookie("refresh_token");
    res.status(200).send("Logout");
  } catch (err) {
    res.status(401).send(err);
  }
};

const userData = (req, res) => {
  console.log(req.cookies);
  const jwt_token = String(req.cookies["access_token"]);
  console.log(jwt_token);
  const user = jwt.decode(jwt_token);
  console.log(user);
  UserModel.findById(user.user._id)
    .then((data) => {
      console.log("User:", data);
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

const getAllUsers = (req, res) => {
  UserModel.find({}).then((data) => {
    res.status(200).send(data);
  });
};

const deleteUser = (req, res) => {};

module.exports = {
  signup,
  login,
  logout,
  userData,
  getAllUsers,
  deleteUser,
};

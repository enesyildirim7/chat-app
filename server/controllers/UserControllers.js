const { UserModel } = require("../models/UserModel");
const _ = require("lodash");
const authConfig = require("../configs/authConfig");
const {
  signupVerify,
  loginVerify,
  signAccessJWT,
  signRefreshJWT,
  verifyRefreshJWT,
  verifyAccessJWT,
  checkVerify,
  tokenRefresh,
} = require("../middlewares/auth");

const signup = async (req, res) => {
  if (req.body.username === undefined) {
    res.status(401).send("Username cannot be empty");
  } else if (req.body.email === undefined) {
    res.status(401).send("Email cannot be empty");
  } else {
    const checkUsername = await UserModel.findOne({ username: req.body.username });
    const checkEmail = await UserModel.findOne({ email: req.body.email });

    if (checkUsername?.username === req.body.username) {
      res.status(404).send("This username already exist.");
    } else if (checkEmail?.email === req.body.email) {
      res.status(404).send("This email already exist.");
    } else {
      const newUser = new UserModel({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
      });

      newUser
        .save()
        .then(() => {
          res.status(201).send("Successfully registered");
        })
        .catch((err) => {
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

        res.cookie(authConfig.accessTokenName, accessToken, {
          httpOnly: true,
          secure: true,
        });
        res.cookie(authConfig.refreshTokenName, refreshToken, {
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
    const cookies = req.cookies;
    const accessToken = cookies.access_token;
    const refreshToken = cookies.refresh_token;
    if (accessToken && refreshToken) {
      const decodedRefresh = verifyRefreshJWT(refreshToken);

      const user = await UserModel.findById(decodedRefresh.id);
      if (user) {
        user.removeRefreshToken();
        user.removeAccessToken();

        res.clearCookie("access_token");
        res.clearCookie("refresh_token");
        res.status(200).send("Logout");
      } else {
        throw new Error("User does not exist.");
      }
    } else {
      res.status(200).send("User already logout.");
    }
  } catch (err) {
    res.status(401).send(err);
  }
};

const userData = (req, res) => {
  const accessToken = String(req.cookies.access_token);
  const user = verifyAccessJWT(accessToken);
  UserModel.findById(user.id)
    .then((data) => {
      const user = _.pick(data, [
        "firstName",
        "lastName",
        "username",
        "isActive",
        "isVerify",
        "isAdmin",
        "isStaff",
      ]);
      res.status(200).send(user);
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

const deleteAllUsers = async (req, res) => {
  try {
    const idlist = [];
    const ids = await UserModel.find({});
    ids.forEach((user) => {
      idlist.push(user._id);
    });
    for (let i = 0; i < ids.length; i++) {
      await UserModel.findByIdAndDelete(ids[i]);
    }
    res.status(200).send("All user deleted.");
  } catch {
    res.status(404).send("Silinmedi.");
  }
};

const refreshToken = async (req, res) => {
  try {
    const cookies = req.cookies;
    const refreshToken = cookies.refresh_token;
    if (refreshToken) {
      try {
        var verifiedRefresh = verifyRefreshJWT(refreshToken);
        const user = await UserModel.findById(verifiedRefresh.id);
        if (user) {
          const newAccessToken = await tokenRefresh(refreshToken);
          try {
            res.clearCookie(authConfig.jwtConf.accessTokenName);
            res.cookie(authConfig.jwtConf.accessTokenName, newAccessToken, {
              httpOnly: true,
              secure: true,
            });
            res.status(201).send("Access Token refreshed");
          } catch {
            res.status(404).send("Cookies are not set.");
          }
        } else {
          res.status(401).send("User does not exist.");
        }
      } catch {
        res.status(401).send("Token error.");
      }
    } else {
      res.status(401).send("Tokens not found in cookies");
    }
  } catch {
    res.status(401).send("Please login.");
  }
};

module.exports = {
  signup,
  login,
  logout,
  userData,
  getAllUsers,
  deleteUser,
  deleteAllUsers,
  refreshToken,
};

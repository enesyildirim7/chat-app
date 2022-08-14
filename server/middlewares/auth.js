const jwt = require("jsonwebtoken");
const authConfig = require("../configs/authConfig");
const { UserModel } = require("../models/UserModel");

const signAccessJWT = (id = String, email = String) => {
  try {
    const accessPayload = { id: id, email: email, type: authConfig.jwtConf.access };

    const accessToken = jwt.sign(accessPayload, authConfig.jwtConf.access_secret, {
      expiresIn: authConfig.jwtConf.access_expire,
    });

    return accessToken;
  } catch (err) {
    return err;
  }
};

const signRefreshJWT = (id = String, email = String) => {
  try {
    const refreshPayload = { id: id, email: email, type: authConfig.jwtConf.refresh };

    const refreshToken = jwt.sign(refreshPayload, authConfig.jwtConf.refresh_secret, {
      expiresIn: authConfig.jwtConf.refresh_expire,
    });

    return refreshToken;
  } catch (err) {
    return err;
  }
};

const verifyAccessJWT = (accessToken = String) => {
  if (
    accessToken === null ||
    accessToken === undefined ||
    typeof accessToken !== "string"
  ) {
    throw new Error("Access token is required");
  } else {
    try {
      const token = jwt.verify(accessToken, authConfig.jwtConf.access_secret);
      return token;
    } catch (err) {
      throw new Error(err);
    }
  }
};

const verifyRefreshJWT = (refreshToken = String) => {
  if (
    refreshToken === null ||
    refreshToken === undefined ||
    typeof refreshToken !== "string"
  ) {
    throw new Error("Refresh token is required");
  } else {
    try {
      const token = jwt.verify(refreshToken, authConfig.jwtConf.refresh_secret);
      return token;
    } catch (err) {
      throw new Error(err);
    }
  }
};

const tokenRefresh = async (refreshToken = String) => {
  try {
    const token = verifyRefreshJWT(refreshToken);
    var user = await UserModel.findById(token.id);
    if (user) {
      var newAccessToken = await signAccessJWT(user._id, user.email);
      user.setAccessToken(newAccessToken);
      return newAccessToken;
    } else {
      throw new Error("User does not exist.");
    }
  } catch (err) {
    throw new Error(err);
  }
};

const checkAuth = async (req, res, next) => {
  try {
    const cookies = req.cookies;
    const accessToken = cookies.access_token;
    const refreshToken = cookies.refresh_token;
    if (cookies.access_token && cookies.refresh_token) {
      try {
        var verifiedAccess = verifyAccessJWT(accessToken);
        const user = await UserModel.findById(verifiedAccess.id);

        if (user) {
          // res.status(200).send("Authorized");
          next();
        } else {
          throw new Error("User does not exist.");
        }
      } catch {
        const newAccessToken = await tokenRefresh(refreshToken);

        res.clearCookie(authConfig.jwtConf.accessTokenName);
        res.cookie(authConfig.jwtConf.accessTokenName, newAccessToken, {
          httpOnly: true,
          secure: true,
        });
        // res.status(200).send("New Access Token Set");
        next();
      }
    } else {
      throw new Error("Tokens not found in cookies");
    }
  } catch (err) {
    res.status(401).send("Please login.");
  }
};

const checkVerify = async (req, res, next) => {
  try {
    const cookies = req.cookies;
    const accessToken = cookies.access_token;
    if (accessToken) {
      const id = verifyAccessJWT(accessToken);
      const user = await UserModel.findById(id.id);
      if (user.isVerify) {
        next();
      } else if (!user.isVerify) {
        res.status(401).send("Please verify your email.");
      } else {
        throw new Error("User does not exist.");
      }
    } else {
      throw new Error("Access token not found in cookies");
    }
  } catch {
    res.status(404).send("Something went wrong.");
  }
};

module.exports = {
  signAccessJWT,
  signRefreshJWT,
  verifyRefreshJWT,
  verifyAccessJWT,
  tokenRefresh,
  checkAuth,
  checkVerify,
};

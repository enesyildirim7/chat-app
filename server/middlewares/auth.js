const passport = require("passport");
const jwt = require("jsonwebtoken");
const LocalStrategy = require("passport-local").Strategy;
const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
const JwtCookieComboStrategy = require("passport-jwt-cookiecombo").Strategy;
const UserModel = require("../models/UserModel");

const jwtConf = {
  accessTokenName: "access_token",
  refreshTokenName: "refresh_token",
  access_secret: "ACCESS_SECRET",
  refresh_secret: "REFRESH_SECRET",
  access_expire: "10m",
  refresh_expire: "30d",
  access: "access",
  refresh: "refresh",
};

const signAccessJWT = (id = String, email = String) => {
  try {
    const accessPayload = { id: id, email: email, type: jwtConf.access };

    const accessToken = jwt.sign(accessPayload, jwtConf.access_secret, {
      expiresIn: jwtConf.access_expire,
    });

    return accessToken;
  } catch (err) {
    return err;
  }
};

const signRefreshJWT = (id = String, email = String) => {
  try {
    const refreshPayload = { id: id, email: email, type: jwtConf.refresh };

    const refreshToken = jwt.sign(refreshPayload, jwtConf.refresh_secret, {
      expiresIn: jwtConf.refresh_expire,
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
      const token = jwt.verify(accessToken, jwtConf.access_secret);
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
      const token = jwt.verify(refreshToken, jwtConf.refresh_secret);
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
      var newAccessToken = await signAccessJWT(token.id, token.email);
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

        res.clearCookie(jwtConf.accessTokenName);
        res.cookie(jwtConf.accessTokenName, newAccessToken, {
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

// passport.use(
//   "signup",
//   new LocalStrategy(
//     { usernameField: "email", passwordField: "password", session: false },
//     signupVerify
//   )
// );

// passport.use(
//   "login",
//   new LocalStrategy(
//     { usernameField: "email", passwordField: "password", session: false },
//     loginVerify
//   )
// );

// const cookieExtractor = function (req) {
//   const token = null;
//   if (req && req.cookies) {
//     console.log(req.cookies);
//     token = req.cookies["access_token"];
//   }
//   return token;
// };

// passport.use(
//   "jwt",
//   new JWTStrategy(
//     {
//       secretOrKey: jwtConf.secretKey,
//       jwtFromRequest: ExtractJWT.fromHeader(),
//     },
//     async (jwt_payload, done) => {
//       UserModel.findOne({ _id: jwt_payload._id }, (err, user) => {
//         if (err) return done(err, false);
//         if (user) return done(null, user);
//         else {
//           return done(null, false);
//         }
//       });
//       try {
//         return done(null, token.user);
//       } catch (error) {
//         done(error);
//       }
//     }
//   )
// );

module.exports = {
  signAccessJWT,
  signRefreshJWT,
  verifyRefreshJWT,
  verifyAccessJWT,
  checkAuth,
  checkVerify,
};

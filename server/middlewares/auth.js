const passport = require("passport");
const jwt = require("jsonwebtoken");
const LocalStrategy = require("passport-local").Strategy;
const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
const JwtCookieComboStrategy = require("passport-jwt-cookiecombo").Strategy;
const UserModel = require("../models/UserModel");

const jwtConf = {
  access_secret: "ACCESS_SECRET",
  refresh_secret: "REFRESH_SECRET",
  access_expire: "10m",
  refresh_expire: "30d",
  access: "access",
  refresh: "refresh",
};

const signAccessJWT = (id, email) => {
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

const signRefreshJWT = (id, email) => {
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
  try {
    const token = jwt.verify(accessToken, jwtConf.access_secret);
    return token;
  } catch (err) {
    return err;
  }
};

const verifyRefreshJWT = (refreshToken = String) => {
  try {
    const token = jwt.verify(refreshToken, jwtConf.refresh_secret);
    return token;
  } catch (err) {
    return err;
  }
};

const tokenRefresh = async (refreshToken = String) => {
  try {
    const token = verifyRefreshJWT(refreshToken);
    var user = await UserModel.findById(token.id);

    if (user) {
      console.log("r", 1);
      var newAccessToken = await signAccessJWT(token.id, token.email);
      user.setAccessToken(newAccessToken);
      return newAccessToken;
    }
  } catch (err) {
    console.log("r", 2);
    console.log(err);
    return err;
  }
};

const checkAuth = async (req, res, next) => {
  try {
    const cookies = req.cookies;
    if (cookies.access_token && cookies.refresh_token) {
      const accessToken = cookies.access_token;
      const refreshToken = cookies.refresh_token;

      try {
        var verifiedAccess = verifyAccessJWT(accessToken);
        const user = await UserModel.findById(verifiedAccess.id);

        // const expAccess = new Date(verifiedAccess.exp * 1000);
        if (user) {
          console.log(1);
          res.status(200).send("Authorized");
        }
      } catch {
        console.log(2);
        const newAccessToken = await tokenRefresh(refreshToken);

        // res.status(200).send("Access token refreshed");
        next(newAccessToken);
      }
    }
  } catch (err) {
    console.log(3);
    console.log(err);
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

module.exports = { signAccessJWT, signRefreshJWT, checkAuth };

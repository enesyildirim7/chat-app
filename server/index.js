const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const session = require("express-session");
const cookieSession = require("cookie-session");
const mongoose = require("mongoose");
const http = require("http");
const socketIo = require("socket.io");
const server = http.createServer(app);
const port = 5000;
const mongoConfig = require("./configs/mongodb.json");

const initRoutes = require("./routes/initRoutes");

const corsOptions = {
  origin: "http://localhost:4000",
  optionsSuccessStatus: 200,
  credentials: true,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({ secret: "keyboard cat", resave: false, saveUninitialized: false }));
// app.use(passport.initialize());
// app.use(passport.session());

// passport.serializeUser(function (user, done) {
//   done(null, user);
// });

// passport.deserializeUser(function (user, done) {
//   done(null, user);
// });

mongoose.connect(mongoConfig.local, { useNewUrlParser: true });
const database = mongoose.connection;

initRoutes(app);

database.on("error", (error) => {
  console.log(error);
});

database.once("connected", () => {
  console.log("Database connected");
});

app.get("/", (req, res) => {
  res.send("<h1>Server</h1>");
});

app.listen(port, () => {
  console.log("Server run: ", port);
});

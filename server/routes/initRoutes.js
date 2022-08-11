const auth = require("../middlewares/auth");
const UserRouter = require("./UserRouter");
const MessageRouter = require("./MessageRouter");
const ChannelRouter = require("./ChannelRouter");

module.exports = initRoutes = (app) => {
  app.use("/api/user/", UserRouter);
  app.use("/api/message/", auth.checkAuth, MessageRouter);
  app.use("/api/channel/", auth.checkAuth, ChannelRouter);
};

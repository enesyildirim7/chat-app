const { ChannelModel } = require("../models/ChannelModel");

const createChannel = (req, res) => {
  const newChannel = new ChannelModel({
    name: req.body.name,
    creator: req.body.username,
  });
  newChannel
    .save()
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(404).send(err.message || err);
    });
};

const updateChannel = (req, res) => {};

const getAllChannels = (req, res) => {
  ChannelModel.find({})
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(404).send(err.message || err);
    });
};

const getOwnChannels = (req, res) => {
  try {
    const cookies = req.cookies;
    const accessToken = cookies.accessToken;
    if (accessToken) {
      const verifiedAccess = verifyAccessJWT(accessToken);
      const userChannels = ChannelModel.find({ creator: verifiedAccess.id });
    } else {
      throw new Error("Access Token is not found.");
    }
  } catch {
    res.status(404).send("Something went wrong.");
  }
};

const getChannel = (req, res) => {};

const deleteChannel = (req, res) => {};

module.exports = {
  createChannel,
  updateChannel,
  getAllChannels,
  getOwnChannels,
  getChannel,
  deleteChannel,
};

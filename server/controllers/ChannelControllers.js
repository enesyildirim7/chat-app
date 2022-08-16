const { ChannelModel } = require("../models/ChannelModel");
const { UserModel } = require("../models/UserModel");
const { verifyAccessJWT } = require("../middlewares/auth");

const createChannel = async (req, res) => {
  try {
    const cookies = req.cookies;
    const accessToken = cookies.access_token;
    if (accessToken) {
      const userId = verifyAccessJWT(accessToken);
      const creator = await UserModel.findById(userId.id);
      const newChannel = new ChannelModel({
        name: req.body.name,
        creator: creator,
      });
      newChannel
        .save()
        .then((data) => {
          res.status(200).send(data);
        })
        .catch((err) => {
          res.status(404).send(err.message || err);
        });
    } else {
      throw new Error("Access token not found in cookies.");
    }
  } catch (err) {
    res.status(404).send(err.message);
  }
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

const getOwnChannels = async (req, res) => {
  try {
    const cookies = req.cookies;
    const accessToken = cookies.access_token;
    if (accessToken) {
      const userId = verifyAccessJWT(accessToken);
      const userChannels = await ChannelModel.find({
        "creator._id": userId.id,
      });
      res.status(200).send(userChannels);
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

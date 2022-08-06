const mongoose = require("mongoose");
const ChannelModel = require("../models/ChannelModel");

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

const getChannel = (req, res) => {};

const deleteChannel = (req, res) => {};

module.exports = {
  createChannel,
  updateChannel,
  getAllChannels,
  getChannel,
  deleteChannel,
};

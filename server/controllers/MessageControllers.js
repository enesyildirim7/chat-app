const mongoose = require("mongoose");
const MessageModel = require("../models/MessageModel");

const createMessage = (req, res) => {
  const newMessage = new MessageModel({
    message: String(req.body.message),
  });

  newMessage.save().then(() => res.status(200).send(newMessage));
};

const getMessage = (req, res) => {
  const messageId = String(req.params.id);
  MessageModel.findById(messageId).then((data) => {
    res.status(200).send(data);
  });
};

const getAllMessages = (req, res) => {
  MessageModel.find({}).then((data) => {
    res.status(200).json(data);
  });
};

const deleteMessage = (req, res) => {
  const messageId = String(req.params.id);

  MessageModel.deleteOne({ _id: messageId }).then(() => res.status(200).send("Deleted"));
};

module.exports = {
  createMessage,
  getMessage,
  getAllMessages,
  deleteMessage,
};

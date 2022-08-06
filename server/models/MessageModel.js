const mongoose = require("mongoose");
const { Schema } = mongoose;
const { v4: uuidv4 } = require("uuid");

const MessageModel = new Schema({
  _id: { type: String, default: uuidv4 },
  message: { type: String },
  sender: { type: String }, // TODO: Relation with user
  created: { type: Date, default: Date.now() },
  updated: { type: Date, default: Date.now() },
});

module.exports = mongoose.model("Message", MessageModel);

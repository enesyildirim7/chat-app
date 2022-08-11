const mongoose = require("mongoose");
const { Schema } = mongoose;
const { v4: uuidv4 } = require("uuid");

const MessageModel = new Schema({
  _id: { type: String, default: uuidv4 },
  message: { type: String },
  sender: {
    _id: { type: String, immutable: true },
    username: { type: String, required: true },
    fullName: { type: String, required: true },
  }, // TODO: Relation with user
  created: { type: Date, default: Date.now() },
  updated: { type: Date, default: Date.now() },
});

module.exports = mongoose.model("Message", MessageModel);

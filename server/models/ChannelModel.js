const mongoose = require("mongoose");
const { Schema } = mongoose;
const { v4: uuidv4 } = require("uuid");

const ChannelModel = new Schema({
  _id: { type: String, default: uuidv4 },
  name: { type: String, required: true },
  desciption: { type: String },
  creator: { type: String, ref: "user" },
  members: [{ type: Array }], //TODO: Relation with user
  messages: [
    {
      _id: { type: String, default: uuidv4 },
      message: { type: String },
      sender: { type: String, ref: "user" },
      created: { type: Date, default: Date.now() },
      updated: { type: Date, default: Date.now() },
    },
  ], //TODO: Relation with user messages
  created: { type: Date, default: Date.now() },
  updated: { type: Date, default: Date.now() },
});

module.exports = mongoose.model("Channel", ChannelModel);

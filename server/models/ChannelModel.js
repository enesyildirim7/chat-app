const mongoose = require("mongoose");
const { Schema } = mongoose;
const { v4: uuidv4 } = require("uuid");

const ChannelModel = new Schema({
  _id: { type: String, default: uuidv4 },
  name: { type: String },
  creator: { type: mongoose.SchemaTypes.ObjectId },
  members: [{ type: Array }], //TODO: Relation with user
  messages: [{ type: String }], //TODO: Relation with user messages
  created: { type: Date, default: Date.now() },
  updated: { type: Date, default: Date.now() },
});

module.exports = mongoose.model("Channel", ChannelModel);

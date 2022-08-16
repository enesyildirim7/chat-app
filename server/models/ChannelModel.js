const mongoose = require("mongoose");
const { Schema } = mongoose;
const { v4: uuidv4 } = require("uuid");
const { UserSchema } = require("./UserModel");
const { MessageSchema } = require("./MessageModel");

const ChannelSchema = new Schema({
  _id: { type: String, default: uuidv4 },
  name: { type: String, required: true },
  desciption: { type: String },
  creator: UserSchema,
  members: [{ UserSchema }], //TODO: Relation with user
  messages: [{ MessageSchema }], //TODO: Relation with user messages
  created: { type: Date, default: Date.now() },
  updated: { type: Date, default: Date.now() },
});

const ChannelModel = mongoose.model("Channel", ChannelSchema);

module.exports = { ChannelSchema, ChannelModel };

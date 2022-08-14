const mongoose = require("mongoose");
const { Schema } = mongoose;
const { v4: uuidv4 } = require("uuid");
const { UserSchema } = require("./UserModel");

const MessageSchema = new Schema({
  _id: { type: String, default: uuidv4 },
  message: { type: String, required: true },
  sender: UserSchema, // TODO: Relation with user
  created: { type: Date, default: Date.now() },
  updated: { type: Date, default: Date.now() },
});

const MessageModel = mongoose.model("Message", MessageSchema);

module.exports = { MessageSchema, MessageModel };

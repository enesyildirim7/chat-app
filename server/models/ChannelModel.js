import mongoose from "mongoose";
const { Schema } = mongoose;
import { v4 as uuidv4 } from "uuid";

const ChannelModel = new Schema({
  id: { type: ObjectId, required: true, default: uuidv4(), unique: true },
  //   members: {} TODO: Relation with user
  //   messages: { },TODO: Relation with user messages
  created: { type: Date, default: Date.now() },
  updated: { type: Date, default: Date.now() },
});

mongoose.model("Channel", ChannelModel);

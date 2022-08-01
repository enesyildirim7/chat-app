import mongoose from "mongoose";
const { Schema } = mongoose;
import { v4 as uuidv4 } from "uuid";

const MessageModel = new Schema({
  id: { type: ObjectId, required: true, default: uuidv4(), unique: true },
  message: { type: String },
  //   sender: {} TODO: Relation with user
  created: { type: Date, default: Date.now() },
  updated: { type: Date, default: Date.now() },
});

mongoose.model("Message", MessageModel);

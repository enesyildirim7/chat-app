import mongoose from "mongoose";
const { Schema } = mongoose;
import { v4 as uuidv4 } from "uuid";

const UserModel = new Schema({
  id: { type: ObjectId, required: true, default: uuidv4(), unique: true },
  username: { type: String, lowercase: true, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, lowercase: true, required: true },
  password: { type: String, required: true },
  created: { type: Date, default: Date.now() },
  updated: { type: Date, default: Date.now() },
  isAdmin: { type: Boolean, default: false },
  isStaff: { type: Boolean, default: false },
});

mongoose.model("User", UserModel);

const express = require("express");
const MessageModel = require("../models/MessageModel");
const {
  createMessage,
  getAllMessages,
  getMessage,
  deleteMessage,
} = require("../controllers/MessageControllers");
const router = express.Router();

// Message Create
router.post("/create", createMessage);

// Get All Message
router.get("/all", getAllMessages);

// Get specified message
router.get("/:id", getMessage);

// Delete message
router.delete("/delete/:id", deleteMessage);

module.exports = router;

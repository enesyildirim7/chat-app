const express = require("express");
const ChannelModel = require("../models/ChannelModel");
const {
  createChannel,
  updateChannel,
  getAllChannels,
  getChannel,
  deleteChannel,
} = require("../controllers/ChannelControllers");
const router = express.Router();

router.post("/create", createChannel);
router.patch("/update/:id", updateChannel);
router.get("/all", getAllChannels);
router.get("/:id", getChannel);
router.delete("/:id", deleteChannel);

module.exports = router;

const express = require("express");
const {
  sendChat,
  getChatBySenderReceiver,
} = require("../controllers/chat-pusher.controller");
const route = express.Router();

route.post("/", sendChat);
route.get("/:sender_id/:receiver_id", getChatBySenderReceiver);

module.exports = {
  pusherRoute: route,
};

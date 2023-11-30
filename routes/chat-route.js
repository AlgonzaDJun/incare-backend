const express = require("express");
const { createChat, sendMessage, getMessage, notifChat, statusChat } = require("../controllers/chat.controller");
const route = express.Router();

route.post("/chat", createChat);
route.post("/send", sendMessage);
route.get("/:id", getMessage);
route.post("/notif", notifChat);
route.get("/:id/status", statusChat);

module.exports = {
    chatRoute: route,
}
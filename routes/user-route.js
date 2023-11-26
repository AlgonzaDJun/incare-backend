const express = require("express");
const route = express.Router();

const { getAllUser, getUserById } = require("../controllers/user.controller");

route.get("/", getAllUser);
route.get("/:id", getUserById);

module.exports = {
  userRoute: route,
};

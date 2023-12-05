const express = require("express");
const route = express.Router();

const {
  getAllUser,
  getUserById,
  getProfileUser,
} = require("../controllers/user.controller");

// route.get("/", getAllUser);
// route.get("/:id", getUserById);
route.get("/profile", getProfileUser);
module.exports = {
  userRoute: route,
};

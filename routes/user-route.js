const express = require("express");
const route = express.Router();

const {
  getAllUser,
  getUserById,
  getProfileUser,
  editProfile,
} = require("../controllers/user.controller");
const uploads = require("../middlewares/multer");

// route.get("/", getAllUser);
// route.get("/:id", getUserById);
route.get("/profile", getProfileUser);
route.put("/profile", uploads.single("profile"), editProfile);
module.exports = {
  userRoute: route,
};

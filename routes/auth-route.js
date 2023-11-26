const express = require("express");
const { login, register } = require("../controllers/auth.controller");
const { sendOTP } = require("../controllers/otp.controller");
const route = express.Router();

route.post("/login", login);
route.post("/register", register);
route.post("/send-otp", sendOTP);

module.exports = {
  authRoute: route,
};

const express = require("express");
const { createBooking, readBooking } = require("../controllers/booking.controller");
const router = express.Router();

router.post("/", createBooking);
router.get("/", readBooking);

module.exports = {
  bookingRouter: router,
};

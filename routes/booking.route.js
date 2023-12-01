const express = require("express");
const { createBooking, readBooking, updateBooking, deleteBooking } = require("../controllers/booking.controller");
const authToken = require("../middlewares/auth");
const router = express.Router();

router.post("/", authToken, createBooking);
router.get("/", readBooking);
router.put("/:id", updateBooking);
router.delete("/:id", deleteBooking);

module.exports = {
  bookingRouter: router,
};

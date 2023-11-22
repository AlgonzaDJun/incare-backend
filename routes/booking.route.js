const express = require("express");
const { createBooking, readBooking, updateBooking, deleteBooking } = require("../controllers/booking.controller");
const router = express.Router();

router.post("/", createBooking);
router.get("/", readBooking);
router.put("/:id", updateBooking);
router.delete("/:id", deleteBooking);

module.exports = {
  bookingRouter: router,
};

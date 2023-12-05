const express = require("express");
const { createBooking, readBooking, updateBooking, deleteBooking, getBookingById, getBookingByUserId, getBookingByConselorId } = require("../controllers/booking.controller");
const authToken = require("../middlewares/auth");
const router = express.Router();

router.post("/", authToken, createBooking);
router.get("/", readBooking);
router.get("/user", authToken, getBookingByUserId);
router.get("/:id", getBookingById);
router.get("/konselor/:conselor_id", getBookingByConselorId);
router.put("/:id", updateBooking);
router.delete("/:id", deleteBooking);

module.exports = {
  bookingRouter: router,
};

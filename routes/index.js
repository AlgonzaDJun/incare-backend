const express = require("express");
const { bookingRouter } = require("./booking.route");
const { reviewRouter } = require("./review.route");

const router = express.Router();

router.use("/booking", bookingRouter);
router.use("/review", reviewRouter);

module.exports = router;

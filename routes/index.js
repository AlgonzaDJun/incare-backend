const express = require("express");
const { bookingRouter } = require("./booking.route");
const { conselorRouter } = require("./conselor.route");
const router = express.Router();

router.use("/booking", bookingRouter);
router.use("/conselor", conselorRouter);

module.exports = router;

const express = require('express');
const { bookingRouter } = require('./booking.route');
const router = express.Router();

router.use("/booking", bookingRouter)

module.exports = router
const express = require("express");
const router = express.Router();
const {
  createInvoice,
  getInvoices,
  getInvoicesById,
} = require("../controllers/payment-xendit.controller");
const authToken = require("../middlewares/auth");

router.post("/", authToken, createInvoice);
router.get("/", getInvoices);
router.get("/:id", getInvoicesById);


module.exports = {
  paymentRouter: router,
};

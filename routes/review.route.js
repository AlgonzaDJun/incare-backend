const express = require("express");
const {
  getReviewByConselorId,
  createConselor,
  createReviewByConselorId,
  updateReviewById,
  deleteReviewById,
} = require("../controllers/review.controller");
const { Router } = express;

const router = Router();

router.get("/:id", getReviewByConselorId);
router.post("/conselor", createConselor);
router.post("/:id", createReviewByConselorId);
router.put("/:conselor_id/:id", updateReviewById);
router.delete("/:conselor_id/:id", deleteReviewById);

module.exports = {
  reviewRouter: router,
};

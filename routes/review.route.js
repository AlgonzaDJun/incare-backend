const express = require("express");
const { getReviewByConselorId, createConselor, createReviewByConselorId, updateReviewById } = require("../controllers/review.controller");
const { Router } = express;

const router = Router();

router.get("/:id", getReviewByConselorId)
router.post("/:id", createReviewByConselorId)
router.put("/:conselor_id/:id", updateReviewById)
router.post("/conselor", createConselor)

module.exports = {
    reviewRouter: router,
}
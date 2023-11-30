const express = require("express");
const { getReviewByConselorId, createConselor, createReviewByConselorId, updateReviewById, deleteReviewById } = require("../controllers/review.controller");
const authToken = require("../middlewares/auth");
const { Router } = express;

const router = Router();

router.get("/:id", getReviewByConselorId)
router.post("/conselor", createConselor)
router.post("/:id", authToken, createReviewByConselorId)
router.put("/:conselor_id/:id", authToken, updateReviewById)
router.delete("/:conselor_id/:id", deleteReviewById)


module.exports = {
    reviewRouter: router,
}
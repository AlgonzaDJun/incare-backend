const express = require("express");
const { getReviewByConselorId, createConselor, createReviewByConselorId } = require("../controllers/conselor.controller");
const { Router } = express;

const router = Router();

router.get("/review/:id", getReviewByConselorId)
router.post("/review/:id", createReviewByConselorId)
router.post("/", createConselor)

module.exports = {
    conselorRouter: router,
}
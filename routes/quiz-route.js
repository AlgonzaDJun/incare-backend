const express = require("express")
const { quiz } = require("../controllers/miniQuiz.controller")
const route = express.Router()

route.post("/quiz", quiz)

module.exports = {
    quizRoute: route,
}
const express = require("express")
const { resultQuiz, createAnswer } = require("../controllers/miniQuiz.controller")
const route = express.Router()

route.post("/quiz", createAnswer)
route.get("/:id", resultQuiz)

module.exports = {
    quizRoute: route,
}

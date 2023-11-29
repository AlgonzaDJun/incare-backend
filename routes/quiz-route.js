const express = require("express")
const { resultQuiz, createAnswer, allResultQuiz } = require("../controllers/miniQuiz.controller")
const route = express.Router()

route.post("/quiz", createAnswer)
route.get("/:id", resultQuiz)
route.get("/", allResultQuiz)

module.exports = {
    quizRoute: route,
}

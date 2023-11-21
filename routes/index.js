const express = require("express")
const { quizRoute } = require("./quiz-route")
const route = express.Router()

route.get("/", (req, res) => {
    res.json("quiz api")
});

route.use("/quizzes", quizRoute)

module.exports = {
    allRouter: route,
}
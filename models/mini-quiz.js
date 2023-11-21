const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema({
    answers: Array,
    items: String
})

const Quiz = mongoose.model("Quiz", quizSchema)

module.exports = Quiz
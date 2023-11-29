const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      },
    questions: String,
    answers: Array,
})

const resultSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    results:[quizSchema],
    score: Number,
    mood: String
})

const Quiz = mongoose.model("Quiz", quizSchema)
const hasilQuiz = mongoose.model("hasilQuiz", resultSchema)

module.exports = {
    Quiz,
    hasilQuiz
}

const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    questions: Array,
    answers: Array,
    score: Number,
    mood: String
})

const hasilQuiz = mongoose.model("hasilQuiz", resultSchema)

module.exports = {
    hasilQuiz
}

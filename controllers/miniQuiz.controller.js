const miniQuiz = require("../models/mini-quiz")

const quiz = async (req, res) => {
    let data = req.body;

    const kuis = await miniQuiz.create(data)

    const { answers, items } = data;
    if (!answers || !items ) {
        return res.status(400).json({
            message: "all fields are required"
        })
    }

    res.status(200).json({
        message:"Your Response is Accepted",
        results: kuis
    })
}

module.exports = {
    quiz
}
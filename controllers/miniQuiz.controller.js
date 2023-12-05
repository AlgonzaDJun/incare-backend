const { Quiz, hasilQuiz } = require("../models/mini-quiz");
const User = require("../models/user");

//Submit answers
const createAnswer = async (req, res) => {
  let data = req.body;

  const { user_id, questions, answers } = data;

  if (
    !user_id ||
    !questions ||
    !Array.isArray(answers) ||
    answers.length === 0
  ) {
    return res.status(404).json({
      message: "Enter Your Answer",
    });
  }

  const score = answers.reduce((acc, curr) => acc + curr, 0);

  let mood = "";
  if (score >= 70) {
    mood = "Good";
  } else if (score >= 50) {
    mood = "Normal";
  } else {
    mood = "Down";
  }

  const newQuiz = await hasilQuiz.create({
    user_id: user_id,
    questions: questions,
    answers: answers,
    score: score,
    mood: mood,
  });

  res.status(200).json({
    message: "Your Response is Accepted",
    data: newQuiz,
    score: score,
    mood: mood,
  });
};

const allResultQuiz = async (req, res) => {
  const allQuiz = await hasilQuiz.find();

  res.json({
    message: "Berikut daftar user",
    data: allQuiz,
  });
};

//Get Result by user id
const resultQuiz = async (req, res) => {
  const { _id } = req.params;

  const quizResult = await hasilQuiz.findOne({ quiz_id: _id });

  if (!quizResult) {
    return res.status(404).json({
      message: "No quiz result found for this user",
    });
  }

  res.status(200).json({
    status: "OK",
    message: "Your Result",
    quizResult: quizResult,
  });
};
module.exports = {
  createAnswer,
  allResultQuiz,
  resultQuiz,
};

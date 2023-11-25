const { Quiz, hasilQuiz } = require("../models/mini-quiz")
const User = require("../models/user")

//Submit answers
const createAnswer = async (req, res) => {
    let data = req.body;

     const { user_id, questions, answers } = data;

     if(!user_id || !questions ||!answers){
        return res.status(404).json({
            message: "Enter Your Answer"
        })
       }

     const newQuiz = await Quiz.create(data)
     const user = await User.findById(user_id)
     if(!user) {
        return res.status(404).json({
            message: "User Not Found"
        })
     }

        await hasilQuiz.create({
        user_id: user_id,
        results: [newQuiz],
        score: newQuiz.score,
        mood: "Neutral"
    });

    res.status(200).json({
        message:"Your Response is Accepted",
        data: newQuiz
    })
}

//Get Result by user id
const resultQuiz = async (req, res) => { 
   const { id } = req.params

  const userResult= await hasilQuiz.findOne({user_id:id})

   if(!userResult || !userResult.results || userResult.results.length === 0){
    return res.status(404).json({
        message: "No quiz result found for this user"
    })
   }

   let totalScore = 0;
   for (const quiz of userResult.results) {
    totalScore += quiz.score || 0;
   }

   let mood = "Neutral";
   if (totalScore >= 50) {
       mood = "Happy";
   } else if (totalScore >= 30) {
       mood = "Content";
   } else {
       mood = "Sad";
   }

   res.status(200).json({
    status: "OK",
    message: "Your Result",
    userResult: userResult.results,
    score: totalScore,
    mood: mood
   })

}
module.exports = {
    createAnswer,
    resultQuiz
}
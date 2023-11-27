const User = require('../models/user')
// const {resultQuiz} = require("../controllers/miniQuiz.controller")
const {hasilQuiz} = require("../models/mini-quiz")

module.exports = {
    getAllUser: async(req,res) => {
        const users = await User.find()

        res.json({
            message: "Berikut daftar user",
            data: users
        })
    },

    getUserById: async(req, res) => {
        const { id } = req.params;

        const users = await hasilQuiz.findOne({user_id: id})
        const { totalScore, mood } = req.body;


    res.status(200).json({
        users,
        totalScore,
        mood
    });
    }
}
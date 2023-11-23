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
        const { id } = req.params

        const users = await User.findById(id) //user_id

        if (!users) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const lastQuiz = await hasilQuiz
        .findOne({ user_id: id })
        .sort({ createdAt: -1 }) //take lastResult by createAt
        .populate('mood')
        .exec();

    if (!lastQuiz) {
        return res.status(404).json({
            message: "No quiz result found for this user"
        });
    }

    // last mood based on hasilQuiz
    const lastMood = lastQuiz.mood;

    res.status(200).json({
        users,
        lastMood
    });
    }
}
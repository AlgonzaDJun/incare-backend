const User = require('../models/user')

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

        const users = await User.findById(id).populate('mood');

        if (!users) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.json(users)
    }
}
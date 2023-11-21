const mongoose = require("mongoose");

const conselorSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.ObjectId,
        ref: "User"
    },
    spesialisasi: String,
})

const Conselor = mongoose.model("Conselor", conselorSchema)

module.exports = Conselor
const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    message: [{
        sender: { type: mongoose.Schema.Types.ObjectId, ref: "User"},
        content: String,
        timestamp: { type: Date, default: Date.now },
    }],
    chatType: { type: String, default: 'single' }
})

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  fullname: String,
  email: String,
  image_url: String,
  no_hp: String,
  password: String,
  bio: String,
  type_user: {
    default: "user",
    type: String,
  },
  mood: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "hasilQuiz",
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;

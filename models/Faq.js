const mongoose = require("../config/mongo");

const schema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Faq = mongoose.model("Faq", schema);
module.exports = Faq;

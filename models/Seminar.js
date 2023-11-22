const mongoose = require("../config/mongo");

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    schedule: {
      type: String,
      required: true,
    },
    pamflet: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Seminar = mongoose.model("Seminar", schema);
module.exports = Seminar;

const mongoose = require("mongoose");
const { Schema } = mongoose;

const rateSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    rate: Number,
    comment: String,
  },
  {
    timestamps: true,
  }
);

const ConselorSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    spesialisasi: String,
    deskripsi: String,
    price: Number,
    status: {
      type: String,
      default: "pending",
    },
    rate: [rateSchema],
    schedule: [
      {
        begin: Date,
        end: Date,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Conselor = mongoose.model("Conselor", ConselorSchema);

module.exports = Conselor;

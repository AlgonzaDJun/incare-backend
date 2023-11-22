const mongoose = require("mongoose");

const rateSchema = new mongoose.Schema(
    {
      user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      rate: Number,
      comment: String,
    },
    {
      timestamps: true,
    }
  );
  
  const ConselorSchema = new mongoose.Schema(
    {
      user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      spesialisasi: String,
      status: String,
      rate: [rateSchema],
      jadwal: [Date]
    },
    {
      timestamps: true,
    }
  );

const Conselor = mongoose.model("Conselor", ConselorSchema)

module.exports = Conselor
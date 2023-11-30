const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const bookingSchema = new Schema(
  {
    user_id: {
      type: mongoose.ObjectId,
      ref: "User",
    },
    conselor_id: {
      type: mongoose.ObjectId,
      ref: "Conselor",
    },
    tanggal_konseling: {
      type: Date,
      default: Date.now,
    },
    kode_pembayaran: String,
    media_konseling: {
      type: String,
      enum: ["zoom", "whatsapp", "chat"],
    },
    link_konseling: Object,
    status: {
      type: String,
      enum: ["pending", "success", "failed", "canceled"],
    },
  },
  {
    timestamps: true,
  }
);

const Booking = model("Booking", bookingSchema);

module.exports = Booking;

const Booking = require("../models/Booking");

module.exports = {
  createBooking: async (req, res) => {
    const { conselor_id, tanggal_konseling, kode_pembayaran } = req.body;
    const user_id = "5f8f7f2d0f7a7e2b3c6f8b5d";

    if (!conselor_id || !kode_pembayaran || !tanggal_konseling) {
      return res.status(400).json({
        message: "Semua field harus diisi",
      });
    }

    try {
      const data = await Booking.create({
        user_id,
        conselor_id,
        tanggal_konseling: new Date(),
        kode_pembayaran,
        status: "pending",
      });

      res.json({
        message: "Booking berhasil dibuat",
        data,
      });
    } catch (error) {
      res.status(500).json({
        message: "Terjadi error",
        error: error.message,
      });
    }
  },

  readBooking: async (req, res) => {
    try {
      const data = await Booking.find().sort({ createdAt: -1 });

      res.json({
        message: "Data booking berhasil didapatkan",
        data,
      });
    } catch (error) {
      res.status(500).json({
        message: "Terjadi error",
        error: error.message,
      });
    }
  },

  updateBooking: async (req, res) => {
    const { id } = req.params;

    const { status, tanggal_konseling } = req.body;

    try {
      const data = await Booking.findByIdAndUpdate(
        { _id: id },
        {
          status,
          tanggal_konseling,
        }
      );

      res.json({
        message: "Booking berhasil diupdate",
        data,
      });
    } catch (error) {
      res.status(500).json({
        message: "Terjadi error",
        error: error.message,
      });
    }
  },

  deleteBooking : async (req, res) => {
    const { id } = req.params;

    try {
      const data = await Booking.findByIdAndDelete({ _id: id });

      res.json({
        message: "Booking berhasil dihapus",
        data,
      });
    } catch (error) {
      res.status(500).json({
        message: "Terjadi error",
        error: error.message,
      });
    }
  }
};

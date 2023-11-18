const Conselor = require("../models/Conselor");

module.exports = {
  getReviewByConselorId: async (req, res) => {
    const id = req.params.id;

    try {
      const conselor = await Conselor.findById(id);
      res.status(200).json({
        message: "Success get review by conselor id",
        data: conselor.rate,
      });
    } catch (error) {
      res.status(500).json({
        message: "Failed to get review by conselor id",
        error: error.message,
      });
    }
  },

  createConselor: async (req, res) => {
    // hardcode

    try {
      const conselor = await Conselor.create({
        user_id: "5f9d9c2b3a2f5e0b5c3f7f8a",
        spesialisasi: "Psikolog",
        status: "on",
      });

      res.json({
        message: "Success create conselor",
        data: conselor,
      });
    } catch (err) {
      res.status(500).json({
        message: "Failed to create conselor",
        error: err.message,
      });
    }
  },

  createReviewByConselorId: async (req, res) => {
    const id = req.params.id;
    const { user_id, rate, comment } = req.body;

    if (!rate) {
      return res.status(400).json({
        message: "Rate is required",
      });
    } else if (!comment) {
      return res.status(400).json({
        message: "Comment is required",
      });
    } else if (!user_id) {
      return res.status(400).json({
        message: "User id is required",
      });
    }

    try {
      const conselor = await Conselor.findById(id);

      const newRate = {
        user_id,
        rate,
        comment,
      };

      conselor.rate.push(newRate);

      await conselor.save();

      res.status(200).json({
        message: "Success create review by conselor id",
        data: conselor.rate,
      });
    } catch (error) {
      res.status(500).json({
        message: "Failed to create review by conselor id",
        error: error.message,
      });
    }
  },

  updateReviewById: async (req, res) => {
    const conselor_id = req.params.conselor_id;
    const review_id = req.params.id;

    const { user_id, rate, comment } = req.body;

    if (!rate) {
      return res.status(400).json({
        message: "Rate is required",
      });
    } else if (!comment) {
      return res.status(400).json({
        message: "Comment is required",
      });
    } else if (!user_id) {
      return res.status(400).json({
        message: "User id is required",
      });
    }

    try {
      let review = await Conselor.findById(conselor_id).select({
        rate: { $elemMatch: { _id: review_id } },
      });

      if (!review) {
        return res.status(404).json({
          message: "Review not found",
        });
      }

      const updateReview = await Conselor.findOneAndUpdate(
        {
          _id: conselor_id,
          "rate._id": review_id,
        },
        {
          $set: {
            "rate.$.rate": rate,
            "rate.$.comment": comment,
          },
        },
        {
          new: true,
        }
      );

      if (!review) {
        return res.status(404).json({
          message: "Review not found",
        });
      }

      res.status(200).json({
        message: "Success update review by conselor id",
        data: updateReview.rate.filter((item) => item._id == review_id),
      });
    } catch (error) {
      res.status(500).json({
        message: "Failed to update review by conselor id",
        error: error.message,
      });
    }
  },

  deleteReviewById: async (req, res) => {
    const conselor_id = req.params.conselor_id;
    const review_id = req.params.id;
  },
};

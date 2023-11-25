const Faq = require("../models/Faq");
const { badRequest } = require("../utils/error");

module.exports = {
  AddNewFaq: async (req, res) => {
    const { question, answer } = req.body;
    if (!question || !answer) {
      return badRequest;
    }
    try {
      await Faq.create({ question, answer });
      return res.status(201).json({
        status: "OK",
        message: "Create New Faq Successfully",
      });
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message: "Internal Server Error",
      });
    }
  },
  getAllFaq: async (req, res) => {
    try {
      const faqs = await Faq.find();
      return res.status(200).json({
        status: "OK",
        message: "Get All Faq Successfully",
        data: faqs,
      });
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message: "Internal Server Error",
      });
    }
  },
  updateFaq: async (req, res) => {
    const { id } = req.params;
    const { question, answer } = req.body;
    if (!question || !answer || !id) {
      return res.status(400).json({
        status: "error",
        message: "Bad Request",
      });
    }
    try {
      const faq = await Faq.findByIdAndUpdate(id, { question, answer });
      const newFaq = await Faq.findById(id);
      return res.status(200).json({
        status: "OK",
        message: "Update Faq Successfully",
        data: newFaq,
      });
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message: "Internal Server Error",
      });
    }
  },
  deleteFaq: async (req, res) => {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        status: "error",
        message: "Bad Request",
      });
    }
    try {
      const faq = await Faq.findByIdAndDelete({ _id: id });
      return res.status(200).json({
        status: "OK",
        message: "Update Faq Successfully",
        data: faq,
      });
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message: "Internal Server Error",
      });
    }
  },
};

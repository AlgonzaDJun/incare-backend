const Seminar = require("../models/Seminar");
const { badRequest, internalServer } = require("../utils/error");

module.exports = {
  addNewSeminar: async (req, res) => {
    const { name, schedule, pamflet } = req.body;
    if (!name || !schedule || !pamflet) {
      return badRequest;
    }
    try {
      await Seminar.create({ name, schedule, pamflet });
      return res.status(201).json({
        status: "OK",
        message: "Create New Seminar Successfully",
      });
    } catch (error) {
      return internalServer;
    }
  },
  getAllSeminar: async (req, res) => {
    try {
      const seminars = await Seminar.Find();
      return res.status(200).json({
        status: "OK",
        message: "Get All Seminar Successfully",
        data: seminars,
      });
    } catch (error) {
      return internalServer;
    }
  },
  getSeminarById: async (req, res) => {
    const { id } = req.params;
    if (!id) {
      return badRequest;
    }
    try {
      const seminar = Seminar.findById(id);
      return res.status(200).json({
        status: "OK",
        message: "Get Data Seminar Successfully",
        data: seminar,
      });
    } catch (error) {
      return internalServer;
    }
  },
  updateSeminar: async (req, res) => {
    const { id } = req.params;
    const { name, schedule, pamflet } = req.body;
    if (!id || !name || !schedule || !pamflet) {
      return badRequest;
    }
    try {
      await Seminar.findByIdAndUpdate(id, {
        name,
        question,
        pamflet,
      });
      const newSeminar = await Seminar.findById(id);
      return res.status(200).json({
        status: "OK",
        message: "Update Faq Successfully",
        data: newSeminar,
      });
    } catch (error) {
      return internalServer;
    }
  },
  deleteSeminar: async (req, res) => {
    const { id } = req.params;
    if (!id) {
      return badRequest;
    }
    try {
      const seminar = await Seminar.findByIdAndDelete({ _id: id });
      return res.status(200).json({
        status: "OK",
        message: "Deleted Seminar Successfully",
        data: seminar,
      });
    } catch (error) {
      return internalServer;
    }
  },
};

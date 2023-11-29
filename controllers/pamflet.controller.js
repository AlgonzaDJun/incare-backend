const Seminar = require("../models/Seminar");
const path = require("path");
const { badRequest, internalServer } = require("../utils/error");
const imagekit = require("../utils/imageKit");

const listFilesAsync = (searchQuery) => {
  return new Promise((resolve, reject) => {
    imagekit.listFiles({ searchQuery }, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};

const deleteFileAsync = (fileId) => {
  return new Promise((resolve, reject) => {
    imagekit.deleteFile(fileId, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};

module.exports = {
  addNewSeminar: async (req, res) => {
    const { name, schedule } = req.body;
    if (!req.file) {
      return res.status(400).send("No file uploaded.");
    }
    if (!name || !schedule) {
      return badRequest(res);
    }

    try {
      const uploadResponse = await imagekit.upload({
        file: req.file.buffer.toString("base64"),
        fileName: "pamflet" + path.extname(req.file.originalname),
      });
      const imageUrl = uploadResponse.name;

      await Seminar.create({ name, schedule, pamflet: imageUrl });
      return res.status(201).json({
        status: "OK",
        message: "Create New Seminar Successfully",
      });
    } catch (error) {
      return internalServer(res);
    }
  },
  getAllSeminar: async (req, res) => {
    try {
      imagekit.listFiles(
        {
          skip: 0,
          limit: 10,
        },
        function (error, result) {
          if (error) console.log(error);
          else console.log(result);
        }
      );
      const seminars = await Seminar.find();
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
    const { name, schedule } = req.body;
    if (!req.file) {
      return res.status(400).send("No file uploaded.");
    }
    if (!id || !name || !schedule) {
      return badRequest;
    }
    try {
      const seminar = await Seminar.findById(id);
      const files = await listFilesAsync(`name="${seminar.pamflet}"`);

      if (files.length > 0) {
        await deleteFileAsync(files[0].fileId);
      }

      const uploadResponse = await imagekit.upload({
        file: req.file.buffer.toString("base64"),
        fileName: "pamflet" + path.extname(req.file.originalname),
      });

      const imageUrl = uploadResponse.name;
      const updatedSeminar = await Seminar.findByIdAndUpdate(
        id,
        { $set: { name, schedule, pamflet: imageUrl } },
        { new: true }
      );
      return res.status(200).json({
        status: "OK",
        message: "Update Seminar Successfully",
        data: updatedSeminar,
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

      // Cari dan hapus file berdasarkan nama pamflet
      const files = await listFilesAsync(`name="${seminar.pamflet}"`);

      if (files.length > 0) {
        await deleteFileAsync(files[0].fileId);
      }

      return res.status(200).json({
        status: "OK",
        message: "Deleted Seminar Successfully",
        data: seminar,
      });
    } catch (error) {
      console.error(error);
      return internalServer(res);
    }
  },
};

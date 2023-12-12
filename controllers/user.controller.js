const User = require("../models/user");
// const {resultQuiz} = require("../controllers/miniQuiz.controller")
const { hasilQuiz } = require("../models/mini-quiz");
const jwt = require("jsonwebtoken");
const { internalServer } = require("../utils/error");
const Conselor = require("../models/Conselor");
const imagekit = require("../utils/imageKit");
const path = require("path");
module.exports = {
  getAllUser: async (req, res) => {
    const users = await User.find();

    res.json({
      message: "Berikut daftar user",
      data: users,
    });
  },
  getProfileUser: async (req, res) => {
    const header = req.headers.authorization;
    const token = header.split(" ")[1];
    const decoded = jwt.verify(token, "treasure");
    const userId = decoded.id;
    const type = decoded.type;

    try {
      if (type === "conselor") {
        const conselor = await Conselor.findOne(
          { user_id: userId },
          "spesialisasi rate schedule price"
        ).populate("user_id", "username email no_hp fullname bio image_url");
        return res.status(200).json({
          status: "OK",
          message: "Get Profile User Successfully",
          data: conselor,
        });
      }
      const user = await User.findById(
        userId,
        "username email no_hp fullname bio image_url"
      );
      return res.status(200).json({
        status: "OK",
        message: "Get Profile User Successfully",
        data: user,
      });
    } catch (error) {
      return internalServer(res);
    }
  },
  editProfile: async (req, res) => {
    const header = req.headers.authorization;
    const token = header.split(" ")[1];
    const decoded = jwt.verify(token, "treasure");
    const userId = decoded.id;
    if (!req.file) {
      return res.status(400).send("No file uploaded.");
    }
    try {
      const uploadResponse = await imagekit.upload({
        file: req.file.buffer.toString("base64"),
        fileName: "profile" + path.extname(req.file.originalname),
      });
      const imageUrl = uploadResponse.name;
      await User.findByIdAndUpdate(userId, {
        image_url: imageUrl,
      });
      return res.status(200).json({
        status: "OK",
        message: "Update Profile Successfully",
      });
    } catch (error) {
      console.log(error.message);
      return internalServer(res);
    }
  },
  getUserById: async (req, res) => {
    const { id } = req.params;

    const users = await hasilQuiz.findOne({ user_id: id });
    const { totalScore, mood } = req.body;

    res.status(200).json({
      users,
      totalScore,
      mood,
    });
  },
};

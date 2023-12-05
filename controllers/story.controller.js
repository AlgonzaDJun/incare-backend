const Story = require("../models/Story");
const { badRequest, internalServer } = require("../utils/error");
const jwt = require("jsonwebtoken");
module.exports = {
  addNewStory: async (req, res) => {
    const header = req.headers.authorization;

    const { content } = req.body;
    const token = header.split(" ")[1];
    const decoded = jwt.verify(token, "treasure");
    const userId = decoded.id;
    if (!content || !userId) {
      return badRequest(res);
    }
    try {
      await Story.create({ user: userId, content });
      return res.status(201).json({
        status: "OK",
        message: "Create New Story Successfully",
      });
    } catch (error) {
      return internalServer;
    }
  },
  getAllStory: async (req, res) => {
    const header = req.headers.authorization;
    const token = header.split(" ")[1];
    const decoded = jwt.verify(token, "treasure");
    const userId = decoded.id;
    const id = req.query.userId || "";
    let stories = [];
    if (id !== "") {
      stories = await Story.find({ user: { $eq: id } })
        .populate({
          path: "user",
          select: "username",
        })
        .lean();
    } else {
      stories = await Story.find()
        .populate({
          path: "user",
          select: "username",
        })
        .lean();
    }

    stories.forEach((story) => {
      story.isLike = story.likes.some(
        (like) => like.user._id.toString() === userId
      );
    });

    return res.status(200).json({
      status: "OK",
      message: "Get All Story Successfully",
      data: stories,
    });
  },
  getStoryById: async (req, res) => {
    const header = req.headers.authorization;
    const token = header.split(" ")[1];
    const decoded = jwt.verify(token, "treasure");
    const userId = decoded.id;

    const { id } = req.params;
    if (!id) {
      return badRequest(res);
    }
    try {
      const story = await Story.findById(id)
        .populate({
          path: "user",
          select: "username",
        })
        .populate({
          path: "comments.user",
          select: "username",
        })
        .lean();
      story.isLike = story.likes.some(
        (like) => like.user._id.toString() === userId
      );
      story.likes = story.likes.length;

      return res.status(200).json({
        status: "OK",
        message: "Get Data Story Successfully",
        data: story,
      });
    } catch (error) {
      return internalServer(res);
    }
  },
  updateStory: async (req, res) => {
    const { id } = req.params;
    const { content } = req.body;
    if (!id || !content) {
      return badRequest;
    }
    try {
      await Seminar.findByIdAndUpdate(id, {
        content,
      });
      const newStory = await Seminar.findById(id);
      return res.status(200).json({
        status: "OK",
        message: "Update Story Successfully",
        data: newStory,
      });
    } catch (error) {
      return internalServer;
    }
  },
  deleteStory: async (req, res) => {
    const { id } = req.params;
    if (!id) {
      return badRequest;
    }
    try {
      const story = await Story.findByIdAndDelete({ _id: id });
      return res.status(200).json({
        status: "OK",
        message: "Deleted story Successfully",
        data: story,
      });
    } catch (error) {
      return internalServer;
    }
  },
  updateLike: async (req, res) => {
    const { id } = req.params;
    const header = req.headers.authorization;

    const token = header.split(" ")[1];
    const decoded = jwt.verify(token, "treasure");
    const userId = decoded.id;

    if (!id || !userId) {
      return badRequest(res);
    }
    try {
      const story = await Story.findById(id);
      if (!story) {
        return res.status(404).json({ error: "Story not found" });
      }

      const likeIndex = story.likes.findIndex((like) =>
        like.user.equals(userId)
      );

      if (likeIndex === -1) {
        story.likes.push({ user: userId });
      } else {
        story.likes.splice(likeIndex, 1);
      }

      await story.save();
      return res.status(200).json({
        status: "OK",
        message: "Update Like Success",
        story,
      });
    } catch (error) {
      return internalServer(res);
    }
  },
  addComment: async (req, res) => {
    const { id } = req.params;
    const { comment } = req.body;
    const header = req.headers.authorization;

    const token = header.split(" ")[1];
    const decoded = jwt.verify(token, "treasure");
    const userId = decoded.id;
    try {
      const story = await Story.findById(id);

      if (!story) {
        return res.status(404).json({ error: "Story not found" });
      }
      story.comments.push({ user: userId, comment });
      await story.save();
      res.json(story);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: error.message, message: "Internal Server Error" });
    }
  },
};

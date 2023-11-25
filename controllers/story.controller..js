const Story = require("../models/Story");
const { badRequest, internalServer } = require("../utils/error");

module.exports = {
  addNewStory: async (req, res) => {
    const { userId, content } = req.body;
    if (!userId || !content) {
      return badRequest;
    }
    try {
      await Story.create({ user_id: userId, content });
      return res.status(201).json({
        status: "OK",
        message: "Create New Story Successfully",
      });
    } catch (error) {
      return internalServer;
    }
  },
  getAllStory: async (req, res) => {
    try {
      const stories = await Story.find();
      return res.status(200).json({
        status: "OK",
        message: "Get All Story Successfully",
        data: stories,
      });
    } catch (error) {
      return internalServer;
    }
  },
  getStoryById: async (req, res) => {
    const { id } = req.params;
    if (!id) {
      return badRequest;
    }
    try {
      const story = Story.findById(id);
      return res.status(200).json({
        status: "OK",
        message: "Get Data Story Successfully",
        data: story,
      });
    } catch (error) {
      return internalServer;
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
        data: seminar,
      });
    } catch (error) {
      return internalServer;
    }
  },
  updateLike: async (req, res) => {
    const { id } = req.params;
    if (!id || !userId) {
      return badRequest;
    }
    try {
      const story = await Story.findById(id);
      if (!story) {
        return res.status(404).json({ error: "Story not found" });
      }

      const likeIndex = story.likes.findIndex((like) =>
        like.user_id.equals(userId)
      );

      if (likeIndex === -1) {
        story.likes.push({ user_id: userId });
      } else {
        story.likes.splice(likeIndex, 1);
      }

      await story.save();
    } catch (error) {
      return internalServer;
    }
  },
  addComment: async () => {
    const { id } = req.params;
    const { userId, comment } = req.body;

    try {
      const story = await Story.findById(storyId);

      if (!story) {
        return res.status(404).json({ error: "Story not found" });
      }

      story.comments.push({ user_id: userId, comment });
      await story.save();

      res.json(story);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

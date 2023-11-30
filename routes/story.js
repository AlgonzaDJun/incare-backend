const { Router } = require("express");
const {
  addNewStory,
  getAllStory,
  getStoryById,
  updateStory,
  deleteStory,
  updateLike,
  addComment,
} = require("../controllers/story.controller");

const router = Router();

router.post("/", addNewStory);
router.get("/", getAllStory);
router.get("/:id", getStoryById);
router.put("/:id", updateStory);
router.delete("/:id", deleteStory);
router.put("/:id/like/", updateLike);
router.put("/:id/comment", addComment);
module.exports = router;

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const likeSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const commentSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  comment: {
    type: String,
    required: true,
  },
});
const storySchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    content: {
      type: String,
      required: true,
    },
    likes: [likeSchema],
    comments: [commentSchema],
  },
  {
    timestamps: true,
  }
);

const Story = mongoose.model("Story", storySchema);
module.exports = Story;

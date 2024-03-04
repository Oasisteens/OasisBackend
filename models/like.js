const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const likeSchema = new Schema(
  {
    postId: {
      type: String,
    },
    username: {
      type: String,
    },
    forum: {
      type: String,
    },
    category: {
      type: String,
    },
    number: {
      type: Number,
      min: [0, "Negative numbers are not allowed"],
      validate: {
        validator: Number.isInteger,
        message: "{VALUE} is not an integer value",
      },
      set: (val) => (val < 0 ? 0 : val),
    },
    postingtime: {
      type: String,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.models.Like || mongoose.model("Like", likeSchema);

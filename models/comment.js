const mongoose = require("mongoose");
const moment = require("moment-timezone");

const Schema = mongoose.Schema;

const commentSchema = new Schema({
  postId: {
    type: String,
  },
  content: {
    type: String,
  },
  group: {
    type: String,
  },
  username: {
    type: String,
  },
  postingtime: {
    type: String,
    default: () =>
      moment()
        .tz("Asia/Shanghai")
        .format("YYYY-MM-DD HH:mm:ss")
        .replace("T", " ")
        .replace("Z", ""),
    immutable: true,
  },
  anonymous: {
    type: String,
  },
  pictures: {
    type: Number,
  },
  pictureUrl: [
    {
      filename: String,
      originalname: String,
      path: String,
      size: Number,
    },
  ],
});

module.exports =
  mongoose.models.Comment || mongoose.model("Comment", commentSchema);

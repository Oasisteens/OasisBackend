const mongoose = require("mongoose");
const moment = require("moment-timezone");

const Schema = mongoose.Schema;

const postSchema = new Schema({
  title: {
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
  postAnonymous: {
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

const Post = mongoose.models.Post || mongoose.model("Post", postSchema);
module.exports = Post;

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const moment = require("moment-timezone");

const subTopicSchema = new Schema({
  topicId: {
    type: String,
  },
  title: {
    type: String,
  },
  notes: {
    type: String,
  },
  category: {
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
    type: Boolean,
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
  mongoose.models.subTopic || mongoose.model("subTopic", subTopicSchema);

const mongoose = require("mongoose");
const moment = require("moment-timezone");
const Schema = mongoose.Schema;

const likestatusSchema = new Schema({
  postId: {
    type: String,
  },
  username: {
    type: String,
  },
  status: {
    type: Boolean,
    default: false,
  },
  category: {
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
});

const Likestatus =
  mongoose.models.Likestatus || mongoose.model("Likestatus", likestatusSchema);
module.exports = Likestatus;

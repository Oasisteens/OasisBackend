const mongoose = require("mongoose");
const moment = require("moment-timezone");
const Schema = mongoose.Schema;

const loveformSchema = new Schema({
  username: {
    type: String,
  },
  nickname: {
    type: String,
  },
  toWho: {
    type: String,
  },
  content: {
    type: String,
  },
  time: {
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
});

const Loveform =
  mongoose.models.Loveform || mongoose.model("Loveform", loveformSchema);
module.exports = Loveform;

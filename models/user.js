const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  originalPassword: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  admin: {
    type: Boolean,
    required: true,
  },
  image: {
    type: String,
    default: null,
  },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);
module.exports = User;

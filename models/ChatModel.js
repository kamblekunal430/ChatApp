const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const chatSchema = new Schema({
  username: {
    type: String,
  },
  message: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

const Chat = mongoose.model("chatMsg", chatSchema);

module.exports = Chat;

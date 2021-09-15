const express = require("express");
const connectdb = require("./../dbconnect");
const Chat = require("./../models/ChatModel");

const router = express.Router();

router.route("/").get((req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.statusCode = 200;

  connectdb.then((db) => {
    //let data = Chats.find({ message: "Anonymous" });
    Chat.find({}).then((chat) => {
      res.json(chat);
    });
  });
});

module.exports = router;

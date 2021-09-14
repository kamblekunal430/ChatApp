const mongoose = require("mongoose");

const url = "mongodb://localhost:27017/ChatDB";

const dbconnect = mongoose.connect(url, { useNewUrlParser: true });

module.exports = dbconnect;

const express = require("express");
const app = express();

const server = require("http").createServer(app);

const port = process.env.PORT || 3344;

const path = require("path");

const io = require("socket.io")(server);

const mongoose = require("mongoose");
const dbconnect = require("./dbconnect");
const chatRouter = require("./routes/chatRoute");
const chatMsg = require("./models/ChatModel");
const Chat = require("./models/ChatModel");

// connecting to the database
dbconnect
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log(err);
  });

// Used express.static to serve the static file index.html from public
app.use(express.static(path.join(__dirname + "/public")));

app.use("/chats", chatRouter);

io.on("connection", (socket) => {
  console.log(`Connected with Socket [id: ${socket.id}]`);

  socket.on("chat", (data) => {
    //console.log("From client:", data);
    const chatMsg = new Chat({
      message: data.message,
      username: data.username,
    });
    chatMsg.save().then(() => {
      io.emit("received", data);
    });
  });

  socket.on("typing", (user) => {
    //console.log(user.username, "is typing");
    socket.broadcast.emit("notifyTyping", user);
  });

  socket.on("stoptyping", (data) => {
    socket.broadcast.emit("notifyTyping", data);
  });
});

// To check whether server is working fine.
app.get("/", (req, res) => {
  res.status(200).send("Hello World");
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

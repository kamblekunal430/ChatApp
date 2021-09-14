const express = require("express");
const app = express();

const server = require("http").createServer(app);

const port = process.env.PORT || 3344;

const path = require("path");

const io = require("socket.io")(server);

const mongoose = require("mongoose");
const dbconnect = require("./dbconnect");

dbconnect
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log(err);
  });

// Used express.static to serve the static file index.html from public
app.use(express.static(path.join(__dirname + "/public")));

io.on("connection", (socket) => {
  console.log(`Connected with Socket [id: ${socket.id}]`);

  socket.on("chat", (message) => {
    //console.log("From client:", message);

    io.emit("chat", message);
  });
});

// To check whether server is working fine.
app.get("/", (req, res) => {
  res.status(200).send("Hello World");
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

const express = require("express");
const app = express();

const server = require("http").createServer(app);

const port = process.env.PORT || 3344;

// To check whether server is working fine.
app.get("/", (req, res) => {
  res.status(200).send("Hello World");
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

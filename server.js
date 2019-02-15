const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const projectRoute = require("./routes/projectRoute");
const actionRoute = require("./routes/actionRoute");

const server = express();

server.use(express.json());
server.use(helmet());
server.use(morgan("dev"));
server.use("/api/projects", projectRoute);
// server.use("/api/actions", actionRoute);

server.get("/", async (req, res, next) => {
  res.send(`
    <h2>Lambda - Node Express</h2>
    <p>Welcome to the API Sprint Challenge!</p>
  `);
});

module.exports = server;

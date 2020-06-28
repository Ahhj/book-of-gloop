const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const recipes = require("./controllers");

const app = express();

app.use(
  bodyParser.json({
    extended: true,
    limit: "50mb",
  })
);

app.use("/api", recipes);

// Priority serve any static files.
app.use(express.static(path.resolve(__dirname, "../client/build")));

// All remaining requests return the React app, so it can handle routing.
app.get("*", function (request, response) {
  response.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

module.exports = { app };

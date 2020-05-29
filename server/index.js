require("dotenv").configure();
const express = require("express");
const path = require("path");
const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");
const { GoogleDriveClientWrapper } = require("./GoogleDriveClientWrapper");

const port = process.env.PORT || 3000;
const app = express();
const googleDriveFolderId =
  process.env.GOOGLE_DRIVE_FOLDER_ID || config.googleDriveFolderId;
const googleClient = new GoogleDriveClientWrapper(googleDriveFolderId);

// Define middleware that validates incoming bearer tokens
// using JWKS
const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
  }),
  audience: process.env.AUTH0_AUDIENCE,
  issuer: `https://${process.env.AUTH0_DOMAIN}/`,
  algorithm: ["RS256"],
});

// Priority serve any static files.
app.use(express.static(path.resolve(__dirname, "../client/build")));

// GET: returns a list of the recipes in the recipes folder
app.get("/api/recipes/list", checkJwt, (req, res) => {
  const { fullTextContains } = req.query;
  googleClient
    .list(fullTextContains)
    .then((files) => res.status(200).send({ recipes: files }))
    .catch((error) => {
      console.error(error);
      res.status(400).send({ error: error.body });
    });
});

// GET: returns data for recipe with fileId
app.get("/api/recipes/download", checkJwt, (req, res) => {
  const { fileId } = req.query;
  googleClient
    .get(fileId)
    .then((data) => res.status(200).send(data))
    .catch((error) => {
      console.error(error);
      res.status(400).send({ error: error.body });
    });
});

// POST: create a new recipe with filename given by title,
// returns fileId of created recipe
app.post(
  "/api/recipes/create",
  express.json({ type: "application/json" }),
  checkJwt,
  (req, res) => {
    const { data } = req.body;
    const fileName = `${data.title}.json`;
    googleClient
      .create(fileName, data)
      .then(({ fileId }) => res.status(200).send({ fileId }))
      .catch((error) => {
        console.error(error);
        res.status(400).send({ error: error.body });
      });
  }
);

// PUT: update an existing recipe, errors if given fileId doesn't exist.
app.put(
  "/api/recipes/update",
  express.json({ type: "application/json" }),
  checkJwt,
  (req, res) => {
    const { fileId, data } = req.body;
    const newFileName = data.title;
    googleClient
      .update(fileId, newFileName, data)
      .then(() => res.status(200).send())
      .catch((error) => {
        console.error(error);
        res.status(400).send({ error: error.body });
      });
  }
);

// All remaining requests return the React app, so it can handle routing.
app.get("*", function (request, response) {
  response.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

// Start the app
app.listen(port, () => console.log(`API listening on ${port}`));

const express = require("express");
const { checkJwt } = require("./auth");
const {
  getDriveFile,
  listDriveFiles,
  createDriveFile,
  updateDriveFile,
} = require("./drive/drive-files-client");

const basePath = "/recipes";
let router = express.Router();

// GET: returns a list of the recipes in the recipes folder
router.get(`${basePath}/list`, checkJwt, (req, res) => {
  const { fullTextContains } = req.query;
  listDriveFiles(fullTextContains)
    .then(({ data }) => {
      const body = { recipes: data.files };
      sendSuccessResponse(body, res);
    })
    .catch((error) => sendErrorResponse(error, res));
});

// GET: returns data for recipe with fileId
router.get(`${basePath}/download`, checkJwt, (req, res) => {
  const { fileId } = req.query;
  getDriveFile(fileId)
    .then(({ data }) => sendSuccessResponse(data, res))
    .catch((error) => sendErrorResponse(error, res));
});

// POST: create a new recipe with filename given by title,
// returns fileId of created recipe
router.post(
  `${basePath}/create`,
  express.json({ type: "application/json" }),
  checkJwt,
  (req, res) => {
    const { data } = req.body;
    const fileName = `${data.title}.json`;
    createDriveFile(fileName, data)
      .then(({ data }) => {
        const body = { fileId: data.id };
        sendSuccessResponse(body, res);
      })
      .catch((error) => sendErrorResponse(error, res));
  }
);

// PUT: update an existing recipe, errors if given fileId doesn't exist.
router.put(
  `${basePath}/update`,
  express.json({ type: "application/json" }),
  checkJwt,
  (req, res) => {
    const { fileId, data } = req.body;
    const fileName = `${data.title}.json`;
    updateDriveFile(fileId, fileName, data)
      .then(() => sendSuccessResponse(null, status))
      .catch((error) => sendErrorResponse(error, res));
  }
);

function sendSuccessResponse(body, res) {
  res.status(200).send(body);
}

function sendErrorResponse(error, res) {
  console.error(error);
  res.status(400).send({ error: error.body });
}

module.exports = router;

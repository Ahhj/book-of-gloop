const express = require("express");
const { checkGoogleAuth } = require("./auth");
const {
  getDriveFile,
  listDriveFiles,
  createDriveFile,
  updateDriveFile,
} = require("./drive/drive-files-client");

const basePath = "/recipes";
let router = express.Router();

// GET: returns a list of the recipes in the recipes folder
router.get(`${basePath}/list`, checkGoogleAuth, async (req, res) => {
  const { fullTextContains } = req.query;
  try {
    const result = await listDriveFiles(fullTextContains, req.googleToken);
    const body = { recipes: result.data.files };
    sendSuccessResponse(body, res);
  } catch (error) {
    sendErrorResponse(error, res);
  }
});

// GET: returns data for recipe with fileId
router.get(`${basePath}/download`, checkGoogleAuth, async (req, res) => {
  const { fileId } = req.query;
  try {
    const result = await getDriveFile(fileId, req.googleToken);
    sendSuccessResponse(result.data, res);
  } catch (error) {
    sendErrorResponse(error, res);
  }
});

// POST: create a new recipe with filename given by title,
// returns fileId of created recipe
router.post(
  `${basePath}/create`,
  express.json({ type: "application/json" }),
  checkGoogleAuth,
  async (req, res) => {
    const { data } = req.body;
    const fileName = `${data.title}.json`;
    try {
      const result = await createDriveFile(fileName, data, req.googleToken);
      const body = { fileId: result.data.id };
      sendSuccessResponse(body, res);
    } catch (error) {
      sendErrorResponse(error, res);
    }
  }
);

// PUT: update an existing recipe, errors if given fileId doesn't exist.
router.put(
  `${basePath}/update`,
  express.json({ type: "application/json" }),
  checkGoogleAuth,
  async (req, res) => {
    const { fileId, data } = req.body;
    const fileName = `${data.title}.json`;
    try {
      await updateDriveFile(fileId, fileName, data, req.googleToken);
      sendSuccessResponse(null, res);
    } catch (error) {
      sendErrorResponse(error, res);
    }
  }
);

function sendSuccessResponse(body, res) {
  res.status(200).send(body);
}

function sendErrorResponse(error, res) {
  console.error(error);
  const message = error.response?.data?.error?.message || 
                  error.message || 
                  "An unknown error occurred";
  res.status(error.code || 400).send({ error: message });
}

module.exports = router;

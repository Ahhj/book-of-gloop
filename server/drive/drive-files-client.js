const { Readable } = require("stream");
const { getGoogleDriveClient } = require("./drive-auth");

const folderId = process.env.GOOGLE_DRIVE_FOLDER_ID;

/**
 * Get a drive file by ID using user's credentials
 * @param {string} fileId - The Google Drive file ID
 * @param {string} accessToken - User's Google OAuth access token
 * @returns {Promise<{data: any}>}
 */
async function getDriveFile(fileId, accessToken) {
  const drive = await getGoogleDriveClient(accessToken);
  const desc = {
    fileId,
    mimeType: "text/plain",
    alt: "media",
  };
  return drive.files.get(desc);
}

/**
 * List files in the recipes folder using user's credentials
 * @param {string} searchTerm - Search term for full-text search
 * @param {string} accessToken - User's Google OAuth access token
 * @returns {Promise<{data: {files: Array<{id: string, name: string}>}}>}
 */
async function listDriveFiles(searchTerm, accessToken) {
  const drive = await getGoogleDriveClient(accessToken);
  searchTerm = searchTerm ? searchTerm : "*";
  const query = `'${folderId}' in parents and mimeType = 'text/plain' and (fullText contains ${searchTerm
    .split(" or ")
    .map((item) => `'${item}'`)
    .join(" or fullText contains ")})`;
  const desc = {
    pageSize: 500,
    fields: "nextPageToken, files(id, name)",
    q: query,
  };
  return drive.files.list(desc);
}

/**
 * Create a new file in Google Drive using user's credentials
 * @param {string} fileName - Name of the file
 * @param {any} data - Data to store (will be JSON stringified)
 * @param {string} accessToken - User's Google OAuth access token
 * @returns {Promise<{data: {id: string}}>}
 */
async function createDriveFile(fileName, data, accessToken) {
  const drive = await getGoogleDriveClient(accessToken);
  const desc = {
    resource: { name: fileName, parents: [folderId] },
    media: getMedia(data),
    fields: "id",
  };
  return drive.files.create(desc);
}

/**
 * Update an existing file in Google Drive using user's credentials
 * @param {string} fileId - The Google Drive file ID
 * @param {string} fileName - New file name
 * @param {any} data - New data to store
 * @param {string} accessToken - User's Google OAuth access token
 * @returns {Promise<void>}
 */
async function updateDriveFile(fileId, fileName, data, accessToken) {
  const drive = await getGoogleDriveClient(accessToken);
  const desc = {
    resource: { name: fileName },
    fileId: fileId,
    media: getMedia(data),
  };
  return drive.files.update(desc);
}

function getMedia(data) {
  return {
    mimeType: "text/plain",
    body: json2Readable(data),
  };
}

function json2Readable(data) {
  let body = new Readable();
  body.push(JSON.stringify(data));
  body.push(null); // EOF
  return body;
}

module.exports = {
  getDriveFile,
  listDriveFiles,
  createDriveFile,
  updateDriveFile,
};

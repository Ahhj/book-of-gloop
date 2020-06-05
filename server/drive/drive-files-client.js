const { Readable } = require("stream");
const { driveRequest } = require("./drive-request");

const folderId = process.env.GOOGLE_DRIVE_FOLDER_ID;

async function getDriveFile(fileId) {
  const desc = {
    fileId,
    mimeType: "text/plain",
    alt: "media",
  };
  return driveRequest((drive, handler) => drive.files.get(desc, handler));
}

async function listDriveFiles(searchTerm) {
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
  return driveRequest((drive, handler) => drive.files.list(desc, handler));
}

// TODO: Images too large for upload
async function createDriveFile(fileName, data) {
  const desc = {
    resource: { name: fileName, parents: [folderId] },
    media: getMedia(data),
    fields: "id",
  };
  return driveRequest((drive, handler) => drive.files.create(desc, handler));
}

async function updateDriveFile(fileId, fileName, data) {
  const desc = {
    resource: { name: fileName },
    fileId: fileId,
    media: getMedia(data),
  };
  return driveRequest((drive, handler) => drive.files.update(desc, handler));
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

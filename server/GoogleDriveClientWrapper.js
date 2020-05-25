const { google } = require("googleapis");
const credentials = require(process.env.GOOGLE_APPLICATION_CREDENTIALS ||
  "./credentials.json");
const { Readable } = require("stream");

const { client_email, private_key } = credentials;
const scopes = ["https://www.googleapis.com/auth/drive"];
const auth = new google.auth.JWT(client_email, null, private_key, scopes);

// Thin wrapper around google drive API client
// Initialises authenticated drive client and uses to generate requests.
module.exports.GoogleDriveClientWrapper = class {
  constructor(folderId) {
    this.folderId = folderId;
    this.drive;
    this.initialiseDrive = new Promise(function (resolve, reject) {
      auth.authorize(function (error, tokens) {
        if (error) reject(error);
        resolve();
      });
    }).then(() => {
      this.drive = google.drive({ version: "v3", auth });
    });
  }

  async get(fileId) {
    return this.initialiseDrive.then(() => {
      return new Promise(
        function (resolve, reject) {
          this.drive.files.get(
            {
              fileId,
              mimeType: "application/json",
              alt: "media",
            },
            (err, res) => {
              if (err) {
                reject(err);
              } else {
                resolve(res.data);
              }
            }
          );
        }.bind(this)
      );
    });
  }

  async list(fullTextContains) {
    fullTextContains = fullTextContains ? fullTextContains : "*";
    return this.initialiseDrive.then(() => {
      return new Promise(
        function (resolve, reject) {
          const query = `'${
            this.folderId
          }' in parents and mimeType = 'text/plain' and (fullText contains ${fullTextContains
            .split(" or ")
            .map((item) => `'${item}'`)
            .join(" or fullText contains ")})`;
          this.drive.files.list(
            {
              pageSize: 1000,
              fields: "nextPageToken, files(id, name)",
              q: query,
            },
            (err, res) => {
              if (err) {
                reject(err);
              } else {
                resolve(res.data.files);
              }
            }
          );
        }.bind(this)
      );
    });
  }

  async create(fileName, data) {
    let fileMetadata = { name: fileName, parents: [this.folderId] };
    let media = {
      mimeType: "text/plain",
      body: this._json2Readable(data),
    };
    return this.initialiseDrive.then(() => {
      return new Promise(
        function (resolve, reject) {
          this.drive.files.create(
            {
              media: media,
              resource: fileMetadata,
              fields: "id",
            },
            function (err, file) {
              if (err) {
                console.error(err);
                reject(err);
              } else {
                resolve({ fileId: file.data.id });
              }
            }
          );
        }.bind(this)
      );
    });
  }

  async update(fileId, newFileName, data) {
    let media = {
      mimeType: "text/plain",
      body: this._json2Readable(data),
    };
    return this.initialiseDrive.then(() => {
      return new Promise(
        function (resolve, reject) {
          this.drive.files.update(
            {
              resource: { name: newFileName },
              fileId: fileId,
              media: media,
            },
            function (err, file) {
              if (err) {
                console.error(err);
                reject(err);
              } else {
                resolve();
              }
            }
          );
        }.bind(this)
      );
    });
  }

  _json2Readable(data) {
    let body = new Readable();
    body.push(JSON.stringify(data));
    body.push(null); // EOF
    return body;
  }
};

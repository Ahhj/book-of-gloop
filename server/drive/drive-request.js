const { google } = require("googleapis");
const { getGoogleAuth } = require("./drive-auth");

async function driveRequest(request) {
  return getGoogleAuth()
    .then((auth) => {
      let drive = google.drive({ version: "v3", auth });
      return new Promise(function (resolve, reject) {
        request(drive, (error, res) => {
          if (error) {
            reject(error);
          } else {
            resolve(res);
          }
        });
      });
    })
    .catch((error) => {
      console.error(`Error during driveRequest(): ${error}`);
    });
}

module.exports = { driveRequest };

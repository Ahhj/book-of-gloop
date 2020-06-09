const { google } = require("googleapis");
const credentials = JSON.parse(process.env.GOOGLE_CONFIG);

// Should these be in here? Feels like they should be higher
const { client_email, private_key } = credentials;
const scopes = ["https://www.googleapis.com/auth/drive"];
const auth = new google.auth.JWT(client_email, null, private_key, scopes);

async function getGoogleAuth() {
  return authorize()
    .then(() => auth)
    .catch((error) => {
      console.error(error);
    });
}

async function authorize() {
  return new Promise(function (resolve, reject) {
    auth.authorize(function (error, tokens) {
      if (error) {
        reject(error);
      } else {
        resolve(tokens);
      }
    });
  });
}

module.exports = { getGoogleAuth };

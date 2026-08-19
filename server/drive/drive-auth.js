const { google } = require("googleapis");

// For user-based authentication, we'll use the OAuth2 client with the user's token
// This is passed from the middleware

/**
 * Get an authenticated Google Drive client using a user's OAuth token
 * @param {string} accessToken - User's Google OAuth access token
 * @returns {Promise<drive_v3.Drive>} - Authenticated Drive client
 */
async function getGoogleDriveClient(accessToken) {
  const auth = new google.auth.OAuth2();
  auth.setCredentials({ access_token: accessToken });
  return google.drive({ version: "v3", auth });
}

/**
 * Get Google OAuth client for token validation
 * @returns {OAuth2Client} - OAuth2 client for token verification
 */
function getOAuthClient() {
  return new google.auth.OAuth2(
    process.env.GOOGLE_OAUTH_CLIENT_ID,
    process.env.GOOGLE_OAUTH_CLIENT_SECRET,
    process.env.GOOGLE_OAUTH_REDIRECT_URI || "http://localhost:3000"
  );
}

module.exports = { getGoogleDriveClient, getOAuthClient };

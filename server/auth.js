const { OAuth2Client } = require("google-auth-library");

// Google OAuth2 client for token validation
// This uses the same client ID from your Google Cloud Console
const googleClientId = process.env.GOOGLE_OAUTH_CLIENT_ID;
const client = new OAuth2Client(googleClientId);

/**
 * Middleware to validate Google OAuth tokens
 * Expects Authorization: Bearer <google-token> header
 */
async function checkGoogleAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized - No token provided" });
  }
  
  const token = authHeader.split(" ")[1];
  
  try {
    // Verify the Google token
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: googleClientId,
    });
    
    const payload = ticket.getPayload();
    
    // Attach user info to request
    req.user = {
      id: payload.sub,
      email: payload.email,
      name: payload.name,
      picture: payload.picture,
    };
    
    // Attach the token for use with Google Drive API
    req.googleToken = token;
    
    next();
  } catch (error) {
    console.error("Google token validation error:", error);
    return res.status(401).json({ error: "Unauthorized - Invalid token" });
  }
}

module.exports = { checkGoogleAuth };

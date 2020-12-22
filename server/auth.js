const jwt = require("express-jwt");
const { expressJwtSecret } = require("jwks-rsa");

const domain = process.env.AUTH0_DOMAIN;
const audience = process.env.AUTH0_AUDIENCE;

// Middleware that validates incoming bearer tokens
// using JWKS
const checkJwt = jwt({
  secret: expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${domain}/.well-known/jwks.json`,
  }),
  issuer: `https://${domain}/`,
  algorithms: ["RS256"],
  audience,
});

module.exports = { checkJwt };

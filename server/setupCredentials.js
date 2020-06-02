require("dotenv").config();
const fs = require("fs");
fs.writeFile("server/credentials.json", process.env.GOOGLE_CONFIG, (err) => {});

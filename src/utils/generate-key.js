const dotenv = require("dotenv");
const config = { ...dotenv.config().parsed}

const key = require('crypto').randomBytes(Number(config.KEY_LENGTH)).toString('hex');
console.log("App generated key : \n" + key);

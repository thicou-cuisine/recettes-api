const dotenv = require("dotenv");

// get config vars
const config = { ...dotenv.config().parsed}

export default config;
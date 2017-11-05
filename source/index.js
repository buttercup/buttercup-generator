const { generateDefaultConfig: getConfig } = require("./config.js");
const { generatePassword } = require("./generate.js");
const { setRNG } = require("./random.js");

module.exports = {
    generatePassword,
    getConfig,
    setRNG
};

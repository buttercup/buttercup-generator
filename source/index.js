const { generateDefaultConfig } = require("./config.js");
const { generatePassword } = require("./generate.js");

module.exports = {
    generatePassword,
    getConfig: generateDefaultConfig
};

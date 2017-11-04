const {
    UPPERCASE,
    LOWERCASE,
    DIGITS,
    SPACE,
    UNDERSCORE_DASH,
    BRACES,
    QUOTES,
    SYMBOLS
} = require("./sets.js");

const DEFAULT_CHAR_LENGTH = 20;
const DEFAULT_WORD_LENGTH = 4;

function generateDefaultConfig() {
    return {
        mode: "characters",
        randomWords: {
            length: DEFAULT_WORD_LENGTH,
            separator: "-"
        },
        randomCharacters: {
            length: DEFAULT_CHAR_LENGTH,
            allowRepeatingCharacters: false,
            allowRepeatingSets: true,
            characterSets: {
                UPPERCASE,
                LOWERCASE,
                DIGITS,
                SPACE,
                UNDERSCORE_DASH,
                BRACES,
                QUOTES,
                SYMBOLS
            },
            enabledCharacterSets: [
                "UPPERCASE",
                "LOWERCASE",
                "DIGITS",
                "UNDERSCORE_DASH"
            ]
        }
    };
}

module.exports = {
    generateDefaultConfig
};

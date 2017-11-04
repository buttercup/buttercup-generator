const deepFreeze = require("deep-freeze");

module.exports = deepFreeze({
    UPPERCASE: {
        set: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
        title: "Uppercase letters"
    },
    LOWERCASE: {
        set: "abcdefghijklmnopqrstuvwxyz",
        title: "Lowercase letters"
    },
    DIGITS: {
        set: "0123456789",
        title: "Digits"
    },
    SPACE: {
        set: " ",
        title: "Space"
    },
    UNDERSCORE_DASH: {
        set: "_-",
        title: "Underscore & Dash"
    },
    BRACES: {
        set: "[]{}()<>",
        title: "Braces"
    },
    QUOTES: {
        set: "\"'`",
        title: "Quotes"
    },
    SYMBOLS: {
        set: "!@#$%^&*+=,.?~:;",
        title: "Symbols"
    }
});

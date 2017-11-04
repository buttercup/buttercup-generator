const deepFreeze = require("deep-freeze");

module.exports = deepFreeze({
    UPPERCASE: {
        frequency: 15,
        set: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
        title: "Uppercase letters"
    },
    LOWERCASE: {
        frequency: 15,
        set: "abcdefghijklmnopqrstuvwxyz",
        title: "Lowercase letters"
    },
    DIGITS: {
        frequency: 10,
        set: "0123456789",
        title: "Digits"
    },
    SPACE: {
        frequency: 3,
        set: " ",
        title: "Space"
    },
    UNDERSCORE_DASH: {
        frequency: 3,
        set: "_-",
        title: "Underscore & Dash"
    },
    BRACES: {
        frequency: 4,
        set: "[]{}()<>",
        title: "Braces"
    },
    QUOTES: {
        frequency: 3,
        set: "\"'`",
        title: "Quotes"
    },
    SYMBOLS: {
        frequency: 10,
        set: "!@#$%^&*+=,.?~:;",
        title: "Symbols"
    }
});

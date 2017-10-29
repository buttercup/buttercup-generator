"use strict";

const generatePassword = require("password-generator");
const mnGen = require("mngen");

function isPasswordSafeEnough(password, expectedLength) {
    const forbiddenCharsRegex = /\\/g;
    return (
        password.length === expectedLength &&
        forbiddenCharsRegex.test(password) === false
    );
}

function generate(length = 20, options = {}) {
    const opts = Object.assign(
        {
            letters: true,
            numbers: true,
            symbols: true,
            memorable: false
        },
        options
    );

    let pattern = /[\d\D\w\W]/;

    // Override pattern for combinations
    if (opts.letters && opts.symbols && !opts.numbers) {
        pattern = /[\D]/;
    } else if (opts.letters && !opts.symbols && !opts.numbers) {
        pattern = /[a-zA-Z]/;
    } else if (opts.letters && !opts.symbols && opts.numbers) {
        pattern = /[a-zA-Z\d]/;
    } else if (!opts.letters && opts.symbols && opts.numbers) {
        pattern = /[^a-zA-Z]/;
    } else if (!opts.letters && opts.symbols && !opts.numbers) {
        pattern = /[\W]/;
    } else if (!opts.letters && !opts.symbols && opts.numbers) {
        pattern = /[\d]/;
    }

    let generatedPassword = "";

    while (!isPasswordSafeEnough(generatedPassword, length)) {
        generatedPassword = generatePassword(length, opts.memorable, pattern);
    }

    return generatedPassword;
}

function generateWords(count = 4, glue = "-") {
    return mnGen.list(count).join(glue);
}

module.exports = {
    generate,
    generateWords
};

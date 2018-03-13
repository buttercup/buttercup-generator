const {
    generateCharacterBasedPassword,
    generateRandomWordPassword
} = require("../../source/generate.js");
const { generateDefaultConfig } = require("../../source/config.js");

describe("generate", function() {
    describe("generateCharacterBasedPassword", function() {
        beforeEach(function() {
            this.genericConfig = generateDefaultConfig();
            this.genericConfig.mode = "characters";
        });

        it("generates a password string", function() {
            return generateCharacterBasedPassword(this.genericConfig).then(
                password => {
                    expect(password).to.be.a("string");
                }
            );
        });

        it("generates only uppercase letters when specified", function() {
            this.genericConfig.randomCharacters.enabledCharacterSets = [
                "UPPERCASE"
            ];
            return generateCharacterBasedPassword(this.genericConfig).then(
                password => {
                    expect(password).to.match(/^[A-Z]+$/);
                }
            );
        });

        it("generates only lowercase letters when specified", function() {
            this.genericConfig.randomCharacters.enabledCharacterSets = [
                "LOWERCASE"
            ];
            return generateCharacterBasedPassword(this.genericConfig).then(
                password => {
                    expect(password).to.match(/^[a-z]+$/);
                }
            );
        });

        it("generates only digits when specified", function() {
            this.genericConfig.randomCharacters.enabledCharacterSets = [
                "DIGITS"
            ];
            return generateCharacterBasedPassword(this.genericConfig).then(
                password => {
                    expect(password).to.match(/^[0-9]+$/);
                }
            );
        });

        it("rejects when too many tries for generating a password", function() {
            this.genericConfig.randomCharacters.enabledCharacterSets = [
                "SPACE"
            ];
            const work = generateCharacterBasedPassword(this.genericConfig);
            return expect(work).to.eventually.be.rejectedWith(
                /Maximum.+exceeded/i
            );
        });
    });

    describe("generateRandomWordPassword", function() {
        beforeEach(function() {
            this.genericConfig = generateDefaultConfig();
            this.genericConfig.mode = "words";
        });

        it("generates a password", function() {
            return generateRandomWordPassword(this.genericConfig).then(
                password => {
                    expect(password).to.be.a("string");
                    expect(password).to.have.length.above(0);
                }
            );
        });

        it("generates a string of words", function() {
            return generateRandomWordPassword(this.genericConfig).then(
                password => {
                    expect(password).to.match(/[a-z]+(-[a-z]+)*/);
                }
            );
        });

        it("supports changing the amount of words", function() {
            this.genericConfig.randomWords.length = 19;
            return generateRandomWordPassword(this.genericConfig).then(
                password => {
                    const words = password.split("-");
                    expect(words).to.have.lengthOf(19);
                }
            );
        });
    });
});

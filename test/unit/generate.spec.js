const { generateCharacterBasedPassword, generateRandomWordPassword } = require("../../source/generate.js");
const { generateDefaultConfig } = require("../../source/config.js");

describe("generate", function() {

    describe("generateCharacterBasedPassword", function() {

        beforeEach(function() {
            this.genericConfig = generateDefaultConfig();
            this.genericConfig.mode = "characters";
        });

        it("generates a password string", function() {
            return generateCharacterBasedPassword(this.genericConfig).then(password => {
                expect(password).to.be.a("string");
            });
        });

    });

    describe("generateRandomWordPassword", function() {

        beforeEach(function() {
            this.genericConfig = generateDefaultConfig();
            this.genericConfig.mode = "words";
        });

        it("generates a password", function() {
            return generateRandomWordPassword(this.genericConfig).then(password => {
                expect(password).to.be.a("string");
                expect(password).to.have.length.above(0);
            });
        });

        it("generates a string of words", function() {
            return generateRandomWordPassword(this.genericConfig).then(password => {
                expect(password).to.match(/[a-z]+(-[a-z]+)*/);
            });
        });

        it("supports changing the amount of words", function() {
            this.genericConfig.randomWords.length = 19;
            return generateRandomWordPassword(this.genericConfig).then(password => {
                const words = password.split("-");
                expect(words).to.have.lengthOf(19);
            });
        });

    });

});

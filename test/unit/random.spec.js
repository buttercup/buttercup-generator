const { generateRandomBatch, generateRandomNumbers, getRandomWords } = require("../../source/random.js");

describe("random", function() {

    describe("generateRandomBatch", function() {

        it("generates valid random numbers", function() {
            return generateRandomBatch([ {min: 10, max: 20}, {min:30, max: 199} ]).then(results => {
                const [result1, result2] = results;
                expect(result1).to.be.above(9).and.below(21);
                expect(result2).to.be.above(29).and.below(200);
            });
        });

    });

    describe("generateRandomNumbers", function() {

        it("generates a number", function() {
            return generateRandomNumbers(0, 100, 1).then(nums => {
                const [aNumber] = nums;
                expect(aNumber).to.be.a("number");
                expect(aNumber).to.be.above(-1).and.below(101);
            });
        });

        it("generates the correct number of random numbers", function() {
            return generateRandomNumbers(0, 50, 8).then(nums => {
                expect(nums).to.have.lengthOf(8);
                nums.forEach(num => {
                    expect(num).to.be.a("number");
                    expect(num).to.be.above(-1).and.below(51);
                });
            });
        });

    });

    describe("getRandomWords", function() {

        it("returns an array of words", function() {
            return getRandomWords(6).then(words => {
                expect(words).to.be.an("array");
                expect(words).to.have.lengthOf(6);
                words.forEach(word => {
                    expect(word).to.match(/^[a-z]+$/);
                });
            });
        });

    });

});

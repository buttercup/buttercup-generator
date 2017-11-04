const random = require("random-number-generator");
const words = require("../resources/words.json");

const __builtInRNG = items => {
    return Promise.resolve(items.map(item => random(item.max, item.min)));
};

let __rng;

function generateRandomBatch(items) {
    return getRNG()(items);
}

function generateRandomNumbers(lowerBound, upperBound, count = 1) {
    if (count < 1) {
        throw new Error(`Must generate at least 1 random number: ${count} requested`);
    }
    const work = [];
    const generateRandomNumberBatch = getRNG();
    for (let i = 0; i < count; i += 1) {
        work.push({ min: lowerBound, max: upperBound });
    }
    return generateRandomNumberBatch(work);
}

function getRandomWords(count) {
    if (count < 1) {
        throw new Error(`Must generate at least 1 random word: ${count} requested`);
    }
    const wordCount = words.length;
    const work = [];
    const generateRandomNumberBatch = getRNG();
    for (let i = 0; i < count; i += 1) {
        work.push({ min: 0, max: wordCount - 1 });
    }
    return generateRandomNumberBatch(work).then(indexes => indexes.map(index => words[index]));
}

function getRNG() {
    return __rng || __builtInRNG;
}

function setRNG(rng) {
    __rng = rng;
}

module.exports = {
    generateRandomBatch,
    generateRandomNumbers,
    getRandomWords,
    getRNG,
    setRNG
};

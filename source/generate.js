const { generateRandomBatch, generateRandomNumbers, getRandomWords } = require("./random.js");
const { generateDefaultConfig } = require("./config.js");
const { removeIdenticalNeighbours } = require("./tools.js");

function generateCharacterBasedPassword(config) {
    const { randomCharacters: randomCharConfig } = config;
    const characterSets = Object
        .keys(randomCharConfig.characterSets)
        .filter(setName => randomCharConfig.enabledCharacterSets.includes(setName))
        .map(setName => randomCharConfig.characterSets[setName].set);
    if (characterSets.length === 0) {
        throw new Error("Unable to generate password: No characters in character set");
    }
    const targetLength = randomCharConfig.length;
    const buildPasswordContents = (currentParts = []) => {
        if (currentParts.length < targetLength) {
            const charactersNeeded = targetLength - currentParts.length;
            return generateRandomNumbers(0, characterSets.length - 1, charactersNeeded)
                .then(randomNumbers => randomNumbers.map(index => characterSets[index]))
                .then(sets => {
                    return randomCharConfig.allowRepeatingSets ?
                        sets :
                        removeIdenticalNeighbours(sets);
                })
                .then(sets => {
                    currentParts.push(...sets);
                    return buildPasswordContents(currentParts);
                });
        }
        return currentParts;
    };
    const transformContentsToCharacters = passwordParts => {
        return generateRandomBatch(passwordParts.map(charSet => ({ min: 0, max: charSet.length - 1 })))
            .then(randomIndexes => randomIndexes.map((randomIndex, partIndex) => passwordParts[partIndex][randomIndex]))
            .then(characters => {
                const password = characters.join("");
                return !randomCharConfig.allowRepeatingCharacters && /(.)\1/.test(password) ?
                    transformContentsToCharacters(passwordParts) :
                    password;
            });
    };
    return buildPasswordContents()
        .then(transformContentsToCharacters);
}

function generatePassword(config = generateDefaultConfig()) {
    switch (config.mode) {
        case "characters":
            return generateCharacterBasedPassword(config);
        case "words":
            return generateRandomWordPassword(config);
        default:
            throw new Error(`Unknown generation mode: ${config.mode}`);
    }
}

function generateRandomWordPassword(config) {
    const { randomWords: randomWordConfig } = config;
    const { length, separator } = randomWordConfig;
    return getRandomWords(length).then(words => words.join(separator));
}

module.exports = {
    generateCharacterBasedPassword,
    generatePassword,
    generateRandomWordPassword
};

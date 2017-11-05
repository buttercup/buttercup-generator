const {
    generateRandomBatch,
    generateRandomNumbers,
    getRandomWords
} = require("./random.js");
const { generateDefaultConfig } = require("./config.js");
const { removeIdenticalNeighbours } = require("./tools.js");

const MAX_RETRY_CALLS = 250;

function chooseRandomCharacterSets(characterSetConfigurations, count) {
    const totalLength = characterSetConfigurations.reduce(
        (total, next) => next.frequency + total,
        0
    );
    return generateRandomNumbers(0, totalLength - 1).then(randomNumbers =>
        randomNumbers.map(steps => {
            return characterSetConfigurations.find(charSet => {
                steps -= charSet.frequency;
                return steps <= 0;
            });
        })
    );
}

function generateCharacterBasedPassword(config) {
    const { randomCharacters: randomCharConfig } = config;
    const characterSets = Object.keys(randomCharConfig.characterSets)
        .filter(setName =>
            randomCharConfig.enabledCharacterSets.includes(setName)
        )
        .map(setName => randomCharConfig.characterSets[setName]);
    if (characterSets.length === 0) {
        return Promise.reject(
            new Error(
                "Unable to generate password: No characters in character set"
            )
        );
    }
    const targetLength = randomCharConfig.length;
    const buildPasswordContents = (currentParts = [], calls = 1) => {
        if (calls > MAX_RETRY_CALLS) {
            throw new Error(
                `Unable to generate password: Maximum generation tries exceeded (${MAX_RETRY_CALLS}). Character set options may be too limited.`
            );
        }
        if (currentParts.length < targetLength) {
            const charactersNeeded = targetLength - currentParts.length;
            return chooseRandomCharacterSets(characterSets, charactersNeeded)
                .then(sets => {
                    return randomCharConfig.allowRepeatingSets
                        ? sets
                        : removeIdenticalNeighbours(sets);
                })
                .then(sets => {
                    currentParts.push(...sets);
                    return buildPasswordContents(currentParts, calls + 1);
                });
        }
        return currentParts;
    };
    const transformContentsToCharacters = (passwordParts, calls = 1) => {
        if (calls > MAX_RETRY_CALLS) {
            throw new Error(
                `Unable to generate password: Maximum generation tries exceeded (${MAX_RETRY_CALLS}). Character set options may be too limited.`
            );
        }
        return generateRandomBatch(
            passwordParts.map(charSet => ({
                min: 0,
                max: charSet.set.length - 1
            }))
        )
            .then(randomIndexes =>
                randomIndexes.map(
                    (randomIndex, partIndex) =>
                        passwordParts[partIndex].set[randomIndex]
                )
            )
            .then(characters => {
                const password = characters.join("");
                return !randomCharConfig.allowRepeatingCharacters &&
                    /(.)\1/.test(password)
                    ? transformContentsToCharacters(passwordParts, calls + 1)
                    : password;
            });
    };
    return buildPasswordContents().then(transformContentsToCharacters);
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

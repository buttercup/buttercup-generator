# Buttercup Password Generator 

[![Build Status](https://travis-ci.org/buttercup/buttercup-generator.svg?branch=master)](https://travis-ci.org/buttercup/buttercup-generator)

A password generator for [Buttercup](https://github.com/buttercup/buttercup-desktop).

## Usage

``` bash
npm install @buttercup/generator --save
```

``` js
import { generate, generateWords } from '@buttercup/generator';

generate();
generateWords();
```

## API

**`generate(length = 20, options = {})`**

Generates a random password in specified length. Options:

``` js
{
    letters: true,
    numbers: true,
    symbols: true,
    memorable: false // memorable=true voids other settings
}
```

**`generateWords(count = 4, glue = '-')`**

Generates a `count` of random words glubed by `glue` string. Eg. `alpha-beta-romeo-juliet`

## License

Licenced under the [MIT Licence](LICENSE).

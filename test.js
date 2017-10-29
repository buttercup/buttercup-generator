import test from "ava";
import { generate, generateWords } from "./lib";

test("Generate expected number of words", t => {
    const pass = generateWords(5, "-");
    t.is(pass.split("-").length, 5);
});

test("Word generator honors the glue config", t => {
    const pass = generateWords(5, "|");
    t.is(pass.match(/\|/g).length, 4);
});

test("Generates a fixed length password correctly", t => {
    t.is(generate(30).length, 30);
});

test("Honors configuration", t => {
    t.is(
        /^[\d]+$/g.test(generate(30, { letters: false, symbols: false })),
        true
    );
    t.is(
        /^[A-Za-z]+$/g.test(generate(30, { numbers: false, symbols: false })),
        true
    );
});

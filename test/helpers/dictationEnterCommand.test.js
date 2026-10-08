const test = require("node:test");
const assert = require("node:assert/strict");

const {
  stripDictationEnterCommand,
} = require("../../src/helpers/dictationEnterCommand");

test("strips a trailing trigger phrase and flags Enter", () => {
  assert.deepEqual(
    stripDictationEnterCommand("please send this hit enter", "hit enter"),
    { text: "please send this", shouldPressEnter: true }
  );
});

test("matches case-insensitively", () => {
  assert.deepEqual(
    stripDictationEnterCommand("Please send this. Hit Enter", "hit enter"),
    { text: "Please send this.", shouldPressEnter: true }
  );
});

test("strips trailing punctuation after the phrase", () => {
  assert.deepEqual(stripDictationEnterCommand("do this hit enter.", "hit enter"), {
    text: "do this",
    shouldPressEnter: true,
  });
  assert.deepEqual(stripDictationEnterCommand("do this hit enter!", "hit enter"), {
    text: "do this",
    shouldPressEnter: true,
  });
});

test("whole-utterance phrase yields empty text with Enter flagged", () => {
  assert.deepEqual(stripDictationEnterCommand("hit enter", "hit enter"), {
    text: "",
    shouldPressEnter: true,
  });
});

test("does not match when the phrase is not at the end", () => {
  assert.deepEqual(
    stripDictationEnterCommand("hit enter and then continue", "hit enter"),
    { text: "hit enter and then continue", shouldPressEnter: false }
  );
});

test("does not match a word that merely starts with the phrase", () => {
  assert.deepEqual(stripDictationEnterCommand("please hit enters", "hit enter"), {
    text: "please hit enters",
    shouldPressEnter: false,
  });
});

test("tolerates extra internal whitespace in the transcript", () => {
  assert.deepEqual(stripDictationEnterCommand("do this hit  enter", "hit enter"), {
    text: "do this",
    shouldPressEnter: true,
  });
});

test("supports a custom trigger phrase", () => {
  assert.deepEqual(stripDictationEnterCommand("ready to go submit now", "submit now"), {
    text: "ready to go",
    shouldPressEnter: true,
  });
});

test("treats an empty or whitespace-only phrase as disabled", () => {
  assert.deepEqual(stripDictationEnterCommand("hit enter", ""), {
    text: "hit enter",
    shouldPressEnter: false,
  });
  assert.deepEqual(stripDictationEnterCommand("hit enter", "   "), {
    text: "hit enter",
    shouldPressEnter: false,
  });
});

test("escapes regex special characters in a custom phrase", () => {
  assert.deepEqual(stripDictationEnterCommand("ok go (enter)", "(enter)"), {
    text: "ok go",
    shouldPressEnter: true,
  });
});

test("handles empty transcript", () => {
  assert.deepEqual(stripDictationEnterCommand("", "hit enter"), {
    text: "",
    shouldPressEnter: false,
  });
});

// Detects a configurable trailing voice command (default "hit enter") so
// dictation can submit a focused field instead of pasting the literal
// phrase. Matching is end-anchored only: the phrase must be the last thing
// said, so dictating it mid-sentence as literal content is left untouched.

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function buildTrailingPhraseRegex(phrase) {
  const trimmed = phrase.trim();
  const escaped = escapeRegExp(trimmed).replace(/\s+/g, "\\s+");
  // \b only applies at a word/non-word transition, so only anchor on it when
  // the phrase actually starts/ends with a word character (e.g. a phrase
  // like "(enter)" needs no leading boundary before its opening paren).
  const leadingBoundary = /\w/.test(trimmed[0]) ? "\\b" : "";
  const trailingBoundary = /\w/.test(trimmed[trimmed.length - 1]) ? "\\b" : "";
  return new RegExp(
    `${leadingBoundary}${escaped}${trailingBoundary}[.,!?]*\\s*$`,
    "i"
  );
}

export function stripDictationEnterCommand(text, phrase) {
  if (typeof text !== "string" || !phrase || !phrase.trim()) {
    return { text, shouldPressEnter: false };
  }

  const match = buildTrailingPhraseRegex(phrase).exec(text);
  if (!match) {
    return { text, shouldPressEnter: false };
  }

  return {
    text: text.slice(0, match.index).replace(/\s+$/, ""),
    shouldPressEnter: true,
  };
}

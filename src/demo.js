// QuizForge — DEMO MODE simulator (active ONLY with ?demo=1).
// Builds a real quiz FROM the notes the user pasted — no canned answers:
//   - "What is X?" questions from "X is ..." / "X: ..." definitions found
//     in the notes (distractors are other definitions from the same notes,
//     so exactly one option is correct per question).
//   - Fill-in-the-blank questions from sentences in the notes.
// No Firebase call is made in demo mode. The UI labels results as simulated.

function splitSentences(text) {
  return String(text || "")
    .replace(/\r\n?/g, "\n")
    .split(/(?<=[.!?])\s+|\n+/)
    .map((s) => s.replace(/^[-*•\d.)\s]+/, "").trim())
    .filter((s) => s.length > 8);
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Extract term -> definition pairs from "X is Y" / "X: Y" / "X — Y" lines. */
function extractTerms(text) {
  const terms = [];
  const seen = new Set();
  const lines = String(text || "").split("\n");
  const patterns = [
    /^([A-Z][\w\s'&-]{1,40}?)\s*[:–—-]\s+(.{8,160})$/,
    /^([A-Z][\w\s'&-]{1,40}?)\s+(?:is|are|was|were|means|refers to)\s+(.{8,160})$/i,
  ];
  for (const raw of lines) {
    const line = raw.trim();
    if (!line) continue;
    for (const re of patterns) {
      const m = line.match(re);
      if (!m) continue;
      // Drop a leading "The " ("The Calvin cycle" -> "Calvin cycle").
      const term = m[1].trim().replace(/^The\s+/i, "").replace(/\.$/, "");
      const def = m[2].trim().replace(/\.$/, "");
      const key = term.toLowerCase();
      // Skip header-ish lines ("Photosynthesis notes — Biology week 7")
      // and over-long subjects ("The overall equation for photosynthesis").
      if (term.length < 2 || term.length > 30 || /notes/i.test(term)) break;
      if (def.length < 12 || seen.has(key)) break;
      seen.add(key);
      terms.push({ term, def });
      break;
    }
  }
  // Also scan sentences for "X is Y" when notes are one paragraph.
  if (terms.length < 4) {
    for (const s of splitSentences(text)) {
      const m = s.match(/^([A-Z][\w\s'&-]{1,40}?)\s+(?:is|are|was|were|means)\s+(.{8,160})$/i);
      if (!m) continue;
      const term = m[1].trim().replace(/^The\s+/i, "");
      const def = m[2].trim().replace(/\.$/, "");
      const key = term.toLowerCase();
      if (term.length < 2 || term.length > 30 || /notes/i.test(term)) continue;
      if (def.length < 12 || seen.has(key)) continue;
      seen.add(key);
      terms.push({ term, def });
    }
  }
  return terms;
}

function pickWords(sentence) {
  // Content words (length >= 4, not a stopword) usable as blank answers.
  const stop = new Set([
    "that", "this", "with", "from", "into", "when", "which", "their",
    "there", "about", "after", "before", "during", "between", "through",
    "called", "process", "system", "using", "other", "first", "second",
  ]);
  return (sentence.match(/[A-Za-z][A-Za-z'-]{3,}/g) || []).filter(
    (w) => !stop.has(w.toLowerCase())
  );
}

/**
 * Simulate a quiz set from the input notes. Same shape as the real path:
 * { quiz, latencyMs, wordCount, simulated: true }.
 */
export async function generateDemoQuiz(notes, numQuestions, difficulty, onProgress) {
  const startedAt = performance.now();
  const wordCount = (notes || "").trim().split(/\s+/).filter(Boolean).length;

  onProgress?.("Simulating quiz generation…", undefined);
  await new Promise((r) => setTimeout(r, 400));
  onProgress?.("Simulating questions…", undefined);
  await new Promise((r) => setTimeout(r, 400));

  const terms = extractTerms(notes);
  const sentences = splitSentences(notes);
  const questions = [];
  const usedTerms = new Set();

  // Type 1: "What is X?" from extracted definitions.
  const shuffledTerms = shuffle(terms);
  for (const t of shuffledTerms) {
    if (questions.length >= numQuestions) break;
    const others = shuffle(terms.filter((x) => x.term !== t.term)).slice(0, 3);
    if (others.length < 3) break;
    const options = shuffle([t.def, ...others.map((o) => o.def)]);
    questions.push({
      question: `What is ${t.term}?`,
      options,
      answerIndex: options.indexOf(t.def),
      explanation: `According to your notes: ${t.term} — ${t.def}.`,
    });
    usedTerms.add(t.term.toLowerCase());
  }

  // Type 2: fill-in-the-blank from sentences, if more questions are needed.
  const allWords = sentences.flatMap(pickWords);
  const uniqueWords = [...new Set(allWords.map((w) => w.toLowerCase()))];
  for (const s of shuffle(sentences)) {
    if (questions.length >= numQuestions) break;
    const words = pickWords(s);
    if (words.length < 2) continue;
    const answer = words[Math.floor(Math.random() * words.length)];
    const blanked = s.replace(new RegExp(`\\b${answer.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "i"), "_____");
    if (blanked === s) continue;
    const distractors = shuffle(uniqueWords.filter((w) => w !== answer.toLowerCase())).slice(0, 3);
    if (distractors.length < 3) continue;
    const display = (w) => {
      const orig = allWords.find((x) => x.toLowerCase() === w);
      return orig || w;
    };
    const options = shuffle([answer, ...distractors.map(display)]);
    questions.push({
      question: `Complete this sentence from your notes: "${blanked}"`,
      options,
      answerIndex: options.indexOf(answer),
      explanation: `The full sentence in your notes reads: "${s}"`,
    });
  }

  // Fallback: if the notes are too thin to build questions, say so honestly
  // instead of inventing a quiz about nothing.
  if (questions.length < 3) {
    throw new Error(
      "DEMO_TOO_THIN: the demo simulator could not build at least 3 questions from these notes — paste longer notes with a few 'Term is definition' lines (or try the real Gemini path, which handles thin notes better)."
    );
  }

  const flashcards = shuffle(terms)
    .slice(0, 6)
    .map((t) => ({ front: t.term, back: t.def }));

  const firstLine = String(notes || "").split("\n").map((l) => l.trim()).find(Boolean) || "Untitled notes";
  let title = firstLine.replace(/\.$/, "");
  if (title.length > 60) title = title.slice(0, 57).trimEnd() + "…";
  title = title.charAt(0).toUpperCase() + title.slice(1);

  return {
    quiz: { title, questions, flashcards },
    latencyMs: Math.round(performance.now() - startedAt),
    wordCount,
    simulated: true,
  };
}

// QuizForge — all Firebase AI Logic code lives here.
// Cloud Gemini (via Firebase AI Logic, Gemini Developer API backend)
// generates a structured quiz + flashcards from the user's study notes,
// using a typed JSON response schema.
//
// Verified against firebase@13.4.0 typings (@firebase/ai):
//   getAI(app, { backend: new GoogleAIBackend() })
//   getGenerativeModel(ai, { mode, inCloudParams })
//   model.generateContent(prompt) -> result.response.text()

import { initializeApp } from "firebase/app";
import {
  getAI,
  getGenerativeModel,
  GoogleAIBackend,
  InferenceMode,
  Schema,
} from "firebase/ai";
import { initializeAppCheck } from "firebase/app-check";
import { firebaseConfig, isFirebaseConfigured } from "./firebase-config.js";

export const CLOUD_MODEL = "gemini-3-flash-preview";

/** Cloud-side typed Schema for a quiz set. */
export function buildCloudSchema() {
  return Schema.object({
    properties: {
      title: Schema.string(),
      questions: Schema.array({
        items: Schema.object({
          properties: {
            question: Schema.string(),
            options: Schema.array({ items: Schema.string() }),
            answerIndex: Schema.integer(),
            explanation: Schema.string(),
          },
          optionalProperties: ["explanation"],
        }),
      }),
      flashcards: Schema.array({
        items: Schema.object({
          properties: {
            front: Schema.string(),
            back: Schema.string(),
          },
        }),
      }),
    },
    optionalProperties: ["flashcards"],
  });
}

/** Plain JSON-schema mirror (used by the demo simulator's shape docs). */
export const QUIZ_SCHEMA_JSON = {
  type: "object",
  properties: {
    title: { type: "string" },
    questions: {
      type: "array",
      items: {
        type: "object",
        properties: {
          question: { type: "string" },
          options: { type: "array", items: { type: "string" } },
          answerIndex: { type: "integer" },
          explanation: { type: "string" },
        },
        required: ["question", "options", "answerIndex"],
      },
    },
    flashcards: {
      type: "array",
      items: {
        type: "object",
        properties: { front: { type: "string" }, back: { type: "string" } },
        required: ["front", "back"],
      },
    },
  },
  required: ["title", "questions"],
};

export function countWords(text) {
  const words = (text || "").trim().split(/\s+/).filter(Boolean);
  return words.length;
}

function promptFor(notes, numQuestions, difficulty) {
  return `You are a study coach. Turn the study notes below into a quiz that tests real understanding, not memorization of exact wording.
Return ONLY a JSON object matching this schema — no markdown fences, no extra text:
{
  "title": "short topic title, e.g. 'Photosynthesis Basics'",
  "questions": [
    {"question": "...", "options": ["A", "B", "C", "D"], "answerIndex": 0, "explanation": "one sentence why the answer is correct"}
  ],
  "flashcards": [{"front": "term or question", "back": "short definition or answer"}]
}
Rules:
- Generate exactly ${numQuestions} multiple-choice questions, difficulty ${difficulty}.
- Every question must have exactly 4 options, exactly one correct answer, and a plausible set of distractors drawn from the notes (never "All of the above" / "None of the above").
- Every question must be answerable ONLY from the notes below — do not invent facts that are not in the notes. If the notes are too thin for ${numQuestions} good questions, still return ${numQuestions} questions but base them on what is actually stated.
- "explanation" is one short sentence grounded in the notes.
- Flashcards: 4-6 cards covering the most important terms/facts in the notes.
- Keep the language the same as the notes (if the notes are in Indonesian, write the quiz in Indonesian).

NOTES:
"""${notes}"""`;
}

let firebaseApp = null;
let ai = null;

export const debugState = {
  sdkLoaded: true,
  modelCreated: false,
  lastError: null,
};

if (typeof window !== "undefined") {
  window.__quizforgeDebug = debugState;
}

function ensureFirebase() {
  if (firebaseApp) return;
  firebaseApp = initializeApp(firebaseConfig);
  try {
    self.FIREBASE_APPCHECK_DEBUG_TOKEN =
      import.meta.env.VITE_APPCHECK_DEBUG_TOKEN || true;
    initializeAppCheck(firebaseApp, { isTokenAutoRefreshEnabled: true });
  } catch (err) {
    console.warn("[QuizForge] App Check init skipped:", err);
  }
  ai = getAI(firebaseApp, { backend: new GoogleAIBackend() });
}

/** Create the cloud generative model. Exposed for verification. */
export function createModel() {
  ensureFirebase();
  const model = getGenerativeModel(ai, {
    mode: InferenceMode.PREFER_IN_CLOUD,
    inCloudParams: {
      model: CLOUD_MODEL,
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: buildCloudSchema(),
      },
    },
  });
  debugState.modelCreated = true;
  return model;
}

function parseQuizJson(text) {
  const cleaned = String(text || "")
    .trim()
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/\s*```$/, "");
  const parsed = JSON.parse(cleaned);
  if (!parsed || typeof parsed !== "object") throw new Error("Model did not return an object.");
  const questions = (Array.isArray(parsed.questions) ? parsed.questions : [])
    .filter(
      (q) =>
        q &&
        typeof q.question === "string" &&
        Array.isArray(q.options) &&
        q.options.length === 4 &&
        Number.isInteger(q.answerIndex) &&
        q.answerIndex >= 0 &&
        q.answerIndex < 4
    )
    .map((q) => ({
      question: q.question,
      options: q.options.map(String),
      answerIndex: q.answerIndex,
      explanation: typeof q.explanation === "string" ? q.explanation : "",
    }));
  if (questions.length === 0) {
    throw new Error("Model returned no valid questions.");
  }
  const flashcards = (Array.isArray(parsed.flashcards) ? parsed.flashcards : [])
    .filter((f) => f && typeof f.front === "string" && typeof f.back === "string")
    .map((f) => ({ front: f.front, back: f.back }));
  return {
    title: typeof parsed.title === "string" ? parsed.title : "Untitled quiz",
    questions,
    flashcards,
  };
}

function friendlyError(err) {
  const msg = String(err?.message || err || "Unknown error");
  const statusMatch = msg.match(/\[\d{3}[^\]]*\]/);
  const serverNote = statusMatch ? ` Server response: ${statusMatch[0]}.` : "";
  if (/api key|api-key|API_KEY|401|403|permission/i.test(msg)) {
    return "Firebase rejected the request (bad or missing API key / project not enabled for AI Logic). Check the Firebase config and that AI Logic is enabled for the Gemini Developer API.";
  }
  if (/network|fetch|failed to fetch|offline/i.test(msg)) {
    return `Network error while calling Firebase AI Logic. Check your connection and try again.${serverNote}`;
  }
  return `Quiz generation failed: ${msg}${serverNote}`;
}

/**
 * Generate a quiz set from study notes via Firebase AI Logic.
 * @returns {Promise<{quiz: object, latencyMs: number, wordCount: number}>}
 */
export async function generateQuiz(notes, numQuestions, difficulty, onProgress) {
  const startedAt = performance.now();
  const wordCount = countWords(notes);
  debugState.lastError = null;

  if (!isFirebaseConfigured()) {
    throw new Error(
      "SETUP_REQUIRED: Firebase is not configured yet. Follow the setup guide below to add your Firebase project config, then reload."
    );
  }

  const model = createModel();
  onProgress?.("Generating quiz with Gemini…", undefined);
  let result;
  try {
    result = await model.generateContent(promptFor(notes, numQuestions, difficulty));
  } catch (err) {
    debugState.lastError = String(err?.message || err);
    throw new Error(friendlyError(err));
  }

  const text = result.response.text();
  let quiz;
  try {
    quiz = parseQuizJson(text);
  } catch (err) {
    debugState.lastError = `JSON parse failed: ${err?.message}`;
    throw new Error(
      "The model returned a response that could not be parsed as a quiz. Please try again."
    );
  }

  return { quiz, latencyMs: Math.round(performance.now() - startedAt), wordCount };
}

export { isFirebaseConfigured };

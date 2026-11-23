// QuizForge — UI wiring (single page, no framework).
// Flow: paste notes -> pick question count + difficulty -> Generate.
//   ?demo=1            -> simulated quiz (demo.js), banner shown, no Firebase.
//   real Firebase config -> generateQuiz() in ai.js (Firebase AI Logic).
//   no config, no demo  -> friendly setup guide, no crash.
import { generateQuiz, countWords, isFirebaseConfigured, createModel, debugState } from "./ai.js";
import { generateDemoQuiz } from "./demo.js";

const $ = (sel) => document.querySelector(sel);

const params = new URLSearchParams(location.search);
export const DEMO_MODE = params.get("demo") === "1";

const HISTORY_KEY = "quizforge.history.v1";
const MAX_HISTORY = 10;

const SAMPLE_NOTES = `Photosynthesis notes — Biology week 7
Photosynthesis is the process by which green plants convert sunlight, water and carbon dioxide into glucose and oxygen.
Chlorophyll is the green pigment in chloroplasts that absorbs light energy, mostly in the blue and red parts of the spectrum.
ATP: the cell's main energy currency, produced during the light-dependent reactions.
NADPH: a molecule that carries electrons and hydrogen to the Calvin cycle.
Calvin cycle: the reactions in the stroma that fix carbon dioxide into sugar.
Thylakoid: the disc-shaped membrane structures inside chloroplasts where the light-dependent reactions happen.
Stroma: the fluid inside chloroplasts, surrounding the thylakoids, where the Calvin cycle runs.
Stomata are tiny pores on leaves that allow carbon dioxide to enter and oxygen and water vapour to leave.
The light-dependent reactions take place in the thylakoid membranes and produce ATP and NADPH.
The Calvin cycle takes place in the stroma and uses ATP and NADPH to fix carbon dioxide into sugar.
The overall equation for photosynthesis is 6CO2 + 6H2O + light energy -> C6H12O6 + 6O2.
Factors that affect the rate of photosynthesis include light intensity, carbon dioxide concentration and temperature.
At very high temperatures, the enzymes involved in the Calvin cycle begin to denature, so the rate falls.
Photosynthesis is essential for nearly all life on Earth because it produces the oxygen we breathe and forms the base of most food chains.`;

function escapeHtml(s) {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function showError(message) {
  const el = $("#errorBox");
  el.innerHTML = `<strong>Something went wrong.</strong><br>${escapeHtml(message)}`;
  el.hidden = false;
}

function hideError() {
  const el = $("#errorBox");
  el.hidden = true;
  el.textContent = "";
}

function setProgress(text) {
  const bar = $("#progressBar");
  const label = $("#progressLabel");
  if (!text) {
    bar.hidden = true;
    label.textContent = "";
    return;
  }
  bar.hidden = false;
  label.textContent = text;
  const fill = $("#progressFill");
  fill.style.width = "100%";
  fill.classList.add("indeterminate");
}

function clearProgress() {
  $("#progressBar").hidden = true;
  $("#progressLabel").textContent = "";
  $("#progressFill").style.width = "0%";
  $("#progressFill").classList.remove("indeterminate");
}

function setBusy(busy) {
  $("#generateBtn").disabled = busy;
  $("#notes").disabled = busy;
}

// ---------- Quiz state ----------
let currentQuiz = null; // { quiz, latencyMs, wordCount, simulated }
let quizAnswers = []; // per-question chosen index (or null)
let quizIndex = 0;
let quizDone = false;

function scoreQuiz() {
  if (!currentQuiz) return { correct: 0, total: 0 };
  let correct = 0;
  currentQuiz.quiz.questions.forEach((q, i) => {
    if (quizAnswers[i] === q.answerIndex) correct++;
  });
  return { correct, total: currentQuiz.quiz.questions.length };
}

function renderResult() {
  const { quiz, latencyMs, wordCount, simulated } = currentQuiz;
  if (typeof window !== "undefined" && window.__quizforgeDebug) {
    window.__quizforgeDebug.currentQuiz = currentQuiz;
  }
  const badge = simulated ? "Simulated · Quiz (demo)" : "Cloud · Gemini";
  const badgeClass = simulated ? "badge-device" : "badge-cloud";
  const el = $("#result");
  el.hidden = false;
  el.innerHTML = `
    <div class="result-head">
      <span class="source-badge ${badgeClass}">${escapeHtml(badge)}</span>
      <span class="meta">${escapeHtml(String(latencyMs))} ms · ${escapeHtml(String(wordCount))} words · ${quiz.questions.length} questions · ${quiz.flashcards.length} flashcards${simulated ? " · demo" : ""}</span>
    </div>
    <h2 class="brief-title">${escapeHtml(quiz.title)}</h2>
    <div class="tabs" role="tablist">
      <button type="button" class="tab active" data-tab="quiz" role="tab">Quiz</button>
      <button type="button" class="tab" data-tab="cards" role="tab">Flashcards (${quiz.flashcards.length})</button>
    </div>
    <div id="tabQuiz" class="tab-panel"></div>
    <div id="tabCards" class="tab-panel" hidden></div>
    <div class="result-actions">
      <button id="copyMdBtn" type="button">Copy Markdown</button>
      <button id="copyJsonBtn" type="button">Copy JSON</button>
    </div>
  `;
  el.querySelectorAll(".tab").forEach((btn) => {
    btn.addEventListener("click", () => {
      el.querySelectorAll(".tab").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      $("#tabQuiz").hidden = btn.dataset.tab !== "quiz";
      $("#tabCards").hidden = btn.dataset.tab !== "cards";
    });
  });
  $("#copyMdBtn").addEventListener("click", () => copyText(toMarkdown(quiz)));
  $("#copyJsonBtn").addEventListener("click", () => copyText(JSON.stringify(quiz, null, 2)));
  renderQuizPanel();
  renderCardsPanel();
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

function renderQuizPanel() {
  const panel = $("#tabQuiz");
  const { questions } = currentQuiz.quiz;
  if (quizDone) {
    const { correct, total } = scoreQuiz();
    const pct = total ? Math.round((correct / total) * 100) : 0;
    const verdict =
      pct === 100 ? "Perfect score — you know this cold." :
      pct >= 70 ? "Solid — review the ones you missed." :
      pct >= 40 ? "Getting there — re-read the notes and try again." :
      "Tough round — study the flashcards first, then retake.";
    panel.innerHTML = `
      <div class="score-box">
        <div class="score-big">${correct} / ${total}</div>
        <div class="score-pct">${pct}% — ${escapeHtml(verdict)}</div>
      </div>
      <ol class="review-list">
        ${questions.map((q, i) => {
          const chosen = quizAnswers[i];
          const ok = chosen === q.answerIndex;
          return `<li class="review-item ${ok ? "review-ok" : "review-bad"}">
            <p class="review-q">${escapeHtml(q.question)}</p>
            <p>Your answer: <strong>${chosen == null ? "—" : escapeHtml(q.options[chosen])}</strong> ${ok ? "✓" : "✗"}</p>
            ${ok ? "" : `<p>Correct answer: <strong>${escapeHtml(q.options[q.answerIndex])}</strong></p>`}
            ${q.explanation ? `<p class="muted">${escapeHtml(q.explanation)}</p>` : ""}
          </li>`;
        }).join("")}
      </ol>
      <button id="retakeBtn" type="button" class="primary">Retake quiz</button>
    `;
    $("#retakeBtn").addEventListener("click", () => {
      quizAnswers = questions.map(() => null);
      quizIndex = 0;
      quizDone = false;
      renderQuizPanel();
    });
    return;
  }

  const q = questions[quizIndex];
  const chosen = quizAnswers[quizIndex];
  const answered = chosen !== null && chosen !== undefined;
  panel.innerHTML = `
    <p class="quiz-progress">Question ${quizIndex + 1} of ${questions.length}</p>
    <div class="quiz-bar"><div class="quiz-bar-fill" style="width:${Math.round((quizIndex / questions.length) * 100)}%"></div></div>
    <h3 class="quiz-question">${escapeHtml(q.question)}</h3>
    <div class="options">
      ${q.options.map((opt, i) => {
        let cls = "option";
        if (answered) {
          if (i === q.answerIndex) cls += " option-correct";
          else if (i === chosen) cls += " option-wrong";
          else cls += " option-dim";
        }
        return `<button type="button" class="${cls}" data-idx="${i}" ${answered ? "disabled" : ""}>${escapeHtml(opt)}</button>`;
      }).join("")}
    </div>
    ${answered ? `
      <div class="feedback ${chosen === q.answerIndex ? "feedback-ok" : "feedback-bad"}">
        <strong>${chosen === q.answerIndex ? "Correct!" : "Not quite."}</strong>
        ${q.explanation ? `<p>${escapeHtml(q.explanation)}</p>` : ""}
      </div>
      <button id="nextBtn" type="button" class="primary">${quizIndex + 1 === questions.length ? "See my score" : "Next question"}</button>
    ` : ""}
  `;
  panel.querySelectorAll(".option").forEach((btn) => {
    btn.addEventListener("click", () => {
      quizAnswers[quizIndex] = Number(btn.dataset.idx);
      renderQuizPanel();
    });
  });
  const next = $("#nextBtn");
  if (next) {
    next.addEventListener("click", () => {
      if (quizIndex + 1 === questions.length) {
        quizDone = true;
      } else {
        quizIndex++;
      }
      renderQuizPanel();
    });
  }
}

function renderCardsPanel() {
  const panel = $("#tabCards");
  const { flashcards } = currentQuiz.quiz;
  if (!flashcards.length) {
    panel.innerHTML = `<p class="muted">No flashcards were generated for these notes.</p>`;
    return;
  }
  panel.innerHTML = `
    <p class="muted">Tap a card to flip it.</p>
    <div class="cards-grid">
      ${flashcards.map((c, i) => `
        <button type="button" class="flashcard" data-idx="${i}">
          <span class="card-front">${escapeHtml(c.front)}</span>
          <span class="card-back" hidden>${escapeHtml(c.back)}</span>
        </button>`).join("")}
    </div>
  `;
  panel.querySelectorAll(".flashcard").forEach((btn) => {
    btn.addEventListener("click", () => {
      const front = btn.querySelector(".card-front");
      const back = btn.querySelector(".card-back");
      const showingBack = back.hidden;
      front.hidden = showingBack;
      back.hidden = !showingBack;
      btn.classList.toggle("flipped", showingBack);
    });
  });
}

function toMarkdown(quiz) {
  const lines = [`# ${quiz.title}`, "", "## Quiz", ""];
  quiz.questions.forEach((q, i) => {
    lines.push(`${i + 1}. ${q.question}`);
    q.options.forEach((o, j) => {
      lines.push(`   ${String.fromCharCode(65 + j)}. ${o}${j === q.answerIndex ? " ✓" : ""}`);
    });
    if (q.explanation) lines.push(`   _${q.explanation}_`);
    lines.push("");
  });
  if (quiz.flashcards.length) {
    lines.push("## Flashcards", "");
    for (const c of quiz.flashcards) lines.push(`- **${c.front}** — ${c.back}`);
  }
  return lines.join("\n");
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    const label = $("#copyStatus");
    label.textContent = "Copied to clipboard.";
    setTimeout(() => (label.textContent = ""), 2000);
  } catch {
    const label = $("#copyStatus");
    label.textContent = "Copy failed — select the text manually.";
  }
}

// ---------- History (localStorage, max 10) ----------
function loadHistory() {
  try {
    const raw = JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]");
    return Array.isArray(raw) ? raw : [];
  } catch {
    return [];
  }
}

function saveHistoryEntry(entry) {
  const history = loadHistory();
  history.unshift(entry);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history.slice(0, MAX_HISTORY)));
  renderHistory();
}

function renderHistory() {
  const history = loadHistory();
  const list = $("#historyList");
  const empty = $("#historyEmpty");
  if (!history.length) {
    list.innerHTML = "";
    empty.hidden = false;
    return;
  }
  empty.hidden = true;
  list.innerHTML = history
    .map(
      (h, i) => `
      <li class="history-item">
        <button type="button" class="history-load" data-idx="${i}">
          <span class="history-title">${escapeHtml(h.title)}</span>
          <span class="history-meta">${escapeHtml(h.sourceLabel)} · ${escapeHtml(String(h.questions))} questions · ${escapeHtml(String(h.wordCount))} words · ${escapeHtml(h.when)}</span>
        </button>
      </li>`
    )
    .join("");
  list.querySelectorAll(".history-load").forEach((btn) => {
    btn.addEventListener("click", () => {
      const entry = loadHistory()[Number(btn.dataset.idx)];
      if (!entry) return;
      currentQuiz = {
        quiz: entry.quiz,
        latencyMs: entry.latencyMs,
        wordCount: entry.wordCount,
        simulated: entry.simulated,
      };
      quizAnswers = entry.quiz.questions.map(() => null);
      quizIndex = 0;
      quizDone = false;
      renderResult();
      hideError();
    });
  });
}

// ---------- Setup guide ----------
function showSetupGuide() {
  const el = $("#setupGuide");
  el.hidden = false;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

// ---------- Word count ----------
function updateWordCount() {
  const n = countWords($("#notes").value);
  $("#wordCount").textContent = `${n} word${n === 1 ? "" : "s"}`;
}

// ---------- Generate ----------
async function onGenerate() {
  const notes = $("#notes").value.trim();
  hideError();
  $("#setupGuide").hidden = true;
  $("#result").hidden = true;
  if (!notes) {
    showError("Paste some notes first — the textarea is empty.");
    return;
  }
  const numQuestions = Number($("#numQuestions").value);
  const difficulty = $("#difficulty").value;
  setBusy(true);
  try {
    let result;
    if (DEMO_MODE) {
      result = await generateDemoQuiz(notes, numQuestions, difficulty, setProgress);
    } else if (!isFirebaseConfigured()) {
      showSetupGuide();
      return;
    } else {
      result = await generateQuiz(notes, numQuestions, difficulty, setProgress);
    }
    currentQuiz = result;
    quizAnswers = result.quiz.questions.map(() => null);
    quizIndex = 0;
    quizDone = false;
    renderResult();
    saveHistoryEntry({
      title: result.quiz.title,
      quiz: result.quiz,
      notes,
      sourceLabel: result.simulated ? "Simulated (demo)" : "Cloud · Gemini",
      latencyMs: result.latencyMs,
      wordCount: result.wordCount,
      questions: result.quiz.questions.length,
      simulated: !!result.simulated,
      when: new Date().toLocaleString(),
    });
  } catch (err) {
    const msg = String(err?.message || err);
    if (msg.startsWith("SETUP_REQUIRED")) {
      showSetupGuide();
    } else if (msg.startsWith("DEMO_TOO_THIN")) {
      showError(
        "The demo simulator needs richer notes — paste longer notes with a few 'Term is definition' lines. (The real Gemini path handles thin notes better.)"
      );
    } else {
      showError(msg);
    }
  } finally {
    clearProgress();
    setBusy(false);
  }
}

// ---------- Init ----------
function init() {
  if (typeof window !== "undefined" && window.__quizforgeDebug) {
    window.__quizforgeDebug.probeModel = () => {
      try {
        createModel();
        return { ok: true, ...debugState };
      } catch (err) {
        return { ok: false, error: String(err?.message || err), ...debugState };
      }
    };
  }
  if (DEMO_MODE) {
    $("#demoBanner").hidden = false;
    document.title = "QuizForge (Demo) — paste your notes, get a quiz";
  }
  $("#notes").addEventListener("input", updateWordCount);
  $("#generateBtn").addEventListener("click", onGenerate);
  $("#loadSampleBtn").addEventListener("click", () => {
    $("#notes").value = SAMPLE_NOTES;
    updateWordCount();
    hideError();
  });
  $("#clearBtn").addEventListener("click", () => {
    $("#notes").value = "";
    updateWordCount();
    $("#result").hidden = true;
    hideError();
  });
  $("#clearHistoryBtn").addEventListener("click", () => {
    localStorage.removeItem(HISTORY_KEY);
    renderHistory();
  });
  updateWordCount();
  renderHistory();
}

document.addEventListener("DOMContentLoaded", init);

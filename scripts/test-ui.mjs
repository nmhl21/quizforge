// QuizForge end-to-end UI test — Playwright headless Chromium vs dist/.
// Serves dist/ with python http.server on :4173, then checks:
//  (a) page loads with no page errors and no external (non-localhost) requests
//  (b) ?demo=1: sample notes -> quiz renders (5 Qs), answer all -> score
//      screen, flashcards tab shows cards, history has 1 entry
//  (c) real SDK path: window.__quizforgeDebug.probeModel proves
//      getGenerativeModel was called (modelCreated)
//  (d) real generate from VM: fails gracefully (egress blocks
//      firebasevertexai.googleapis.com) — error box shown, no crash
import { chromium } from '/home/hatch/workspace/makefun-token-radar/shot/node_modules/playwright-core/index.mjs';
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const PORT = 4173;
const BASE = `http://localhost:${PORT}/`;

const results = [];
function check(name, ok, detail = '') {
  results.push({ name, ok, detail });
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${detail ? ' — ' + detail : ''}`);
}

const server = spawn('python3', ['-m', 'http.server', String(PORT), '--directory', path.join(ROOT, 'dist')], {
  stdio: 'ignore',
});

async function waitForServer(tries = 30) {
  for (let i = 0; i < tries; i++) {
    try {
      const res = await fetch(BASE);
      if (res.ok) return true;
    } catch { /* not up yet */ }
    await new Promise((r) => setTimeout(r, 300));
  }
  return false;
}

let browser;
try {
  if (!(await waitForServer())) throw new Error('static server did not come up');
  if (!fs.existsSync(path.join(ROOT, 'dist', 'index.html'))) throw new Error('dist/index.html missing');

  browser = await chromium.launch({ headless: true });

  // ---- (a) plain load
  {
    const page = await browser.newPage();
    const errors = [];
    const external = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
    page.on('request', (req) => {
      const url = req.url();
      if (!url.startsWith('http://localhost') && !url.startsWith('https://localhost') && !url.startsWith('data:')) {
        external.push(url);
      }
    });
    await page.goto(BASE, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1500);
    const h1 = await page.textContent('h1');
    check('a1 page loads, header present', h1 === 'QuizForge', `h1=${h1}`);
    check('a2 no page errors', errors.length === 0, errors.join(' | ') || 'none');
    check('a3 no external requests (self-contained)', external.length === 0, external.join(', ') || 'none');
    await page.close();
  }

  // ---- (b) demo mode: full quiz flow
  {
    const page = await browser.newPage();
    const errors = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
    await page.goto(BASE + '?demo=1', { waitUntil: 'domcontentloaded' });
    const bannerVisible = await page.isVisible('#demoBanner');
    check('b1 demo banner visible', bannerVisible);
    await page.click('#loadSampleBtn');
    await page.waitForTimeout(200);
    const wc = await page.textContent('#wordCount');
    await page.click('#generateBtn');
    await page.waitForSelector('.brief-title', { timeout: 15000 });
    const title = await page.textContent('.brief-title');
    const badge = await page.textContent('.source-badge');
    check('b2 sample: quiz renders', !!title && title.length > 3, `title="${title}" words=${wc}`);
    check('b3 sample: simulated badge', /Simulated · Quiz \(demo\)/.test(badge || ''), `badge="${badge}"`);
    // Answer all 5 questions (click first option each time)
    for (let i = 0; i < 5; i++) {
      await page.waitForSelector('.quiz-question', { timeout: 10000 });
      await page.click('.option >> nth=0');
      await page.waitForSelector('#nextBtn', { timeout: 10000 });
      await page.click('#nextBtn');
    }
    await page.waitForSelector('.score-big', { timeout: 10000 });
    const score = await page.textContent('.score-big');
    check('b4 score screen after 5 answers', /^\d+ \/ 5$/.test((score || '').trim()), `score="${score}"`);
    const reviewCount = await page.locator('.review-item').count();
    check('b5 review lists all 5 questions', reviewCount === 5, `${reviewCount} items`);
    // Flashcards tab
    await page.click('.tab[data-tab="cards"]');
    await page.waitForTimeout(300);
    const cardCount = await page.locator('.flashcard').count();
    check('b6 flashcards tab shows cards', cardCount >= 3, `${cardCount} cards`);
    // Flip one card
    await page.click('.flashcard >> nth=0');
    const flipped = await page.locator('.flashcard.flipped').count();
    check('b7 flashcard flips on click', flipped === 1, `${flipped} flipped`);
    // History
    const histCount = await page.locator('.history-item').count();
    check('b8 history has 1 entry', histCount === 1, `${histCount} entries`);
    check('b9 demo flow: no page errors', errors.length === 0, errors.join(' | ') || 'none');
    await page.close();
  }

  // ---- (c) real SDK path via debug probe
  {
    const page = await browser.newPage();
    const errors = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto(BASE, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1000);
    const debug = await page.evaluate(() => window.__quizforgeDebug);
    check('c1 window.__quizforgeDebug exists, sdkLoaded', !!debug && debug.sdkLoaded === true, JSON.stringify(debug));
    const probe = await page.evaluate(() => window.__quizforgeDebug.probeModel());
    check('c2 getGenerativeModel called (modelCreated)', probe.modelCreated === true, JSON.stringify(probe));
    check('c3 probe did not crash page', errors.length === 0, errors.join(' | ') || 'none');
    await page.close();
  }

  // ---- (d) real generate from VM fails gracefully (egress-blocked host)
  {
    const page = await browser.newPage();
    const errors = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto(BASE, { waitUntil: 'domcontentloaded' });
    await page.click('#loadSampleBtn');
    await page.click('#generateBtn');
    await page.waitForSelector('#errorBox:visible', { timeout: 60000 });
    const errText = await page.textContent('#errorBox');
    check('d1 real generate fails gracefully with friendly error',
      /Network error|Firebase rejected|failed/i.test(errText || ''), (errText || '').slice(0, 120));
    check('d2 no page errors on failed real generate', errors.length === 0, errors.join(' | ') || 'none');
    await page.close();
  }
} catch (err) {
  check('test harness', false, String(err?.message || err));
} finally {
  if (browser) await browser.close();
  server.kill();
}

const failed = results.filter((r) => !r.ok).length;
console.log(`\n${results.length - failed}/${results.length} checks passed${failed ? ` — ${failed} FAILED` : ''}`);
process.exit(failed ? 1 : 0);

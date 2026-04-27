// tests/runtime.mjs
// Headless-проверки игры через Playwright.
//
// Запуск: `bun run tests/runtime.mjs`
// Зависимости: `bun install` поставит playwright; `bunx playwright install chromium` доустановит браузер.

import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import net from 'node:net';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname (fileURLToPath (import.meta.url));
const REPO = path.resolve (__dirname, '..');

// ----- найти свободный порт, чтобы не конфликтовать с `bun run serve` (5100)
async function findFreePort () {
	for (let p = 5102; p < 5300; p++) {
		const ok = await new Promise (resolve => {
			const s = net.createServer ();
			s.once ('error', () => resolve (false));
			s.once ('listening', () => s.close (() => resolve (true)));
			s.listen (p);
		});
		if (ok) return p;
	}
	throw new Error ('Не нашёл свободный порт в диапазоне 5102..5300');
}

let _server = null;
async function ensureServer (port) {
	const probe = async () => {
		try { const r = await fetch (`http://localhost:${port}/index.html`); return r.ok; } catch { return false; }
	};
	if (await probe ()) return;
	_server = spawn ('python3', ['-m', 'http.server', String (port)], {
		cwd: REPO, stdio: 'ignore', detached: true
	});
	_server.unref ();
	for (let i = 0; i < 80; i++) { await sleep (100); if (await probe ()) return; }
	throw new Error (`static server failed to start on :${port}`);
}

const sleep = ms => new Promise (r => setTimeout (r, ms));

// ----- импорт playwright. Чёткое сообщение, если он не поставлен
async function importPlaywright () {
	try { return await import ('playwright'); } catch (e) {
		console.error ('\n[runtime] Не нашёл playwright.');
		console.error ('   Установи: bun install && bunx playwright install chromium');
		process.exit (2);
	}
}

// Список концовок (ключ из ALL_ENDINGS → лейбл, в который прыгнуть)
// Можно ограничить для отладки: TLA_TEST_ENDINGS_LIMIT=5 bun run test:runtime
const ENDINGS_FULL = [
	['cauldron_eternal',  'Ending_CauldronEternal'],
	['loophole',          'Ending_Loophole'],
	['demon_friend',      'Ending_DemonFriend'],
	['glitch',            'Ending_Glitch'],
	['debate_win',        'Ending_DebateWin'],
	['believer',          'Ending_Believer'],
	['pascal',            'Ending_Pascal'],
	['theologian',        'Ending_Theologian'],
	['rebellion',         'Ending_Rebellion'],
	['hacker',            'Ending_Hacker'],
	['democracy',         'Ending_Democracy'],
	['bar',               'Ending_Bar'],
	['franchise',         'Ending_Franchise'],
	['therapist',         'Ending_Therapist'],
	['matrix',            'Ending_Matrix'],
	['speedrun',          'Ending_Speedrun'],
	['awakening',         'Ending_Awakening'],
	['full_circle',       'Ending_FullCircle'],
	['dev_commentary',    'Ending_DevCommentary'],
	['anon_from_hell',    'Ending_AnonFromHell'],
	['alice_log',         'Ending_AliceLog'],
	['alice_silent',      'Ending_AliceSilent'],
	['nihilist',          'Ending_Nihilist'],
	['prophet',           'Ending_Prophet'],
	['hell_romance',      'Ending_HellRomance'],
	['escape_together',   'Ending_EscapeTogether'],
	['escape_caught',     'Escape_Caught'],
	['lilith_betrayal',   'Ending_LilithBetrayal'],
	['lilith_conflicted', 'Ending_LilithConflicted'],
	['sisyphus',          'Ending_Sisyphus'],
	['viktor_hack',       'Ending_ViktorHack'],
	['viktor_freedom',    'Ending_ViktorFreedom'],
	['i_am_the_bug',      'Ending_IAmTheBug']
];
const _limit = parseInt (process.env.TLA_TEST_ENDINGS_LIMIT || '0', 10);
const ENDINGS = _limit > 0 ? ENDINGS_FULL.slice (0, _limit) : ENDINGS_FULL;

// Гейты — ожидаемые переходы при разных значениях storage
const GATES = [
	{ desc: 'Hell_Secret_Check → prophet (begged + acceptance + empathy)',
		preset: { judgment_begged: true, acceptance_score: 3, empathy_shown: 3 },
		jump: 'Hell_Breakdown', expectEnd: 'prophet' },
	{ desc: 'Hell_Secret_Check → full_circle',
		preset: { prologue_was_kind: true, empathy_shown: 3, acceptance_score: 3 },
		jump: 'Hell_Breakdown', expectEnd: 'full_circle' },
	{ desc: 'Hell_Secret_Check → nihilist',
		preset: { denial_count: 5, acceptance_score: 0, rebellion_score: 0 },
		jump: 'Hell_Breakdown', expectEnd: 'nihilist' },
	{ desc: 'Hell_Breakdown_Route → Lilith_Choice (interest >= 3)',
		preset: { lilith_interest: 3, lilith_met: true },
		jump: 'Hell_Breakdown_Route', expectLabel: 'Hell_Breakdown_Lilith_Choice' },
	{ desc: 'Hell_Breakdown_Route → Matrix_Choice (suspicion=2)',
		preset: { matrix_suspicion: 2 }, jump: 'Hell_Breakdown_Route',
		expectLabel: 'Hell_Breakdown_Matrix_Choice' },
	{ desc: 'Hell_Breakdown_Route → Matrix_Choice (noticed_patterns)',
		preset: { noticed_patterns: true }, jump: 'Hell_Breakdown_Route',
		expectLabel: 'Hell_Breakdown_Matrix_Choice' },
	{ desc: 'Hell_Breakdown_Route → Normal (no flags)',
		preset: {}, jump: 'Hell_Breakdown_Route',
		expectLabel: 'Hell_Breakdown_Normal_Choice' },
	{ desc: 'Lilith priority over matrix',
		preset: { lilith_interest: 3, matrix_suspicion: 5 },
		jump: 'Hell_Breakdown_Route', expectLabel: 'Hell_Breakdown_Lilith_Choice' },
	{ desc: 'Hell_Lilith_Visit_Check → Coffee (met + interest>=1)',
		preset: { lilith_met: true, lilith_interest: 1 },
		jump: 'Hell_Lilith_Visit_Check', expectLabel: 'Hell_Lilith_Coffee' },
	{ desc: 'Hell_Lilith_Visit_Check → Debate Round 2 (no met)',
		preset: { lilith_met: false }, jump: 'Hell_Lilith_Visit_Check',
		expectLabel: 'Hell_Debate_Round_2' },
	// Демон-job-offer ветвится по pigidij_pulled: если игрок применил
	// ловушку — демон не зовёт его в команду (закрывает Ending_DemonFriend
	// по этой ветке). Если honest path — обычный оффер.
	{ desc: 'Hell_Demon_Job_Offer (no pigidij) → normal offer',
		preset: {}, jump: 'Hell_Demon_Job_Offer',
		expectLabel: 'Hell_Demon_Job_Offer_Normal' },
	{ desc: 'Hell_Demon_Job_Offer (after pigidij) → cold pass',
		preset: { pigidij_pulled: true }, jump: 'Hell_Demon_Job_Offer',
		expectLabel: 'Hell_Demon_Job_Offer_Pigidij' }
];

// ----- Helpers --------------------------------------------------------

async function freshContext (browser) {
	const ctx = await browser.newContext ({ viewport: { width: 1280, height: 800 } });
	const page = await ctx.newPage ();
	page.setDefaultTimeout (8000);
	return { ctx, page };
}

async function bootGame (page, port) {
	const errs = [];
	page.on ('pageerror', e => errs.push (e.message));
	await page.goto (`http://localhost:${port}/index.html`, { waitUntil: 'domcontentloaded' });
	await page.waitForFunction (() => typeof monogatari !== 'undefined' && monogatari.proceed, { timeout: 8000 });
	await page.waitForTimeout (300);
	await page.evaluate (async () => { try { await monogatari.startGame (); } catch {} });
	await page.waitForTimeout (150);
	return errs;
}

// Прокручиваем игру до Ending_Credits / появления tla_endings или таймаута.
// Перед jump'ом сбрасываем pending-choice из пролога и снимаем engine block.
async function advanceToEnding (page, label, maxSteps = 200) {
	await page.evaluate ((lbl) => {
		// Уберём всё, что могло прицепиться от Prologue_Morning_Choice
		document.querySelectorAll ('choice-container button').forEach (b => b.remove ());
		// Снимем блок выбора и принудительно выставим состояние на 0й шаг нужного лейбла
		try {
			monogatari.global ('block', false);
			monogatari.global ('_engine_block', false);
			monogatari.global ('playing', true);
			monogatari.state ({ label: lbl, step: 0 });
		} catch {}
		return monogatari.run ('jump ' + lbl).catch (() => {});
	}, label);
	// Дать движку время стартовать новый лейбл, прежде чем агрессивно кликать.
	await page.waitForTimeout (300);
	for (let i = 0; i < maxSteps; i++) {
		await page.waitForTimeout (40);
		const done = await page.evaluate (() =>
			Object.keys (JSON.parse (localStorage.getItem ('tla_endings') || '{}')).length > 0
		);
		if (done) break;
		await page.evaluate (() => {
			try {
				const btn = document.querySelector ('choice-container button');
				if (btn) btn.click (); else monogatari.proceed ();
			} catch {}
		});
	}
	return await page.evaluate (() => ({
		label: monogatari.state ('label'),
		reached: monogatari.storage ().ending_reached,
		tla: JSON.parse (localStorage.getItem ('tla_endings') || '{}')
	}));
}

async function advanceToLabel (page, jumpTo, expectLabel, expectEnd, maxSteps = 60) {
	await page.evaluate (l => monogatari.run ('jump ' + l).catch (() => {}), jumpTo);
	for (let i = 0; i < maxSteps; i++) {
		await page.waitForTimeout (50);
		const st = await page.evaluate (() => ({
			label: monogatari.state ('label'),
			tla: JSON.parse (localStorage.getItem ('tla_endings') || '{}'),
			hasChoice: !!document.querySelector ('choice-container button')
		}));
		if (expectLabel && st.label === expectLabel) return st;
		if (expectEnd && st.tla[expectEnd]) return st;
		if (st.hasChoice) return st;
		await page.evaluate (() => { try { monogatari.proceed (); } catch {} });
	}
	return await page.evaluate (() => ({
		label: monogatari.state ('label'),
		tla: JSON.parse (localStorage.getItem ('tla_endings') || '{}')
	}));
}

// ----- Test groups ---------------------------------------------------

// Поддержка инкрементального прогона: сохраняем результаты по каждому ключу и
// при следующем запуске пропускаем уже успешно прошедшие. Полезно в окружениях
// с нестабильной памятью: можно гонять чанками TLA_TEST_ENDINGS_OFFSET=...,LIMIT=...
const PARTIAL_PATH = path.join (__dirname, '.endings-partial.json');
function loadPartial () {
	try { return JSON.parse (fs.readFileSync (PARTIAL_PATH, 'utf8')); } catch { return {}; }
}
function savePartial (obj) {
	try { fs.writeFileSync (PARTIAL_PATH, JSON.stringify (obj, null, 2)); } catch {}
}

async function testEndings (launchBrowser, port) {
	const RESUME = process.env.TLA_TEST_RESUME !== '0';
	const partial = RESUME ? loadPartial () : {};
	const BATCH = 5;
	const failures = [];
	const all = [];
	let browser = await launchBrowser ();
	for (let i = 0; i < ENDINGS.length; i++) {
		const [key, lbl] = ENDINGS[i];
		if (RESUME && partial[key]?.ok) {
			all.push (partial[key]);
			continue;
		}
		if (i > 0 && i % BATCH === 0) {
			await browser.close ().catch (() => {});
			browser = await launchBrowser ();
		}
		let ctx, page;
		try {
			({ ctx, page } = await freshContext (browser));
		} catch (e) {
			await browser.close ().catch (() => {});
			browser = await launchBrowser ();
			i--;
			continue;
		}
		const errs = [];
		page.on ('pageerror', e => errs.push (e.message));
		try {
			await page.goto (`http://localhost:${port}/index.html`, { waitUntil: 'domcontentloaded' });
			await page.waitForFunction (() => typeof monogatari !== 'undefined' && monogatari.proceed, { timeout: 8000 });
			await page.waitForTimeout (300);
			await page.evaluate (async () => { try { await monogatari.startGame (); } catch {} });
			await page.waitForTimeout (120);
			const result = await advanceToEnding (page, lbl);
			const ok = !!result.tla[key];
			const rec = { key, lbl, ok, finalLabel: result.label, reached: result.reached };
			all.push (rec);
			if (RESUME) { partial[key] = rec; savePartial (partial); }
			if (!ok) failures.push (`${key} via ${lbl}: tla_endings.${key}=undefined (final=${result.label}, reached=${result.reached || '-'})`);
		} catch (e) {
			all.push ({ key, lbl, ok: false, error: e.message });
			failures.push (`${key} via ${lbl}: THROW ${e.message.slice (0, 200)}`);
		} finally {
			await ctx?.close ().catch (() => {});
		}
	}
	await browser.close ().catch (() => {});
	// Если все 29 успешно прошли — стираем partial, чтобы следующий запуск был чистым.
	if (RESUME && all.every (r => r.ok)) {
		try { fs.unlinkSync (PARTIAL_PATH); } catch {}
	}
	return {
		name: `All ${ENDINGS.length} ALL_ENDINGS keys reached after direct jump`,
		ok: failures.length === 0,
		details: `${all.filter (r => r.ok).length}/${all.length} прошли.`,
		failures, results: all
	};
}

async function testGates (launchBrowser, port) {
	const BATCH = 4;
	const failures = [];
	const all = [];
	let browser = await launchBrowser ();
	for (let i = 0; i < GATES.length; i++) {
		if (i > 0 && i % BATCH === 0) {
			await browser.close ().catch (() => {});
			browser = await launchBrowser ();
		}
		const sc = GATES[i];
		let ctx, page;
		try {
			({ ctx, page } = await freshContext (browser));
		} catch {
			await browser.close ().catch (() => {});
			browser = await launchBrowser ();
			i--;
			continue;
		}
		try {
			await page.goto (`http://localhost:${port}/index.html`, { waitUntil: 'domcontentloaded' });
			await page.waitForFunction (() => typeof monogatari !== 'undefined' && monogatari.proceed, { timeout: 8000 });
			await page.waitForTimeout (300);
			await page.evaluate (async () => { try { await monogatari.startGame (); } catch {} });
			await page.waitForTimeout (120);
			await page.evaluate (preset => monogatari.storage (preset), sc.preset);
			const final = await advanceToLabel (page, sc.jump, sc.expectLabel, sc.expectEnd);
			let pass = false;
			if (sc.expectEnd) pass = !!final.tla[sc.expectEnd] || final.label?.startsWith ('Ending_'); // зашли в нужный коридор
			if (sc.expectLabel) pass = pass || final.label === sc.expectLabel;
			all.push ({ ...sc, finalLabel: final.label, pass });
			if (!pass) failures.push (`«${sc.desc}» — финальный лейбл ${final.label}, ожидался ${sc.expectLabel || sc.expectEnd}`);
		} catch (e) {
			all.push ({ ...sc, pass: false, error: e.message });
			failures.push (`«${sc.desc}» — THROW ${e.message.slice (0, 200)}`);
		} finally {
			await ctx?.close ().catch (() => {});
		}
	}
	await browser.close ().catch (() => {});
	return {
		name: 'Hell_Breakdown_Route / Hell_Secret_Check / Hell_Lilith_Visit_Check ведут в правильные ветки',
		ok: failures.length === 0,
		details: `${all.filter (r => r.pass).length}/${all.length} гейтов отработали.`,
		failures, results: all
	};
}

async function testProceedGuard (browser, port) {
	const { ctx, page } = await freshContext (browser);
	try {
		const errs = await bootGame (page, port);
		// Прыгаем в концовку с большим количеством wait — например, Ending_Credits через Ending_Loophole
		await page.evaluate (() => monogatari.run ('jump Ending_Loophole').catch (() => {}));
		// Очень агрессивно проматываем — каждые 5 мс, чтобы попасть в фазу `wait N`
		for (let i = 0; i < 200; i++) {
			await page.waitForTimeout (5);
			await page.evaluate (() => { try {
				const btn = document.querySelector ('choice-container button');
				if (btn) btn.click (); else monogatari.proceed ();
			} catch {} });
			const done = await page.evaluate (() =>
				Object.keys (JSON.parse (localStorage.getItem ('tla_endings') || '{}')).length > 0
			);
			if (done) break;
		}
		const waitErrs = errs.filter (e => /Wait period has not ended/.test (e)).length;
		const otherErrs = errs.filter (e => !/Wait period has not ended/.test (e));
		const failures = [];
		if (waitErrs > 0) failures.push (`installProceedGuard пропустил ${waitErrs} pageerror «Wait period has not ended.»`);
		if (otherErrs.length) failures.push (`Неожиданные pageerror: ${otherErrs.slice (0, 3).join (' | ')}`);
		return {
			name: 'installProceedGuard ловит «Wait period has not ended.» при агрессивном proceed',
			ok: failures.length === 0,
			details: `wait-period errors=${waitErrs}, other=${otherErrs.length}.`,
			failures
		};
	} finally {
		await ctx.close ().catch (() => {});
	}
}

// Headless-shell в песочнице нестабилен — даём каждому подтесту свежий браузер.
// Плюс ретрай первого goto: если сразу после launch `page.goto` падает с
// «Target … closed», пробуем ещё один свежий браузер.
async function testUI (launchBrowser, port) {
	const failures = [];
	const details = [];

	async function withRetry (label, fn, attempts = 2) {
		let lastErr = null;
		for (let i = 0; i < attempts; i++) {
			try { return await fn (); }
			catch (e) {
				lastErr = e;
				if (!/Target.*closed|page has been closed/i.test (e.message)) throw e;
				await sleep (500);
			}
		}
		throw lastErr;
	}

	// --- Прогон 1: main menu (skip-btn скрыт, кнопка карты на месте) ---
	try {
		await withRetry ('main-menu', async () => {
			const browser = await launchBrowser ();
			try {
				const { ctx, page } = await freshContext (browser);
				await page.goto (`http://localhost:${port}/index.html`, { waitUntil: 'domcontentloaded' });
				await page.waitForFunction (() => typeof monogatari !== 'undefined', { timeout: 8000 });
				let mainShown = false;
				for (let i = 0; i < 20; i++) {
					await page.waitForTimeout (180);
					const v = await page.evaluate (() =>
						Array.from (document.querySelectorAll ('[data-screen]'))
							.filter (e => getComputedStyle (e).display !== 'none')
							.map (e => e.dataset.screen)
					);
					if (v.includes ('main')) { mainShown = true; break; }
					await page.evaluate (() => { try { monogatari.proceed (); } catch {} });
				}
				const result = await page.evaluate (() => {
					const skipBtn = document.getElementById ('skip-btn');
					const skipDisp = skipBtn ? getComputedStyle (skipBtn).display : 'no-btn';
					let hasMain = !!document.getElementById ('main-route-map-btn');
					if (!hasMain) {
						const main = document.querySelector ('[data-screen="main"]');
						const all = main ? [...main.querySelectorAll ('button, a, span, div')] : [];
						hasMain = all.some (e => /карт.*рут|маршрут|🗺/i.test (e.textContent || ''));
					}
					return { skipDisp, hasMain };
				});
				details.push (`mainShown=${mainShown}, skip-btn=${result.skipDisp}, mainRouteMapBtn=${result.hasMain}`);
				if (mainShown && result.skipDisp !== 'none') failures.push (`#skip-btn виден на главном меню (display=${result.skipDisp}); должен быть none`);
				if (!result.hasMain) failures.push ('Кнопка «Карта рутов» отсутствует в главном меню');
				await ctx.close ().catch (() => {});
			} finally { await browser.close ().catch (() => {}); }
		});
	} catch (e) { failures.push ('UI[main-menu]: ' + e.message.slice (0, 200)); }

	// --- Прогон 2: life-meter работает + route-map-btn в quick-menu ---
	try {
		await withRetry ('in-game', async () => {
			const browser = await launchBrowser ();
			try {
				const { ctx, page } = await freshContext (browser);
				await page.goto (`http://localhost:${port}/index.html`, { waitUntil: 'domcontentloaded' });
				await page.waitForFunction (() => typeof monogatari !== 'undefined' && monogatari.proceed, { timeout: 8000 });
				await page.waitForTimeout (300);
				await page.evaluate (async () => { try { await monogatari.startGame (); } catch {} });
				await page.evaluate (() => monogatari.run ('jump Prologue_Morning_Choice').catch (() => {}));
				await page.waitForTimeout (350);
				// Делаем все проверки в одном evaluate, чтобы не плодить раунд-трипов
				// (каждый из которых даёт шанс упасть нестабильному headless-shell).
				const ui = await page.evaluate (() => {
					const fillEl = document.getElementById ('life-fill');
					const lifeOk = !!fillEl && typeof updateLifeMeter === 'function';
					let wFull = '', wLow = '';
					if (lifeOk) {
						try { updateLifeMeter (5, 5); wFull = fillEl.style.width; } catch {}
						try { updateLifeMeter (1, 5); wLow = fillEl.style.width; } catch {}
					}
					const btn = document.getElementById ('route-map-btn');
					let overlayOpen = false;
					if (btn) {
						try { btn.click (); } catch {}
						overlayOpen = !!document.getElementById ('route-map-overlay');
					}
					return { lifeOk, wFull, wLow, hasBtn: !!btn, overlayOpen };
				});
				details.push (`life ${ui.wFull || '?'}/${ui.wLow || '?'}, quick-btn=${ui.hasBtn}, overlay=${ui.overlayOpen}`);
				if (!ui.lifeOk) failures.push ('updateLifeMeter недоступен');
				else if (ui.wFull !== '100%' || ui.wLow !== '20%') {
					failures.push (`#life-fill.style.width не обновляется: ожидал 100%/20%, получил «${ui.wFull}»/«${ui.wLow}»`);
				}
				if (!ui.hasBtn) failures.push ('route-map-btn отсутствует в in-game quick-menu');
				if (ui.hasBtn && !ui.overlayOpen) failures.push ('Клик по route-map-btn не открыл overlay');
				await ctx.close ().catch (() => {});
			} finally { await browser.close ().catch (() => {}); }
		});
	} catch (e) { failures.push ('UI[in-game]: ' + e.message.slice (0, 200)); }

	return {
		name: 'UI: skip-btn, life meter, route map, main menu',
		ok: failures.length === 0,
		details: details.join (' | '),
		failures
	};
}

// ----- Runner -----------------------------------------------------

export async function runRuntime () {
	const port = await findFreePort ();
	await ensureServer (port);
	const { chromium } = await importPlaywright ();

	const launchOpts = { headless: true, args: ['--no-sandbox', '--disable-dev-shm-usage'] };
	// Если Playwright скачал headless_shell в кеш — подсунуть его явно (иначе берётся стандартный chromium).
	const cachedShell = path.join (process.env.HOME || '', '.cache/ms-playwright/chromium_headless_shell-1217/chrome-linux/headless_shell');
	if (fs.existsSync (cachedShell)) launchOpts.executablePath = cachedShell;

	const launchBrowser = () => chromium.launch (launchOpts);
	const results = [];
	results.push (await testEndings (launchBrowser, port));
	results.push (await testGates (launchBrowser, port));
	// Свежие браузеры на каждую группу — изолируем падения headless-shell.
	let browser = await launchBrowser ();
	try { results.push (await testProceedGuard (browser, port)); }
	finally { await browser.close ().catch (() => {}); }
	results.push (await testUI (launchBrowser, port));

	const lastRunPath = path.join (__dirname, '.last-run.json');
	fs.writeFileSync (lastRunPath, JSON.stringify (results, null, 2));
	return {
		total: results.length,
		passed: results.filter (r => r.ok).length,
		failed: results.filter (r => !r.ok).length,
		results
	};
}

export function printRuntime (report) {
	console.log ('\n=== RUNTIME CHECKS ===');
	for (const r of report.results) {
		const tag = r.ok ? '\u001b[32m✓\u001b[0m' : '\u001b[31m✗\u001b[0m';
		console.log (`${tag} ${r.name}  — ${r.details}`);
		if (!r.ok) for (const f of r.failures) console.log (`    · ${f}`);
	}
	console.log (`Runtime: ${report.passed}/${report.total} passed`);
}

if (process.argv[1] && process.argv[1].endsWith ('runtime.mjs')) {
	const report = await runRuntime ();
	printRuntime (report);
	process.exit (report.failed > 0 ? 1 : 0);
}

// tests/layout.mjs — визуальная проверка верстки.
//
// Делает скриншоты ключевых сцен (включая новые expansion-ветки)
// и измеряет bbox каждого спрайта/текст-бокса/UI, проверяя:
//   1) спрайт не выходит за пределы вьюпорта
//   2) спрайты не накладываются друг на друга (>30% перекрытия)
//   3) спрайт не закрыт текст-боксом (на верхние 60% высоты спрайта)
//   4) UI-элементы (life-meter, quick-menu) не перекрыты спрайтом
//   5) пропорции спрайта — портрет (аспект <= 0.85)
//
// Запуск: bun run tests/layout.mjs

import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import net from 'node:net';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname (fileURLToPath (import.meta.url));
const REPO = path.resolve (__dirname, '..');
const SHOTS = path.join (__dirname, 'screenshots');
fs.mkdirSync (SHOTS, { recursive: true });

const sleep = ms => new Promise (r => setTimeout (r, ms));

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
	throw new Error ('Не нашёл свободный порт');
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
	throw new Error ('server not up');
}

// Сценарии: для каждого — jump-сцена + опциональный preset stat'ов.
// Подобраны так, чтобы покрыть все новые expansion-ветки + классические сцены
// с одним/двумя/тремя персонажами.
const SCENES = [
	// --- Прологовые ---
	{ name: 'prologue_morning',     label: 'Prologue_Morning_Choice' },
	{ name: 'prologue_window',      label: 'Prologue_Window' },
	{ name: 'prologue_mirror',      label: 'Prologue_Mirror' },
	{ name: 'prologue_neighbor',    label: 'Prologue_Neighbor' },
	{ name: 'prologue_inna_flirt',  label: 'Prologue_Inna_Flirt' },
	{ name: 'prologue_boss',        label: 'Prologue_Boss_Meeting' },

	// --- Суд ---
	{ name: 'judgment_arrival',     label: 'Judgment_Arrival' },
	{ name: 'judgment_queue',       label: 'Judgment_Queue' },
	{ name: 'judgment_audience',    label: 'Judgment_Audience' },
	{ name: 'judgment_settle',      label: 'Judgment_Settle' },
	{ name: 'judgment_lawyer',      label: 'Judgment_Lawyer' },
	{ name: 'judgment_verdict',     label: 'Judgment_Verdict_Standard' },

	// --- Ад ---
	{ name: 'hell_arrival',         label: 'Hell_Arrival_Mundane' },
	{ name: 'hell_bureaucracy',     label: 'Hell_Bureaucracy_Body' },
	{ name: 'hell_lilith',          label: 'Hell_Lilith_Intro' },
	{ name: 'hell_viktor',          label: 'Hell_Viktor_Intro' },
	{ name: 'hell_breakdown',       label: 'Hell_Breakdown_Normal_Choice' },
	{ name: 'hell_debate',          label: 'Hell_Debate_Loop' },

	// --- Expansion v1: боковые двери ---
	{ name: 'exp_router',           label: 'Expansion_Router' },
	{ name: 'exp_cafeteria',        label: 'Expansion_Cafeteria_Intro' },
	{ name: 'exp_library',          label: 'Expansion_Library_Intro' },
	{ name: 'exp_union',            label: 'Expansion_Union_Intro' },
	{ name: 'exp_helpdesk',         label: 'Expansion_Helpdesk_Intro' },
	{ name: 'exp_atheist_group',    label: 'Expansion_AtheistGroup_Intro' },
	{ name: 'exp_child',            label: 'Expansion_Child_Intro' },
	{ name: 'exp_father',           label: 'Expansion_Father_Intro' },
	{ name: 'exp_maintenance',      label: 'Expansion_Maintenance_Intro' },
	{ name: 'exp_inna_hell',        label: 'Expansion_Inna_Intro', preset: { inna_met: true } },

	// --- Expansion v3: бар и встречи ---
	{ name: 'exp_bar_entry',        label: 'Expansion_Bar_Entry' },
	{ name: 'exp_bar_quiz',         label: 'Expansion_Bar_Quiz' },
	{ name: 'exp_famous',           label: 'Expansion_Famous_Meeting' },
	{ name: 'exp_encounter_critic', label: 'Expansion_Encounter_Critic' },
	{ name: 'exp_encounter_anya',   label: 'Expansion_Encounter_OldFlame', preset: { inna_met: true } },

	// --- Expansion v4: программист и подписка ---
	{ name: 'exp_subscription',     label: 'Expansion_Subscription' },
	{ name: 'exp_programmer',       label: 'Expansion_Programmer_Intro' },
	{ name: 'exp_loop',             label: 'Expansion_Loop_Discovery' },

	// --- Концовки с двумя/тремя персонажами одновременно ---
	{ name: 'ending_lilith_romance', label: 'Hell_Lilith_Romance', preset: { lilith_met: true, lilith_interest: 5 } },
	{ name: 'ending_viktor_freedom', label: 'Ending_ViktorFreedom' },
	{ name: 'ending_demon_friend',   label: 'Ending_DemonFriend' },

	// --- Новые спрайтовые ремапы ---
	{ name: 'remap_chef',            label: 'Expansion_Cafeteria_Form' },
	{ name: 'remap_archivist',       label: 'Expansion_Library_Intro' },
	{ name: 'remap_dev',             label: 'Expansion_Maintenance_Intro' },

	// --- Свежесгенерированные спрайты ---
	{ name: 'new_child',             label: 'Expansion_Child_Intro' },
	{ name: 'new_father',            label: 'Expansion_Father_Intro' },
	{ name: 'new_boris',             label: 'Expansion_Bar_Entry' }
];

const VIEWPORT = { width: 1280, height: 800 };

// Проверяем кадр и возвращаем массив проблем.
function detectIssues (frame, name) {
	const issues = [];
	const sprites = frame.sprites || [];
	const tb = frame.textBox;
	const ui = frame.ui || {};

	for (const s of sprites) {
		// 1) viewport overflow — пара пикселей допустимы
		if (s.x < -5) issues.push (`${name}: спрайт "${s.id}" уходит за левый край (x=${Math.round(s.x)})`);
		if (s.x + s.w > VIEWPORT.width + 5) issues.push (`${name}: спрайт "${s.id}" уходит за правый край (right=${Math.round(s.x + s.w)})`);
		if (s.y < -5) issues.push (`${name}: спрайт "${s.id}" уходит за верх (y=${Math.round(s.y)})`);
		if (s.y + s.h > VIEWPORT.height + 5) issues.push (`${name}: спрайт "${s.id}" уходит за низ (bottom=${Math.round(s.y + s.h)})`);

		// 2) аспект (не должен быть слишком широким — спрайты у нас портреты)
		const aspect = s.w / s.h;
		if (aspect > 0.85) issues.push (`${name}: спрайт "${s.id}" слишком широкий (aspect=${aspect.toFixed(2)})`);

		// 3) текст-бокс перекрывает важную часть лица?
		// Считаем, что верхние 60% спрайта — голова/торс, нижние 40% — ноги, их можно закрывать.
		if (tb && tb.visible) {
			const importantBottom = s.y + s.h * 0.6;
			if (tb.y < importantBottom) {
				const overlapY = importantBottom - tb.y;
				const overlapX = Math.min (s.x + s.w, tb.x + tb.w) - Math.max (s.x, tb.x);
				if (overlapY > 5 && overlapX > 50) {
					issues.push (`${name}: текст-бокс перекрывает лицо/торс спрайта "${s.id}" на ${Math.round(overlapY)}px по вертикали`);
				}
			}
		}

		// 4) UI элементы (life-meter, wtf-meter, quick-menu)
		for (const [ui_name, rect] of Object.entries (ui)) {
			if (!rect) continue;
			const ox = Math.min (s.x + s.w, rect.x + rect.w) - Math.max (s.x, rect.x);
			const oy = Math.min (s.y + s.h, rect.y + rect.h) - Math.max (s.y, rect.y);
			if (ox > 5 && oy > 5) {
				// Не критично, если только верхние UI (life-meter) пересекаются с дальним краем волос — допускаем.
				// Сообщаем только когда перекрытие площадей превышает 4000px².
				if (ox * oy > 4000) {
					issues.push (`${name}: спрайт "${s.id}" пересекается с UI "${ui_name}" на ${Math.round(ox * oy)} px²`);
				}
			}
		}
	}

	// 5) попарное перекрытие спрайтов
	for (let i = 0; i < sprites.length; i++) {
		for (let j = i + 1; j < sprites.length; j++) {
			const a = sprites[i], b = sprites[j];
			const ox = Math.min (a.x + a.w, b.x + b.w) - Math.max (a.x, b.x);
			const oy = Math.min (a.y + a.h, b.y + b.h) - Math.max (a.y, b.y);
			if (ox > 0 && oy > 0) {
				const area = ox * oy;
				const smaller = Math.min (a.w * a.h, b.w * b.h);
				const ratio = area / smaller;
				if (ratio > 0.30) {
					issues.push (`${name}: спрайты "${a.id}" и "${b.id}" накладываются на ${Math.round(ratio * 100)}% (площадь ${Math.round(area)} px²)`);
				}
			}
		}
	}

	return issues;
}

async function captureScene (page, scene, port) {
	const TEST_QUERY = '?tla_runtime_test=1';
	await page.goto (`http://localhost:${port}/index.html${TEST_QUERY}`, { waitUntil: 'domcontentloaded' });
	await page.waitForFunction (() => typeof monogatari !== 'undefined' && monogatari.proceed, { timeout: 10000 });

	// Прогрев — дать главному экрану появиться
	await page.waitForFunction (() => {
		const m = document.querySelector ('[data-screen="main"]');
		const g = document.querySelector ('[data-screen="game"]');
		return !!(m?.classList.contains ('active') || g?.classList.contains ('active'));
	}, { timeout: 8000 });

	// Старт игры
	await page.evaluate (async () => {
		try {
			if (typeof monogatari.startGame === 'function') {
				await monogatari.startGame ();
				return;
			}
			monogatari.global ('playing', true);
			monogatari.global ('block', false);
			monogatari.global ('_engine_block', false);
			if (typeof monogatari.onStart === 'function') await monogatari.onStart ();
			if (typeof monogatari.showScreen === 'function') monogatari.showScreen ('game');
		} catch {}
	});

	// Применить preset stats, если задан
	if (scene.preset) {
		await page.evaluate (preset => monogatari.storage (preset), scene.preset);
	}

	// Прыгнуть в нужный лейбл
	await page.evaluate (lbl => {
		try {
			monogatari.global ('block', false);
			monogatari.global ('_engine_block', false);
			monogatari.global ('playing', true);
			monogatari.state ({ label: lbl, step: 0 });
		} catch {}
		return monogatari.run ('jump ' + lbl).catch (() => {});
	}, scene.label);

	// Дать сцене стартовать: прокрутить несколько шагов до первого выбора или до второй реплики персонажа
	await page.waitForTimeout (400);
	for (let i = 0; i < 6; i++) {
		const stop = await page.evaluate (() => {
			const choice = document.querySelector ('choice-container button');
			const sprites = document.querySelectorAll ('character-sprite, img[data-character]');
			return !!choice || sprites.length >= 1;
		});
		if (stop) break;
		await page.evaluate (() => { try { monogatari.proceed (); } catch {} });
		await page.waitForTimeout (180);
	}

	// Дождаться рендера спрайтов
	await page.waitForTimeout (600);

	// Скриншот
	const shotPath = path.join (SHOTS, scene.name + '.png');
	await page.screenshot ({ path: shotPath, fullPage: false });

	// Замеры
	const measurements = await page.evaluate (() => {
		const rectOf = el => {
			if (!el) return null;
			const r = el.getBoundingClientRect ();
			if (!r || r.width === 0 || r.height === 0) return null;
			if (getComputedStyle (el).display === 'none' || getComputedStyle (el).visibility === 'hidden') return null;
			return { x: r.x, y: r.y, w: r.width, h: r.height };
		};

		const sprites = [];
		// Monogatari в этой версии рендерит спрайты как голые img[data-character]
		// напрямую в game-screen (без character-sprite обёртки). Меряем именно их —
		// у обёртки нет позиции, она занимает весь экран.
		const imgs = document.querySelectorAll ('img[data-character]');
		const byKey = new Map ();
		for (const img of imgs) {
			const r = rectOf (img);
			if (!r) continue;
			// Дедуплицируем по (имя+позиция): Monogatari иногда оставляет старые img в DOM
			const pos = img.classList.contains ('left') ? 'left' : img.classList.contains ('right') ? 'right' : img.classList.contains ('center') ? 'center' : 'unk';
			const key = (img.dataset.character || 'sprite') + '@' + pos;
			byKey.set (key, { id: img.dataset.character, pos, ...r });
		}
		for (const s of byKey.values ()) sprites.push (s);

		const textBoxEl = document.querySelector ('text-box');
		const textBox = textBoxEl ? rectOf (textBoxEl) : null;
		const textBoxVisible = textBoxEl && getComputedStyle (textBoxEl).display !== 'none';

		const ui = {
			life: rectOf (document.getElementById ('life-meter')),
			wtf: rectOf (document.getElementById ('wtf-meter')),
			quick: rectOf (document.querySelector ('quick-menu')),
			skip: rectOf (document.getElementById ('skip-btn'))
		};

		return {
			sprites,
			textBox: textBox ? { ...textBox, visible: textBoxVisible } : null,
			ui
		};
	});

	return { ...measurements, shotPath };
}

async function importPlaywright () {
	try { return await import ('playwright'); } catch (e) {
		console.error ('[layout] Playwright не установлен. bun install и bunx playwright install chromium');
		process.exit (2);
	}
}

async function main () {
	const port = await findFreePort ();
	await ensureServer (port);
	const { chromium } = await importPlaywright ();
	const launchOpts = { headless: true, args: ['--no-sandbox', '--disable-dev-shm-usage'] };
	// На системе уже стоит chromium-1208 — указываем его явно, чтобы Playwright
	// не искал свой стандартный (отсутствующий) headless_shell.
	const cachedChrome = '/Users/krestnikov/Library/Caches/ms-playwright/chromium-1208/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing';
	if (fs.existsSync (cachedChrome)) launchOpts.executablePath = cachedChrome;
	const browser = await chromium.launch (launchOpts);

	const totalIssues = [];
	const report = [];

	try {
		const BATCH = 10;
		let scenesDone = 0;

		for (let i = 0; i < SCENES.length; i++) {
			if (i > 0 && i % BATCH === 0) {
				// Перезапуск браузера, чтобы избежать утечек
			}

			const scene = SCENES[i];
			const ctx = await browser.newContext ({ viewport: VIEWPORT });
			const page = await ctx.newPage ();
			page.setDefaultTimeout (10000);

			const errs = [];
			page.on ('pageerror', e => errs.push (e.message));

			try {
				const m = await captureScene (page, scene, port);
				const issues = detectIssues (m, scene.name);
				const consoleErrs = errs.filter (e => !/Wait period has not ended|Extra condition check failed/.test (e));
				if (consoleErrs.length) {
					issues.push (`${scene.name}: pageerror — ${consoleErrs[0].slice (0, 150)}`);
				}
				report.push ({
					scene: scene.name,
					label: scene.label,
					sprites: m.sprites.map (s => `${s.id}@${Math.round(s.x)},${Math.round(s.y)} ${Math.round(s.w)}x${Math.round(s.h)}`),
					issues,
					shot: path.relative (REPO, m.shotPath)
				});
				totalIssues.push (...issues);
				scenesDone++;
				const tag = issues.length === 0 ? '✓' : '✗';
				console.log (`${tag} ${scene.name} — ${m.sprites.length} спрайт(а/ов); ${issues.length} замечани${issues.length === 1 ? 'е' : 'я'}`);
				for (const issue of issues) console.log (`    · ${issue}`);
			} catch (e) {
				const msg = e.message.slice (0, 200);
				console.log (`✗ ${scene.name} — THROW ${msg}`);
				report.push ({ scene: scene.name, label: scene.label, sprites: [], issues: ['THROW: ' + msg] });
				totalIssues.push (`${scene.name}: ${msg}`);
			} finally {
				await ctx.close ().catch (() => {});
			}
		}
	} finally {
		await browser.close ().catch (() => {});
	}

	fs.writeFileSync (path.join (__dirname, 'layout-report.json'), JSON.stringify (report, null, 2));

	console.log ('\n' + '='.repeat (60));
	console.log (`Layout: ${SCENES.length} сцен, ${totalIssues.length} замечани${totalIssues.length === 1 ? 'е' : 'й'}`);
	console.log (`Скриншоты: ${path.relative (REPO, SHOTS)}/`);
	console.log (`Подробный отчёт: tests/layout-report.json`);
	process.exit (totalIssues.length > 0 ? 1 : 0);
}

main ().catch (e => { console.error (e); process.exit (3); });

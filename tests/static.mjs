// tests/static.mjs
// Статические проверки исходников (без браузера). Запускается через `bun run tests/static.mjs`.
//
// Каждая функция-проверка возвращает { name, ok, details, failures }.
// runStatic() собирает их, печатает таблицу и возвращает агрегат.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname (fileURLToPath (import.meta.url));
const REPO = path.resolve (__dirname, '..');

const SCRIPT_FILES = ['prologue.js', 'judgment.js', 'hell.js', 'endings.js'];

// ---------------------------------------------------------------- helpers

function readScript (file) {
	return fs.readFileSync (path.join (REPO, 'js/scripts', file), 'utf8');
}

function readSource (rel) {
	return fs.readFileSync (path.join (REPO, rel), 'utf8');
}

// Все объявления `\t'Label': [`
function collectLabels () {
	const labels = new Map ();
	for (const file of SCRIPT_FILES) {
		const txt = readScript (file);
		txt.split ('\n').forEach ((line, idx) => {
			const m = line.match (/^\t'([A-Z][A-Za-z0-9_]+)':\s*\[/);
			if (m) labels.set (m[1], { file, line: idx + 1 });
		});
	}
	return labels;
}

// Все ссылки на лейблы: 'jump X', 'Do': 'jump X', monogatari.run('jump X')
function collectJumps () {
	const jumps = [];
	for (const file of SCRIPT_FILES) {
		const txt = readScript (file);
		let curLabel = null;
		txt.split ('\n').forEach ((line, idx) => {
			const lm = line.match (/^\t'([A-Z][A-Za-z0-9_]+)':\s*\[/);
			if (lm) curLabel = lm[1];
			const lineno = idx + 1;
			let m;
			const re1 = /'jump\s+([A-Z][A-Za-z0-9_]+)'/g;
			while ((m = re1.exec (line)) !== null) jumps.push ({ from: curLabel, to: m[1], file, line: lineno });
			const re2 = /run\s*\(\s*['"]jump\s+([A-Z][A-Za-z0-9_]+)['"]\s*\)/g;
			while ((m = re2.exec (line)) !== null) jumps.push ({ from: curLabel, to: m[1], file, line: lineno });
		});
	}
	return jumps;
}

function extractBlock (src, openRe, closeStr) {
	const m = src.match (openRe);
	if (!m) return null;
	// Naive: capture until first top-level "\n};" after the match
	const start = m.index + m[0].length;
	const end = src.indexOf (closeStr, start);
	return end === -1 ? null : src.slice (start, end);
}

function collectAllEndingKeys () {
	const main = readSource ('js/main.js');
	const block = extractBlock (main, /const ALL_ENDINGS\s*=\s*\{/, '\n};');
	if (!block) return [];
	return [...block.matchAll (/'([a-z_]+)':\s*'[^']*'/g)].map (m => m[1]);
}

function collectRouteMap () {
	const main = readSource ('js/main.js');
	const block = extractBlock (main, /const ROUTE_MAP\s*=\s*\{/, '\n};');
	if (!block) return { nodes: [], edges: [], endings: [] };
	const nodeIds = [...block.matchAll (/\{\s*id:\s*'([A-Z][A-Za-z0-9_]+)'/g)].map (m => m[1]);
	const endings = [...block.matchAll (/ending:\s*'([a-z_]+)'/g)].map (m => m[1]);
	const edges = [...block.matchAll (/\[\s*'([A-Z][A-Za-z0-9_]+)'\s*,\s*'([A-Z][A-Za-z0-9_]+)'\s*\]/g)]
		.map (m => [m[1], m[2]]);
	return { nodes: nodeIds, edges, endings };
}

function collectStorageAndReset () {
	const stor = readSource ('js/storage.js');
	const scr = readSource ('js/script.js');
	const sBlock = extractBlock (stor, /monogatari\.storage\s*\(\s*\{/, '\n}\\)');
	const storageBlock = sBlock || stor.match (/monogatari\.storage\s*\(\s*\{([\s\S]+?)\}\s*\)/)?.[1] || '';
	const resetBlock = scr.match (/resetStoryStateForNewGame[\s\S]+?\{([\s\S]+?)\n\}/)?.[1] || '';
	// Берём только TOP-level ключи (одиночный отступ табом). `player: { name: '' }` —
	// строка с `name:` будет с двумя табами и не попадёт.
	const stKeys = [...storageBlock.matchAll (/^\t([a-z_][a-z_0-9]*)\s*:/gm)].map (m => m[1]);
	const rsKeys = [...resetBlock.matchAll (/^\t\t([a-z_][a-z_0-9]*)\s*:/gm)].map (m => m[1]);
	return { storage: stKeys, reset: rsKeys };
}

// ---------------------------------------------------------------- checks

function checkNoDeadJumps () {
	const labels = collectLabels ();
	const jumps = collectJumps ();
	const dead = jumps.filter (j => !labels.has (j.to));
	return {
		name: 'No dead `jump <Label>` references',
		ok: dead.length === 0,
		details: `${jumps.length} jumps, ${labels.size} labels.`,
		failures: dead.map (d => `${d.file}:${d.line} (${d.from || '?'}) → ${d.to} (нет такого лейбла)`)
	};
}

function checkAllLabelsReachable () {
	// BFS от Prologue_Morning_Choice по jump-графу. Лейблы, до которых нельзя дойти,
	// считаются мёртвым кодом (за исключением спец-лейблов, которые движок зовёт сам).
	const labels = collectLabels ();
	const jumps = collectJumps ();
	const adj = new Map ();
	for (const lbl of labels.keys ()) adj.set (lbl, new Set ());
	for (const j of jumps) if (adj.has (j.from)) adj.get (j.from).add (j.to);

	const ROOTS = ['Prologue_Morning_Choice'];
	const ENGINE_ENTRY = new Set (['Start', '_SplashScreen', 'Ending_Credits']);

	const reached = new Set (ROOTS);
	const stack = [...ROOTS];
	while (stack.length) {
		const cur = stack.pop ();
		const next = adj.get (cur);
		if (!next) continue;
		for (const n of next) if (!reached.has (n)) { reached.add (n); stack.push (n); }
	}
	const orphans = [...labels.keys ()]
		.filter (l => !reached.has (l))
		.filter (l => !ENGINE_ENTRY.has (l));
	return {
		name: 'All declared labels reachable from Prologue_Morning_Choice',
		ok: orphans.length === 0,
		details: `${reached.size}/${labels.size} reachable.`,
		failures: orphans.map (o => `${o} (${labels.get (o).file}:${labels.get (o).line}) — нет ни одного jump-предшественника`)
	};
}

function checkRouteMapNodesAreRealLabels () {
	const labels = collectLabels ();
	const { nodes } = collectRouteMap ();
	const broken = nodes.filter (id => !labels.has (id));
	return {
		name: 'ROUTE_MAP node IDs match declared labels',
		ok: broken.length === 0,
		details: `${nodes.length} nodes in ROUTE_MAP.`,
		failures: broken.map (id => `ROUTE_MAP node id="${id}" — лейбла с таким именем нет в js/scripts/*.js`)
	};
}

function checkRouteMapEdgesAreInternal () {
	const { nodes, edges } = collectRouteMap ();
	const set = new Set (nodes);
	const broken = edges.filter (([a, b]) => !set.has (a) || !set.has (b));
	return {
		name: 'ROUTE_MAP edges only reference known nodes',
		ok: broken.length === 0,
		details: `${edges.length} edges.`,
		failures: broken.map (([a, b]) => `[${a}, ${b}] — один из узлов отсутствует в ROUTE_MAP.nodes`)
	};
}

function checkRouteMapCoversAllEndings () {
	const all = collectAllEndingKeys ();
	const { endings } = collectRouteMap ();
	const missing = all.filter (k => !endings.includes (k));
	const extra = endings.filter (k => !all.includes (k));
	return {
		name: 'Every ALL_ENDINGS key has a node in ROUTE_MAP',
		ok: missing.length === 0 && extra.length === 0,
		details: `ALL_ENDINGS=${all.length}, ROUTE_MAP endings=${endings.length}.`,
		failures: [
			...missing.map (k => `ALL_ENDINGS["${k}"] не имеет ноды в ROUTE_MAP`),
			...extra.map (k => `ROUTE_MAP содержит ending="${k}", которого нет в ALL_ENDINGS`)
		]
	};
}

function checkEachEndingHasReachedAssign () {
	// Каждая концовка (по ALL_ENDINGS ключу) должна где-то в скриптах писать
	// `ending_reached: '<key>'`.
	const all = collectAllEndingKeys ();
	const allFiles = SCRIPT_FILES.map (f => readScript (f)).join ('\n');
	const written = new Set ();
	for (const m of allFiles.matchAll (/ending_reached:\s*'([a-z_]+)'/g)) written.add (m[1]);
	const missing = all.filter (k => !written.has (k));
	return {
		name: 'Each ALL_ENDINGS key has at least one `ending_reached: "<key>"` assignment',
		ok: missing.length === 0,
		details: `${written.size}/${all.length} ключей пишутся хотя бы в одном лейбле.`,
		failures: missing.map (k => `Концовка "${k}" не выставляет ending_reached → не запишется в tla_endings`)
	};
}

function checkCreditsCounterMatchesAllEndings () {
	const all = collectAllEndingKeys ();
	const endings = readScript ('endings.js');
	// Принимаем оба варианта: хардкод «из 28» или динамика через ALL_ENDINGS.length.
	const dynamic = /из\s*'\s*\+\s*total/.test (endings)
		&& /Object\.keys\s*\(\s*ALL_ENDINGS\s*\)/.test (endings);
	if (dynamic) {
		return {
			name: 'Credits ending counter is wired to ALL_ENDINGS',
			ok: true,
			details: `Динамический подсчёт через ALL_ENDINGS (${all.length} концовок).`,
			failures: []
		};
	}
	const m = endings.match (/Концовки найдены:\s*'\s*\+\s*\w+\s*\+\s*'\s*из\s*(\d+)/);
	if (!m) {
		return {
			name: 'Credits ending counter is wired to ALL_ENDINGS',
			ok: false,
			details: '«Концовки найдены: X из N» строка не найдена',
			failures: ['Не получилось распарсить число в Ending_Credits — обнови проверку или восстанови шаблон.']
		};
	}
	const hard = parseInt (m[1], 10);
	const ok = hard === all.length;
	return {
		name: 'Credits ending counter is wired to ALL_ENDINGS',
		ok,
		details: `hardcoded=${hard}, ALL_ENDINGS=${all.length}.`,
		failures: ok ? [] : [`Ending_Credits показывает «из ${hard}», а должно быть «из ${all.length}»`]
	};
}

function checkStorageResetSymmetry () {
	const { storage, reset } = collectStorageAndReset ();
	// 'player' живёт в подобъекте — допустимо отсутствие в reset.
	const ALLOW_MISS_FROM_RESET = new Set (['player']);
	const missingFromReset = storage.filter (k => !reset.includes (k) && !ALLOW_MISS_FROM_RESET.has (k));
	const extraInReset = reset.filter (k => !storage.includes (k));
	return {
		name: 'storage.js init keys === resetStoryStateForNewGame keys',
		ok: missingFromReset.length === 0 && extraInReset.length === 0,
		details: `storage=${storage.length} keys, reset=${reset.length} keys.`,
		failures: [
			...missingFromReset.map (k => `"${k}" есть в storage.js, но не сбрасывается в resetStoryStateForNewGame`),
			...extraInReset.map (k => `"${k}" сбрасывается в resetStoryStateForNewGame, но не объявлен в storage.js`)
		]
	};
}

// ---------------------------------------------------------------- runner

const CHECKS = [
	checkNoDeadJumps,
	checkAllLabelsReachable,
	checkRouteMapNodesAreRealLabels,
	checkRouteMapEdgesAreInternal,
	checkRouteMapCoversAllEndings,
	checkEachEndingHasReachedAssign,
	checkCreditsCounterMatchesAllEndings,
	checkStorageResetSymmetry
];

export function runStatic () {
	const results = CHECKS.map (fn => fn ());
	return {
		total: results.length,
		passed: results.filter (r => r.ok).length,
		failed: results.filter (r => !r.ok).length,
		results
	};
}

export function printStatic (report) {
	console.log ('\n=== STATIC CHECKS ===');
	for (const r of report.results) {
		const tag = r.ok ? '\u001b[32m✓\u001b[0m' : '\u001b[31m✗\u001b[0m';
		console.log (`${tag} ${r.name}  — ${r.details}`);
		if (!r.ok) for (const f of r.failures) console.log (`    · ${f}`);
	}
	console.log (`Static: ${report.passed}/${report.total} passed`);
}

if (import.meta.url === `file://${process.argv[1]}` || process.argv[1].endsWith ('static.mjs')) {
	const report = runStatic ();
	printStatic (report);
	process.exit (report.failed > 0 ? 1 : 0);
}

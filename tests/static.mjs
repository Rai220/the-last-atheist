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

function checkScriptWritesAreDeclared () {
	// Каждый ключ, который скрипты пишут через `this.storage({ ... })`,
	// должен быть объявлен в `js/storage.js`. Иначе он не сбросится при новой игре
	// и не будет иметь дефолтного значения — классический latent-bug.
	const { storage } = collectStorageAndReset ();
	const declared = new Set (storage);
	const undeclared = new Map (); // key → [{file, line}]
	for (const file of SCRIPT_FILES) {
		const txt = readScript (file);
		const lines = txt.split ('\n');
		// Сканируем тело каждого `this.storage({ ... })`. Поддерживаем многострочные
		// объекты, поэтому ловим скобки руками.
		for (let i = 0; i < lines.length; i++) {
			const start = lines[i].indexOf ('this.storage');
			if (start === -1) continue;
			// найдём открывающую `{` после `this.storage(`
			let s = lines[i].indexOf ('{', start);
			let row = i, col = s;
			while (s === -1 && row < lines.length - 1) {
				row++;
				col = lines[row].indexOf ('{');
				if (col !== -1) s = col;
			}
			if (s === -1) continue;
			let depth = 0, body = '', startRow = row;
			for (let r = row; r < lines.length; r++) {
				const line = lines[r];
				const from = (r === row) ? s : 0;
				for (let c = from; c < line.length; c++) {
					const ch = line[c];
					if (ch === '{') depth++;
					else if (ch === '}') {
						depth--;
						if (depth === 0) {
							body += line.slice (from, c);
							r = lines.length;
							break;
						}
					}
					if (depth > 0 && c >= from) body += ch;
				}
				if (depth > 0 && r < lines.length) body += '\n';
			}
			for (const km of body.matchAll (/(?:^|[\s,{])([a-z_][a-z_0-9]*)\s*:/g)) {
				const k = km[1];
				if (declared.has (k)) continue;
				if (!undeclared.has (k)) undeclared.set (k, []);
				undeclared.get (k).push (`${file}:${startRow + 1}`);
			}
		}
	}
	const failures = [];
	for (const [k, locs] of undeclared) {
		failures.push (`"${k}" пишется в ${[...new Set (locs)].join (', ')}, но не объявлен в js/storage.js`);
	}
	return {
		name: 'Script writes only touch keys declared in storage.js',
		ok: failures.length === 0,
		details: `${declared.size} declared keys, ${undeclared.size} undeclared writes.`,
		failures
	};
}

function checkStorageDeclarationsAreWritten () {
	// Симметрия для checkScriptWritesAreDeclared: каждый объявленный в storage.js
	// ключ должен где-то реально использоваться — иначе это мёртвый стат, который
	// объявлен, сбрасывается, но никогда не меняется и не гейтит ветки.
	// Допустимо «использование на чтение»: ключ может быть начальным значением,
	// если хотя бы один скрипт его читает (this.storage ().key) или сравнивает в
	// Condition. Поэтому проверяем и записи, и чтения.
	const { storage } = collectStorageAndReset ();
	// Технические/служебные ключи, которые движок Monogatari трогает сам.
	const ALLOW_UNUSED = new Set (['player']);
	const allFiles = SCRIPT_FILES.map (f => readScript (f)).join ('\n');
	const main = readSource ('js/main.js');
	const haystack = allFiles + '\n' + main;
	const orphans = [];
	for (const key of storage) {
		if (ALLOW_UNUSED.has (key)) continue;
		// Достаточно встретить идентификатор где угодно в скриптах или в main.js:
		// `s.key`, `storage().key`, `key:` внутри `this.storage({...})`, и т.п.
		const re = new RegExp ('\\b' + key + '\\b');
		if (!re.test (haystack)) orphans.push (key);
	}
	return {
		name: 'Every storage.js key is read or written somewhere',
		ok: orphans.length === 0,
		details: `${storage.length} declared keys, ${orphans.length} unused.`,
		failures: orphans.map (k => `"${k}" объявлен в storage.js, но не используется ни в js/scripts/*.js, ни в js/main.js (мёртвый стат)`)
	};
}

function checkRuntimeEndingsListInSync () {
	// Файл tests/runtime.mjs держит ENDINGS_FULL — список пар [key, Label]
	// для headless-прогона всех концовок. Когда сценарист добавляет новую
	// концовку в ALL_ENDINGS, он легко забывает обновить этот список —
	// тогда runtime-тест её не покрывает и регрессии не ловятся.
	// Этот чек ловит обе стороны дрейфа: пропавшие и лишние ключи.
	const all = collectAllEndingKeys ();
	const labels = collectLabels ();
	const runtime = readSource ('tests/runtime.mjs');
	const block = extractBlock (runtime, /const ENDINGS_FULL\s*=\s*\[/, '\n];');
	if (!block) {
		return {
			name: 'tests/runtime.mjs ENDINGS_FULL covers all ALL_ENDINGS keys',
			ok: false,
			details: 'не нашёл ENDINGS_FULL в tests/runtime.mjs',
			failures: ['ENDINGS_FULL = [ ... ]; не распарсился. Проверь синтаксис tests/runtime.mjs.']
		};
	}
	const pairs = [...block.matchAll (/\[\s*'([a-z_]+)'\s*,\s*'([A-Z][A-Za-z0-9_]+)'\s*\]/g)]
		.map (m => [m[1], m[2]]);
	const runtimeKeys = pairs.map (p => p[0]);
	const missing = all.filter (k => !runtimeKeys.includes (k));
	const extra = runtimeKeys.filter (k => !all.includes (k));
	const brokenLabels = pairs.filter (([, lbl]) => !labels.has (lbl));
	const failures = [
		...missing.map (k => `ALL_ENDINGS["${k}"] не покрыт runtime-тестом — добавь ['${k}', 'Ending_...'] в tests/runtime.mjs`),
		...extra.map (k => `ENDINGS_FULL содержит '${k}', которого нет в ALL_ENDINGS — устаревший runtime-кейс`),
		...brokenLabels.map (([k, lbl]) => `ENDINGS_FULL['${k}'] → '${lbl}': такого лейбла нет в js/scripts/*.js`)
	];
	return {
		name: 'tests/runtime.mjs ENDINGS_FULL covers all ALL_ENDINGS keys',
		ok: failures.length === 0,
		details: `ALL_ENDINGS=${all.length}, ENDINGS_FULL=${runtimeKeys.length}.`,
		failures
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
	checkScriptWritesAreDeclared,
	checkStorageDeclarationsAreWritten,
	checkStorageResetSymmetry,
	checkRuntimeEndingsListInSync
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

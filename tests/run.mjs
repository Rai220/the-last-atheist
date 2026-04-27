// tests/run.mjs — запускает все проверки, печатает сводку, возвращает non-zero exit на падении.

import { runStatic, printStatic } from './static.mjs';
import { runRuntime, printRuntime } from './runtime.mjs';

const wantOnly = process.argv[2]; // 'static' | 'runtime' | undefined

let staticReport = null;
let runtimeReport = null;

if (wantOnly !== 'runtime') {
	staticReport = runStatic ();
	printStatic (staticReport);
}

if (wantOnly !== 'static') {
	try {
		runtimeReport = await runRuntime ();
		printRuntime (runtimeReport);
	} catch (e) {
		console.error ('\n[runtime] Не удалось запустить headless-проверки:', e.message);
		console.error ('   Если playwright не установлен: bun install && bunx playwright install chromium');
		runtimeReport = { passed: 0, failed: 1, total: 1, results: [{ name: 'runtime bootstrap', ok: false, failures: [e.message], details: '' }] };
	}
}

const passed = (staticReport?.passed || 0) + (runtimeReport?.passed || 0);
const failed = (staticReport?.failed || 0) + (runtimeReport?.failed || 0);
const total = (staticReport?.total || 0) + (runtimeReport?.total || 0);

console.log (`\n${'='.repeat (40)}\nTOTAL: ${passed}/${total} passed, ${failed} failed`);
process.exit (failed > 0 ? 1 : 0);

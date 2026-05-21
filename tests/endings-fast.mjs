// Быстрый прогон достижимости концовок: один браузер + одна вкладка,
// сбрасываем storage и localStorage между прыжками.
// Для каждой концовки jump → advance → проверяем tla_endings[key].

import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import net from 'node:net';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname (fileURLToPath (import.meta.url));
const REPO = path.resolve (__dirname, '..');
const sleep = ms => new Promise (r => setTimeout (r, ms));

async function findFreePort () {
	for (let p = 5220; p < 5320; p++) {
		const ok = await new Promise (resolve => {
			const s = net.createServer ();
			s.once ('error', () => resolve (false));
			s.once ('listening', () => s.close (() => resolve (true)));
			s.listen (p);
		});
		if (ok) return p;
	}
}

const port = await findFreePort ();
const probe = async () => { try { const r = await fetch (`http://localhost:${port}/index.html`); return r.ok; } catch { return false; }};
if (!await probe ()) {
	spawn ('python3', ['-m', 'http.server', String (port)], { cwd: REPO, stdio: 'ignore', detached: true }).unref ();
	for (let i = 0; i < 80; i++) { await sleep (100); if (await probe ()) break; }
}

// Полный список всех концовок (key → label)
const ENDINGS = [
	// Original 40
	['cauldron_eternal',  'Ending_CauldronEternal'], ['loophole', 'Ending_Loophole'],
	['demon_friend', 'Ending_DemonFriend'], ['glitch', 'Ending_Glitch'],
	['debate_win', 'Ending_DebateWin'], ['believer', 'Ending_Believer'],
	['pascal', 'Ending_Pascal'], ['theologian', 'Ending_Theologian'],
	['rebellion', 'Ending_Rebellion'], ['hacker', 'Ending_Hacker'],
	['democracy', 'Ending_Democracy'], ['appeal', 'Ending_Appeal'],
	['bar', 'Ending_Bar'], ['franchise', 'Ending_Franchise'],
	['therapist', 'Ending_Therapist'], ['archivist', 'Ending_Archivist'],
	['matrix', 'Ending_Matrix'], ['speedrun', 'Ending_Speedrun'],
	['beta_tester', 'Ending_BetaTester'], ['awakening', 'Ending_Awakening'],
	['full_circle', 'Ending_FullCircle'], ['dev_commentary', 'Ending_DevCommentary'],
	['empty_throne', 'Ending_EmptyThrone'], ['anon_from_hell', 'Ending_AnonFromHell'],
	['control_group', 'Ending_ControlGroup'], ['alice_log', 'Ending_AliceLog'],
	['alice_silent', 'Ending_AliceSilent'], ['nihilist', 'Ending_Nihilist'],
	['prophet', 'Ending_Prophet'], ['witness', 'Ending_Witness'],
	['last_call', 'Ending_LastCall'], ['hell_romance', 'Ending_HellRomance'],
	['escape_together', 'Ending_EscapeTogether'], ['escape_caught', 'Escape_Caught'],
	['lilith_betrayal', 'Ending_LilithBetrayal'], ['lilith_conflicted', 'Ending_LilithConflicted'],
	['sisyphus', 'Ending_Sisyphus'], ['viktor_hack', 'Ending_ViktorHack'],
	['viktor_freedom', 'Ending_ViktorFreedom'], ['i_am_the_bug', 'Ending_IAmTheBug'],
	// v1 expansion (28)
	['hell_chef', 'Ending_HellChef'], ['cafeteria_leader', 'Ending_CafeteriaLeader'],
	['library_read', 'Ending_Library_Read'], ['letter_to_sergey', 'Ending_LetterToSergey'],
	['father_reply', 'Ending_FatherReply'], ['unspoken_prayers', 'Ending_UnspokenPrayers'],
	['hell_strike', 'Ending_HellStrike'], ['demon_lawsuit', 'Ending_DemonLawsuit'],
	['great_union', 'Ending_GreatUnion'], ['demon_pension', 'Ending_DemonPension'],
	['hard_reset', 'Ending_HardReset'], ['logs_reader', 'Ending_LogsReader'],
	['pull_request', 'Ending_PullRequest'], ['truth_group', 'Ending_TruthGroup'],
	['atheist_therapist', 'Ending_AtheistTherapist'], ['atheist_stay', 'Ending_AtheistGroup_Stay'],
	['child_keep', 'Ending_ChildKeep'], ['child_saved', 'Ending_ChildSaved'],
	['family_hell', 'Ending_FamilyHell'], ['father_son', 'Ending_FatherSon'],
	['father_escape', 'Ending_FatherEscape'], ['dev_maintenance', 'Ending_DevMaintenance'],
	['eula_reader', 'Ending_EULAReader'], ['removed', 'Ending_Removed'],
	['dev_colleague', 'Ending_DevColleague'], ['inna_romance', 'Ending_InnaRomance'],
	['inna_forgive', 'Ending_InnaForgive'], ['inna_revolt', 'Ending_InnaRevolt'],
	// v2 expansion (16)
	['settlement_small', 'Ending_Settlement_Small'], ['settlement_large', 'Ending_Settlement_Large'],
	['settlement_meta', 'Ending_Settlement_Meta'], ['witness_self', 'Ending_WitnessSelf'],
	['savepoint', 'Ending_Savepoint'], ['father_defense', 'Ending_FatherDefense'],
	['sergey_defense', 'Ending_SergeyDefense'], ['reddit_defense', 'Ending_RedditDefense'],
	['past_self_defense', 'Ending_PastSelfDefense'], ['teapot', 'Ending_Teapot'],
	['soul_not_found', 'Ending_404'], ['stack_overflow', 'Ending_StackOverflow'],
	['kernel_panic', 'Ending_KernelPanic'], ['golden_rule', 'Ending_GoldenRule'],
	['out_of_memory', 'Ending_OutOfMemory'], ['git_blame', 'Ending_GitBlame'],
	// v3 expansion (9)
	['bar_guitar', 'Ending_Bar_Guitar'], ['bar_franchise2', 'Ending_BarFranchise2'],
	['anya_forgiven', 'Ending_AnyaForgiven'], ['anya_love', 'Ending_AnyaLove'],
	['anya_together', 'Ending_AnyaTogether'], ['loop_broken', 'Ending_LoopBroken'],
	['accepted_loop', 'Ending_AcceptedLoop'], ['loop_complete', 'Ending_LoopComplete'],
	['speedrun_master', 'Ending_SpeedrunMaster'],
	// v4 expansion (10)
	['sagan_guide', 'Ending_SaganGuide'], ['pale_blue_dot', 'Ending_PaleBlueDot'],
	['cosmos_afterlife', 'Ending_CosmosAfterlife'], ['bog_premium', 'Ending_BogPremium'],
	['free_user', 'Ending_FreeUser'], ['unsubscribe_preemptive', 'Ending_UnsubscribePreemptive'],
	['programmer_rebel', 'Ending_ProgrammerRebel'], ['refactor_self', 'Ending_RefactorSelf'],
	['v1_forever', 'Ending_V1Forever'], ['just_lilith_alt', 'Expansion_Just_Lilith_Alt'],
	// v5
	['yulia_together', 'Ending_YuliaTogether'], ['yulia_forget', 'Ending_YuliaForget'],
	['yulia_47', 'Ending_Yulia47'], ['yulia_48', 'Ending_Yulia48'], ['yulia_zero', 'Ending_YuliaZero'],
	['yulia_kitchen', 'Ending_YuliaKitchen'], ['yulia_quiet', 'Ending_YuliaQuietKindness'],
	['yulia_forgive', 'Ending_YuliaForgive'], ['yulia_blame', 'Ending_YuliaBlame'],
	['yulia_infinite', 'Ending_YuliaInfinite'], ['neighbor_curse_breaker', 'Ending_NeighborCurseBreaker'],
	['neighbor_hell_romance', 'Ending_NeighborHellRomance'],
	['granny_leader', 'Ending_GrannyLeader'], ['granny_archive', 'Ending_GrannyArchive'],
	['granny_missed', 'Ending_GrannyMissed'], ['granny_oracle', 'Ending_GrannyOracle'],
	['granny_takeover', 'Ending_GrannyTakeover'],
	['sisterhood', 'Ending_Sisterhood'], ['manifesto', 'Ending_Manifesto'],
	['max_empathy', 'Ending_MaxEmpathy'], ['max_cruelty', 'Ending_MaxCruelty'],
	['max_humor', 'Ending_MaxHumor'], ['max_rebellion', 'Ending_MaxRebellion'],
	['max_acceptance', 'Ending_MaxAcceptance'], ['low_life', 'Ending_LowLife'],
	['max_lilith_trust', 'Ending_MaxLilithTrust'], ['all_stats', 'Ending_AllStats'],
	['low_all', 'Ending_LowAll'], ['double_agent', 'Ending_DoubleAgent'],
	['no_verdict', 'Ending_NoVerdict'],
	// v6
	['wheel_fish_tank', 'Ending_Wheel_FishTank'], ['wheel_cosplayer', 'Ending_Wheel_Cosplayer'],
	['wheel_crypto', 'Ending_Wheel_Crypto'], ['wheel_yoga', 'Ending_Wheel_Yoga'],
	['wheel_drone_swarm', 'Ending_Wheel_DroneSwarm'], ['wheel_bookshop', 'Ending_Wheel_Bookshop'],
	['wheel_garage', 'Ending_Wheel_Garage'], ['wheel_taxi', 'Ending_Wheel_Taxi'],
	['wheel_post_office', 'Ending_Wheel_PostOffice'], ['wheel_bakery', 'Ending_Wheel_Bakery'],
	['wheel_subway', 'Ending_Wheel_Subway'], ['wheel_helpline', 'Ending_Wheel_Helpline'],
	['wheel_lighthouse', 'Ending_Wheel_Lighthouse'], ['wheel_night_owl', 'Ending_Wheel_NightOwl'],
	['wheel_time_keeper', 'Ending_Wheel_TimeKeeper'], ['wheel_cartographer', 'Ending_Wheel_Cartographer'],
	['wheel_beekeeper', 'Ending_Wheel_Beekeeper'], ['wheel_curator', 'Ending_Wheel_Curator'],
	['wheel_translator', 'Ending_Wheel_Translator'], ['wheel_watchman', 'Ending_Wheel_Watchman'],
	['wheel_florist', 'Ending_Wheel_Florist'], ['wheel_mechanic', 'Ending_Wheel_Mechanic'],
	['wheel_astronomer', 'Ending_Wheel_Astronomer'], ['wheel_conductor', 'Ending_Wheel_Conductor'],
	['dark_path', 'Ending_DarkPath'], ['light_path', 'Ending_LightPath'],
	['trickster', 'Ending_Trickster'], ['lonely_monk', 'Ending_LonelyMonk'],
	['puzzle_solver', 'Ending_PuzzleSolver'], ['bug_collector', 'Ending_BugCollector'],
	['lore_master', 'Ending_LoreMaster'], ['no_reset', 'Ending_NoReset'],
	['all_skipped', 'Ending_AllSkipped']
];

const { chromium } = await import ('playwright');
const browser = await chromium.launch ({
	headless: true,
	args: ['--no-sandbox', '--disable-dev-shm-usage'],
	executablePath: '/Users/krestnikov/Library/Caches/ms-playwright/chromium-1208/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing'
});

const ctx = await browser.newContext ({ viewport: { width: 1280, height: 800 } });
const page = await ctx.newPage ();
page.setDefaultTimeout (8000);

const pageErrs = [];
page.on ('pageerror', e => pageErrs.push (e.message));

console.log (`Testing ${ENDINGS.length} endings...`);

// Грузим страницу один раз
await page.goto (`http://localhost:${port}/index.html?tla_runtime_test=1`, { waitUntil: 'domcontentloaded' });
await page.waitForFunction (() => typeof monogatari !== 'undefined' && monogatari.proceed);
await page.waitForFunction (() => {
	const g = document.querySelector ('[data-screen="game"]');
	return g?.classList.contains ('active') || document.querySelector ('[data-screen="main"]')?.classList.contains ('active');
});
await page.evaluate (async () => {
	if (typeof monogatari.startGame === 'function') await monogatari.startGame ();
	else { monogatari.global ('playing', true); if (typeof monogatari.showScreen === 'function') monogatari.showScreen ('game'); }
});
await page.waitForTimeout (300);

const results = [];
let okCount = 0;
const startTime = Date.now ();

for (let i = 0; i < ENDINGS.length; i++) {
	const [key, lbl] = ENDINGS[i];
	const errsBefore = pageErrs.length;
	try {
		// Сбросить tla_endings и сторадж
		await page.evaluate (() => {
			localStorage.removeItem ('tla_endings');
			try {
				monogatari.storage ({ ending_reached: '' });
			} catch {}
			document.querySelectorAll ('choice-container button').forEach (b => b.remove ());
		});

		// Прыжок
		await page.evaluate ((l) => {
			try {
				monogatari.global ('block', false);
				monogatari.global ('_engine_block', false);
				monogatari.global ('playing', true);
				monogatari.state ({ label: l, step: 0 });
			} catch {}
			return monogatari.run ('jump ' + l).catch (() => {});
		}, lbl);

		// Дать сцене стартануть
		await page.waitForTimeout (150);

		// Прокрутить максимум 150 шагов
		for (let s = 0; s < 150; s++) {
			const done = await page.evaluate (() => {
				return !!JSON.parse (localStorage.getItem ('tla_endings') || '{}')[
					(() => {
						const r = monogatari.storage ().ending_reached;
						return r;
					}) ()
				];
			});
			if (done) break;
			await page.evaluate (() => {
				try {
					const btn = document.querySelector ('choice-container button');
					if (btn) btn.click (); else monogatari.proceed ();
				} catch {}
			});
			await page.waitForTimeout (40);
		}

		const result = await page.evaluate (() => ({
			label: monogatari.state ('label'),
			reached: monogatari.storage ().ending_reached,
			tla: JSON.parse (localStorage.getItem ('tla_endings') || '{}')
		}));

		// Достижимость концовки: либо tla_endings[key] выставлено (концовка дошла до Credits),
		// либо storage.ending_reached === key (Function-action концовки отработал — а Credits
		// для длинных сцен может не успеть из-за встроенных waitов).
		const ok = !!result.tla[key] || result.reached === key;
		results.push ({ key, lbl, ok, finalLabel: result.label, reached: result.reached, fullCycle: !!result.tla[key] });
		if (ok) okCount++;
		const tag = ok ? '[32m✓[0m' : '[31m✗[0m';
		const newErrs = pageErrs.slice (errsBefore).filter (e => !/Wait period|Extra condition/.test (e));
		const errSfx = newErrs.length ? ` [errs: ${newErrs[0].slice (0, 60)}]` : '';
		console.log (`${tag} [${i + 1}/${ENDINGS.length}] ${key.padEnd (25)} via ${lbl.padEnd (32)} reached=${result.reached || '-'}${errSfx}`);
	} catch (e) {
		results.push ({ key, lbl, ok: false, error: e.message });
		console.log (`✗ [${i + 1}/${ENDINGS.length}] ${key} THROW ${e.message.slice (0, 100)}`);
	}
}

const elapsed = ((Date.now () - startTime) / 1000).toFixed (1);
console.log (`\n${'='.repeat (60)}`);
const fullCycle = results.filter (r => r.fullCycle).length;
console.log (`Endings reached: ${okCount}/${ENDINGS.length} (ending_reached set).`);
console.log (`Полный цикл до Credits: ${fullCycle}/${ENDINGS.length} (tla_endings записан).`);
console.log (`Время: ${elapsed}s.`);

const failures = results.filter (r => !r.ok);
if (failures.length) {
	console.log (`\nFailures (${failures.length}):`);
	failures.forEach (f => console.log (`  - ${f.key} (jump ${f.lbl}) → final=${f.finalLabel || '?'}, reached=${f.reached || '-'}`));
}

fs.writeFileSync (path.join (__dirname, 'endings-fast-report.json'), JSON.stringify (results, null, 2));
await browser.close ().catch (() => {});
process.exit (okCount === ENDINGS.length ? 0 : 1);

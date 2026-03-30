'use strict';
/* global Monogatari, monogatari */

const { $_ready, $_ } = Monogatari;

// Все 25 концовок для трекера
const ALL_ENDINGS = {
	// ★ Major endings
	'matrix': '★ Контакт',
	'prophet': '★ Пророк',
	'full_circle': '★ Полный круг',
	'lilith_betrayal': '★ Персональный пакет',
	'lilith_conflicted': '★ Перевод',
	'hell_romance': '★ Ад вдвоём',
	'escape_together': '★ Служебный выход',
	'therapist': '★ Терапевт',
	// Regular endings
	'believer': 'Обращённый',
	'pascal': 'Пари Паскаля',
	'theologian': 'Теолог',
	'rebellion': 'Революция',
	'hacker': 'Хакер',
	'democracy': 'Демократия',
	'bar': 'Последний бар',
	'franchise': 'Франшиза',
	'awakening': 'Пробуждение',
	'dev_commentary': 'README.md',
	'nihilist': 'Ничто',
	// Quick endings
	'loophole': 'Лазейка',
	'demon_friend': 'Коллега',
	'glitch': 'Глитч',
	'debate_win': 'Аргумент',
	'speedrun': 'Спидран',
	'escape_caught': 'Пойманы',
	'sisyphus': 'Сизиф',
	'viktor_hack': 'sudo rm pain',
	'viktor_freedom': 'DROP TABLE sinners'
};

// ============================================================
// Route map data: nodes and edges for the game flowchart
// ============================================================
const ROUTE_MAP = {
	groups: [
		{ id: 'prologue', title: 'Пролог', color: '#4488cc' },
		{ id: 'judgment', title: 'Страшный Суд', color: '#ddaa00' },
		{ id: 'hell', title: 'Ад', color: '#cc3333' },
		{ id: 'endings', title: 'Концовки', color: '#44bb44' }
	],
	nodes: [
		{ id: 'Prologue_Morning_Choice', label: 'Утро', group: 'prologue' },
		{ id: 'Prologue_Apartment_Phone', label: 'Телефон', group: 'prologue' },
		{ id: 'Prologue_Mock', label: 'Высмеять', group: 'prologue' },
		{ id: 'Prologue_Ignore', label: 'Промолчать', group: 'prologue' },
		{ id: 'Prologue_Kind', label: 'Поддержать', group: 'prologue' },
		{ id: 'Prologue_Internet', label: 'Reddit', group: 'prologue' },
		{ id: 'Prologue_Debate_Engage', label: 'Дебаты', group: 'prologue' },
		{ id: 'Prologue_Skip_Debate', label: 'Пропустить', group: 'prologue' },
		{ id: 'Prologue_Oversleep', label: 'Проспал', group: 'prologue' },
		{ id: 'Prologue_Jogging', label: 'Пробежка', group: 'prologue' },
		{ id: 'Prologue_Work_Inna', label: 'Офис + Инна', group: 'prologue' },
		{ id: 'Prologue_Work_Inna_Late', label: 'Опоздал + Инна', group: 'prologue' },
		{ id: 'Prologue_Death', label: 'Инфаркт', group: 'prologue' },
		{ id: 'Prologue_Death_Car', label: 'ДТП', group: 'prologue' },
		{ id: 'Prologue_Death_Overwork', label: 'Переработка', group: 'prologue' },
		{ id: 'Prologue_Transition', label: 'Переход', group: 'prologue' },

		{ id: 'Judgment_Arrival', label: 'Прибытие', group: 'judgment' },
		{ id: 'Judgment_VR_Denial', label: 'VR-отрицание', group: 'judgment' },
		{ id: 'Judgment_Panic', label: 'Паника', group: 'judgment' },
		{ id: 'Judgment_Queue', label: 'Очередь', group: 'judgment' },
		{ id: 'Judgment_Audience', label: 'Аудиенция', group: 'judgment' },
		{ id: 'Judgment_Stats_Argument', label: 'Статистика', group: 'judgment' },
		{ id: 'Judgment_Deny', label: 'Отрицание', group: 'judgment' },
		{ id: 'Judgment_Beg', label: 'Мольба', group: 'judgment' },
		{ id: 'Judgment_Sarcasm', label: 'Сарказм', group: 'judgment' },
		{ id: 'Judgment_Review', label: 'Обзор жизни', group: 'judgment' },
		{ id: 'Judgment_Verdict', label: 'Вердикт', group: 'judgment' },

		{ id: 'Hell_Arrival', label: 'Врата ада', group: 'hell' },
		{ id: 'Hell_Bureaucracy', label: 'Бюрократия', group: 'hell' },
		{ id: 'Hell_Lilith_Intro', label: 'Лилит', group: 'hell' },
		{ id: 'Hell_Viktor_Intro', label: 'Виктор', group: 'hell' },
		{ id: 'Hell_Light', label: 'Ад-лайт', group: 'hell' },
		{ id: 'Hell_Standard', label: 'Котлы', group: 'hell' },
		{ id: 'Hell_Personalized', label: 'Персональный', group: 'hell' },
		{ id: 'Hell_Debate_Round_1', label: 'Дебаты 1', group: 'hell' },
		{ id: 'Hell_Exploration', label: 'Исследование', group: 'hell' },
		{ id: 'Hell_Breakdown', label: 'Кризис', group: 'hell' },
		{ id: 'Hell_Lilith_Romance', label: 'Роман', group: 'hell' },
		{ id: 'Hell_Matrix_Realization', label: 'Осознание', group: 'hell' },

		{ id: 'Ending_Loophole', label: 'Лазейка', group: 'endings', ending: 'loophole' },
		{ id: 'Ending_DemonFriend', label: 'Коллега', group: 'endings', ending: 'demon_friend' },
		{ id: 'Ending_Glitch', label: 'Глитч', group: 'endings', ending: 'glitch' },
		{ id: 'Ending_DebateWin', label: 'Аргумент', group: 'endings', ending: 'debate_win' },
		{ id: 'Ending_Believer', label: 'Обращённый', group: 'endings', ending: 'believer' },
		{ id: 'Ending_Pascal', label: 'Пари Паскаля', group: 'endings', ending: 'pascal' },
		{ id: 'Ending_Theologian', label: 'Теолог', group: 'endings', ending: 'theologian' },
		{ id: 'Ending_Rebellion', label: 'Революция', group: 'endings', ending: 'rebellion' },
		{ id: 'Ending_Hacker', label: 'Хакер', group: 'endings', ending: 'hacker' },
		{ id: 'Ending_Democracy', label: 'Демократия', group: 'endings', ending: 'democracy' },
		{ id: 'Ending_Bar', label: 'Бар', group: 'endings', ending: 'bar' },
		{ id: 'Ending_Franchise', label: 'Франшиза', group: 'endings', ending: 'franchise' },
		{ id: 'Ending_Therapist', label: 'Терапевт', group: 'endings', ending: 'therapist' },
		{ id: 'Ending_Matrix', label: 'Контакт', group: 'endings', ending: 'matrix' },
		{ id: 'Ending_Speedrun', label: 'Спидран', group: 'endings', ending: 'speedrun' },
		{ id: 'Ending_Awakening', label: 'Пробуждение', group: 'endings', ending: 'awakening' },
		{ id: 'Ending_DevCommentary', label: 'README', group: 'endings', ending: 'dev_commentary' },
		{ id: 'Ending_Nihilist', label: 'Ничто', group: 'endings', ending: 'nihilist' },
		{ id: 'Ending_Prophet', label: 'Пророк', group: 'endings', ending: 'prophet' },
		{ id: 'Ending_FullCircle', label: 'Полный круг', group: 'endings', ending: 'full_circle' },
		{ id: 'Ending_HellRomance', label: 'Ад вдвоём', group: 'endings', ending: 'hell_romance' },
		{ id: 'Ending_EscapeTogether', label: 'Побег', group: 'endings', ending: 'escape_together' },
		{ id: 'Ending_LilithBetrayal', label: 'Предательство', group: 'endings', ending: 'lilith_betrayal' },
		{ id: 'Ending_LilithConflicted', label: 'Перевод', group: 'endings', ending: 'lilith_conflicted' },
		{ id: 'Ending_EscapeCaught', label: 'Пойманы', group: 'endings', ending: 'escape_caught' },
		{ id: 'Ending_Sisyphus', label: 'Сизиф', group: 'endings', ending: 'sisyphus' },
		{ id: 'Ending_ViktorHack', label: 'sudo rm pain', group: 'endings', ending: 'viktor_hack' },
		{ id: 'Ending_ViktorFreedom', label: 'DROP TABLE', group: 'endings', ending: 'viktor_freedom' }
	],
	edges: [
		['Prologue_Morning_Choice', 'Prologue_Apartment_Phone'],
		['Prologue_Morning_Choice', 'Prologue_Oversleep'],
		['Prologue_Morning_Choice', 'Prologue_Jogging'],
		['Prologue_Apartment_Phone', 'Prologue_Mock'],
		['Prologue_Apartment_Phone', 'Prologue_Ignore'],
		['Prologue_Apartment_Phone', 'Prologue_Kind'],
		['Prologue_Mock', 'Prologue_Internet'],
		['Prologue_Ignore', 'Prologue_Internet'],
		['Prologue_Kind', 'Prologue_Internet'],
		['Prologue_Internet', 'Prologue_Debate_Engage'],
		['Prologue_Internet', 'Prologue_Skip_Debate'],
		['Prologue_Debate_Engage', 'Prologue_Work_Inna'],
		['Prologue_Skip_Debate', 'Prologue_Work_Inna'],
		['Prologue_Oversleep', 'Prologue_Work_Inna_Late'],
		['Prologue_Jogging', 'Prologue_Death_Car'],
		['Prologue_Jogging', 'Prologue_Work_Inna'],
		['Prologue_Work_Inna', 'Prologue_Death'],
		['Prologue_Work_Inna_Late', 'Prologue_Death_Overwork'],
		['Prologue_Work_Inna_Late', 'Prologue_Death'],
		['Prologue_Death', 'Prologue_Transition'],
		['Prologue_Death_Car', 'Prologue_Transition'],
		['Prologue_Death_Overwork', 'Prologue_Transition'],
		['Prologue_Transition', 'Judgment_Arrival'],
		['Judgment_Arrival', 'Judgment_VR_Denial'],
		['Judgment_Arrival', 'Judgment_Queue'],
		['Judgment_Arrival', 'Judgment_Panic'],
		['Judgment_VR_Denial', 'Judgment_Queue'],
		['Judgment_Panic', 'Judgment_Queue'],
		['Judgment_Queue', 'Judgment_Audience'],
		['Judgment_Audience', 'Judgment_Stats_Argument'],
		['Judgment_Audience', 'Judgment_Deny'],
		['Judgment_Audience', 'Judgment_Beg'],
		['Judgment_Audience', 'Judgment_Sarcasm'],
		['Judgment_Stats_Argument', 'Judgment_Review'],
		['Judgment_Deny', 'Judgment_Review'],
		['Judgment_Beg', 'Judgment_Review'],
		['Judgment_Sarcasm', 'Judgment_Review'],
		['Judgment_Review', 'Judgment_Verdict'],
		['Judgment_Verdict', 'Ending_Loophole'],
		['Judgment_Verdict', 'Hell_Arrival'],
		['Hell_Arrival', 'Hell_Bureaucracy'],
		['Hell_Bureaucracy', 'Hell_Lilith_Intro'],
		['Hell_Lilith_Intro', 'Hell_Viktor_Intro'],
		['Hell_Viktor_Intro', 'Hell_Light'],
		['Hell_Viktor_Intro', 'Hell_Standard'],
		['Hell_Viktor_Intro', 'Hell_Personalized'],
		['Hell_Light', 'Hell_Debate_Round_1'],
		['Hell_Standard', 'Hell_Debate_Round_1'],
		['Hell_Personalized', 'Hell_Debate_Round_1'],
		['Hell_Debate_Round_1', 'Hell_Exploration'],
		['Hell_Exploration', 'Hell_Breakdown'],
		['Hell_Bureaucracy', 'Ending_DemonFriend'],
		['Hell_Debate_Round_1', 'Ending_Glitch'],
		['Hell_Debate_Round_1', 'Ending_DebateWin'],
		['Hell_Breakdown', 'Ending_Believer'],
		['Hell_Breakdown', 'Ending_Pascal'],
		['Hell_Breakdown', 'Ending_Theologian'],
		['Hell_Breakdown', 'Ending_Rebellion'],
		['Hell_Breakdown', 'Ending_Hacker'],
		['Hell_Breakdown', 'Ending_Democracy'],
		['Hell_Breakdown', 'Ending_Bar'],
		['Hell_Breakdown', 'Ending_Franchise'],
		['Hell_Breakdown', 'Ending_Therapist'],
		['Hell_Breakdown', 'Hell_Matrix_Realization'],
		['Hell_Breakdown', 'Ending_Nihilist'],
		['Hell_Breakdown', 'Ending_Prophet'],
		['Hell_Breakdown', 'Ending_FullCircle'],
		['Hell_Breakdown', 'Hell_Lilith_Romance'],
		['Hell_Matrix_Realization', 'Ending_Matrix'],
		['Hell_Matrix_Realization', 'Ending_Speedrun'],
		['Hell_Matrix_Realization', 'Ending_Awakening'],
		['Hell_Matrix_Realization', 'Ending_DevCommentary'],
		['Hell_Lilith_Romance', 'Ending_HellRomance'],
		['Hell_Lilith_Romance', 'Ending_EscapeTogether'],
		['Hell_Lilith_Romance', 'Ending_LilithBetrayal'],
		['Hell_Lilith_Romance', 'Ending_LilithConflicted'],
		['Hell_Lilith_Romance', 'Ending_EscapeCaught']
	]
};

// ============================================================
// Seen-text persistence (across all playthroughs)
// ============================================================
var _seenLabels = JSON.parse (localStorage.getItem ('tla_seen_labels') || '{}');

function markLabelVisited (label) {
	if (!label || _seenLabels[label]) return;
	_seenLabels[label] = 1;
	localStorage.setItem ('tla_seen_labels', JSON.stringify (_seenLabels));
}

function isLabelVisited (label) {
	return !!_seenLabels[label];
}

// ============================================================
// Initialization
// ============================================================
$_ready (() => {
	monogatari.init ('#monogatari').then (() => {
		addSkipButton ();
		addRouteMapButton ();
		updateEndingCounter ();
		startLabelTracker ();
		initJustLilithEasterEgg ();
		initPostGlitchEffects ();
		initDevMode ();

		const observer = new MutationObserver (() => {
			updateEndingCounter ();
		});
		const mainScreen = document.querySelector ('[data-screen="main"]');
		if (mainScreen) {
			observer.observe (mainScreen, { attributes: true });
		}
	});
});

// ============================================================
// Label tracker — polls the engine state to record visited labels
// ============================================================
function startLabelTracker () {
	var _lastLabel = '';
	setInterval (function () {
		try {
			var label = monogatari.state ('label');
			if (label && label !== _lastLabel) {
				_lastLabel = label;
				markLabelVisited (label);
			}
		} catch (e) {}
	}, 200);
}

// ============================================================
// Ending counter on main screen
// ============================================================
function updateEndingCounter () {
	const mainScreen = document.querySelector ('[data-screen="main"]');
	if (!mainScreen) return;

	let counter = document.getElementById ('ending-counter');
	if (!counter) {
		counter = document.createElement ('div');
		counter.id = 'ending-counter';
		counter.style.cssText = 'position:absolute;bottom:15px;left:50%;transform:translateX(-50%);' +
			'color:rgba(255,255,255,0.6);font-size:0.85em;font-family:inherit;cursor:pointer;' +
			'transition:color 0.3s;z-index:10;text-align:center;';
		counter.addEventListener ('mouseenter', () => { counter.style.color = '#ff6666'; });
		counter.addEventListener ('mouseleave', () => { counter.style.color = 'rgba(255,255,255,0.6)'; });
		counter.addEventListener ('click', showEndingGallery);
		mainScreen.style.position = 'relative';
		mainScreen.appendChild (counter);
	}

	const endings = JSON.parse (localStorage.getItem ('tla_endings') || '{}');
	const count = Object.keys (endings).length;
	counter.textContent = 'Концовки: ' + count + ' / ' + Object.keys (ALL_ENDINGS).length;
}

function showEndingGallery () {
	const endings = JSON.parse (localStorage.getItem ('tla_endings') || '{}');
	let html = '<div style="max-height:60vh;overflow-y:auto;text-align:left;padding:10px;">';
	html += '<h3 style="text-align:center;margin-bottom:15px;">Коллекция концовок</h3>';

	for (const [key, name] of Object.entries (ALL_ENDINGS)) {
		const found = endings[key];
		if (found) {
			html += '<p style="margin:5px 0;color:#88ff88;">✓ ' + name + '</p>';
		} else {
			html += '<p style="margin:5px 0;color:#666;">? ? ? ? ?</p>';
		}
	}

	html += '</div>';

	monogatari.action ('message').messages ({
		'EndingGallery': {
			title: 'Концовки: ' + Object.keys (endings).length + ' / ' + Object.keys (ALL_ENDINGS).length,
			subtitle: 'Нажмите, чтобы закрыть',
			body: html
		}
	});

	monogatari.run ('show message EndingGallery', false);
}

// ============================================================
// Skip / Fast-forward button
// Uses label-level tracking: a label is "seen" if it was ever
// entered during ANY playthrough (persisted in localStorage).
//
// Strategy: place the button as a fixed-position overlay near
// the bottom bar (Shadow DOM makes appendChild unreliable),
// and use the engine's own monogatari.skip() API to advance.
// A watchdog interval handles "seen" mode stops and acceleration.
// ============================================================
var _skipWatchdog = null;
var _skipMode = 'seen';
var _skipActive = false;

// --- Skip acceleration: bypass wait() and CSS animations ---
var _skipStyleEl = null;
var _origSetTimeout = window.setTimeout.bind (window);

function _enableSkipAcceleration () {
	_skipActive = true;

	// Inject CSS that kills all animations and transitions instantly
	if (!_skipStyleEl) {
		_skipStyleEl = document.createElement ('style');
		_skipStyleEl.id = 'skip-acceleration-css';
		_skipStyleEl.textContent =
			'*, *::before, *::after {' +
			'  animation-duration: 0s !important;' +
			'  animation-delay: 0s !important;' +
			'  transition-duration: 0s !important;' +
			'  transition-delay: 0s !important;' +
			'}';
		document.head.appendChild (_skipStyleEl);
	}

	// Monkey-patch setTimeout: timers ≤ 10s (wait commands,
	// engine transition delays) fire near-instantly during skip
	window.setTimeout = function (fn, delay) {
		if (_skipActive && typeof fn === 'function' && typeof delay === 'number' && delay > 5 && delay <= 10000) {
			return _origSetTimeout (fn, 1);
		}
		return _origSetTimeout.apply (window, arguments);
	};
}

function _disableSkipAcceleration () {
	_skipActive = false;

	if (_skipStyleEl && _skipStyleEl.parentNode) {
		_skipStyleEl.parentNode.removeChild (_skipStyleEl);
		_skipStyleEl = null;
	}

	window.setTimeout = _origSetTimeout;
}

function stopSkip () {
	// Stop engine skip
	try { monogatari.skip (false); } catch (e) {}

	if (_skipWatchdog) {
		clearInterval (_skipWatchdog);
		_skipWatchdog = null;
	}
	_disableSkipAcceleration ();

	var btn = document.getElementById ('skip-btn');
	if (btn) {
		btn.style.opacity = '0.7';
		btn.style.color = '';
		btn.textContent = '⏩';
	}
}

function startSkip () {
	var btn = document.getElementById ('skip-btn');
	if (btn) {
		btn.style.opacity = '1';
		btn.style.color = _skipMode === 'all' ? '#ffaa00' : '#ff6666';
		btn.textContent = _skipMode === 'all' ? '⏭' : '⏩';
	}

	_enableSkipAcceleration ();

	// Use the engine's built-in skip (calls proceed in a loop)
	try { monogatari.skip (true); } catch (e) {}

	// Watchdog: stop at choices, modals, or unseen labels
	_skipWatchdog = setInterval (function () {
		try {
			// Stop at choices
			var choices = document.querySelector ('choice-container');
			if (!choices) choices = document.querySelector ('[data-component="choice-container"]');
			if (choices && choices.children.length > 0) {
				stopSkip ();
				return;
			}
			// Stop at messages (modals)
			var msg = document.querySelector ('[data-component="message-modal"]');
			if (msg && msg.classList.contains ('active')) {
				stopSkip ();
				return;
			}
			// In "seen" mode, stop if current label was never visited
			if (_skipMode === 'seen') {
				var label = monogatari.state ('label');
				if (label && !isLabelVisited (label)) {
					stopSkip ();
					return;
				}
			}
		} catch (e) {
			stopSkip ();
		}
	}, 100);
}

function addSkipButton () {
	// Create button as a fixed overlay — avoids Shadow DOM issues
	var skipBtn = document.createElement ('div');
	skipBtn.id = 'skip-btn';
	skipBtn.textContent = '⏩';
	skipBtn.title = 'Перемотка (двойной клик — переключить режим)';
	skipBtn.style.cssText =
		'position:fixed; bottom:8px; right:8px; z-index:99999;' +
		'cursor:pointer; font-size:1.5em; padding:6px 10px;' +
		'opacity:0.7; user-select:none;' +
		'background:rgba(0,0,0,0.5); border-radius:8px;' +
		'transition:all 0.2s; line-height:1;';
	skipBtn.addEventListener ('mouseenter', function () {
		if (!_skipWatchdog) skipBtn.style.opacity = '1';
	});
	skipBtn.addEventListener ('mouseleave', function () {
		if (!_skipWatchdog) skipBtn.style.opacity = '0.7';
	});

	var _lastClick = 0;
	skipBtn.addEventListener ('click', function (e) {
		e.stopPropagation ();
		e.preventDefault ();
		var now = Date.now ();

		// Double-click: toggle mode
		if (now - _lastClick < 400) {
			_skipMode = _skipMode === 'all' ? 'seen' : 'all';
			_lastClick = 0;
			if (_skipWatchdog) {
				skipBtn.textContent = _skipMode === 'all' ? '⏭' : '⏩';
				skipBtn.style.color = _skipMode === 'all' ? '#ffaa00' : '#ff6666';
			}
			return;
		}
		_lastClick = now;

		if (_skipWatchdog) {
			stopSkip ();
		} else {
			startSkip ();
		}
	});

	document.body.appendChild (skipBtn);

	// Hide button when not on game screen
	setInterval (function () {
		var gameScreen = document.querySelector ('[data-screen="game"]');
		var isVisible = gameScreen && (gameScreen.classList.contains ('active') ||
			getComputedStyle (gameScreen).display !== 'none');
		skipBtn.style.display = isVisible ? '' : 'none';
	}, 500);
}

// ============================================================
// Route Map button and rendering
// ============================================================
function addRouteMapButton () {
	const quickMenu = document.querySelector ('[data-component="quick-menu"]');
	if (!quickMenu) return;

	const mapBtn = document.createElement ('span');
	mapBtn.textContent = '🗺';
	mapBtn.title = 'Карта рутов';
	mapBtn.style.cssText = 'cursor:pointer;font-size:1.1em;padding:0 8px;opacity:0.6;transition:all 0.2s;user-select:none;';
	mapBtn.id = 'route-map-btn';

	mapBtn.addEventListener ('click', function (e) {
		e.stopPropagation ();
		showRouteMap ();
	});

	quickMenu.appendChild (mapBtn);

	// Also add to main menu
	var mainScreen = document.querySelector ('[data-screen="main"]');
	if (mainScreen) {
		var mainMapBtn = document.createElement ('button');
		mainMapBtn.textContent = '🗺 Карта рутов';
		mainMapBtn.id = 'main-route-map-btn';
		mainMapBtn.addEventListener ('click', showRouteMap);
		var menuBtns = mainScreen.querySelector ('[data-action-list="in-menu"]') || mainScreen.querySelector ('div');
		if (menuBtns) {
			menuBtns.appendChild (mainMapBtn);
		}
	}
}

function showRouteMap () {
	var overlay = document.getElementById ('route-map-overlay');
	if (overlay) {
		overlay.remove ();
		return;
	}

	overlay = document.createElement ('div');
	overlay.id = 'route-map-overlay';

	var endings = JSON.parse (localStorage.getItem ('tla_endings') || '{}');

	var html = '<div class="route-map-header">';
	html += '<h2>Карта рутов</h2>';
	html += '<span class="route-map-close" id="route-map-close">&times;</span>';
	html += '</div>';
	html += '<div class="route-map-legend">';
	ROUTE_MAP.groups.forEach (function (g) {
		html += '<span class="route-map-legend-item"><span class="route-map-dot" style="background:' + g.color + '"></span>' + g.title + '</span>';
	});
	html += '<span class="route-map-legend-item"><span class="route-map-dot" style="background:#333;border:1px dashed #555;"></span>Не открыто</span>';
	html += '</div>';
	html += '<div class="route-map-scroll" id="route-map-scroll">';
	html += renderRouteMapSVG (endings);
	html += '</div>';

	overlay.innerHTML = html;
	document.body.appendChild (overlay);

	document.getElementById ('route-map-close').addEventListener ('click', function () {
		overlay.remove ();
	});
	overlay.addEventListener ('click', function (e) {
		if (e.target === overlay) overlay.remove ();
	});
}

function renderRouteMapSVG (endings) {
	var nodes = ROUTE_MAP.nodes;
	var edges = ROUTE_MAP.edges;
	var groupMap = {};
	ROUTE_MAP.groups.forEach (function (g) { groupMap[g.id] = g; });

	// Layout: assign positions
	var nodePos = {};
	var groupRows = { prologue: [], judgment: [], hell: [], endings: [] };
	nodes.forEach (function (n) {
		if (groupRows[n.group]) groupRows[n.group].push (n);
	});

	var Y_OFFSETS = { prologue: 0, judgment: 1, hell: 2, endings: 3 };
	var ROW_HEIGHT = 100;
	var COL_WIDTH = 110;
	var PAD_X = 60;
	var PAD_Y = 50;

	Object.keys (groupRows).forEach (function (gid) {
		var row = groupRows[gid];
		var y = Y_OFFSETS[gid] * ROW_HEIGHT + PAD_Y;
		var totalWidth = row.length * COL_WIDTH;
		var startX = PAD_X;
		row.forEach (function (n, i) {
			nodePos[n.id] = { x: startX + i * COL_WIDTH + COL_WIDTH / 2, y: y + ROW_HEIGHT / 2 };
		});
	});

	var svgW = Math.max (800, PAD_X * 2 + Math.max.apply (null, Object.keys (groupRows).map (function (k) { return groupRows[k].length * COL_WIDTH; })));
	var svgH = PAD_Y * 2 + 4 * ROW_HEIGHT;

	var svg = '<svg viewBox="0 0 ' + svgW + ' ' + svgH + '" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;min-width:700px;">';

	// Group backgrounds
	Object.keys (groupRows).forEach (function (gid) {
		var g = groupMap[gid];
		var y = Y_OFFSETS[gid] * ROW_HEIGHT + PAD_Y;
		var row = groupRows[gid];
		if (!row.length) return;
		var w = row.length * COL_WIDTH + 20;
		svg += '<rect x="' + (PAD_X - 10) + '" y="' + (y - 5) + '" width="' + w + '" height="' + (ROW_HEIGHT - 5) + '" rx="8" fill="' + g.color + '" opacity="0.06" />';
		svg += '<text x="' + (PAD_X - 5) + '" y="' + (y + 12) + '" fill="' + g.color + '" font-size="11" opacity="0.5" font-family="PT Serif,serif">' + g.title + '</text>';
	});

	// Edges
	edges.forEach (function (e) {
		var from = nodePos[e[0]];
		var to = nodePos[e[1]];
		if (!from || !to) return;
		var visited = isLabelVisited (e[0]) && isLabelVisited (e[1]);
		var color = visited ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.06)';
		var width = visited ? '1.5' : '0.8';
		// Curved line for clarity
		var midY = (from.y + to.y) / 2;
		svg += '<path d="M' + from.x + ',' + from.y + ' Q' + from.x + ',' + midY + ' ' + to.x + ',' + to.y + '" fill="none" stroke="' + color + '" stroke-width="' + width + '"/>';
	});

	// Nodes
	nodes.forEach (function (n) {
		var pos = nodePos[n.id];
		if (!pos) return;
		var visited = isLabelVisited (n.id);
		var isEnding = !!n.ending;
		var endingUnlocked = isEnding && endings[n.ending];
		var g = groupMap[n.group] || { color: '#666' };

		var r = isEnding ? 18 : 14;
		var fillColor, strokeColor, textColor, textOpacity, labelText;

		if (visited || endingUnlocked) {
			fillColor = g.color;
			strokeColor = g.color;
			textColor = '#fff';
			textOpacity = '1';
			labelText = n.label;
		} else {
			fillColor = '#1a1a1a';
			strokeColor = '#444';
			textColor = '#555';
			textOpacity = '0.5';
			labelText = isEnding ? '???' : n.label;
		}

		if (isEnding && endingUnlocked) {
			svg += '<circle cx="' + pos.x + '" cy="' + pos.y + '" r="' + (r + 3) + '" fill="none" stroke="' + g.color + '" stroke-width="1" opacity="0.3"/>';
		}

		svg += '<circle cx="' + pos.x + '" cy="' + pos.y + '" r="' + r + '" fill="' + fillColor + '" stroke="' + strokeColor + '" stroke-width="' + (visited ? '2' : '1') + '" ' + (visited ? '' : 'stroke-dasharray="3,3"') + ' opacity="' + (visited || endingUnlocked ? '0.9' : '0.4') + '"/>';

		// Text label (truncated)
		var displayLabel = labelText.length > 10 ? labelText.substring (0, 9) + '…' : labelText;
		svg += '<text x="' + pos.x + '" y="' + (pos.y + 4) + '" text-anchor="middle" fill="' + textColor + '" font-size="' + (isEnding ? '8' : '9') + '" font-family="PT Serif,serif" opacity="' + textOpacity + '">' + displayLabel + '</text>';

		if (isEnding && endingUnlocked) {
			svg += '<text x="' + pos.x + '" y="' + (pos.y - r - 5) + '" text-anchor="middle" fill="' + g.color + '" font-size="7" font-family="PT Serif,serif">★</text>';
		}
	});

	svg += '</svg>';
	return svg;
}

// ============================================================
// Post-Glitch ending: UI glitches persist on main menu (DDLC-style)
// ============================================================
function initPostGlitchEffects () {
	var endings = JSON.parse (localStorage.getItem ('tla_endings') || '{}');
	if (!endings['glitch']) return;

	setInterval (function () {
		var mainScreen = document.querySelector ('[data-screen="main"]');
		if (!mainScreen || !mainScreen.classList.contains ('active')) return;
		if (Math.random () > 0.05) return;

		mainScreen.style.filter = 'hue-rotate(' + (Math.random () * 30 - 15) + 'deg) saturate(' + (0.8 + Math.random () * 0.4) + ')';
		mainScreen.style.transform = 'translateX(' + (Math.random () * 4 - 2) + 'px)';
		setTimeout (function () {
			mainScreen.style.filter = '';
			mainScreen.style.transform = '';
		}, 150);
	}, 3000);
}

// ============================================================
// Easter egg: "Just Lilith" flashes on main menu
// Triggers if wtf_level was ever maxed (stored across sessions)
// ============================================================
function initJustLilithEasterEgg () {
	// Check if any ending with high lilith_interest was reached
	var endings = JSON.parse (localStorage.getItem ('tla_endings') || '{}');
	var lilithEndings = ['hell_romance', 'escape_together', 'lilith_betrayal', 'lilith_conflicted'];
	var hasLilith = lilithEndings.some (function (e) { return endings[e]; });
	if (!hasLilith) return;

	// Periodically flash "Just Lilith" on main screen
	setInterval (function () {
		var mainScreen = document.querySelector ('[data-screen="main"]');
		if (!mainScreen || !mainScreen.classList.contains ('active')) return;
		if (Math.random () > 0.08) return; // ~8% chance each tick

		var flash = document.createElement ('div');
		flash.textContent = 'Just Lilith';
		flash.style.cssText =
			'position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);' +
			'color:#ff4444;font-family:"PT Serif",serif;font-size:2.5em;font-weight:700;' +
			'text-shadow:0 0 20px rgba(255,0,0,0.8);z-index:999;pointer-events:none;' +
			'opacity:0.9;';
		mainScreen.appendChild (flash);

		setTimeout (function () {
			flash.style.opacity = '0';
			flash.style.transition = 'opacity 0.15s';
			setTimeout (function () { flash.remove (); }, 200);
		}, 300);
	}, 5000);
}

// ============================================================
// Dev mode: show live stats overlay during gameplay
// Toggle with Ctrl+Shift+D (or Cmd+Shift+D on Mac)
// ============================================================
var _devOverlay = null;
var _devInterval = null;

function initDevMode () {
	document.addEventListener ('keydown', function (e) {
		if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'D') {
			e.preventDefault ();
			toggleDevMode ();
		}
	});
}

function toggleDevMode () {
	if (_devOverlay) {
		_devOverlay.remove ();
		_devOverlay = null;
		if (_devInterval) { clearInterval (_devInterval); _devInterval = null; }
		return;
	}

	_devOverlay = document.createElement ('div');
	_devOverlay.id = 'dev-stats-overlay';
	_devOverlay.style.cssText =
		'position:fixed;top:10px;left:10px;z-index:99999;' +
		'background:rgba(0,0,0,0.85);color:#0f0;font-family:monospace;font-size:11px;' +
		'padding:10px 14px;border-radius:6px;border:1px solid #333;' +
		'pointer-events:none;max-width:280px;line-height:1.5;';
	document.body.appendChild (_devOverlay);

	function updateStats () {
		if (!_devOverlay) return;
		try {
			var s = monogatari.storage ();
			var label = monogatari.state ('label') || '—';
			var step = monogatari.state ('step') || 0;

			_devOverlay.innerHTML =
				'<div style="color:#ff6;margin-bottom:4px;font-weight:bold;">DEV MODE</div>' +
				'<div style="color:#888;">Label: <span style="color:#fff;">' + label + '</span> [' + step + ']</div>' +
				'<div style="margin-top:6px;">' +
				stat ('wtf', s.wtf_level) +
				stat ('denial', s.denial_count) +
				stat ('cruelty', s.cruelty_score) +
				stat ('argument', s.argument_quality) +
				stat ('empathy', s.empathy_shown) +
				stat ('humor', s.humor_used) +
				stat ('rebellion', s.rebellion_score) +
				stat ('acceptance', s.acceptance_score) +
				'</div>' +
				'<div style="margin-top:6px;border-top:1px solid #333;padding-top:4px;">' +
				stat ('lilith', s.lilith_interest) +
				stat ('viktor', s.viktor_friendship) +
				stat ('matrix', s.matrix_suspicion) +
				stat ('demon', s.demon_friendship) +
				stat ('inna', s.inna_interest) +
				'</div>' +
				'<div style="margin-top:4px;color:#666;">verdict: ' + (s.judgment_verdict || '—') + '</div>';
		} catch (e) {
			_devOverlay.innerHTML = '<div style="color:#f66;">No active game</div>';
		}
	}

	function stat (name, val) {
		var color = val > 0 ? '#0f0' : val < 0 ? '#f44' : '#666';
		return '<div>' + name + ': <span style="color:' + color + ';">' + val + '</span></div>';
	}

	updateStats ();
	_devInterval = setInterval (updateStats, 500);
}

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
	'escape_caught': 'Пойманы'
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
		{ id: 'Prologue_Apartment', label: 'Утро', group: 'prologue' },
		{ id: 'Prologue_Mock', label: 'Высмеять', group: 'prologue' },
		{ id: 'Prologue_Ignore', label: 'Промолчать', group: 'prologue' },
		{ id: 'Prologue_Kind', label: 'Поддержать', group: 'prologue' },
		{ id: 'Prologue_Internet', label: 'Reddit', group: 'prologue' },
		{ id: 'Prologue_Debate_Engage', label: 'Дебаты', group: 'prologue' },
		{ id: 'Prologue_Skip_Debate', label: 'Пропустить', group: 'prologue' },
		{ id: 'Prologue_Work', label: 'Работа', group: 'prologue' },
		{ id: 'Prologue_Death', label: 'Смерть', group: 'prologue' },
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
		{ id: 'Ending_EscapeCaught', label: 'Пойманы', group: 'endings', ending: 'escape_caught' }
	],
	edges: [
		['Prologue_Apartment', 'Prologue_Mock'],
		['Prologue_Apartment', 'Prologue_Ignore'],
		['Prologue_Apartment', 'Prologue_Kind'],
		['Prologue_Mock', 'Prologue_Internet'],
		['Prologue_Ignore', 'Prologue_Internet'],
		['Prologue_Kind', 'Prologue_Internet'],
		['Prologue_Internet', 'Prologue_Debate_Engage'],
		['Prologue_Internet', 'Prologue_Skip_Debate'],
		['Prologue_Debate_Engage', 'Prologue_Work'],
		['Prologue_Skip_Debate', 'Prologue_Work'],
		['Prologue_Work', 'Prologue_Death'],
		['Prologue_Death', 'Prologue_Transition'],
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
// ============================================================
var _skipInterval = null;
var _skipMode = 'seen';

function stopSkip () {
	if (_skipInterval) {
		clearInterval (_skipInterval);
		_skipInterval = null;
	}
	var btn = document.getElementById ('skip-btn');
	if (btn) {
		btn.style.opacity = '0.6';
		btn.style.color = '';
		btn.textContent = '⏩';
	}
}

function addSkipButton () {
	const quickMenu = document.querySelector ('[data-component="quick-menu"]');
	if (!quickMenu) return;

	const skipBtn = document.createElement ('span');
	skipBtn.textContent = '⏩';
	skipBtn.title = 'Перемотка прочитанного';
	skipBtn.style.cssText = 'cursor:pointer;font-size:1.2em;padding:0 8px;opacity:0.6;transition:all 0.2s;user-select:none;';
	skipBtn.id = 'skip-btn';

	var _lastClick = 0;
	skipBtn.addEventListener ('click', function (e) {
		e.stopPropagation ();
		var now = Date.now ();
		if (now - _lastClick < 350) {
			_skipMode = _skipMode === 'all' ? 'seen' : 'all';
			_lastClick = 0;
			if (_skipInterval) {
				skipBtn.textContent = _skipMode === 'all' ? '⏭' : '⏩';
				skipBtn.style.color = _skipMode === 'all' ? '#ffaa00' : '#ff6666';
			}
			return;
		}
		_lastClick = now;

		if (_skipInterval) {
			stopSkip ();
		} else {
			skipBtn.style.opacity = '1';
			skipBtn.style.color = _skipMode === 'all' ? '#ffaa00' : '#ff6666';
			skipBtn.textContent = _skipMode === 'all' ? '⏭' : '⏩';

			_skipInterval = setInterval (function () {
				try {
					var gameScreen = document.querySelector ('[data-screen="game"]');
					if (!gameScreen || !gameScreen.classList.contains ('active') && gameScreen.style.display === 'none') {
						stopSkip ();
						return;
					}
					// Stop at choices
					var choices = document.querySelector ('[data-component="choice-container"]');
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
					// Advance the game by clicking on game screen
					gameScreen.click ();
				} catch (e) {
					stopSkip ();
				}
			}, 50);
		}
	});

	quickMenu.appendChild (skipBtn);
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

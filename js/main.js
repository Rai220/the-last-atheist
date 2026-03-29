'use strict';
/* global Monogatari, monogatari */

const { $_ready, $_ } = Monogatari;

// 1. Outside $_ready:

// monogatari.debug.level(5);

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

$_ready (() => {
	// 2. Inside $_ready:

	monogatari.init ('#monogatari').then (() => {
		// 3. After init:

		// Добавляем кнопку Skip в quick menu
		addSkipButton ();

		// Добавляем счётчик концовок на главный экран
		updateEndingCounter ();

		// Обновляем счётчик при возврате на главный экран
		const observer = new MutationObserver (() => {
			updateEndingCounter ();
		});
		const mainScreen = document.querySelector ('[data-screen="main"]');
		if (mainScreen) {
			observer.observe (mainScreen, { attributes: true });
		}
	});
});

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

var _skipInterval = null;
var _seenTextKeys = JSON.parse (localStorage.getItem ('tla_seen_text') || '{}');
var _skipMode = 'seen'; // 'seen' = skip only read text, 'all' = skip everything

function markTextSeen (label, index) {
	var key = label + ':' + index;
	_seenTextKeys[key] = 1;
	if (Object.keys (_seenTextKeys).length % 20 === 0) {
		localStorage.setItem ('tla_seen_text', JSON.stringify (_seenTextKeys));
	}
}

function isTextSeen (label, index) {
	return !!_seenTextKeys[label + ':' + index];
}

function saveSeenText () {
	localStorage.setItem ('tla_seen_text', JSON.stringify (_seenTextKeys));
}

function addSkipButton () {
	const quickMenu = document.querySelector ('[data-component="quick-menu"]');
	if (!quickMenu) return;

	const skipBtn = document.createElement ('span');
	skipBtn.textContent = '⏩';
	skipBtn.title = 'Перемотка прочитанного (клик: вкл/выкл, двойной клик: пропускать всё)';
	skipBtn.style.cssText = 'cursor:pointer;font-size:1.2em;padding:0 8px;opacity:0.6;transition:all 0.2s;';
	skipBtn.id = 'skip-btn';

	var _lastClick = 0;
	skipBtn.addEventListener ('click', function () {
		var now = Date.now ();
		if (now - _lastClick < 400) {
			_skipMode = _skipMode === 'all' ? 'seen' : 'all';
			skipBtn.style.color = _skipMode === 'all' ? '#ffaa00' : '#ff6666';
			skipBtn.title = _skipMode === 'all' ? 'Перемотка ВСЕГО текста (двойной клик: только прочитанного)' : 'Перемотка прочитанного (двойной клик: пропускать всё)';
			_lastClick = 0;
			return;
		}
		_lastClick = now;

		if (_skipInterval) {
			clearInterval (_skipInterval);
			_skipInterval = null;
			skipBtn.style.opacity = '0.6';
			skipBtn.style.color = '';
			saveSeenText ();
		} else {
			skipBtn.style.opacity = '1';
			skipBtn.style.color = _skipMode === 'all' ? '#ffaa00' : '#ff6666';
			_skipInterval = setInterval (function () {
				try {
					var gameScreen = document.querySelector ('[data-screen="game"]');
					if (!gameScreen || gameScreen.style.display === 'none') {
						clearInterval (_skipInterval);
						_skipInterval = null;
						skipBtn.style.opacity = '0.6';
						skipBtn.style.color = '';
						saveSeenText ();
						return;
					}
					var choices = document.querySelector ('[data-component="choice-container"]');
					if (choices && choices.childElementCount > 0) {
						clearInterval (_skipInterval);
						_skipInterval = null;
						skipBtn.style.opacity = '0.6';
						skipBtn.style.color = '';
						saveSeenText ();
						return;
					}
					if (_skipMode === 'seen') {
						var state = monogatari.state ('step');
						var label = monogatari.state ('label');
						if (!isTextSeen (label, state)) {
							clearInterval (_skipInterval);
							_skipInterval = null;
							skipBtn.style.opacity = '0.6';
							skipBtn.style.color = '';
							saveSeenText ();
							return;
						}
					}
					gameScreen.click ();
				} catch (e) {}
			}, 60);
		}
	});

	quickMenu.appendChild (skipBtn);

	// Track seen text on each step
	var _observer = new MutationObserver (function () {
		try {
			var label = monogatari.state ('label');
			var step = monogatari.state ('step');
			if (label && typeof step === 'number') {
				markTextSeen (label, step);
			}
		} catch (e) {}
	});
	var sayEl = document.querySelector ('[data-ui="say"]');
	if (sayEl) {
		_observer.observe (sayEl, { childList: true, characterData: true, subtree: true });
	}

	window.addEventListener ('beforeunload', saveSeenText);
}

'use strict';
/* global Monogatari, monogatari */

const { $_ready, $_ } = Monogatari;

// 1. Outside $_ready:

// monogatari.debug.level(5);

// Все 24 концовки для трекера
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

function addSkipButton () {
	const quickMenu = document.querySelector ('[data-component="quick-menu"]');
	if (!quickMenu) return;

	const skipBtn = document.createElement ('span');
	skipBtn.textContent = '⏩';
	skipBtn.title = 'Быстрая перемотка';
	skipBtn.style.cssText = 'cursor:pointer;font-size:1.2em;padding:0 8px;opacity:0.6;';
	skipBtn.id = 'skip-btn';

	skipBtn.addEventListener ('click', function () {
		if (_skipInterval) {
			// Остановить
			clearInterval (_skipInterval);
			_skipInterval = null;
			skipBtn.style.opacity = '0.6';
			skipBtn.style.color = '';
		} else {
			// Запустить — кликаем по game screen каждые 80ms
			skipBtn.style.opacity = '1';
			skipBtn.style.color = '#ff6666';
			_skipInterval = setInterval (function () {
				try {
					// Находим game screen и эмулируем клик
					var gameScreen = document.querySelector ('[data-screen="game"]');
					if (!gameScreen || gameScreen.style.display === 'none') {
						// Игра не на экране — остановить
						clearInterval (_skipInterval);
						_skipInterval = null;
						skipBtn.style.opacity = '0.6';
						skipBtn.style.color = '';
						return;
					}
					// Проверяем, нет ли выбора на экране — если есть, остановиться
					var choices = document.querySelector ('[data-component="choice-container"]');
					if (choices && choices.childElementCount > 0) {
						clearInterval (_skipInterval);
						_skipInterval = null;
						skipBtn.style.opacity = '0.6';
						skipBtn.style.color = '';
						return;
					}
					// Клик для продвижения
					gameScreen.click ();
				} catch (e) {}
			}, 80);
		}
	});

	quickMenu.appendChild (skipBtn);
}

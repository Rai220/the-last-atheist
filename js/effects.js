/* global monogatari */

/**
 * Вспомогательные функции для визуальных эффектов
 */

// Тряска экрана
function screenShake (duration = 500) {
	const el = document.querySelector ('[data-screen="game"]');
	if (!el) return;
	el.classList.add ('shake');
	setTimeout (() => el.classList.remove ('shake'), duration);
}

// Глитч-эффект
function screenGlitch (duration = 800) {
	const el = document.querySelector ('[data-screen="game"]');
	if (!el) return;
	el.classList.add ('glitch');
	setTimeout (() => el.classList.remove ('glitch'), duration);
}

// Красная виньетка (ад)
function hellVignette (enable = true) {
	const el = document.querySelector ('[data-screen="game"]');
	if (!el) return;
	if (enable) {
		el.classList.add ('hell-vignette');
	} else {
		el.classList.remove ('hell-vignette');
	}
}

// Эффект «плывущий текст» при панике
function panicText (enable = true) {
	const el = document.querySelector ('text-box');
	if (!el) return;
	if (enable) {
		el.classList.add ('panic-text');
	} else {
		el.classList.remove ('panic-text');
	}
}

// Обновление WTF-метра
function updateWtfMeter (value) {
	const fill = document.getElementById ('wtf-fill');
	const meter = document.getElementById ('wtf-meter');
	if (!fill || !meter) return;

	fill.style.width = value + '%';

	// Кратко показать метр
	meter.classList.add ('wtf-flash');
	setTimeout (() => meter.classList.remove ('wtf-flash'), 1500);
}

// Применить визуальные эффекты в зависимости от уровня WTF
function applyWtfEffects (wtfLevel) {
	if (wtfLevel >= 70) {
		screenGlitch (400);
	} else if (wtfLevel >= 50) {
		screenShake (300);
	}
	updateWtfMeter (wtfLevel);
}

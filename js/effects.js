/* global monogatari */

/**
 * Визуальные эффекты для «Последний Атеист»
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

// Эффект сердцебиения (для сцены смерти)
function heartbeatEffect (enable = true) {
	const el = document.querySelector ('[data-screen="game"]');
	if (!el) return;
	if (enable) {
		el.classList.add ('heartbeat');
	} else {
		el.classList.remove ('heartbeat');
	}
}

// Медленное затухание (для сцены смерти)
function slowBurnEffect (enable = true) {
	const el = document.querySelector ('[data-screen="game"]');
	if (!el) return;
	if (enable) {
		el.classList.add ('slow-burn');
	} else {
		el.classList.remove ('slow-burn');
	}
}

// Статический шум (для глитч-моментов)
function staticNoiseEffect (enable = true) {
	const el = document.querySelector ('[data-screen="game"]');
	if (!el) return;
	if (enable) {
		el.classList.add ('static-noise');
	} else {
		el.classList.remove ('static-noise');
	}
}

// Божественный свет
function divineGlow (enable = true) {
	const el = document.querySelector ('[data-screen="game"]');
	if (!el) return;
	if (enable) {
		el.classList.add ('divine-glow');
	} else {
		el.classList.remove ('divine-glow');
	}
}

// Обновление WTF-метра
function updateWtfMeter (value) {
	const fill = document.getElementById ('wtf-fill');
	const meter = document.getElementById ('wtf-meter');
	if (!fill || !meter) return;

	fill.style.width = Math.min (100, value) + '%';

	if (value >= 80) {
		fill.style.background = 'linear-gradient(90deg, #ff3333, #ff0000, #880000)';
		fill.style.boxShadow = '0 0 12px rgba(255, 0, 0, 0.8)';
	} else if (value >= 50) {
		fill.style.background = 'linear-gradient(90deg, #ff6644, #ff3333, #cc0000)';
		fill.style.boxShadow = '0 0 8px rgba(255, 50, 50, 0.5)';
	}

	meter.classList.add ('wtf-flash');
	setTimeout (() => meter.classList.remove ('wtf-flash'), 2000);
}

// Применить визуальные эффекты в зависимости от уровня WTF
function applyWtfEffects (wtfLevel) {
	if (wtfLevel >= 80) {
		screenGlitch (600);
		staticNoiseEffect (true);
		setTimeout (() => staticNoiseEffect (false), 2000);
	} else if (wtfLevel >= 60) {
		screenGlitch (400);
	} else if (wtfLevel >= 40) {
		screenShake (300);
	}
	updateWtfMeter (wtfLevel);
}

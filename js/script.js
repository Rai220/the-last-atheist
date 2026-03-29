/* global monogatari */

// Сообщения
monogatari.action ('message').messages ({
	'Help': {
		title: 'Управление',
		subtitle: 'Как играть',
		body: `
			<p>Кликайте или нажимайте пробел, чтобы продвигать текст.</p>
			<p>Делайте выборы — они влияют на сюжет и концовку.</p>
			<p>Сохраняйтесь через меню внизу экрана.</p>
		`
	}
});

// Уведомления
monogatari.action ('notification').notifications ({
	'Welcome': {
		title: 'Последний Атеист',
		body: 'Визуальная новелла с чёрным юмором',
		icon: ''
	}
});

// Particles
monogatari.action ('particles').particles ({

});

// Canvas
monogatari.action ('canvas').objects ({

});

// Титры
monogatari.configuration ('credits', {
	'Автор': {
	},
	'Движок': {
		'Monogatari': ''
	}
});

// Галерея
monogatari.assets ('gallery', {

});

// Точка входа
monogatari.script ({
	'Start': [
		'show scene #1a1a2e with fadeIn',
		'Последний Атеист. Визуальная новелла.',
		'jump Prologue_Apartment'
	]
});

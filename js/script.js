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
			<p>В игре 25 концовок.</p>
			<p><b>⏩ Перемотка</b> — пропускает только <i>уже прочитанный</i> текст.</p>
			<p><b>← Назад</b> — возвращает к предыдущей реплике.</p>
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
monogatari.action ('particles').particles ({});

// Canvas
monogatari.action ('canvas').objects ({});

// Титры
monogatari.configuration ('credits', {
	'Автор': {},
	'Движок': { 'Monogatari': '' }
});

// Галерея
monogatari.assets ('gallery', {});

// Заставка
monogatari.script ({
	'_SplashScreen': [
		'show scene menu_bg with fadeIn',
		'wait 1500',
		'centered ПОСЛЕДНИЙ АТЕИСТ',
		'wait 1000',
		'centered Визуальная новелла с чёрным юмором',
		'wait 1000',
		'centered Атеист умирает. И это только начало.',
		'wait 2000',
		'end'
	],

	'Start': [
		'show scene apartment with fadeIn',
		'jump Prologue_Apartment'
	]
});

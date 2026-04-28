/* global monogatari */

function resetStoryStateForNewGame (game) {
	var current = game.storage ();
	game.storage ({
		player: current.player || { name: '' },
		wtf_level: 0,
		denial_count: 0,
		cruelty_score: 0,
		argument_quality: 0,
		empathy_shown: 0,
		humor_used: 0,
		rebellion_score: 0,
		acceptance_score: 0,
		life_max: 5,
		life_current: 5,
		prologue_debate_won: false,
		prologue_was_kind: false,
		sergey_private_call: false,
		mother_called: false,
		mother_promise: false,
		mother_lied: false,
		pattern_journal: false,
		route_deviation: false,
		death_type: 'heart_attack',
		death_flavor: '',
		morning_choice: '',
		prologue_personality: '',
		alice_rapport: 0,
		alice_encountered: false,
		alice_hell_met: false,
		inna_met: false,
		inna_interest: 0,
		judgment_tried_vr: false,
		judgment_argued_stats: false,
		judgment_begged: false,
		asked_true_judge: false,
		judgment_verdict: 'standard',
		met_other_atheists: false,
		started_rebellion: false,
		found_bar_location: false,
		archive_touched: false,
		oleg_consulted: false,
		debate_cycle: 0,
		demon_friendship: 0,
		lilith_interest: 0,
		lilith_met: false,
		viktor_friendship: 0,
		viktor_met: false,
		matrix_suspicion: 0,
		noticed_patterns: false,
		debate_strategy: '',
		seen_inna_parallels: false,
		lilith_trust: 0,
		pigidij_pulled: false,
		ending_reached: '',
		qte_escapes: 0
	});
}

// Сообщения
monogatari.action ('message').messages ({
	'Help': {
		title: 'Управление',
		subtitle: 'Как играть',
		body: `
			<p>Кликайте или нажимайте пробел, чтобы продвигать текст.</p>
			<p>Делайте выборы — они влияют на сюжет и концовку.</p>
			<p>Сохраняйтесь через меню внизу экрана.</p>
			<p>В игре 40 концовок.</p>
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
		{
			'Function': {
				'Apply': function () {
					resetStoryStateForNewGame (this);
				},
				'Revert': function () {}
			}
		},
		'jump Prologue_Morning_Choice'
	]
});

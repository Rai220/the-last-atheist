/* global monogatari */

monogatari.script ({

	// ==========================================
	// СТРАШНЫЙ СУД: Прибытие
	// ==========================================
	'Judgment_Arrival': [
		'show scene judgment_hall with fadeIn',
		'show character mc shock at center',

		'Зал. Нет — Зал с большой буквы.',
		'Потолок — если он есть — теряется где-то в облаках. Буквально в облаках.',
		'Колонны из белого камня, испещрённые символами всех религий мира.',
		'Ангелы. Настоящие, мать их, ангелы. С крыльями. С мечами. С выражением лица уставших охранников в «Ашане».',

		// 'play sound crowd_murmur with loop',

		'mc (Так. Спокойно. Это DMT. Или кома. Или очень, очень хороший VR.)',
		'mc (Кто-то подключил мне VR-шлем в реанимации. Точно. Это объясняет всё.)',

		{
			'Choice': {
				'Dialog': 'mc (Ладно, допустим. Что делать?)',
				'vr': {
					'Text': '«Эй! Снимите с меня этот VR-шлем!»',
					'Do': 'jump Judgment_VR_Denial',
					'onChosen': function () {
						const s = this.storage ();
						this.storage ({
							wtf_level: Math.min (100, s.wtf_level + 15),
							denial_count: s.denial_count + 1,
							judgment_tried_vr: true
						});
					}
				},
				'queue': {
					'Text': 'Молча встать в очередь',
					'Do': 'jump Judgment_Queue',
					'onChosen': function () {
						const s = this.storage ();
						this.storage ({
							acceptance_score: s.acceptance_score + 1
						});
					}
				},
				'panic': {
					'Text': '(Паника)',
					'Do': 'jump Judgment_Panic',
					'onChosen': function () {
						const s = this.storage ();
						this.storage ({
							wtf_level: Math.min (100, s.wtf_level + 5)
						});
					}
				}
			}
		}
	],

	// --- VR-отрицание ---
	'Judgment_VR_Denial': [
		'show character mc angry at center',
		'mc ЭЙ! Кто тут главный?! Это незаконный эксперимент! У меня права!',

		'Никто не обращает внимания. Очередь движется. Ангел-охранник косится.',

		'show character angel bored at left with fadeIn',
		'angel Ещё один.',
		'angel Сэр, встаньте в очередь. Номер 7 394 028 417.',
		'mc Какой, к чёрту, номер?! Я требую адвоката!',
		'angel Адвокатов здесь нет. Есть Защитник, но он занят. Встаньте в очередь.',

		{
			'Function': {
				'Apply': function () {
					applyWtfEffects (this.storage ().wtf_level);
				},
				'Revert': function () {}
			}
		},

		'hide character angel with fadeOut',
		'jump Judgment_Queue'
	],

	// --- Паника ---
	'Judgment_Panic': [
		'show character mc shock at center',

		{
			'Function': {
				'Apply': function () {
					screenShake (400);
					panicText (true);
				},
				'Revert': function () {
					panicText (false);
				}
			}
		},

		'mc (Нет нет нет нет нет нет нет)',
		'mc (Я умер. Я УМЕР. И это... это...)',
		'mc (ЭТОГО НЕ МОЖЕТ БЫТЬ.)',
		'mc (Я читал все исследования. Я знаю, как работает мозг.)',
		'mc (Это просто... просто...)',

		{
			'Function': {
				'Apply': function () {
					panicText (false);
				},
				'Revert': function () {}
			}
		},

		'Кто-то трогает Алексея за плечо. Полупрозрачная рука.',

		'show character soul sad at left with fadeIn',
		'soul Эй, приятель. Дыши. Ну, как бы... по привычке.',
		'soul Я тоже так реагировал. Все так реагируют.',
		'mc Кто... кто вы?',
		'soul Борис. Инфаркт. Вторник. А ты?',
		'mc ...Алексей. Тоже... инфаркт. Кажется.',
		'soul Ну, добро пожаловать в очередь.',
		'hide character soul with fadeOut',

		'jump Judgment_Queue'
	],

	// ==========================================
	// СТРАШНЫЙ СУД: Очередь
	// ==========================================
	'Judgment_Queue': [
		'show scene judgment_queue with fadeIn',
		'show character mc normal at center',

		'Очередь движется. Быстрее, чем в любом учреждении на Земле. Подозрительно быстро.',
		'Каждые 40 секунд — одна душа. Алексей считал. Ровно 40. Каждый раз.',
		'mc (40 секунд. Как тактовая частота процессора. Как refresh rate. Это...)',

		'Вокруг — души. Разные эпохи, культуры.',
		'Мужчина в тоге повторяет одну и ту же фразу соседу. Дважды. Слово в слово.',
		'mc (Он только что сказал то же самое. Точно так же. С той же интонацией.)',

		'show character soul resigned at left with fadeIn',
		'soul2 Простите, вы крайний?',
		'mc Видимо, да.',
		'soul2 А вы... за какое?',
		'mc В смысле?',
		'soul2 Ну, вы знали, куда попадёте? Я — буддист. Думал, будет реинкарнация...',
		'soul2 А тут — ЭТО. Какой-то христианский ЗАГС.',

		'mc (Буддист в христианском раю?! Это... это...)',
		'mc (Подождите. Если христианская версия — правильная, почему тут буддисты?)',
		'mc (Это как будто кто-то взял ВСЕ религии и смешал в один сеттинг...)',
		'mc (Как в плохо написанной игре. Или... нет, бред.)',

		{
			'Function': {
				'Apply': function () {
					this.storage ({ matrix_suspicion: this.storage ().matrix_suspicion + 1 });
				},
				'Revert': function () {
					this.storage ({ matrix_suspicion: this.storage ().matrix_suspicion - 1 });
				}
			}
		},

		{
			'Choice': {
				'Dialog': 'mc (Что ответить?)',
				'atheist_proud': {
					'Text': '«Я атеист. Я вообще не должен тут быть.»',
					'Do': 'jump Judgment_Queue_Atheist',
					'onChosen': function () {
						const s = this.storage ();
						this.storage ({
							denial_count: s.denial_count + 1,
							wtf_level: Math.min (100, s.wtf_level + 5)
						});
					}
				},
				'sympathy': {
					'Text': '«Сочувствую. Я тоже не ожидал.»',
					'Do': 'jump Judgment_Queue_Sympathy',
					'onChosen': function () {
						const s = this.storage ();
						this.storage ({
							empathy_shown: s.empathy_shown + 1
						});
					}
				},
				'humor': {
					'Text': '«А скидки за групповой визит есть?»',
					'Do': 'jump Judgment_Queue_Humor',
					'onChosen': function () {
						const s = this.storage ();
						this.storage ({
							humor_used: s.humor_used + 1
						});
					}
				}
			}
		}
	],

	// --- Ветка: гордый атеист ---
	'Judgment_Queue_Atheist': [
		'mc Я атеист. Я вообще не должен тут быть. По определению.',
		'soul2 ...Атеист?',

		'Пауза. Буддист смотрит с искренним состраданием.',

		'soul2 О, бедняга.',
		'mc Почему «бедняга»?!',
		'soul2 Ну... для нас это просто неправильная религия. А для тебя — вообще отрицание всего этого.',
		'soul2 Тебе тяжелее всех будет.',

		'mc (Утешил, спасибо.)',
		'hide character soul with fadeOut',

		'jump Judgment_Audience'
	],

	// --- Ветка: сочувствие ---
	'Judgment_Queue_Sympathy': [
		'mc Сочувствую. Я тоже не это ожидал.',
		'soul2 А вы какой религии?',
		'mc Никакой. Атеист.',

		'Буддист моргает.',

		'soul2 ...И вы так спокойны?',
		'mc Внутри я ору. Но снаружи стараюсь держать лицо.',
		'soul2 Респект.',

		'Они стоят в тишине. Странно, но это помогает.',
		'hide character soul with fadeOut',

		'jump Judgment_Audience'
	],

	// --- Ветка: юмор ---
	'Judgment_Queue_Humor': [
		'mc А скидки за групповой визит есть? Или хотя бы программа лояльности?',

		'Буддист фыркает. Потом начинает смеяться. Потом — несколько душ рядом.',

		'soul2 Вы... вы серьёзно?',
		'mc Абсолютно. Если это и правда загробная жизнь, я хочу знать условия обслуживания.',

		'Смех. Впервые за... ну, за всю посмертную жизнь.',
		'hide character soul with fadeOut',

		'jump Judgment_Audience'
	],

	// ==========================================
	// СТРАШНЫЙ СУД: Аудиенция
	// ==========================================
	'Judgment_Audience': [
		'show scene judgment_throne with fadeIn',
		// 'stop sound crowd_murmur with fade 2',
		// 'play music judgment_tension with loop fade 2',

		'show character mc shock at center',

		'Алексей стоит перед... чем-то.',
		'Невозможно описать. Невозможно смотреть прямо.',
		'Свет. Но не просто свет — свет, который ЗНАЕТ тебя.',

		// 'play sound thunder',

		{
			'Function': {
				'Apply': function () {
					screenShake (500);
				},
				'Revert': function () {}
			}
		},

		'g Алексей Дмитриевич Волков.',
		'g 38 лет. Программист. Москва.',
		'g Атеист.',

		'mc (Этот голос... он отовсюду. Он ВНУТРИ меня.)',

		'g Мы знакомы, хотя ты считал иначе.',
		'g Я читал все твои посты на Reddit.',

		'mc ......',
		'mc (Он... читал мои посты?!)',
		'mc (Стоп. Откуда Бог знает про Reddit? Это... слишком специфично.)',
		'mc (Как будто кто-то загрузил мой профиль в систему...)',

		{
			'Function': {
				'Apply': function () {
					this.storage ({ matrix_suspicion: this.storage ().matrix_suspicion + 1 });
				},
				'Revert': function () {
					this.storage ({ matrix_suspicion: this.storage ().matrix_suspicion - 1 });
				}
			}
		},

		{
			'Choice': {
				'Dialog': 'g Что скажешь в своё оправдание?',
				'argue_stats': {
					'Text': '«По статистике, вы не можете всех отправить в ад!»',
					'Do': 'jump Judgment_Stats_Argument',
					'onChosen': function () {
						const s = this.storage ();
						this.storage ({
							judgment_argued_stats: true,
							argument_quality: s.argument_quality + 2,
							wtf_level: Math.min (100, s.wtf_level + 10)
						});
					}
				},
				'deny_reality': {
					'Text': '«Это невозможно. Вас не существует.»',
					'Do': 'jump Judgment_Deny',
					'onChosen': function () {
						const s = this.storage ();
						this.storage ({
							denial_count: s.denial_count + 1,
							wtf_level: Math.min (100, s.wtf_level + 15)
						});
					}
				},
				'beg': {
					'Text': '«Я... простите. Я не знал.»',
					'Do': 'jump Judgment_Beg',
					'onChosen': function () {
						const s = this.storage ();
						this.storage ({
							judgment_begged: true,
							acceptance_score: s.acceptance_score + 2
						});
					}
				},
				'sarcasm': {
					'Text': '«Неплохой спецэффект. Мейджор студия?»',
					'Do': 'jump Judgment_Sarcasm',
					'onChosen': function () {
						const s = this.storage ();
						this.storage ({
							humor_used: s.humor_used + 1,
							wtf_level: Math.min (100, s.wtf_level + 5)
						});
					}
				}
			}
		}
	],

	// --- Аргумент статистикой ---
	'Judgment_Stats_Argument': [
		'show character mc angry at center',
		'mc Секунду! По данным исследования Pew Research, более миллиарда людей — неверующие!',
		'mc Вы не можете отправить миллиард людей в ад! Это... это геноцид!',

		'Пауза. Свет слегка мерцает. Это что — усмешка?',

		'g Ты пришёл спорить с БОГОМ с помощью Pew Research?',
		'g ...Мне нравится твоя дерзость.',
		'g Но нет. Статистика здесь не аргумент.',
		'g Впрочем, аргумент зачтён. За храбрость.',

		'mc (Он... зачёл мой аргумент?!)',
		'jump Judgment_Review'
	],

	// --- Отрицание реальности ---
	'Judgment_Deny': [
		'show character mc angry at center',
		'mc Вас. Не. Существует.',
		'mc Я стоял на этой позиции 38 лет и я не собираюсь менять её из-за какого-то светового шоу!',

		{
			'Function': {
				'Apply': function () {
					screenGlitch (600);
					applyWtfEffects (this.storage ().wtf_level);
				},
				'Revert': function () {}
			}
		},

		'Свет становится ярче. НАМНОГО ярче. Алексея как будто прижимают к стене несуществующей силой.',

		'g Ты отрицаешь Меня.',
		'g Стоя ПЕРЕДО МНОЙ.',
		'g ...',
		'g Я видел многое. Но такое упрямство — редкость.',

		'mc (Мне больно. Почему мне больно?! У меня нет тела!)',

		'g Зачтено. Как отягчающее.',
		'jump Judgment_Review'
	],

	// --- Мольба ---
	'Judgment_Beg': [
		'show character mc despair at center',
		'mc Я... простите.',
		'mc Я не знал. Я думал... наука... доказательства...',
		'mc Если бы были явные доказательства, я бы...',

		'g Ты бы что? Поверил?',

		'mc ...Я бы рассмотрел гипотезу.',

		'g Хм.',
		'g Честно. Это больше, чем многие.',
		'g Зачтено. Как смягчающее.',

		'jump Judgment_Review'
	],

	// --- Сарказм ---
	'Judgment_Sarcasm': [
		'show character mc smirk at center',
		'mc Серьёзно, кто делал эти спецэффекты? Industrial Light & Magic? Я впечатлён.',
		'mc Свет, голос Джеймса Эрла Джонса, колонны до неба... Бюджет явно не из десятины.',

		'Тишина. Потом...',

		'g Ха.',

		'mc (Бог... засмеялся?)',

		'g Ты смешной, Алексей. Мне будет жаль.',
		'g Зачтено. Как... ну, просто зачтено.',

		'jump Judgment_Review'
	],

	// ==========================================
	// СТРАШНЫЙ СУД: Обзор жизни
	// ==========================================
	'Judgment_Review': [
		'show scene judgment_review with fadeIn',
		'show character mc shock at center',

		'Пространство вокруг Алексея начинает меняться. Появляются образы.',
		'Его жизнь. Каждый момент. Каждое слово.',

		'mc (Нет... не надо...)',

		'Вот он в пятом классе обзывает Петю «дурачком» за то, что тот молится перед едой.',
		'Вот он в университете публично унижает студентку-мусульманку на семинаре.',

		{
			'Conditional': {
				'Condition': function () {
					return this.storage ().prologue_was_kind ? 'kind' : 'cruel';
				},
				'kind': 'jump Judgment_Review_Kind',
				'cruel': 'jump Judgment_Review_Cruel'
			}
		}
	],

	'Judgment_Review_Kind': [
		'Но вот — моменты доброты.',
		'Вот Алексей молча помогает соседке-старушке нести сумки, хотя она идёт из церкви.',
		'Вот он пишет Серёже «рад за тебя», вместо того чтобы высмеивать.',

		'g Ты не безнадёжен, Алексей.',
		'g Ты заблуждался. Но ты не был жесток.',
		'g По крайней мере, не всегда.',

		'mc (Это... хоть что-то значит?)',

		'jump Judgment_Verdict'
	],

	'Judgment_Review_Cruel': [
		'И ещё. Комментарий под постом больной женщины, которая просила молиться за неё:',
		'«Вместо молитв сходите к онкологу. Молитва — плацебо для отчаявшихся.»',
		'Она плакала. Алексей этого не видел. Не хотел видеть.',

		'g Ты был не просто неверующим, Алексей.',
		'g Ты был жестоким.',
		'g Не ко Мне. К НИМ.',

		{
			'Function': {
				'Apply': function () {
					screenShake (400);
				},
				'Revert': function () {}
			}
		},

		'mc (Я... я просто говорил правду...)',
		'mc (...Правда?)',

		'jump Judgment_Verdict'
	],

	// ==========================================
	// СТРАШНЫЙ СУД: Вердикт
	// ==========================================
	'Judgment_Verdict': [
		'show scene judgment_throne with fadeIn',
		'show character mc despair at center',

		// Проверяем ранний выход: Лазейка
		{
			'Conditional': {
				'Condition': function () {
					const s = this.storage ();
					return (s.humor_used >= 3 && s.argument_quality >= 4) ? 'loophole' : 'normal';
				},
				'loophole': 'jump Ending_Loophole',
				'normal': 'jump Judgment_Verdict_Calc'
			}
		}
	],

	'Judgment_Verdict_Calc': [
		'show scene judgment_throne with fadeIn',
		'show character mc despair at center',

		// Вычисляем вердикт
		{
			'Function': {
				'Apply': function () {
					const s = this.storage ();
					let verdict;
					if (s.argument_quality >= 3 && s.empathy_shown >= 2) {
						verdict = 'light';
					} else if (s.denial_count >= 3 || s.wtf_level >= 60) {
						verdict = 'personalized';
					} else {
						verdict = 'standard';
					}
					this.storage ({ judgment_verdict: verdict });
				},
				'Revert': function () {
					this.storage ({ judgment_verdict: 'standard' });
				}
			}
		},

		// 'play sound gavel',
		'g Вердикт.',

		{
			'Function': {
				'Apply': function () {
					screenShake (600);
				},
				'Revert': function () {}
			}
		},

		{
			'Conditional': {
				'Condition': function () {
					return this.storage ().judgment_verdict;
				},
				'light': 'jump Judgment_Verdict_Light',
				'standard': 'jump Judgment_Verdict_Standard',
				'personalized': 'jump Judgment_Verdict_Personalized'
			}
		}
	],

	'Judgment_Verdict_Light': [
		'g Ты заблуждался, но не был лишён совести.',
		'g Ад. Но... облегчённая версия.',
		'g Считай это чистилищем с расширенной программой.',

		'mc Ад?! Облегчённый?! Это как — ад-лайт?! Без сахара?!',
		'g Именно. Без сахара.',

		// 'stop music judgment_tension with fade 2',
		'hide character mc with fadeOut',
		'show scene #000000 with fadeIn',
		'wait 1000',
		'jump Hell_Arrival'
	],

	'Judgment_Verdict_Standard': [
		'g Ты не верил. Это твоё право.',
		'g Но право выбора не освобождает от последствий.',
		'g Ад. Стандартный пакет.',

		'mc Стандартный... пакет?',
		'g Котлы, огонь, зубовный скрежет. Классика.',

		'mc (Он серьёзно использовал слово «пакет»?!)',

		// 'stop music judgment_tension with fade 2',
		'hide character mc with fadeOut',
		'show scene #000000 with fadeIn',
		'wait 1000',
		'jump Hell_Arrival'
	],

	'Judgment_Verdict_Personalized': [
		'g Ты не просто не верил.',
		'g Ты издевался. Ты насмехался. Ты считал себя умнее всех.',

		{
			'Function': {
				'Apply': function () {
					screenGlitch (800);
				},
				'Revert': function () {}
			}
		},

		'g Ад. Персональный пакет.',
		'g Специально для тебя.',

		'mc Персональный?! Что это значит?!',

		'g Увидишь.',

		'Свет гаснет. Мгновенно. Тишина.',

		// 'stop music judgment_tension with fade 1',
		'hide character mc with fadeOut',
		'show scene #000000 with fadeIn',
		'wait 1500',
		'jump Hell_Arrival'
	]
});

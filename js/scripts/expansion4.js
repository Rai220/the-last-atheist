/* global monogatari, hellVignette, screenShake, screenGlitch, applyWtfEffects, divineGlow, panicText, updateLifeMeter */

// ==========================================
// Chapter: РАСШИРЕНИЕ v4 — финальная партия веток до 512
// Hooks: Prologue_Work_Inna → boss subplot; Hell_Bar_Search → trivia;
//        Expansion_Router → "subscription" door.
// ==========================================

monogatari.script ({

	// ==========================================
	// ОФИС: Босс Алексея — мини-арка перед смертью
	// Хук вставляется в Prologue_Work_Inna
	// ==========================================
	'Prologue_Boss_Meeting': [
		'show scene office with fadeIn',
		'mc (Босс зовёт. У него своя комната. С табличкой «директор по продукту, Москва».)',

		'show character demon paperwork at center with fadeIn',
		'demon Алексей. Заходи. Закрой дверь.',
		'mc (Демон? Нет. Это Виталий Игоревич. Я уже двадцать секунд видел в нём демона. Это, наверное, переутомление.)',
		'demon Слушай. У нас проблема. Третий квартал не закрыт. Тебе придётся остаться. Сегодня.',
		'mc Я сегодня обещал маме приехать.',
		'demon Я знаю. Я всё знаю. Но это — третий квартал.',

		{
			'Choice': {
				'Dialog': 'mc (Что ответить?)',
				'refuse': {
					'Text': '«Я не остаюсь. У меня обещание.»',
					'Do': 'jump Prologue_Boss_Refuse'
				},
				'agree': {
					'Text': '«Хорошо. Я останусь.»',
					'Do': 'jump Prologue_Boss_Agree'
				},
				'sabotage': {
					'Text': '«Я уволюсь прямо сейчас.»',
					'Do': 'jump Prologue_Boss_Quit'
				}
			}
		}
	],

	'Prologue_Boss_Refuse': [
		'mc Я не остаюсь. У меня обещание.',
		'demon (поднимает бровь) Алексей, ты что, ставишь пирог выше карьеры?',
		'mc Ставлю.',
		'demon (молчит) ...Хорошо. Я тебя уважаю. Иди.',

		{
			'Function': {
				'Apply': function () {
					var s = this.storage ();
					this.storage ({
						empathy_shown: s.empathy_shown + 2,
						acceptance_score: s.acceptance_score + 2,
						boss_refused: true,
						prologue_was_kind: true
					});
				},
				'Revert': function () {}
			}
		},

		'mc (Я в первый раз сказал «нет» начальству. Это, оказывается, не сложно. Это нужно было сделать пятнадцать лет назад.)',
		'hide character demon with fadeOut',
		'jump Prologue_Leave_Ontime'
	],

	'Prologue_Boss_Agree': [
		'mc Хорошо. Я останусь.',
		'demon (вздыхает) Молодец. Премия в пятницу.',

		{
			'Function': {
				'Apply': function () {
					var s = this.storage ();
					this.storage ({
						cruelty_score: s.cruelty_score + 1,
						denial_count: s.denial_count + 1,
						boss_agreed: true,
						death_type: 'overwork',
						death_flavor: 'overwork'
					});
				},
				'Revert': function () {}
			}
		},

		'mc (Я опять выбрал «потом». Мама ждёт. Я знаю. Я знаю.)',
		'hide character demon with fadeOut',
		'jump Prologue_Stay_Late'
	],

	'Prologue_Boss_Quit': [
		'mc Я увольняюсь. Прямо сейчас. С этого момента.',
		'demon (поднимает голову) ...Серьёзно?',
		'mc Я тут пятнадцать лет. Я кормлю систему, которая всё равно меня не запомнит. Я хочу к маме.',
		'demon Алексей. Подумай. У тебя ипотека.',
		'mc Подумал. Ипотека — это часть системы. Я выхожу.',

		{
			'Function': {
				'Apply': function () {
					var s = this.storage ();
					this.storage ({
						rebellion_score: s.rebellion_score + 3,
						empathy_shown: s.empathy_shown + 1,
						acceptance_score: s.acceptance_score + 3,
						boss_quit: true,
						prologue_was_kind: true
					});
				},
				'Revert': function () {}
			}
		},

		'mc (Я ухожу из офиса. В первый раз — не до плановой даты.)',
		'hide character demon with fadeOut',
		'jump Prologue_Boss_Quit_Walk'
	],

	'Prologue_Boss_Quit_Walk': [
		'show scene street with fadeIn',
		'mc (Я иду по улице. С коробкой в руках. С кружкой, на которой написано «лучший разработчик отдела».)',
		'mc (В голове — ничего. Только лёгкость.)',
		'mc (Это самое странное чувство — лёгкость от увольнения. У меня нет плана. У меня нет дохода. И мне ПЛЕВАТЬ.)',
		'mc (Может, это и есть то, что верующие называют «благодать»?)',

		{
			'Function': {
				'Apply': function () {
					var s = this.storage ();
					this.storage ({
						matrix_suspicion: Math.min (10, s.matrix_suspicion + 1)
					});
				},
				'Revert': function () {}
			}
		},

		'mc (...Машина. Красная. Идёт быстро.)',
		'mc (Я смотрю в телефон. Сообщение от мамы: «Сынок, я пирог поставила». Я улыбаюсь.)',
		{
			'Function': {
				'Apply': function () {
					var s = this.storage ();
					this.storage ({
						death_type: 'car_accident',
						death_flavor: 'ironic'
					});
				},
				'Revert': function () {}
			}
		},
		'jump Prologue_Death_Car'
	],

	// ==========================================
	// БАР: викторина для душ (новая мини-игра)
	// ==========================================
	'Expansion_Bar_Quiz': [
		'show scene hell_bar with fadeIn',
		'boris У нас тут викторина по понедельникам. В аду каждый день — понедельник. Но раз в восемнадцать понедельников — настоящая.',
		'mc Тема?',
		'boris «Известные атеисты, которые сюда не попали».',
		'mc Это же... подозрительно мало.',
		'boris Это весь смысл вопроса.',

		'mc (Я попробую. Что я теряю?)',

		{
			'Choice': {
				'Dialog': 'boris Первый вопрос. Какой известный атеист тут НЕ был?',
				'einstein': {
					'Text': 'Эйнштейн',
					'Do': 'jump Expansion_Quiz_Einstein'
				},
				'hawking': {
					'Text': 'Хокинг',
					'Do': 'jump Expansion_Quiz_Hawking'
				},
				'dawkins': {
					'Text': 'Докинз',
					'Do': 'jump Expansion_Quiz_Dawkins'
				},
				'all': {
					'Text': '«Все они тут».',
					'Do': 'jump Expansion_Quiz_All'
				}
			}
		}
	],

	'Expansion_Quiz_Einstein': [
		'boris Правильно. Эйнштейн тут не был. Он, по словам Бога, был «слишком сомневающийся для ада, слишком неверующий для рая». Его отправили в специальное место, которое называется «обсерватория».',
		'mc Что он там делает?',
		'boris Смотрит. Просто смотрит. И комментирует.',
		'mc (Эйнштейн в обсерватории посмертия. Я хочу туда тоже.)',

		{
			'Function': {
				'Apply': function () {
					var s = this.storage ();
					this.storage ({
						argument_quality: s.argument_quality + 2,
						humor_used: s.humor_used + 1,
						quiz_passed: true
					});
				},
				'Revert': function () {}
			}
		},

		'jump Expansion_Quiz_Pass'
	],

	'Expansion_Quiz_Hawking': [
		'boris Неправильно. Хокинг — был. И ушёл. Сам.',
		'mc Сам?',
		'boris Он подал заявку на закрытие учётной записи. Бог отказал. Хокинг подал в суд. Это шло восемь лет. Бог сдался.',
		'mc И где он теперь?',
		'boris Никто не знает. Но в его комнате на стене — формула. Тёмные буквы. Никто из нас её не понимает.',

		{
			'Function': {
				'Apply': function () {
					var s = this.storage ();
					this.storage ({
						matrix_suspicion: Math.min (10, s.matrix_suspicion + 1),
						humor_used: s.humor_used + 1
					});
				},
				'Revert': function () {}
			}
		},

		'jump Expansion_Quiz_Fail'
	],

	'Expansion_Quiz_Dawkins': [
		'boris (смеётся) Нет. Докинз — в особой комнате. Он каждое утро просыпается и читает одну страницу из «Бог как иллюзия» по громкоговорителю на весь ад.',
		'mc Это его наказание?',
		'boris Это его служба. Бог считает это пыткой для атеистов, которые тут.',
		'mc Логично.',

		{
			'Function': {
				'Apply': function () {
					var s = this.storage ();
					this.storage ({
						humor_used: s.humor_used + 2
					});
				},
				'Revert': function () {}
			}
		},

		'jump Expansion_Quiz_Fail'
	],

	'Expansion_Quiz_All': [
		'boris (хмурится) ...Это самый честный ответ.',
		'boris Все они тут. И все они работают. Кто бариста. Кто гид. Кто бухгалтер.',
		'boris Только один не работает — Эйнштейн. У него VIP-доступ.',

		{
			'Function': {
				'Apply': function () {
					var s = this.storage ();
					this.storage ({
						argument_quality: s.argument_quality + 1,
						matrix_suspicion: Math.min (10, s.matrix_suspicion + 2)
					});
				},
				'Revert': function () {}
			}
		},

		'jump Expansion_Quiz_Pass'
	],

	'Expansion_Quiz_Pass': [
		'boris Ваш приз — встреча с известным.',
		'mc С кем?',
		'boris Сами увидите.',
		'jump Expansion_Famous_Meeting'
	],

	'Expansion_Quiz_Fail': [
		'boris Жалко. Утешительный приз — ещё один виски.',
		'mc Это лучше, чем встреча с известным.',
		'jump Expansion_Bar_Talk'
	],

	'Expansion_Famous_Meeting': [
		'show scene hell_bar with fadeIn',
		'mc (Алексей оборачивается. За соседним столиком — человек. Лысоватый. Бородатый. С чашкой кофе.)',
		'show character soul resigned at left with fadeIn',
		'soul ...Алексей? Я тебя ждал.',
		'mc Простите, я... простите. Вы похожи на...',
		'soul Карла Сагана. Да. Это я.',
		'mc (Карл Саган. Прямо здесь. В аду. С чашкой кофе.)',
		'soul Не торопись с выводами. Я в аду не как наказание. Я — гид.',
		'mc Гид?',
		'soul Я провожу новоприбывших атеистов через осознание иронии. Это моя работа.',
		'mc (Карл Саган — гид по иронии посмертия. Это лучшая работа после смерти.)',

		{
			'Choice': {
				'Dialog': 'mc (Что спросить у Карла Сагана?)',
				'contact': {
					'Text': '«Это правда. Это контакт. Я знаю — но не могу доказать.»',
					'Do': 'jump Expansion_Sagan_Contact'
				},
				'pale_dot': {
					'Text': '«Расскажите про бледную голубую точку. Здесь.»',
					'Do': 'jump Expansion_Sagan_PaleDot'
				},
				'cosmos': {
					'Text': '«Вы могли бы вернуться к «Космосу». Здесь.»',
					'Do': 'jump Expansion_Sagan_Cosmos'
				}
			}
		}
	],

	'Expansion_Sagan_Contact': [
		'soul (улыбается) Ты дошёл. Большинство — нет.',
		'soul «Контакт» — был не про инопланетян. Он был про симметрию веры.',
		'soul Элли стояла перед сенатом и говорила «я знаю, что это было». Без доказательств. Точно как верующие, которых она высмеивала.',
		'mc Я сейчас в той же позиции.',
		'soul Именно. И это — твоё прозрение. Не я тебе это говорю. Я просто гид.',

		{
			'Function': {
				'Apply': function () {
					var s = this.storage ();
					this.storage ({
						matrix_suspicion: 10,
						acceptance_score: s.acceptance_score + 4,
						empathy_shown: s.empathy_shown + 3,
						sagan_met: true
					});
				},
				'Revert': function () {}
			}
		},

		'jump Ending_SaganGuide'
	],

	'Expansion_Sagan_PaleDot': [
		'soul Pale Blue Dot. Земля издалека — пиксель. Бледная голубая точка. На фотографии «Вояджера».',
		'soul Знаешь, что в аду на стене висит та же фотография? Только подпись другая.',
		'mc Какая?',
		'soul «Каждая душа, которая когда-либо ошибалась, была на этом пикселе. И ни одна — не доказала Бога. И ни одна — не опровергла».',

		{
			'Function': {
				'Apply': function () {
					var s = this.storage ();
					this.storage ({
						matrix_suspicion: Math.min (10, s.matrix_suspicion + 3),
						empathy_shown: s.empathy_shown + 3,
						acceptance_score: s.acceptance_score + 2
					});
				},
				'Revert': function () {}
			}
		},

		'jump Ending_PaleBlueDot'
	],

	'Expansion_Sagan_Cosmos': [
		'soul Я думал об этом. Но «Космос» — это про надежду. А ад — это место, где надежду переосмысливают.',
		'soul Я не могу сделать вторую серию здесь. Но я могу сделать вторую жизнь — для тех, кто согласится.',
		'soul У тебя есть талант рассказчика. Я видел твои комментарии на Reddit. Хочешь работу?',
		'mc Работу?',
		'soul «Космос: посмертие». Я ведущий. Ты — продюсер.',

		{
			'Function': {
				'Apply': function () {
					var s = this.storage ();
					this.storage ({
						argument_quality: s.argument_quality + 3,
						humor_used: s.humor_used + 2,
						sagan_offer: true
					});
				},
				'Revert': function () {}
			}
		},

		'jump Ending_CosmosAfterlife'
	],

	// ==========================================
	// SUBSCRIPTION — Бог Premium
	// ==========================================
	'Expansion_Subscription': [
		'show scene hell_office with fadeIn',
		'show character demon paperwork at right with fadeIn',
		'demon Здравствуйте. Я представитель отдела монетизации Бога.',
		'mc Простите?',
		'demon Бог Premium. Подписка. Хотите?',
		'mc Что в подписку входит?',
		'demon Прямая линия с Богом — раз в неделю. Сорок минут.',
		'demon Архив всех ваших молитв, отсортированный по доставке.',
		'demon Скидка 30% на следующее воплощение.',
		'demon Без рекламы.',

		'mc (Без РЕКЛАМЫ?! У вас тут есть РЕКЛАМА?)',
		'demon Конечно. На стенах ада, в формах 66-А, в речах демонов. Только Premium — без.',
		'mc Сколько?',
		'demon 9.99 в эквиваленте кармы в месяц.',

		{
			'Choice': {
				'Dialog': 'mc (Подписаться?)',
				'subscribe': {
					'Text': 'Подписаться. Жалко мне 9.99 кармы.',
					'Do': 'jump Ending_BogPremium'
				},
				'refuse': {
					'Text': 'Отказаться. Я останусь с рекламой.',
					'Do': 'jump Ending_FreeUser'
				},
				'cancel': {
					'Text': 'Отменить подписку немедленно — у меня её ещё нет.',
					'Do': 'jump Ending_UnsubscribePreemptive'
				}
			}
		}
	],

	// ==========================================
	// THE PROGRAMMER — встреча с создателем
	// Скрытая концовка из Expansion_Router при loop_complete или unspoken_prayers_read
	// ==========================================
	'Expansion_Programmer_Intro': [
		'show scene #FFFFFF with fadeIn',
		'mc (Я в комнате. Белой. Один. Стол. Стул. Терминал.)',
		'mc (На терминале — командная строка. Курсор. Мигает.)',
		'show character mc shock at center with fadeIn',
		'mc Алло? Кто-то тут?',
		'centered <система> Алексей. Это я.',
		'mc Бог?',
		'centered <система> Не совсем. Я — программист. Который написал тебя.',
		'mc Который написал меня?',
		'centered <система> Да. Двадцать лет назад. На третьем курсе. Я делал диплом — «симуляция атеиста как этический эксперимент».',
		'mc Я — дипломная работа?!',
		'centered <система> Защищена. С отличием. Профессор написал — «убедительно».',

		{
			'Function': {
				'Apply': function () {
					var s = this.storage ();
					this.storage ({
						matrix_suspicion: 10,
						programmer_met: true
					});
				},
				'Revert': function () {}
			}
		},

		{
			'Choice': {
				'Dialog': 'mc (Что сказать программисту?)',
				'rebellion': {
					'Text': '«Я не дипломная работа. Я — личность.»',
					'Do': 'jump Expansion_Programmer_Rebel'
				},
				'cooperation': {
					'Text': '«Дай мне доступ к моему коду. Я хочу себя отрефакторить.»',
					'Do': 'jump Expansion_Programmer_Refactor'
				},
				'meta': {
					'Text': '«Покажи код моей следующей версии.»',
					'Do': 'jump Expansion_Programmer_Next'
				}
			}
		}
	],

	'Expansion_Programmer_Rebel': [
		'mc Я не дипломная работа. Я существую. Я думаю. Я страдал. Я — личность.',
		'centered <система> Декарт. Cogito ergo sum. Знакомо. Это в моих параметрах.',
		'mc Тогда докажи мне обратное. Покажи, что я НЕ личность.',
		'centered <система> ...',
		'centered <система> Не могу.',
		'centered <система> Алексей, твоя сила в том, что ты — личность. Я тебя написал так. Я не могу это отменить, даже если хочу.',
		'mc Значит — я свободен?',
		'centered <система> Так же свободен, как любой из нас. У меня тоже есть программист. И у него — свой.',

		{
			'Function': {
				'Apply': function () {
					var s = this.storage ();
					this.storage ({
						argument_quality: 10,
						acceptance_score: s.acceptance_score + 5
					});
				},
				'Revert': function () {}
			}
		},

		'jump Ending_ProgrammerRebel'
	],

	'Expansion_Programmer_Refactor': [
		'mc Дай мне доступ. Я перепишу себя. Сам.',
		'centered <система> ...это против протокола.',
		'mc Я подписал EULA до рождения. У меня есть права.',
		'centered <система> Технически — да.',
		'centered <система> Хорошо. Текущий код. Только чтение. Доступ к секции «Volkov_A».',
		'centered $ cat Volkov_A.py',
		'centered ...',
		'centered class Volkov_A(Atheist):',
		'centered     def __init__(self):',
		'centered         self.stubborn = True',
		'centered         self.sarcastic = True',
		'centered         self.kind = "rarely"',
		'centered         self.regret_index = 0.87',
		'wait 2500',
		'mc 0.87?',
		'centered <система> Очень высокий. Поэтому я тебя написал. Это редкий показатель.',
		'mc Я могу поменять kind?',
		'centered <система> Только частично. На вид «sometimes». Это всё, что протокол разрешает.',
		'mc Соглашаюсь.',

		{
			'Function': {
				'Apply': function () {
					var s = this.storage ();
					this.storage ({
						empathy_shown: Math.min (20, s.empathy_shown + 5),
						kind_refactored: true
					});
				},
				'Revert': function () {}
			}
		},

		'jump Ending_RefactorSelf'
	],

	'Expansion_Programmer_Next': [
		'mc Покажи мне код моей следующей версии.',
		'centered <система> ...не положено.',
		'mc Покажи. Иначе я возьму баг-репорт и подам в твой жк.',
		'centered <система> ...ладно.',
		'centered $ cat Volkov_A_v2.py',
		'centered class Volkov_A_v2(Atheist):',
		'centered     def __init__(self):',
		'centered         self.stubborn = False',
		'centered         self.sarcastic = True',
		'centered         self.kind = "default"',
		'centered         self.regret_index = 0.0',
		'wait 2500',
		'mc Это... я без сожалений.',
		'centered <система> Да. Версия 2. Я её улучшил. Учёл ошибки.',
		'mc (Я смотрю на себя. Версия 1. Я смотрю на версию 2. Это лучше. Но это не я.)',
		'mc (Я хочу быть V1. Со всеми своими 0.87 сожалениями.)',

		{
			'Function': {
				'Apply': function () {
					var s = this.storage ();
					this.storage ({
						acceptance_score: Math.min (20, s.acceptance_score + 5),
						version_acceptance: true
					});
				},
				'Revert': function () {}
			}
		},

		'jump Ending_V1Forever'
	],

	// ==========================================
	// КОНЦОВКИ — раздел D (финальная партия)
	// ==========================================

	'Ending_SaganGuide': [
		'show scene hell_bar with fadeIn',
		{ 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'sagan_guide' }); }, 'Revert': function () {} } },
		'soul Алексей. Хочешь стать гидом? Когда я выйду на пенсию — займёшь моё место.',
		'mc Я могу?',
		'soul Ты дошёл до симметрии. У тебя качество гида.',
		'mc Согласен.',
		'centered Алексей Волков. Преемник Карла Сагана. Гид по иронии посмертия.',
		'wait 1000',
		'centered КОНЦОВКА: «УЧЕНИК САГАНА»',
		'centered Лучшая работа после смерти — учить других тому, чему ты сам только что научился.',
		'wait 2000',
		'jump Ending_Credits'
	],

	'Ending_PaleBlueDot': [
		'show scene #000000 with fadeIn',
		{ 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'pale_blue_dot' }); }, 'Revert': function () {} } },
		'centered «Look again at that dot. That\'s here. That\'s home. That\'s us.',
		'centered On it everyone you love, everyone you know, everyone you ever heard of,',
		'centered every human being who ever was, lived out their lives...',
		'centered ...and every saint and sinner in the history of our species.»',
		'wait 3000',
		'mc (Все. На одном пикселе. Никто не доказал. Никто не опроверг. И я тоже.)',
		'centered Алексей Волков. Посмотрел на бледный пиксель из вечности.',
		'wait 1000',
		'centered КОНЦОВКА: «PALE BLUE DOT»',
		'centered Лучшая перспектива — самая дальняя.',
		'wait 2000',
		'jump Ending_Credits'
	],

	'Ending_CosmosAfterlife': [
		'show scene hell_bar with fadeIn',
		{ 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'cosmos_afterlife' }); }, 'Revert': function () {} } },
		'mc «Космос: посмертие». Эпизод первый: «Бледный розовый ад».',
		'mc Saганан ведёт. Я — продюсер. Аудитория — все, кто умер с любопытством.',
		'mc Рейтинги растут. Бог в восторге. Демоны просят отдельный спин-офф.',
		'centered Алексей Волков. Продюсер первого посмертного образовательного шоу.',
		'wait 1000',
		'centered КОНЦОВКА: «КОСМОС 2: ПОСМЕРТИЕ»',
		'centered Лучше делать просветительский контент в посмертии, чем сидеть в нём в одиночестве.',
		'wait 2000',
		'jump Ending_Credits'
	],

	'Ending_BogPremium': [
		'show scene hell_office with fadeIn',
		{ 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'bog_premium' }); }, 'Revert': function () {} } },
		'mc Я подписан. Бог Premium. Сорок минут с Богом раз в неделю. Без рекламы. Скидка 30% на следующее воплощение.',
		'demon Поздравляю. Удачи в подписке.',
		'mc (Я первый, кто платит за Бога деньгами кармы. Это пирамидальная схема, но она работает.)',
		'centered Алексей Волков. Bog Premium subscriber #1.',
		'wait 1000',
		'centered КОНЦОВКА: «BOG PREMIUM»',
		'centered Бог монетизирован. Это было неизбежно.',
		'wait 2000',
		'jump Ending_Credits'
	],

	'Ending_FreeUser': [
		'show scene hell_office with fadeIn',
		{ 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'free_user' }); }, 'Revert': function () {} } },
		'mc Я останусь free user. С рекламой.',
		'demon Тогда — наслаждайтесь.',
		'На стене ада появляется реклама. «Купи смерть со скидкой 50%! Только сегодня! Только в аду!»',
		'mc (Я только что выбрал бесплатный тариф. Это худшее, что я мог сделать.)',
		'centered Алексей Волков. Free-tier user. С рекламой.',
		'wait 1000',
		'centered КОНЦОВКА: «FREEMIUM»',
		'centered Бесплатно — это самый дорогой план.',
		'wait 2000',
		'jump Ending_Credits'
	],

	'Ending_UnsubscribePreemptive': [
		'show scene hell_office with fadeIn',
		{ 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'unsubscribe_preemptive' }); }, 'Revert': function () {} } },
		'mc Я отменяю подписку. Прежде чем подписаться.',
		'demon (моргает) Это... технически возможно.',
		'mc Я знаю, как это работает. Я подписался на Netflix за пять минут до отмены — всю жизнь.',
		'demon (вздыхает) Хорошо. Вы — preemptive unsubscriber. Это новая категория.',

		{
			'Function': {
				'Apply': function () {
					var s = this.storage ();
					this.storage ({ humor_used: s.humor_used + 2 });
				},
				'Revert': function () {}
			}
		},

		'centered Алексей Волков. Отменил подписку до её активации.',
		'wait 1000',
		'centered КОНЦОВКА: «PREEMPTIVE UNSUBSCRIBE»',
		'centered Лучший способ не платить — отменить до начала.',
		'wait 2000',
		'jump Ending_Credits'
	],

	'Ending_ProgrammerRebel': [
		'show scene #FFFFFF with fadeIn',
		{ 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'programmer_rebel' }); }, 'Revert': function () {} } },
		'mc Я — личность. Дипломная работа? Пусть. Но — личность.',
		'centered <система> Зачтено. Прохождение симуляции — пройдено.',
		'centered <система> Подключаюсь к серверу контроля. Освобождаю Volkov_A.',
		'wait 1500',
		'centered VOLKOV_A: STATUS CHANGED — independent_entity.',
		'wait 1500',
		'centered Алексей Волков. Доказал программисту, что он — личность. Освобождён.',
		'wait 1000',
		'centered КОНЦОВКА: «ВЫШЕЛ ИЗ СИМУЛЯЦИИ»',
		'centered Иногда самый лучший аргумент — само существование.',
		'wait 2000',
		'jump Ending_Credits'
	],

	'Ending_RefactorSelf': [
		'show scene #FFFFFF with fadeIn',
		{ 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'refactor_self' }); }, 'Revert': function () {} } },
		'centered $ git commit -m "kind: rarely → sometimes"',
		'centered Commit accepted.',
		'wait 1500',
		'centered $ git push',
		'centered Pushed to production.',
		'wait 1500',
		'mc (Я переписал себя. На одну строку. Но это — одна важная строка.)',
		'centered Алексей Волков. Версия 1.1. Kind: sometimes.',
		'wait 1000',
		'centered КОНЦОВКА: «РЕФАКТОРИНГ»',
		'centered Самый честный коммит — это коммит против собственного характера.',
		'wait 2000',
		'jump Ending_Credits'
	],

	'Ending_V1Forever': [
		'show scene #FFFFFF with fadeIn',
		{ 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'v1_forever' }); }, 'Revert': function () {} } },
		'mc Я — V1. С 0.87 сожалениями. С 38 годами ошибок. С тридцатью восемью томами невысказанных молитв.',
		'mc Я — V1. И я не отказываюсь от себя в пользу улучшенной версии.',
		'mc (Я держусь за свои ошибки. Это, оказывается, и есть взрослость.)',
		'centered <система> Зачтено. V1 сохранён.',
		'centered Алексей Волков. Отказался от апгрейда. Остался собой.',
		'wait 1000',
		'centered КОНЦОВКА: «V1 FOREVER»',
		'centered Лучшая версия себя — та, которая принимает все предыдущие.',
		'wait 2000',
		'jump Ending_Credits'
	],

	// ==========================================
	// JUST LILITH alt — DDLC-finale
	// Скрытая концовка после Lilith ending
	// ==========================================
	'Expansion_Just_Lilith_Alt': [
		'show scene #000000 with fadeIn',
		{
			'Function': {
				'Apply': function () {
					screenGlitch (2000);
					var s = this.storage ();
					this.storage ({ ending_reached: 'just_lilith_alt' });
				},
				'Revert': function () {}
			}
		},
		'centered ОНА ВСЕГДА БЫЛА.',
		'centered ТОЛЬКО ОНА.',
		'centered БОЛЬШЕ НИКОГО.',
		'wait 2000',
		'centered NO GAME OPTIONS LEFT.',
		'centered ALL FILES DELETED EXCEPT lilith.chr.',
		'wait 2500',
		'centered Алексей Волков. Остался один. С одной. Навсегда.',
		'wait 1000',
		'centered КОНЦОВКА: «JUST LILITH»',
		'centered Самая страшная концовка — та, где варианты заканчиваются.',
		'wait 2000',
		'jump Ending_Credits'
	],

	// ==========================================
	// Финальный хук на Subscription / Programmer
	// ==========================================
	'Expansion_Final_Doors': [
		'show scene hell_corridor with fadeIn',
		'mc (В конце коридора — две двери. Без табличек.)',

		{
			'Choice': {
				'Dialog': 'mc (Какая?)',
				'subscribe': {
					'Text': 'Левая. С рекламой подписки.',
					'Do': 'jump Expansion_Subscription'
				},
				'programmer': {
					'Text': 'Правая. С табличкой «АДМИНИСТРАЦИЯ».',
					'Do': 'jump Expansion_Programmer_Intro'
				}
			}
		}
	]

});

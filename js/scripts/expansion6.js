/* global monogatari, screenGlitch, screenShake, divineGlow */

// ==========================================
// Chapter: РАСШИРЕНИЕ v6 — массовая партия микро- и комбинаторных концовок
// Цели: высокая реиграбельность, скрытые комбо stat'ов, шуточные финалы.
// Все концовки доступны через Expansion_RNG_Wheel (новая дверь в роутере)
// или прямые stat-gated прыжки.
// ==========================================

monogatari.script ({

	// ==========================================
	// КОЛЕСО RNG — выпадает одна из 24 уникальных концовок
	// в зависимости от seed = hash(stat'ов)
	// ==========================================
	'Expansion_RNG_Wheel': [
		'show scene #000000 with fadeIn',
		'centered Ты крутишь колесо посмертия.',
		'wait 800',
		'centered На нём — 24 концовки. Тебе достанется одна.',
		'wait 800',
		{
			'Function': {
				'Apply': function () {
					var s = this.storage ();
					var seed = (
						(s.empathy_shown || 0) * 17 +
						(s.cruelty_score || 0) * 31 +
						(s.humor_used || 0) * 13 +
						(s.argument_quality || 0) * 23 +
						(s.matrix_suspicion || 0) * 7 +
						(s.lilith_interest || 0) * 11 +
						(s.neighbor_interest || 0) * 19 +
						(s.acceptance_score || 0) * 5 +
						(s.denial_count || 0) * 3 +
						(s.rebellion_score || 0) * 29
					) % 24;
					this.storage ({ rng_seed: seed });
				},
				'Revert': function () {}
			}
		},
		{
			'Conditional': {
				'Condition': function () { return String (this.storage ().rng_seed || 0); },
				'0':  'jump Ending_Wheel_FishTank',
				'1':  'jump Ending_Wheel_Cosplayer',
				'2':  'jump Ending_Wheel_Crypto',
				'3':  'jump Ending_Wheel_Yoga',
				'4':  'jump Ending_Wheel_DroneSwarm',
				'5':  'jump Ending_Wheel_Bookshop',
				'6':  'jump Ending_Wheel_Garage',
				'7':  'jump Ending_Wheel_Taxi',
				'8':  'jump Ending_Wheel_PostOffice',
				'9':  'jump Ending_Wheel_Bakery',
				'10': 'jump Ending_Wheel_Subway',
				'11': 'jump Ending_Wheel_Helpline',
				'12': 'jump Ending_Wheel_Lighthouse',
				'13': 'jump Ending_Wheel_NightOwl',
				'14': 'jump Ending_Wheel_TimeKeeper',
				'15': 'jump Ending_Wheel_Cartographer',
				'16': 'jump Ending_Wheel_Beekeeper',
				'17': 'jump Ending_Wheel_Curator',
				'18': 'jump Ending_Wheel_Translator',
				'19': 'jump Ending_Wheel_Watchman',
				'20': 'jump Ending_Wheel_Florist',
				'21': 'jump Ending_Wheel_Mechanic',
				'22': 'jump Ending_Wheel_Astronomer',
				'23': 'jump Ending_Wheel_Conductor'
			}
		}
	],

	// 24 концовки колеса — каждая краткая, тематическая, законченная
	'Ending_Wheel_FishTank': [
		'show scene #224488 with fadeIn',
		{ 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'wheel_fish_tank' }); }, 'Revert': function () {} } },
		'mc Я попал в аквариум посмертия. У меня свой угол, фильтр и водоросли. Завидую раньше — теперь сам в нём живу.',
		'centered Алексей. Рыба в аквариуме чистилища.',
		'wait 1000',
		'centered КОНЦОВКА: «АКВАРИУМ»',
		'centered Иногда тишина — это просто плавать по кругу.',
		'wait 2000',
		'jump Ending_Credits'
	],
	'Ending_Wheel_Cosplayer': [
		'show scene hell_office with fadeIn',
		{ 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'wheel_cosplayer' }); }, 'Revert': function () {} } },
		'mc Меня записали в отдел «Косплеи на собственную жизнь». Я заново разыгрываю свои дни. С костюмом.',
		'centered Алексей. Косплеит собственное прошлое. Каждый день — пьеса.',
		'wait 1000',
		'centered КОНЦОВКА: «КОСПЛЕЙ»',
		'centered Если не получился сценарий жизни — поставь его на сцене.',
		'wait 2000',
		'jump Ending_Credits'
	],
	'Ending_Wheel_Crypto': [
		'show scene hell_server_room with fadeIn',
		{ 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'wheel_crypto' }); }, 'Revert': function () {} } },
		'mc Ад теперь принимает крипту. Я майню grief-coins. У меня уже три блока.',
		'centered Алексей. Майнер grief-coins. Сложность сети — бесконечность.',
		'wait 1000',
		'centered КОНЦОВКА: «GRIEF-COIN»',
		'centered Лучшая валюта посмертия — невыплаканные слёзы.',
		'wait 2000',
		'jump Ending_Credits'
	],
	'Ending_Wheel_Yoga': [
		'show scene hell_cauldrons with fadeIn',
		{ 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'wheel_yoga' }); }, 'Revert': function () {} } },
		'mc Я веду группу хатха-йоги для душ. Ад — это растяжка терпения. Я был неправ, что не занимался при жизни.',
		'centered Алексей. Йога-инструктор сектора Г.',
		'wait 1000',
		'centered КОНЦОВКА: «ШАВАСАНА В АДУ»',
		'centered Лучшая поза в аду — мёртвая поза.',
		'wait 2000',
		'jump Ending_Credits'
	],
	'Ending_Wheel_DroneSwarm': [
		'show scene #888888 with fadeIn',
		{ 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'wheel_drone_swarm' }); }, 'Revert': function () {} } },
		'mc Меня переселили в коллективный разум. Я теперь — один из триллиона дронов одного сознания.',
		'centered Алексей. Узел в коллективном разуме умерших.',
		'wait 1000',
		'centered КОНЦОВКА: «УЛЕЙ»',
		'centered Лучшее одиночество — это быть частью улья.',
		'wait 2000',
		'jump Ending_Credits'
	],
	'Ending_Wheel_Bookshop': [
		'show scene hell_library with fadeIn',
		{ 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'wheel_bookshop' }); }, 'Revert': function () {} } },
		'mc Я открыл книжный магазин. Продаю только книги, которые НЕ были написаны. У меня бестселлер — «Сын, которым я не стал».',
		'centered Алексей. Владелец магазина ненаписанного.',
		'wait 1000',
		'centered КОНЦОВКА: «ЛАВКА НЕНАПИСАННОГО»',
		'centered Лучшая книга — та, которой нет на полке.',
		'wait 2000',
		'jump Ending_Credits'
	],
	'Ending_Wheel_Garage': [
		'show scene hell_workshop with fadeIn',
		{ 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'wheel_garage' }); }, 'Revert': function () {} } },
		'mc Я с отцом — двое в гараже. Чиним старый радиоприёмник 1985-го. Вечно. Сорок второй раз перебираем одну схему.',
		'centered Алексей и Дмитрий Андреевич. Мастерская без выхода.',
		'wait 1000',
		'centered КОНЦОВКА: «ГАРАЖ»',
		'centered Лучший рай для инженера — поломка, которая никогда не чинится до конца.',
		'wait 2000',
		'jump Ending_Credits'
	],
	'Ending_Wheel_Taxi': [
		'show scene night_city with fadeIn',
		{ 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'wheel_taxi' }); }, 'Revert': function () {} } },
		'mc Я водитель такси посмертия. Пассажиры — недавно умершие. Я их везу до Очереди.',
		'mc Каждому даю воды. Каждому — короткий совет.',
		'centered Алексей. Таксист посмертия. Лицензия №7394028417.',
		'wait 1000',
		'centered КОНЦОВКА: «ТАКСИ»',
		'centered Лучшая работа после смерти — провожать чужие пути.',
		'wait 2000',
		'jump Ending_Credits'
	],
	'Ending_Wheel_PostOffice': [
		'show scene hell_office with fadeIn',
		{ 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'wheel_post_office' }); }, 'Revert': function () {} } },
		'mc Я работаю в посмертной почте. Доставляю письма от живых — мёртвым. Каждое — со штампом «адресат не ответит».',
		'centered Алексей. Почтальон от живых к мёртвым.',
		'wait 1000',
		'centered КОНЦОВКА: «ПОЧТА»',
		'centered Каждое непрочитанное письмо — это тот, кому больше нет адресата.',
		'wait 2000',
		'jump Ending_Credits'
	],
	'Ending_Wheel_Bakery': [
		'show scene apartment with fadeIn',
		{ 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'wheel_bakery' }); }, 'Revert': function () {} } },
		'mc Я открыл пекарню. Делаю те самые мамины пироги. По её рецепту. Каждый понедельник — для тех, кто не успел приехать.',
		'centered Алексей. Пекарь сектора Б. Пироги — бесплатно.',
		'wait 1000',
		'centered КОНЦОВКА: «ПИРОГИ ДЛЯ ОПОЗДАВШИХ»',
		'centered Лучшее извинение — это пирог, испечённый после.',
		'wait 2000',
		'jump Ending_Credits'
	],
	'Ending_Wheel_Subway': [
		'show scene #333355 with fadeIn',
		{ 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'wheel_subway' }); }, 'Revert': function () {} } },
		'mc Я машинист посмертного метро. Кольцевая. Без остановок. Бесконечно.',
		'mc В вагонах — все, кто опоздал на свои земные поезда.',
		'centered Алексей. Машинист кольцевой посмертия.',
		'wait 1000',
		'centered КОНЦОВКА: «КОЛЬЦЕВАЯ»',
		'centered Лучшая линия — та, что не заканчивается.',
		'wait 2000',
		'jump Ending_Credits'
	],
	'Ending_Wheel_Helpline': [
		'show scene hell_office with fadeIn',
		{ 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'wheel_helpline' }); }, 'Revert': function () {} } },
		'mc Я оператор телефона доверия для атеистов в аду. Звонят все. Многие не верят, что я существую. Я их понимаю.',
		'centered Алексей. Оператор горячей линии для тех, кто не верил.',
		'wait 1000',
		'centered КОНЦОВКА: «ТЕЛЕФОН ДОВЕРИЯ»',
		'centered Лучший атеист — тот, кто отвечает на звонки.',
		'wait 2000',
		'jump Ending_Credits'
	],
	'Ending_Wheel_Lighthouse': [
		'show scene #114455 with fadeIn',
		{ 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'wheel_lighthouse' }); }, 'Revert': function () {} } },
		'mc Меня поставили смотрителем посмертного маяка. У моря нет берега, но маяк есть.',
		'mc Свет идёт вдаль — для тех, кого ещё не подобрали.',
		'centered Алексей. Смотритель маяка для душ без причала.',
		'wait 1000',
		'centered КОНЦОВКА: «МАЯК»',
		'centered Лучший маяк — тот, что светит для никого.',
		'wait 2000',
		'jump Ending_Credits'
	],
	'Ending_Wheel_NightOwl': [
		'show scene night_city with fadeIn',
		{ 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'wheel_night_owl' }); }, 'Revert': function () {} } },
		'mc Я ночной сторож кладбища. Каждую ночь обхожу могилы.',
		'mc Иногда мёртвые мне машут. Я машу обратно.',
		'centered Алексей. Ночной сторож на собственном кладбище.',
		'wait 1000',
		'centered КОНЦОВКА: «СОВА»',
		'centered Когда стал смотрителем — больше не страшно.',
		'wait 2000',
		'jump Ending_Credits'
	],
	'Ending_Wheel_TimeKeeper': [
		'show scene #553311 with fadeIn',
		{ 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'wheel_time_keeper' }); }, 'Revert': function () {} } },
		'mc Меня поставили хранителем часов. У всех душ есть таймер. Я слежу, чтобы никто его не сбросил.',
		'centered Алексей. Хранитель посмертного времени.',
		'wait 1000',
		'centered КОНЦОВКА: «ХРАНИТЕЛЬ ЧАСОВ»',
		'centered Время — это всё, что осталось у мёртвых.',
		'wait 2000',
		'jump Ending_Credits'
	],
	'Ending_Wheel_Cartographer': [
		'show scene hell_corridor with fadeIn',
		{ 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'wheel_cartographer' }); }, 'Revert': function () {} } },
		'mc Я картограф ада. Рисую карту коридоров. На ней — 4096 дверей и 12 выходов, восемь из которых не работают.',
		'centered Алексей. Картограф. Карта продаётся за два часа памяти.',
		'wait 1000',
		'centered КОНЦОВКА: «КАРТОГРАФ»',
		'centered Лучшая карта — та, которая всё ещё показывает, где ты заблудился.',
		'wait 2000',
		'jump Ending_Credits'
	],
	'Ending_Wheel_Beekeeper': [
		'show scene #cccc66 with fadeIn',
		{ 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'wheel_beekeeper' }); }, 'Revert': function () {} } },
		'mc Я пасечник в раю. Пчёлы делают мёд, который мёртвые отправляют живым во сне.',
		'mc Когда-нибудь твой друг ел этот мёд. Думал, что во сне. А это была посылка.',
		'centered Алексей. Пасечник между мирами.',
		'wait 1000',
		'centered КОНЦОВКА: «ПАСЕЧНИК»',
		'centered Лучшие сны — те, что приходят с мёдом.',
		'wait 2000',
		'jump Ending_Credits'
	],
	'Ending_Wheel_Curator': [
		'show scene hell_library with fadeIn',
		{ 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'wheel_curator' }); }, 'Revert': function () {} } },
		'mc Я куратор музея «Что бы я сделал иначе». Экспонаты — моменты. Билет — одна слеза.',
		'centered Алексей. Куратор музея сожалений.',
		'wait 1000',
		'centered КОНЦОВКА: «МУЗЕЙ»',
		'centered Лучший музей — без конца экспозиции.',
		'wait 2000',
		'jump Ending_Credits'
	],
	'Ending_Wheel_Translator': [
		'show scene hell_office with fadeIn',
		{ 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'wheel_translator' }); }, 'Revert': function () {} } },
		'mc Я переводчик между Богом и атеистами. Бог говорит «верь». Я перевожу «принимай данные без интерпретации». Атеисты соглашаются.',
		'centered Алексей. Технический переводчик между богом и неверующими.',
		'wait 1000',
		'centered КОНЦОВКА: «ПЕРЕВОДЧИК»',
		'centered Лучший миссионер — тот, кто переформатирует Бога в JSON.',
		'wait 2000',
		'jump Ending_Credits'
	],
	'Ending_Wheel_Watchman': [
		'show scene hell_gates with fadeIn',
		{ 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'wheel_watchman' }); }, 'Revert': function () {} } },
		'mc Я стою у врат ада. Не пускаю никого назад. Никого. Это моя работа.',
		'mc Кроме одной души — Юли. Когда она пришла, я открыл.',
		'centered Алексей. Сторож ворот ада с одним исключением.',
		'wait 1000',
		'centered КОНЦОВКА: «СТРАЖНИК С ИСКЛЮЧЕНИЕМ»',
		'centered Каждый страж нарушает правила ровно один раз.',
		'wait 2000',
		'jump Ending_Credits'
	],
	'Ending_Wheel_Florist': [
		'show scene #66aa66 with fadeIn',
		{ 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'wheel_florist' }); }, 'Revert': function () {} } },
		'mc Я флорист на посмертных похоронах. Букеты — из того, что человек обещал и не сделал. Самые красивые получаются у несостоявшихся писателей.',
		'centered Алексей. Флорист несбывшегося.',
		'wait 1000',
		'centered КОНЦОВКА: «ЦВЕТЫ НЕСБЫВШЕГОСЯ»',
		'centered Лучшие букеты — из обещаний.',
		'wait 2000',
		'jump Ending_Credits'
	],
	'Ending_Wheel_Mechanic': [
		'show scene hell_workshop with fadeIn',
		{ 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'wheel_mechanic' }); }, 'Revert': function () {} } },
		'mc Я механик. Чиню сердца. Не метафорически.',
		'mc У меня небольшая мастерская: вход через 4-й коридор, направо. Очередь на четыре вечности вперёд.',
		'centered Алексей. Сердечный механик. Гарантия — конец времени.',
		'wait 1000',
		'centered КОНЦОВКА: «МЕХАНИК СЕРДЕЦ»',
		'centered Лучшая профессия — починять то, что физика не починяет.',
		'wait 2000',
		'jump Ending_Credits'
	],
	'Ending_Wheel_Astronomer': [
		'show scene #000033 with fadeIn',
		{ 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'wheel_astronomer' }); }, 'Revert': function () {} } },
		'mc Я астроном посмертия. Смотрю в небо. Над адом — небо. Странное, но небо.',
		'mc У меня есть телескоп. Я нашёл планету, где не было ада. Никогда.',
		'centered Алексей. Астроном. Открыл планету без посмертия.',
		'wait 1000',
		'centered КОНЦОВКА: «БЕЗ ПОСМЕРТИЯ»',
		'centered Где-то есть мир, где умерев — ты просто умираешь.',
		'wait 2000',
		'jump Ending_Credits'
	],
	'Ending_Wheel_Conductor': [
		'show scene #888844 with fadeIn',
		{ 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'wheel_conductor' }); }, 'Revert': function () {} } },
		'mc Я дирижёр посмертного оркестра. Партитура — биение сердец живых. Они не знают, что играют — я слышу.',
		'centered Алексей. Дирижёр оркестра живых.',
		'wait 1000',
		'centered КОНЦОВКА: «ДИРИЖЁР»',
		'centered Лучший дирижёр — тот, кого музыканты не слышат.',
		'wait 2000',
		'jump Ending_Credits'
	],

	// ==========================================
	// КОМБИНАТОРНЫЕ stat-gated концовки
	// ==========================================
	'Ending_DarkPath': [
		'show scene hell_cauldrons with fadeIn',
		{ 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'dark_path' }); }, 'Revert': function () {} } },
		'mc Жестокость 8+, отрицание 4+. У меня глубокий путь.',
		'g Тебе персональный сектор. С кнопкой «Сбросить». Кнопка отключена.',
		'centered Алексей. Глубокий тёмный путь. Без сброса.',
		'wait 1000',
		'centered КОНЦОВКА: «ТЁМНЫЙ ПУТЬ»',
		'centered Когда выбираешь тёмное — система не оставляет светлых опций.',
		'wait 2000',
		'jump Ending_Credits'
	],
	'Ending_LightPath': [
		'show scene #FFFFFF with fadeIn',
		{ 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'light_path' }); }, 'Revert': function () {} } },
		'mc Эмпатия 10+, юмор 5+, принятие 10+. Светлый путь.',
		'g Тебе небольшой сад. Только тех, кому ты в жизни кивнул.',
		'centered Алексей. Светлый путь. Сад невидимых добрых жестов.',
		'wait 1000',
		'centered КОНЦОВКА: «СВЕТЛЫЙ ПУТЬ»',
		'centered Лучший рай — это сад из мелких добрых жестов.',
		'wait 2000',
		'jump Ending_Credits'
	],
	'Ending_Trickster': [
		'show scene hell_debate_room with fadeIn',
		{ 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'trickster' }); }, 'Revert': function () {} } },
		'mc Юмор 8+, аргумент 7+, бунт 5+. Трикстер.',
		'g Ты Локи нашего отдела. У нас есть для тебя должность: божок мелких неудобств.',
		'mc Я согласен.',
		'centered Алексей. Бог мелких неудобств в иерархии посмертия.',
		'wait 1000',
		'centered КОНЦОВКА: «ТРИКСТЕР»',
		'centered Если ты слишком умный для рая и слишком добрый для ада — ты получаешь должность.',
		'wait 2000',
		'jump Ending_Credits'
	],
	'Ending_LonelyMonk': [
		'show scene #aaaaaa with fadeIn',
		{ 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'lonely_monk' }); }, 'Revert': function () {} } },
		'mc Принятие 15+, бунт 0, неверие 5+. Одинокий монах.',
		'g У нас есть для тебя келья. Тишина. Раз в столетие — собеседник.',
		'centered Алексей. Одинокий монах посмертия.',
		'wait 1000',
		'centered КОНЦОВКА: «МОНАХ-АТЕИСТ»',
		'centered Лучшее монашество — без бога и без послушаний.',
		'wait 2000',
		'jump Ending_Credits'
	],

	// ==========================================
	// СЕКРЕТНЫЕ КОНЦОВКИ (требуют специфических комбо)
	// ==========================================
	'Ending_PuzzleSolver': [
		'show scene hell_corridor with fadeIn',
		{ 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'puzzle_solver' }); }, 'Revert': function () {} } },
		'g Алексей. Ты разгадал все главные пасхалки игры.',
		'mc Я не знал, что это пасхалки.',
		'g Самые лучшие игроки не знают.',
		'centered Алексей. Разгадал все пасхалки. Получил золотой ачивмент.',
		'wait 1000',
		'centered КОНЦОВКА: «100%»',
		'centered Тот, кто разгадал всё — самый одинокий игрок.',
		'wait 2000',
		'jump Ending_Credits'
	],
	'Ending_BugCollector': [
		'show scene hell_server_room with fadeIn',
		{ 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'bug_collector' }); }, 'Revert': function () {} } },
		'mc Я нашёл 12 багов в коде ада. Отправил все. Все приняли.',
		'g Премия — третий ад. Поспокойнее. С функцией паузы.',
		'centered Алексей. QA-инженер ада. 12 принятых багов.',
		'wait 1000',
		'centered КОНЦОВКА: «BUG BOUNTY»',
		'centered У ада тоже есть программа баг-баунти.',
		'wait 2000',
		'jump Ending_Credits'
	],
	'Ending_LoreMaster': [
		'show scene hell_library with fadeIn',
		{ 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'lore_master' }); }, 'Revert': function () {} } },
		'mc Я прочитал AGENTS.md. Я знаю, как должна была пройти моя жизнь по сценарию.',
		'mc И я её прошёл иначе. Сценаристы плакали.',
		'centered Алексей. Прочитал лор-документ. Сломал четвёртую стену.',
		'wait 1000',
		'centered КОНЦОВКА: «LORE-МАСТЕР»',
		'centered Лучший игрок — тот, кто прочитал документацию игры.',
		'wait 2000',
		'jump Ending_Credits'
	],
	'Ending_NoReset': [
		'show scene #FFFFFF with fadeIn',
		{ 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'no_reset' }); }, 'Revert': function () {} } },
		'mc Я не нажал ни одной кнопки «Сброс». За всю игру.',
		'g Это редко. Поздравляю с честным прохождением.',
		'centered Алексей. Прошёл без перезапусков.',
		'wait 1000',
		'centered КОНЦОВКА: «БЕЗ СБРОСА»',
		'centered Самое сложное достижение — пройти один раз, не перезапуская.',
		'wait 2000',
		'jump Ending_Credits'
	],
	'Ending_AllSkipped': [
		'show scene #888888 with fadeIn',
		{ 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'all_skipped' }); }, 'Revert': function () {} } },
		'g Алексей. Ты пропустил весь текст. Каждую реплику.',
		'mc И?',
		'g И всё равно получил концовку. Это интересный профиль игрока.',
		'centered Алексей. Пропустил всё. Получил всё.',
		'wait 1000',
		'centered КОНЦОВКА: «SKIP ALL»',
		'centered Иногда жизнь — это пропустить и посмотреть финал.',
		'wait 2000',
		'jump Ending_Credits'
	],

	// ==========================================
	// ХУКИ
	// ==========================================
	'Expansion_RNG_Hook': [ 'jump Expansion_RNG_Wheel' ],

	// Stat-gated диспетчер: вызывается из StatGate fall_through
	'Expansion_Combo_Gate': [
		{
			'Conditional': {
				'Condition': function () {
					var s = this.storage ();
					if ((s.cruelty_score || 0) >= 8 && (s.denial_count || 0) >= 4) return 'dark';
					if ((s.empathy_shown || 0) >= 10 && (s.humor_used || 0) >= 5 && (s.acceptance_score || 0) >= 10) return 'light';
					if ((s.humor_used || 0) >= 8 && (s.argument_quality || 0) >= 7 && (s.rebellion_score || 0) >= 5) return 'trickster';
					if ((s.acceptance_score || 0) >= 15 && (s.rebellion_score || 0) === 0 && (s.denial_count || 0) >= 5) return 'monk';
					return 'wheel';
				},
				'dark': 'jump Ending_DarkPath',
				'light': 'jump Ending_LightPath',
				'trickster': 'jump Ending_Trickster',
				'monk': 'jump Ending_LonelyMonk',
				'wheel': 'jump Expansion_RNG_Wheel'
			}
		}
	]

});

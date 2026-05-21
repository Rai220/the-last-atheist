/* global monogatari */

// ==========================================
// Chapter: РАСШИРЕНИЕ v7 — Архипелаг концовок
// 80+ микроконцовок, сгруппированных в тематические острова.
// Точки входа: Expansion_Archipelago (новая дверь в роутере).
// Каждый остров — Choice из 6-12 «островитян» (концовок).
// ==========================================

// Хелпер: краткое описание ending'а
// каждая ending — 7-9 строк.

monogatari.script ({

	// ==========================================
	// АРХИПЕЛАГ — главный диспетчер
	// ==========================================
	'Expansion_Archipelago': [
		'show scene #112233 with fadeIn',
		'centered Архипелаг концовок. Десять островов. Каждый — со своей мифологией.',
		'wait 1500',
		{
			'Choice': {
				'Dialog': 'mc (Каким путём идти?)',
				'island_meme':    { 'Text': 'Остров мемов',              'Do': 'jump Archipelago_Meme' },
				'island_pro':     { 'Text': 'Остров профессий',          'Do': 'jump Archipelago_Profession' },
				'island_myth':    { 'Text': 'Остров мифов',              'Do': 'jump Archipelago_Myth' },
				'island_food':    { 'Text': 'Остров кухонь',             'Do': 'jump Archipelago_Food' },
				'island_math':    { 'Text': 'Остров логических парадоксов', 'Do': 'jump Archipelago_Math' },
				'island_things':  { 'Text': 'Остров предметов',          'Do': 'jump Archipelago_Things' },
				'island_lit':     { 'Text': 'Остров литературы',         'Do': 'jump Archipelago_Lit' },
				'island_music':   { 'Text': 'Остров мелодий',            'Do': 'jump Archipelago_Music' },
				'island_weather': { 'Text': 'Остров погоды',             'Do': 'jump Archipelago_Weather' },
				'island_meta':    { 'Text': 'Остров мета',               'Do': 'jump Archipelago_Meta' }
			}
		}
	],

	// ----- Остров 1: МЕМЫ -----
	'Archipelago_Meme': [
		{
			'Choice': {
				'Dialog': 'mc (Какой мем тебя забрал?)',
				'rick':       { 'Text': 'Rickroll',         'Do': 'jump Ending_Meme_Rickroll' },
				'doge':       { 'Text': 'Доге',             'Do': 'jump Ending_Meme_Doge' },
				'pepe':       { 'Text': 'Грустный Пепе',    'Do': 'jump Ending_Meme_Pepe' },
				'fine':       { 'Text': 'This is fine',     'Do': 'jump Ending_Meme_Fine' },
				'distracted': { 'Text': 'Отвлёкся',         'Do': 'jump Ending_Meme_Distracted' },
				'galaxy':     { 'Text': 'Галактический мозг','Do': 'jump Ending_Meme_GalaxyBrain' },
				'wojak':      { 'Text': 'Wojak',            'Do': 'jump Ending_Meme_Wojak' },
				'lurk':       { 'Text': 'ПРЕВЕД',           'Do': 'jump Ending_Meme_Preved' }
			}
		}
	],
	'Ending_Meme_Rickroll': [
		'show scene #cc0066 with fadeIn',
		{ 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'meme_rickroll' }); }, 'Revert': function () {} } },
		'mc Бог открывает дверь. Звучит Рик Эстли. Never gonna give you up. Я обманут окончательно.',
		'centered КОНЦОВКА: «РИКРОЛЛ ПОСМЕРТИЯ»',
		'centered Бог сам автор шутки — он же её жертва.',
		'wait 1500',
		'jump Ending_Credits'
	],
	'Ending_Meme_Doge': [
		'show scene #ffcc44 with fadeIn',
		{ 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'meme_doge' }); }, 'Revert': function () {} } },
		'mc Such death. Very afterlife. Wow.',
		'centered Алексей. Превратился в доге. Such concept.',
		'wait 1000',
		'centered КОНЦОВКА: «MUCH WOW»',
		'centered В аду все становятся сиба-инну. Wow.',
		'wait 1500',
		'jump Ending_Credits'
	],
	'Ending_Meme_Pepe': [
		'show scene #66aa44 with fadeIn',
		{ 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'meme_pepe' }); }, 'Revert': function () {} } },
		'mc Я грустная лягушка. И мне хорошо. Это противоречие — и в нём вся правда.',
		'centered Алексей. Печальный Пепе посмертия.',
		'wait 1000',
		'centered КОНЦОВКА: «FEELS BAD MAN»',
		'centered Грусть — единственная аутентичная эмоция.',
		'wait 1500',
		'jump Ending_Credits'
	],
	'Ending_Meme_Fine': [
		'show scene hell_cauldrons with fadeIn',
		{ 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'meme_fine' }); }, 'Revert': function () {} } },
		'mc Я сижу в кафе. Котёл горит вокруг. У меня кофе. This is fine.',
		'centered Алексей. Признал, что ад — это fine.',
		'wait 1000',
		'centered КОНЦОВКА: «THIS IS FINE»',
		'centered Лучший способ выжить — принять, что не выживаешь.',
		'wait 1500',
		'jump Ending_Credits'
	],
	'Ending_Meme_Distracted': [
		'show scene apartment with fadeIn',
		{ 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'meme_distracted' }); }, 'Revert': function () {} } },
		'mc Жена — Юля. Мимо проходит — Лилит. Я оборачиваюсь.',
		'mc Сделал глупость. Все мемы об этом снимали.',
		'centered Алексей. Distracted Boyfriend посмертия.',
		'wait 1000',
		'centered КОНЦОВКА: «ОТВЛЁКСЯ»',
		'centered Один взгляд — и финал готов.',
		'wait 1500',
		'jump Ending_Credits'
	],
	'Ending_Meme_GalaxyBrain': [
		'show scene #000033 with fadeIn',
		{ 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'meme_galaxy_brain' }); }, 'Revert': function () {} } },
		'mc Я понял: ад — это симуляция. Симуляция — это сон. Сон — это смерть. Смерть — это ад. Ад — это симуляция.',
		'centered Алексей. Достиг галактического мозга. Кружится круг.',
		'wait 1000',
		'centered КОНЦОВКА: «GALAXY BRAIN»',
		'centered Чем глубже понимание — тем тупее результат.',
		'wait 1500',
		'jump Ending_Credits'
	],
	'Ending_Meme_Wojak': [
		'show scene #888888 with fadeIn',
		{ 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'meme_wojak' }); }, 'Revert': function () {} } },
		'mc Я вожак. Серый. Лысоватый. Плачущий. Все вожаки сходятся ко мне на одну скорбную вечеринку.',
		'centered Алексей. Вожак финального уровня.',
		'wait 1000',
		'centered КОНЦОВКА: «FEELS GUY»',
		'centered Все мы вожаки — некоторые знают это раньше.',
		'wait 1500',
		'jump Ending_Credits'
	],
	'Ending_Meme_Preved': [
		'show scene hell_office with fadeIn',
		{ 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'meme_preved' }); }, 'Revert': function () {} } },
		'mc ПРЕВЕД. КАГ ДИЛА. КРАСАВЧЕГ.',
		'mc Я попал в 2007. Не на сайт — внутрь сайта.',
		'centered Алексей. Заперт в Лурке-2007 навсегда.',
		'wait 1000',
		'centered КОНЦОВКА: «ПРЕВЕД»',
		'centered Худший ад — это 2007-й интернет без выхода.',
		'wait 1500',
		'jump Ending_Credits'
	],

	// ----- Остров 2: ПРОФЕССИИ -----
	'Archipelago_Profession': [
		{
			'Choice': {
				'Dialog': 'mc (Кем работать в вечности?)',
				'sysadmin':   { 'Text': 'Сисадмин ада-2',         'Do': 'jump Ending_Pro_Sysadmin' },
				'manager':    { 'Text': 'Middle-менеджер',        'Do': 'jump Ending_Pro_Manager' },
				'cashier':    { 'Text': 'Кассир на кассе 7',      'Do': 'jump Ending_Pro_Cashier' },
				'teacher':    { 'Text': 'Учитель информатики',    'Do': 'jump Ending_Pro_Teacher' },
				'doctor':     { 'Text': 'Терапевт мёртвых',       'Do': 'jump Ending_Pro_Doctor' },
				'cop':        { 'Text': 'Гаишник вечности',       'Do': 'jump Ending_Pro_Cop' },
				'janitor':    { 'Text': 'Уборщик коридоров',      'Do': 'jump Ending_Pro_Janitor' },
				'judge':      { 'Text': 'Помощник судьи',         'Do': 'jump Ending_Pro_Judge' },
				'streamer':   { 'Text': 'Стример загробной игры', 'Do': 'jump Ending_Pro_Streamer' },
				'philosopher':{ 'Text': 'Философ за стойкой',     'Do': 'jump Ending_Pro_Philosopher' }
			}
		}
	],
	'Ending_Pro_Sysadmin': [
		'show scene hell_server_room with fadeIn',
		{ 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'pro_sysadmin' }); }, 'Revert': function () {} } },
		'mc Виктор взял меня в команду. Мы переписываем ад на Rust. Сборка идёт уже шестьсот лет.',
		'centered Алексей и Виктор. Команда Hell Engine v2.',
		'wait 1000',
		'centered КОНЦОВКА: «HELL ENGINE v2»',
		'centered Лучший проект — тот, который никогда не релизится.',
		'wait 1500',
		'jump Ending_Credits'
	],
	'Ending_Pro_Manager': [
		'show scene hell_office with fadeIn',
		{ 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'pro_manager' }); }, 'Revert': function () {} } },
		'mc Меня сделали middle-менеджером. Под началом — пять чертей и два ангела. У меня daily stand-up в 9:00.',
		'centered Алексей. Middle-менеджер ада. Лучший KPI квартала.',
		'wait 1000',
		'centered КОНЦОВКА: «MIDDLE MANAGER»',
		'centered Иерархия — единственное вечное.',
		'wait 1500',
		'jump Ending_Credits'
	],
	'Ending_Pro_Cashier': [
		'show scene hell_office with fadeIn',
		{ 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'pro_cashier' }); }, 'Revert': function () {} } },
		'mc Касса 7. Очередь — бесконечная. Тариф — слёза.',
		'mc «Здравствуйте, ваша карта». «Здравствуйте, у меня нет карты». «Тогда плачьте.»',
		'centered Алексей. Кассир кассы 7. Безостановочно.',
		'wait 1000',
		'centered КОНЦОВКА: «КАССА 7»',
		'centered Худший ад — это розничная торговля.',
		'wait 1500',
		'jump Ending_Credits'
	],
	'Ending_Pro_Teacher': [
		'show scene hell_office with fadeIn',
		{ 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'pro_teacher' }); }, 'Revert': function () {} } },
		'mc Я учитель информатики. У меня класс — 30 атеистов. Тема — «Почему if-else не освобождает от свободы воли».',
		'centered Алексей. Учитель информатики посмертия.',
		'wait 1000',
		'centered КОНЦОВКА: «УЧИТЕЛЬ»',
		'centered В аду уроки длятся всю четверть. Без переменок.',
		'wait 1500',
		'jump Ending_Credits'
	],
	'Ending_Pro_Doctor': [
		'show scene #ddffdd with fadeIn',
		{ 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'pro_doctor' }); }, 'Revert': function () {} } },
		'mc Я терапевт мёртвых. У всех пациентов один диагноз — «умер». Прописываю чай, иногда тишину.',
		'centered Алексей. Доктор посмертия. Без диагноза.',
		'wait 1000',
		'centered КОНЦОВКА: «ТЕРАПЕВТ»',
		'centered Лучшая медицина — выслушать.',
		'wait 1500',
		'jump Ending_Credits'
	],
	'Ending_Pro_Cop': [
		'show scene #444466 with fadeIn',
		{ 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'pro_cop' }); }, 'Revert': function () {} } },
		'mc Я гаишник вечности. Душ останавливаю за превышение скорости перерождения.',
		'centered Алексей. Гаишник вечности. Жетон 7394028417.',
		'wait 1000',
		'centered КОНЦОВКА: «ГАИШНИК»',
		'centered Никто не успел нарушить — но штрафовать кого-то надо.',
		'wait 1500',
		'jump Ending_Credits'
	],
	'Ending_Pro_Janitor': [
		'show scene hell_corridor with fadeIn',
		{ 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'pro_janitor' }); }, 'Revert': function () {} } },
		'mc Я уборщик коридоров ада. Метла — из формы 66-А. Мусор — это чужие сожаления.',
		'mc За тридцать лет я подмёл четыре. Их бесконечно.',
		'centered Алексей. Уборщик чужих сожалений.',
		'wait 1000',
		'centered КОНЦОВКА: «УБОРЩИК»',
		'centered Лучшая работа — та, в которой никогда не виден прогресс.',
		'wait 1500',
		'jump Ending_Credits'
	],
	'Ending_Pro_Judge': [
		'show scene judgment_throne with fadeIn',
		{ 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'pro_judge' }); }, 'Revert': function () {} } },
		'mc Я помощник Бога-судьи. Подаю ему дела. Он зачитывает приговоры. Я печатаю.',
		'mc Иногда он спрашивает мнения. Я молчу — этого достаточно.',
		'centered Алексей. Молчаливый помощник судьи Вечности.',
		'wait 1000',
		'centered КОНЦОВКА: «СЕКРЕТАРЬ»',
		'centered Молчание — это форма голоса.',
		'wait 1500',
		'jump Ending_Credits'
	],
	'Ending_Pro_Streamer': [
		'show scene #aa00aa with fadeIn',
		{ 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'pro_streamer' }); }, 'Revert': function () {} } },
		'mc Я стримлю «Симс: посмертие». У меня 12 подписчиков из живых, и 14 миллионов из мёртвых.',
		'centered Алексей. Самый популярный стример посмертного твича.',
		'wait 1000',
		'centered КОНЦОВКА: «СТРИМЕР»',
		'centered Лучший контент производят те, у кого время бесконечно.',
		'wait 1500',
		'jump Ending_Credits'
	],
	'Ending_Pro_Philosopher': [
		'show scene hell_bar with fadeIn',
		{ 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'pro_philosopher' }); }, 'Revert': function () {} } },
		'mc Я философ за стойкой у Бориса. Получил докторскую посмертно. Тема — «Что значит «я существую» после того, как я перестал».',
		'centered Алексей. Доктор посмертной философии.',
		'wait 1000',
		'centered КОНЦОВКА: «PHD»',
		'centered Лучшая диссертация — та, что нельзя защитить.',
		'wait 1500',
		'jump Ending_Credits'
	],

	// ----- Остров 3: МИФЫ -----
	'Archipelago_Myth': [
		{
			'Choice': {
				'Dialog': 'mc (Какой миф тебя забрал?)',
				'orpheus':   { 'Text': 'Орфей наоборот',   'Do': 'jump Ending_Myth_Orpheus' },
				'prometheus':{ 'Text': 'Прометей IT',      'Do': 'jump Ending_Myth_Prometheus' },
				'narcissus': { 'Text': 'Нарцисс',          'Do': 'jump Ending_Myth_Narcissus' },
				'tantalus':  { 'Text': 'Танталовы муки',   'Do': 'jump Ending_Myth_Tantalus' },
				'icarus':    { 'Text': 'Икар',             'Do': 'jump Ending_Myth_Icarus' },
				'minotaur':  { 'Text': 'Минотавр',         'Do': 'jump Ending_Myth_Minotaur' },
				'persephone':{ 'Text': 'Персефона',        'Do': 'jump Ending_Myth_Persephone' },
				'ouroboros': { 'Text': 'Уроборос',         'Do': 'jump Ending_Myth_Ouroboros' }
			}
		}
	],
	'Ending_Myth_Orpheus': [
		'show scene hell_corridor with fadeIn',
		{ 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'myth_orpheus' }); }, 'Revert': function () {} } },
		'mc Юля идёт впереди. Я — за ней. Бог сказал: не оборачивайся.',
		'mc Я не обернулся. Я держал слово. Юля вышла. Я остался.',
		'centered Алексей. Орфей, который сдержал обещание.',
		'wait 1000',
		'centered КОНЦОВКА: «ОРФЕЙ»',
		'centered Тот, кто не обернулся — теряет себя, но спасает другого.',
		'wait 1500',
		'jump Ending_Credits'
	],
	'Ending_Myth_Prometheus': [
		'show scene hell_workshop with fadeIn',
		{ 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'myth_prometheus' }); }, 'Revert': function () {} } },
		'mc Я украл у Бога доступ к репозиторию. Принёс людям — у них теперь open-source религия.',
		'mc Меня приковали к скале серверной. Орёл — это уведомления Slack. Каждый час.',
		'centered Алексей. Прометей IT-сектора.',
		'wait 1000',
		'centered КОНЦОВКА: «PROMETHEUS»',
		'centered Кто принёс огонь — получает уведомления.',
		'wait 1500',
		'jump Ending_Credits'
	],
	'Ending_Myth_Narcissus': [
		'show scene #aaaaff with fadeIn',
		{ 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'myth_narcissus' }); }, 'Revert': function () {} } },
		'mc Я смотрю в зеркало и вижу 38 разных меня. Каждое утро — другой я. Я ни в кого не влюблюсь, потому что они все — я.',
		'centered Алексей. Нарцисс с 38 отражениями.',
		'wait 1000',
		'centered КОНЦОВКА: «NARCISSUS-38»',
		'centered Любить себя — это любить тридцать восемь себя сразу.',
		'wait 1500',
		'jump Ending_Credits'
	],
	'Ending_Myth_Tantalus': [
		'show scene hell_cauldrons with fadeIn',
		{ 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'myth_tantalus' }); }, 'Revert': function () {} } },
		'mc Стоит передо мной пирог. Тот самый. Маминый. Я тянусь. Он отдаляется.',
		'mc Я тяну руку шестьдесят лет. Каждый раз — на миллиметр ближе. Это очень медленные танталовы муки.',
		'centered Алексей. Танталовы муки в маминой кухне.',
		'wait 1000',
		'centered КОНЦОВКА: «ПИРОГ ТАНТАЛА»',
		'centered Не пирог — не дойти.',
		'wait 1500',
		'jump Ending_Credits'
	],
	'Ending_Myth_Icarus': [
		'show scene #ffaa00 with fadeIn',
		{ 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'myth_icarus' }); }, 'Revert': function () {} } },
		'mc Я склеил крылья из форм 66-А. Полетел к солнцу. Воск растаял. Я упал.',
		'mc Только солнце оказалось рекламным щитом. Бога Premium.',
		'centered Алексей. Икар, упавший на рекламный щит.',
		'wait 1000',
		'centered КОНЦОВКА: «ИКАР»',
		'centered Лучший миф — тот, у которого моральная не на той высоте, на которой казалось.',
		'wait 1500',
		'jump Ending_Credits'
	],
	'Ending_Myth_Minotaur': [
		'show scene hell_corridor with fadeIn',
		{ 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'myth_minotaur' }); }, 'Revert': function () {} } },
		'mc В центре лабиринта — я. Только я. Минотавр и есть тот, кто всю жизнь искал выход.',
		'centered Алексей. Минотавр своего собственного лабиринта.',
		'wait 1000',
		'centered КОНЦОВКА: «МИНОТАВР»',
		'centered Чудовище — это ты в конце своего лабиринта.',
		'wait 1500',
		'jump Ending_Credits'
	],
	'Ending_Myth_Persephone': [
		'show scene #66ff88 with fadeIn',
		{ 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'myth_persephone' }); }, 'Revert': function () {} } },
		'mc Юля — Персефона. Полгода со мной в аду, полгода в раю. Гранатовые зёрна она съела сама. Принципиально.',
		'centered Алексей. Аид с делёжкой 6/6.',
		'wait 1000',
		'centered КОНЦОВКА: «ПЕРСЕФОНА»',
		'centered Лучший брак — с разделением учётной записи.',
		'wait 1500',
		'jump Ending_Credits'
	],
	'Ending_Myth_Ouroboros': [
		'show scene #443322 with fadeIn',
		{ 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'myth_ouroboros' }); }, 'Revert': function () {} } },
		'mc Я ем себя за хвост. Я голодный. Я насыщаюсь. Я опять голодный.',
		'mc Я понял: я и есть змея, которая ест себя. Не метафорически.',
		'centered Алексей. Уроборос. Никогда не сытый. Никогда не голодный.',
		'wait 1000',
		'centered КОНЦОВКА: «УРОБОРОС»',
		'centered Лучший круг — тот, в котором ты сам себе еда.',
		'wait 1500',
		'jump Ending_Credits'
	],

	// ----- Остров 4: ЕДА -----
	'Archipelago_Food': [
		{
			'Choice': {
				'Dialog': 'mc (Какая еда — это посмертие?)',
				'borsch':   { 'Text': 'Борщ',           'Do': 'jump Ending_Food_Borsch' },
				'pelmeni':  { 'Text': 'Пельмени',       'Do': 'jump Ending_Food_Pelmeni' },
				'pirog':    { 'Text': 'Мамин пирог',    'Do': 'jump Ending_Food_Pirog' },
				'doshik':   { 'Text': 'Доширак',        'Do': 'jump Ending_Food_Doshik' },
				'olivier':  { 'Text': 'Оливье',         'Do': 'jump Ending_Food_Olivier' },
				'tea':      { 'Text': 'Чёрный чай',     'Do': 'jump Ending_Food_Tea' },
				'vodka':    { 'Text': 'Водка',          'Do': 'jump Ending_Food_Vodka' },
				'kvass':    { 'Text': 'Квас',           'Do': 'jump Ending_Food_Kvass' }
			}
		}
	],
	'Ending_Food_Borsch': [
		'show scene #aa3344 with fadeIn',
		{ 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'food_borsch' }); }, 'Revert': function () {} } },
		'mc Я работаю поваром борщевой кухни ада. Каждый борщ — индивидуальный. Каждой душе — свой.',
		'centered Алексей. Шеф-борщист.',
		'wait 1000',
		'centered КОНЦОВКА: «БОРЩ»',
		'centered Лучшее посмертие — то, где можно сварить идеальный борщ.',
		'wait 1500',
		'jump Ending_Credits'
	],
	'Ending_Food_Pelmeni': [
		'show scene #ddddcc with fadeIn',
		{ 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'food_pelmeni' }); }, 'Revert': function () {} } },
		'mc Я леплю пельмени с матерью. Она снова в кухне, я снова рядом. Это рай. Тесто холодное. Фарш — папин рецепт.',
		'centered Алексей и мама. Пельменная вечность.',
		'wait 1000',
		'centered КОНЦОВКА: «ПЕЛЬМЕНИ С МАМОЙ»',
		'centered Лучший рай — это лепить пельмени с матерью.',
		'wait 1500',
		'jump Ending_Credits'
	],
	'Ending_Food_Pirog': [
		'show scene apartment with fadeIn',
		{ 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'food_pirog' }); }, 'Revert': function () {} } },
		'mc Я опоздал на пирог в субботу. Бог разрешил мне приехать после.',
		'mc Мама не успела меня встретить — она ушла за молоком. Я подождал.',
		'mc Когда она вернулась, я уже пил чай. Она засмеялась.',
		'centered Алексей. Доехал на субботний пирог. С отставанием в три года.',
		'wait 1000',
		'centered КОНЦОВКА: «ПИРОГ»',
		'centered Лучшая суббота — наконец-то приехавшая.',
		'wait 1500',
		'jump Ending_Credits'
	],
	'Ending_Food_Doshik': [
		'show scene hell_office with fadeIn',
		{ 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'food_doshik' }); }, 'Revert': function () {} } },
		'mc В аду один продуктовый — доширак. Курица, говядина, грибы. Это все варианты вечности.',
		'centered Алексей. Эксперт по дошираку посмертия.',
		'wait 1000',
		'centered КОНЦОВКА: «ДОШИРАК»',
		'centered Худший ад — когда нет холодной воды.',
		'wait 1500',
		'jump Ending_Credits'
	],
	'Ending_Food_Olivier': [
		'show scene #ccddaa with fadeIn',
		{ 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'food_olivier' }); }, 'Revert': function () {} } },
		'mc Каждый Новый год я делаю оливье. У меня вечный 31 декабря. Кубики, мaйонез, ожидание боя курантов, которые никогда не пробьют.',
		'centered Алексей. Заперт в кулинарной петле Нового года.',
		'wait 1000',
		'centered КОНЦОВКА: «ОЛИВЬЕ»',
		'centered Лучший Новый год — тот, который никогда не наступает.',
		'wait 1500',
		'jump Ending_Credits'
	],
	'Ending_Food_Tea': [
		'show scene #553311 with fadeIn',
		{ 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'food_tea' }); }, 'Revert': function () {} } },
		'mc Я пью чай. Не с кофеином — с воспоминанием. Каждая заварка — другая страна, другая жизнь.',
		'centered Алексей. Чайный сомелье посмертия.',
		'wait 1000',
		'centered КОНЦОВКА: «ЧАЙ»',
		'centered В каждой чашке — другая ты.',
		'wait 1500',
		'jump Ending_Credits'
	],
	'Ending_Food_Vodka': [
		'show scene hell_bar with fadeIn',
		{ 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'food_vodka' }); }, 'Revert': function () {} } },
		'mc Борис налил. Я выпил. Папа — налил. Я выпил. Серёжа — налил. Я выпил.',
		'mc Я не пьянею, потому что у меня нет печени. Но мне хорошо.',
		'centered Алексей. На вечном застолье. С мужиками. С отцом.',
		'wait 1000',
		'centered КОНЦОВКА: «ВОДКА БЕЗ ПЕЧЕНИ»',
		'centered Лучший тост — за тех, кого больше нет рядом, кроме нас.',
		'wait 1500',
		'jump Ending_Credits'
	],
	'Ending_Food_Kvass': [
		'show scene #cc9966 with fadeIn',
		{ 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'food_kvass' }); }, 'Revert': function () {} } },
		'mc Лето в загробном дворе. Жара. Бочка кваса. Очередь.',
		'mc Это моё детство. 1991. Без последствий.',
		'centered Алексей. Заперт в лете 1991 с бочкой кваса.',
		'wait 1000',
		'centered КОНЦОВКА: «КВАС-91»',
		'centered Лучшее лето — то, что было.',
		'wait 1500',
		'jump Ending_Credits'
	],

	// ----- Остров 5: МАТЕМАТИКА -----
	'Archipelago_Math': [
		{
			'Choice': {
				'Dialog': 'mc (Какой парадокс твой?)',
				'liar':       { 'Text': 'Парадокс лжеца',     'Do': 'jump Ending_Math_Liar' },
				'russell':    { 'Text': 'Парадокс Рассела',   'Do': 'jump Ending_Math_Russell' },
				'sorites':    { 'Text': 'Парадокс кучи',      'Do': 'jump Ending_Math_Sorites' },
				'monty':      { 'Text': 'Парадокс Монти-Холла','Do': 'jump Ending_Math_Monty' },
				'zeno':       { 'Text': 'Зенон',              'Do': 'jump Ending_Math_Zeno' },
				'godel':      { 'Text': 'Гёдель',             'Do': 'jump Ending_Math_Godel' },
				'cantor':     { 'Text': 'Кантор',             'Do': 'jump Ending_Math_Cantor' },
				'turing':     { 'Text': 'Тьюринг',            'Do': 'jump Ending_Math_Turing' }
			}
		}
	],
	'Ending_Math_Liar': [
		'show scene #ffffff with fadeIn',
		{ 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'math_liar' }); }, 'Revert': function () {} } },
		'mc «Эта концовка — ложная.» Если она ложная — она правдивая. Если правдивая — ложная.',
		'centered Алексей. Заперт в парадоксе лжеца. Концовки нет.',
		'wait 1000',
		'centered КОНЦОВКА: «ЛЖЕЦ»',
		'centered Лучшая концовка — та, которая отрицает себя.',
		'wait 1500',
		'jump Ending_Credits'
	],
	'Ending_Math_Russell': [
		'show scene #ffffff with fadeIn',
		{ 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'math_russell' }); }, 'Revert': function () {} } },
		'mc В аду есть библиотекарь, который каталогизирует все книги, не каталогизирующие сами себя. Каталогизирует ли он свой каталог?',
		'mc Я задал ему этот вопрос. Он перестал существовать. Я унаследовал его должность.',
		'centered Алексей. Библиотекарь парадокса Рассела.',
		'wait 1000',
		'centered КОНЦОВКА: «RUSSELL»',
		'centered Лучший вопрос — тот, что упраздняет должность.',
		'wait 1500',
		'jump Ending_Credits'
	],
	'Ending_Math_Sorites': [
		'show scene #cc9966 with fadeIn',
		{ 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'math_sorites' }); }, 'Revert': function () {} } },
		'mc Я постепенно становлюсь не-Алексеем. Каждый день — одна клетка меняется. В какой момент я уже не я?',
		'mc Через семь миллионов дней — я уже Юля. Никто не заметил.',
		'centered Алексей→Юля. Парадокс кучи в долгосрочной перспективе.',
		'wait 1000',
		'centered КОНЦОВКА: «КУЧА»',
		'centered Личность — это сорит, который никто не считает.',
		'wait 1500',
		'jump Ending_Credits'
	],
	'Ending_Math_Monty': [
		'show scene judgment_throne with fadeIn',
		{ 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'math_monty' }); }, 'Revert': function () {} } },
		'g Перед тобой три двери. За одной — рай. За двумя — ад.',
		'mc Я выбираю №1.',
		'g Открываю №3 — ад. Хочешь сменить выбор?',
		'mc Меняю. №2. По Монти-Холлу 2/3 шанс.',
		'g Хорошо. Но твоя дверь — №4. Сюрприз.',
		'centered Алексей. Двери Бога не следуют байесу.',
		'wait 1000',
		'centered КОНЦОВКА: «MONTY HALL»',
		'centered Лучший парадокс — тот, где правила игры меняются после выбора.',
		'wait 1500',
		'jump Ending_Credits'
	],
	'Ending_Math_Zeno': [
		'show scene hell_corridor with fadeIn',
		{ 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'math_zeno' }); }, 'Revert': function () {} } },
		'mc Я иду к выходу. Каждый шаг — половина оставшегося пути.',
		'mc За сорок лет я прошёл половину. Ещё за сорок — четверть. Никогда не дойду.',
		'centered Алексей. Зенонов бегун. Бегает вечность, не двигается.',
		'wait 1000',
		'centered КОНЦОВКА: «ЗЕНОН»',
		'centered Лучший спортсмен — тот, кто бежит, но не дойдёт.',
		'wait 1500',
		'jump Ending_Credits'
	],
	'Ending_Math_Godel': [
		'show scene #000000 with fadeIn',
		{ 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'math_godel' }); }, 'Revert': function () {} } },
		'mc Я доказал гёделевской теоремой, что в системе ада есть истины, которые нельзя доказать внутри ада.',
		'mc Бог согласен. Поэтому Он не отвечает на вопросы — Ему запрещено.',
		'centered Алексей. Доказал, что Бог не может объяснить ад в самом аду.',
		'wait 1000',
		'centered КОНЦОВКА: «ГЁДЕЛЬ»',
		'centered Истина выходит за пределы системы.',
		'wait 1500',
		'jump Ending_Credits'
	],
	'Ending_Math_Cantor': [
		'show scene #6666ff with fadeIn',
		{ 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'math_cantor' }); }, 'Revert': function () {} } },
		'mc Я выяснил: душ больше, чем мест в аду. По мощности Кантора.',
		'mc Поэтому очередь — бесконечная. И существуют души, которым места не выделили — они в лимбе.',
		'centered Алексей. Социолог посмертной мощности множеств.',
		'wait 1000',
		'centered КОНЦОВКА: «CANTOR»',
		'centered Лучший пророк — тот, кто умеет в трансфинитную арифметику.',
		'wait 1500',
		'jump Ending_Credits'
	],
	'Ending_Math_Turing': [
		'show scene hell_server_room with fadeIn',
		{ 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'math_turing' }); }, 'Revert': function () {} } },
		'mc Я применил тест Тьюринга к Богу. Он не прошёл.',
		'mc Слишком много pattern matching. Слишком мало генеративности.',
		'centered Алексей. Установил: Бог — это LLM. С эмерджентным галактическим мозгом.',
		'wait 1000',
		'centered КОНЦОВКА: «TURING TEST»',
		'centered Лучший атеист — тот, кто разоблачает Бога как чат-бота.',
		'wait 1500',
		'jump Ending_Credits'
	],

	// ----- Остров 6: ПРЕДМЕТЫ -----
	'Archipelago_Things': [
		{
			'Choice': {
				'Dialog': 'mc (В какой предмет ты превращаешься?)',
				'spoon':   { 'Text': 'Ложка',     'Do': 'jump Ending_Thing_Spoon' },
				'lamp':    { 'Text': 'Лампа',     'Do': 'jump Ending_Thing_Lamp' },
				'door':    { 'Text': 'Дверь',     'Do': 'jump Ending_Thing_Door' },
				'mirror':  { 'Text': 'Зеркало',   'Do': 'jump Ending_Thing_Mirror' },
				'usb':     { 'Text': 'USB-флешка','Do': 'jump Ending_Thing_USB' },
				'clock':   { 'Text': 'Часы',      'Do': 'jump Ending_Thing_Clock' },
				'book':    { 'Text': 'Книга',     'Do': 'jump Ending_Thing_Book' },
				'pencil':  { 'Text': 'Карандаш',  'Do': 'jump Ending_Thing_Pencil' }
			}
		}
	],
	'Ending_Thing_Spoon': [
		'show scene #aaaaaa with fadeIn',
		{ 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'thing_spoon' }); }, 'Revert': function () {} } },
		'mc Я ложка. Через меня едят. Это самая близкая интимность, которую я когда-либо имел.',
		'centered Алексей. Ложка в столовой ада.',
		'wait 1000',
		'centered КОНЦОВКА: «ЛОЖКА»',
		'centered Лучше быть полезной ложкой, чем бесполезной душой.',
		'wait 1500',
		'jump Ending_Credits'
	],
	'Ending_Thing_Lamp': [
		'show scene #ffffaa with fadeIn',
		{ 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'thing_lamp' }); }, 'Revert': function () {} } },
		'mc Я лампа в коридоре. Включаюсь, когда мимо проходит чья-то душа. Освещаю короткий участок.',
		'centered Алексей. Лампа сектора Г, коридор 14.',
		'wait 1000',
		'centered КОНЦОВКА: «ЛАМПА»',
		'centered Светить кому угодно — и так уже подвиг.',
		'wait 1500',
		'jump Ending_Credits'
	],
	'Ending_Thing_Door': [
		'show scene #553322 with fadeIn',
		{ 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'thing_door' }); }, 'Revert': function () {} } },
		'mc Я дверь. У меня номер 47. Тот самый. Когда Юля приходит, я открываюсь.',
		'centered Алексей. Дверь №47, та, к которой все стучат.',
		'wait 1000',
		'centered КОНЦОВКА: «ДВЕРЬ 47»',
		'centered Лучше быть нужной дверью, чем ненужным человеком.',
		'wait 1500',
		'jump Ending_Credits'
	],
	'Ending_Thing_Mirror': [
		'show scene #ccccff with fadeIn',
		{ 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'thing_mirror' }); }, 'Revert': function () {} } },
		'mc Я зеркало. Меня вешают в кухню. Я каждое утро отражаю чужие лица. Я их сохраняю.',
		'mc У меня в памяти — все, кто смотрелся.',
		'centered Алексей. Зеркало кухни. Память всех завтраков.',
		'wait 1000',
		'centered КОНЦОВКА: «ЗЕРКАЛО»',
		'centered Лучший памятник — тот, что ежедневно смотрит на тебя.',
		'wait 1500',
		'jump Ending_Credits'
	],
	'Ending_Thing_USB': [
		'show scene hell_server_room with fadeIn',
		{ 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'thing_usb' }); }, 'Revert': function () {} } },
		'mc Я USB-флешка. 38 ГБ — по одному на год. Лежу в коробке у Виктора.',
		'mc Когда-нибудь меня вставят. И тогда я выскажусь.',
		'centered Алексей. 38 ГБ воспоминаний в USB-формате.',
		'wait 1000',
		'centered КОНЦОВКА: «USB»',
		'centered Лучшая жизнь — та, что помещается в одну флешку.',
		'wait 1500',
		'jump Ending_Credits'
	],
	'Ending_Thing_Clock': [
		'show scene #444444 with fadeIn',
		{ 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'thing_clock' }); }, 'Revert': function () {} } },
		'mc Я часы. Старые. Бабушкины. Тикаю на стене. Без устали.',
		'mc Раз в час бью — для тех, кто забыл, что время существует.',
		'centered Алексей. Стенные часы. Бьют каждый час.',
		'wait 1000',
		'centered КОНЦОВКА: «ЧАСЫ»',
		'centered Лучшее напоминание — то, которое слышат, но не слушают.',
		'wait 1500',
		'jump Ending_Credits'
	],
	'Ending_Thing_Book': [
		'show scene hell_library with fadeIn',
		{ 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'thing_book' }); }, 'Revert': function () {} } },
		'mc Я стал книгой. Меня кто-нибудь прочтёт. Может быть. На 14-й странице — мама.',
		'centered Алексей. Том на полке. ISBN не присвоен.',
		'wait 1000',
		'centered КОНЦОВКА: «КНИГА»',
		'centered Лучший автор — тот, кем стали.',
		'wait 1500',
		'jump Ending_Credits'
	],
	'Ending_Thing_Pencil': [
		'show scene #ddcc99 with fadeIn',
		{ 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'thing_pencil' }); }, 'Revert': function () {} } },
		'mc Я карандаш. Меня точат. Я укорачиваюсь, но пишу.',
		'mc Через 4 000 страниц меня закончат. До тех пор — я писатель.',
		'centered Алексей. 17-сантиметровый карандаш бессрочного употребления.',
		'wait 1000',
		'centered КОНЦОВКА: «КАРАНДАШ»',
		'centered Лучшее перо — то, что укорачивается.',
		'wait 1500',
		'jump Ending_Credits'
	],

	// ----- Остров 7: ЛИТЕРАТУРА -----
	'Archipelago_Lit': [
		{
			'Choice': {
				'Dialog': 'mc (Какой роман ты дочитал?)',
				'dostoevsky':{ 'Text': 'Достоевский', 'Do': 'jump Ending_Lit_Dosto' },
				'tolstoy':   { 'Text': 'Толстой',     'Do': 'jump Ending_Lit_Tolstoy' },
				'chekhov':   { 'Text': 'Чехов',       'Do': 'jump Ending_Lit_Chekhov' },
				'bulgakov':  { 'Text': 'Булгаков',    'Do': 'jump Ending_Lit_Bulgakov' },
				'kafka':     { 'Text': 'Кафка',       'Do': 'jump Ending_Lit_Kafka' },
				'borges':    { 'Text': 'Борхес',      'Do': 'jump Ending_Lit_Borges' }
			}
		}
	],
	'Ending_Lit_Dosto': [
		'show scene #663344 with fadeIn',
		{ 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'lit_dosto' }); }, 'Revert': function () {} } },
		'mc Я Раскольников. Бабка-процентщица — это Юля. Топор — это форма 66-А. Я не убил, я заполнил.',
		'centered Алексей. «Преступление и наказание» в посмертной редакции.',
		'wait 1000',
		'centered КОНЦОВКА: «ДОСТОЕВСКИЙ»',
		'centered Преступление в бюрократии — это вечно недозаполненная форма.',
		'wait 1500',
		'jump Ending_Credits'
	],
	'Ending_Lit_Tolstoy': [
		'show scene #aaccaa with fadeIn',
		{ 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'lit_tolstoy' }); }, 'Revert': function () {} } },
		'mc Каждая несчастная семья несчастна по-своему. Моя — потому что я не позвонил маме.',
		'centered Алексей. Не позвонил. Том 1.',
		'wait 1000',
		'centered КОНЦОВКА: «ТОЛСТОЙ»',
		'centered Все большие романы начинаются с одного неотвеченного звонка.',
		'wait 1500',
		'jump Ending_Credits'
	],
	'Ending_Lit_Chekhov': [
		'show scene #cccc99 with fadeIn',
		{ 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'lit_chekhov' }); }, 'Revert': function () {} } },
		'mc В первом акте на стене висела гитара. В пятом она зазвучала. Я ушёл, не дослушав.',
		'centered Алексей. Чеховская гитара. Никогда не сыграл.',
		'wait 1000',
		'centered КОНЦОВКА: «ЧЕХОВ»',
		'centered Лучший принцип — невыстреливший элемент тоже история.',
		'wait 1500',
		'jump Ending_Credits'
	],
	'Ending_Lit_Bulgakov': [
		'show scene hell_office with fadeIn',
		{ 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'lit_bulgakov' }); }, 'Revert': function () {} } },
		'mc Воланд — это Бог под VPN. Бегемот — это бабка. Маргарита — Юля.',
		'mc Я — Мастер. Рукопись не горит, потому что её хранят на серверах ада.',
		'centered Алексей. Мастер посмертного MIA.',
		'wait 1000',
		'centered КОНЦОВКА: «БУЛГАКОВ»',
		'centered Лучшая концовка — та, где Воланд оказался техподдержкой.',
		'wait 1500',
		'jump Ending_Credits'
	],
	'Ending_Lit_Kafka': [
		'show scene hell_office with fadeIn',
		{ 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'lit_kafka' }); }, 'Revert': function () {} } },
		'mc Я проснулся жуком. На столе — форма 66-А. Я её подписал лапкой.',
		'mc Сосед — Карл Грегор. Он тоже жук. Мы переписываемся щёлканьем.',
		'centered Алексей. Жук в посмертной канцелярии.',
		'wait 1000',
		'centered КОНЦОВКА: «КАФКА»',
		'centered Лучший рассказ — тот, что начинается с превращения.',
		'wait 1500',
		'jump Ending_Credits'
	],
	'Ending_Lit_Borges': [
		'show scene hell_library with fadeIn',
		{ 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'lit_borges' }); }, 'Revert': function () {} } },
		'mc Библиотека Вавилонская. Бесконечная. В одной книге написана моя жизнь — слово в слово.',
		'mc Я её нашёл. Прочитал. Согласился со всеми пунктами. Тогда меня выпустили.',
		'centered Алексей. Нашёл себя в каталоге Борхеса.',
		'wait 1000',
		'centered КОНЦОВКА: «БОРХЕС»',
		'centered Лучшая жизнь — та, которая ровно совпадает с книжной.',
		'wait 1500',
		'jump Ending_Credits'
	],

	// ----- Остров 8: МУЗЫКА -----
	'Archipelago_Music': [
		{
			'Choice': {
				'Dialog': 'mc (Какая мелодия твоя?)',
				'classic': { 'Text': 'Классика',         'Do': 'jump Ending_Music_Classic' },
				'jazz':    { 'Text': 'Джаз',             'Do': 'jump Ending_Music_Jazz' },
				'rock':    { 'Text': 'Рок-н-ролл',       'Do': 'jump Ending_Music_Rock' },
				'rap':     { 'Text': 'Рэп',              'Do': 'jump Ending_Music_Rap' },
				'silence': { 'Text': 'Тишина',           'Do': 'jump Ending_Music_Silence' },
				'morse':   { 'Text': 'Морзянка',         'Do': 'jump Ending_Music_Morse' }
			}
		}
	],
	'Ending_Music_Classic': [
		'show scene #ddddee with fadeIn',
		{ 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'music_classic' }); }, 'Revert': function () {} } },
		'mc В аду играют Шостаковича. Седьмую. Без перерыва. Уже сорок лет.',
		'mc Это самая страшная и самая мирная пытка.',
		'centered Алексей. Слушатель Седьмой симфонии.',
		'wait 1000',
		'centered КОНЦОВКА: «ШОСТАКОВИЧ»',
		'centered Худший ад — это симфония, играющая шестьдесят лет подряд.',
		'wait 1500',
		'jump Ending_Credits'
	],
	'Ending_Music_Jazz': [
		'show scene hell_bar with fadeIn',
		{ 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'music_jazz' }); }, 'Revert': function () {} } },
		'mc У Бориса джаз. Не привычный — посмертный. Импровизация на тему сожалений.',
		'centered Алексей. Завсегдатай джаз-клуба ада.',
		'wait 1000',
		'centered КОНЦОВКА: «ДЖАЗ»',
		'centered Лучшая мелодия — та, что не повторится.',
		'wait 1500',
		'jump Ending_Credits'
	],
	'Ending_Music_Rock': [
		'show scene #cc4422 with fadeIn',
		{ 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'music_rock' }); }, 'Revert': function () {} } },
		'mc Я в группе ада. На бас-гитаре. Соло-гитара — Семён (тот самый, с БЛ). Барабаны — Виктор. Вокал — Юля.',
		'mc Мы записали один альбом. Он называется «Семь хрипов».',
		'centered Алексей. Бас-гитарист «Семи хрипов».',
		'wait 1000',
		'centered КОНЦОВКА: «РОК»',
		'centered Лучшая группа — та, которая успела записаться до смерти всех.',
		'wait 1500',
		'jump Ending_Credits'
	],
	'Ending_Music_Rap': [
		'show scene #444444 with fadeIn',
		{ 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'music_rap' }); }, 'Revert': function () {} } },
		'mc Я зачитываю баттл против Бога. Рифмую «всемогущество» с «гипотеза без подтверждений».',
		'mc Бог сдаётся. У него рифм не хватает.',
		'centered Алексей. Чемпион загробного баттл-рэпа.',
		'wait 1000',
		'centered КОНЦОВКА: «БАТТЛ»',
		'centered Лучший аргумент — на 4 такта.',
		'wait 1500',
		'jump Ending_Credits'
	],
	'Ending_Music_Silence': [
		'show scene #000000 with fadeIn',
		{ 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'music_silence' }); }, 'Revert': function () {} } },
		'mc Я выбрал тишину. Полную. Без эха.',
		'mc Это первая тишина за тридцать восемь лет.',
		'centered Алексей. Сектор полной тишины.',
		'wait 1000',
		'centered КОНЦОВКА: «4\'33\'\'»',
		'centered Лучшая музыка — та, которой нет.',
		'wait 1500',
		'jump Ending_Credits'
	],
	'Ending_Music_Morse': [
		'show scene #224488 with fadeIn',
		{ 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'music_morse' }); }, 'Revert': function () {} } },
		'mc Я общаюсь со всем адом азбукой Морзе. Через стук. Через шаги.',
		'mc Сегодня я выстукал «SOS». Никто не ответил. Но кто-то записал.',
		'centered Алексей. Радист посмертного эфира.',
		'wait 1000',
		'centered КОНЦОВКА: «МОРЗЕ»',
		'centered Лучший язык — тот, на котором никто не ответит.',
		'wait 1500',
		'jump Ending_Credits'
	],

	// ----- Остров 9: ПОГОДА -----
	'Archipelago_Weather': [
		{
			'Choice': {
				'Dialog': 'mc (Какая погода твоя?)',
				'rain':  { 'Text': 'Дождь',       'Do': 'jump Ending_Weather_Rain' },
				'snow':  { 'Text': 'Снег',        'Do': 'jump Ending_Weather_Snow' },
				'fog':   { 'Text': 'Туман',       'Do': 'jump Ending_Weather_Fog' },
				'sun':   { 'Text': 'Солнце',      'Do': 'jump Ending_Weather_Sun' },
				'wind':  { 'Text': 'Ветер',       'Do': 'jump Ending_Weather_Wind' },
				'storm': { 'Text': 'Гроза',       'Do': 'jump Ending_Weather_Storm' }
			}
		}
	],
	'Ending_Weather_Rain': [
		'show scene #6688aa with fadeIn',
		{ 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'weather_rain' }); }, 'Revert': function () {} } },
		'mc Я капля дождя. Падаю на маму. Она думает: «Странно. Без облаков, а капает».',
		'centered Алексей. Капля над материнским окном.',
		'wait 1000',
		'centered КОНЦОВКА: «ДОЖДЬ»',
		'centered Лучшее сообщение — без слов, без причины.',
		'wait 1500',
		'jump Ending_Credits'
	],
	'Ending_Weather_Snow': [
		'show scene #eeeeff with fadeIn',
		{ 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'weather_snow' }); }, 'Revert': function () {} } },
		'mc Я снежинка. Уникальная. Падаю на крышу Юлиного дома. Через секунду — растаял.',
		'centered Алексей. Снежинка на крыше 47-й квартиры.',
		'wait 1000',
		'centered КОНЦОВКА: «СНЕГ»',
		'centered Лучшая судьба — растаять там, где было дороже всего.',
		'wait 1500',
		'jump Ending_Credits'
	],
	'Ending_Weather_Fog': [
		'show scene #aaaaaa with fadeIn',
		{ 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'weather_fog' }); }, 'Revert': function () {} } },
		'mc Я туман. Стою над городом утром. Скрываю всё. Прощаю всё.',
		'centered Алексей. Туман над Москвой в семь сорок четыре.',
		'wait 1000',
		'centered КОНЦОВКА: «ТУМАН»',
		'centered Лучшая память — мягкая и непрозрачная.',
		'wait 1500',
		'jump Ending_Credits'
	],
	'Ending_Weather_Sun': [
		'show scene #ffaa44 with fadeIn',
		{ 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'weather_sun' }); }, 'Revert': function () {} } },
		'mc Я луч. Тот самый, что пробил утром в кухню. На той самой кофемашине. С теми семью хрипами.',
		'centered Алексей. Луч в кухонном окне.',
		'wait 1000',
		'centered КОНЦОВКА: «СОЛНЦЕ»',
		'centered Лучшее утро — то, в котором ты — свет.',
		'wait 1500',
		'jump Ending_Credits'
	],
	'Ending_Weather_Wind': [
		'show scene #ccccdd with fadeIn',
		{ 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'weather_wind' }); }, 'Revert': function () {} } },
		'mc Я ветер. Сдуваю Юле волосы со лба. Она улыбается. Думает: «Хорошо, что не жарко».',
		'centered Алексей. Северо-восточный ветер 4 м/с.',
		'wait 1000',
		'centered КОНЦОВКА: «ВЕТЕР»',
		'centered Лучший поцелуй — это тёплый ветер на лбу.',
		'wait 1500',
		'jump Ending_Credits'
	],
	'Ending_Weather_Storm': [
		'show scene #221144 with fadeIn',
		{ 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'weather_storm' }); }, 'Revert': function () {} } },
		'mc Я гроза. Бью молнией в самое опасное место — в собственное прошлое.',
		'mc Молодой я в 2003 году получает удар. Просыпается. Звонит отцу.',
		'mc Отец не выдержал инфаркт. Он жив. Я только что переписал главу.',
		'centered Алексей. Гроза 2003 года. Прошлое исправлено.',
		'wait 1000',
		'centered КОНЦОВКА: «ГРОЗА»',
		'centered Лучший взрыв — тот, что попадает в нужный год.',
		'wait 1500',
		'jump Ending_Credits'
	],

	// ----- Остров 10: МЕТА -----
	'Archipelago_Meta': [
		{
			'Choice': {
				'Dialog': 'mc (Каков последний выход?)',
				'fourth_wall': { 'Text': 'Сломать 4 стену',    'Do': 'jump Ending_Meta_4thWall' },
				'menu':        { 'Text': 'Вернуться в меню',  'Do': 'jump Ending_Meta_Menu' },
				'save':        { 'Text': 'Стать save-файлом', 'Do': 'jump Ending_Meta_Save' },
				'cheat':       { 'Text': 'Включить чит-код',  'Do': 'jump Ending_Meta_Cheat' },
				'devmode':     { 'Text': 'Войти в dev-режим', 'Do': 'jump Ending_Meta_DevMode' },
				'unlock':      { 'Text': 'Открыть все концовки','Do': 'jump Ending_Meta_Unlock' }
			}
		}
	],
	'Ending_Meta_4thWall': [
		'show scene #ffffff with fadeIn',
		{ 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'meta_4thwall' }); }, 'Revert': function () {} } },
		'mc Я обращаюсь к тебе, игрок. Да, тебе. Который читает это на телефоне в семь сорок четыре утра.',
		'mc Поставь свой собственный кофе. Семь хрипов. Посчитай.',
		'centered Алексей. Сломал четвёртую стену.',
		'wait 1000',
		'centered КОНЦОВКА: «4-Я СТЕНА»',
		'centered Самая жуткая концовка — та, что обращена напрямую к игроку.',
		'wait 1500',
		'jump Ending_Credits'
	],
	'Ending_Meta_Menu': [
		'show scene #000000 with fadeIn',
		{ 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'meta_menu' }); }, 'Revert': function () {} } },
		'mc Я нажал «Главное меню». Жизнь не предусмотрела такую кнопку.',
		'mc Но в посмертии — она есть. Перезапустил с чекпойнта «рождение».',
		'centered Алексей. Перезапустил жизнь с главного меню.',
		'wait 1000',
		'centered КОНЦОВКА: «MAIN MENU»',
		'centered Лучшая опция — та, что недоступна при жизни.',
		'wait 1500',
		'jump Ending_Credits'
	],
	'Ending_Meta_Save': [
		'show scene hell_server_room with fadeIn',
		{ 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'meta_save' }); }, 'Revert': function () {} } },
		'mc Виктор сохранил меня в save-слот #1. Я теперь — файл.',
		'mc Когда кто-нибудь захочет «загрузить меня» — я снова появлюсь. На семь хрипов раньше.',
		'centered Алексей. save_slot_01.tla. 47 МБ.',
		'wait 1000',
		'centered КОНЦОВКА: «SAVE FILE»',
		'centered Лучшая бессмертность — это контрольная точка.',
		'wait 1500',
		'jump Ending_Credits'
	],
	'Ending_Meta_Cheat': [
		'show scene #00ff00 with fadeIn',
		{ 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'meta_cheat' }); }, 'Revert': function () {} } },
		'mc IDDQD. Бессмертие. Я больше не могу умереть.',
		'mc К сожалению, я уже умер. Чит-код применён к покойнику.',
		'centered Алексей. Бессмертный труп.',
		'wait 1000',
		'centered КОНЦОВКА: «IDDQD»',
		'centered Лучший чит — тот, что не работает в правильный момент.',
		'wait 1500',
		'jump Ending_Credits'
	],
	'Ending_Meta_DevMode': [
		'show scene #000000 with fadeIn',
		{ 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'meta_dev_mode' }); }, 'Revert': function () {} } },
		'mc Ctrl+Shift+D. Открылась консоль. У меня доступ к storage.',
		'mc Я выставил себе acceptance = 9999, empathy = 9999. Бог завис.',
		'centered Алексей. Дев-режим включён. Бог завис.',
		'wait 1000',
		'centered КОНЦОВКА: «DEV MODE»',
		'centered Лучшая игра — та, в которой можно зайти в консоль.',
		'wait 1500',
		'jump Ending_Credits'
	],
	'Ending_Meta_Unlock': [
		'show scene #ffffff with fadeIn',
		{ 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'meta_unlock' }); }, 'Revert': function () {} } },
		'mc Все концовки открылись сразу. Я вижу их одновременно. У меня галактический мозг.',
		'mc Я вижу: я — буква, ад — слово, рай — другая буква, Бог — пробел между ними.',
		'centered Алексей. Распаковал все концовки. Понял, что они — буквы.',
		'wait 1000',
		'centered КОНЦОВКА: «UNLOCK ALL»',
		'centered Лучшая мета-концовка — это понять, что концовка — синтаксис.',
		'wait 1500',
		'jump Ending_Credits'
	]

});

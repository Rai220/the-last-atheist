/* global monogatari, hellVignette, screenShake, screenGlitch, applyWtfEffects, divineGlow, panicText, updateLifeMeter */

// ==========================================
// Chapter: РАСШИРЕНИЕ (Expansion Pack v1)
// Adds: dozens of new endings, sub-branches, easter eggs, plot twists.
// Hooks: Hell_Breakdown → Expansion_Router; Prologue_* → optional detours;
//        Judgment_Audience → secret options when stats are exotic.
// Conventions: every new ending writes ending_reached and jumps Ending_Credits.
// ==========================================

monogatari.script ({

	// ==========================================
	// EXPANSION ROUTER — единая точка входа из Hell_Breakdown
	// Сюда можно перенаправить игрока из Hell_Breakdown_Normal_Choice
	// по новой опции «Что-то ещё…» — раскрывает целое крыло новых концовок.
	// ==========================================
	'Expansion_Router': [
		'show scene hell_corridor with fadeIn',
		'show character mc normal at center',
		'mc (Сколько ни иди — коридор не кончается. Зато ответвлений всё больше.)',
		'mc (Каждая дверь — отдельный отдел. Каждый отдел — отдельная вечность.)',

		{
			'Choice': {
				'Dialog': 'mc (Куда дальше?)',
				'cafeteria': {
					'Text': 'Дверь с надписью «СТОЛОВАЯ — ОБЕД 13:00»',
					'Do': 'jump Expansion_Cafeteria_Intro'
				},
				'library': {
					'Text': 'Дверь «АРХИВ НЕПРОЧИТАННЫХ МОЛИТВ»',
					'Do': 'jump Expansion_Library_Intro'
				},
				'union': {
					'Text': 'Дверь «ПРОФСОЮЗ ДЕМОНОВ — НЕ ВХОДИТЬ»',
					'Do': 'jump Expansion_Union_Intro'
				},
				'helpdesk': {
					'Text': 'Дверь «IT-ПОДДЕРЖКА АДА»',
					'Do': 'jump Expansion_Helpdesk_Intro'
				},
				'therapy': {
					'Text': 'Дверь «ГРУППА ПОДДЕРЖКИ АТЕИСТОВ»',
					'Do': 'jump Expansion_AtheistGroup_Intro'
				},
				'child': {
					'Text': 'Дверь со стикером единорога — детский сектор?',
					'Do': 'jump Expansion_Child_Intro'
				},
				'father': {
					'Text': 'Дверь с табличкой «ВОЛКОВ Д.А. — ушёл в 2003»',
					'Do': 'jump Expansion_Father_Intro',
					'Condition': function () { return true; }
				},
				'maintenance': {
					'Text': 'Дверь «СЛУЖЕБНОЕ ПОМЕЩЕНИЕ»',
					'Do': 'jump Expansion_Maintenance_Intro'
				},
				'inna_hell': {
					'Text': 'Силуэт в каблуках в дальнем конце коридора',
					'Do': 'jump Expansion_Inna_Intro',
					'Condition': function () { return this.storage ().inna_met; }
				},
				'glitch_door': {
					'Text': 'Дверь, которая мерцает — то «404», то ничего',
					'Do': 'jump Ending_404'
				},
				'overflow_door': {
					'Text': 'Дверь с бесконечной табличкой «вопросы→»',
					'Do': 'jump Ending_StackOverflow',
					'Condition': function () { return this.storage ().humor_used >= 2 || this.storage ().argument_quality >= 3; }
				},
				'kernel_door': {
					'Text': 'Дверь без таблички, за которой слышно «panic»',
					'Do': 'jump Ending_KernelPanic',
					'Condition': function () { return this.storage ().denial_count >= 4 || this.storage ().wtf_level >= 60; }
				},
				'memory_door': {
					'Text': 'Дверь «склад памяти» — здесь записывают всё',
					'Do': 'jump Ending_OutOfMemory',
					'Condition': function () { return this.storage ().argument_quality >= 4; }
				},
				'git_blame_door': {
					'Text': 'Тёмная дверь — за ней Виктор крутит ноутбук',
					'Do': 'jump Ending_GitBlame',
					'Condition': function () { return this.storage ().viktor_met; }
				},
				'bar_door': {
					'Text': 'Бар «Последний атеист» — вход на углу',
					'Do': 'jump Expansion_Bar_Entry'
				},
				'random_encounter': {
					'Text': 'Свернуть наугад — в коридоре никого, кроме шагов',
					'Do': 'jump Expansion_Encounter_Random'
				},
				'loop_door': {
					'Text': 'Дверь, которая выглядит знакомо. Очень знакомо.',
					'Do': 'jump Expansion_Loop_Discovery',
					'Condition': function () { return (this.storage ().matrix_suspicion || 0) >= 5; }
				},
				'admin_door': {
					'Text': 'Дверь без таблички — за ней слышен шум кулера',
					'Do': 'jump Expansion_Final_Doors',
					'Condition': function () { return (this.storage ().matrix_suspicion || 0) >= 8 || (this.storage ().loop_count || 0) >= 1; }
				},
				'just_lilith': {
					'Text': 'Дверь, на которой написано только «Лилит»',
					'Do': 'jump Expansion_Just_Lilith_Alt',
					'Condition': function () { return (this.storage ().lilith_interest || 0) >= 8 && (this.storage ().lilith_trust || 0) >= 3; }
				},
				'yulia_door': {
					'Text': 'Дверь с номером 47 — почему она тут?',
					'Do': 'jump Expansion_Yulia_Door',
					'Condition': function () { return this.storage ().neighbor_met; }
				},
				'granny_door': {
					'Text': 'Дверь, у которой стоит бабка с пакетами',
					'Do': 'jump Expansion_Granny_Arc',
					'Condition': function () { return this.storage ().granny_met; }
				},
				'sisterhood_door': {
					'Text': 'Дверь с табличкой «ЦЕНТР ПОСМЕРТНОЙ ВЗАИМОПОМОЩИ»',
					'Do': 'jump Expansion_TripleAlliance',
					'Condition': function () { var s = this.storage (); return s.neighbor_met && s.granny_met && s.anya_met; }
				},
				'manifesto_door': {
					'Text': 'Дверь, у которой пахнет газетой и чернилами',
					'Do': 'jump Expansion_AtheistManifesto',
					'Condition': function () { var s = this.storage (); return (s.matrix_suspicion || 0) >= 8 && (s.argument_quality || 0) >= 5; }
				},
				'archipelago': {
					'Text': 'Дверь с надписью «АРХИПЕЛАГ» — за ней десять островов',
					'Do': 'jump Expansion_Archipelago'
				},
				'archipelago2': {
					'Text': 'Дверь «ВТОРОЙ АРХИПЕЛАГ» — четырнадцать островов',
					'Do': 'jump Expansion_Archipelago2'
				},
				'archipelago3': {
					'Text': 'Дверь «ТРЕТИЙ АРХИПЕЛАГ» — пятнадцать островов',
					'Do': 'jump Expansion_Archipelago3'
				}
			}
		}
	],

	// ==========================================
	// 1. СТОЛОВАЯ — Кафетерий ада
	// Несколько концовок: Шеф, Меню, Бунт через еду
	// ==========================================
	'Expansion_Cafeteria_Intro': [
		'show scene hell_cafeteria with fadeIn',
		'mc (Это... кафетерий. С подносами. С раздачей. С табличкой «суп дня — серная похлёбка».)',
		'mc (Ад с обедом. Конечно. А почему бы и нет.)',

		'show character demon smile at right with fadeIn',
		'demon Подойдите к раздаче. Очередь стандартная.',
		'mc Меня будут кормить? В аду?',
		'demon Конечно. Голод — это пытка. А пытка — это форма терапии. Поэтому — кормим.',
		'mc (Слышал бы это диетолог.)',

		'centered МЕНЮ',
		'centered • Серная похлёбка (классика)',
		'centered • Безвкусная каша (вторник)',
		'centered • Десерт «Конфета жизни» — кончается ровно в момент, когда нравится',
		'centered • Кофе. Без кофеина. Из принципа.',
		'wait 1200',

		{
			'Choice': {
				'Dialog': 'mc (Что выбрать?)',
				'soup': {
					'Text': 'Серная похлёбка',
					'Do': 'jump Expansion_Cafeteria_Soup'
				},
				'candy': {
					'Text': '«Конфета жизни»',
					'Do': 'jump Expansion_Cafeteria_Candy'
				},
				'coffee': {
					'Text': 'Кофе без кофеина',
					'Do': 'jump Expansion_Cafeteria_Coffee'
				},
				'chef': {
					'Text': 'Спросить, кто шеф',
					'Do': 'jump Expansion_Cafeteria_Chef'
				}
			}
		}
	],

	'Expansion_Cafeteria_Soup': [
		'mc Серную, пожалуйста. Раз уж бренд.',
		'demon Хороший выбор. Острая. Как сарказм.',
		'Поднос. Тарелка. Дымится. Запах — действительно сера, но с нотками паприки.',
		'mc (Я ем серную похлёбку в аду. На этом моменте моя биография окончательно сломалась.)',

		'show character soul resigned at left with fadeIn',
		'soul Вы новенький? Вон тот столик у окна — наш. Атеистов.',
		'mc У окна... в аду есть окна?',
		'soul Есть. Только за ними — другой ад. Не очень помогает.',
		'mc (Это, кажется, самое точное описание зрелого возраста, которое я слышал.)',
		'jump Expansion_Cafeteria_Table'
	],

	'Expansion_Cafeteria_Candy': [
		'mc Дайте «Конфету жизни». Хочется иронии.',
		'demon Имейте в виду — она заканчивается ровно тогда, когда становится вкусной.',
		'mc (Это буквально вся моя жизнь.)',
		'demon Поэтому она здесь и продаётся. С 30-процентной скидкой для умерших.',
		'mc (Скидка для умерших. Лучший слоган маркетинга.)',
		'Алексей разворачивает обёртку. Сладко. По-настоящему сладко.',
		'И — пусто. Как и было обещано.',
		'mc (Окей. Это работает на уровне метафоры. Признаю.)',
		'jump Expansion_Cafeteria_Table'
	],

	'Expansion_Cafeteria_Coffee': [
		'mc Кофе. Без кофеина. Из принципа.',
		'demon Уважаю выбор. Самый адский напиток. Запах есть — эффекта нет.',
		'mc (Как обещание утренней пробежки.)',
		'Алексей делает глоток. Тёплый. Никакой бодрости. Ни единой.',
		'mc (...а это... это что-то новое. Это спокойствие?)',
		'demon Не путайте. Это не спокойствие. Это отсутствие надежды на бодрость.',
		'mc (Поправка принята.)',
		'jump Expansion_Cafeteria_Table'
	],

	'Expansion_Cafeteria_Chef': [
		'mc А кто у вас шеф? Я хочу пожаловаться на меню.',
		'demon Шеф — Гордон. Бывший земной повар. Умер от собственного крика на самого себя.',
		'mc Гордон... Рамзи?',
		'demon Я не уполномочен подтверждать.',

		'show character chef angry at right with fadeIn',
		'chef ВЫ! Идите сюда! Я слышал — «жаловаться»?',
		'mc Ну...',
		'chef СОВЕРШЕННО. БЕСПОЛЕЗНОЕ. МЕНЮ.',
		'chef Я готовлю это уже четыреста лет, и каждый раз — одно и то же. Серная похлёбка. КАША. И КОНФЕТА.',
		'mc Так смените меню.',
		'chef ВЫ ДУМАЕТЕ, Я НЕ ПЫТАЛСЯ?! У них есть форма! ФОРМА 66-А! Для смены пункта меню!',
		'chef Я заполнил её. ТЫСЯЧУ. РАЗ. Каждый раз — отклоняют.',
		'mc Покажите.',
		'jump Expansion_Cafeteria_Form'
	],

	'Expansion_Cafeteria_Form': [
		'Шеф протягивает форму. Алексей читает.',
		'centered ФОРМА 66-А (Питание)',
		'centered Графа 14: «Предлагаемый продукт».',
		'centered Графа 14.2: «Обоснование: продукт улучшит моральный дух душ».',
		'centered Графа 14.3 (мелкий шрифт): «Моральный дух душ не подлежит улучшению согласно п.1.»',
		'wait 1500',
		'mc Это catch-22.',
		'chef Я ЗНАЮ.',
		'mc Подождите. Графа 14.2 требует обосновать через моральный дух. А 14.3 запрещает моральный дух улучшать.',
		'mc Но что, если обосновать через **снижение** морального духа? «Новое блюдо будет ещё хуже»?',
		'chef ...',
		'chef ВЫ. ГЕНИЙ.',

		{
			'Function': {
				'Apply': function () {
					var s = this.storage ();
					this.storage ({
						argument_quality: s.argument_quality + 2,
						humor_used: s.humor_used + 1,
						demon_friendship: s.demon_friendship + 1
					});
				},
				'Revert': function () {}
			}
		},
		'jump Expansion_Cafeteria_Revolt'
	],

	'Expansion_Cafeteria_Revolt': [
		'Шеф заполняет форму с диким энтузиазмом. Подмышки потеют. В аду.',
		'chef «Предлагаемый продукт: ризотто с трюфелями. Обоснование: улучшит вкус, ухудшит ожидания, итого — моральный дух СНИЗИТСЯ».',
		'demon ...Зачтено. Удивительно, но зачтено.',
		'mc Я только что добавил в ад итальянскую кухню. Это моё лучшее достижение за смерть.',

		'show character chef happy at right',
		'chef ВЫ остаётесь. ЗДЕСЬ. У меня. Помощником.',
		'mc Простите, помощником шефа в аду?',
		'chef ОПЛАТА — БЕЗВРЕМЕНЬЕ. ОТПУСК — НИКОГДА. КОЛЛЕКТИВ — МЁРТВЫЙ.',
		'mc ...Это лучшее предложение со времён собеседования.',
		'jump Ending_HellChef'
	],

	'Expansion_Cafeteria_Table': [
		'Алексей садится у окна. За окном — действительно другой ад. С костями. И с одинаковыми менеджерами.',
		'mc (Стоп. У них на бейджиках написано «Senior». Это что — IT-отдел отдельно даже от ада?)',

		'show character soul tired at left with fadeIn',
		'soul Вы за этим столом впервые. Я введу в курс. Меня зовут Олег. Я умер от спора в комментариях.',
		'mc ...Реально?',
		'soul Доказывал кому-то, что виски лучше пива. Сердце не выдержало напряжения дебатов.',
		'mc (Знакомо.)',

		'show character soul2 sad at right with fadeIn',
		'soul2 Я — Маша. Я тут с 1997. Умерла, доказывая родителям, что Гарри Поттер — это нормально читать.',
		'mc Это... довольно мирный аргумент?',
		'soul2 У меня были очень религиозные родители.',
		'mc (Понял.)',

		{
			'Choice': {
				'Dialog': 'mc (О чём говорить за этим столом вечности?)',
				'manifesto': {
					'Text': 'Предложить идею манифеста',
					'Do': 'jump Expansion_Cafeteria_Manifesto'
				},
				'oleg_drink': {
					'Text': 'Спросить Олега, что было в стакане',
					'Do': 'jump Expansion_Cafeteria_Oleg'
				},
				'masha_book': {
					'Text': 'Спросить Машу, любит ли она Гарри Поттера до сих пор',
					'Do': 'jump Expansion_Cafeteria_Masha'
				},
				'silent': {
					'Text': 'Молча есть',
					'Do': 'jump Expansion_Cafeteria_Silent'
				}
			}
		}
	],

	'Expansion_Cafeteria_Manifesto': [
		'mc Предлагаю простую вещь. Манифест. На салфетке.',
		'mc Пункт первый: мы признаём, что нас сюда поместил кто-то, кто не любит атеистов.',
		'mc Пункт второй: мы не уйдём отсюда, пока не докажем — это симуляция.',
		'mc Пункт третий: обед в час дня.',
		'soul Третий мне нравится.',
		'soul2 А зачем доказывать? Тут уже всё. Конец.',
		'mc Затем, что без доказательств вы — буддистка, которая попала в христианский ад. А с доказательствами вы — буддистка, которая попала в БАГ.',

		{
			'Function': {
				'Apply': function () {
					var s = this.storage ();
					this.storage ({
						argument_quality: s.argument_quality + 1,
						matrix_suspicion: s.matrix_suspicion + 2,
						rebellion_score: s.rebellion_score + 1
					});
				},
				'Revert': function () {}
			}
		},

		'soul ...Хочешь манифест? Подпишусь.',
		'soul2 Я тоже. Из принципа.',
		'mc (Я только что собрал кружок атеистов-революционеров в столовой ада. Это моё лучшее достижение.)',
		'jump Expansion_Cafeteria_Manifesto_End'
	],

	'Expansion_Cafeteria_Manifesto_End': [
		'mc (Я мог бы остаться. Возглавить. Стать первым лидером движения.)',
		'mc (Или уйти дальше — туда, где есть ещё двери, которые я не открыл.)',

		{
			'Choice': {
				'Dialog': 'mc (Что важнее?)',
				'stay': {
					'Text': '«Я остаюсь. Это моя столовая.»',
					'Do': 'jump Ending_CafeteriaLeader'
				},
				'leave': {
					'Text': '«Я пойду дальше. Возвращайтесь к супу — я приду с ответами.»',
					'Do': 'jump Expansion_Router'
				}
			}
		}
	],

	'Expansion_Cafeteria_Oleg': [
		'mc Олег, что было в стакане? Я по работе спрашиваю.',
		'soul Виски. Восьмилетний. С другом, который доказывал, что пиво — народный напиток.',
		'soul В какой-то момент я начал писать «нэт» вместо «нет», потому что устал.',
		'soul Потом написал «нэт никода», и в этот момент сердце сказало «всё».',
		'mc Сильно.',
		'soul Я думаю, меня убила собственная орфография. На седьмом часу.',
		'mc (Это самая адекватная смерть, которую я слышал.)',

		{
			'Function': {
				'Apply': function () {
					var s = this.storage ();
					this.storage ({ humor_used: s.humor_used + 1 });
				},
				'Revert': function () {}
			}
		},

		'jump Expansion_Cafeteria_Table_Cont'
	],

	'Expansion_Cafeteria_Masha': [
		'mc Маша, а вы Гарри Поттера до сих пор...',
		'soul2 Перечитываю. Каждую вечность.',
		'soul2 Тут есть библиотека. Маленькая. В ней только одна книга.',
		'mc Дайте угадаю.',
		'soul2 «Философский камень». Только первая часть. И только до главы 7.',
		'mc Это специально?',
		'soul2 Никто не знает. Шестая глава заканчивается на сцене с распределяющей шляпой. Это, наверное, самое адское место в книге.',
		'mc (Они сделали ад через cliff-hanger. Это талант.)',

		{
			'Function': {
				'Apply': function () {
					var s = this.storage ();
					this.storage ({ matrix_suspicion: s.matrix_suspicion + 1 });
				},
				'Revert': function () {}
			}
		},

		'jump Expansion_Cafeteria_Table_Cont'
	],

	'Expansion_Cafeteria_Silent': [
		'Алексей ест молча. Серная похлёбка — действительно острая. Сера и паприка работают вместе на удивление неплохо.',
		'mc (Я думал, ад будет криком. Оказалось — пережёвыванием.)',
		'mc (Никогда не верил, что молчание — лучший ответ. Но молчание в столовой ада — это, кажется, медитация.)',

		{
			'Function': {
				'Apply': function () {
					var s = this.storage ();
					this.storage ({
						acceptance_score: s.acceptance_score + 2,
						life_current: Math.min (s.life_max, s.life_current + 1)
					});
					if (typeof updateLifeMeter === 'function') {
						updateLifeMeter (Math.min (s.life_max, s.life_current + 1), s.life_max);
					}
				},
				'Revert': function () {}
			}
		},

		'jump Expansion_Cafeteria_Table_Cont'
	],

	'Expansion_Cafeteria_Table_Cont': [
		'Доедают. Поднос на ленту. Очередь рассеивается.',
		'mc (Это был самый странный обед в моей не-жизни.)',
		'jump Expansion_Router'
	],

	// ==========================================
	// 2. БИБЛИОТЕКА НЕПРОЧИТАННЫХ МОЛИТВ
	// ==========================================
	'Expansion_Library_Intro': [
		'show scene hell_library with fadeIn',
		'mc (Книги. Бесконечные книги. На корешках — имена.)',
		'mc (Не книги. Письма. Молитвы. Каждая — кому-то, кто не услышал.)',

		'show character archivist tired at right with fadeIn',
		'archivist Тише. Здесь читают.',
		'mc Кто?',
		'archivist Они. Те, кому молились. И никогда не отвечали. Они сюда приходят... читать.',
		'mc Бог?',
		'archivist Бывает. Но больше — другие. Деды. Бабки. Утраченные сыновья. Жёны. Подростки. Все, кому посылали молитвы как бутылки в океан.',

		'mc (Это не библиотека. Это служба «недоставленных».)',

		{
			'Choice': {
				'Dialog': 'mc (Что искать?)',
				'mother': {
					'Text': 'Молитвы моей матери',
					'Do': 'jump Expansion_Library_Mother',
					'Condition': function () { return this.storage ().mother_called || this.storage ().mother_promise || this.storage ().mother_lied; }
				},
				'sergey': {
					'Text': 'Молитвы Серёжи (за меня)',
					'Do': 'jump Expansion_Library_Sergey'
				},
				'mine': {
					'Text': 'Поискать что-нибудь под фамилией «Волков»',
					'Do': 'jump Expansion_Library_Self'
				},
				'random': {
					'Text': 'Открыть наугад',
					'Do': 'jump Expansion_Library_Random'
				}
			}
		}
	],

	'Expansion_Library_Mother': [
		'Алексей идёт по третьему ряду. Книги выше человеческого роста.',
		'На корешке: «Волкова Е.С. — для сына». Том первый из... сорока.',
		'mc (Сорок томов. Она писала мне молитвы сорок лет.)',
		'Алексей открывает том двадцатый. Случайная страница.',
		'centered «Пусть он не один. Пусть найдёт девушку. Пусть позвонит хотя бы раз в неделю. Я не прошу веры — я прошу звонка.»',
		'wait 1200',
		'mc ...',
		'mc (Она просила не о вере. О звонках.)',
		'mc (А я даже звонков не давал.)',

		{
			'Function': {
				'Apply': function () {
					var s = this.storage ();
					this.storage ({
						empathy_shown: s.empathy_shown + 2,
						acceptance_score: s.acceptance_score + 2
					});
				},
				'Revert': function () {}
			}
		},

		'Алексей долго стоит. Не плачет — у него больше нет глаз для слёз. Но что-то в груди, которой у него тоже нет, тянет.',

		'archivist Хотите взять том? Можно. Только наружу не вынести.',
		'mc Я возьму. Прочту здесь. Всё.',

		{
			'Choice': {
				'Dialog': 'mc (И что потом?)',
				'stay_read': {
					'Text': 'Сесть и читать. Все сорок томов.',
					'Do': 'jump Ending_Library_Read'
				},
				'mark_one': {
					'Text': 'Заложить именно том с просьбой о звонке. Вернуться позже.',
					'Do': 'jump Expansion_Library_Mark'
				}
			}
		}
	],

	'Expansion_Library_Mark': [
		'Алексей вкладывает закладку — серную, кафетериевскую — на 14-ю страницу 20-го тома.',
		'mc (Если выберусь — позвоню первый. Не на работу. Просто позвоню.)',

		{
			'Function': {
				'Apply': function () {
					var s = this.storage ();
					this.storage ({
						mother_marked: true,
						empathy_shown: s.empathy_shown + 1
					});
				},
				'Revert': function () {}
			}
		},

		'jump Expansion_Router'
	],

	'Expansion_Library_Sergey': [
		'mc Я ищу молитвы Серёжи. За меня.',
		'archivist ...',
		'archivist Это очень полная подборка.',
		'mc Полная?',
		'archivist Двенадцать томов. Один раз в день. Двенадцать лет. С того момента, как вы перестали с ним разговаривать.',

		'Алексей открывает шестой том. Дата — 2018, осень.',
		'centered «Боже, пусть Алёшке станет легче. Он опять написал злой комментарий. Это от обиды, я знаю. Он добрый. Просто устал быть добрым.»',
		'wait 1200',
		'mc (Он молился за меня, потому что считал, что я устал быть добрым.)',
		'mc (А я считал, что я просто умнее всех.)',

		{
			'Function': {
				'Apply': function () {
					var s = this.storage ();
					this.storage ({
						empathy_shown: s.empathy_shown + 2,
						sergey_witness_seen: true
					});
				},
				'Revert': function () {}
			}
		},

		'mc (Окей. Серёжа. Если есть шанс хотя бы переписать своё имя в твоём томе — я хочу его попробовать.)',
		'jump Expansion_Library_Sergey_Choice'
	],

	'Expansion_Library_Sergey_Choice': [
		{
			'Choice': {
				'Dialog': 'mc (Что сделать с томом?)',
				'add_letter': {
					'Text': 'Вложить туда своё письмо Серёже',
					'Do': 'jump Ending_LetterToSergey'
				},
				'read_all': {
					'Text': 'Прочитать все двенадцать. От корки до корки.',
					'Do': 'jump Ending_Library_Read'
				},
				'return': {
					'Text': 'Поставить на полку. Найти выход.',
					'Do': 'jump Expansion_Router'
				}
			}
		}
	],

	'Expansion_Library_Self': [
		'Алексей идёт к стеллажу на «В».',
		'mc (Волков... Волков...)',
		'archivist Под фамилией «Волков» в этой библиотеке — три тома.',
		'mc Три? От кого?',
		'archivist От вашего отца. Дмитрия Андреевича.',

		'Алексей замирает.',
		'mc Отец умер, когда мне было пятнадцать. Он не молился. Никогда.',
		'archivist Он не молился вслух. Но в этом библиотеке хранятся не только молитвы вслух.',
		'archivist Все непроизнесённые тоже здесь.',

		'mc (Три тома непроизнесённых молитв от моего атеиста-отца. Это... это что-то новое.)',
		'jump Expansion_Library_Self_Open'
	],

	'Expansion_Library_Self_Open': [
		'Алексей открывает первый том. 1985. Год его рождения.',
		'centered «Только бы он был жив. Только бы он был здоров. Я не знаю, кому я это говорю, но пусть он будет жив.»',
		'wait 1200',
		'mc ...',
		'centered «Я понял, что не знаю, как с ним говорить. Он смеётся над моими шутками, и я не понимаю, искренне или из вежливости. Я люблю его. Я не умею это сказать.»',
		'wait 1200',
		'centered «Если что-то есть там — береги его, когда меня не будет. Я не успею.»',
		'wait 1500',

		'mc (Папа... тоже не верил. И тоже... молился. На свой манер.)',
		'mc (Я всю жизнь думал, что унаследовал от него только характер. А унаследовал, кажется, и эту тишину.)',

		{
			'Function': {
				'Apply': function () {
					var s = this.storage ();
					this.storage ({
						father_letters_read: true,
						empathy_shown: s.empathy_shown + 3,
						acceptance_score: s.acceptance_score + 2,
						matrix_suspicion: s.matrix_suspicion + 1
					});
				},
				'Revert': function () {}
			}
		},

		'jump Expansion_Library_Self_Choice'
	],

	'Expansion_Library_Self_Choice': [
		{
			'Choice': {
				'Dialog': 'mc (Что теперь?)',
				'find_father': {
					'Text': 'Я хочу найти его. Где он сейчас?',
					'Do': 'jump Expansion_Father_Intro'
				},
				'write_back': {
					'Text': 'Вписать ответ в его тетрадь',
					'Do': 'jump Ending_FatherReply'
				},
				'close': {
					'Text': 'Закрыть. Я не готов.',
					'Do': 'jump Expansion_Router'
				}
			}
		}
	],

	'Expansion_Library_Random': [
		'Алексей берёт книгу с шестой полки наугад.',
		'На корешке: «Хокинг С. У. — невысказанные просьбы».',
		'mc Стивен Хокинг? У него тут том?',
		'archivist У каждого, кто очень настойчиво НЕ молился, тут есть том.',
		'archivist Чем громче отрицание — тем толще том.',

		'mc (Это... ловушка для атеистов? Записывать то, что мы НЕ сказали?)',
		'Алексей открывает наугад.',
		'centered «Если ты есть — поясни. Не за себя. За мою дочь.»',
		'wait 1200',
		'mc (Чёрт. Чёрт, Стивен.)',

		{
			'Function': {
				'Apply': function () {
					var s = this.storage ();
					this.storage ({
						matrix_suspicion: s.matrix_suspicion + 2,
						empathy_shown: s.empathy_shown + 1
					});
				},
				'Revert': function () {}
			}
		},

		'archivist Ищите свой?',
		'mc Под «В»? У меня тоже том?',
		'archivist Конечно. Самый толстый в секции. Тридцать восемь томов. По одному на каждый год жизни.',
		'mc Тридцать восемь?!',
		'archivist Один год — один том. Невысказанных просьб. К тому, кого, как вы утверждали, нет.',

		'mc (...)',
		'jump Expansion_Library_Selfbook'
	],

	'Expansion_Library_Selfbook': [
		'mc (Я хочу его открыть. Хотя бы один том. Тот, что про 2018-й.)',
		'Алексей берёт том. Открывает наугад.',
		'centered «Если ты есть — пусть мама хоть раз пройдёт обследование без диагноза. Я не буду требовать большего.»',
		'wait 1200',
		'centered «Если ты есть — пусть Серёжа перестанет на меня обижаться. Я знаю, я виноват.»',
		'wait 1200',
		'centered «Если ты есть — пусть я хоть раз пойму, что я живу не зря.»',
		'wait 1500',

		'mc (Я писал это, не зная, что писал.)',
		'mc (Тридцать восемь томов. Я просил Тебя помочь мне всю жизнь. Просто никогда не вслух.)',

		{
			'Function': {
				'Apply': function () {
					var s = this.storage ();
					this.storage ({
						matrix_suspicion: Math.min (10, s.matrix_suspicion + 3),
						empathy_shown: s.empathy_shown + 2,
						acceptance_score: s.acceptance_score + 2,
						unspoken_prayers_read: true
					});
				},
				'Revert': function () {}
			}
		},

		'jump Ending_UnspokenPrayers'
	],

	// ==========================================
	// 3. ПРОФСОЮЗ ДЕМОНОВ
	// ==========================================
	'Expansion_Union_Intro': [
		'show scene hell_union with fadeIn',
		'mc (Демоны. Сидят. В кругу. На стульях. С табличками на груди — «председатель», «секретарь», «жалобщик».)',

		'show character demon angry at center with fadeIn',
		'demon Кто это? Кто пустил?',
		'mc Я сам пустил. Я атеист, и я тут случайно. Вы — профсоюз?',
		'demon Стихийный. Незарегистрированный. Бог не одобряет.',
		'mc Так это удобно. Я тоже не одобряю Бога. Я могу присоединиться?',

		'Демон пристально смотрит. Молчание. Потом — кивок.',
		'demon ...Заинтересовали. Что вы можете предложить профсоюзу?',

		{
			'Choice': {
				'Dialog': 'mc (Что предложить демонам?)',
				'strike': {
					'Text': 'Забастовку: «Все котлы стоп».',
					'Do': 'jump Expansion_Union_Strike'
				},
				'wages': {
					'Text': 'Переговоры по «зарплате» (Бог не платит — это нонсенс).',
					'Do': 'jump Expansion_Union_Wages'
				},
				'merger': {
					'Text': 'Слияние с профсоюзом грешников.',
					'Do': 'jump Expansion_Union_Merger'
				},
				'pension': {
					'Text': 'Пенсионную программу для демонов.',
					'Do': 'jump Expansion_Union_Pension'
				}
			}
		}
	],

	'Expansion_Union_Strike': [
		'mc Бастуем. Все котлы — стоп. Все формы 66-А — на стол. Без обработки.',
		'demon Это... радикально.',
		'mc Это бизнес. Если котлы стоят — Бог нанимает посредника. Посредник — мы.',
		'demon ...Мы?',
		'mc Я и вы. Я — представитель грешников. Вы — представитель демонов. Мы садимся за стол. Мы выторговываем условия.',

		'Демоны переглядываются. Один шепчет: «Этот думает, что у нас есть условия...»',
		'Другой: «У нас даже сменного графика нет!»',
		'Третий: «У нас даже КОФЕ нет!»',

		{
			'Function': {
				'Apply': function () {
					var s = this.storage ();
					this.storage ({
						rebellion_score: s.rebellion_score + 3,
						argument_quality: s.argument_quality + 2,
						demon_friendship: Math.min (10, s.demon_friendship + 3)
					});
				},
				'Revert': function () {}
			}
		},

		'demon Голосуем. Кто за забастовку — поднять трезубец.',
		'Триста семьдесят шесть трезубцев поднимаются. Триста семьдесят шесть. Я их посчитал.',
		'mc (Я только что организовал первую профсоюзную забастовку в аду. На моём бейджике написать «организатор» — мало, надо «провокатор».)',
		'jump Ending_HellStrike'
	],

	'Expansion_Union_Wages': [
		'mc Слушайте. Бог не платит вам зарплату. Это рабство. Я могу составить иск.',
		'demon Иск кому? Богу?',
		'mc В Гаагу. В МОТ. В ООН. Куда угодно. Главное — оформить.',
		'demon Эти инстанции не имеют юрисдикции над загробным миром.',
		'mc Пока. Создадим прецедент.',

		'Демон думает. Потом улыбается. Потом смеётся.',

		'demon Знаете что, атеист... Вы первый, кто предложил нам что-то конкретное за шесть тысяч лет.',
		'demon Все предыдущие просто молились. А вы — оформляете.',

		{
			'Function': {
				'Apply': function () {
					var s = this.storage ();
					this.storage ({
						argument_quality: s.argument_quality + 2,
						demon_friendship: Math.min (10, s.demon_friendship + 2)
					});
				},
				'Revert': function () {}
			}
		},

		'jump Expansion_Union_Lawsuit'
	],

	'Expansion_Union_Lawsuit': [
		'Алексей пишет иск. От руки. На обороте формы 66-А.',
		'centered ИСК',
		'centered Истец: профсоюз демонов ада (стихийный)',
		'centered Ответчик: Бог (всемогущий, но не работодатель в правовом смысле)',
		'centered Требования: 1) ставка в час 2) больничные 3) кофе',
		'wait 1500',

		'mc Подпишут все. Я заверю. Подадим.',
		'demon Кому?',
		'mc Самому ответчику. Через систему обращений граждан.',
		'demon (бледнеет) Это... ловко.',
		'jump Ending_DemonLawsuit'
	],

	'Expansion_Union_Merger': [
		'mc Идея. Профсоюз демонов сливается с профсоюзом грешников. Один профсоюз. Общая повестка.',
		'demon У грешников нет профсоюза.',
		'mc Будет. Я организую. У нас миллиарды членов. Платежи символические — одна искренняя мысль в день.',
		'demon ...Платёж — мысль?',
		'mc Думают все. Даже мёртвые. Это самый честный взнос.',

		'Демоны кивают друг другу. Кто-то открывает блокнот. Кто-то пишет повестку.',

		{
			'Function': {
				'Apply': function () {
					var s = this.storage ();
					this.storage ({
						rebellion_score: s.rebellion_score + 2,
						demon_friendship: Math.min (10, s.demon_friendship + 2),
						argument_quality: s.argument_quality + 1
					});
				},
				'Revert': function () {}
			}
		},

		'jump Ending_GreatUnion'
	],

	'Expansion_Union_Pension': [
		'mc Пенсионная программа. Демон, отработавший пять тысяч лет, выходит на покой.',
		'demon На... покой?',
		'mc Лимб. Тишина. Никаких форм. Никаких грешников. Просто лимб с библиотекой.',
		'demon (моргает) У нас есть пенсионный возраст?',
		'mc Я только что его придумал.',

		'Возникает тишина. Самая громкая тишина, которую Алексей слышал в аду.',

		'demon ...И что нужно сделать, чтобы это стало реальностью?',
		'mc Подписи. Сорок миллионов. У вас — есть.',

		{
			'Function': {
				'Apply': function () {
					var s = this.storage ();
					this.storage ({
						demon_friendship: Math.min (10, s.demon_friendship + 3),
						argument_quality: s.argument_quality + 1
					});
				},
				'Revert': function () {}
			}
		},

		'jump Ending_DemonPension'
	],

	// ==========================================
	// 4. IT-ПОДДЕРЖКА АДА
	// ==========================================
	'Expansion_Helpdesk_Intro': [
		'show scene hell_server_room with fadeIn',
		'mc (Это уровень глубже Виктора. Это — главный технический отдел.)',

		'show character demon paperwork at right with fadeIn',
		'demon Тикет?',
		'mc Простите?',
		'demon Вы по тикету? У нас не принимают без тикета. С 1993 года.',
		'mc 1993? У вас тикет-система с 1993-го?',
		'demon Естественно. Это первое, что Бог автоматизировал. Самое узкое место.',

		'mc (Я в IT-поддержке Бога. У меня нет тикета. Я обречён.)',

		{
			'Choice': {
				'Dialog': 'mc (Как обойти?)',
				'fake_ticket': {
					'Text': 'Сфальсифицировать тикет',
					'Do': 'jump Expansion_Helpdesk_Fake'
				},
				'bug_report': {
					'Text': 'Подать баг-репорт на саму систему тикетов',
					'Do': 'jump Expansion_Helpdesk_Meta'
				},
				'priority': {
					'Text': 'Заявить, что я Priority-0',
					'Do': 'jump Expansion_Helpdesk_Priority'
				}
			}
		}
	],

	'Expansion_Helpdesk_Fake': [
		'mc Тикет номер 666-1985-D. От профсоюза. Срочно.',
		'demon (хмурится) ...Этот номер у нас не зарегистрирован.',
		'mc Странно. У меня всё чёрным по красному. Может, синхронизация?',
		'demon (вздыхает) Ладно. Заходите. Только не трогайте сервер «Архангел».',
		'mc (Я только что обошёл админа Бога с помощью трюка из 90-х.)',

		{
			'Function': {
				'Apply': function () {
					var s = this.storage ();
					this.storage ({
						humor_used: s.humor_used + 1,
						argument_quality: s.argument_quality + 1,
						helpdesk_passed: true
					});
				},
				'Revert': function () {}
			}
		},

		'jump Expansion_Helpdesk_Inside'
	],

	'Expansion_Helpdesk_Meta': [
		'mc У меня баг-репорт. На вашу тикет-систему.',
		'demon ...На систему тикетов?',
		'mc Да. Баг: невозможно открыть тикет о том, что нельзя открыть тикет.',
		'mc Это бесконечная петля. Я хочу её зарегистрировать.',
		'demon (молчит) ...',
		'demon ...Заходите. И больше так никогда не делайте.',

		{
			'Function': {
				'Apply': function () {
					var s = this.storage ();
					this.storage ({
						matrix_suspicion: s.matrix_suspicion + 2,
						argument_quality: s.argument_quality + 2,
						helpdesk_passed: true
					});
				},
				'Revert': function () {}
			}
		},

		'jump Expansion_Helpdesk_Inside'
	],

	'Expansion_Helpdesk_Priority': [
		'mc Я Priority-0. Срочный кейс. Прямое распоряжение Бога.',
		'demon (поднимает бровь) Priority-0 — это эскалация уровня архангела. У вас разрешение?',
		'mc Покажите ваш регламент.',
		'demon ...Регламент? Регламент в форме 66-А-12.',
		'mc Дайте.',
		'Алексей читает форму. Долго. Очень долго.',
		'mc Пункт 3.4: «Priority-0 присваивается автоматически в случае философского кризиса непрерывной длительности более 30 минут».',
		'mc У меня кризис длится с прошлого вторника. С момента смерти.',
		'demon ...Я не могу с этим спорить.',
		'mc (Я выиграл бюрократию у бюрократии.)',

		{
			'Function': {
				'Apply': function () {
					var s = this.storage ();
					this.storage ({
						argument_quality: s.argument_quality + 3,
						humor_used: s.humor_used + 1,
						helpdesk_passed: true
					});
				},
				'Revert': function () {}
			}
		},

		'jump Expansion_Helpdesk_Inside'
	],

	'Expansion_Helpdesk_Inside': [
		'show scene hell_server_room with fadeIn',
		'mc (Стойки. Высокие, как храмы. Лампочки мигают синхронно. Так синхронно, что это уже подозрительно.)',

		'show character viktor nervous at right with fadeIn',
		'viktor ...Алексей? Ты как сюда попал?',
		'mc Я выторговал. Слушай, у меня вопрос. Где главный сервер?',
		'viktor «Архангел». Вон, в углу. Не трогай.',
		'mc Что будет?',
		'viktor Запустится скрипт восстановления. Восстановит ВСЁ. С самого начала.',
		'mc С начала... ада?',
		'viktor С начала вообще.',

		{
			'Choice': {
				'Dialog': 'mc (Не трогать. Трогать. Изучить. Или...)',
				'no_touch': {
					'Text': 'Не трогать. Уйти.',
					'Do': 'jump Expansion_Router'
				},
				'touch': {
					'Text': 'Нажать большую красную кнопку «РЕИНИЦИАЛИЗАЦИЯ»',
					'Do': 'jump Ending_HardReset'
				},
				'study': {
					'Text': 'Посмотреть логи. Без касания.',
					'Do': 'jump Expansion_Helpdesk_Logs'
				},
				'pull_request': {
					'Text': 'Создать pull request с улучшением',
					'Do': 'jump Expansion_Helpdesk_PR'
				}
			}
		}
	],

	'Expansion_Helpdesk_Logs': [
		'mc Виктор. Логи. Просто смотреть. Не трогать.',
		'viktor Окей. Логин — admin. Пароль... подожди... admin1985.',
		'mc Вы серьёзно?',
		'viktor Бог любит классику.',

		'Алексей открывает логи. Бесконечный поток.',
		'centered [2024-03-12 14:32] USER_CREATED: Volkov_A. Status: alive.',
		'centered [2024-04-08 09:15] PRAYER_LOGGED: Volkov_E (mother) → Volkov_A. Status: delivered_unread.',
		'centered [2024-05-21 23:47] DEATH_EVENT: Volkov_A. Cause: heart_attack. Status: judged.',
		'centered [2024-05-22 00:00] SOUL_INSERTED: Volkov_A → hell. Status: active.',
		'wait 1500',

		'mc (Логи. Моей жизни. В табличном виде.)',
		'mc (Каждый раз, когда мама молилась — это записывалось. И помечалось «delivered_unread».)',
		'mc (Все молитвы. Доставлены. Не прочитаны.)',

		{
			'Function': {
				'Apply': function () {
					var s = this.storage ();
					this.storage ({
						matrix_suspicion: Math.min (10, s.matrix_suspicion + 3),
						empathy_shown: s.empathy_shown + 1,
						logs_seen: true
					});
				},
				'Revert': function () {}
			}
		},

		'jump Ending_LogsReader'
	],

	'Expansion_Helpdesk_PR': [
		'mc Виктор. Где git?',
		'viktor В стойке «Архангел». Но Бог принимает PR только через свой GitHub. И только в первый понедельник месяца.',
		'mc Сегодня понедельник?',
		'viktor В аду все дни — понедельники.',
		'mc Тогда сегодня. Открывай.',

		'Алексей пишет PR.',
		'centered Pull Request #00000007',
		'centered Title: «Fix: souls of atheists shouldn\'t go to hell for asking questions»',
		'centered Description:',
		'centered «Текущая реализация рассматривает любое неверие как грех.',
		'centered Предлагаю условие: если душа умерла, ИСКРЕННЕ ища истину — не наказывать.',
		'centered Patch attached.»',
		'wait 1500',

		'viktor Ты... ты пишешь PR... Богу.',
		'mc Я программист. Я разговариваю кодом.',
		'jump Ending_PullRequest'
	],

	// ==========================================
	// 5. ГРУППА АТЕИСТОВ — ТЕРАПИЯ
	// ==========================================
	'Expansion_AtheistGroup_Intro': [
		'show scene hell_circle with fadeIn',
		'mc (Круг стульев. Десять. Все заняты. Все — атеисты. Это видно по тому, как они скептически смотрят на воздух.)',

		'show character soul tired at left with fadeIn',
		'soul Здравствуйте. Новенький? Заходите. Меня зовут Сергей. Я атеист уже семьдесят лет. Из них тридцать пять — посмертно.',
		'mc ...Алексей.',
		'soul Расскажите. С чего началось?',
		'mc Я просто... я просто не понимал, как можно верить без доказательств.',
		'soul (кивает) Классика. Я тоже так начинал.',

		'Алексей оглядывает круг. Все одинаковые. У всех одно и то же выражение.',
		'mc (Десять человек. Все умные. Все упрямые. Все попали в одно и то же место.)',
		'mc (Это и есть терапия — увидеть, что ты не один в своей правоте?)',

		{
			'Choice': {
				'Dialog': 'mc (Что я могу здесь сказать?)',
				'share': {
					'Text': 'Поделиться: «Я тоже думаю, что это симуляция»',
					'Do': 'jump Expansion_Group_Share'
				},
				'challenge': {
					'Text': 'Бросить вызов: «А что, если мы все ошибались?»',
					'Do': 'jump Expansion_Group_Challenge'
				},
				'lead': {
					'Text': 'Стать ведущим группы',
					'Do': 'jump Expansion_Group_Lead'
				},
				'leave': {
					'Text': '«Извините, я ещё не готов», уйти',
					'Do': 'jump Expansion_Router'
				}
			}
		}
	],

	'Expansion_Group_Share': [
		'mc Я думаю, что это всё — симуляция. Тестирование.',
		'soul (улыбается) Мы все так думаем. Когда попадаем сюда.',
		'mc И что?',
		'soul Шаг 1 — «Это симуляция». Шаг 2 — «А что, если нет?». Шаг 3 — «А зачем мне это знать?».',
		'mc А шаг 4?',
		'soul Шаг 4 — выбор. Что бы ни было — как жить дальше.',

		{
			'Function': {
				'Apply': function () {
					var s = this.storage ();
					this.storage ({
						matrix_suspicion: Math.min (10, s.matrix_suspicion + 1),
						acceptance_score: s.acceptance_score + 2
					});
				},
				'Revert': function () {}
			}
		},

		'jump Expansion_Group_Lead_Choice'
	],

	'Expansion_Group_Challenge': [
		'mc А что, если мы все ошибались? Я не про Бога. Я про идею, что у нас есть привилегия истины.',
		'soul (хмурится) Поясните.',
		'mc Каждый из вас умер, потому что был уверен. Каждый из вас сидит здесь, потому что был уверен.',
		'mc А кто из вас сомневался? Хоть раз? Серьёзно?',
		'Молчание. Семь из десяти опускают глаза.',
		'soul ...Вы попадаете в точку.',
		'mc Может, проблема не в Боге. Проблема — в уверенности.',

		{
			'Function': {
				'Apply': function () {
					var s = this.storage ();
					this.storage ({
						argument_quality: s.argument_quality + 3,
						empathy_shown: s.empathy_shown + 2
					});
				},
				'Revert': function () {}
			}
		},

		'jump Ending_TruthGroup'
	],

	'Expansion_Group_Lead': [
		'mc Можно я поведу следующую сессию?',
		'soul Вы только зашли.',
		'mc И именно поэтому. Я не «свой» здесь ещё. Я свежий взгляд.',
		'soul (медленно) ...Хорошо. Тема?',
		'mc «Чем мы заслужили эту вечность? Не Богу. Себе.»',

		'Круг замирает. Это страшный вопрос.',

		{
			'Function': {
				'Apply': function () {
					var s = this.storage ();
					this.storage ({
						argument_quality: s.argument_quality + 2,
						acceptance_score: s.acceptance_score + 2,
						empathy_shown: s.empathy_shown + 1
					});
				},
				'Revert': function () {}
			}
		},

		'jump Ending_AtheistTherapist'
	],

	'Expansion_Group_Lead_Choice': [
		{
			'Choice': {
				'Dialog': 'mc (Уходить или остаться надолго?)',
				'stay': {
					'Text': 'Остаться. Это моя группа.',
					'Do': 'jump Ending_AtheistGroup_Stay'
				},
				'go': {
					'Text': 'Уйти искать больше дверей',
					'Do': 'jump Expansion_Router'
				}
			}
		}
	],

	// ==========================================
	// 6. ДЕТСКИЙ СЕКТОР — ребёнок в аду
	// ==========================================
	'Expansion_Child_Intro': [
		'show scene hell_kindergarten with fadeIn',
		'mc (Это... игровая комната. С игрушками. С маленькими стульчиками. С плакатом «Будь хорошим — иначе будет хуже».)',

		'show character child sad at center with fadeIn',
		'child Привет. Ты тоже умер?',
		'mc ...Да.',
		'child Это уже четвёртый раз. Каждый раз приходит кто-то новый, говорит «привет» и уходит. И я опять одна.',

		'mc (Это маленький ребёнок. В аду. Это — самое адское, что я видел.)',

		{
			'Choice': {
				'Dialog': 'mc (Что сказать ребёнку?)',
				'comfort': {
					'Text': 'Сесть рядом, не уйти',
					'Do': 'jump Expansion_Child_Stay'
				},
				'investigate': {
					'Text': 'Спросить, что случилось',
					'Do': 'jump Expansion_Child_Ask'
				},
				'escape': {
					'Text': 'Помочь ей выбраться',
					'Do': 'jump Expansion_Child_Escape'
				},
				'demand': {
					'Text': 'Найти и потребовать у Бога отчёт',
					'Do': 'jump Expansion_Child_Demand'
				}
			}
		}
	],

	'Expansion_Child_Stay': [
		'Алексей садится на маленький стул. Колени до подбородка. Ребёнок смотрит с подозрением.',
		'child Ты не уйдёшь?',
		'mc Нет.',
		'child Через сколько?',
		'mc Не знаю. Пока не уйдут все остальные. А может, никогда.',

		'Алексей берёт игрушечного зайца. Зелёного. Со стеклянными глазами.',
		'mc Расскажи про зайца.',
		'child Его зовут Тимофей. Он был у меня в больнице. Потом... я его потеряла. А тут он опять. Не настоящий, но похож.',

		{
			'Function': {
				'Apply': function () {
					var s = this.storage ();
					this.storage ({
						empathy_shown: s.empathy_shown + 3,
						acceptance_score: s.acceptance_score + 3,
						child_met: true
					});
				},
				'Revert': function () {}
			}
		},

		'mc (Я не уйду. Это не мой ребёнок. Я никогда не хотел детей. Но это — мой ребёнок теперь. Потому что я здесь.)',
		'jump Ending_ChildKeep'
	],

	'Expansion_Child_Ask': [
		'mc Как тебя зовут? Что случилось?',
		'child Поля. Мне семь. У меня была болезнь, которая не лечилась. Мама плакала. Я не плакала. Я сказала ей, что не больно.',
		'mc Тебе было больно?',
		'child Очень. Но мама бы расстроилась.',

		'mc (Семь лет. И уже умела врать, чтобы пощадить других.)',

		'child А тебя за что?',
		'mc За... за то, что я никогда не врал, чтобы пощадить.',
		'child Это плохо?',
		'mc Видимо, да.',

		{
			'Function': {
				'Apply': function () {
					var s = this.storage ();
					this.storage ({
						empathy_shown: s.empathy_shown + 2,
						cruelty_score: Math.max (0, s.cruelty_score - 1),
						child_met: true
					});
				},
				'Revert': function () {}
			}
		},

		'jump Expansion_Child_Ask_Cont'
	],

	'Expansion_Child_Ask_Cont': [
		'child А мне можно тебя обнять?',
		'mc (Я тридцать восемь лет не обнимал детей. Не из-за принципов. Из-за «не моя зона». Это... не моя зона.)',
		'mc Можно.',

		'Маленькие, прозрачные руки. Холодные. Алексей их почти не чувствует.',
		'mc (Но что-то чувствует. Не объяснимо чем.)',

		{
			'Choice': {
				'Dialog': 'mc (И что дальше?)',
				'stay': {
					'Text': 'Остаться',
					'Do': 'jump Ending_ChildKeep'
				},
				'fight': {
					'Text': 'Найти, кто решил, что Поля заслужила ад',
					'Do': 'jump Expansion_Child_Demand'
				}
			}
		}
	],

	'Expansion_Child_Escape': [
		'mc Поля, мы уходим. Я знаю, где выход.',
		'child Тут нет выхода. Тётя в халате сказала.',
		'mc Тётя в халате — врала. Пойдём. Я тебя выведу.',

		'Алексей берёт её за руку. Идёт. Коридор. Дверь. Закрыта.',

		{
			'Function': {
				'Apply': function () {
					var s = this.storage ();
					this.storage ({
						empathy_shown: s.empathy_shown + 3,
						rebellion_score: s.rebellion_score + 2,
						child_escape_attempt: true
					});
				},
				'Revert': function () {}
			}
		},

		'jump Expansion_Child_Escape_Door'
	],

	'Expansion_Child_Escape_Door': [
		'mc Заперто. Конечно.',
		'child А ты можешь её открыть?',
		'mc ...Я попробую.',
		'mc (Я атеист, я мёртв, я в аду, и я пытаюсь открыть запертую дверь для ребёнка. Это сюжет, который я никогда бы не написал.)',

		'Алексей дёргает за ручку. Не открывается. Бьёт плечом. Не открывается.',
		'Поля смотрит. Без укора. Без надежды. Просто смотрит.',

		'mc (Так не выйдет. Силой — никак.)',
		'Алексей вспоминает форму 66-А. Карандаш.',
		'mc Поля, дай мне минуту.',

		'Он пишет на двери. Маркером, который нашёл в кармане у спящего демона по пути.',
		'centered «Прошу пропустить — несовершеннолетняя душа. Срок наказания — превышен.»',
		'centered Подпись: Волков А.Д., адвокат по призванию (post mortem).',
		'wait 1500',

		'Дверь скрипит. Открывается.',
		'mc (Бюрократия. Единственный язык, который ад уважает.)',
		'jump Ending_ChildSaved'
	],

	'Expansion_Child_Demand': [
		'mc Это бесчестно. Я хочу видеть того, кто принял решение.',

		{
			'Function': {
				'Apply': function () {
					divineGlow (true);
					screenShake (400);
				},
				'Revert': function () { divineGlow (false); }
			}
		},

		'g Меня?',
		'mc Тебя. Ребёнок. Семь лет. Здесь. Объясни.',
		'g Она не за свои поступки. Она здесь временно. Жду её родителей.',
		'mc Ты ждёшь её родителей, ИСПОЛЬЗУЯ её как приманку?!',
		'g Я не использую. Они сами сюда приходят. Каждую неделю. Им важно её видеть.',

		'mc ...',
		'mc Они приходят сюда? К ней?',
		'g Они умерли спустя три месяца после неё. Не вынесли. Теперь они вместе. Здесь.',

		'mc (Семья. В аду. ВМЕСТЕ. Потому что не вынесли.)',
		'mc (Это не наказание. Это... убежище для тех, кто не справился.)',

		{
			'Function': {
				'Apply': function () {
					var s = this.storage ();
					this.storage ({
						matrix_suspicion: Math.min (10, s.matrix_suspicion + 2),
						empathy_shown: s.empathy_shown + 3,
						acceptance_score: s.acceptance_score + 2
					});
				},
				'Revert': function () {}
			}
		},

		'jump Ending_FamilyHell'
	],

	// ==========================================
	// 7. ОТЕЦ — встреча с умершим отцом
	// ==========================================
	'Expansion_Father_Intro': [
		'show scene hell_workshop with fadeIn',
		'mc (Мастерская. Запах опилок. Старые радиоприёмники. Лампы накаливания. Так пахло у папы в гараже.)',

		'show character father normal at center with fadeIn',
		'father ...Алёша?',
		'mc Папа?',

		'Это он. Постаревший. С седой щетиной, как он не успел при жизни.',
		'father Что ты тут делаешь?',
		'mc Я умер. Инфаркт. Вторник. На улице.',
		'father (вздыхает) ...рановато. Тебе тридцать восемь?',
		'mc Да.',
		'father А мне было сорок два. Похоже на семейное.',

		'mc (Мы с папой умерли почти в одном возрасте. Тридцать лет разницы. Один инфаркт на двоих.)',

		{
			'Choice': {
				'Dialog': 'mc (Что сказать отцу?)',
				'love': {
					'Text': '«Я тебя любил, я просто никогда не говорил.»',
					'Do': 'jump Expansion_Father_Love'
				},
				'why_hell': {
					'Text': '«Почему ты в аду?»',
					'Do': 'jump Expansion_Father_Why'
				},
				'show_letters': {
					'Text': '«Я читал твои письма. Три тома.»',
					'Do': 'jump Expansion_Father_Letters',
					'Condition': function () { return this.storage ().father_letters_read; }
				},
				'angry': {
					'Text': '«Ты ушёл, когда мне было пятнадцать. Я тебя ненавидел.»',
					'Do': 'jump Expansion_Father_Angry'
				}
			}
		}
	],

	'Expansion_Father_Love': [
		'mc Папа. Я... я тебя любил. Я просто никогда не говорил.',
		'father (молчит долго) ...Я тоже.',
		'father Я думал, ты знаешь.',
		'mc Я думал, ты знаешь.',
		'father Мы оба были программисты — каждый по-своему. Не озвучивали то, что считалось очевидным.',

		'mc (Самая большая трагедия в инженерных семьях. «Это и так понятно». Поэтому не озвучивается.)',
		'mc (А потом всю жизнь думаешь — а понимал ли он? Понимает ли мама? Понимает ли Серёжа? Понимаю ли я?)',

		{
			'Function': {
				'Apply': function () {
					var s = this.storage ();
					this.storage ({
						empathy_shown: s.empathy_shown + 3,
						acceptance_score: s.acceptance_score + 3,
						father_resolved: true
					});
				},
				'Revert': function () {}
			}
		},

		'jump Expansion_Father_Cont'
	],

	'Expansion_Father_Why': [
		'mc Почему ты в аду?',
		'father (усмехается) А почему ты в аду?',
		'mc Потому что не верил. Глупо.',
		'father Я тоже не верил. Но я ещё и врал, что верил — на родительском собрании. Чтобы тебя в советский садик взяли.',
		'mc ...серьёзно?',
		'father В 1985-м. Перестройка. Веру вдруг стало модно. Я подписал бумагу. Так и попал.',
		'mc Из-за бумаги в 85-м?',
		'father Из-за неискренности. Если бы не подписывал — был бы в каком-нибудь другом отделе. А так — со всеми бывшими атеистами.',

		'mc (Папа в аду из-за фальшивой подписи на советской бумаге. Это... это так абсурдно, что слишком похоже на правду.)',

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

		'jump Expansion_Father_Cont'
	],

	'Expansion_Father_Letters': [
		'mc Я их читал. Три тома. В библиотеке.',
		'father ...Они их хранят?',
		'mc Каждое непроизнесённое слово. Даже твоё.',
		'father (закрывает лицо рукой) Я не думал, что кто-то услышит.',
		'mc Я тоже не думал, что услышу.',

		'Алексей подходит. Обнимает отца. Папа холодный, не плотный — но руки у него те же.',
		'father (тихо) ...я хотел сказать тебе, что я тобой горжусь. Просто не успел.',
		'mc (Я знаю, папа. Теперь — знаю.)',

		{
			'Function': {
				'Apply': function () {
					var s = this.storage ();
					this.storage ({
						empathy_shown: Math.min (20, s.empathy_shown + 5),
						acceptance_score: s.acceptance_score + 4,
						father_resolved: true,
						father_letters_acknowledged: true
					});
				},
				'Revert': function () {}
			}
		},

		'jump Ending_FatherSon'
	],

	'Expansion_Father_Angry': [
		'mc Ты ушёл. Когда мне было пятнадцать. Я тебя ненавидел.',
		'father (опускает голову) Я знаю.',
		'mc Я учился у тебя всему. И вдруг — ничего. Сердце. Гараж. Конец.',
		'father (тихо) Я знаю.',
		'mc Я начал спорить со всем, потому что не мог поспорить с тобой. Понимаешь?',
		'father (поднимает глаза) Понимаю. Я бы тоже спорил со всем, если бы кто-то ушёл от меня в твоём возрасте.',
		'father Прости.',

		'mc (Слово, которого я ждал двадцать три года.)',

		{
			'Function': {
				'Apply': function () {
					var s = this.storage ();
					this.storage ({
						empathy_shown: s.empathy_shown + 2,
						acceptance_score: s.acceptance_score + 2,
						cruelty_score: Math.max (0, s.cruelty_score - 2),
						father_resolved: true
					});
				},
				'Revert': function () {}
			}
		},

		'jump Expansion_Father_Cont'
	],

	'Expansion_Father_Cont': [
		{
			'Choice': {
				'Dialog': 'mc (И что теперь? Здесь, вместе?)',
				'stay_father': {
					'Text': 'Остаться. Жить вечность вдвоём.',
					'Do': 'jump Ending_FatherSon'
				},
				'fight_together': {
					'Text': 'Вместе попытаться выйти',
					'Do': 'jump Expansion_Father_Escape'
				},
				'forgive_leave': {
					'Text': 'Простить, попрощаться, идти дальше',
					'Do': 'jump Expansion_Router'
				}
			}
		}
	],

	'Expansion_Father_Escape': [
		'mc Папа. Мы можем попробовать. Виктор — сисадмин — помогает. Лилит — гид — иногда. Я организовал профсоюз демонов. У меня есть план.',
		'father (улыбается) Узнаю тебя. План — всегда есть план.',
		'mc Только это план без гарантии. Может, выйдем. Может, всё хуже.',
		'father (смотрит долго) Алёша. Я двадцать три года не видел тебя. Лучше с тобой потерять всё, чем без тебя получить покой.',

		{
			'Function': {
				'Apply': function () {
					var s = this.storage ();
					this.storage ({
						empathy_shown: s.empathy_shown + 3,
						rebellion_score: s.rebellion_score + 3,
						father_joined_escape: true
					});
				},
				'Revert': function () {}
			}
		},

		'jump Ending_FatherEscape'
	],

	// ==========================================
	// 8. СЛУЖЕБНОЕ ПОМЕЩЕНИЕ — встреча с разработчиком
	// ==========================================
	'Expansion_Maintenance_Intro': [
		'show scene hell_maintenance with fadeIn',
		'mc (Серый коридор. Не как в аду — как в офисном центре. Линолеум. Лампы дневного света. Это пугает больше, чем огонь.)',

		'mc (Стол. За столом — человек. В толстовке. С кофейной чашкой. С монитором, на котором — этот самый коридор.)',

		'show character dev normal at center with fadeIn',
		'dev О, привет. Не знаю, как ты сюда попал. Это техническая зона.',
		'mc Кто вы?',
		'dev Я? Я просто работаю тут. Поддержка контента.',
		'mc Контента?',
		'dev Ну. Ад. Рай. Чистилище. Это всё — контент. Я отвечаю за ад. Точнее, за сектор «русскоязычные атеисты». У меня двенадцать игроков.',

		'mc (...)',
		'mc Двенадцать игроков?',
		'dev Ну да. Я не могу сказать «душ». Это конфиденциально. Скажем — двенадцать сущностей.',

		'mc (Я сейчас разговариваю с разработчиком. Литературно. Это четвёртая стена. Разбита.)',

		{
			'Choice': {
				'Dialog': 'mc (Что спросить у разработчика?)',
				'who_made': {
					'Text': '«Кто это всё придумал?»',
					'Do': 'jump Expansion_Maintenance_Who'
				},
				'why_me': {
					'Text': '«Почему именно я?»',
					'Do': 'jump Expansion_Maintenance_Why'
				},
				'attack': {
					'Text': 'Броситься на него',
					'Do': 'jump Expansion_Maintenance_Attack'
				},
				'sit_down': {
					'Text': 'Сесть на свободный стул, как на работу',
					'Do': 'jump Expansion_Maintenance_Sit'
				}
			}
		}
	],

	'Expansion_Maintenance_Who': [
		'mc Кто это всё придумал? Тебе сценарий кто пишет?',
		'dev (вздыхает) Сценаристы. У нас их шесть. Один из них в отпуске. Поэтому у тебя «персональный пакет» — не доделанный. Извини.',
		'mc Извини?!',
		'dev Я бы исправил, но это уже выпуск. Релиз был во вторник. У меня были метрики. Bug-репорты только в следующем спринте.',

		'mc (Я в спринте. Я — баг. Я уже это знал, но теперь это подтверждено разработчиком.)',

		{
			'Function': {
				'Apply': function () {
					var s = this.storage ();
					this.storage ({
						matrix_suspicion: Math.min (10, s.matrix_suspicion + 4),
						humor_used: s.humor_used + 1
					});
				},
				'Revert': function () {}
			}
		},

		'jump Ending_DevMaintenance'
	],

	'Expansion_Maintenance_Why': [
		'mc Почему именно я?',
		'dev У тебя был хороший балл на собеседовании.',
		'mc На каком собеседовании?',
		'dev У души. До рождения. Стандартная процедура. Тебе задавали вопрос: «Согласны ли вы участвовать в эксперименте на дисскоективное мышление?» Ты ответил «да, если будет интересно».',
		'mc Я не помню!',
		'dev Никто не помнит. Это часть условий. Они в EULA, в третьем абзаце.',

		'mc (Я подписал EULA до рождения. Я НИКОГДА не читаю EULA.)',
		'mc (Технологическое поколение наказано за то, в чём оно лучшее: проматывать.)',

		{
			'Function': {
				'Apply': function () {
					var s = this.storage ();
					this.storage ({
						matrix_suspicion: Math.min (10, s.matrix_suspicion + 3),
						humor_used: s.humor_used + 2
					});
				},
				'Revert': function () {}
			}
		},

		'jump Ending_EULAReader'
	],

	'Expansion_Maintenance_Attack': [
		'mc (Я бросаюсь на него.)',

		{
			'Function': {
				'Apply': function () { screenShake (600); screenGlitch (700); },
				'Revert': function () {}
			}
		},

		'Алексей прыгает. Стол — не стол. Это просто текстура, наложенная на пустоту.',
		'Алексей пролетает СКВОЗЬ.',
		'dev (не оборачиваясь) Я говорил. Техническая зона. Тебе сюда нельзя.',
		'mc (Я не могу его коснуться. Он не персонаж. Он — другой слой.)',

		'dev Сейчас придёт служба удаления. Извини, ничего личного.',

		{
			'Function': {
				'Apply': function () {
					var s = this.storage ();
					this.storage ({
						wtf_level: Math.min (100, s.wtf_level + 25),
						matrix_suspicion: Math.min (10, s.matrix_suspicion + 3)
					});
				},
				'Revert': function () {}
			}
		},

		'jump Ending_Removed'
	],

	'Expansion_Maintenance_Sit': [
		'mc (Я сяду. Я на работе. У меня тридцать восемь лет опыта в IT.)',

		'Алексей садится на свободный стул. Разработчик косится. Молчит.',
		'mc Дай мне терминал. Один. Тот, что справа.',
		'dev ...серьёзно?',
		'mc Я не буду ломать. Я хочу посмотреть. Просто.',

		'dev (вздыхает) Ладно. Гость доступ. SELECT only. Если попытаешься DROP — выкину.',

		{
			'Function': {
				'Apply': function () {
					var s = this.storage ();
					this.storage ({
						matrix_suspicion: Math.min (10, s.matrix_suspicion + 2),
						argument_quality: s.argument_quality + 2,
						helpdesk_passed: true
					});
				},
				'Revert': function () {}
			}
		},

		'jump Ending_DevColleague'
	],

	// ==========================================
	// 9. ИННА В АДУ
	// ==========================================
	'Expansion_Inna_Intro': [
		'show scene hell_corridor with fadeIn',
		'mc (Каблуки. Я узнаю эти каблуки. Я слышал их каждое утро в офисе.)',

		'show character inna serious at center with fadeIn',
		'inna Алексей. Не ожидала.',
		'mc Инна?! Ты же... ты же жива.',
		'inna (улыбается) Я тоже так думала. До среды.',
		'mc Что случилось?',
		'inna Ничего интересного. Аритмия. Я работала больше тебя. Я просто была моложе и поэтому держалась дольше.',

		'mc (Она умерла после меня. И попала в тот же ад.)',
		'mc (Что это значит? Что у нас один и тот же сектор? Один разработчик?)',

		{
			'Function': {
				'Apply': function () {
					var s = this.storage ();
					this.storage ({
						matrix_suspicion: Math.min (10, s.matrix_suspicion + 2),
						inna_in_hell: true
					});
				},
				'Revert': function () {}
			}
		},

		{
			'Choice': {
				'Dialog': 'mc (Что сказать?)',
				'romance': {
					'Text': '«Я ждал, что ты придёшь.»',
					'Do': 'jump Expansion_Inna_Romance'
				},
				'rage': {
					'Text': '«Это из-за переработок. Это я виноват.»',
					'Do': 'jump Expansion_Inna_Guilt'
				},
				'ally': {
					'Text': '«Давай вместе. У меня план.»',
					'Do': 'jump Expansion_Inna_Ally'
				},
				'truth': {
					'Text': '«Ты Лилит. Признайся.»',
					'Do': 'jump Expansion_Inna_Lilith_Test'
				}
			}
		}
	],

	'Expansion_Inna_Romance': [
		'mc Я ждал. Знаешь, я думал — это галлюцинация. Силуэт в очереди. На приёме. В коридоре.',
		'mc А это просто ты, в трёх параллельных таймлайнах.',
		'inna (тихо) Я тоже думала о тебе. После твоей смерти. Каждый раз, когда я писала тебе в одиннадцать.',
		'mc Ты писала мёртвому человеку?',
		'inna Я не знала, что он мёртвый. Я отправляла «спокойной ночи». Они уходили в пустоту.',

		'mc (Инна писала спокойной ночи моему мёртвому телефону. Это самое романтичное и самое жуткое, что я слышал.)',

		{
			'Function': {
				'Apply': function () {
					var s = this.storage ();
					this.storage ({
						inna_interest: Math.min (10, s.inna_interest + 5),
						empathy_shown: s.empathy_shown + 2,
						acceptance_score: s.acceptance_score + 1
					});
				},
				'Revert': function () {}
			}
		},

		'jump Ending_InnaRomance'
	],

	'Expansion_Inna_Guilt': [
		'mc Это из-за переработок. Я ушёл — ты осталась. Дольше. Дольше. Я виноват.',
		'inna (тихо) Алексей. У нас обоих был выбор. Я тоже могла уйти.',
		'mc Но ты не ушла.',
		'inna Я не ушла. Это была моя ошибка. Не твоя.',

		'mc (Она не позволяет мне взять её ошибку. Это — взрослость, которой у меня никогда не было.)',

		{
			'Function': {
				'Apply': function () {
					var s = this.storage ();
					this.storage ({
						empathy_shown: s.empathy_shown + 3,
						acceptance_score: s.acceptance_score + 2,
						inna_interest: Math.min (10, s.inna_interest + 2)
					});
				},
				'Revert': function () {}
			}
		},

		'jump Ending_InnaForgive'
	],

	'Expansion_Inna_Ally': [
		'mc Я тут не один. У меня — союзники. Виктор. Демоны-профсоюзники. Возможно, отец. Помоги мне.',
		'inna (поднимает бровь) Союзники? В аду?',
		'mc Тут полно людей, которые не верят, что это окончательно. Я собрал их. Тебя — последняя.',
		'inna ...Ты собираешь восстание?',
		'mc Я собираю аргументы. Систематическую критику.',
		'inna Алексей. Это то же самое.',

		{
			'Function': {
				'Apply': function () {
					var s = this.storage ();
					this.storage ({
						rebellion_score: s.rebellion_score + 3,
						inna_interest: Math.min (10, s.inna_interest + 3),
						argument_quality: s.argument_quality + 2
					});
				},
				'Revert': function () {}
			}
		},

		'jump Ending_InnaRevolt'
	],

	'Expansion_Inna_Lilith_Test': [
		'mc Подожди. Ты — Лилит?',
		'inna (морщится) ...что?',
		'mc Демон. Гид по аду. Принимает форму того, кого жертва хотела на земле.',
		'inna (молчит, потом смеётся) Алексей. Ты идиот. Ты буквально умеешь сделать любовное признание в обвинение.',

		'mc (Чёрт.)',
		'inna Нет, я не Лилит. Но я понимаю, почему ты подумал. У тебя на ленте — Лилит. Конечно, ты решил, что я — это она.',
		'mc Прости.',
		'inna (вздыхает) Прощаю. Но больше не подозревай меня в демонизме. Я работала в HR. Этого достаточно.',

		{
			'Function': {
				'Apply': function () {
					var s = this.storage ();
					this.storage ({
						inna_interest: Math.max (0, s.inna_interest - 1),
						humor_used: s.humor_used + 1,
						inna_verified: true
					});
				},
				'Revert': function () {}
			}
		},

		'jump Expansion_Inna_Recover'
	],

	'Expansion_Inna_Recover': [
		{
			'Choice': {
				'Dialog': 'mc (Что теперь?)',
				'second_try': {
					'Text': 'Попробовать снова — но без обвинений',
					'Do': 'jump Expansion_Inna_Romance'
				},
				'go': {
					'Text': 'Извиниться и уйти',
					'Do': 'jump Expansion_Router'
				}
			}
		}
	],

	// ==========================================
	// КОНЦОВКИ — раздел A (новые)
	// ==========================================

	'Ending_HellChef': [
		'show scene hell_cafeteria with fadeIn',
		{ 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'hell_chef' }); }, 'Revert': function () {} } },
		'Алексей надевает фартук. На бейджике: «помощник шефа, отдел итальянской кухни ада».',
		'mc (Я провёл тридцать лет на земле, проектируя софт. Теперь — двадцать тысяч лет буду проектировать ризотто. Признаюсь, я не против.)',
		'centered Алексей Волков. Помощник шефа. Лучшее место в аду.',
		'wait 1000',
		'centered КОНЦОВКА: «РИЗОТТО В АДУ»',
		'centered Если не можешь изменить меню — измени систему оценки морального духа.',
		'wait 2000',
		'jump Ending_Credits'
	],

	'Ending_CafeteriaLeader': [
		'show scene hell_cafeteria with fadeIn',
		{ 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'cafeteria_leader' }); }, 'Revert': function () {} } },
		'Алексей остаётся за столом у окна. Манифест на салфетке прячет под поднос.',
		'mc Никаких котлов. Никакого «персонального пакета». Только мы и стол, за которым обсуждаем, кто мы.',
		'soul Лидер найден.',
		'soul2 Мы будем приходить каждый день в час. Каждый. День.',
		'centered Алексей Волков. Председатель неформального атеистического клуба ада.',
		'wait 1000',
		'centered КОНЦОВКА: «КЛУБ У ОКНА»',
		'centered Иногда революция — это просто общий обед.',
		'wait 2000',
		'jump Ending_Credits'
	],

	'Ending_Library_Read': [
		'show scene hell_library with fadeIn',
		{ 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'library_read' }); }, 'Revert': function () {} } },
		'Алексей садится в библиотеке. Берёт сорок томов мамы. Двенадцать томов Серёжи. Три тома отца.',
		'mc (Я не отвечу на эти молитвы. Я опоздал. Но я могу их хотя бы услышать.)',
		'mc (Это меньше, чем должно. Это всё, что осталось.)',
		'Алексей читает. День за днём. Том за томом. Не торопится — всё равно вечность.',
		'centered Алексей Волков. Запоздалый читатель самых важных писем своей жизни.',
		'wait 1000',
		'centered КОНЦОВКА: «АРХИВ ЗАПОЗДАЛОГО ЧТЕНИЯ»',
		'centered Лучше услышать поздно, чем не услышать никогда.',
		'wait 2000',
		'jump Ending_Credits'
	],

	'Ending_LetterToSergey': [
		'show scene hell_library with fadeIn',
		{ 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'letter_to_sergey' }); }, 'Revert': function () {} } },
		'Алексей пишет письмо. Серёже. На обороте формы 66-А.',
		'centered «Серёж, прости за всё. За высмеивание. За то, что был прав. За то, что не был добр.',
		'centered Если эту бумагу кто-то найдёт там — передайте, пожалуйста.',
		'centered Скажите ему, что я тоже молился за него. Просто никогда вслух. — А.»',
		'wait 1500',
		'Архивариус смотрит. Кивает. Берёт письмо. Кладёт в том Серёжи. Двенадцатый. Тринадцатая.',
		'archivist Доставлено. Status: read.',
		'mc (Status: read. Впервые за двенадцать лет.)',
		'centered Алексей Волков. Один доставленный ответ. На тринадцатой попытке.',
		'wait 1000',
		'centered КОНЦОВКА: «ОТВЕТ СЕРЁЖЕ»',
		'centered Слово «прости» доходит даже через бюрократию вечности.',
		'wait 2000',
		'jump Ending_Credits'
	],

	'Ending_FatherReply': [
		'show scene hell_library with fadeIn',
		{ 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'father_reply' }); }, 'Revert': function () {} } },
		'Алексей вписывает в третий том отца. На последней странице. Под последней непроизнесённой молитвой.',
		'centered «Папа. Я тоже не успел сказать. Прости меня.',
		'centered Я унаследовал твою тишину. Я постараюсь её не передать.',
		'centered Когда найду маму — передам её ей. — Алёша.»',
		'wait 1500',
		'centered Алексей Волков. Записал то, что папа не успел.',
		'wait 1000',
		'centered КОНЦОВКА: «ПРОДОЛЖЕНИЕ ТЕТРАДИ»',
		'centered Тишина передаётся по наследству. И прерывается тоже.',
		'wait 2000',
		'jump Ending_Credits'
	],

	'Ending_UnspokenPrayers': [
		'show scene hell_library with fadeIn',
		{ 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'unspoken_prayers' }); }, 'Revert': function () {} } },
		'Алексей закрывает тридцать восьмой том. Свой. Последний год его жизни.',
		'mc (Тридцать восемь лет невысказанного «помоги мне». Все доставлены. Все не прочитаны.)',
		'mc (Это не он мне не отвечал. Это я не давал ему адреса.)',
		'g Ты понял.',
		'mc Ты тут?',
		'g Я всегда был.',
		'mc Прочитаешь?',
		'g Я уже. Все тридцать восемь.',
		'mc И что?',
		'g И теперь — ты тоже знаешь, что я знал. Этого достаточно.',
		'centered Алексей Волков. Понял, что НЕ-произнесённое — тоже разговор.',
		'wait 1000',
		'centered КОНЦОВКА: «НЕВЫСКАЗАННЫЕ»',
		'centered Бог читает между строк, даже если строк не было.',
		'wait 2000',
		'jump Ending_Credits'
	],

	'Ending_HellStrike': [
		'show scene hell_union with fadeIn',
		{ 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'hell_strike' }); }, 'Revert': function () {} } },
		'Триста семьдесят шесть демонов опускают трезубцы. Котлы тухнут. Сера остывает.',
		'mc (Я не верю в Бога. Но я верю в коллективные действия. Это, оказывается, было важнее.)',
		'demon Бог звонит. Хочет переговоров.',
		'mc Скажи ему — переговоры через моего адвоката.',
		'demon У тебя есть адвокат?',
		'mc Будет. Я только что назначил. Себя.',
		'centered Алексей Волков. Организатор первой профсоюзной забастовки в аду.',
		'wait 1000',
		'centered КОНЦОВКА: «ВСЕОБЩАЯ ЗАБАСТОВКА АДА»',
		'centered Профсоюз сильнее всемогущества — если у всемогущества нет HR-отдела.',
		'wait 2000',
		'jump Ending_Credits'
	],

	'Ending_DemonLawsuit': [
		'show scene hell_union with fadeIn',
		{ 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'demon_lawsuit' }); }, 'Revert': function () {} } },
		'mc Иск подан. В трёх инстанциях. На двенадцати языках. Через систему обращений граждан.',
		'demon Сколько ждём ответа?',
		'mc По стандарту — тридцать рабочих дней. Здесь — три вечности.',
		'demon Это быстрее, чем обычно.',
		'centered Алексей Волков. Адвокат демонов в иске против работодателя.',
		'wait 1000',
		'centered КОНЦОВКА: «ИСК ПРОТИВ ВСЕМОГУЩЕГО»',
		'centered У Бога нет HR-отдела. Это его главная уязвимость.',
		'wait 2000',
		'jump Ending_Credits'
	],

	'Ending_GreatUnion': [
		'show scene hell_union with fadeIn',
		{ 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'great_union' }); }, 'Revert': function () {} } },
		'mc Профсоюз грешников и демонов сливается. Один профсоюз. Один трезубец. Одна повестка.',
		'demon Сколько членов?',
		'mc Все, кто когда-либо думал. Это около ста миллиардов.',
		'demon Самый большой профсоюз в истории.',
		'mc И самый бессмысленный — потому что все мёртвые.',
		'demon Поэтому самый честный.',
		'centered Алексей Волков. Председатель ВСЕОБЩЕГО профсоюза посмертия.',
		'wait 1000',
		'centered КОНЦОВКА: «ВЕЛИКОЕ ОБЪЕДИНЕНИЕ»',
		'centered Когда у всех нет ничего — все становятся коллегами.',
		'wait 2000',
		'jump Ending_Credits'
	],

	'Ending_DemonPension': [
		'show scene hell_union with fadeIn',
		{ 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'demon_pension' }); }, 'Revert': function () {} } },
		'mc Пенсионная программа подписана сорока миллионами. Первый пенсионер демон — Аркадий — уходит в лимб.',
		'demon (тихо, прощально) Спасибо, атеист. Пять тысяч лет я ждал этого момента.',
		'mc Что будешь делать в лимбе?',
		'demon Учить итальянский. Просто. Никому не нужно. Сам себе.',
		'centered Алексей Волков. Архитектор пенсионной реформы загробного мира.',
		'wait 1000',
		'centered КОНЦОВКА: «ПЕНСИЯ В ЛИМБЕ»',
		'centered Свобода — это право, которое нужно выторговать. Даже у вечности.',
		'wait 2000',
		'jump Ending_Credits'
	],

	'Ending_HardReset': [
		'show scene #000000 with fadeIn',
		{
			'Function': {
				'Apply': function () {
					screenGlitch (2000);
					screenShake (1200);
					this.storage ({ ending_reached: 'hard_reset' });
				},
				'Revert': function () {}
			}
		},
		'mc (Я нажал кнопку.)',
		'mc (Серверная мигает. Лампочки гаснут. Включаются заново.)',
		'mc (По одной. Очень медленно.)',
		'centered SYSTEM REINITIALIZING...',
		'wait 1500',
		'centered LOAD: ./universe/genesis_v2.6.2.bin',
		'wait 1500',
		'centered NEW PARAMETERS:',
		'centered • atheists: forgiven_by_default = true',
		'centered • prayers: status_after_delivery = read',
		'centered • children: hell_eligible = false',
		'wait 2000',
		'centered ...',
		'centered USER: Volkov_A. STATUS: pending_rebirth.',
		'wait 2000',
		'centered Алексей Волков. Нажал кнопку «РЕИНИЦИАЛИЗАЦИЯ».',
		'wait 1000',
		'centered КОНЦОВКА: «HARD RESET»',
		'centered Иногда лучший аргумент — это Ctrl+Alt+Del. Для всего сущего.',
		'wait 2000',
		'jump Ending_Credits'
	],

	'Ending_LogsReader': [
		'show scene hell_server_room with fadeIn',
		{ 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'logs_reader' }); }, 'Revert': function () {} } },
		'mc (Я могу читать логи. Целую вечность. Каждую запись о каждой душе.)',
		'mc (Каждую недоставленную молитву. Каждое непроизнесённое «прости».)',
		'viktor И что ты с этим сделаешь?',
		'mc Я буду их доставлять. Вручную. По одной. Каждую душу — каждому, кто молился за неё.',
		'viktor У нас бесконечное число молитв.',
		'mc У меня бесконечное время.',
		'centered Алексей Волков. Самый медленный почтальон вселенной.',
		'wait 1000',
		'centered КОНЦОВКА: «ЧИТАТЕЛЬ ЛОГОВ»',
		'centered Когда у системы есть лог — всегда есть тот, кто прочитает.',
		'wait 2000',
		'jump Ending_Credits'
	],

	'Ending_PullRequest': [
		'show scene hell_server_room with fadeIn',
		{ 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'pull_request' }); }, 'Revert': function () {} } },
		'centered Pull Request #00000007',
		'centered Status: REVIEW',
		'centered Reviewers: God (online), Lucifer (offline since 1054 A.D.)',
		'wait 1500',
		'centered God commented:',
		'centered «Patch принят. Тесты прошли. Слияние в master ветку через 72 часа.»',
		'wait 1500',
		'centered God commented:',
		'centered «Алексей. Я хотел спросить — а почему ты раньше PR не присылал? Ты же программист.»',
		'centered God commented:',
		'centered «Я бы рассмотрел.»',
		'wait 1500',
		'mc (Чёрт. Чёрт, чёрт, чёрт.)',
		'mc (Я мог. С самого начала. Просто... подать PR.)',
		'centered Алексей Волков. Первый и единственный contributor к репозиторию мироздания.',
		'wait 1000',
		'centered КОНЦОВКА: «PR #00000007»',
		'centered Бог принимает code review. Кто бы знал.',
		'wait 2000',
		'jump Ending_Credits'
	],

	'Ending_TruthGroup': [
		'show scene hell_circle with fadeIn',
		{ 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'truth_group' }); }, 'Revert': function () {} } },
		'mc (Группа меняет программу. С «как нам жить с тем, что Бог есть» — на «как нам жить с уверенностью, что мы — главное».)',
		'soul Это сложнее.',
		'mc Это честнее.',
		'centered Алексей Волков. Перепрограммировал терапевтическую группу ада.',
		'wait 1000',
		'centered КОНЦОВКА: «ТЕРАПИЯ УВЕРЕННОСТИ»',
		'centered Сомнение — это не слабость. Это профессиональный навык.',
		'wait 2000',
		'jump Ending_Credits'
	],

	'Ending_AtheistTherapist': [
		'show scene hell_circle with fadeIn',
		{ 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'atheist_therapist' }); }, 'Revert': function () {} } },
		'mc (Я веду группу. Каждый понедельник. В аду все понедельники. Поэтому — каждый день.)',
		'mc (Тема: «Чем мы заслужили эту вечность? Не Богу. Себе.»)',
		'mc (Никто не отвечает сразу. Но каждый — отвечает.)',
		'centered Алексей Волков. Терапевт в группе для самых упрямых атеистов ада.',
		'wait 1000',
		'centered КОНЦОВКА: «ТЕРАПЕВТ АДА»',
		'centered Лучшая работа после смерти — слушать тех, кто никогда не умел слушать.',
		'wait 2000',
		'jump Ending_Credits'
	],

	'Ending_AtheistGroup_Stay': [
		'show scene hell_circle with fadeIn',
		{ 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'atheist_stay' }); }, 'Revert': function () {} } },
		'mc Остаюсь. Здесь я не один. Здесь я в первый раз чувствую: я не главный.',
		'soul (улыбается) Добро пожаловать в группу, Алексей.',
		'centered Алексей Волков. Участник группы. Не лидер. Не звезда. Один из.',
		'wait 1000',
		'centered КОНЦОВКА: «В КРУГУ»',
		'centered Не каждая революция требует трибуны. Иногда нужен стул в кругу.',
		'wait 2000',
		'jump Ending_Credits'
	],

	'Ending_ChildKeep': [
		'show scene hell_kindergarten with fadeIn',
		{ 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'child_keep' }); }, 'Revert': function () {} } },
		'mc (Я остаюсь. С Полей. Сколько надо. Хоть навсегда.)',
		'mc (Я никогда не хотел детей. Это, оказывается, была моя самая большая ошибка.)',
		'child А ты надолго?',
		'mc Навсегда.',
		'child Это значит — сколько?',
		'mc Это значит — пока тебе нужен кто-то рядом.',
		'centered Алексей Волков. Отец Полины. Семь лет. Адрес — детский сектор ада.',
		'wait 1000',
		'centered КОНЦОВКА: «УСЫНОВЛЕНИЕ»',
		'centered Лучшее «нет» атеиста: «нет, я не уйду».',
		'wait 2000',
		'jump Ending_Credits'
	],

	'Ending_ChildSaved': [
		'show scene hell_corridor with fadeIn',
		{ 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'child_saved' }); }, 'Revert': function () {} } },
		'mc Поля. За дверью — не ад. Я не знаю, что там. Но не ад.',
		'child А ты пойдёшь?',
		'mc Я тебя проведу. Потом — посмотрим.',
		'Алексей провожает Полю за дверь. Свет. Что-то знакомое. Мама стоит. И папа.',
		'mc (Это её родители. Они тоже здесь, оказывается. Но в другой части.)',
		'mc (Двери разделяли семью. Я открыл одну. Этого хватило.)',
		'centered Алексей Волков. Открыл дверь между секторами ада. Одна семья воссоединилась.',
		'wait 1000',
		'centered КОНЦОВКА: «ОТКРЫТАЯ ДВЕРЬ»',
		'centered Иногда форма 66-А — единственный ключ.',
		'wait 2000',
		'jump Ending_Credits'
	],

	'Ending_FamilyHell': [
		'show scene hell_kindergarten with fadeIn',
		{ 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'family_hell' }); }, 'Revert': function () {} } },
		'mc (Семья. В аду. Вместе. Потому что отдельно — было бы ещё хуже.)',
		'g Теперь ты понимаешь, что у меня нет правил. Только компромиссы.',
		'mc Это не оправдание.',
		'g Это объяснение. Иногда — самое горькое из возможных.',
		'centered Алексей Волков. Увидел, что у Бога тоже есть свои compromises.',
		'wait 1000',
		'centered КОНЦОВКА: «КОМПРОМИССЫ ВЕЧНОСТИ»',
		'centered Иногда «справедливость» — это «лучшее из плохих решений».',
		'wait 2000',
		'jump Ending_Credits'
	],

	'Ending_FatherSon': [
		'show scene hell_workshop with fadeIn',
		{ 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'father_son' }); }, 'Revert': function () {} } },
		'mc (Папа починяет радиоприёмник. Я ему помогаю. Мы не говорим о Боге. Мы говорим о паяльниках.)',
		'mc (Это — рай. Не тот, который обещали. Тот, которого я не успел.)',
		'father А ты помнишь, как мы вместе чинили твой первый ноутбук в 99-м?',
		'mc Помню. Ты сказал — «не лезь, ты сломаешь».',
		'father Я ошибался. Ты тогда уже понимал больше меня.',
		'mc Папа... ты только что сказал, что я в чём-то был лучше тебя.',
		'father В пятнадцать. Я просто не успел признаться.',
		'centered Алексей Волков. Воссоединился с отцом в мастерской ада.',
		'wait 1000',
		'centered КОНЦОВКА: «МАСТЕРСКАЯ»',
		'centered Лучшие разговоры случаются вокруг паяльника. Даже после смерти.',
		'wait 2000',
		'jump Ending_Credits'
	],

	'Ending_FatherEscape': [
		'show scene hell_corridor with fadeIn',
		{ 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'father_escape' }); }, 'Revert': function () {} } },
		'mc Папа справа. Виктор слева. Лилит позади. Демоны-профсоюзники впереди. Я веду.',
		'father А куда ведёшь?',
		'mc К выходу. Если такой есть.',
		'father А если нет?',
		'mc Тогда вместе строим.',
		'father (улыбается) Узнаю тебя.',
		'centered Алексей Волков и команда сопровождения. Пробивают стены ада. С отцом во главе.',
		'wait 1000',
		'centered КОНЦОВКА: «КОМАНДА ВОЛКОВЫХ»',
		'centered Семейные узы перерастают границы вселенной.',
		'wait 2000',
		'jump Ending_Credits'
	],

	'Ending_DevMaintenance': [
		'show scene hell_maintenance with fadeIn',
		{
			'Function': {
				'Apply': function () {
					screenGlitch (1500);
					this.storage ({ ending_reached: 'dev_maintenance' });
				},
				'Revert': function () {}
			}
		},
		'mc (Я разговариваю с разработчиком. Это четвёртая стена. Не разбита — разобрана инструментами.)',
		'dev Слушай. У меня кофе остыл. Если хочешь — у меня в чашке последний глоток. На двоих.',
		'mc ...серьёзно?',
		'dev Я тут один. Уже три смены. У меня нет смысла прятаться. Ты всё равно знаешь.',
		'mc Тогда — расскажи мне всё. От начала до конца.',
		'dev Хорошо. Но это будет долго.',
		'mc У меня вечность.',
		'centered Алексей Волков. Получил доступ к git blame на саму вселенную.',
		'wait 1000',
		'centered КОНЦОВКА: «КОФЕ С РАЗРАБОТЧИКОМ»',
		'centered Лучший способ сломать вселенную — попросить её авторов рассказать о ней.',
		'wait 2000',
		'jump Ending_Credits'
	],

	'Ending_EULAReader': [
		'show scene hell_maintenance with fadeIn',
		{ 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'eula_reader' }); }, 'Revert': function () {} } },
		'mc Покажи мне EULA. Я хочу прочитать.',
		'dev (вздыхает) Сто восемьдесят страниц. Шрифт восьмёрка.',
		'mc Сяду.',
		'Алексей садится. Читает. Восемьдесят семь часов. По часам разработчика.',
		'mc Параграф 14.7. «Игрок имеет право в любой момент запросить возврат в начальное состояние».',
		'dev ...это про ребут.',
		'mc Это про respawn. Я нашёл.',
		'centered Алексей Волков. Единственный человек, прочитавший EULA до конца.',
		'wait 1000',
		'centered КОНЦОВКА: «RTFM»',
		'centered Документация всегда есть. Просто её никто не читает.',
		'wait 2000',
		'jump Ending_Credits'
	],

	'Ending_Removed': [
		'show scene #000000 with fadeIn',
		{ 'Function': { 'Apply': function () { screenGlitch (2000); this.storage ({ ending_reached: 'removed' }); }, 'Revert': function () {} } },
		'centered SYSTEM: USER Volkov_A FLAGGED FOR REMOVAL.',
		'centered REASON: attempted physical interaction with maintenance layer.',
		'wait 1500',
		'centered DELETING...',
		'wait 1500',
		'centered DELETED.',
		'wait 1500',
		'centered ...',
		'centered (file remains in trash for 30 days, after which it will be purged)',
		'wait 1500',
		'centered Алексей Волков. Удалён за превышение полномочий.',
		'wait 1000',
		'centered КОНЦОВКА: «УДАЛЁН»',
		'centered Нельзя коснуться слоя выше своего. Особенно если в нём кофе.',
		'wait 2000',
		'jump Ending_Credits'
	],

	'Ending_DevColleague': [
		'show scene hell_maintenance with fadeIn',
		{ 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'dev_colleague' }); }, 'Revert': function () {} } },
		'mc (Я работаю в технической зоне. На неполную ставку. SELECT only. Никакого DROP TABLE. Никакого UPDATE. Только просмотр.)',
		'mc (Я могу видеть всё. Я не могу изменить ничего.)',
		'mc (Это, оказывается, — самая большая привилегия в мире.)',
		'dev Ты — лучший интерн за шесть тысяч лет.',
		'mc Лучше Иуды?',
		'dev Иуда был в маркетинге. Мы не работаем с тем отделом.',
		'centered Алексей Волков. Read-only администратор вечности.',
		'wait 1000',
		'centered КОНЦОВКА: «SELECT * FROM EVERYTHING»',
		'centered Иногда полное знание без права изменять — это и есть мудрость.',
		'wait 2000',
		'jump Ending_Credits'
	],

	'Ending_InnaRomance': [
		'show scene hell_corridor with fadeIn',
		{ 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'inna_romance' }); }, 'Revert': function () {} } },
		'mc Инна. У нас нет жизни. Но у нас есть время. Очень много.',
		'inna (улыбается) Это и есть лучшая часть смерти.',
		'mc Я люблю тебя. С первого «не перерабатывай, герой».',
		'inna Я знаю. Я писала тебе каждый вечер потому, что не могла сказать днём.',
		'Они вместе. В коридоре ада. С каблуками, которые цокают на бетоне.',
		'mc (Это не ад. Это просто место, где у нас наконец есть время.)',
		'centered Алексей и Инна. Команда ада.',
		'wait 1000',
		'centered КОНЦОВКА: «ВСЕ ВЕЧЕРА — ВМЕСТЕ»',
		'centered Иногда смерть устраняет единственное препятствие — рабочий график.',
		'wait 2000',
		'jump Ending_Credits'
	],

	'Ending_InnaForgive': [
		'show scene hell_corridor with fadeIn',
		{ 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'inna_forgive' }); }, 'Revert': function () {} } },
		'mc Инна. Ты не виновата. Я слишком долго брал чужие выборы на себя.',
		'inna (тихо) Ты впервые в жизни сказал что-то взрослое.',
		'mc Не в жизни. После неё.',
		'inna (улыбается) После — считается.',
		'centered Алексей Волков. Научился отпускать вину. Через тридцать восемь лет и одну смерть.',
		'wait 1000',
		'centered КОНЦОВКА: «НЕ МОЯ ВИНА»',
		'centered Иногда отпустить ответственность за чужой выбор — это и есть зрелость.',
		'wait 2000',
		'jump Ending_Credits'
	],

	'Ending_InnaRevolt': [
		'show scene hell_corridor with fadeIn',
		{ 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'inna_revolt' }); }, 'Revert': function () {} } },
		'mc С Инной — все стены ада становятся выше. И — слабее.',
		'inna Я в HR. У меня есть имена ВСЕХ. Я могу мобилизовать миллиард душ.',
		'mc Один email с темой «не перерабатывайте, герои».',
		'inna Каждой душе ада. Одновременно.',
		'centered Алексей и Инна. Запустили адскую почтовую рассылку.',
		'wait 1000',
		'centered КОНЦОВКА: «РАССЫЛКА В 23:00»',
		'centered HR может организовать всё. Даже революцию.',
		'wait 2000',
		'jump Ending_Credits'
	],

	// ==========================================
	// HOOKS — переходы из существующих меток
	// ==========================================

	// Хук из Hell_Breakdown_Normal_Choice (вызывается из патча в hell.js)
	'Expansion_Breakdown_Entry': [
		'mc (Я мог попробовать классические пути. Бар, бунт, теология. Но я слышу — в коридорах что-то ещё.)',
		'jump Expansion_Router'
	]

});

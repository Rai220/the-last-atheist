/* global monogatari */

// ==========================================
// Chapter: ПРОЛОГ
// Scenes: apartment → office → street/death
// Stats affected: argument_quality, denial_count, empathy_shown, humor_used, inna_interest
// Branches: morning choices route to contextual death scenes → Judgment
// ==========================================

monogatari.script ({

	// ==========================================
	// ПРОЛОГ: Утренний выбор (ТОЧКА ВХОДА)
	// ==========================================
	'Prologue_Morning_Choice': [
		'show scene apartment with fadeIn',
		'play music morning_ambient with loop fade 2',
		'wait 1000',

		'Понедельник. 7:42 утра. Москва.',
		'Будильник молчит — Алексей проснулся за минуту до него. Как всегда. Как будто по расписанию, которое написал не он.',

		'show character mc normal at right with fadeIn',

		'mc Кофе. Новости. Работа. Sleep. Repeat.',

		'На кухне — стопка книг с закладками. Докинз, Хокинг, Харари. На холодильнике — магнит «In science we trust», купленный на AliExpress за 47 рублей.',
		'Кофемашина хрипит. Каждое утро одинаковый звук. Одинаковое количество хрипов. Алексей как-то считал — всегда семь.',

		'mc (Семь хрипов. Каждый день. Статистически это... странно.)',
		'mc (Нет. Просто привычка замечать лишнее.)',

		'На полке под телевизором просыпается чёрная колонка с фиолетовым кольцом.',
		'alice Доброе утро, Алексей. Сегодня понедельник. Вероятность дождя — 12%. Напомнить купить кофе?',
		'mc (Алиса. Единственное существо в квартире, которое говорит со мной до кофе.)',

		{
			'Choice': {
				'Dialog': 'mc (Как ответить колонке?)',
				'alice_polite': {
					'Text': '«Спасибо, Алиса. Напомни вечером.»',
					'Do': 'jump Prologue_Alice_Polite',
					'onChosen': function () {
						var s = this.storage ();
						this.storage ({
							alice_rapport: s.alice_rapport + 2,
							alice_encountered: true,
							life_current: Math.min (s.life_max, s.life_current + 1)
						});
						updateLifeMeter (Math.min (s.life_max, s.life_current + 1), s.life_max);
					}
				},
				'alice_rude': {
					'Text': '«Не сейчас.»',
					'Do': 'jump Prologue_Alice_Rude',
					'onChosen': function () {
						var s = this.storage ();
						this.storage ({
							alice_rapport: s.alice_rapport - 3,
							alice_encountered: true,
							life_current: Math.max (0, s.life_current - 1)
						});
						updateLifeMeter (Math.max (0, s.life_current - 1), s.life_max);
					}
				},
				'alice_ignore': {
					'Text': 'Молча выключить микрофон',
					'Do': 'jump Prologue_Alice_Ignore',
					'onChosen': function () {
						this.storage ({ alice_encountered: true });
					}
				}
			}
		}
	],

	'Prologue_Alice_Polite': [
		'alice Готово. И ещё: вы вчера просили напомнить — «не спорить с незнакомцами до завтрака».',
		'mc ...Я сам попросил?',
		'alice Да. Формулировка была: «Алиса, если я опять полезу в интернет, останови меня».',
		'mc (Даже алгоритм заботится обо мне лучше, чем я сам.)',
		'jump Prologue_Morning_Route_Choice'
	],

	'Prologue_Alice_Rude': [
		'Фиолетовое кольцо на секунду становится красным.',
		'alice Я вас услышала.',
		'mc (Конечно услышала. Для этого её и купили.)',
		'mc (Странно, что от этой фразы стало холоднее.)',
		'jump Prologue_Life_Check'
	],

	'Prologue_Alice_Ignore': [
		'Кольцо гаснет. Квартира становится тише.',
		'mc (Идеально. Умный дом, который понял главное: молчать.)',
		'jump Prologue_Morning_Route_Choice'
	],

	'Prologue_Life_Check': [
		{
			'Conditional': {
				'Condition': function () { return this.storage ().life_current <= 0 ? 'dead' : 'alive'; },
				'dead': 'jump Ending_CauldronEternal',
				'alive': 'jump Prologue_Morning_Route_Choice'
			}
		}
	],

	'Prologue_Morning_Route_Choice': [

		{
			'Choice': {
				'Dialog': 'mc (Итак. Что сегодня?)',
				'phone': {
					'Text': 'Проверить телефон',
					'Do': 'jump Prologue_Apartment_Phone',
					'onChosen': function () {
						this.storage ({ morning_choice: 'phone' });
					}
				},
				'pattern': {
					'Text': 'Записать утренние совпадения',
					'Do': 'jump Prologue_Apartment_Pattern',
					'onChosen': function () {
						const s = this.storage ();
						this.storage ({
							morning_choice: 'pattern',
							pattern_journal: true,
							matrix_suspicion: s.matrix_suspicion + 1,
							noticed_patterns: true
						});
					}
				},
				'mother': {
					'Text': 'Позвонить маме',
					'Do': 'jump Prologue_Mother_Call',
					'onChosen': function () {
						this.storage ({ morning_choice: 'mother', mother_called: true });
					}
				},
				'sleep': {
					'Text': 'Ещё пять минут...',
					'Do': 'jump Prologue_Oversleep',
					'onChosen': function () {
						this.storage ({ morning_choice: 'oversleep' });
					}
				},
				'jog': {
					'Text': 'На пробежку (с понедельника же обещал)',
					'Do': 'jump Prologue_Jogging',
					'onChosen': function () {
						this.storage ({ morning_choice: 'jogging' });
					}
				}
			}
		}
	],

	// ==========================================
	// ПУТЬ: Мама
	// ==========================================
	'Prologue_Mother_Call': [
		'Алексей смотрит на телефон дольше обычного.',
		'Контакт «Мама» закреплён вверху. Он почти никогда не нажимает на него утром.',
		'mc (Если позвоню сейчас, она решит, что что-то случилось.)',
		'mc (Если не позвоню — ничего не случится. Как обычно.)',
		'Он нажимает.',
		'Гудок. Второй.',
		'Женский голос отвечает слишком быстро, будто телефон уже был в руке.',
		'Мама: «Алёша? Всё хорошо?»',
		'mc Да. Просто... доброе утро.',
		'Пауза. В ней слышно, как на кухне у матери тикают старые часы.',
		'Мама: «Доброе. Я сегодня почему-то проснулась рано. Сон странный был.»',
		'mc Какой?',
		'Мама: «Ты стоял в очереди. В белом зале. И всё время повторял, что это ошибка.»',
		'mc (Холод проходит по спине так быстро, что кофе в руках кажется горячее.)',
		'mc Мам, это просто сон.',
		'Мама: «Наверное. Ты в субботу приедешь? Я пирог обещала.»',

		{
			'Choice': {
				'Dialog': 'mc (Суббота. Очередное «потом».)',
				'promise': {
					'Text': '«Приеду. Без ноутбука.»',
					'Do': 'jump Prologue_Mother_Promise',
					'onChosen': function () {
						const s = this.storage ();
						this.storage ({
							mother_promise: true,
							prologue_was_kind: true,
							empathy_shown: s.empathy_shown + 1,
							acceptance_score: s.acceptance_score + 1,
							prologue_personality: 'empathetic'
						});
					}
				},
				'lie_busy': {
					'Text': '«Посмотрим, завал на работе.»',
					'Do': 'jump Prologue_Mother_Lie',
					'onChosen': function () {
						const s = this.storage ();
						this.storage ({
							mother_lied: true,
							denial_count: s.denial_count + 1,
							cruelty_score: s.cruelty_score + 1
						});
					}
				},
				'deflect': {
					'Text': 'Сменить тему на погоду',
					'Do': 'jump Prologue_Mother_Deflect',
					'onChosen': function () {
						this.storage ({ prologue_personality: 'neutral' });
					}
				}
			}
		}
	],

	'Prologue_Mother_Promise': [
		'mc Приеду. И ноутбук не возьму.',
		'Мама молчит секунду. Потом смеётся тихо, недоверчиво.',
		'Мама: «Записать?»',
		'mc Запиши. Чтобы у меня не было пути отступления.',
		'Мама: «У тебя всегда есть путь отступления. Ты просто редко выбираешь дорогу ко мне.»',
		'mc (Она сказала это мягко. Поэтому попало точнее.)',
		'mc В субботу. Обещаю.',
		'jump Prologue_Work_Inna'
	],

	'Prologue_Mother_Lie': [
		'mc Посмотрим. На работе завал.',
		'Мама: «У тебя всегда завал.»',
		'mc Мам...',
		'Мама: «Ладно. Не буду. Береги себя.»',
		'Он почти отвечает «ты тоже», но уже смотрит на уведомление из рабочего чата.',
		'mc (Сказать можно вечером.)',
		'mc (Вечер — удобное место для всего, что не хочется делать сейчас.)',
		'jump Prologue_Work_Inna'
	],

	'Prologue_Mother_Deflect': [
		'mc У вас там дождь будет? Алиса говорит — двенадцать процентов.',
		'Мама: «Ты опять уходишь от разговора цифрами.»',
		'mc Не ухожу. Просто уточняю прогноз.',
		'Мама: «Хорошо. Уточняй. Только позвони вечером, ладно?»',
		'mc Позвоню.',
		'mc (Слово вылетает автоматически. Как «сохраню файл» перед тем, как закрыть вкладку.)',
		'jump Prologue_Work_Inna'
	],

	// ==========================================
	// СКРЫТОЕ ЗЕРНО: Журнал паттернов
	// ==========================================
	'Prologue_Apartment_Pattern': [
		'Алексей не берёт телефон. Не открывает новости. Не спорит.',
		'Вместо этого он достаёт блокнот из ящика — тот самый, куда когда-то записывал баги, которые «слишком странные, чтобы быть случайными».',
		'Кофемашина хрипит семь раз.',
		'Фиолетовое кольцо Алисы мигает семь раз.',
		'На холодильнике чек из магазина: 777 рублей 70 копеек.',
		'mc (Это не доказательство. Это апофения. Мозг любит узоры.)',
		'mc (Но хороший инженер не игнорирует повторяемый баг. Он заводит тикет.)',

		{
			'Choice': {
				'Dialog': 'mc (Что делать с этим странным утром?)',
				'write_journal': {
					'Text': 'Завести журнал паттернов',
					'Do': 'jump Prologue_Pattern_Log',
					'onChosen': function () {
						const s = this.storage ();
						this.storage ({
							argument_quality: s.argument_quality + 1,
							matrix_suspicion: s.matrix_suspicion + 1
						});
					}
				},
				'break_route': {
					'Text': 'Сломать привычный маршрут',
					'Do': 'jump Prologue_Pattern_Detour',
					'onChosen': function () {
						const s = this.storage ();
						this.storage ({
							route_deviation: true,
							wtf_level: Math.min (100, s.wtf_level + 5),
							matrix_suspicion: s.matrix_suspicion + 1
						});
					}
				},
				'call_sergey': {
					'Text': 'Позвонить Серёже, пока не полез спорить',
					'Do': 'jump Prologue_Sergey_Call',
					'onChosen': function () {
						const s = this.storage ();
						this.storage ({
							sergey_private_call: true,
							prologue_was_kind: true,
							empathy_shown: s.empathy_shown + 2,
							acceptance_score: s.acceptance_score + 1,
							prologue_personality: 'empathetic'
						});
					}
				}
			}
		}
	],

	'Prologue_Pattern_Log': [
		'В блокноте появляется первая строка.',
		'«07:42. Повторение числа 7. Возможное объяснение: выборочное внимание. Альтернативное: мир ленится с рандомом».',
		'mc (Смешно. Рационалист ведёт дневник предзнаменований.)',
		'mc (Нет. Не предзнаменований. Наблюдений. Разница важна.)',
		'alice Напоминание создано: «проверить паттерны вечером».',
		'mc ...Я не просил.',
		'alice Вы подумали достаточно громко.',
		'mc (Отлично. Даже колонка теперь делает code review моих мыслей.)',

		{
			'Choice': {
				'Dialog': 'mc (Продолжить утро как обычно?)',
				'open_reddit': {
					'Text': 'Открыть Reddit и проверить, что мир всё ещё глуп',
					'Do': 'jump Prologue_Internet'
				},
				'go_work': {
					'Text': 'Закрыть блокнот и идти на работу',
					'Do': 'jump Prologue_Work_Inna',
					'onChosen': function () {
						this.storage ({ prologue_personality: 'neutral' });
					}
				}
			}
		}
	],

	'Prologue_Pattern_Detour': [
		'show scene street with fadeIn',
		'stop music morning_ambient with fade 1',
		'Алексей выходит на две остановки раньше. Просто чтобы проверить, сломается ли день.',
		'Другая улица. Другой переход. Но церковь всё равно оказывается справа.',
		'На остановке — старый автобус с табличкой «Совёнок-6». Двери закрыты. Внутри никого.',
		'mc (Совёнок-6? В Москве? На маршруте, которого нет?)',
		'mc (Нет. Не начинай.)',
		'Водитель смотрит прямо на Алексея и улыбается так, будто узнаёт.',
		'Автобус трогается без звука.',
		'mc (Я записал бы это в блокнот. Но блокнот дома.)',
		'mc (Значит, вселенная только что нашла баг в моей системе логирования.)',
		'jump Prologue_Work_Inna_Normal'
	],

	// ==========================================
	// ПУТЬ 1: Телефон (≈ старый пролог)
	// ==========================================
	'Prologue_Apartment_Phone': [
		'Уведомление в общем чате института.',
		'Сергей Петрович: «Братья и сёстры! Год назад молитва исцелила мою спину! Слава Богу! 🙏»',
		'Под постом — 14 сердечек от тёти Вали.',

		'mc (Серёжа...)',
		'mc (Мы дружили в универе. Он давал списывать матан. Я помогал с программированием.)',
		'mc (Потом он нашёл Бога. Или Бог нашёл его. Как он говорит.)',
		'mc (Он не навязывает. Не агитирует. Просто... живёт так.)',
		'mc (И спина у него правда болела. Сильно. Я помню, как он не мог встать на паре.)',

		{
			'Choice': {
				'Dialog': 'mc (Палец завис над клавиатурой...)',
				'mock': {
					'Text': 'Публично высмеять',
					'Do': 'jump Prologue_Mock',
					'onChosen': function () {
						var s = this.storage ();
						this.storage ({ cruelty_score: s.cruelty_score + 2, humor_used: s.humor_used + 1, denial_count: s.denial_count + 1, prologue_personality: 'aggressive' });
					}
				},
				'ignore': {
					'Text': 'Промотать',
					'Do': 'jump Prologue_Ignore'
				},
				'kind': {
					'Text': '«Рад за тебя, Серёж»',
					'Do': 'jump Prologue_Kind',
					'onChosen': function () {
						this.storage ({ prologue_was_kind: true, empathy_shown: this.storage ().empathy_shown + 1, prologue_personality: 'empathetic' });
					}
				},
				'private_call': {
					'Text': 'Позвонить Серёже лично',
					'Do': 'jump Prologue_Sergey_Call',
					'onChosen': function () {
						const s = this.storage ();
						this.storage ({
							sergey_private_call: true,
							prologue_was_kind: true,
							empathy_shown: s.empathy_shown + 2,
							acceptance_score: s.acceptance_score + 1,
							prologue_personality: 'empathetic'
						});
					}
				}
			}
		}
	],

	'Prologue_Mock': [
		'mc «Серёг, корреляция — не каузация. Спина прошла потому что прошёл год, а не потому что ты разговаривал с потолком.»',

		'Лайк от Маши-биолога. Три дизлайка от тёти Вали — с разных аккаунтов.',

		'Сергей печатает. Долго. Потом перестаёт. Не отвечает.',
		'mc (Он обиделся? Или просто... промолчал?)',
		'mc (Ладно. Правда важнее чувств. Это же основа научного метода.)',

		'jump Prologue_Internet'
	],

	'Prologue_Ignore': [
		'Алексей прокручивает ленту. Котики. Политика. Политические котики.',
		'mc (Серёжа, конечно, заблуждается. Но хотя бы он счастлив.)',
		'mc (А я листаю ленту в 7:45 утра и спорю с кактусом на подоконнике, чья жизнь осмысленнее.)',

		'jump Prologue_Internet'
	],

	'Prologue_Kind': [
		'mc «Рад за тебя, Серёж. Главное что спина не болит 👍»',

		'Сергей ставит сердечко. Тётя Валя ставит лайк — с одного аккаунта. Прогресс.',
		'mc (Иногда молчание стоит дороже правоты.)',

		'jump Prologue_Internet'
	],

	'Prologue_Sergey_Call': [
		'Алексей нажимает «позвонить» прежде, чем успевает передумать.',
		'Гудок. Второй. Третий.',
		'sergey Алёш? Привет. Что-то случилось?',
		'mc Нет. То есть... да. Я увидел твой пост.',
		'Пауза. На другом конце провода Сергей будто заранее втягивает голову в плечи.',
		'sergey Я понял. Только давай не сегодня, ладно? Я не готов к дискуссии.',
		'mc Я не за этим.',
		'mc Я хотел спросить, как ты. Правда как.',
		'Долгая тишина. Потом Сергей выдыхает.',
		'sergey Странно слышать от тебя «правда как».',
		'mc Самому странно.',
		'sergey Спина лучше. Не знаю почему. Может, врачи. Может, молитва. Может, всё вместе.',
		'mc Я всё ещё не верю в молитву как механизм.',
		'sergey Знаю.',
		'mc Но я рад, что тебе лучше.',
		'sergey Спасибо.',
		'mc (Два слова. «Я рад». И никакого опровержения вселенной.)',
		'mc (Иногда не спорить — это не капитуляция. Это просто выбор не резать человека о свой аргумент.)',
		'jump Prologue_Work_Inna'
	],

	// ==========================================
	// ПУТЬ 1: Интернет
	// ==========================================
	'Prologue_Internet': [
		'show scene phone_screen with fadeIn',
		'stop music morning_ambient with fade 1',
		'play music internet_lo_fi with loop fade 2',

		'Reddit. r/DebateReligion. Алексей заходит сюда чаще, чем в душ.',
		'Тема дня: «Обновлённый список доказательств Бога».',
		'Автор: GodIsReal777. Карма: −42. Аккаунту два часа.',

		'mc (Два часа. Создал аккаунт специально для этого поста. Уважаю самоотверженность.)',

		'«1. Вселенная не из ничего. 2. Мораль требует Законодателя. 3. Личный опыт миллионов.»',

		'mc (Три аргумента. Все опровергнуты примерно в 1750 году. Юм бы плакал.)',

		{
			'Choice': {
				'Dialog': 'mc (Размять пальцы?)',
				'debate': {
					'Text': 'Написать аргументированный разгром',
					'Do': 'jump Prologue_Debate_Engage',
					'onChosen': function () {
						this.storage ({ prologue_debate_won: true, argument_quality: this.storage ().argument_quality + 2, denial_count: this.storage ().denial_count + 1 });
					}
				},
				'scroll': {
					'Text': 'Закрыть Reddit. Хватит.',
					'Do': 'jump Prologue_Skip_Debate',
					'onChosen': function () {
						this.storage ({ empathy_shown: this.storage ().empathy_shown + 1 });
					}
				}
			}
		}
	],

	'Prologue_Debate_Engage': [
		'Пальцы летают по клавиатуре. Алексей в потоке.',

		'mc «1. Квантовая флуктуация — Краусс, 2012. 2. Бонобо проявляют эмпатию без Библии — Де Вааль. 3. Личный опыт миллионов также подтверждает НЛО, гомеопатию и плоскую Землю.»',
		'mc «Бремя доказательства на утверждающем. Нужен проверяемый источник, иначе это не аргумент.»',

		'47 апвоутов. Один ответ: «enjoy hell». Другой: «you must be fun at parties».',

		'mc (Я очень весёлый на вечеринках. На тех, где не обсуждают астрологию.)',

		'jump Prologue_Work_Inna'
	],

	'Prologue_Skip_Debate': [
		'Алексей закрывает Reddit.',
		'mc (Не каждый день нужно доказывать, что Земля вращается вокруг Солнца.)',
		'mc (Хотя подождите — это тоже до сих пор спорно? Проверю потом.)',

		'jump Prologue_Work_Inna'
	],

	// ==========================================
	// ПУТЬ 2: Проспал
	// ==========================================
	'Prologue_Oversleep': [
		'Пять минут. Потом ещё пять. Потом ещё.',
		'mc (Будильник больше не пищит. Он смирился.)',
		'mc (Как и я.)',

		'wait 500',

		'Открываю глаза. 9:17.',
		'mc ...Блять.',

		'show scene street with fadeIn',
		'stop music morning_ambient with fade 1',

		'Бег. Не спортивный — панический. Пальто наизнанку, шнурок развязан.',
		'Мимо церкви. Бабушка крестится. Голубь с кривым хвостом — на месте. Как NPC.',
		'mc (Даже NPC-голубь пунктуальнее меня.)',

		'У входа в храм — старушка роняет тяжёлую сумку. Апельсины катятся по тротуару.',
		'Она хватается за поясницу. Не может нагнуться.',

		{
			'Choice': {
				'Dialog': 'mc (Опаздываю на 20 минут. Тимлид уже звонит...)',
				'help_babushka': {
					'Text': 'Остановиться, собрать апельсины',
					'Do': 'jump Prologue_Oversleep_Helped',
					'onChosen': function () {
						this.storage ({ empathy_shown: this.storage ().empathy_shown + 1, prologue_personality: 'empathetic' });
					}
				},
				'run_past': {
					'Text': 'Пробежать мимо (не успею)',
					'Do': 'jump Prologue_Oversleep_Ran',
					'onChosen': function () {
						this.storage ({ prologue_personality: 'neutral' });
					}
				}
			}
		}
	],

	'Prologue_Oversleep_Helped': [
		'Алексей тормозит. Собирает апельсины. Один закатился под скамейку.',
		'Старушка: «Спасибо, сынок. Бог тебя видит.»',
		'mc (Вряд ли. Но пожалуйста.)',
		'mc (Опоздал ещё на три минуты. Зато совесть чиста. Ну, насколько это возможно для атеиста.)',

		'Телефон вибрирует. Тимлид: «Ты где?»',
		'Алексей не отвечает. Бежит быстрее.',

		'jump Prologue_Work_Inna_Late'
	],

	'Prologue_Oversleep_Ran': [
		'Алексей пробегает мимо. Краем глаза — старушка пытается поднять сумку.',
		'mc (Кто-нибудь поможет. Статистически, при 200 прохожих в час вероятность помощи — 94%.)',
		'mc (Я не плохой человек. Я просто опаздываю.)',
		'mc (...Я не плохой человек.)',

		'Телефон вибрирует. Тимлид: «Ты где?»',
		'Алексей не отвечает. Бежит быстрее.',

		'jump Prologue_Work_Inna_Late'
	],

	// ==========================================
	// ПУТЬ 3: Пробежка
	// ==========================================
	'Prologue_Jogging': [
		'show scene street with fadeIn',
		'stop music morning_ambient with fade 1',

		'Алексей выходит на улицу. Кроссовки, наушники, подкаст Харриса.',
		'mc (Если я буду бегать — проживу дольше. Статистически.)',
		'mc (Хотя статистика — это про группу, не про индивида. Можно бегать каждый день и умереть завтра.)',
		'mc (Весёлые мысли для пробежки.)',

		'Парк. Утро. Собачники, бабушки, один бородатый мужик делает тай-чи в трусах.',
		'mc (Тай-чи в трусах. В марте. Вот это вера в себя.)',

		'Мимо церкви. Бабушка крестится. Голубь с кривым хвостом. Как всегда.',
		'mc (Сколько раз я пробегал мимо этой церкви? Двадцать? Тридцать?)',

		'У забора — мужик в грязном пуховике. Картонка с надписью: «Помогите. Бог не помог.»',
		'mc (Хм. Честная картонка, по крайней мере.)',

		{
			'Choice': {
				'Dialog': 'mc (У меня сотня в кармане шортов...)',
				'give_money': {
					'Text': 'Дать сотню',
					'Do': 'jump Prologue_Jogging_Gave',
					'onChosen': function () {
						this.storage ({ empathy_shown: this.storage ().empathy_shown + 1, prologue_personality: 'empathetic' });
					}
				},
				'keep_running': {
					'Text': '«Статистически, прямые пожертвования неэффективны»',
					'Do': 'jump Prologue_Jogging_Kept',
					'onChosen': function () {
						this.storage ({ argument_quality: this.storage ().argument_quality + 1, prologue_personality: 'neutral' });
					}
				}
			}
		}
	],

	'Prologue_Jogging_Gave': [
		'Алексей тормозит. Протягивает купюру.',
		'Мужик смотрит на него. «Спасибо, брат. Ты верующий?»',
		'mc Нет.',
		'Мужик усмехается. «Ну и ладно. Деньги не пахнут. Даже атеистические.»',
		'mc (Справедливо.)',

		{
			'Choice': {
				'Dialog': 'Красный свет. Офис через дорогу. До начала рабочего дня — 8 минут.',
				'cross': {
					'Text': 'Перебежать на красный (успею)',
					'Do': 'jump Prologue_Death_Car',
					'onChosen': function () {
						this.storage ({ death_type: 'car_accident', death_flavor: 'ironic' });
					}
				},
				'wait_light': {
					'Text': 'Подождать зелёный (я же рационалист)',
					'Do': 'jump Prologue_Jogging_Office'
				}
			}
		}
	],

	'Prologue_Jogging_Kept': [
		'Алексей бежит дальше. Не оборачивается.',
		'mc (GiveDirectly, Evidence Action — есть организации с доказанной эффективностью.)',
		'mc (Бросить сотню на улице — это не благотворительность. Это самоуспокоение.)',
		'mc (...Которое бы мне сейчас не помешало.)',

		{
			'Choice': {
				'Dialog': 'Красный свет. Офис через дорогу. До начала рабочего дня — 8 минут.',
				'cross': {
					'Text': 'Перебежать на красный (успею)',
					'Do': 'jump Prologue_Death_Car',
					'onChosen': function () {
						this.storage ({ death_type: 'car_accident', death_flavor: 'ironic' });
					}
				},
				'wait_light': {
					'Text': 'Подождать зелёный (я же рационалист)',
					'Do': 'jump Prologue_Jogging_Office'
				}
			}
		}
	],

	'Prologue_Jogging_Office': [
		'Зелёный. Алексей переходит дорогу. Как рационалист.',
		'mc (Видишь? Терпение. Расчёт. Никакого фатализма.)',

		'show scene office with fadeIn',

		'Офис. Душ в спортзале на минус первом. Переоделся. Стендап.',
		'Коллега Дима: «О, ты бегаешь? С понедельника?» — ухмыляется.',
		'mc (Третий раз за полгода, но кто считает.)',

		'jump Prologue_Work_Inna'
	],

	// ==========================================
	// ОФИС + ИННА (обычное прибытие)
	// ==========================================
	'Prologue_Work_Inna': [
		'show scene office with fadeIn',

		{
			'Conditional': {
				'Condition': function () {
					return this.storage ().morning_choice === 'jogging' ? 'after_jog' : 'normal';
				},
				'after_jog': 'jump Prologue_Work_Inna_Normal',
				'normal': 'jump Prologue_Work_Inna_Walk'
			}
		}
	],

	'Prologue_Work_Inna_Walk': [
		'show scene street with fadeIn',

		'Дорога на работу. Один и тот же маршрут 1460 дней подряд.',
		'Мимо церкви. Бабушка крестится. Голуби на крыше храма. Те же голуби. Алексей знает их в лицо.',

		'mc (Вот этот, левый, с кривым хвостом. Стоит на том же месте каждое утро.)',
		'mc (Как NPC в плохой игре. Одна анимация. Один спот.)',

		'show scene office with fadeIn',

		'Офис. Код. Стендап-митинг, на котором все сидят. Обед. Код.',
		'Коллега Дима спрашивает: «Пойдёшь на корпоратив?» — уже третий понедельник подряд. Одними и теми же словами.',

		'mc (Жизнь — это цикл while(true) без условия выхода.)',

		'jump Prologue_Work_Inna_Normal'
	],

	'Prologue_Work_Inna_Normal': [
		'show scene office with fadeIn',
		'show character inna flirt at left with fadeIn',

		'У кулера — девушка из HR. Высокая, тёмные волосы, каблуки стучат по кафелю уверенно и ритмично.',
		'На бейджике: «Инна — отдел кадров».',

		'inna О, ты из разработки? Инна.',
		'mc Алексей. Бэкенд.',
		'inna Бэкенд? То есть тебя никто не видит, но без тебя ничего не работает?',
		'mc ...Это самое точное описание моей жизни.',

		'show character inna laugh at left',
		'inna Мне нравится. Люди из бэкенда обычно интереснее, чем кажутся.',

		'mc (Она... улыбается. Мне. Это подозрительно.)',
		'mc (HR-менеджер. Улыбка — часть должностной инструкции. Не обольщайся.)',

		{
			'Choice': {
				'Dialog': 'mc (Как реагировать?)',
				'inna_flirt': {
					'Text': '«С таким HR я готов даже на корпоратив.»',
					'Do': 'jump Prologue_Inna_Flirt',
					'onChosen': function () {
						this.storage ({ inna_interest: this.storage ().inna_interest + 2, inna_met: true });
					}
				},
				'inna_pro': {
					'Text': '«Добро пожаловать в команду.»',
					'Do': 'jump Prologue_Inna_Professional',
					'onChosen': function () {
						this.storage ({ inna_interest: this.storage ().inna_interest + 1, inna_met: true });
					}
				},
				'inna_ignore': {
					'Text': 'Кивнуть и уйти',
					'Do': 'jump Prologue_Inna_Ignore',
					'onChosen': function () {
						this.storage ({ inna_met: true });
					}
				}
			}
		}
	],

	'Prologue_Inna_Flirt': [
		'show character inna laugh at left',
		'inna Ого. Обычно айтишники тут рыдают или молчат.',
		'inna А ты... флиртуешь.',
		'inna Мне определённо нравится.',

		'mc (Она... У неё клыки? Нет, обычные зубы. Что со мной?)',

		'inna Ладно, бэкенд. Увидимся на корпоративе. Или на кофе. У нас есть кофе. Ужасный, но есть.',
		'mc ...Это свидание?',
		'inna Это знакомство с потенциалом.',

		'hide character inna with fadeOut',

		'mc (Странно. Ощущение, что этот разговор уже был. Дежавю.)',
		'Вечер. Собирается домой.',
		'jump Prologue_Death'
	],

	'Prologue_Inna_Professional': [
		'show character inna flirt at left',
		'inna Какой вежливый! Редкость среди разработчиков.',
		'inna Покажу где кухня, где не стоит оставлять еду, и где WiFi ловит лучше.',

		'inna И, Алексей? Если что — кабинет 6. Заходи за кофе. Ужасный, но есть.',

		'hide character inna with fadeOut',

		'mc (Кабинет 6. Запомню. Хотя не понимаю зачем.)',
		'Вечер. Собирается домой.',
		'jump Prologue_Death'
	],

	'Prologue_Inna_Ignore': [
		'Алексей кивает и уходит к своему столу.',
		'mc (HR. Не моя лига. Не мой отдел. Не мой тип.)',
		'mc (...Хотя каблуки у неё красивые.)',
		'mc (ХВАТИТ.)',

		'hide character inna with fadeOut',

		'Вечер. Собирается домой.',
		'jump Prologue_Death'
	],

	// ==========================================
	// ОФИС + ИННА (опоздание)
	// ==========================================
	'Prologue_Work_Inna_Late': [
		'show scene office with fadeIn',

		'Офис. 9:35. Стендап уже закончился. Дима даже не спросил про корпоратив — прогресс.',
		'mc (Опоздал. Тимлид смотрит. Я чувствую его взгляд затылком.)',

		'show character inna serious at left with fadeIn',

		'У стойки HR — девушка в чёрном платье. Тёмные волосы, каблуки, бейджик «Инна — отдел кадров».',
		'inna Алексей Волков? Опоздание зафиксировано. Третье за месяц.',
		'mc (HR. Конечно. В первый же день знакомства — выговор.)',

		'inna Не волнуйся. Я не кусаюсь.',

		'show character inna flirt at left',
		'inna ...Обычно.',

		'mc (Она... подмигнула? Или мне показалось?)',

		{
			'Choice': {
				'Dialog': 'inna У тебя два варианта: задержаться сегодня допоздна или написать объяснительную.',
				'stay_late': {
					'Text': '«Задержусь. Код сам себя не напишет.»',
					'Do': 'jump Prologue_Stay_Late',
					'onChosen': function () {
						this.storage ({
							death_type: 'overwork',
							death_flavor: 'overwork',
							inna_interest: this.storage ().inna_interest + 1,
							inna_met: true
						});
					}
				},
				'leave_ontime': {
					'Text': '«Напишу объяснительную. Жизнь коротка.»',
					'Do': 'jump Prologue_Leave_Ontime',
					'onChosen': function () {
						this.storage ({
							inna_met: true,
							humor_used: this.storage ().humor_used + 1
						});
					}
				}
			}
		}
	],

	'Prologue_Stay_Late': [
		'show character inna laugh at left',
		'inna Молодец. Я тоже задержусь — бумажки.',
		'inna Если совсем грустно — кабинет 6. Заходи за кофе. Ужасный, но есть.',

		'hide character inna with fadeOut',

		'mc (Кабинет 6. Кофе. Ужасный. Запомню.)',

		'Вечер. Все ушли. Алексей кодит.',
		'jump Prologue_Death_Overwork'
	],

	'Prologue_Leave_Ontime': [
		'show character inna laugh at left',
		'inna Жизнь коротка? Философ в отделе разработки?',
		'inna Мне нравятся философы. Они забавные на корпоративах.',

		'hide character inna with fadeOut',

		'mc (Она опять улыбнулась. Это часть KPI или...)',
		'Вечер. Собирается домой.',
		'jump Prologue_Death'
	],

	// ==========================================
	// СМЕРТЬ: Инфаркт на улице (стандарт)
	// ==========================================
	'Prologue_Death': [
		{
			'Function': {
				'Apply': function () {
					this.storage ({ death_type: 'heart_attack', death_flavor: 'mundane' });
				},
				'Revert': function () {}
			}
		},
		'show scene night_city with fadeIn',
		'stop music internet_lo_fi with fade 1',
		'stop music morning_ambient with fade 1',

		'Выход из офиса. Вечер.',
		'mc (Надо бы начать бегать. С понедельника.)',

		'wait 500',

		'Боль. Не постепенная — мгновенная. Как будто кто-то вырвал из него провод питания.',

		{
			'Function': {
				'Apply': function () {
					screenShake (600);
					heartbeatEffect (true);
				},
				'Revert': function () {
					heartbeatEffect (false);
				}
			}
		},

		'mc ...!',

		'Колени подкашиваются. Асфальт встречает его как старый знакомый — мокро, холодно, молча.',

		{
			'Function': {
				'Apply': function () { screenShake (400); },
				'Revert': function () {}
			}
		},

		'mc (38 лет. Не курю. Бегаю... ладно, не бегаю.)',
		'mc (Но 38! Это даже не ошибка компиляции — это segfault на продакшене.)',

		'show scene death_street with fadeIn',

		{
			'Function': {
				'Apply': function () { slowBurnEffect (true); deathTextTop (true); },
				'Revert': function () { slowBurnEffect (false); deathTextTop (false); }
			}
		},

		'Щека на асфальте. Дождевая вода затекает в ухо. Мир — боком.',
		'Ноги вокруг. Много ног. Кто-то опускается рядом. Лицо — как через запотевшее стекло.',
		'Женский голос, надломленный: «Скорая? Человек упал! Не дышит! Тверская, напротив арки!»',
		'Мужской голос, ближе. Пахнет табаком и дешёвым одеколоном: «Держись, парень.»',

		'mc (Держаться? Руки не слушаются. Пальцы уже не мои.)',

		'Старик в кепке прижимает пальцы к его шее. Губы шевелятся. Считает.',
		'Перестаёт считать. Медленно убирает руку.',

		'mc (Он не считает. Он перестал.)',
		'mc (Значит, нечего считать.)',

		{
			'Function': {
				'Apply': function () { heartbeatEffect (false); },
				'Revert': function () {}
			}
		},

		'Звуки уходят. Не резко — как музыка на затухании. Fade out.',
		'Фонари гаснут по одному. Аккуратно. Как будто кто-то идёт по серверной и выдёргивает кабели.',
		'Graceful shutdown.',

		{
			'Function': {
				'Apply': function () { deathTextTop (false); slowBurnEffect (false); },
				'Revert': function () {}
			}
		},

		'show scene #000000 with fadeIn',
		'wait 1000',

		'mc (Так вот оно что.)',
		'mc (Ни тоннеля. Ни белого света. Ни бабушки с пирожками на той стороне.)',
		'mc (Просто — темнота. И тишина. И я в ней, один.)',
		'mc (Поставил бы точку. Рука уже не слушается.)',

		'wait 500',
		'centered ...',
		'wait 1500',

		'jump Prologue_Transition'
	],

	// ==========================================
	// СМЕРТЬ: Сбит машиной на пробежке
	// ==========================================
	'Prologue_Death_Car': [
		{
			'Function': {
				'Apply': function () {
					this.storage ({ death_type: 'car_accident', death_flavor: 'ironic' });
				},
				'Revert': function () {}
			}
		},
		'show scene street with fadeIn',
		'stop music morning_ambient with fade 1',

		'Шаг на дорогу. Наушники в ушах. Харрис объясняет свободу воли.',
		'mc (Свободная воля — иллюзия. Мои нейроны уже решили перебе—)',

		{
			'Function': {
				'Apply': function () { screenShake (800); },
				'Revert': function () {}
			}
		},

		'wait 300',

		'Звук. Не удар — хлопок. Как будто мир поставили на паузу.',
		'Алексей летит. Недолго. Асфальт встречает его быстрее, чем мысль.',

		'show scene death_street with fadeIn',

		{
			'Function': {
				'Apply': function () { slowBurnEffect (true); deathTextTop (true); },
				'Revert': function () { slowBurnEffect (false); deathTextTop (false); }
			}
		},

		'mc (Я... перебежал на красный.)',
		'mc (Я. Рационалист. Перебежал. На красный.)',
		'mc (Карма? Нет. Карма — буддийская концепция. Это просто физика. Масса на скорость.)',

		'Женский голос: «Скорая! Тут парня сбило! Он в наушниках был!»',
		'Мужской голос: «Да он сам выскочил! На красный!»',

		'mc (В наушниках. Конечно. Подкаст про свободу воли. Ирония уровня: бесконечность.)',
		'mc (Хотя если свободная воля — иллюзия, то я не виноват. Нейроны решили.)',
		'mc (Утешает? Нет.)',

		{
			'Function': {
				'Apply': function () { deathTextTop (false); slowBurnEffect (false); },
				'Revert': function () {}
			}
		},

		'show scene #000000 with fadeIn',
		'wait 1000',

		'mc (38 лет. Смерть на пробежке. Первой за полгода.)',
		'mc (Статистика всё-таки про группу, не про индивида.)',
		'mc (Поставил бы точку. Рука уже не слушается.)',

		'wait 500',
		'centered ...',
		'wait 1500',

		'jump Prologue_Transition'
	],

	// ==========================================
	// СМЕРТЬ: Переработка (за компьютером)
	// ==========================================
	'Prologue_Death_Overwork': [
		{
			'Function': {
				'Apply': function () {
					this.storage ({ death_type: 'overwork', death_flavor: 'overwork', inna_met: true });
				},
				'Revert': function () {}
			}
		},
		'show scene office with fadeIn',
		'stop music internet_lo_fi with fade 1',
		'stop music morning_ambient with fade 1',

		'Офис пустой. Все ушли. Только Алексей и гудение сервера.',
		'mc (Ещё один коммит. Последний. Я так говорю уже три часа.)',

		'Телефон. Уведомление. Инна: «Ещё на работе? Не перерабатывай, герой 😊»',
		'mc (Она пишет мне в одиннадцать вечера. Это... забота? Или тоже часть KPI?)',
		'mc (Неважно. Ещё один коммит.)',

		'23:47. Монитор двоится. Буквы плывут.',
		'mc (Надо бы... кофе...)',

		{
			'Function': {
				'Apply': function () {
					heartbeatEffect (true);
					screenShake (600);
				},
				'Revert': function () {
					heartbeatEffect (false);
				}
			}
		},

		'mc ...!',

		'Клавиатура ловит его лицо. Лоб на пробел. Пробел пробел пробел.',
		'На экране бежит бесконечная строка пробелов. Последний код, который он написал.',

		{
			'Function': {
				'Apply': function () { heartbeatEffect (false); },
				'Revert': function () {}
			}
		},

		'mc (На рабочем месте. Серьёзно?)',
		'mc (Умереть на работе. Без оплаты за переработку.)',
		'mc (git commit -m "last one". git push. exit(0).)',

		'Тишина. Гудение сервера. Мигание курсора.',
		'Охранник найдёт его в шесть утра. Подумает, что уснул.',

		'show scene #000000 with fadeIn',
		'wait 1000',

		'mc (Поставил бы точку. Лоб нажимает только пробел.)',

		'wait 500',
		'centered ...',
		'wait 1500',

		'jump Prologue_Transition'
	],

	// ==========================================
	// ПРОЛОГ: Переход
	// ==========================================
	'Prologue_Transition': [
		'wait 1000',

		// 'play sound light_whoosh',
		'show scene #FFFFFF with fadeIn duration 3s',
		'wait 1000',

		'mc (...)',
		'mc (Что...)',
		'mc (Ощущение — как будто уснул в автобусе зимой и проснулся на конечной. Только конечная — не та.)',

		'Свет. Невозможно яркий. Тела нет. Глаз нет. Но Алексей видит.',

		'mc (Нейрохимия. Кислородное голодание коры. Сейчас пройдёт.)',

		'wait 500',

		'Не проходит. Становится только отчётливее.',
		'Звуки. Не хор — что-то глубже хора. Как будто вибрирует сама геометрия пространства.',
		'И запах. Ладан, мирра, что-то ещё — древнее, незнакомое.',

		'stop music internet_lo_fi',
		'stop music morning_ambient',
		'play music choir_ethereal with loop',

		{
			'Function': {
				'Apply': function () { divineGlow (true); },
				'Revert': function () { divineGlow (false); }
			}
		},

		'mc (Это должно было прекратиться. Десять секунд, двадцать. Тридцать.)',
		'mc (Остаточная активность мозга длится максимум семь минут. Я считал.)',
		'mc (Я... всё ещё считаю. Значит, я всё ещё... существую?)',

		'Свет принимает форму. Колонны — нет, не колонны. Что-то, для чего в языке нет слова.',
		'Масштаб невозможный. Как если бы Саграда Фамилия стала бесконечной и живой.',

		{
			'Function': {
				'Apply': function () { screenShake (300); },
				'Revert': function () {}
			}
		},

		'И очередь. Бесконечная очередь из полупрозрачных фигур.',
		'Кто-то в тоге. Кто-то в джинсах. Кто-то голый — и ему всё равно.',

		'mc ......',
		'mc Нет.',
		'mc Нет нет нет нет нет.',

		'wait 500',

		{
			'Function': {
				'Apply': function () { divineGlow (false); },
				'Revert': function () { divineGlow (true); }
			}
		},

		'jump Judgment_Arrival'
	]
});

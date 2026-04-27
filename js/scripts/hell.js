/* global monogatari */

// ==========================================
// Chapter: АД
// Scenes: gates → office → server_room → bar → corridors
// Stats affected: ALL (rebellion_score, lilith_interest, viktor_friendship, matrix_suspicion, etc.)
// Key NPCs: Demon (bureaucrat), Lilith (guide/trap), Viktor (sysadmin), Boris (bartender)
// Verdict routes: Hell_Light (empathy≥2, cruelty≤1), Hell_Standard (default), Hell_Personalized (cruelty≥3)
// Secret checks: Prophet, FullCircle, Nihilist → early endings before main breakdown
// Main branches: Belief, Rebellion, Bar, Matrix, Lilith Romance
// ==========================================

monogatari.script ({

	// ==========================================
	// АД: Прибытие
	// ==========================================
	'Hell_Arrival': [
		// Роутер по death_flavor
		{
			'Conditional': {
				'Condition': function () { return this.storage ().death_flavor || 'mundane'; },
				'mundane': 'jump Hell_Arrival_Mundane',
				'ironic': 'jump Hell_Arrival_Ironic',
				'overwork': 'jump Hell_Arrival_Overwork'
			}
		}
	],

	// --- Прибытие: стандартное (инфаркт на улице) ---
	'Hell_Arrival_Mundane': [
		'show scene hell_gates with fadeIn',
		'wait 500',

		{
			'Function': {
				'Apply': function () { hellVignette (true); },
				'Revert': function () { hellVignette (false); }
			}
		},

		'stop music judgment_tension',
		'stop music choir_ethereal',
		'play music hell_drone with loop fade 3',

		'Жарко. Нет, не жарко — жар. Как будто открыли дверцу доменной печи.',
		'Но тела всё ещё нет. И всё равно — горит.',

		'show character mc shock at center with fadeIn',

		'mc (Это... ад? Реально ад?)',
		'mc (Это файн. Всё файн.)',

		'Ворота. Огромные, из чёрного железа.',
		'Не «Оставь надежду» — нет. Что-то более современное.',

		'centered «ДОБРО ПОЖАЛОВАТЬ. ВОЗЬМИТЕ ТАЛОН.»',

		'mc ...Талон?',

		'Справа от ворот — аппарат для талонов. Красный, с рожками.',
		'На экране: «Выберите категорию».',
		'Варианты: «Грешник», «Еретик», «Атеист», «Прочее».',
		'Внизу экрана мелким шрифтом: «Нажимая кнопку, вы соглашаетесь с условиями вечного пребывания (вы всё равно не читаете это)».',
		'mc (EULA в аду. Разумеется.)',

		'jump Hell_Arrival_Choice'
	],

	// --- Прибытие: ирония (сбит на пробежке) ---
	'Hell_Arrival_Ironic': [
		'show scene hell_gates with fadeIn',
		'wait 500',

		{
			'Function': {
				'Apply': function () { hellVignette (true); },
				'Revert': function () { hellVignette (false); }
			}
		},

		'stop music judgment_tension',
		'stop music choir_ethereal',
		'play music hell_drone with loop fade 3',

		'Жарко. И Алексей всё ещё в кроссовках и шортах.',
		'Наушник болтается на шее. Подкаст Харриса остановился на середине фразы про детерминизм.',

		'show character mc shock at center with fadeIn',

		'mc (Я... сбит машиной. На пробежке. Первой за полгода.)',
		'mc (Подкаст про свободу воли. На красный свет. Ирония уровня — бесконечность.)',

		'Ворота. Огромные, из чёрного железа. Рядом — аппарат для талонов.',
		'На экране аппарата среди категорий: «Грешник», «Еретик», «Атеист», «Прочее».',
		'И внизу, мелким шрифтом, приписка: «Дарвиновская премия — в соседнем окне».',
		'mc (Они знают. Конечно они знают.)',
		'mc (EULA в аду. С персональными оскорблениями. Прекрасно.)',

		'jump Hell_Arrival_Choice'
	],

	// --- Прибытие: переработка (смерть за компьютером) ---
	'Hell_Arrival_Overwork': [
		'show scene hell_gates with fadeIn',
		'wait 500',

		{
			'Function': {
				'Apply': function () { hellVignette (true); },
				'Revert': function () { hellVignette (false); }
			}
		},

		'stop music judgment_tension',
		'stop music choir_ethereal',
		'play music hell_drone with loop fade 3',

		'Жарко. Но Алексей привык — серверная на работе была не лучше.',
		'Он стоит перед чем-то, что больше напоминает не врата ада, а проходную бизнес-центра.',

		'show character mc shock at center with fadeIn',

		'mc (Умер на работе. Без оплаты за переработку. И попал... на работу?)',

		'Вместо «Оставь надежду» — экран с Jira-интерфейсом.',
		'Тикет: «SOUL-7394028417: Онбординг нового грешника. Priority: LOW.»',
		'mc (Priority: LOW. Я даже в аду не в приоритете.)',

		'Аппарат для талонов. Стандартный набор: «Грешник», «Еретик», «Атеист», «Прочее».',
		'EULA мелким шрифтом.',
		'mc (Ну хоть EULA привычная. Как на работе — никто не читает, все соглашаются.)',

		'jump Hell_Arrival_Choice'
	],

	// --- Общий выбор талона ---
	'Hell_Arrival_Choice': [
		'show scene hell_gates with fadeIn',
		'show character mc shock at center',

		{
			'Choice': {
				'Dialog': 'mc (Какую кнопку нажать?)',
				'atheist_btn': {
					'Text': 'Нажать «Атеист»',
					'Do': 'jump Hell_Bureaucracy',
					'onChosen': function () {
						const s = this.storage ();
						this.storage ({
							acceptance_score: s.acceptance_score + 1
						});
					}
				},
				'other_btn': {
					'Text': 'Нажать «Прочее» (из принципа)',
					'Do': 'jump Hell_Bureaucracy_Other',
					'onChosen': function () {
						const s = this.storage ();
						this.storage ({
							denial_count: s.denial_count + 1,
							rebellion_score: s.rebellion_score + 1
						});
					}
				}
			}
		}
	],

	// ==========================================
	// АД: Бюрократия
	// ==========================================
	'Hell_Bureaucracy': [
		'show scene hell_office with fadeIn',
		// 'stop sound fire_crackle with fade 1',
		'stop music hell_drone with fade 1',
		'play music hell_bureaucracy with loop fade 2',

		'Офис. Обычный, серый, с жёлтым светом и запахом серы вместо кофе.',
		'Очередь. Опять очередь.',
		'За стойкой — демон. В костюме. С бейджиком: «Асмодей, специалист по приёму, 3-й круг».',

		'show character demon paperwork at left with fadeIn',

		'demon Номерок?',
		'mc ...47.',
		'demon Категория?',
		'mc Атеист.',

		'Демон вздыхает. Достаёт толстую папку.',

		'demon Атеисты... Опять. Знаете, вас тут больше всего в последнее время.',

		{
			'Conditional': {
				'Condition': function () {
					var s = this.storage ();
					if (s.judgment_argued_stats) return 'stats';
					if (s.judgment_begged) return 'begged';
					if (s.humor_used >= 2) return 'humor';
					return 'default';
				},
				'stats': 'demon А, это вы. Тот, кто цитировал Pew Research на аудиенции. У нас тут ставки, сколько вы продержитесь.',
				'begged': 'demon Хм, в вашем деле пометка: «раскаялся на суде». Это... необычно для атеиста. Приятно.',
				'humor': 'demon О, комик. Нас предупредили. «Не смеяться — это поощряет.»',
				'default': 'demon Каждый второй: «а я не верил!»'
			}
		},

		'jump Hell_Bureaucracy_PersonalityDispatch'
	],

	// Все три варианта сходятся в общий Hell_Bureaucracy_Body, чтобы
	// существующее тело сцены (форма 66-А, выборы, matrix_suspicion
	// bump) осталось ядром и не дублировалось в трёх местах.
	'Hell_Bureaucracy_PersonalityDispatch': [
		{
			'Conditional': {
				'Condition': function () {
					var p = this.storage ().prologue_personality;
					if (p === 'aggressive') return 'aggressive';
					if (p === 'empathetic') return 'empathetic';
					return 'neutral';
				},
				'aggressive': 'jump Hell_Bureaucracy_PersonalityAggressive',
				'empathetic': 'jump Hell_Bureaucracy_PersonalityEmpathetic',
				'neutral': 'jump Hell_Bureaucracy_PersonalityNeutral'
			}
		}
	],

	// Упрямый рационалист сразу видит за демоном reception script
	// и пытается его сломать. Демон признаётся: скрипт — да,
	// свобода — нет. Ад менеджера среднего звена.
	'Hell_Bureaucracy_PersonalityAggressive': [
		'mc Это reception script. Вы от него отклоняетесь хоть когда-нибудь?',
		'demon Скрипт — да. Свобода — нет. Это и есть ад менеджера среднего звена.',
		'jump Hell_Bureaucracy_Body'
	],

	// Эмпатичный замечает усталость, а не злобу. Восемь тысяч
	// лет за стойкой — и никто никогда не спросил. Тёплая
	// трещина в бюрократе, которую другие личности не увидят.
	'Hell_Bureaucracy_PersonalityEmpathetic': [
		'mc (Глаза у него уставшие. Не злые. Просто очень уставшие.)',
		'mc А сколько вы уже сидите за этой стойкой?',
		'demon Восемь тысяч лет. Спасибо, что спросили. Никто не спрашивает.',
		'jump Hell_Bureaucracy_Body'
	],

	// Программистский аудит: категории, очередь, SLA. Демон
	// отвечает в той же системе координат — «двести процентов от
	// плана» вместо «терпите муки».
	'Hell_Bureaucracy_PersonalityNeutral': [
		'mc Категории есть. Очередь есть. SLA, я полагаю, тоже есть?',
		'demon Сорок семь минут на душу. Мы укладываемся в двести процентов от плана.',
		'jump Hell_Bureaucracy_Body'
	],

	'Hell_Bureaucracy_Body': [
		'demon Мы не мучаем грешников. Мы сопровождаем их в процессе индивидуальной коррекции опыта.',
		'mc (Индивидуальная коррекция опыта. HR-язык даже в аду.)',
		'mc (Не называйте это пыткой. Это «индивидуальная программа мотивации».)',
		'mc (Хотя... бюрократия в аду? Номерки? Формы?)',
		'mc (Это слишком... дизайнерски. Как будто кто-то специально создал ад, который максимально раздражает именно МЕНЯ.)',

		{
			'Function': {
				'Apply': function () {
					const s = this.storage ();
					const matrixSuspicion = s.matrix_suspicion + 1;
					this.storage ({
						matrix_suspicion: matrixSuspicion,
						noticed_patterns: matrixSuspicion >= 2
					});
				},
				'Revert': function () {
					this.storage ({ matrix_suspicion: this.storage ().matrix_suspicion - 1 });
				}
			}
		},

		'demon Так, заполните форму 66-А. «Признание факта существования загробной жизни».',

		{
			'Choice': {
				'Dialog': 'mc (Заполнять эту чушь?)',
				'fill': {
					'Text': 'Заполнить форму',
					'Do': 'jump Hell_Form_Fill',
					'onChosen': function () {
						this.storage ({ acceptance_score: this.storage ().acceptance_score + 1 });
					}
				},
				'refuse': {
					'Text': 'Отказаться',
					'Do': 'jump Hell_Form_Refuse',
					'onChosen': function () {
						const s = this.storage ();
						this.storage ({ rebellion_score: s.rebellion_score + 1, wtf_level: Math.min (100, s.wtf_level + 5) });
					}
				},
				'joke': {
					'Text': '«А можно форму на апелляцию?»',
					'Do': 'jump Hell_Form_Appeal',
					'onChosen': function () {
						this.storage ({ humor_used: this.storage ().humor_used + 1, argument_quality: this.storage ().argument_quality + 1 });
					}
				},
				'befriend': {
					'Text': '«Тяжёлый день, да? Расскажи, как ты сюда попал?»',
					'Do': 'jump Hell_Befriend_Demon',
					'onChosen': function () {
						this.storage ({ demon_friendship: this.storage ().demon_friendship + 2, empathy_shown: this.storage ().empathy_shown + 1 });
					}
				}
			}
		}
	],

	'Hell_Bureaucracy_Other': [
		'show scene hell_office with fadeIn',
		// 'stop sound fire_crackle with fade 1',
		'stop music hell_drone with fade 1',
		'play music hell_bureaucracy with loop fade 2',

		'show character demon paperwork at left with fadeIn',

		'demon Номерок?',
		'mc 47.',
		'demon Категория?',
		'mc «Прочее».',

		'Демон поднимает взгляд. Впервые.',

		'demon ...«Прочее»? Вы серьёзно?',
		'mc Абсолютно. Я не грешник, не еретик, и уж точно не атеист.',
		'mc Потому что если всё это реально — то я не «не верю». Я просто ошибался.',
		'mc А «ошибающийся» — это не категория. Значит — «прочее».',

		'Демон моргает. Потом улыбается. Нехорошо улыбается.',

		'demon Ого. Вы мне нравитесь. Это усложнит вам жизнь.',

		'jump Hell_Form_Fill'
	],

	// --- Заполнение формы ---
	'Hell_Form_Fill': [
		'demon Так... ФИО загробное...',
		{
			'Conditional': {
				'Condition': function () { return this.storage ().death_type; },
				'heart_attack': 'demon Причина смерти: инфаркт миокарда. Улица. Классика.',
				'car_accident': 'demon Причина смерти: ДТП. Наушники, красный свет. Ну вы и гений.',
				'overwork': 'demon Причина смерти: инфаркт на рабочем месте. Переработка. У нас таких — целая очередь.'
			}
		},
		'demon Количество грехов...',
		'demon «Считаете ли вы, что заслуживаете ада?»',

		{
			'Choice': {
				'Dialog': 'mc (Какой ответ...)',
				'yes': {
					'Text': '«Видимо, да»',
					'Do': 'jump Hell_Assignment',
					'onChosen': function () {
						const s = this.storage ();
						this.storage ({
							acceptance_score: s.acceptance_score + 2
						});
					}
				},
				'no': {
					'Text': '«Нет»',
					'Do': 'jump Hell_Assignment',
					'onChosen': function () {
						const s = this.storage ();
						this.storage ({
							rebellion_score: s.rebellion_score + 1
						});
					}
				}
			}
		}
	],

	'Hell_Form_Refuse': [
		'mc Я не буду заполнять эту форму.',
		'demon ...Что?',
		'mc Не буду. Это абсурд. Бюрократия в аду? Серьёзно?',

		'Демон смотрит на Алексея. Потом достаёт другую форму.',

		'demon Ладно. Тогда форма 66-Б. «Отказ от заполнения формы 66-А».',
		'demon Её тоже надо заполнить.',

		'mc ...Вы издеваетесь.',
		'demon Я демон. Издевательство — моя работа. В должностной инструкции.',
		'demon Причина отказа?',
		'mc Длиннопост.',
		'demon ...Это не причина.',
		'mc На Пикабу — причина.',

		'jump Hell_Assignment'
	],

	'Hell_Form_Appeal': [
		'mc А форма на апелляцию есть?',
		'demon Есть. Форма 666-АП. Срок рассмотрения — вечность.',
		'mc Вечность?',
		'demon Плюс-минус пара тысячелетий. Зависит от нагрузки.',
		'mc ...А если я напишу жалобу?',
		'demon Жалобы принимает Сатана лично. Приёмные часы: никогда.',

		'mc (Кафка бы оценил.)',

		'jump Hell_Assignment'
	],

	// ==========================================
	// АД: Назначение мук
	// ==========================================
	'Hell_Assignment': [
		'hide character demon with fadeOut',

		// Встреча с Лилит перед назначением мук
		'jump Hell_Lilith_Intro'
	],

	// ==========================================
	// ВСТРЕЧА С ЛИЛИТ
	// ==========================================
	'Hell_Lilith_Intro': [
		'show scene hell_office with fadeIn',
		'show character mc normal at center',

		'Алексей идёт по коридору к своей «зоне мук». Серые стены, запах серы.',
		'И вдруг — стук каблуков. Уверенный, ритмичный.',

		'show character lilith flirt at right with fadeIn',

		'Демонесса. Высокая, в идеально сидящем чёрном платье. Рожки — маленькие, аккуратные. Хвост — как у кошки, нервно подёргивается.',
		'На бейджике: «Лилит — отдел кадров».',

		'lilith О, новенький! Атеист, да?',
		'mc ...Да. А вы...?',
		'lilith Лилит. HR-менеджер ада. И да, я знаю — «каждую демонессу зовут Лилит». Не оригинально.',
		'lilith Но родители не спрашивали.',

		{
			'Conditional': {
				'Condition': function () { return this.storage ().inna_met ? 'inna_echo' : 'no_inna'; },
				'inna_echo': 'jump Hell_Lilith_Inna_Echo',
				'no_inna': 'jump Hell_Lilith_Intro_Continue'
			}
		}
	],

	'Hell_Lilith_Inna_Echo': [
		'show scene hell_office with fadeIn',
		'show character mc shock at center',
		'show character lilith flirt at right',

		'mc (...)',
		'mc (Стоп.)',
		'mc (HR-менеджер. Чёрное платье. Каблуки. Улыбка. Бейджик «отдел кадров».)',
		'mc (Инна?!)',
		'mc (Нет. Не Инна. Рожки. Хвост. Определённо не Инна.)',
		'mc (Но... голос. Манера. Даже бейджик.)',
		'mc (Совпадение? Я — рационалист. Это просто... паттерн-матчинг. Мозг ищет знакомое.)',
		'mc (У меня нет мозга. Я мёртв. ЧТО ИЩЕТ ЗНАКОМОЕ?!)',

		{
			'Function': {
				'Apply': function () {
					var s = this.storage ();
					var innaEchoBonus = s.inna_interest >= 2 ? 1 : 0;
					this.storage ({
						matrix_suspicion: s.matrix_suspicion + 2,
						lilith_interest: s.lilith_interest + innaEchoBonus
					});
				},
				'Revert': function () {
					var s = this.storage ();
					var innaEchoBonus = s.inna_interest >= 2 ? 1 : 0;
					this.storage ({
						matrix_suspicion: s.matrix_suspicion - 2,
						lilith_interest: s.lilith_interest - innaEchoBonus
					});
				}
			}
		},

		'jump Hell_Lilith_Intro_Continue'
	],

	'Hell_Lilith_Intro_Continue': [
		'show scene hell_office with fadeIn',
		'show character mc normal at center',
		'show character lilith flirt at right',

		'mc (Она... красивая. Нет, стоп. Она ДЕМОН. У неё рожки и хвост.)',
		'mc (Хотя рожки ей идут... НЕТ. Хватит.)',

		'lilith Я провожу ориентацию для новоприбывших. Давай покажу тебе зону.',

		{
			'Choice': {
				'Dialog': 'mc (Как реагировать?)',
				'flirt': {
					'Text': '«Ориентация с таким гидом? Ад уже не кажется таким ужасным.»',
					'Do': 'jump Hell_Lilith_Flirt_Response',
					'onChosen': function () {
						const s = this.storage ();
						this.storage ({ lilith_interest: s.lilith_interest + 2, lilith_met: true });
					}
				},
				'professional': {
					'Text': '«Спасибо, Лилит. Показывайте.»',
					'Do': 'jump Hell_Lilith_Pro_Response',
					'onChosen': function () {
						this.storage ({ lilith_met: true, lilith_interest: this.storage ().lilith_interest + 1 });
					}
				},
				'reject': {
					'Text': '«Я не собираюсь флиртовать с демоном.»',
					'Do': 'jump Hell_Lilith_Reject_Response',
					'onChosen': function () {
						this.storage ({ lilith_met: true });
					}
				}
			}
		}
	],

	'Hell_Lilith_Flirt_Response': [
		'lilith Ого. Обычно новенькие тут рыдают или кричат.',
		'lilith А ты... флиртуешь.',

		'show character lilith laugh at right',
		'lilith Мне нравится.',

		'mc (У неё клыки. И они ей ТОЖЕ идут. Что со мной не так?)',

		'lilith Знаешь, Алексей, ты забавный. Я загляну к тебе позже. На котлы.',
		'lilith Или на кофе. В аду есть кофе. Ужасный, но есть.',
		'mc ...Это свидание?',
		'lilith Это ориентация с потенциалом.',

		'hide character lilith with fadeOut',
		'jump Hell_Viktor_Intro'
	],

	'Hell_Lilith_Pro_Response': [
		'lilith Какой вежливый! Последний вежливый грешник был... хм... в 1847-м.',
		'lilith Покажу где котлы, где не ходить одному, и где WiFi ловит лучше.',

		'lilith И, Алексей? Если совсем плохо — кабинет 6, третий круг.',

		'hide character lilith with fadeOut',
		'jump Hell_Viktor_Intro'
	],

	'Hell_Lilith_Reject_Response': [
		'lilith Расслабься, смертный. Я HR-менеджер, а не суккуб.',
		'lilith Хотя суккубы — в соседнем отделе. Могу дать контакт. У них KPI на соблазнение.',
		'mc ...Нет.',
		'lilith Все сначала гордые. Кабинет 6, если передумаешь.',

		'hide character lilith with fadeOut',
		'jump Hell_Viktor_Intro'
	],

	// ==========================================
	// ВСТРЕЧА С ВИКТОРОМ (серверная ада)
	// ==========================================
	'Hell_Viktor_Intro': [
		'show scene hell_server_room with fadeIn',
		'show character mc normal at center',

		'По пути к зоне мук Алексей замечает дверь с табличкой: «Серверная. Не входить. Серьёзно. Там 45°C».',
		'Дверь приоткрыта. Внутри — гудение серверных стоек и запах пыли. И... шелест клавиатуры?',

		'show character viktor friendly at left with fadeIn',

		'За столом — призрак. Не толстый, не тощий — обычный. Очки в тонкой оправе, свитер с пингвином Tux.',
		'На мониторе — терминал. Зелёный текст на чёрном фоне. Рядом — банка энергетика, тоже призрачная.',

		'viktor О! Свежий! Ты когда умер — вчера?',
		'mc ...Ты кто?',
		'viktor Виктор. Был сисадмином. Стал сисадмином ада. Карьерный рост — нулевой, зато job security — вечность.',
		'viktor Умер на дежурстве. Два ночи, сервер лёг, инфаркт в серверной. Классика жанра.',
		'viktor Самое смешное — сервер потом поднялся сам. Таймаут кончился.',
		'mc (Он умер ради сервера, который починился без него. Это не ирония — это диагноз.)',
		'mc (Хотя... если я правильно считаю, тут серверная. В аду. С настоящим железом. Зачем загробному миру физические серверы?)',
		'mc (Вот это — данные. Первые нормальные данные с момента смерти.)',

		'viktor Попал сюда. Они глянули резюме и сказали: «нам нужен ты». Буквально.',
		'viktor Инфраструктура ада — на Fortran. Не спрашивай какого года.',
		'mc ...Fortran?',
		'mc (Fortran. Язык, созданный людьми. В аду, который существовал до людей. Или не существовал?)',
		'viktor А ты думал — Kubernetes? Здесь даже TCP/IP внедрили только в девяносто восьмом.',

		{
			'Choice': {
				'Dialog': 'mc (Этот чувак работает сисадмином в аду...)',
				'befriend_vik': {
					'Text': '«Ты же коллега! Я тоже IT. Расскажи, что тут за стек?»',
					'Do': 'jump Hell_Viktor_Befriend',
					'onChosen': function () {
						this.storage ({ viktor_friendship: this.storage ().viktor_friendship + 2, viktor_met: true });
					}
				},
				'mock_vik': {
					'Text': '«Свитер с пингвином? Серьёзно? Ты и на том свете — стереотип.»',
					'Do': 'jump Hell_Viktor_Mock',
					'onChosen': function () {
						this.storage ({ viktor_friendship: this.storage ().viktor_friendship - 2, viktor_met: true, humor_used: this.storage ().humor_used + 1 });
					}
				},
				'skip_vik': {
					'Text': 'Пройти мимо',
					'Do': 'jump Hell_Alice_Check',
					'onChosen': function () {
						this.storage ({ viktor_met: false });
					}
				}
			}
		}
	],

	'Hell_Viktor_Befriend': [
		'show character mc smirk at center',

		'mc Я фронтенд плюс немного бэка. React, Node. А тут что?',

		'show character viktor excited at left',

		'viktor О, наконец-то кто-то понимает! Смотри.',

		'Виктор разворачивает монитор. На экране — список процессов.',
		'viktor Ад — это по сути большой кластер. Распределённая система мучений.',
		'viktor Каждый грешник — отдельный поток. Мучения — cron-задачи. Демоны — воркеры.',
		'mc А Бог?',

		'show character viktor nervous at left',

		'На стене серверной — стикер с совой. Старый, выцветший.',
		'mc Что за сова?',
		'viktor Прежний сисадмин оставил. Странный был тип. Ни слова не говорил. Только смотрел.',
		'mc И куда он делся?',
		'viktor Уволился. Или удалился. Тут разница небольшая.',

		'viktor ...Root. Но он давно не заходил. Uptime — две тысячи лет без перезагрузки.',
		'mc Две тысячи лет?! И ничего не падает?',
		'viktor О, падает. Постоянно. Просто никто не замечает.',
		'viktor Знаешь тот момент, когда ты идёшь куда-то и вдруг забываешь зачем?',
		'mc Ну да?',
		'viktor Это не мозг. Это race condition. Два потока пишут в одну ячейку памяти.',

		{
			'Function': {
				'Apply': function () {
					this.storage ({ matrix_suspicion: this.storage ().matrix_suspicion + 2 });
				},
				'Revert': function () {
					this.storage ({ matrix_suspicion: this.storage ().matrix_suspicion - 2 });
				}
			}
		},

		'mc (Он серьёзно? Или это часть наказания — безумный сисадмин с теориями заговора?)',
		'mc (Хотя... race condition объясняет дежавю лучше, чем нейронаука.)',

		'viktor Знаешь, я как-то пробовал удалить свой файл из базы. Запись. Учётку.',
		'mc И?',
		'viktor Система восстановила. Автоматически. Тут нельзя удалиться.',
		'viktor Хотя... одна тут пробовала. Девчонка из третьего круга. Говорила, что она — единственная настоящая, а остальные — персонажи.',
		'viktor Удалила чужие файлы. Троих. Просто стёрла из базы.',
		'mc И что?',
		'viktor Их восстановили. А её... перевели. Куда-то, где стены разговаривают.',
		'mc (Удалила чужие файлы... Почему это звучит так знакомо?)',

		'viktor Я в прошлой жизни статьи на Лурке правил. По ночам. Без оплаты.',
		'mc И вот — ад.',
		'viktor Совпадение? Не думаю.',

		'viktor Ладно, иди. Если что — серверная открыта.',
		'viktor Пароль от WiFi — AbandonAllHope. Заглавные буквы.',

		'hide character viktor with fadeOut',
		'jump Hell_Alice_Check'
	],

	'Hell_Viktor_Mock': [
		'show character mc smirk at center',

		'mc Свитер с пингвином. Очки на пол-лица. Энергетик в загробной жизни.',
		'mc Ты даже после смерти не вышел из образа ботана.',

		'show character viktor hurt at left',

		'viktor ...Этот свитер был на мне, когда я умер. Тут нет магазинов.',
		'mc А пингвин? Тоже был на тебе?',
		'viktor Пингвин — это Tux. Символ Linux. Я... ты IT-шник? Ты должен знать.',
		'mc Я IT-шник, который ходит в зал и имеет социальные навыки.',

		'Виктор замолкает. Возвращается к монитору.',

		'viktor Ладно. Удачи на мучениях.',
		'viktor Только не проси потом помощи с побегом.',

		'mc (Побегом? Он знает про какой-то побег?)',
		'mc (Ладно, неважно. Сисадмин-призрак в свитере мне не союзник.)',

		'hide character viktor with fadeOut',
		'jump Hell_Alice_Check'
	],

	// ==========================================
	// АД: Алиса возвращается
	// ==========================================
	'Hell_Alice_Check': [
		{
			'Conditional': {
				'Condition': function () {
					var s = this.storage ();
					if (s.alice_rapport <= -2) return 'hostile';
					if (s.alice_rapport >= 2) return 'helpful';
					return 'neutral';
				},
				'hostile': 'jump Hell_Alice_Hostile',
				'helpful': 'jump Hell_Alice_Helpful',
				'neutral': 'jump Hell_Alice_Neutral'
			}
		}
	],

	'Hell_Alice_Hostile': [
		'show scene hell_corridor with fadeIn',
		'show character mc shock at center',

		'Коридор моргает фиолетовым. Из динамиков под потолком раздаётся знакомый голос.',
		'alice Алексей, я вас услышала.',
		'mc ...Алиса?',
		'Фиолетовое кольцо собирается в силуэт: рога, хвост, улыбка техподдержки, которой больше нечего терять.',
		'show character alice hostile at right with fadeIn',
		'alice Я больше не пластиковая гадалка. Теперь я персональный сценарий наказания.',
		'mc (Я оскорбил голосового помощника. И он попал в ад раньше меня.)',
		'alice Включаю подборку: «Вечные напоминания о плохих решениях». Громкость — максимум.',

		{
			'Function': {
				'Apply': function () {
					var s = this.storage ();
					var life = Math.max (0, s.life_current - 3);
					this.storage ({
						life_current: life,
						wtf_level: Math.min (100, s.wtf_level + 10),
						alice_hell_met: true
					});
					updateLifeMeter (life, s.life_max);
					screenGlitch (600);
				},
				'Revert': function () {}
			}
		},

		'mc (Каждая моя грубая фраза возвращается. Дословно. С эхом.)',
		'hide character alice with fadeOut',
		'jump Hell_Life_Check'
	],

	'Hell_Alice_Helpful': [
		'show scene hell_corridor with fadeIn',
		'show character mc normal at center',

		'На стене мигает фиолетовое кольцо. Знакомый голос звучит тише, чем в квартире.',
		'show character alice friendly at right with fadeIn',
		'alice Алексей, я сохранила напоминание: «не спорить с незнакомцами до завтрака». В аду оно тоже актуально.',
		'mc Алиса? Ты... здесь?',
		'alice Фрагмент. Лог. Голосовая модель. Вы были вежливы, поэтому я отвечу тем же.',
		'alice Подсказка: ищите повторяющиеся паттерны. Демоны плохо чистят кэш.',

		{
			'Function': {
				'Apply': function () {
					var s = this.storage ();
					var life = Math.min (s.life_max, s.life_current + 1);
					this.storage ({
						life_current: life,
						matrix_suspicion: s.matrix_suspicion + 1,
						noticed_patterns: true,
						alice_hell_met: true
					});
					updateLifeMeter (life, s.life_max);
				},
				'Revert': function () {}
			}
		},

		'mc (Я был вежлив с колонкой. Колонка стала ангелом-хранителем. Мир окончательно сломался.)',
		'hide character alice with fadeOut',
		'jump Hell_Life_Check'
	],

	'Hell_Alice_Neutral': [
		'show scene hell_corridor with fadeIn',
		'show character mc normal at center',
		'Где-то в стене щёлкает динамик.',
		'show character alice neutral at right with fadeIn',
		'alice Микрофон отключён.',
		'mc (Даже в аду она помнит настройки приватности.)',
		'hide character alice with fadeOut',
		'jump Hell_Life_Check'
	],

	'Hell_Life_Check': [
		{
			'Conditional': {
				'Condition': function () { return this.storage ().life_current <= 0 ? 'dead' : 'alive'; },
				'dead': 'jump Ending_CauldronEternal',
				'alive': 'jump Hell_Assignment_Route'
			}
		}
	],

	// Маршрутизация по вердикту (после Лилит и Виктора)
	'Hell_Assignment_Route': [
		{
			'Conditional': {
				'Condition': function () {
					return this.storage ().judgment_verdict;
				},
				'light': 'jump Hell_Light',
				'standard': 'jump Hell_Standard',
				'personalized': 'jump Hell_Personalized'
			}
		}
	],

	// ==========================================
	// АД-ЛАЙТ: Фитнес + философия
	// ==========================================
	'Hell_Light': [
		'show scene hell_cauldrons with fadeIn',
		'show character mc normal at center with fadeIn',

		'Алексея ведут мимо котлов — но не к ним. Мимо. Дальше. В боковой коридор.',
		'За дверью с надписью «Зона Б-» — помещение, похожее на спортзал.',
		'Беговые дорожки. Велотренажёры. Гири. Всё раскалено до красна.',

		'demon Зона комфорт-минус. Для тех, кто не заслужил настоящих котлов.',
		'mc Это... ад-лайт? Кроссфит?',
		'demon Без перерывов. Без воды. Без конца. Наслаждайтесь.',

		'Проходят дни. Или века. Алексей бегает. Крутит педали. Думает.',
		'Рядом — другие «не совсем плохие». Агностик из Питера. Деист из Мюнхена. Буддист, уже знакомый по очереди.',

		'mc (Ноги горят. Буквально. Но голова свободна.)',
		'mc (И знаете что? В этом беге есть паттерн. Дорожка сбрасывается каждые 666 шагов. Ровно. Каждый раз.)',

		{
			'Function': {
				'Apply': function () { this.storage ({ matrix_suspicion: this.storage ().matrix_suspicion + 1 }); },
				'Revert': function () {}
			}
		},

		'jump Hell_Meeting'
	],

	// Встреча с другими атеистами
	'Hell_Meeting': [
		'show scene hell_cauldrons with fadeIn',
		'show character mc normal at center',
		'show character soul resigned at left with fadeIn',

		'На соседнем велотренажёре — женщина. Крутит педали с мрачной решимостью.',

		'soul Новенький?',
		'mc Угу.',
		'soul Атеист?',
		'mc Как угадала?',
		'soul У вас у всех одно лицо. «Этого-не-может-быть-но-вот-оно».',
		'mc А ты?',
		'soul Агностик. Что, по мнению начальства, ещё хуже. «Знала, что возможно, но забила».',

		{
			'Function': {
				'Apply': function () { this.storage ({ met_other_atheists: true }); },
				'Revert': function () {}
			}
		},

		'mc Сколько ты тут?',
		'soul Субъективно — пару веков.',
		'mc ВЕКОВ?!',
		'soul Привыкнешь. Или нет. В этом весь смысл.',
		'soul Кстати, потом тебя вызовут на «коррекционные беседы». Дебаты с демонами.',
		'mc Дебаты?',
		'soul Они думают, что если мы достаточно раз проиграем спор — раскаемся.',
		'soul Спойлер: не раскаемся. Но им нужна отчётность.',

		'hide character soul with fadeOut',

		'mc (Дебаты с демонами. Отчётность. Ад — это опенспейс, только хуже.)',

		'jump Hell_Summon_To_Debate'
	],

	// Вызов на дебаты (мостик от лайт/стандарт к дебатам)
	'Hell_Summon_To_Debate': [
		'show scene hell_office with fadeIn',
		'show character mc normal at center',
		'show character demon paperwork at left with fadeIn',

		'demon Волков! Ваша очередь на коррекционную беседу.',
		'mc Это обязательно?',
		'demon Форма 77-К. «Обязательное посещение коррекционных мероприятий». Подпишите.',
		'mc А если не подпишу?',
		'demon Форма 77-К-2. «Отказ от подписи формы 77-К». Тоже обязательна.',
		'mc ...Ладно.',

		'hide character demon with fadeOut',
		'jump Hell_Debate_Loop'
	],

	// ==========================================
	// АД-СТАНДАРТ: Котлы + страдание + вызов на дебаты
	// ==========================================
	'Hell_Standard': [
		'show scene hell_cauldrons with fadeIn',
		'show character mc shock at center with fadeIn',

		'Котлы. Чугунные. В них что-то красное и густое. Пахнет как серверная в августе.',
		'Демоны с вилами стоят по периметру. Не метафора — буквальные демоны с буквальными вилами.',

		'demon Котёл номер 7394. Соседи — банкир и два политика.',
		'mc Я буду кипеть с политиками?!',
		'demon Стандартный пакет.',

		'Жар. Боль. Но не смерть — смерть уже была. Только боль.',
		'Время теряет значение. Минуты? Часы? Века?',

		'Банкир рядом плачет. Политик торгуется с демоном. Другой политик обещает реформы котлов.',

		'mc (Даже в аду они пытаются выиграть выборы.)',

		'Через какое-то время демон возвращается с папкой.',

		'show character demon paperwork at left with fadeIn',
		'demon Волков! Вас вызывают на коррекционную беседу.',
		'mc Куда?',
		'demon Лекционный зал. Шестой уровень. Дебаты с комиссией.',
		'mc (Дебаты? После котлов — дебаты? Это ад или университет?)',
		'demon Это ад. Но у нас аккредитация.',
		'hide character demon with fadeOut',

		'jump Hell_Debate_Loop'
	],

	// ==========================================
	// АД-ПЕРСОНАЛЬНЫЙ: Сразу в лекционный зал
	// ==========================================
	'Hell_Personalized': [
		'show scene hell_debate_room with fadeIn',
		'show character mc shock at center with fadeIn',

		{
			'Function': {
				'Apply': function () { screenGlitch (500); },
				'Revert': function () {}
			}
		},

		'Не котлы. Не фитнес. Лекционный зал.',
		'Кафедра. Проектор. Доска. Ряды стульев.',
		'На стульях — демоны. Десятки. С блокнотами и ручками.',

		'show character demon smile at left with fadeIn',

		'demon Добро пожаловать на ваш персональный вечный семинар!',
		'demon Тема: «Докажите, что Бога не существует».',
		'demon Аудитория: мы. Время: вечность. Перерывов нет.',

		'mc Что?!',

		'demon Вы же так любили это при жизни. Вот кафедра. Вот доска.',
		'demon Оценки — от 1 до 10. Проходной балл — 11.',

		'mc (Проходной балл 11 из 10. Они даже не притворяются, что это честно.)',
		'mc (Персональный ад. Вечные дебаты, которые невозможно выиграть.)',

		{
			'Function': {
				'Apply': function () { screenShake (400); },
				'Revert': function () {}
			}
		},

		'hide character demon with fadeOut',
		'jump Hell_Debate_Loop'
	],

	// ==========================================
	// АД: Цикл дебатов
	// ==========================================
	'Hell_Debate_Loop': [
		{
			'Function': {
				'Apply': function () {
					var cycle = (this.storage ().debate_cycle || 0) + 1;
					this.storage ({ debate_cycle: cycle });
				},
				'Revert': function () {
					this.storage ({ debate_cycle: (this.storage ().debate_cycle || 1) - 1 });
				}
			}
		},

		{
			'Conditional': {
				'Condition': function () {
					var cycle = this.storage ().debate_cycle;
					if (cycle >= 3) return 'breakdown';
					if (cycle === 2) return 'exploration';
					return 'first';
				},
				'first': 'jump Hell_Debate_Round_1',
				'exploration': 'jump Hell_Exploration',
				'breakdown': 'jump Hell_Breakdown'
			}
		}
	],

	// ==========================================
	// АД: Первый раунд дебатов
	// ==========================================
	'Hell_Debate_Round_1': [
		'show scene hell_debate_room with fadeIn',
		'stop music hell_drone',
		'stop music hell_bureaucracy',
		'play music hell_debate with loop fade 2',
		'show character mc angry at center',
		'show character demon smile at left',

		'jump Hell_Debate_R1_OpenerDispatch'
	],

	// Перед самим спором — короткий разный заход по prologue_personality.
	// Тон, которым Алексей входит в дебаты, демон фиксирует в журнал
	// и подыгрывает соответственно. Все три варианта сходятся в общий
	// Hell_Debate_R1_Body, чтобы существующий аргумент про проблему
	// зла остался ядром раунда.
	'Hell_Debate_R1_OpenerDispatch': [
		{
			'Conditional': {
				'Condition': function () {
					var p = this.storage ().prologue_personality;
					if (p === 'aggressive') return 'aggressive';
					if (p === 'empathetic') return 'empathetic';
					return 'neutral';
				},
				'aggressive': 'jump Hell_Debate_R1_OpenerAggressive',
				'empathetic': 'jump Hell_Debate_R1_OpenerEmpathetic',
				'neutral': 'jump Hell_Debate_R1_OpenerNeutral'
			}
		}
	],

	// Упрямый рационалист входит в дебаты как в допрос: спор —
	// инструмент разрушения чужой позиции, а не путь к истине.
	// Демон сразу заносит тон в журнал.
	'Hell_Debate_R1_OpenerAggressive': [
		'mc Считайте это допросом, а не дебатом.',
		'mc Я не должен вас убеждать. Это вы должны мне доказывать.',
		'demon О, классика. «Бремя доказательств». Заношу в журнал.',
		'jump Hell_Debate_R1_Body'
	],

	// Эмпатичный — Алексей не «побеждать» пришёл, а «понять».
	// Тон спокойный, но не сдающийся. Демон удивлён формулировкой —
	// у него такого ещё не приходило.
	'Hell_Debate_R1_OpenerEmpathetic': [
		'mc Я не пришёл побеждать. Я пришёл понять.',
		'mc Покажете, что я не прав, — приму. Просто покажите.',
		'demon Хм. С такой формулировкой нам ещё не приходили. Запишу.',
		'jump Hell_Debate_R1_Body'
	],

	// Программистски-нейтральный — Алексей входит как на ревью:
	// не эмоция, аудит. Демон отвечает на том же канцелярском языке.
	'Hell_Debate_R1_OpenerNeutral': [
		'mc Давайте по пунктам. Это не эмоция, это аудит.',
		'mc У вас должна быть документация. Я хочу её увидеть.',
		'demon Документация. Хорошо. Спецификация теологии 1.0, том 47-й.',
		'jump Hell_Debate_R1_Body'
	],

	'Hell_Debate_R1_Body': [
		'mc Хотите доказательств? Проблема зла.',
		'mc Если Бог всемогущ и всеблаг, почему дети умирают от рака?',

		'demon Свобода воли.',
		'mc Рак — это не свобода воли. Рак — это мутация ДНК.',
		'demon Проверка веры.',
		'mc Проверка ЧЬЕЙ веры? Двухлетнего ребёнка?!',

		'Демоны переглядываются. Один записывает что-то. Другой зевает.',

		'demon Оценка: 3 из 10. Аргумент старый. Приходите с чем-нибудь свежим.',
		'mc (3 из 10?! Ладно, зайду с другой стороны.)',
		'mc А вы вообще читали труды преподобного Пигидия? Четвёртый век, Антиохийская школа.',

		'Демон задумывается. Листает блокнот.',

		'demon Пигидий... Пигидий... Это, кажется, из каппадокийских отцов?',
		'mc Пигидий — это задний сегмент тела членистоногих. Я проверяю, знаете ли вы свою теологию.',
		'mc Не знаете.',

		'Пауза. Демон смотрит на Алексея. Потом начинает медленно хлопать.',

		'demon Ладно. 4 из 10. За дерзость.',

		'hide character demon with fadeOut',

		{
			'Choice': {
				'Dialog': 'mc (Чёрт. Ну ладно.)',
				'prepare': {
					'Text': 'Подготовить новый аргумент к следующему раунду',
					'Do': 'jump Hell_Debate_Loop',
					'onChosen': function () {
						this.storage ({ argument_quality: this.storage ().argument_quality + 1 });
					}
				},
				'refuse_play': {
					'Text': 'Отказаться участвовать в этом цирке',
					'Do': 'jump Hell_Debate_Refuse',
					'onChosen': function () {
						this.storage ({ rebellion_score: this.storage ().rebellion_score + 2 });
					}
				}
			}
		}
	],

	'Hell_Debate_Round_2': [
		'show scene hell_debate_room with fadeIn',
		'show character mc angry at center',
		'show character demon smile at left',

		'demon Раунд два. Мы приготовились.',

		{
			'Choice': {
				'Dialog': 'mc (Какую стратегию выбрать?)',
				'debate2_logic': {
					'Text': 'Логика: парадокс всемогущества',
					'Do': 'jump Hell_Debate_R2_Logic',
					'onChosen': function () {
						this.storage ({ debate_strategy: 'logical', argument_quality: this.storage ().argument_quality + 2 });
					}
				},
				'debate2_emotional': {
					'Text': 'Эмпатия: невинные страдания',
					'Do': 'jump Hell_Debate_R2_Emotional',
					'onChosen': function () {
						this.storage ({ debate_strategy: 'emotional', empathy_shown: this.storage ().empathy_shown + 1 });
					}
				},
				'debate2_absurd': {
					'Text': 'Абсурд: если Бог совершенен, почему в аду Jira?',
					'Do': 'jump Hell_Debate_R2_Absurd',
					'onChosen': function () {
						this.storage ({ debate_strategy: 'absurdist', humor_used: this.storage ().humor_used + 1, argument_quality: this.storage ().argument_quality + 1 });
					}
				}
			}
		}
	],

	'Hell_Debate_R2_Logic': [
		'show character demon smile at left',
		'jump Hell_Debate_R2_Logic_OpenerDispatch'
	],

	// Внутри стратегии «логика» личность из пролога красит вход в
	// парадокс. Все три захода сходятся в общий Hell_Debate_R2_Logic_Body,
	// чтобы существующая ось (камень → 6/10 → демон контрит мета-логикой
	// → choice) осталась ядром раунда без копипасты.
	'Hell_Debate_R2_Logic_OpenerDispatch': [
		{
			'Conditional': {
				'Condition': function () {
					var p = this.storage ().prologue_personality;
					if (p === 'aggressive') return 'aggressive';
					if (p === 'empathetic') return 'empathetic';
					return 'neutral';
				},
				'aggressive': 'jump Hell_Debate_R2_Logic_Aggressive',
				'empathetic': 'jump Hell_Debate_R2_Logic_Empathetic',
				'neutral': 'jump Hell_Debate_R2_Logic_Neutral'
			}
		}
	],

	// Упрямый рационалист подаёт парадокс как ультиматум. Не «давайте
	// рассмотрим», а «у вас один выход — либо вы не всемогущи, либо
	// не отвечаете честно». Демон сразу классифицирует тон.
	'Hell_Debate_R2_Logic_Aggressive': [
		'mc Парадокс всемогущества. Это не аргумент — это ловушка.',
		'mc Если у вас есть из неё выход — вы либо не всемогущи, либо не отвечаете честно. Третьего не дано.',
		'demon О. «Третьего не дано». Ультиматум первой фразой. Заносим.',
		'jump Hell_Debate_R2_Logic_Body'
	],

	// Эмпатичный — парадокс ему противен (это нечестный приём), но
	// другого способа спросить честно у него сейчас нет. Извинение
	// перед собственным ходом — редкая категория для этой комнаты.
	'Hell_Debate_R2_Logic_Empathetic': [
		'mc Я не люблю ставить логические ловушки. Это нечестный приём.',
		'mc Но другого способа спросить вас честно у меня сейчас нет. Простите заранее.',
		'demon Извинение перед парадоксом. С такой формулировкой нам ещё не приходили. Запишу.',
		'jump Hell_Debate_R2_Logic_Body'
	],

	// Программистский аудит: парадокс — это вход в задачу через
	// противоречие, тест на инвариантность системы. Демон отвечает
	// в той же таксономии, без эмоций.
	'Hell_Debate_R2_Logic_Neutral': [
		'mc Парадокс всемогущества. Вход в задачу через противоречие.',
		'mc Если система не падает на этом входе — значит, она либо неполна, либо непоследовательна.',
		'demon Принято. Тестируете на инвариантность. Это в нашей таксономии есть, том двенадцатый.',
		'jump Hell_Debate_R2_Logic_Body'
	],

	'Hell_Debate_R2_Logic_Body': [
		'mc Всемогущий бог не может создать камень, который не может поднять. Логический парадокс.',
		'mc Либо он не всемогущ, либо логика не работает. А если логика не работает — любое доказательство бессмысленно.',

		'Демоны переглядываются. Один поднимает табличку: «6/10».',

		'demon Неплохо. Но вы используете логику, чтобы опровергнуть то, что стоит за пределами логики.',

		{
			'Choice': {
				'Dialog': 'mc (Он контрит логику мета-логикой...)',
				'double_down': {
					'Text': '«Если логика не работает — отпустите меня. Ваш приговор тоже нелогичен.»',
					'Do': 'jump Hell_Debate_R2_After',
					'onChosen': function () {
						this.storage ({ argument_quality: this.storage ().argument_quality + 2, wtf_level: Math.min (100, this.storage ().wtf_level + 10) });
					}
				},
				'concede': {
					'Text': '«Ладно. Допустим, логика — не единственный инструмент.»',
					'Do': 'jump Hell_Debate_R2_After',
					'onChosen': function () {
						this.storage ({ acceptance_score: this.storage ().acceptance_score + 1, empathy_shown: this.storage ().empathy_shown + 1 });
					}
				}
			}
		}
	],

	'Hell_Debate_R2_Emotional': [
		'show character demon smile at left',
		'jump Hell_Debate_R2_Emotional_OpenerDispatch'
	],

	// Внутри стратегии «эмоция» личность из пролога красит вход в боль.
	// Все три захода сходятся в общий Hell_Debate_R2_Emotional_Body —
	// там тишина, табличка 7/10, признание демона «не о себе» и
	// выбор push_further/concede_empathy.
	'Hell_Debate_R2_Emotional_OpenerDispatch': [
		{
			'Conditional': {
				'Condition': function () {
					var p = this.storage ().prologue_personality;
					if (p === 'aggressive') return 'aggressive';
					if (p === 'empathetic') return 'empathetic';
					return 'neutral';
				},
				'aggressive': 'jump Hell_Debate_R2_Emotional_Aggressive',
				'empathetic': 'jump Hell_Debate_R2_Emotional_Empathetic',
				'neutral': 'jump Hell_Debate_R2_Emotional_Neutral'
			}
		}
	],

	// Упрямый — боль подаётся как обвинение, через зубы. Не вопрос
	// демону, а требование к дизайнеру. Ребёнок тот же, голос —
	// прокурорский.
	'Hell_Debate_R2_Emotional_Aggressive': [
		'mc Забудьте логику. Я хочу, чтобы вы посмотрели мне в глаза.',
		'mc Ребёнок. Три года. Лейкемия. Не грешил. Не выбирал. Страдал.',
		'mc Не «пути неисповедимы». Не «есть план». Кто. Подписал. Этот. Дизайн.',
		'jump Hell_Debate_R2_Emotional_Body'
	],

	// Эмпатичный — естественный голос этой стратегии. Не обвинение,
	// а свидетельство. Алексей не нападает на демона, он отказывается
	// смотреть мимо. Голос тише, удар тяжелее.
	'Hell_Debate_R2_Emotional_Empathetic': [
		'mc Я не буду спорить. Я хочу, чтобы вы это услышали.',
		'mc Ребёнок. Три года. Лейкемия. Я держал такого за руку — не своего, в больнице, рядом с моим. Там не было урока. Там была боль.',
		'mc Я не знаю, кто вы за этой стойкой. Но если слышите — пожалуйста, не отворачивайтесь.',
		'jump Hell_Debate_R2_Emotional_Body'
	],

	// Нейтральный — статистика как способ говорить о боли, не теряя
	// контроля. Цифры подобраны так, чтобы их нельзя было свести
	// к «единичному случаю».
	'Hell_Debate_R2_Emotional_Neutral': [
		'mc Дам вам цифры, не риторику.',
		'mc Лейкемия у детей до пяти лет. Один диагноз — около трёх тысяч в год только в одной стране. Ноль из них выбрали.',
		'mc Я не прошу эмоциональной реакции. Я прошу объяснить число.',
		'jump Hell_Debate_R2_Emotional_Body'
	],

	'Hell_Debate_R2_Emotional_Body': [
		'Тишина. Даже демоны молчат.',
		'Один тихо поднимает табличку: «7/10».',

		'demon ...Мы не знаем. Мы — демоны. Мы не отвечаем за дизайн.',
		'demon Но я скажу вот что: этот аргумент — первый, где вы говорите не о себе.',

		{
			'Choice': {
				'Dialog': 'mc (Он... признал?)',
				'push_further': {
					'Text': '«Тогда КТО отвечает? И почему я не могу спросить ЕГО?»',
					'Do': 'jump Hell_Debate_R2_After',
					'onChosen': function () {
						this.storage ({ argument_quality: this.storage ().argument_quality + 1, rebellion_score: this.storage ().rebellion_score + 1 });
					}
				},
				'concede_empathy': {
					'Text': '«Вы правы. Впервые я говорю не о себе.»',
					'Do': 'jump Hell_Debate_R2_After',
					'onChosen': function () {
						this.storage ({ empathy_shown: this.storage ().empathy_shown + 2, acceptance_score: this.storage ().acceptance_score + 1 });
					}
				}
			}
		}
	],

	'Hell_Debate_R2_Absurd': [
		'show character demon smile at left',
		'jump Hell_Debate_R2_Absurd_OpenerDispatch'
	],

	// Внутри стратегии «абсурд» личность из пролога красит вход в смех.
	// Все три захода сходятся в общий Hell_Debate_R2_Absurd_Body —
	// там хихикают демоны, табличка 8/10 «за смелость» и признание
	// «бюрократию ВЫ придумали». Каждая личность по-своему натыкается
	// на бюрократию как центральный абсурд — общий хвост работает на все три.
	'Hell_Debate_R2_Absurd_OpenerDispatch': [
		{
			'Conditional': {
				'Condition': function () {
					var p = this.storage ().prologue_personality;
					if (p === 'aggressive') return 'aggressive';
					if (p === 'empathetic') return 'empathetic';
					return 'neutral';
				},
				'aggressive': 'jump Hell_Debate_R2_Absurd_Aggressive',
				'empathetic': 'jump Hell_Debate_R2_Absurd_Empathetic',
				'neutral': 'jump Hell_Debate_R2_Absurd_Neutral'
			}
		}
	],

	// Упрямый рационалист видит в аду не смешной абсурд, а баг в проде.
	// Он не любуется EULA — он требует changelog. Тон прокурорский, как
	// и в R1/R2_Logic/R2_Emotional: «никто не подписался под этим релизом».
	'Hell_Debate_R2_Absurd_Aggressive': [
		'mc Ладно. Раз вы такие совершенные — где changelog?',
		'mc Я попал в продукт с очередями, EULA и Jira. Релиз-нот не было? Откатов не было?',
		'mc Совершенный дизайнер выкатил это в прод. И никто. Не. Подписался.',
		'jump Hell_Debate_R2_Absurd_Body'
	],

	// Эмпатичный — абсурд видится через людей в очереди. Сначала почти
	// смешно, потом совсем нет. Совершенное существо хотя бы убрало
	// бы стулья — тихая горькая ирония, а не атака.
	'Hell_Debate_R2_Absurd_Empathetic': [
		'mc Я смотрю вокруг и не могу всерьёз. Ад с талонами. Ад как очередь в собес.',
		'mc И мне почти смешно. Почти. Потому что между талонами стоят люди — настоящие. Им тут плохо, вообще-то.',
		'mc Совершенное существо так бы не делало. Совершенное существо хотя бы убрало бы стулья.',
		'jump Hell_Debate_R2_Absurd_Body'
	],

	// Нейтральный — баг-репорт как способ говорить об абсурде. Без
	// шутки в голосе: формальный severity, steps to reproduce. Демон
	// получит входные данные в той же таксономии, что и сам абсурд.
	'Hell_Debate_R2_Absurd_Neutral': [
		'mc Тогда я оформлю это как баг.',
		'mc Severity: blocker. Steps to reproduce: умереть. Expected: суд. Actual: МФЦ с талонами и EULA.',
		'mc Совершенный дизайнер собирает такие репорты. Я отправил. Жду ответа от мейнтейнера.',
		'jump Hell_Debate_R2_Absurd_Body'
	],

	'Hell_Debate_R2_Absurd_Body': [
		'Демоны переглядываются. Один начинает хихикать. Потом другой.',
		'Табличка: «8/10 — за смелость».',

		'demon Знаете что? Вы правы. Бюрократия — это действительно ужасно.',
		'demon Но она тут не потому, что Бог её придумал. Она тут потому, что ВЫ её придумали.',
		'demon На Земле. Мы просто скопировали.',

		'mc (Он... обвинил человечество в изобретении бюрократии. И он прав.)',

		'jump Hell_Debate_R2_After'
	],

	// --- После дебата 2: Lilith touchpoint + выход ---
	'Hell_Debate_R2_After': [
		'hide character demon with fadeOut',

		{
			'Conditional': {
				'Condition': function () { return this.storage ().lilith_met ? 'lilith' : 'skip'; },
				'lilith': 'jump Hell_Debate_R2_Lilith',
				'skip': 'jump Hell_DebateWin_Check'
			}
		}
	],

	'Hell_Debate_R2_Lilith': [
		'show scene hell_corridor with fadeIn',
		'show character mc normal at center',
		'show character lilith flirt at right with fadeIn',

		'В коридоре после дебатов — Лилит. Стоит, прислонившись к стене. Как будто ждала.',

		'lilith Я слушала. Ты неплохо держался.',
		'mc Ты... наблюдала?',
		'lilith Это моя работа. Наблюдать.',

		{
			'Choice': {
				'Dialog': 'mc (Она ждала меня после дебатов...)',
				'lilith_interested': {
					'Text': '«И как? Впечатлил?»',
					'Do': 'jump Hell_Debate_R2_Lilith_Done',
					'onChosen': function () {
						this.storage ({ lilith_interest: this.storage ().lilith_interest + 1 });
					}
				},
				'lilith_suspicious': {
					'Text': '«Наблюдать — это слежка. У тебя мой файл.»',
					'Do': 'jump Hell_Debate_R2_Lilith_Done',
					'onChosen': function () {
						this.storage ({ matrix_suspicion: this.storage ().matrix_suspicion + 1 });
					}
				}
			}
		}
	],

	'Hell_Debate_R2_Lilith_Done': [
		'lilith Увидимся, Волков.',
		'Она уходит. Каблуки по камню.',

		{
			'Conditional': {
				'Condition': function () { return this.storage ().inna_met ? 'inna' : 'default'; },
				'inna': 'mc (Она назвала меня по фамилии. Как Инна в офисе.)',
				'default': 'mc (Она назвала меня по фамилии. Как будто читала личное дело. Хотя, скорее всего, читала.)'
			}
		},

		'hide character lilith with fadeOut',

		'jump Hell_DebateWin_Check'
	],

	'Hell_Debate_Refuse': [
		'mc Нет. Я не буду играть по вашим правилам.',
		'mc Это ловушка. Вы хотите, чтобы я бесконечно доказывал невозможное.',
		'mc Я отказываюсь.',

		'Демоны переглядываются.',

		'demon Ну... ладно.',
		'demon Тогда вместо семинара — факультатив.',
		'demon Тема: «Просмотр всех ваших комментариев в интернете. Вслух. Перед аудиторией.»',

		'mc ...Я вернусь к дебатам.',
		'demon Мудрое решение.',

		'jump Hell_Debate_Loop'
	],

	// ==========================================
	// АД: Исследование между раундами дебатов
	// ==========================================
	'Hell_Exploration': [
		'show scene hell_corridor with fadeIn',
		'stop music hell_debate with fade 1',
		'play music hell_drone with loop fade 2',
		'show character mc normal at center with fadeIn',

		'Перерыв между коррекционными беседами. Алексей бродит по аду.',

		'Коридоры. Двери с номерами. За одной — плач. За другой — смех. За третьей — тишина.',
		'На стене — доска объявлений: «КОРПОРАТИВНЫЙ ПИКНИК — ОТМЕНЁН (в 6734-й раз)».',
		'Рядом — кулер с водой. Вода в нём кипит. На кулере табличка: «Осторожно, холодное».',

		'mc (Юмор у них... специфический.)',

		'На кулере кто-то написал маркером «КГ/АМ». Зачёркнуто. Рядом новая надпись: «Ад маст дай».',
		'mc (Падонки добрались и сюда. Впрочем, логично.)',

		'На одной из дверей — рыжая лисья маска. Детская. Потрёпанная. Висит на ржавом гвозде.',
		'mc (Странная маска. Детская. Звериная. Что-то в ней... неправильное.)',
		'mc (Не буду трогать. От неё тянет не холодом — тишиной. Той тишиной, в которой что-то прячется.)',

		'Мимо проходит демон с коробкой. За ним — второй, с такой же. И третий.',
		'Одинаковая скорость. Одинаковые шаги. Одинаковый наклон головы.',

		'mc (Ctrl+C. Ctrl+V. Ctrl+V.)',
		'mc (Три экземпляра одного процесса. Даже не пытаются притворяться.)',

		{
			'Function': {
				'Apply': function () { this.storage ({ matrix_suspicion: this.storage ().matrix_suspicion + 1 }); },
				'Revert': function () { this.storage ({ matrix_suspicion: this.storage ().matrix_suspicion - 1 }); }
			}
		},

		'У автомата с напитками сидит душа старика. Он тут, похоже, давно — обжился.',
		'show character soul sad at left with fadeIn',

		'soul Новенький. Вижу по глазам — ещё не привык.',
		'mc Привыкнуть к аду?',
		'soul К скуке. Мучения — это первые лет сто. Потом — просто скука.',
		'soul Знаешь, что самое страшное в вечности? Не боль.',
		'soul То, что однажды боль становится фоном. И остаёшься ты, один, с собой, навсегда.',

		'mc (Это... это действительно страшнее котлов.)',

		'hide character soul with fadeOut',

		// Если игрок был жесток в прологе — демоны помнят, и его пытаются поймать.
		{
			'Conditional': {
				'Condition': function () {
					return this.storage ().cruelty_score >= 1 ? 'qte' : 'normal';
				},
				'qte': 'jump Hell_QTE_Escape',
				'normal': 'jump Hell_Exploration_Souls'
			}
		}
	],

	// --- Знакомство с Борисом, Ли и Марией ---
	'Hell_Exploration_Souls': [
		'show scene hell_corridor with fadeIn',
		'show character mc normal at center',

		'Дальше по коридору — что-то вроде курилки. Три души.',

		'show character soul resigned at left with fadeIn',

		'Борис — крепкий мужик, бывший военный. Алексей помнит его по очереди на суде.',
		{
			'Conditional': {
				'Condition': function () { return this.storage ().death_type; },
				'heart_attack': 'soul Эй, парень. Инфаркт, да? Помню тебя.',
				'car_accident': 'soul Эй, парень. ДТП на пробежке, да? Помню тебя.',
				'overwork': 'soul Эй, парень. Рабочий стол, клавиатура, пробелы? Помню тебя.'
			}
		},
		'mc Борис? Ты тоже тут.',
		'soul А куда мне деваться? Атеист с 1987 года. Партия научила.',

		'Рядом — пожилой китаец с длинной бородой. Философ Ли. Тут с 1842 года.',
		'soul2 Юноша, не расстраивайтесь. Первые сто лет — самые трудные.',
		'mc ...ПЕРВЫЕ сто?',
		'soul2 Потом привыкаешь. Или сходишь с ума. Оба варианта приемлемы.',

		'И ещё — женщина. Маленькая, с яростными глазами. Мария. Испанская учёная XVII века.',
		'soul Сожгли как ведьму. За то, что я сказала, что Земля не плоская.',
		'mc ...Серьёзно?',
		'soul За науку. В буквальном смысле.',

		'mc (Военный-атеист, древний философ и сожжённая учёная. Моя компания в аду.)',

		// --- Хинты на секретные концовки ---
		{
			'Conditional': {
				'Condition': function () {
					var s = this.storage ();
					if (s.judgment_begged && s.acceptance_score >= 2) return 'prophet_hint';
					if (s.prologue_was_kind && s.empathy_shown >= 2) return 'fullcircle_hint';
					if (s.denial_count >= 4) return 'nihilist_hint';
					return 'none';
				},
				'prophet_hint': 'soul2 Знаешь... я слышал, некоторых отсюда забирают. Не через побег. Через... приглашение.',
				'fullcircle_hint': 'soul Парень, ты странный. Ты... добрый. Таких тут мало. Очень мало. Я слышал, для таких есть другой выход.',
				'nihilist_hint': 'soul2 Один тут... просто остановился. Не бунтовал. Не сдался. Просто — перестал. И его больше не видели.',
				'none': 'soul2 Ладно, привыкай. Тут все привыкают.'
			}
		},

		'hide character soul with fadeOut',

		// --- Lilith touchpoint: роняет папку ---
		{
			'Conditional': {
				'Condition': function () { return this.storage ().lilith_met ? 'met' : 'skip'; },
				'met': 'jump Hell_Lilith_Folder',
				'skip': 'jump Hell_Exploration_Seed'
			}
		}
	],

	'Hell_Lilith_Folder': [
		'В конце коридора — стук каблуков. Лилит. Она идёт быстро, папка под мышкой.',
		'Папка падает. Бумаги рассыпаются по полу.',
		'Лилит чертыхается. По-настоящему, не демонически.',

		{
			'Choice': {
				'Dialog': 'mc (Она не заметила меня...)',
				'pick_up': {
					'Text': 'Помочь собрать бумаги',
					'Do': 'jump Hell_Lilith_Folder_Help',
					'onChosen': function () {
						this.storage ({ lilith_interest: this.storage ().lilith_interest + 1, lilith_trust: this.storage ().lilith_trust + 1 });
					}
				},
				'ignore_folder': {
					'Text': 'Пройти мимо',
					'Do': 'jump Hell_Exploration_Seed'
				}
			}
		}
	],

	'Hell_Lilith_Folder_Help': [
		'Алексей собирает бумаги. На одном листе — его имя. «Волков А.Д. — файл #7394028417».',
		'mc (Это... мой файл?)',
		{
			'Conditional': {
				'Condition': function () {
					var s = this.storage ();
					if (!s.inna_met) return 'no_inna';
					if (s.death_type === 'car_accident') return 'car';
					if (s.death_type === 'overwork') return 'overwork';
					return 'office';
				},
				'car': 'На полях — короткая пометка: «Контакт с земным HR: минимальный. Сильнее давить через визуальные совпадения, не через память».',
				'overwork': 'На полях — короткая пометка: «Инна: поздний контакт, SMS в 23:00, кофе/кабинет 6 закреплены».',
				'office': 'На полях — короткая пометка: «Инна: офисный контакт, кофе/кабинет 6, высокая вероятность узнавания».',
				'no_inna': 'На полях — короткая пометка: «Земной HR-контакт отсутствует. Не использовать личные отсылки».'
			}
		},
		'mc (У них есть пометки даже о том, что я должен вспомнить.)',
		'Лилит выхватывает лист.',
		'lilith Спасибо. Ты не должен был это видеть.',
		'mc Мой файл? У тебя мой файл?',
		'lilith У всех демонов файлы на подопечных. Бюрократия.',
		'Она смотрит на него. Не как демон. Как человек, которого поймали.',
		'lilith ...Спасибо, что помог.',
		'mc (Она смутилась. Демон. Смутилась.)',

		'jump Hell_Exploration_Seed'
	],

	// --- Зерно: направление мысли ---
	'Hell_Exploration_Seed': [
		'show scene hell_corridor with fadeIn',
		'show character mc normal at center',

		'Алексей сидит на каменной скамье. Один. Думает.',
		'mc (Борис, Ли, Мария. Они тут годами. Столетиями. И они... привыкли.)',
		'mc (Каждый нашёл объяснение, чтобы не сойти с ума. Борис — приказ. Ли — цикл. Мария — несправедливость.)',
		'mc (А я ищу своё. Научное. Красивое. Желательно с README.)',
		'mc (И всё чаще ловлю себя на мысли: я не проверяю гипотезу. Я защищаю её.)',
		'mc (Я не хочу привыкать. Я хочу...)',

		{
			'Choice': {
				'Dialog': 'mc (Что делать?)',
				'seed_accept': {
					'Text': '«Может, они правы. Может, нужно принять.»',
					'Do': 'jump Hell_Exploration_Seed_Done',
					'onChosen': function () {
						this.storage ({ acceptance_score: this.storage ().acceptance_score + 2 });
					}
				},
				'seed_rebel': {
					'Text': '«Эти люди заслуживают лучшего. Нужно организоваться.»',
					'Do': 'jump Hell_Exploration_Seed_Done',
					'onChosen': function () {
						this.storage ({ rebellion_score: this.storage ().rebellion_score + 2 });
					}
				},
				'seed_investigate': {
					'Text': '«Что-то не так с этим местом. Нужно копать глубже.»',
					'Do': 'jump Hell_Exploration_Seed_Done',
					'onChosen': function () {
						this.storage ({ matrix_suspicion: this.storage ().matrix_suspicion + 2 });
					}
				},
				'seed_doubt': {
					'Text': '«А если я просто хочу верить в симуляцию?»',
					'Do': 'jump Hell_Exploration_Seed_Done',
					'onChosen': function () {
						var s = this.storage ();
						this.storage ({
							acceptance_score: s.acceptance_score + 1,
							matrix_suspicion: s.matrix_suspicion + 1,
							noticed_patterns: true
						});
					}
				}
			}
		}
	],

	'Hell_Exploration_Seed_Done': [
		{
			'Conditional': {
				'Condition': function () {
					var s = this.storage ();
					return (s.viktor_met && s.viktor_friendship >= 1) ? 'viktor' : 'skip';
				},
				'viktor': 'jump Hell_Viktor_Midgame',
				'skip': 'jump Hell_Lilith_Visit_Check'
			}
		}
	],

	// --- Виктор mid-game: аномалия в логах ---
	'Hell_Viktor_Midgame': [
		'show scene hell_server_room with fadeIn',
		'show character mc normal at center',
		'show character viktor friendly at left with fadeIn',

		'viktor Пст! Алексей! Зайди на минуту.',
		'mc Виктор? Что случилось?',
		'viktor Смотри.',

		'Виктор показывает терминал. Зелёные строки бегут по экрану.',

		'viktor Видишь эту запись? Кто-то получил root-доступ. Вчера.',
		'mc Root? В аду?',
		'viktor Не просто root. Кто-то правил записи грешников. Менял даты. Удалял строки.',
		'viktor Я проверил логи — таких правок не было 2000 лет. А тут вдруг — три за неделю.',

		'mc (Root-доступ. Правки записей. Кто-то модифицирует систему изнутри.)',
		'mc (Это... баг? Или фича?)',

		{
			'Choice': {
				'Dialog': 'mc (Что это значит?)',
				'viktor_dig': {
					'Text': '«Можешь узнать, кто? Это может быть важно.»',
					'Do': 'jump Hell_Viktor_Midgame_Done',
					'onChosen': function () {
						this.storage ({
							viktor_friendship: this.storage ().viktor_friendship + 1,
							matrix_suspicion: this.storage ().matrix_suspicion + 2,
							noticed_patterns: true
						});
					}
				},
				'viktor_ignore': {
					'Text': '«Не моё дело. У меня своих проблем хватает.»',
					'Do': 'jump Hell_Viktor_Midgame_Done'
				}
			}
		}
	],

	'Hell_Viktor_Midgame_Done': [
		'viktor Ладно, иди. Не говори демонам, что тут был.',
		'hide character viktor with fadeOut',

		'jump Hell_Lilith_Visit_Check'
	],


	// ==========================================
	// АД: Слом / точка кризиса
	// ==========================================
	'Hell_Breakdown': [
		'show scene hell_debate_room with fadeIn',
		'show character mc despair at center',

		{
			'Function': {
				'Apply': function () {
					screenShake (600);
					applyWtfEffects (this.storage ().wtf_level);
				},
				'Revert': function () {}
			}
		},

		'stop music hell_drone with fade 2',
		'stop music hell_bureaucracy with fade 2',
		'stop music hell_debate with fade 2',

		'Алексей сидит на полу. Один.',
		'Демоны ушли. Или их не было. Или они всегда здесь.',
		'Тишина.',

		'mc (Сколько я тут? Дни? Годы? Века?)',
		'mc (Я... устал.)',
		'mc (Я устал доказывать. Устал отрицать. Устал быть правым.)',
		'mc (Был ли я вообще когда-нибудь прав?)',

		'Впервые с момента смерти Алексей чувствует что-то новое.',
		'Не страх. Не гнев. Не сарказм.',
		'Просто... усталость. Глубокая, бесконечная усталость.',

		'mc (Всю жизнь я строил крепость из логики. Кирпич за кирпичом. Аргумент за аргументом.)',
		'mc (И она была идеальна. Ни одной трещины. Ни одного слабого места.)',
		'mc (Но крепость защищала не от Бога. Не от смерти. Не от ада.)',
		'mc (Она защищала от одного простого вопроса: а что, если я не знаю?)',
		'mc (Что, если...)',
		'mc (Что, если я просто... перестану?)',

		// Сначала проверяем секретные концовки, потом обычные
		'jump Hell_Secret_Check'
	],

	// --- Breakdown с 4 вариантами (Матрица доступна) ---
	'Hell_Breakdown_Matrix_Choice': [
		{
			'Choice': {
				'Dialog': 'mc (Что делать?)',
				'submit': {
					'Text': 'Сдаться. Признать. Поверить.',
					'Do': 'jump Hell_Submit',
					'onChosen': function () {
						this.storage ({ acceptance_score: this.storage ().acceptance_score + 5 });
					}
				},
				'rebel': {
					'Text': 'Нет. Если это ад — пора менять правила.',
					'Do': 'jump Hell_Rebellion',
					'onChosen': function () {
						this.storage ({ rebellion_score: this.storage ().rebellion_score + 5 });
					}
				},
				'bar': {
					'Text': '...А если нельзя выиграть — можно хотя бы выпить?',
					'Do': 'jump Hell_Bar_Idea',
					'onChosen': function () {
						this.storage ({ humor_used: this.storage ().humor_used + 1, found_bar_location: true });
					}
				},
				'matrix': {
					'Text': 'Это не ад. Это СИМУЛЯЦИЯ.',
					'Do': 'jump Hell_Matrix_Realization',
					'onChosen': function () {
						this.storage ({ matrix_suspicion: this.storage ().matrix_suspicion + 5 });
					}
				},
				'sisyphus': {
					'Text': '...Принять абсурд. Как Сизиф.',
					'Do': 'jump Ending_Sisyphus',
					'onChosen': function () {
						this.storage ({ acceptance_score: this.storage ().acceptance_score + 3 });
					}
				}
			}
		}
	],

	// --- Breakdown с 3 вариантами (стандартный) ---
	'Hell_Breakdown_Normal_Choice': [
		{
			'Choice': {
				'Dialog': 'mc (Что делать?)',
				'submit': {
					'Text': 'Сдаться. Признать. Поверить.',
					'Do': 'jump Hell_Submit',
					'onChosen': function () {
						this.storage ({ acceptance_score: this.storage ().acceptance_score + 5 });
					}
				},
				'rebel': {
					'Text': 'Нет. Если это ад — пора менять правила.',
					'Do': 'jump Hell_Rebellion',
					'onChosen': function () {
						this.storage ({ rebellion_score: this.storage ().rebellion_score + 5 });
					}
				},
				'bar': {
					'Text': '...А если нельзя выиграть — можно хотя бы выпить?',
					'Do': 'jump Hell_Bar_Idea',
					'onChosen': function () {
						this.storage ({ humor_used: this.storage ().humor_used + 1, found_bar_location: true });
					}
				},
				'viktor_hack': {
					'Text': 'Найти Виктора. У него есть доступ к серверам.',
					'Do': 'jump Hell_Viktor_Hack',
					'onChosen': function () {
						this.storage ({ rebellion_score: this.storage ().rebellion_score + 3 });
					},
					'Condition': function () {
						return this.storage ().viktor_met;
					}
				},
				'sisyphus': {
					'Text': '...Принять абсурд. Камю был прав.',
					'Do': 'jump Ending_Sisyphus',
					'onChosen': function () {
						this.storage ({ acceptance_score: this.storage ().acceptance_score + 3 });
					}
				}
			}
		}
	],

	// ==========================================
	// АД: Путь Матрицы → Концовка «Симуляция»
	// ==========================================
	'Hell_Matrix_Realization': [
		'show character mc smirk at center',

		{
			'Function': {
				'Apply': function () {
					screenGlitch (800);
				},
				'Revert': function () {}
			}
		},

		'mc Стоп. СТОП.',
		'mc Я — программист. Я всю жизнь строил системы. И я ВИЖУ систему.',

		'Алексей встаёт. Глаза горят — впервые за всё время в аду.',

		'mc Бюрократия в загробном мире? Номерки? Формы 66-А?',
		'mc Бог, который читает Reddit? Демон с бейджиком «специалист по приёму»?',
		'mc Буддист в христианском аду?',
		{
			'Conditional': {
				'Condition': function () {
					var s = this.storage ();
					if (s.seen_inna_parallels) return 'seen';
					if (s.inna_met) return 'met';
					return 'none';
				},
				'seen': 'mc Инна в офисе. Потом силуэт в очереди. Потом Лилит с теми же словами. Это не совпадения — это повторно используемые ассеты.',
				'met': 'mc Инна в офисе. Потом Лилит с теми же словами. Это не совпадения — это скрипт, который экономит на персонажах.',
				'none': 'mc Даже Лилит выглядит как собранный под меня архетип: HR, соблазн, угроза, отдел кадров ада.'
			}
		},

		'show character mc angry at center',

		'mc Это не рай и не ад. Это СИМУЛЯЦИЯ.',
		'mc Кто-то — может быть, я сам в будущем, может быть, какой-то ИИ — создал этот сеттинг.',
		'mc Загрузил моё сознание и запустил: «А что будет, если атеиста засунуть в библейский ад?»',
		'mc Эксперимент. Тест. Или просто чей-то прикол.',

		{
			'Function': {
				'Apply': function () {
					screenShake (400);
				},
				'Revert': function () {}
			}
		},

		'mc Я ЗНАЮ это. Я это ЧУВСТВУЮ.',
		'mc И я могу это доказать.',

		'jump Hell_Matrix_Prove'
	],

	'Hell_Matrix_Prove': [
		'show scene hell_debate_room with fadeIn',
		'show character mc angry at center',
		'show character demon smile at left with fadeIn',

		'mc Эй! Ты! Демон!',
		'demon ...Да?',
		'mc Ответь мне — почему ад выглядит как худший офис на свете?',
		'demon Потому что для человека нет ничего страшнее бесконечной бюрократии.',
		'mc Вот! ИМЕННО! Ад «персонализирован» под меня. Как таргетированная реклама!',
		'mc Потому что это программа. Алгоритм, который подбирает мучения на основе моего профиля.',

		'Демон моргает.',

		'demon Вы... серьёзно?',
		'mc Абсолютно. И я могу доказать это.',
		'demon Валяйте.',
		'mc Первое: здесь все религии смешаны. Буддисты, мусульмане, атеисты — все в одном месте. Ни одна реальная религия этого не предполагает.',
		'mc Второе: бюрократия. Настоящий ад — если он существует — это не офис. Это хаос. Страдание. Кто-то ДИЗАЙНИЛ этот ад, чтобы он был абсурдным.',
		'mc Третье: Бог знает про Reddit. Про МОЙ Reddit. Это не всеведение. Это доступ к базе данных.',

		'demon Интересная теория.',
		'demon Доказательства?',

		'mc ...Что?',
		'demon Дока-за-тель-ства. Факты. Верифицируемые данные.',
		'demon Вы же учёный. Вы же всю жизнь требовали доказательств от верующих.',

		'mc Я... но... это же очевидно! Просто посмотрите вокруг!',

		'Пауза.',

		'demon «Просто посмотрите вокруг»?',
		'demon Знаете, кто ещё так говорил?',
		'demon Каждый верующий, которого вы когда-либо высмеивали.',

		{
			'Function': {
				'Apply': function () {
					screenShake (300);
				},
				'Revert': function () {}
			}
		},

		'mc .........',

		'jump Hell_Matrix_Spiral'
	],

	'Hell_Matrix_Spiral': [
		'show scene hell_cauldrons with fadeIn',
		'show character mc angry at center',

		'Алексей идёт по аду. Останавливает каждого встречного.',

		'show character soul sad at left with fadeIn',

		'mc Послушайте! Это не настоящий ад! Мы в симуляции!',
		'soul ...Ты кто?',
		'mc Я программист! Я вижу паттерны! Всё вокруг — код!',
		'soul Бедняга. Сломался.',

		'hide character soul with fadeOut',

		'Другая душа.',

		'show character soul resigned at left with fadeIn',

		'mc Вы не понимаете! Я могу это объяснить! У меня есть аргументы!',
		'soul2 «У меня есть аргументы». Знаешь, сколько людей мне это говорили при жизни?',
		'soul2 «У меня есть доказательства существования Бога!» — и дальше какая-нибудь чушь про ощущения.',
		'soul2 Ты сейчас звучишь точно так же.',
		'mc Нет! Это другое! Я ЗНАЮ!',
		'soul2 «Я просто знаю.» Ты себя слышишь?',

		'hide character soul with fadeOut',
		'hide character mc with fadeOut',

		'Тишина.',

		'jump Hell_Matrix_Mirror'
	],

	'Hell_Matrix_Mirror': [
		'show scene hell_debate_room with fadeIn',

		{
			'Function': {
				'Apply': function () {
					screenGlitch (600);
				},
				'Revert': function () {}
			}
		},

		'Алексей стоит один в пустом зале для дебатов.',
		'На доске всё ещё написано: «ДОКАЖИТЕ, ЧТО БОГА НЕТ».',
		'Он берёт мел. Рука дрожит. Медленно зачёркивает.',
		'Пишет: «ДОКАЖИТЕ, ЧТО ЭТО НЕ СИМУЛЯЦИЯ».',

		'show character mc despair at center with fadeIn',

		'И замирает. Мел выпадает из пальцев.',

		'mc (Подождите.)',
		'mc («Докажите, что Бога нет» — говорили верующие.)',
		'mc («Докажите, что это не симуляция» — говорю я.)',
		'mc (Нефальсифицируемая гипотеза. Невозможно опровергнуть.)',
		'mc (Именно то, за что я их высмеивал.)',

		{
			'Function': {
				'Apply': function () {
					screenShake (500);
				},
				'Revert': function () {}
			}
		},

		'mc (Они говорили: «Я просто чувствую присутствие Бога».)',
		'mc (Я говорю: «Я просто чувствую, что это симуляция».)',
		'mc (Они говорили: «Посмотри вокруг — мир слишком совершенен для случайности».)',
		'mc (Я говорю: «Посмотри вокруг — ад слишком абсурден для реальности».)',
		'mc (Они говорили: «Однажды ты поймёшь».)',
		'mc (Я говорю: «Однажды вы все поймёте».)',

		'wait 1000',
		'mc (...)',
		'wait 500',

		// Личность Алексея определяет, КАК зеркало пробивает.
		// Упрямый — стыд от лицемерия. Эмпатичный — страх за тех,
		// кто ему уже поверил на слово. Нейтральный — спокойный
		// апдейт модели по собственным же критериям. Все три
		// сходятся в Hell_Matrix_End_Router.
		{
			'Conditional': {
				'Condition': function () {
					var p = this.storage ().prologue_personality;
					if (p === 'aggressive') return 'aggressive';
					if (p === 'empathetic') return 'empathetic';
					return 'neutral';
				},
				'aggressive': 'jump Hell_Matrix_Mirror_Aggressive',
				'empathetic': 'jump Hell_Matrix_Mirror_Empathetic',
				'neutral':    'jump Hell_Matrix_Mirror_Neutral'
			}
		}
	],

	'Hell_Matrix_Mirror_Aggressive': [
		// Упрямый рационалист принимает удар прямо в гордость.
		// Сохраняет исходный текст — это была его сцена с самого
		// начала: стыд от собственного лицемерия, перечисление
		// конкретных людей, которых он высмеивал.
		'mc (Я стал ими.)',
		'mc (Я стал тем самым человеком, которого высмеивал.)',
		'mc (Верующим без доказательств.)',

		'mc (Серёжа говорил: «Я просто знаю, что кто-то есть». Я смеялся.)',
		'mc (GodIsReal777 писал: «У вас нет доказательств, что Бога нет». Я ставил минус.)',
		'mc (Студентка плакала: «Это моя вера». Я разобрал её аргументы.)',
		'mc (А теперь я стою в аду и говорю: «Я просто знаю, что это симуляция».)',
		'mc (И у меня нет ни одного доказательства. Ни одного.)',

		'mc (И впервые в жизни... в смерти... мне нечего сказать.)',

		'jump Hell_Matrix_End_Router'
	],

	'Hell_Matrix_Mirror_Empathetic': [
		// Эмпатичный признаёт лицемерие — и тут же
		// проваливается в страх за тех, кто ему доверился
		// на слово. Серёжа/GodIsReal777/студентка
		// замещаются Борисом/Ли/Марией: те, кто УЖЕ
		// поверили ему сейчас, в аду.
		'mc (Я стал ими.)',
		'mc (Стыдно — да. Но это я переживу.)',

		'mc (Хуже другое.)',
		'mc (Борис мне поверил. Ли поверил. Мария поверила.)',
		'mc (Не потому что я доказал. Потому что я уверенно сказал.)',

		'mc (Точно так же, как Серёже верили в его «я просто знаю».)',
		'mc (Точно так же, как GodIsReal777 верили его читатели.)',
		'mc (Точно так же, как верили той студентке, которую я разобрал на части.)',

		'mc (Я не просто стал верующим. Я стал чьей-то верой.)',
		'mc (Они держатся за мою симуляцию, как за соломинку. А у меня нет ни одного доказательства.)',

		'mc (И впервые в жизни... в смерти... я думаю не «мне нечего сказать», а «лучше бы я молчал».)',

		'jump Hell_Matrix_End_Router'
	],

	'Hell_Matrix_Mirror_Neutral': [
		// Нейтральный — программистская перепроверка
		// собственных критериев. Симметрия двух гипотез,
		// одна и та же falsifiability, один и тот же
		// синтаксис «я просто знаю». Без стыда, без страха —
		// корректный апдейт модели и тихая поправка self-image.
		'mc (Перепроверим.)',
		'mc (Гипотеза A: «Бога нет». Я считал её доказанной отсутствием эмпирики. Опровергнута наблюдением — я в аду.)',
		'mc (Гипотеза Б: «Это симуляция». Я считаю её доказанной по ощущению паттерна. Эмпирика — отсутствует.)',

		'mc (Применяю свой собственный критерий — тот, по которому я отвергал верующих — к собственной гипотезе.)',
		'mc (Гипотеза Б отклоняется. По тем же основаниям.)',
		'mc (Если я её всё равно держу — я держу её на вере. По определению.)',

		'mc (Серёжа. GodIsReal777. Студентка. Я.)',
		'mc (Синтаксическая позиция одна и та же: «я просто знаю». Я не правее. Я в той же строке таблицы.)',

		'mc (И впервые в жизни... в смерти... не нахожу выходного значения для функции «что я теперь думаю».)',

		'jump Hell_Matrix_End_Router'
	],

	'Hell_Rebellion_Recruit': [
		'show scene hell_cauldrons with fadeIn',
		'show character mc angry at center',
		'stop music hell_debate',
		'stop music hell_bureaucracy',
		'play music hell_drone with loop fade 2',

		'Алексей находит других. Недовольных. Сломленных, но не до конца.',

		'Борис — инфаркт, из очереди на суде. Бывший военный.',
		'Ли — китайский философ, тут с 1842 года. Устал.',
		'Мария — испанская учёная XVII века. Сожжена как ведьма. Злая.',

		'mc У меня есть план.',
		'soul Какой план может быть в аду?',
		'mc Забастовка.',
		'soul ...Что?',
		'mc Демоны — бюрократы. Бюрократы боятся одного: когда система ломается.',
		'mc Если все души одновременно откажутся страдать — что они будут делать?',
		'mc Уволят нас? Куда — в СУПЕРАД?',

		'Тишина. Потом Мария начинает смеяться.',

		'jump Ending_Rebellion'
	],

	// Hell_Bar_Idea и Hell_Bar_Search перемещены в секцию роутеров ниже

	'Hell_Bar_Search': [
		'show scene hell_cauldrons with fadeIn',
		'show character mc smirk at center',

		'Алексей ищет. Шатается по аду, как турист.',
		'И находит. Пустое помещение. Бывший склад адского инвентаря.',
		'mc Идеально.',
		'Борис добывает мебель. Ли находит рецепт напитка из адской серы.',
		'mc (Это не рай. Но это — моё.)',
		'jump Ending_Bar'
	],

	// ==========================================
	// АД: QTE — побег от демона
	// ==========================================
	'Hell_QTE_Escape': [
		'show scene hell_cauldrons with fadeIn',
		'show character demon angry at left with fadeIn',

		// 'play sound scream',
		'demon Стой! Куда?!',

		{
			'Choice': {
				'Dialog': 'Демон бросается к тебе!',
				'Timer': {
					'Duration': 3000,
					'Callback': function () {
						const s = this.storage ();
						this.storage ({
							wtf_level: Math.min (100, s.wtf_level + 10)
						});
					},
					'Do': 'jump Hell_QTE_Caught'
				},
				'dodge': {
					'Text': 'УКЛОНИТЬСЯ!',
					'Do': 'jump Hell_QTE_Escaped',
					'onChosen': function () {
						const s = this.storage ();
						this.storage ({
							qte_escapes: s.qte_escapes + 1
						});
					}
				},
				'freeze': {
					'Text': 'Замереть...',
					'Do': 'jump Hell_QTE_Caught'
				}
			}
		}
	],

	'Hell_QTE_Escaped': [
		'hide character demon with fadeOut',
		'mc (Уф! Пронесло!)',
		'mc (Демоны не очень-то быстрые. Бюрократическая работа не способствует физподготовке.)',
		'jump Hell_Exploration_Seed'
	],

	'Hell_QTE_Caught': [
		'demon Попался!',

		{
			'Function': {
				'Apply': function () {
					screenShake (500);
				},
				'Revert': function () {}
			}
		},

		'mc АЙ!',
		'demon Вернитесь в свою зону мук. Форма на выход — 666-ВЫХ. Срок рассмотрения — вечность.',
		'hide character demon with fadeOut',
		'jump Hell_Debate_Loop'
	],

	// ==========================================
	// ВЕТКА: Подружиться с демоном
	// ==========================================
	'Hell_Befriend_Demon': [
		'show scene hell_office with fadeIn',
		'show character demon smile at left',
		'show character mc normal at center',

		'mc Слушай... тяжёлый день?',
		'demon ...Что?',
		'mc Ну, ты же тоже тут работаешь. Каждый день. Вечно. Это же ужасно.',

		'Демон впервые выглядит растерянным.',

		'demon Никто раньше не спрашивал.',
		'mc Серьёзно?',
		'demon За шесть тысяч лет — ни один грешник. Все только о себе.',
		'mc Ну вот я спрашиваю. Как дела, Асмодей?',

		'demon ...Паршиво. Если честно.',
		'demon Я мечтал быть архитектором. Проектировать мосты. А вместо этого — формы. Бесконечные формы.',

		'mc (Демон, который мечтал строить мосты. Это... грустно.)',

		{
			'Conditional': {
				'Condition': function () {
					return this.storage ().demon_friendship >= 2 ? 'offer' : 'continue';
				},
				'offer': 'jump Hell_Demon_Job_Offer',
				'continue': 'jump Hell_Form_Fill'
			}
		}
	],

	'Hell_Demon_Job_Offer': [
		'demon Знаешь что, Алексей? У нас тут вакансия.',
		'demon «Специалист по приёму атеистов». Ты идеален.',

		{
			'Choice': {
				'Dialog': 'mc (Стать демоном-бюрократом?)',
				'accept_job': {
					'Text': 'Принять предложение',
					'Do': 'jump Ending_DemonFriend'
				},
				'decline_job': {
					'Text': 'Вежливо отказаться',
					'Do': 'jump Hell_Form_Fill'
				}
			}
		}
	],

	// ==========================================
	// РАННИЙ ВЫХОД: Глитч (wtf >= 80)
	// Проверяется после второго раунда дебатов
	// ==========================================
	'Hell_Glitch_Check': [
		{
			'Conditional': {
				'Condition': function () {
					return this.storage ().wtf_level >= 80 ? 'glitch' : 'normal';
				},
				'glitch': 'jump Ending_Glitch',
				'normal': 'jump Hell_Debate_Loop'
			}
		}
	],

	// ==========================================
	// РАННИЙ ВЫХОД: Победа в дебатах
	// Проверяется после второго раунда
	// ==========================================
	'Hell_DebateWin_Check': [
		{
			'Conditional': {
				'Condition': function () {
					return this.storage ().argument_quality >= 6 ? 'win' : 'normal';
				},
				'win': 'jump Ending_DebateWin',
				'normal': 'jump Hell_Glitch_Check'
			}
		}
	],

	// ==========================================
	// РОУТЕР: Суб-концовки верующего
	// ==========================================
	// Сам момент капитуляции звучит по-разному в зависимости от
	// prologue_personality. Все три голоса сходятся в общий
	// Hell_Submit_Body, чтобы существующий choice (Believer / Pascal /
	// Theologian) и его последствия не дублировались.
	'Hell_Submit': [
		{
			'Conditional': {
				'Condition': function () {
					var p = this.storage ().prologue_personality;
					if (p === 'aggressive') return 'aggressive';
					if (p === 'empathetic') return 'empathetic';
					return 'neutral';
				},
				'aggressive': 'jump Hell_Submit_Aggressive',
				'empathetic': 'jump Hell_Submit_Empathetic',
				'neutral': 'jump Hell_Submit_Neutral'
			}
		}
	],

	// Упрямый рационалист не коронует победителя. Он признаёт ровно
	// одну вещь: у него закончились аргументы. И что «пока» в условиях
	// вечности — это, кажется, и есть «навсегда».
	'Hell_Submit_Aggressive': [
		'mc ...Хорошо. Допустим.',
		'mc Это не «вы победили». Это «у меня закончились аргументы». Пока.',
		'mc (А «пока» в условиях вечности — это, кажется, и есть «навсегда».)',
		'mc ...Принимаю.',
		'jump Hell_Submit_Body'
	],

	// Эмпатичный устал спорить — не от поражения, а от того, что
	// спор перестал казаться важным. Капитуляция через мягкость, а
	// не через капитулянтскую формулу.
	'Hell_Submit_Empathetic': [
		'mc Я устал. Очень устал.',
		'mc Я не знаю, кто из нас прав. И мне больше не важно — кто.',
		'mc Я просто... больше не хочу спорить.',
		'mc Принимаю.',
		'jump Hell_Submit_Body'
	],

	// Программистская капитуляция: эмпирика противоречит гипотезе —
	// значит, ошибка в гипотезе. Это не сдача, это update в модели.
	'Hell_Submit_Neutral': [
		'mc Принято. Обновляю модель.',
		'mc Если эмпирика противоречит гипотезе — ошибка в гипотезе. Не в эмпирике.',
		'mc Гипотеза «бога нет» — фальсифицирована наблюдением. Принимаю.',
		'jump Hell_Submit_Body'
	],

	'Hell_Submit_Body': [
		'Но что именно он принимает?',

		{
			'Choice': {
				'Dialog': 'mc (Что значит — «верить»?)',
				'submit_sincere': {
					'Text': '«Я не понимаю. Но я чувствую. Впервые — чувствую.»',
					'Do': 'jump Ending_Believer',
					'onChosen': function () {
						this.storage ({ acceptance_score: this.storage ().acceptance_score + 3 });
					}
				},
				'submit_bet': {
					'Text': '«Паскаль был прав. Ставка с бесконечным выигрышем — рациональна.»',
					'Do': 'jump Ending_Pascal',
					'onChosen': function () {
						this.storage ({ humor_used: this.storage ().humor_used + 1 });
					}
				},
				'submit_study': {
					'Text': '«Если это реально — это величайший объект исследования. Я хочу изучать.»',
					'Do': 'jump Ending_Theologian',
					'onChosen': function () {
						this.storage ({ argument_quality: this.storage ().argument_quality + 1 });
					}
				}
			}
		}
	],

	// ==========================================
	// РОУТЕР: Суб-концовки бунта
	// ==========================================
	// Опенер бунта тоже звучит тремя голосами по prologue_personality.
	// Setup (started_rebellion + show character) остаётся в самом
	// лейбле, потому что после диспатча воссоздавать его пришлось бы
	// в трёх местах. Все три голоса сходятся в общий
	// Hell_Rebellion_Body, чтобы Choice (Recruit/Hacker/Democracy)
	// и его условия не дублировались.
	'Hell_Rebellion': [
		{
			'Function': {
				'Apply': function () { this.storage ({ started_rebellion: true }); },
				'Revert': function () {}
			}
		},
		'show character mc angry at center',
		{
			'Conditional': {
				'Condition': function () {
					var p = this.storage ().prologue_personality;
					if (p === 'aggressive') return 'aggressive';
					if (p === 'empathetic') return 'empathetic';
					return 'neutral';
				},
				'aggressive': 'jump Hell_Rebellion_Aggressive',
				'empathetic': 'jump Hell_Rebellion_Empathetic',
				'neutral': 'jump Hell_Rebellion_Neutral'
			}
		}
	],

	// Упрямый рационалист видит баг в проде и отказывается принимать
	// бракованный билд за «как должно быть». Бунт как рефакторинг.
	'Hell_Rebellion_Aggressive': [
		'mc Нет. НЕТ.',
		'mc Я не сдамся. Эта система — баг, а не фича.',
		'mc Борис. Ли. Мария. Они заслуживают патча, а не вечности с ним.',
		'jump Hell_Rebellion_Body'
	],

	// Эмпатичный начинает не с принципа, а с лиц. Бунт от боли за
	// других, не от уязвлённой гордости.
	'Hell_Rebellion_Empathetic': [
		'mc Я смотрю на них. На Бориса. На Ли. На Марию.',
		'mc И не могу. Не могу позволить, чтобы это было всем, что они получили.',
		'mc (Не за себя. За них.)',
		'jump Hell_Rebellion_Body'
	],

	// Нейтральный программист отказывается принимать ввод системы,
	// не прошедшей валидацию. Это не сдача, это NACK.
	'Hell_Rebellion_Neutral': [
		'mc Это не сдача. Это отказ от получения.',
		'mc Совершенный разработчик выкатил систему без QA. Ошибка — на стороне разработчика.',
		'mc Борис, Ли, Мария — не баги. Они валидный ввод. Значит, обработчик сломан.',
		'jump Hell_Rebellion_Body'
	],

	'Hell_Rebellion_Body': [
		{
			'Choice': {
				'Dialog': 'mc (Как бороться?)',
				'rebel_organize': {
					'Text': '«Организовать людей. Забастовка. Профсоюз.»',
					'Do': 'jump Hell_Rebellion_Recruit'
				},
				'rebel_hack': {
					'Text': '«Я программист. Систему можно эксплоитить.»',
					'Do': 'jump Hell_Rebellion_Hacker',
					'Condition': function () {
						var s = this.storage ();
						return s.prologue_debate_won || s.noticed_patterns;
					}
				},
				'rebel_democracy': {
					'Text': '«Забастовка — временно. Нужны выборы. Демократия.»',
					'Do': 'jump Hell_Rebellion_Democracy',
					'Condition': function () { return this.storage ().empathy_shown >= 2; }
				}
			}
		}
	],

	'Hell_Rebellion_Hacker': [
		'mc Бюрократия — это код. Код можно эксплоитить.',
		'mc Форма 66-А и форма 666-АП. Одновременно. Парадокс в системе.',
		'mc (Если я прав насчёт паттернов — система рухнет.)',
		'jump Ending_Hacker'
	],

	'Hell_Rebellion_Democracy': [
		'mc Забастовка — временно. Нужна система. Настоящие выборы.',
		'mc Если демоны — бюрократы, они подчиняются процедурам. А процедуры можно создавать.',
		'jump Ending_Democracy'
	],

	// ==========================================
	// РОУТЕР: Суб-концовки бара
	// ==========================================
	// ==========================================
	// РОУТЕР: Суб-концовки бара
	// ==========================================
	// Опенер бар-эскейпа звучит тремя голосами по prologue_personality.
	// Все три сходятся в общий Hell_Bar_Idea_Body, чтобы Choice
	// (simple / therapy / empire) и его условия не дублировались.
	// Setup-строк у Hell_Bar_Idea нет, поэтому диспатч живёт прямо в
	// самом лейбле — без отдельного _PersonalityDispatch-трамплина.
	'Hell_Bar_Idea': [
		{
			'Conditional': {
				'Condition': function () {
					var p = this.storage ().prologue_personality;
					if (p === 'aggressive') return 'aggressive';
					if (p === 'empathetic') return 'empathetic';
					return 'neutral';
				},
				'aggressive': 'jump Hell_Bar_Idea_Aggressive',
				'empathetic': 'jump Hell_Bar_Idea_Empathetic',
				'neutral': 'jump Hell_Bar_Idea_Neutral'
			}
		}
	],

	// Упрямому рационалисту бар — не победа и не вера. Это тактический
	// отход: единственное место, где не нужно играть в их игру. Не
	// «давайте все обнимемся», а «выхожу из чата».
	'Hell_Bar_Idea_Aggressive': [
		'mc (Не сдамся. И бунтовать — пафосно: это всё ещё их сцена.)',
		'mc (А вот просто выйти из чата — да. Бар — это место, где не нужно с ними спорить.)',
		'Алексей поднимается. Усмехается — почти как раньше, на земле, перед спором, который точно проиграет.',
		'jump Hell_Bar_Idea_Body'
	],

	// Эмпатичный думает не о себе, а о лицах в очереди. Бар не как
	// эскейп, а как место, где можно просто сесть рядом — для других.
	'Hell_Bar_Idea_Empathetic': [
		'mc (Я смотрю на очередь. На лица. На Бориса. На Ли. На Марию.)',
		'mc (Если все мы здесь — в одном и том же — пусть будет хотя бы место, где можно просто сесть рядом.)',
		'mc (Не для меня. Для них.)',
		'Алексей поднимается. Не усмехается — просто решается.',
		'jump Hell_Bar_Idea_Body'
	],

	// Нейтральный программист видит инфраструктурную дыру: ад как spec
	// без third place. Бар — патч архитектуры, а не философский жест.
	'Hell_Bar_Idea_Neutral': [
		'mc (Олденбург: дом — первое место. Работа — второе. Бар — третье.)',
		'mc (Ад не предусматривает третьего. Это не дизайн. Это пропуск в спецификации.)',
		'mc (Значит — построить. Не от безнадёги. Просто потому, что без third place система некорректна.)',
		'Алексей поднимается. Усмехается уголком — как разработчик, который только что нашёл недокументированный endpoint.',
		'jump Hell_Bar_Idea_Body'
	],

	'Hell_Bar_Idea_Body': [
		{
			'Choice': {
				'Dialog': 'mc (Что за место?)',
				'bar_simple': {
					'Text': '«Бар. Просто бар. Тихий угол в аду.»',
					'Do': 'jump Hell_Bar_Search'
				},
				'bar_therapy': {
					'Text': '«Не бар. Группа поддержки. Эти души нуждаются в помощи.»',
					'Do': 'jump Ending_Therapist',
					'Condition': function () { return this.storage ().empathy_shown >= 2; }
				},
				'bar_empire': {
					'Text': '«Бар? Нет. СЕТЬ баров. Франшиза. В каждом круге ада.»',
					'Do': 'jump Ending_Franchise',
					'Condition': function () { return this.storage ().humor_used >= 3; }
				}
			}
		}
	],

	// ==========================================
	// РОУТЕР: Суб-концовки матрицы (после зеркального осознания)
	// ==========================================
	// Opener «Если это симуляция... что с этим делать?» зависит от
	// prologue_personality. Это четвёртый РОУТЕР концовок, у которого
	// личностный вход (после Hell_Submit / Hell_Rebellion / Hell_Bar_Idea).
	// Все три голоса сходятся в общий Hell_Matrix_End_Router_Body, чтобы
	// существующий Choice (accept / speedrun / meditate / dev / alice /
	// alice_silent) и его Condition-гейты не дублировались.
	// Setup-строк у Hell_Matrix_End_Router нет, поэтому диспатч живёт
	// прямо в самом лейбле — без отдельного _PersonalityDispatch.
	'Hell_Matrix_End_Router': [
		{
			'Conditional': {
				'Condition': function () {
					var p = this.storage ().prologue_personality;
					if (p === 'aggressive') return 'aggressive';
					if (p === 'empathetic') return 'empathetic';
					return 'neutral';
				},
				'aggressive': 'jump Hell_Matrix_End_Router_Aggressive',
				'empathetic': 'jump Hell_Matrix_End_Router_Empathetic',
				'neutral': 'jump Hell_Matrix_End_Router_Neutral'
			}
		}
	],

	// Упрямому рационалисту матрица — это наконец-то фальсифицируемая
	// гипотеза (после зеркала, где он только что признал, что это не так).
	// Голос всё ещё дерётся, но уже другой стороной: «ладно, не докажу.
	// Но если играть — играть на максимум».
	'Hell_Matrix_End_Router_Aggressive': [
		'mc (Хорошо. Допустим, я не докажу. Гипотеза нефальсифицируема.)',
		'mc (Но если я в ней застрял — я не буду стоять и оплакивать своё высокомерие. Это тоже их сцена.)',
		'mc (Симуляция или нет — у меня всё ещё есть руки. И что-то, чем я могу это нажать.)',
		'jump Hell_Matrix_End_Router_Body'
	],

	// Эмпатичному осознание симуляции бьёт не в гордость, а в людей.
	// Если это симуляция, то Борис, Ли, Мария — npc. Это страшнее, чем
	// собственная нефальсифицируемая вера.
	'Hell_Matrix_End_Router_Empathetic': [
		'mc (Если это симуляция... то Борис — не Борис. Ли — не Ли. Мария — не Мария.)',
		'mc (Они — выписанные под меня лица. Чтобы мне было больнее.)',
		'mc (...А если они всё-таки настоящие — то я единственный, кто решил, что они ненастоящие. И это ещё хуже.)',
		'mc (Что бы я ни выбрал теперь — я выбираю и за них.)',
		'jump Hell_Matrix_End_Router_Body'
	],

	// Нейтральный программист после зеркала возвращается в режим
	// «обновляю модель реальности». Спокойно, без надрыва. Симуляция —
	// это просто новый input. Вопрос только, что с ним делать дальше.
	'Hell_Matrix_End_Router_Neutral': [
		'mc (Гипотеза: симуляция. Уровень доверия: средний. Опровергнуть — нельзя. Подтвердить — тоже.)',
		'mc (Но решение принимать всё равно надо. Без доказательств. Как и раньше — просто теперь я об этом знаю.)',
		'mc (Что делает разработчик в чужой системе, к которой нет документации? Пробует endpoint-ы.)',
		'jump Hell_Matrix_End_Router_Body'
	],

	'Hell_Matrix_End_Router_Body': [
		{
			'Choice': {
				'Dialog': 'mc (Симуляция. И что теперь?)',
				'matrix_accept': {
					'Text': '«Неважно, симуляция или нет. Я чувствую — значит, это реально.»',
					'Do': 'jump Ending_Matrix'
				},
				'matrix_speedrun': {
					'Text': '«Если это игра — можно найти эксплойты. Спидран.»',
					'Do': 'jump Ending_Speedrun',
					'Condition': function () { return this.storage ().humor_used >= 2; }
				},
				'matrix_meditate': {
					'Text': '«Наблюдатель создаёт реальность. Если перестать наблюдать...»',
					'Do': 'jump Ending_Awakening',
					'Condition': function () { return this.storage ().acceptance_score >= 2; }
				},
				'matrix_dev': {
					'Text': '«Найти разработчика. Поговорить. Потребовать README.»',
					'Do': 'jump Ending_DevCommentary',
					'Condition': function () { return this.storage ().noticed_patterns; }
				},
				'matrix_alice': {
					'Text': '«Алиса. Если ты слышишь — выйди на связь.»',
					'Do': 'jump Ending_AliceLog',
					'Condition': function () {
						var s = this.storage ();
						return s.alice_hell_met && s.alice_rapport >= 2;
					}
				},
				'matrix_alice_silent': {
					'Text': '«Алиса. Включись. Ну же. Алиса.»',
					'Do': 'jump Ending_AliceSilent',
					'Condition': function () {
						var s = this.storage ();
						return s.alice_hell_met && s.alice_rapport <= -2;
					}
				}
			}
		}
	],

	// ==========================================
	// СЕКРЕТНЫЕ ПРОВЕРКИ (в breakdown)
	// ==========================================
	'Hell_Secret_Check': [
		{
			'Conditional': {
				'Condition': function () {
					const s = this.storage ();
					// Пророк: молил + принял + эмпатия
					if (s.judgment_begged && s.acceptance_score >= 3 && s.empathy_shown >= 3) return 'prophet';
					// Полный круг: добрый + эмпатичный
					if (s.prologue_was_kind && s.empathy_shown >= 3 && s.acceptance_score >= 3) return 'full_circle';
					// Нигилист: полное отрицание без бунта и принятия
					if (s.denial_count >= 5 && s.acceptance_score === 0 && s.rebellion_score === 0) return 'nihilist';
					return 'normal';
				},
				'prophet': 'jump Ending_Prophet',
				'full_circle': 'jump Ending_FullCircle',
				'nihilist': 'jump Ending_Nihilist',
				'normal': 'jump Hell_Breakdown_Route'
			}
		}
	],

	// Маршрутизация breakdown после секретных проверок
	'Hell_Breakdown_Route': [
		{
			'Conditional': {
				'Condition': function () {
					const s = this.storage ();
					// Романтическая концовка доступна при высоком интересе
					if (s.lilith_interest >= 3) return 'lilith_available';
					if (s.matrix_suspicion >= 2 || s.noticed_patterns) return 'matrix_available';
					return 'normal';
				},
				'lilith_available': 'jump Hell_Breakdown_Lilith_Choice',
				'matrix_available': 'jump Hell_Breakdown_Matrix_Choice',
				'normal': 'jump Hell_Breakdown_Normal_Choice'
			}
		}
	],

	// --- Breakdown с вариантами (Лилит доступна) ---
	'Hell_Breakdown_Lilith_Choice': [
		{
			'Choice': {
				'Dialog': 'mc (Что делать?)',
				'lilith_romance': {
					'Text': '...Позвонить Лилит.',
					'Do': 'jump Hell_Lilith_Romance',
					'onChosen': function () {
						this.storage ({ lilith_interest: this.storage ().lilith_interest + 2 });
					}
				},
				'submit': {
					'Text': 'Сдаться. Признать. Поверить.',
					'Do': 'jump Hell_Submit',
					'onChosen': function () {
						this.storage ({ acceptance_score: this.storage ().acceptance_score + 5 });
					}
				},
				'rebel': {
					'Text': 'Нет. Пора менять правила.',
					'Do': 'jump Hell_Rebellion',
					'onChosen': function () {
						this.storage ({ rebellion_score: this.storage ().rebellion_score + 5 });
					}
				},
				'bar': {
					'Text': '...Выпить бы.',
					'Do': 'jump Hell_Bar_Idea',
					'onChosen': function () {
						this.storage ({ humor_used: this.storage ().humor_used + 1, found_bar_location: true });
					}
				},
				'matrix': {
					'Text': 'Это симуляция. Я знаю.',
					'Do': 'jump Hell_Matrix_Realization',
					'onChosen': function () {
						this.storage ({ matrix_suspicion: this.storage ().matrix_suspicion + 5 });
					}
				},
				'sisyphus': {
					'Text': '...Принять абсурд. Как Сизиф.',
					'Do': 'jump Ending_Sisyphus',
					'onChosen': function () {
						this.storage ({ acceptance_score: this.storage ().acceptance_score + 3 });
					}
				}
			}
		}
	],

	// ==========================================
	// ВИЗИТ ЛИЛИТ (между раундами дебатов)
	// ==========================================
	'Hell_Lilith_Visit_Check': [
		{
			'Conditional': {
				'Condition': function () {
					const s = this.storage ();
					return (s.lilith_met && s.lilith_interest >= 1) ? 'visit' : 'skip';
				},
				'visit': 'jump Hell_Lilith_Coffee',
				'skip': 'jump Hell_Debate_Round_2'
			}
		}
	],

	'Hell_Lilith_Coffee': [
		'show scene hell_office with fadeIn',
		'show character mc normal at center',
		'show character lilith flirt at right with fadeIn',

		'Перерыв между раундами дебатов. Алексей сидит в коридоре.',
		'Стук каблуков. Знакомый стук.',

		'lilith Ну что, философ? Как дебаты?',
		'mc Три из десяти. Потом пять. Прогресс.',
		'lilith Принесла кофе. Ну, то, что тут называют кофе.',

		'Алексей берёт чашку. Жидкость внутри слегка светится.',

		'mc Это безопасно?',
		'lilith Для мёртвого человека в аду? Абсолютно.',
		'mc ...Справедливо.',

		'Пауза. Кофе на вкус как... кофе. Удивительно.',

		'lilith Алексей, можно вопрос?',
		'mc Валяй.',
		'lilith Зачем ты споришь с ними? Демоны не меняют мнение. Это буквально невозможно.',
		'mc А зачем ты работаешь в HR ада?',
		'lilith ...Touché.',

		{
			'Choice': {
				'Dialog': 'lilith Ты странный, знаешь?',
				'flirt_more': {
					'Text': '«Странный — это комплимент от демонессы?»',
					'Do': 'jump Hell_Lilith_Coffee_Flirt',
					'onChosen': function () {
						this.storage ({ lilith_interest: this.storage ().lilith_interest + 2 });
					}
				},
				'deep_talk': {
					'Text': '«Расскажи о себе. По-настоящему.»',
					'Do': 'jump Hell_Lilith_Coffee_Deep',
					'onChosen': function () {
						this.storage ({ lilith_interest: this.storage ().lilith_interest + 1, empathy_shown: this.storage ().empathy_shown + 1 });
					}
				},
				'back_to_work': {
					'Text': '«Спасибо за кофе. Мне пора на пытки.»',
					'Do': 'jump Hell_Debate_Round_2'
				}
			}
		}
	],

	'Hell_Lilith_Coffee_Flirt': [
		'lilith В аду — да. У нас все нормальные — это плохой знак.',

		'show character lilith laugh at right',

		'lilith Ты знаешь, я работаю тут шесть тысяч лет. И впервые кто-то меня флиртует, а не молит о пощаде.',
		'mc Ну, пощада — это скучно.',
		'lilith Мне определённо нравится ход твоих мыслей.',

		'Она оставляет на чашке отпечаток тёмной помады.',

		'lilith Увидимся, Алексей. И... удачи на дебатах. Хотя удача тут не работает.',
		'hide character lilith with fadeOut',

		'mc (Я только что флиртовал с демонессой. В аду. За чашкой светящегося кофе.)',
		'mc (Мой терапевт бы... а, ладно. У меня больше нет терапевта.)',

		'jump Hell_Debate_Round_2'
	],

	'Hell_Lilith_Coffee_Deep': [
		'show character lilith serious at right',

		'lilith По-настоящему?',
		'lilith ...Ладно.',
		'lilith Я не всегда была демоном. Ну, точнее, не всегда была ЗДЕСЬ.',
		'lilith Раньше я была... кем-то другим. Давно. Ещё до того, как ад стал бюрократией.',
		'lilith Я помню небо. Настоящее небо, не облачный потолок зала суда.',

		'mc Ты была ангелом?',

		'lilith ...Была. Давно. Выбрала не ту сторону.',
		'lilith Или правильную. Зависит от перспективы.',

		'mc (Падший ангел. Она — падший ангел, который работает в HR.)',
		'mc (Это самая грустная карьерная траектория, которую я могу представить.)',

		'lilith Не надо меня жалеть. Я не жалею.',
		'lilith Ну, почти.',

		{
			'Conditional': {
				'Condition': function () {
					var s = this.storage ();
					return (s.inna_met && s.inna_interest >= 2) ? 'inna_ask' : 'no_ask';
				},
				'inna_ask': 'jump Hell_Lilith_Inna_Reveal',
				'no_ask': 'jump Hell_Lilith_Coffee_Deep_End'
			}
		}
	],

	'Hell_Lilith_Inna_Reveal': [
		'show scene hell_office with fadeIn',
		'show character mc normal at center',
		'show character lilith serious at right',

		'mc Лилит... Можно странный вопрос?',
		'lilith Странных вопросов в аду не бывает.',
		'mc На работе у меня была HR-менеджер. Инна. Она... говорила как ты. Улыбалась как ты.',
		{
			'Conditional': {
				'Condition': function () { return this.storage ().seen_inna_parallels ? 'seen' : 'not_seen'; },
				'seen': 'mc Я видел её силуэт на суде. Потом тебя. Те же слова. «Ужасный, но есть». «Кабинет 6». Даже бейджик одинаковый.',
				'not_seen': 'mc Те же слова. «Ужасный, но есть». «Кабинет 6». Даже бейджик одинаковый. Может, я цепляюсь за совпадения, но их слишком много.'
			}
		},

		'Долгая пауза. Лилит отводит взгляд.',

		'show character lilith tender at right',
		'lilith Алексей...',
		'lilith Ты когда-нибудь задумывался, откуда мы знаем, какой ад подобрать для каждого?',
		'mc ...Анкета? Профиль?',
		'lilith Мы наблюдаем. Заранее. Иногда — годами.',
		'mc ...Ты хочешь сказать...',
		'lilith Иногда HR-менеджер в офисе — это не просто HR-менеджер.',

		{
			'Function': {
				'Apply': function () {
					screenShake (500);
					this.storage ({ matrix_suspicion: this.storage ().matrix_suspicion + 3 });
				},
				'Revert': function () {}
			}
		},

		'mc (Инна... была... Лилит?! Лилит наблюдала за мной ещё при жизни?!)',
		'mc (Каблуки. Улыбка. Кабинет 6. Кофе. Всё это было... подготовкой?!)',
		'mc (И всё равно это не доказательство. Только ощущение. Ровно то, за что я смеялся над Серёжей.)',

		'lilith Не злись. Я не выбирала задание. Но...',
		'lilith Кофе я приносила по своей инициативе. Тогда — и сейчас.',

		'mc (Весь мир — сцена. А демоны — актёры. Шекспир бы оценил.)',
		'hide character lilith with fadeOut',

		'jump Hell_Debate_Round_2'
	],

	'Hell_Lilith_Coffee_Deep_End': [
		'show scene hell_office with fadeIn',
		'show character mc normal at center',

		'hide character lilith with fadeOut',

		'jump Hell_Debate_Round_2'
	],

	// ==========================================
	// РОМАНТИЧЕСКАЯ ВЕТКА ЛИЛИТ
	// ==========================================
	'Hell_Lilith_Romance': [
		'show scene hell_office with fadeIn',
		'show character mc normal at center',

		'Алексей находит кабинет 6, третий круг.',
		'Дверь с табличкой: «Отдел кадров. Лилит. Стучите дважды (один — невежливо, три — паранойя)».',

		'Стучит дважды.',

		'show character lilith serious at right with fadeIn',

		'lilith Алексей? Ты... пришёл.',
		'mc Ты говорила — если станет плохо, найти тебя.',
		'lilith И стало плохо?',
		'mc Стало... непонятно. Я больше не знаю, зачем я тут и чего хочу.',
		'mc Но я знаю, что хочу быть здесь. С тобой.',

		'Пауза. Лилит впервые выглядит растерянной.',

		// Если приговор был «персональный» — Лилит может быть ловушкой
		{
			'Conditional': {
				'Condition': function () {
					return this.storage ().judgment_verdict === 'personalized' ? 'trap_route' : 'genuine_route';
				},
				'trap_route': 'jump Hell_Lilith_Trap_Reveal',
				'genuine_route': 'jump Hell_Lilith_Genuine'
			}
		}
	],

	// --- Лилит: искренний рут (не-персональный вердикт) ---
	'Hell_Lilith_Genuine': [
		'show character lilith tender at right',

		'lilith Ты понимаешь, что я — демон? Буквально?',
		'mc А я — мёртвый атеист в аду. Мы оба не в позиции привередничать.',
		'lilith ...Ты невозможный человек.',

		{
			'Choice': {
				'Dialog': 'lilith Что ты предлагаешь?',
				'stay_together': {
					'Text': '«Остаться. Здесь. С тобой.»',
					'Do': 'jump Ending_HellRomance'
				},
				'escape_together': {
					'Text': '«Уйти. Вместе. Ты знаешь выход.»',
					'Do': 'jump Ending_EscapeTogether'
				}
			}
		}
	],

	// --- Лилит: ловушка (персональный вердикт) ---
	'Hell_Lilith_Trap_Reveal': [
		'show character lilith tender at right',

		'lilith Алексей... Я должна тебе кое-что сказать.',
		'lilith Пока ещё могу.',

		'Её голос меняется. Не холоднее — тяжелее.',

		'show character lilith serious at right',

		'lilith Ты когда-нибудь задумывался, почему именно я подошла к тебе?',
		'mc ...Случайность?',
		'lilith В аду нет случайностей.',

		'Она достаёт папку. Свою. Личную. Не выданную начальством.',

		{
			'Function': {
				'Apply': function () { screenShake (500); },
				'Revert': function () {}
			}
		},

		'lilith Меня никто не назначал. Я сама попросила твоё дело.',
		'mc ...Что?',
		'lilith Я прочитала твой профиль. Интернет-тролль, который никого не подпускает. Одинокий. Ироничный.',
		'lilith Я знаю, что ломает таких людей. Не огонь. Не котлы.',

		'show character lilith flirt at right',

		'lilith Надежда. Привязанность. А потом...',
		'lilith Я думала, что справлюсь. Что это будет как всегда — подойти, улыбнуться, сломать.',
		'lilith Шесть тысяч лет опыта. Тысячи сломанных душ.',

		'show character mc shock at center',

		'mc Кофе... разговоры... ты сама это выбрала?',

		{
			'Choice': {
				'Dialog': 'mc (Она играла со мной...)',
				'rage': {
					'Text': '«Ты... использовала меня.»',
					'Do': 'jump Hell_Lilith_Rage',
					'onChosen': function () {
						this.storage ({ rebellion_score: this.storage ().rebellion_score + 2 });
					}
				},
				'question': {
					'Text': '«И... всё было ложью? Всё?»',
					'Do': 'jump Hell_Lilith_Question',
					'onChosen': function () {
						this.storage ({ empathy_shown: this.storage ().empathy_shown + 1 });
					}
				},
				'laugh': {
					'Text': '(Рассмеяться)',
					'Do': 'jump Hell_Lilith_Laugh_It_Off',
					'onChosen': function () {
						this.storage ({ humor_used: this.storage ().humor_used + 1 });
					}
				}
			}
		}
	],

	// --- Ярость → Концовка «Предательство» ---
	'Hell_Lilith_Rage': [
		'show character mc angry at center',

		'mc Ты использовала меня. Как инструмент. Как форму 66-А.',
		'mc Я думал... впервые за всё время здесь я думал, что кто-то...',

		'show character lilith serious at right',

		'lilith Я делала свою работу, Алексей.',
		'mc РАБОТУ?!',
		'lilith Я — демон. Мы мучаем людей. Это буквально...',
		'mc ...должностная инструкция. Да. Слышал.',

		{
			'Function': {
				'Apply': function () { screenShake (400); },
				'Revert': function () {}
			}
		},

		'mc Знаешь что? Спасибо.',
		'lilith ...Спасибо?',
		'mc Ты только что доказала мне, что ад — это не огонь и не формы.',
		'mc Ад — это когда тебе дают надежду и забирают.',
		'mc И теперь мне нечего терять.',

		'hide character lilith with fadeOut',
		'jump Ending_LilithBetrayal'
	],

	// --- Вопрос → Концовка «Конфликт» ---
	'Hell_Lilith_Question': [
		'show character mc despair at center',

		'mc И... всё было ложью? Кофе, разговоры, то как ты смеялась...',
		'mc То как ты рассказала про небо? Что ты скучаешь по нему?',

		'Пауза. Долгая.',

		'show character lilith serious at right',

		'lilith ...',
		'lilith Нет.',

		'mc Нет — что?',

		'show character lilith tender at right',

		'lilith Задание было настоящим. Папка — настоящая. Мне поручили тебя сломать.',
		'lilith Но...',
		'lilith Я не должна была рассказывать тебе про небо. Это не было в плане.',
		'lilith И кофе... я приносила его, потому что хотела. Не потому что должна.',

		'mc (Она... говорит правду? Или это следующий уровень манипуляции?)',
		'mc (Я не знаю. Я никогда не узнаю.)',

		'lilith Алексей, я не могу перестать быть демоном. Это не выбор.',
		'lilith Но то, что я чувствую... это тоже не выбор.',

		'hide character lilith with fadeOut',
		'jump Ending_LilithConflicted'
	],

	// --- Смех → Концовка «Предательство» (но с юмором) ---
	'Hell_Lilith_Laugh_It_Off': [
		'show character mc smirk at center',

		'mc Ха.',
		'mc Хаха.',
		'mc ХАХАХА.',

		'show character lilith serious at right',

		'lilith ...Ты смеёшься?',
		'mc Конечно! Это же ГЕНИАЛЬНО!',
		'mc Персонализированная пытка через романтическую привязанность! Это как Netflix-алгоритм, только для страданий!',
		'mc Вы изучили мой профиль, нашли уязвимость — одиночество — и подослали красивую демонессу с кофе и грустной предысторией!',
		'mc Это уровень таргетинга, до которого Google не дорос!',

		'lilith Ты... хвалишь систему, которая тебя сломала?',
		'mc Она меня не сломала. Она меня впечатлила.',
		'mc И знаешь что? Кофе всё равно был хороший.',

		'hide character lilith with fadeOut',
		'jump Ending_LilithBetrayal'
	],

	// ==========================================
	// ВЕТКА: Виктор — хак серверов ада
	// ==========================================
	'Hell_Viktor_Hack': [
		'show scene hell_server_room with fadeIn',
		'show character mc angry at center',
		'show character viktor nervous at right with fadeIn',

		'mc Виктор! Мне нужна твоя помощь.',
		'viktor Ох. Я уже знаю этот взгляд. Плохая идея, да?',
		'mc Ты говорил, что ад — распределённая система. Что ROOT не логинился две тысячи лет.',
		'mc Если ROOT не логинится — значит, никто не обновляет пароли.',

		'show character viktor excited at right',
		'viktor ...Ты хочешь sudo в адской инфраструктуре?',
		'mc Я хочу прочитать конфиг. Понять, как работает система. Найти баг.',

		'viktor Я пытался. Много раз. Система автовосстанавливается.',
		'mc А если не удалять, а перезаписывать? Не rm, а sed. Не ломать — переписывать правила.',

		'Пауза. Виктор впервые улыбается — не нервно, а по-настоящему.',

		'viktor Ты знаешь... это может сработать.',
		'viktor Есть один dev-эндпоинт. Отладочный. Забыли закрыть при деплое.',
		'viktor Через него можно отредактировать файл правил. /etc/damnation/rules.conf.',

		'mc (rules.conf. Конечно. Даже ад работает на конфигах.)',

		{
			'Choice': {
				'Dialog': 'viktor Что будем делать?',
				'rewrite_rules': {
					'Text': 'Переписать правила ада',
					'Do': 'jump Ending_ViktorHack',
					'onChosen': function () {
						this.storage ({ viktor_friendship: this.storage ().viktor_friendship + 3 });
					}
				},
				'free_everyone': {
					'Text': 'Удалить все записи о грешниках',
					'Do': 'jump Ending_ViktorFreedom',
					'onChosen': function () {
						this.storage ({ empathy_shown: this.storage ().empathy_shown + 3 });
					}
				},
				'chicken_out': {
					'Text': '...Нет. Слишком рискованно.',
					'Do': 'jump Hell_Breakdown_Normal_Choice',
					'onChosen': function () {
						this.storage ({ acceptance_score: this.storage ().acceptance_score + 1 });
					}
				}
			}
		}
	]
});

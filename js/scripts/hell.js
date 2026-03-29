/* global monogatari */

monogatari.script ({

	// ==========================================
	// АД: Прибытие
	// ==========================================
	'Hell_Arrival': [
		// 'play sound door_slam',
		'show scene hell_gates with fadeIn',
		'wait 500',

		{
			'Function': {
				'Apply': function () {
					hellVignette (true);
				},
				'Revert': function () {
					hellVignette (false);
				}
			}
		},

		'play music hell_drone with loop fade 3',
		// 'play sound fire_crackle with loop',

		'Жарко. Нет, не жарко — жар. Как будто открыли дверцу доменной печи.',
		'Но тела всё ещё нет. И всё равно — горит.',

		'show character mc shock at center with fadeIn',

		'mc (Это... ад? Реально ад?)',

		'Ворота. Огромные, из чёрного железа. Над ними — надпись.',
		'Не «Оставь надежду» — нет. Что-то более современное:',

		'centered «ДОБРО ПОЖАЛОВАТЬ. ВОЗЬМИТЕ ТАЛОН.»',

		'mc ...Талон?',

		'Справа от ворот — аппарат, как в МФЦ. Красный, с рожками.',
		'На экране: «Выберите категорию».',
		'Варианты: «Грешник», «Еретик», «Атеист», «Прочее».',

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

		'demon Атеисты... Ох. Опять. Знаете, вас тут больше всего в последнее время.',
		'demon Каждый второй — «а я не верил, а вы всё-таки существуете». Одно и то же.',
		'mc (Демон-бюрократ жалуется на рутину. Это дно мироздания.)',
		'mc (Хотя... бюрократия в аду? Номерки? Формы?)',
		'mc (Это слишком... дизайнерски. Как будто кто-то специально создал ад, который максимально раздражает именно МЕНЯ.)',

		{
			'Function': {
				'Apply': function () {
					const s = this.storage ();
					this.storage ({
						matrix_suspicion: s.matrix_suspicion + 1,
						noticed_patterns: s.matrix_suspicion >= 2
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
		'demon Так... ФИО загробное... Причина смерти... Количество грехов...',
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
		'demon Я демон. Издевательство — моя работа.',
		'demon В буквальном смысле. Это в должностной инструкции.',

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

		'show character lilith flirt at left with fadeIn',

		'Демонесса. Высокая, в идеально сидящем чёрном платье. Рожки — маленькие, аккуратные. Хвост — как у кошки, нервно подёргивается.',
		'На бейджике: «Лилит — отдел кадров».',

		'lilith О, новенький! Атеист, да?',
		'mc ...Да. А вы...?',
		'lilith Лилит. HR-менеджер ада. И да, я знаю — «каждую демонессу зовут Лилит». Не оригинально.',
		'lilith Но родители не спрашивали.',

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

		'show character lilith laugh at left',
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
		'show scene hell_office with fadeIn',
		'show character mc normal at center',

		'По пути к зоне мук Алексей замечает дверь с табличкой: «Серверная. Не входить. Серьёзно. Там 45°C».',
		'Дверь приоткрыта. Внутри — гудение серверных стоек и запах пыли. И... шелест клавиатуры?',

		'show character viktor friendly at left with fadeIn',

		'За столом — призрак. Толстый, в очках, в свитере с пингвином Linux.',
		'На мониторе — терминал с зелёным текстом. Рядом — энергетик (тоже призрачный).',

		'viktor О! Живой! В смысле — мёртвый, но свежий! Привет!',
		'mc ...Ты кто?',
		'viktor Виктор. Сисадмин. Ну, в прошлой жизни — сисадмин. В этой — тоже сисадмин.',
		'viktor Умер на работе. Буквально. Сервак упал в два ночи, я поехал чинить, инфаркт в серверной.',
		'viktor Ирония в том, что сервак потом починился сам. Перезагрузка помогла.',
		'mc (Он умер чиня сервер. Это самая IT-шная смерть из возможных.)',

		'viktor Ну вот. Попал сюда, они посмотрели мой LinkedIn, и... наняли.',
		'viktor У них тут инфраструктура на Fortran. FORTRAN, чувак. Семидесятых годов.',
		'mc ...Ад работает на Fortran?',
		'viktor Ну а на чём ещё? Думаешь, Сатана знает Docker?',

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
					'Do': 'jump Hell_Assignment_Route',
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

		'viktor Ладно, иди, тебе пора на мучения. Но если что — я тут. Серверная никогда не закрывается.',
		'viktor Пароль от WiFi — AbandonAllHope. Заглавные буквы.',

		'hide character viktor with fadeOut',
		'jump Hell_Assignment_Route'
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
		'jump Hell_Assignment_Route'
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
	// АД-ЛАЙТ
	// ==========================================
	'Hell_Light': [
		'show scene hell_cauldrons with fadeIn',
		'show character mc normal at center with fadeIn',

		'Алексея ведут в зону, которая выглядит как... фитнес-центр?',
		'Ну, если бы фитнес-центр был в аду. Беговые дорожки, которые не останавливаются. Велотренажёры, которые едут в гору. Вечно.',

		'mc (Это... ад? Это кроссфит без конца!)',

		'demon Зона комфорт-минус. Для тех, кто не заслужил настоящих котлов.',
		'demon Наслаждайтесь.',

		'mc (Ладно. Бывало и хуже. Помню дедлайны в декабре.)',

		'Дни (века? мгновения?) проходят. Алексей бегает. Крутит педали. Думает.',

		'Рядом — другие души. Такие же «не совсем плохие».',

		'jump Hell_Meeting'
	],

	// ==========================================
	// АД-СТАНДАРТ
	// ==========================================
	'Hell_Standard': [
		'show scene hell_cauldrons with fadeIn',
		'show character mc shock at center with fadeIn',
		// 'play sound scream',

		'Котлы. Настоящие, натуральные, чугунные котлы.',
		'В них кипит... что-то. Красное. Густое. Пахнет как серверная в жару.',

		'Демоны с вилами. Не метафора.',

		'mc (Это... это реально котлы. Как в детских страшилках.)',
		'mc (Только это не страшилка.)',

		'demon Котёл номер 7394. Ваше место. Соседи — один банкир и два политика.',
		'mc Я буду кипеть в котле с политиками?!',
		'demon Стандартный пакет. Жалобы — в форму 666-АП.',

		'Жар. Боль. Но не смерть — смерть уже была. Только боль, без конца.',

		'mc (Это не может быть вечным. Не может. Не может...)',

		'jump Hell_Debate_Loop'
	],

	// ==========================================
	// АД-ПЕРСОНАЛЬНЫЙ
	// ==========================================
	'Hell_Personalized': [
		'show scene hell_debate_room with fadeIn',
		'show character mc shock at center with fadeIn',

		{
			'Function': {
				'Apply': function () {
					screenGlitch (500);
				},
				'Revert': function () {}
			}
		},

		'Комната. Обычная, как лекционный зал в университете.',
		'Экран. Проектор. Стулья.',
		'На стульях — демоны. Десятки. С блокнотами.',

		'show character demon smile at left with fadeIn',

		'demon Добро пожаловать на вечный семинар!',
		'demon Тема: «Докажите, что Бога не существует».',
		'demon Аудитория: мы.',
		'demon Время: вечность.',

		'mc Что?!',

		'demon Вы же так любили доказывать это при жизни.',
		'demon Вот ваша кафедра. Вот ваша доска.',
		'demon Начинайте.',

		{
			'Function': {
				'Apply': function () {
					screenShake (400);
				},
				'Revert': function () {}
			}
		},

		'mc (Это... персональный ад. Мой. Личный. Персональный. Ад.)',
		'mc (Вечно доказывать, что Бога нет... СТОЯ В АДУ.)',

		'jump Hell_Debate_Loop'
	],

	// ==========================================
	// АД: Цикл дебатов / мучений
	// ==========================================
	'Hell_Debate_Loop': [
		{
			'Function': {
				'Apply': function () {
					const cycle = (this.storage ().debate_cycle || 0) + 1;
					this.storage ({ debate_cycle: cycle });
				},
				'Revert': function () {
					const cycle = (this.storage ().debate_cycle || 1) - 1;
					this.storage ({ debate_cycle: cycle });
				}
			}
		},

		{
			'Conditional': {
				'Condition': function () {
					const cycle = this.storage ().debate_cycle;
					if (cycle >= 3) return 'breakdown';
					if (cycle === 2) return 'second';
					return 'first';
				},
				'first': 'jump Hell_Debate_Round_1',
				'second': 'jump Hell_Lilith_Visit_Check',
				'breakdown': 'jump Hell_Breakdown'
			}
		}
	],

	'Hell_Debate_Round_1': [
		'show scene hell_debate_room with fadeIn',
		'play music hell_debate with loop fade 2',
		'show character mc angry at center',
		'show character demon smile at left',

		'mc Хорошо! Хотите доказательств? Проблема зла!',
		'mc Если Бог всемогущ и всеблаг, почему существует страдание?!',

		'demon Потому что свобода воли.',
		'mc А стихийные бедствия? Дети, умирающие от рака?!',
		'demon Проверка веры.',
		'mc Это не ответ! Это отговорка!',

		'Демоны улыбаются. Записывают что-то в блокнотах.',

		'demon Прекрасно! Ваша оценка: 3 из 10.',
		'demon Повторите через... ну, вы поняли.',

		'mc (Три из десяти?! ТРИ?!)',

		{
			'Choice': {
				'Dialog': 'mc (Что делать?)',
				'try_again': {
					'Text': 'Подготовить лучший аргумент',
					'Do': 'jump Hell_Debate_Loop',
					'onChosen': function () {
						const s = this.storage ();
						this.storage ({
							argument_quality: s.argument_quality + 1
						});
					}
				},
				'refuse_play': {
					'Text': 'Отказаться играть по их правилам',
					'Do': 'jump Hell_Debate_Refuse',
					'onChosen': function () {
						const s = this.storage ();
						this.storage ({
							rebellion_score: s.rebellion_score + 2
						});
					}
				}
			}
		}
	],

	'Hell_Debate_Round_2': [
		'show scene hell_debate_room with fadeIn',
		'show character mc angry at center',
		'show character demon smile at left',

		'mc Ладно. Тогда аргумент от несовместимости.',
		'mc Всемогущий бог не может создать камень, который не может поднять. Логический парадокс.',
		'mc Либо он не всемогущ, либо логика не работает. А если логика не работает — любое доказательство бессмысленно.',

		'Демоны переглядываются. Один поднимает табличку: «5/10».',

		'demon Уже лучше! Но смотрите — вы используете логику, чтобы опровергнуть то, что стоит за пределами логики.',
		'demon Это как пытаться измерить любовь линейкой.',

		'mc Это ложная аналогия и вы это знаете!',
		'demon Мы демоны. Мы много чего знаем.',

		{
			'Choice': {
				'Dialog': 'mc (Ещё раз?)',
				'again': {
					'Text': 'Продолжить дебаты (упрямство!)',
					'Do': 'jump Hell_DebateWin_Check',
					'onChosen': function () {
						const s = this.storage ();
						this.storage ({
							denial_count: s.denial_count + 1,
							wtf_level: Math.min (100, s.wtf_level + 10)
						});
					}
				},
				'give_up': {
					'Text': 'Замолчать',
					'Do': 'jump Hell_DebateWin_Check',
					'onChosen': function () {
						this.storage ({ acceptance_score: this.storage ().acceptance_score + 1 });
					}
				}
			}
		}
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
	// АД: Встреча с другими атеистами (ад-лайт)
	// ==========================================
	'Hell_Meeting': [
		'show scene hell_cauldrons with fadeIn',
		'show character mc normal at center',

		'На соседнем велотренажёре — женщина. Крутит педали с мрачной решимостью.',

		'show character soul resigned at left with fadeIn',

		'soul Новенький?',
		'mc Угу.',
		'soul Атеист?',
		'mc ...Как угадала?',
		'soul У вас у всех одно выражение лица. «Этого-не-может-быть-но-это-есть».',

		'mc А ты?',
		'soul Агностик. Что, по мнению начальства, ещё хуже.',
		'soul «Знал, что возможно, но забил» — отягчающее, оказывается.',

		{
			'Function': {
				'Apply': function () {
					this.storage ({ met_other_atheists: true });
				},
				'Revert': function () {
					this.storage ({ met_other_atheists: false });
				}
			}
		},

		'mc И... сколько ты тут?',
		'soul Время тут не работает как привычно. Но субъективно — может, пару веков?',
		'mc ВЕКОВ?!',
		'soul Привыкнешь. Или нет. В этом весь смысл.',

		'hide character soul with fadeOut',
		'jump Hell_Debate_Loop'
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
					'Text': 'Подождите. Я знаю, что здесь происходит. Это не ад. Это СИМУЛЯЦИЯ.',
					'Do': 'jump Hell_Matrix_Realization',
					'onChosen': function () {
						this.storage ({ matrix_suspicion: this.storage ().matrix_suspicion + 5 });
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
		'mc Ответь мне — почему ад выглядит как российский МФЦ?',
		'demon Потому что для русского человека нет ничего страшнее бюрократии.',
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
		'Он берёт мел. Медленно зачёркивает.',
		'Пишет: «ДОКАЖИТЕ, ЧТО ЭТО НЕ СИМУЛЯЦИЯ».',

		'show character mc despair at center with fadeIn',

		'И замирает.',

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

		'mc (...)',

		'mc (Я стал ими.)',
		'mc (Я стал тем самым человеком, которого высмеивал.)',
		'mc (Верующим без доказательств.)',

		'jump Ending_Matrix'
	],

	'Hell_Rebellion_Recruit': [
		'show scene hell_cauldrons with fadeIn',
		'show character mc angry at center',
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
		'end'
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
		'end'
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
	'Hell_Submit': [
		'mc ...Ладно. Вы победили. ОН победил.',
		'mc Я... верю.',

		{
			'Conditional': {
				'Condition': function () {
					const s = this.storage ();
					if (s.humor_used >= 3) return 'pascal';
					if (s.argument_quality >= 4) return 'theologian';
					return 'believer';
				},
				'pascal': 'jump Ending_Pascal',
				'theologian': 'jump Ending_Theologian',
				'believer': 'jump Ending_Believer'
			}
		}
	],

	// ==========================================
	// РОУТЕР: Суб-концовки бунта
	// ==========================================
	'Hell_Rebellion': [
		'show character mc angry at center',
		'mc Нет. НЕТ. Я не буду сдаваться.',

		{
			'Conditional': {
				'Condition': function () {
					const s = this.storage ();
					if (s.prologue_debate_won && s.noticed_patterns) return 'hacker';
					if (s.empathy_shown >= 3) return 'democracy';
					return 'rebellion';
				},
				'hacker': 'jump Hell_Rebellion_Hacker',
				'democracy': 'jump Hell_Rebellion_Democracy',
				'rebellion': 'jump Hell_Rebellion_Recruit'
			}
		}
	],

	'Hell_Rebellion_Hacker': [
		'mc Я программист. Бюрократия — это код. Код можно эксплоитить.',
		'mc Форма 66-А и форма 666-АП. Одновременно. Парадокс.',
		'jump Ending_Hacker'
	],

	'Hell_Rebellion_Democracy': [
		'mc Забастовка — временно. Нужна система. Выборы.',
		'jump Ending_Democracy'
	],

	// ==========================================
	// РОУТЕР: Суб-концовки бара
	// ==========================================
	'Hell_Bar_Idea': [
		'mc (Если нельзя выиграть — можно хотя бы выпить?)',
		'Алексей поднимается. Усмехается.',

		{
			'Conditional': {
				'Condition': function () {
					const s = this.storage ();
					if (s.humor_used >= 4) return 'franchise';
					if (s.empathy_shown >= 3) return 'therapist';
					return 'bar';
				},
				'franchise': 'jump Ending_Franchise',
				'therapist': 'jump Ending_Therapist',
				'bar': 'jump Hell_Bar_Search'
			}
		}
	],

	// ==========================================
	// РОУТЕР: Суб-концовки матрицы
	// ==========================================
	'Hell_Matrix_Mirror': [
		'show scene hell_debate_room with fadeIn',

		{
			'Function': {
				'Apply': function () { screenGlitch (600); },
				'Revert': function () {}
			}
		},

		'Алексей стоит один. На доске: «ДОКАЖИТЕ, ЧТО ЭТО НЕ СИМУЛЯЦИЯ».',
		'show character mc despair at center with fadeIn',
		'mc (Нефальсифицируемая гипотеза. Невозможно опровергнуть.)',
		'mc (Именно то, за что я их высмеивал.)',
		'mc (Я стал ими. Верующим без доказательств.)',

		{
			'Conditional': {
				'Condition': function () {
					const s = this.storage ();
					if (s.humor_used >= 3) return 'speedrun';
					if (s.acceptance_score >= 3) return 'awakening';
					if (s.wtf_level >= 70 && s.noticed_patterns) return 'dev';
					return 'matrix';
				},
				'speedrun': 'jump Ending_Speedrun',
				'awakening': 'jump Ending_Awakening',
				'dev': 'jump Ending_DevCommentary',
				'matrix': 'jump Ending_Matrix'
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

	// --- Breakdown с 5 вариантами (Лилит доступна) ---
	'Hell_Breakdown_Lilith_Choice': [
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
				'lilith_romance': {
					'Text': '...Позвонить Лилит.',
					'Do': 'jump Hell_Lilith_Romance',
					'onChosen': function () {
						this.storage ({ lilith_interest: this.storage ().lilith_interest + 2 });
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
		'show character lilith flirt at left with fadeIn',

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

		'show character lilith laugh at left',

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
		'show character lilith serious at left',

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

		'show character lilith serious at left with fadeIn',

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
		'show character lilith tender at left',

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
		'show character lilith tender at left',

		'lilith Алексей... я должна тебе кое-что сказать.',

		'Её голос меняется. Становится холоднее. Профессиональнее.',

		'show character lilith serious at left',

		'lilith Ты когда-нибудь задумывался, почему именно я подошла к тебе в коридоре?',
		'mc ...Случайность?',
		'lilith В аду нет случайностей, Алексей.',

		'Она достаёт папку. На ней: «ДЕЛО №7394028417. МЕРА ВОЗДЕЙСТВИЯ: ЭМОЦИОНАЛЬНАЯ ПРИВЯЗАННОСТЬ».',

		{
			'Function': {
				'Apply': function () { screenShake (500); },
				'Revert': function () {}
			}
		},

		'mc ...Что?',
		'lilith Персональный пакет. Помнишь? Демоны изучили твой профиль.',
		'lilith Интернет-тролль, который никого не подпускает близко. Одинокий. Ироничный.',
		'lilith Знаешь, что ломает таких людей? Не огонь. Не котлы.',

		'show character lilith flirt at left',

		'lilith Надежда. Привязанность. А потом — отнять.',

		'show character mc shock at center',

		'mc Кофе... разговоры... всё было... спланировано?',

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

		'show character lilith serious at left',

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

		'show character lilith serious at left',

		'lilith ...',
		'lilith Нет.',

		'mc Нет — что?',

		'show character lilith tender at left',

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

		'show character lilith serious at left',

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
	]
});

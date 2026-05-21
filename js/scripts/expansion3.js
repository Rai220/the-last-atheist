/* global monogatari, hellVignette, screenShake, screenGlitch, applyWtfEffects, divineGlow, panicText, updateLifeMeter */

// ==========================================
// Chapter: РАСШИРЕНИЕ v3 — Бар Бориса, случайные встречи, цикл вечности
// Hooks: Expansion_Router → Expansion_Bar_*  (новая дверь),
//        Hell_Bar_Idea_Body → дополнительные сюжетные ветки.
// ==========================================

monogatari.script ({

	// ==========================================
	// БАР БОРИСА — расширенные сцены
	// Доступ: дверь в Expansion_Router → Expansion_Bar_Entry
	// ==========================================
	'Expansion_Bar_Entry': [
		'show scene hell_bar with fadeIn',
		'play music hell_bar_jazz with loop fade 2',
		'mc (Бар «Последний атеист». Светящаяся вывеска. Гитара на стене. Барный стул для меня уже выдвинут.)',

		'show character boris normal at right with fadeIn',
		'boris Заходи. Я заранее знал, что сегодня будешь ты.',
		'mc Откуда?',
		'boris Я тут давно. Я понял систему. Каждое восемнадцатое из ста сорока шести понедельников — приходит атеист с твоим типом походки.',
		'mc Тип походки?',
		'boris Чуть быстрее, чем хочется. Чуть медленнее, чем надо. Как будто опаздываешь, но не туда.',

		'mc (Барный стул. Бутылка чего-то с этикеткой «КГ/АМ — кафедральный креатив». Хорошо.)',

		{
			'Choice': {
				'Dialog': 'mc (Что заказать?)',
				'whiskey': {
					'Text': 'Виски. С серой.',
					'Do': 'jump Expansion_Bar_Whiskey'
				},
				'water': {
					'Text': 'Воду. Я мёртв, мне нужна гидратация по привычке.',
					'Do': 'jump Expansion_Bar_Water'
				},
				'special': {
					'Text': 'Спецпредложение дня',
					'Do': 'jump Expansion_Bar_Special'
				},
				'guitar': {
					'Text': 'Спросить про гитару',
					'Do': 'jump Expansion_Bar_Guitar'
				}
			}
		}
	],

	'Expansion_Bar_Whiskey': [
		'boris Виски. С серой. Знал, что закажешь.',
		'Стакан. Янтарный. Запах — сложный. Сера придаёт пикантности.',
		'mc (Я пью виски в аду. Бабушка бы плакала. Или гордилась бы. Зависит от того, какая бабушка.)',
		'mc Борис. Слушай. Ты тут давно?',
		'boris С 1973-го. Поэт. Алкоголик. Самоубийство.',
		'mc И ты — бармен здесь?',
		'boris Я попросил эту работу. Знаешь, во что превращается ад, если у тебя нет цели? В ад. Поэтому я нашёл цель — слушать тех, кто заходит.',
		'mc Сорок четыре года слушать атеистов.',
		'boris (улыбается) Никогда не было скучно. Каждый атеист скучен по-своему уникально.',

		{
			'Function': {
				'Apply': function () {
					var s = this.storage ();
					this.storage ({ humor_used: s.humor_used + 1 });
				},
				'Revert': function () {}
			}
		},

		'jump Expansion_Bar_Talk'
	],

	'Expansion_Bar_Water': [
		'boris Воду? Тут — никто не пьёт воду. Я даже не уверен, что она есть.',
		'boris ...А, нет. Вон. Графин с моими слезами от смешных историй посетителей. Идёт?',
		'mc Я надеюсь, это шутка.',
		'boris (наливает) Сам решай.',

		'mc (Я пью воду из бармена-поэта в аду. Это уже не самое странное за вечер.)',

		{
			'Function': {
				'Apply': function () {
					var s = this.storage ();
					this.storage ({
						humor_used: s.humor_used + 1,
						acceptance_score: s.acceptance_score + 1,
						life_current: Math.min (s.life_max, s.life_current + 1)
					});
					if (typeof updateLifeMeter === 'function') {
						updateLifeMeter (Math.min (s.life_max, s.life_current + 1), s.life_max);
					}
				},
				'Revert': function () {}
			}
		},

		'jump Expansion_Bar_Talk'
	],

	'Expansion_Bar_Special': [
		'boris Спецпредложение. «Коктейль атеиста». Не пробуй, пока не сядешь.',
		'mc Сижу.',
		'boris (наливает что-то многослойное, мерцающее красным) Это коктейль из всех твоих сомнений. Каждый слой — одна жизненная позиция, которую ты потом отверг.',
		'mc Это символично.',
		'boris Это БУКВАЛЬНО. Я их собирал лично. У меня доступ к архиву.',

		'Алексей пьёт. На вкус — как Reddit, только хуже.',
		'mc Это... самый странный коктейль в моей не-жизни.',

		{
			'Function': {
				'Apply': function () {
					var s = this.storage ();
					this.storage ({
						matrix_suspicion: Math.min (10, s.matrix_suspicion + 2),
						argument_quality: s.argument_quality + 1
					});
				},
				'Revert': function () {}
			}
		},

		'jump Expansion_Bar_Talk'
	],

	'Expansion_Bar_Guitar': [
		'mc Гитара. Расскажи.',
		'boris Был один парень. Семён. Лет двадцать пять. Хороший. Тихий.',
		'boris Сидел за этим столом. Каждый понедельник. Играл. Песни знал — не отсюда. Странные. Про автобус.',
		'mc Автобус?',
		'boris Да. Про пионерский лагерь. Про лето, которое не кончается. Про девочку с косами.',
		'boris Однажды доиграл. Поставил гитару. Сказал: «Борь, я нашёл выход. Спасибо за стол.» И ушёл.',
		'mc Куда?',
		'boris Не знаю. Гитара осталась. Я её повесил. Каждый, кто заходит — спрашивает.',

		{
			'Function': {
				'Apply': function () {
					var s = this.storage ();
					this.storage ({
						matrix_suspicion: Math.min (10, s.matrix_suspicion + 2),
						humor_used: s.humor_used + 1
					});
				},
				'Revert': function () {}
			}
		},

		'jump Expansion_Bar_Talk'
	],

	'Expansion_Bar_Talk': [
		{
			'Choice': {
				'Dialog': 'mc (О чём поговорить с Борисом?)',
				'his_death': {
					'Text': '«Расскажи про свою смерть»',
					'Do': 'jump Expansion_Bar_His_Death'
				},
				'his_poetry': {
					'Text': '«Прочитай стих»',
					'Do': 'jump Expansion_Bar_Poetry'
				},
				'play_guitar': {
					'Text': 'Взять гитару — попробовать',
					'Do': 'jump Expansion_Bar_Play'
				},
				'open_business': {
					'Text': '«Давай откроем второй бар. В лимбе.»',
					'Do': 'jump Expansion_Bar_Franchise2'
				},
				'quiz': {
					'Text': '«А есть у вас викторина?»',
					'Do': 'jump Expansion_Bar_Quiz'
				},
				'leave': {
					'Text': 'Заплатить (чем?) и уйти',
					'Do': 'jump Expansion_Router'
				}
			}
		}
	],

	'Expansion_Bar_His_Death': [
		'boris 1973. Двадцать восемь. Поэт. Алкоголик. У меня было три сборника, два не изданных. Жена. Дочь. Кошка.',
		'boris Я думал, что моё «я» — это моё творчество. Если я не пишу — меня нет.',
		'boris Творческий блок длился восемь месяцев. Я не выдержал.',
		'mc И?',
		'boris И теперь я понимаю — моё «я» было ещё в дочери. В её первом слове, которое было «папа». В её первом стихе, который она написала через десять лет после моей смерти.',
		'mc Откуда ты знаешь?',
		'boris У меня есть доступ к её Instagram. Бог разрешил. После долгой дискуссии.',

		'mc (Бог разрешил алкоголику-самоубийце мониторить дочкин Instagram. Это, пожалуй, самая искренняя форма посмертной заботы.)',

		{
			'Function': {
				'Apply': function () {
					var s = this.storage ();
					this.storage ({
						empathy_shown: s.empathy_shown + 2,
						acceptance_score: s.acceptance_score + 1
					});
				},
				'Revert': function () {}
			}
		},

		'jump Expansion_Bar_Talk'
	],

	'Expansion_Bar_Poetry': [
		'boris Хорошо. Один. Без названия.',
		'wait 800',
		'centered «Когда мы спорили о Боге',
		'centered Я был всегда таким, как ты —',
		'centered Лежали мы, гнали тревоги,',
		'centered И верили — это мечты.',
		'wait 1500',
		'centered Потом — почему-то — растёт',
		'centered В нас что-то, чего мы не знали.',
		'centered И именно ад нам поймёт,',
		'centered Когда мы об этом узнали.»',
		'wait 2000',
		'mc ...',
		'mc Это про меня?',
		'boris Это про всех. Каждый узнаёт ровно тогда, когда уже поздно.',

		{
			'Function': {
				'Apply': function () {
					var s = this.storage ();
					this.storage ({
						empathy_shown: s.empathy_shown + 1,
						matrix_suspicion: Math.min (10, s.matrix_suspicion + 1),
						acceptance_score: s.acceptance_score + 2
					});
				},
				'Revert': function () {}
			}
		},

		'jump Expansion_Bar_Talk'
	],

	'Expansion_Bar_Play': [
		'mc (Я никогда не играл на гитаре. Но в аду — может, легче? Меньше потерять?)',
		'Алексей берёт гитару Семёна. Тяжёлая. Тёплая.',
		'mc (Странно. Я не умею. Но руки знают.)',
		'mc (Это, возможно, наследие. Тысячи рук, которые брали эту гитару до меня.)',
		'Звучит что-то. Не песня. Просто аккорд. Один. Длинный.',

		{
			'Function': {
				'Apply': function () {
					var s = this.storage ();
					this.storage ({
						acceptance_score: s.acceptance_score + 3,
						humor_used: s.humor_used + 1,
						matrix_suspicion: Math.min (10, s.matrix_suspicion + 1)
					});
				},
				'Revert': function () {}
			}
		},

		'boris Хорошо. Не идеально. Но хорошо.',
		'mc Можно я её оставлю на пару дней? Поучусь.',
		'boris Бери. Гитара ничья. Здесь ничего ничьё.',
		'jump Ending_Bar_Guitar'
	],

	'Expansion_Bar_Franchise2': [
		'mc Борис. Давай откроем второй бар. В лимбе. Для тех, кто там скучает.',
		'boris (улыбается) ...сколько мест?',
		'mc Двадцать четыре. Стандартно.',
		'boris Имя?',
		'mc «Предпоследний атеист».',
		'boris (молчит) Дай руку.',

		'Они жмут руки. Контракт. На салфетке. Алексею достаётся 30%. Борису 70%. Это лучшая сделка, какую Алексей когда-либо подписывал.',

		{
			'Function': {
				'Apply': function () {
					var s = this.storage ();
					this.storage ({
						humor_used: s.humor_used + 2,
						argument_quality: s.argument_quality + 1
					});
				},
				'Revert': function () {}
			}
		},

		'jump Ending_BarFranchise2'
	],

	// ==========================================
	// СЛУЧАЙНЫЕ ВСТРЕЧИ — мини-эпизоды между дверями
	// ==========================================
	'Expansion_Encounter_Random': [
		// Простой рандом по storage.encounter_seed
		{
			'Function': {
				'Apply': function () {
					var s = this.storage ();
					var seed = ((s.argument_quality || 0) + (s.humor_used || 0) * 3 + (s.empathy_shown || 0) * 7) % 5;
					this.storage ({ encounter_pick: seed });
				},
				'Revert': function () {}
			}
		},
		{
			'Conditional': {
				'Condition': function () { return String (this.storage ().encounter_pick || 0); },
				'0': 'jump Expansion_Encounter_Bureaucrat',
				'1': 'jump Expansion_Encounter_Janitor',
				'2': 'jump Expansion_Encounter_Tourist',
				'3': 'jump Expansion_Encounter_Critic',
				'4': 'jump Expansion_Encounter_OldFlame'
			}
		}
	],

	'Expansion_Encounter_Bureaucrat': [
		'mc (По коридору идёт демон. На бейджике: «БРЯ. Бюро регулирования ада».)',
		'show character demon paperwork at center with fadeIn',
		'demon Извините. У меня плановая проверка душ. Покажите форму 66-А.',
		'mc У меня нет с собой.',
		'demon (вздыхает) Никогда нет с собой.',
		'demon Тогда — устно. Назовите свой грешный профиль номер.',
		'mc Я не знаю свой номер.',
		'demon (улыбается) Тогда вы официально не существуете. Что для бюрократии — лучший статус.',
		'demon Поздравляю.',
		'mc (Я только что получил повышение через отсутствие документов.)',

		{
			'Function': {
				'Apply': function () {
					var s = this.storage ();
					this.storage ({ humor_used: s.humor_used + 1 });
				},
				'Revert': function () {}
			}
		},

		'hide character demon with fadeOut',
		'jump Expansion_Router'
	],

	'Expansion_Encounter_Janitor': [
		'mc (Дворник. Метёт коридор. В руках — метла с ручкой из формы 66-А.)',
		'show character soul resigned at center with fadeIn',
		'soul Дай дорогу. Опять кто-то насрал документами.',
		'mc Простите?',
		'soul Бюрократия порождает мусор. Я его мету. Шесть тысяч лет.',
		'mc Как тебя зовут?',
		'soul Виталик. Уборщик.',
		'mc Серьёзно? Имя — Виталик?',
		'soul В смысле «серьёзно»? Меня так зовут с 1960-го. У меня было нормальное имя до того, как я подал заявку на работу в аду.',
		'mc Заявку?',
		'soul Конечно. Все рабочие места здесь — по заявке. Иначе не запишут.',

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

		'hide character soul with fadeOut',
		'jump Expansion_Router'
	],

	'Expansion_Encounter_Tourist': [
		'mc (Незнакомец. Не похож на грешника. С камерой. Снимает.)',
		'show character soul2 sad at center with fadeIn',
		'soul2 ...Я тут по обмену. С Раем.',
		'mc По обмену?',
		'soul2 Программа интеграции. Раз в столетие мы меняемся. Чтобы лучше понимать друг друга.',
		'mc И как тебе у нас?',
		'soul2 Лучше, чем в Раю. Тут хотя бы что-то происходит.',
		'mc Что у вас в Раю?',
		'soul2 Облака. Бесконечные. И ангелы поют одну и ту же песню. На небеса всё видно. А слышно — только Бога.',
		'mc Звучит как ад.',
		'soul2 (улыбается) Именно. Поэтому я и записался.',

		{
			'Function': {
				'Apply': function () {
					var s = this.storage ();
					this.storage ({
						matrix_suspicion: Math.min (10, s.matrix_suspicion + 2),
						humor_used: s.humor_used + 1
					});
				},
				'Revert': function () {}
			}
		},

		'hide character soul2 with fadeOut',
		'jump Expansion_Router'
	],

	'Expansion_Encounter_Critic': [
		'mc (Старик. С блокнотом. Снимает заметки.)',
		'show character panchin shocked at center with fadeIn',
		'panchin Молодой человек! Минуту. Я пишу обзор.',
		'mc Обзор?',
		'panchin Обзор ада. Для журнала «Загробный пользователь». Я тут с 1987-го.',
		'mc И ваш вердикт?',
		'panchin (поправляет очки) Семь из десяти. Сюжетно — неплохо. Сценарий — оставляет желать. Графика — устаревшая.',
		'panchin Главный минус — игроки очень похожи. Все скучные. Все одинаково «не верю». Никакой изюминки.',
		'mc Может, изюминка — у меня?',
		'panchin (смотрит) ...Покажите.',
		'mc (Я не знаю, что показать. Я обычный.)',

		{
			'Function': {
				'Apply': function () {
					var s = this.storage ();
					if (s.argument_quality >= 4 || s.humor_used >= 3) {
						this.storage ({ critic_impressed: true });
					}
				},
				'Revert': function () {}
			}
		},

		{
			'Conditional': {
				'Condition': function () { return this.storage ().critic_impressed ? 'yes' : 'no'; },
				'yes': 'jump Expansion_Encounter_Critic_Yes',
				'no': 'jump Expansion_Encounter_Critic_No'
			}
		}
	],

	'Expansion_Encounter_Critic_Yes': [
		'panchin (записывает) Хороший аргумент. Лучше большинства за тридцать лет.',
		'panchin Я добавлю ваш профиль в избранное. Подпишусь.',
		'mc Подписку — на что?',
		'panchin На ваши следующие воплощения.',
		'mc Следующие?!',
		'panchin (улыбается) Программа лояльности. Я ничего не говорил.',

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

		'hide character panchin with fadeOut',
		'jump Expansion_Router'
	],

	'Expansion_Encounter_Critic_No': [
		'panchin Понятно. Стандартный профиль. Я добавлю вас в категорию «common».',
		'panchin Хорошего дня. И помните — обзор будет беспощадным.',
		'hide character panchin with fadeOut',
		'jump Expansion_Router'
	],

	'Expansion_Encounter_OldFlame': [
		'mc (Лицо. Знакомое. Очень знакомое.)',
		'show character inna serious at center with fadeIn',
		'inna Алёш...',

		'mc (Это не Инна. Это... Аня. Из университета. Аня, которая умерла от лейкоза. В 2005-м. Когда мне было девятнадцать.)',
		'mc (Двадцать лет. Я её не видел двадцать лет. И я узнаю её сразу.)',

		'inna ...не Инна. Аня. Тебе сорок раз надо моргнуть, чтобы привыкнуть к моему лицу. Я знаю.',
		'mc Аня. Я... я думал, ты в раю.',
		'inna Я была. Перевелась. Скучно.',

		'mc (Не Инна. Это Аня, которая умерла, когда я молился за неё один-единственный раз в жизни.)',
		'mc (Аня. Здесь.)',

		{
			'Function': {
				'Apply': function () {
					var s = this.storage ();
					this.storage ({
						empathy_shown: s.empathy_shown + 3,
						acceptance_score: s.acceptance_score + 2,
						anya_met: true
					});
				},
				'Revert': function () {}
			}
		},

		{
			'Choice': {
				'Dialog': 'mc (Что сказать Ане?)',
				'apology': {
					'Text': '«Я молился. Один раз. Тогда. Прости.»',
					'Do': 'jump Expansion_Anya_Apology'
				},
				'love': {
					'Text': '«Я не успел сказать тебе. Я тебя любил.»',
					'Do': 'jump Expansion_Anya_Love'
				},
				'why_here': {
					'Text': '«Почему ты в аду, а не в раю?»',
					'Do': 'jump Expansion_Anya_Why'
				}
			}
		}
	],

	'Expansion_Anya_Apology': [
		'inna (тихо) Я знаю. Я слышала.',
		'mc Слышала?',
		'inna Молитвы громко идут. Я узнала твой голос. Это была единственная молитва за всю мою жизнь, в которой произнесли моё имя НЕ как требование.',
		'mc Не как требование?',
		'inna Не «спаси». Просто «пусть Аня будет нормально». Без указаний.',
		'mc (...)',
		'inna Я почувствовала. И отпустила. И уехала легче.',

		{
			'Function': {
				'Apply': function () {
					var s = this.storage ();
					this.storage ({
						empathy_shown: s.empathy_shown + 5,
						acceptance_score: s.acceptance_score + 5
					});
				},
				'Revert': function () {}
			}
		},

		'jump Ending_AnyaForgiven'
	],

	'Expansion_Anya_Love': [
		'mc Я не успел сказать. Слишком поздно. Я тебя любил.',
		'inna Я знала.',
		'mc Откуда?',
		'inna Потому что ты никогда не врал мне. Даже о химиотерапии. Даже когда все остальные. Это было самое романтичное, что я слышала.',
		'mc (Я двадцать лет жил с этим. Думал, что не сказал. А она знала. Всё это время.)',

		{
			'Function': {
				'Apply': function () {
					var s = this.storage ();
					this.storage ({
						empathy_shown: s.empathy_shown + 5,
						acceptance_score: s.acceptance_score + 4,
						anya_resolved: true
					});
				},
				'Revert': function () {}
			}
		},

		'jump Ending_AnyaLove'
	],

	'Expansion_Anya_Why': [
		'mc Почему в аду?',
		'inna (улыбается) Я попросилась. Был выбор.',
		'mc Выбор?',
		'inna Тебе никто не сказал? Каждый, кто умирает, имеет один выбор после смерти. Я выбрала ад.',
		'mc Зачем?',
		'inna Потому что я знала, что ты сюда попадёшь. А мне не хотелось бы в рай — без тебя.',

		'mc (Девятнадцатилетняя девушка попросилась в ад, чтобы быть со мной. Через двадцать лет. Я этого не заслуживаю.)',
		'mc (Но я не отказываю.)',

		{
			'Function': {
				'Apply': function () {
					var s = this.storage ();
					this.storage ({
						empathy_shown: Math.min (20, s.empathy_shown + 6),
						acceptance_score: s.acceptance_score + 5,
						anya_resolved: true
					});
				},
				'Revert': function () {}
			}
		},

		'jump Ending_AnyaTogether'
	],

	// ==========================================
	// ЦИКЛ ВЕЧНОСТИ — Groundhog Day в аду
	// Доступ — через скрытое условие в Expansion_Router (после трёх посещений)
	// ==========================================
	'Expansion_Loop_Discovery': [
		'show scene hell_corridor with fadeIn',
		{
			'Function': {
				'Apply': function () {
					var s = this.storage ();
					this.storage ({ loop_count: (s.loop_count || 0) + 1 });
				},
				'Revert': function () {}
			}
		},
		'mc (Подожди. Я уже это видел.)',
		'mc (Этот коридор. Эти двери. Этот шепот за стеной. Я уже тут был.)',
		'mc (Каждый раз, когда я возвращаюсь в коридор после двери, начинается заново. Но я-то ПОМНЮ.)',

		'show character demon paperwork at center with fadeIn',
		'demon ...Опять вы. Вы тут уже... двенадцатый раз. Я считаю.',
		'mc Двенадцатый?',
		'demon Цикл. Вы не помните. Вы помните только последний. Но я помню всё.',
		'mc И зачем мне это?',
		'demon Чтобы вы попробовали ВСЕ двери. По одной. До исчерпания.',
		'mc И что после исчерпания?',
		'demon Никто не доходил. У вас всегда не хватает терпения.',

		{
			'Function': {
				'Apply': function () {
					var s = this.storage ();
					this.storage ({
						matrix_suspicion: Math.min (10, s.matrix_suspicion + 3),
						wtf_level: Math.min (100, s.wtf_level + 20)
					});
				},
				'Revert': function () {}
			}
		},

		{
			'Choice': {
				'Dialog': 'mc (Что делать с этим знанием?)',
				'break_loop': {
					'Text': 'Сломать цикл. Не входить ни в одну дверь.',
					'Do': 'jump Ending_LoopBroken'
				},
				'finish_loop': {
					'Text': 'Завершить цикл. Открыть все двери.',
					'Do': 'jump Expansion_Loop_Complete'
				},
				'accept_loop': {
					'Text': 'Принять цикл. Это и есть моя жизнь после смерти.',
					'Do': 'jump Ending_AcceptedLoop'
				}
			}
		}
	],

	'Expansion_Loop_Complete': [
		'mc (Я возвращаюсь. И возвращаюсь. И возвращаюсь.)',
		'mc (Каждый раз — открываю одну дверь, которую не открывал. Каждый раз — узнаю что-то новое.)',
		'mc (Семь раз. Двенадцать. Двадцать пять.)',
		'mc (Все двери — открыты. Все коридоры — пройдены. Все встречи — сделаны.)',

		{
			'Function': {
				'Apply': function () {
					var s = this.storage ();
					this.storage ({
						loop_complete: true,
						matrix_suspicion: 10,
						acceptance_score: s.acceptance_score + 5
					});
				},
				'Revert': function () {}
			}
		},

		'demon ...Вы первый. За шесть тысяч лет.',
		'mc Что меня ждёт?',
		'demon Я не знаю. Это не моя зона.',
		'jump Ending_LoopComplete'
	],

	// ==========================================
	// SPEEDRUN — самая быстрая концовка
	// Доступ — из Prologue_Morning_Choice по специальной комбинации
	// ==========================================
	'Expansion_Speedrun_Start': [
		'mc (Я знаю, как это работает. У меня есть план.)',
		'mc (Из всех дверей я открою — последнюю. Самую быструю.)',
		'show scene #000000 with fadeIn',
		{
			'Function': {
				'Apply': function () {
					var s = this.storage ();
					this.storage ({
						speedrun_attempted: true,
						matrix_suspicion: 10,
						humor_used: s.humor_used + 3
					});
				},
				'Revert': function () {}
			}
		},
		'centered Speedrunner detected.',
		'centered Initializing fast track.',
		'wait 1500',
		'jump Ending_SpeedrunMaster'
	],

	// ==========================================
	// КОНЦОВКИ — раздел C
	// ==========================================

	'Ending_Bar_Guitar': [
		'show scene hell_bar with fadeIn',
		{ 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'bar_guitar' }); }, 'Revert': function () {} } },
		'mc (Я остаюсь. С гитарой Семёна. Учиться. Долго. Может, вечность.)',
		'mc (Это, оказывается, не худший способ её провести.)',
		'boris Аккорд Am. С него начинают все.',
		'mc Am.',
		'centered Алексей Волков. Ученик гитары Семёна. Бар «Последний атеист».',
		'wait 1000',
		'centered КОНЦОВКА: «УЧЕНИК СЕМЁНА»',
		'centered Иногда лучший выход — это аккорд, который ещё не выучил.',
		'wait 2000',
		'jump Ending_Credits'
	],

	'Ending_BarFranchise2': [
		'show scene hell_bar with fadeIn',
		{ 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'bar_franchise2' }); }, 'Revert': function () {} } },
		'mc «Предпоследний атеист» открывается в лимбе. Через год — третий бар, в чистилище. Через два — в раю.',
		'mc Я создал франшизу баров для атеистов по всему загробному миру.',
		'mc Слоган: «Если ты тут — у тебя есть стул».',
		'centered Алексей Волков и Борис. Сеть баров «*-Атеист». 4 локации.',
		'wait 1000',
		'centered КОНЦОВКА: «ФРАНШИЗА 2.0»',
		'centered Если рынок плохой — измени продукт. Если плохая вселенная — открой второй бар.',
		'wait 2000',
		'jump Ending_Credits'
	],

	'Ending_AnyaForgiven': [
		'show scene hell_corridor with fadeIn',
		{ 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'anya_forgiven' }); }, 'Revert': function () {} } },
		'mc Аня услышала. Аня поняла. Аня простила.',
		'mc Это всё, чего я ждал двадцать лет. И не знал.',
		'centered Алексей Волков. Получил прощение, которое не просил, но всегда хотел.',
		'wait 1000',
		'centered КОНЦОВКА: «ПРОЩЕНИЕ АНИ»',
		'centered Самая ценная посмертная встреча — та, которой ты не ожидал.',
		'wait 2000',
		'jump Ending_Credits'
	],

	'Ending_AnyaLove': [
		'show scene hell_corridor with fadeIn',
		{ 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'anya_love' }); }, 'Revert': function () {} } },
		'mc Двадцать лет я думал, что не сказал. А она знала. Знала, потому что я не врал ей.',
		'mc Сейчас, в посмертии, я скажу вслух. Так, как должен был тогда.',
		'mc Я тебя любил. И продолжаю. Это не глагол прошедшего времени.',
		'inna Я тоже. Continuous.',
		'centered Алексей и Аня. Простили друг другу время, которого им не дали.',
		'wait 1000',
		'centered КОНЦОВКА: «CONTINUOUS»',
		'centered Лучшие чувства — не в прошедшем времени.',
		'wait 2000',
		'jump Ending_Credits'
	],

	'Ending_AnyaTogether': [
		'show scene hell_corridor with fadeIn',
		{ 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'anya_together' }); }, 'Revert': function () {} } },
		'mc Аня выбрала ад. Чтобы быть со мной. Через двадцать лет ожидания.',
		'mc Я не понимаю этого выбора. Но я его принимаю.',
		'mc Мы идём. Вместе. По коридорам. С двумя стаканами кофе в руках. С двумя гитарами в багажнике, который у нас не существует.',
		'mc С двумя надеждами на то, что вечность — это не наказание.',
		'centered Алексей и Аня. Воссоединились через двадцать лет, через несколько смертей.',
		'wait 1000',
		'centered КОНЦОВКА: «ДЛИННАЯ ОЧЕРЕДЬ ЛЮБВИ»',
		'centered Иногда любовь — это умение дождаться. Даже в аду.',
		'wait 2000',
		'jump Ending_Credits'
	],

	'Ending_LoopBroken': [
		'show scene hell_corridor with fadeIn',
		{ 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'loop_broken' }); }, 'Revert': function () {} } },
		'mc Я не вхожу. Ни в одну дверь.',
		'mc Я сижу. На полу. Спиной к стене. Я выбрал — НЕ выбирать.',
		'demon ...Вы первый, кто сломал цикл, сломав поведение.',
		'mc (Если я не двигаюсь — цикл не запускается. Цикл — это движение. Я просто перестаю двигаться.)',
		'demon Что дальше?',
		'mc Не знаю. Но цикла больше нет.',
		'centered Алексей Волков. Сломал цикл, не делая ничего.',
		'wait 1000',
		'centered КОНЦОВКА: «БЕЗДЕЙСТВИЕ»',
		'centered Самое мощное «нет» — это «нет» движению.',
		'wait 2000',
		'jump Ending_Credits'
	],

	'Ending_AcceptedLoop': [
		'show scene hell_corridor with fadeIn',
		{ 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'accepted_loop' }); }, 'Revert': function () {} } },
		'mc Хорошо. Это моя жизнь. Бесконечный цикл одних и тех же дверей. С одними и теми же открытиями.',
		'mc Я выбираю не сопротивляться. Я выбираю — наблюдать.',
		'mc С каждым циклом — новые детали. С каждым циклом — новые встречи. С каждым циклом — новое я.',
		'mc Это, оказывается, и есть посмертная жизнь.',
		'centered Алексей Волков. Принял бесконечность как структуру.',
		'wait 1000',
		'centered КОНЦОВКА: «ПРИНЯТЫЙ ЦИКЛ»',
		'centered Лучший Сизиф — тот, кто полюбил камень.',
		'wait 2000',
		'jump Ending_Credits'
	],

	'Ending_LoopComplete': [
		'show scene #FFFFFF with fadeIn',
		{ 'Function': { 'Apply': function () { divineGlow (true); this.storage ({ ending_reached: 'loop_complete' }); }, 'Revert': function () { divineGlow (false); } } },
		'mc Я открыл все двери. Все. Каждую.',
		'mc Я знаю всё, что там было.',
		'g И что ты узнал?',
		'mc Что каждая дверь — одна и та же история. Просто рассказанная через другого персонажа.',
		'mc Я. Я — все эти двери. Я — отец. Я — Поля. Я — Аня. Я — Виктор. Я — Борис.',
		'mc Все персонажи — фасеты моего я.',
		'g Молодец. Ты прошёл финальный квест.',
		'mc Что дальше?',
		'g Дальше — ты выбираешь. Стать одним из них — навсегда. Или вернуться домой.',
		'centered Алексей Волков. Завершил полный цикл ада. Получил выбор.',
		'wait 1000',
		'centered КОНЦОВКА: «ВСЕ ДВЕРИ»',
		'centered Когда видишь все варианты — становится ясно, что ты — все они одновременно.',
		'wait 2000',
		'jump Ending_Credits'
	],

	'Ending_SpeedrunMaster': [
		'show scene #000000 with fadeIn',
		{ 'Function': { 'Apply': function () { screenGlitch (1200); this.storage ({ ending_reached: 'speedrun_master' }); }, 'Revert': function () {} } },
		'centered ANY% SPEEDRUN RECORD',
		'centered Time: 00:03:27',
		'centered Player: Volkov_A',
		'centered Category: dead-no-bar-no-lilith-no-cauldron',
		'wait 2500',
		'centered Алексей Волков. Установил мировой рекорд по скорости прохождения посмертия.',
		'wait 1000',
		'centered КОНЦОВКА: «ANY% NEW RECORD»',
		'centered Любую игру можно ускорить. Даже эту.',
		'wait 2000',
		'jump Ending_Credits'
	]

});

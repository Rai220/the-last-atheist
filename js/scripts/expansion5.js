/* global monogatari, hellVignette, screenShake, screenGlitch, applyWtfEffects, divineGlow, panicText, updateLifeMeter */

// ==========================================
// Chapter: РАСШИРЕНИЕ v5 — Юля (соседка) + Бабка-пророк + новые комбинаторные концовки
// Сюжетные арки:
//   - Юля: 8 концовок (романтика, побег, контакт, предательство, тайна, мать, выбор)
//   - Бабка: 6 концовок (третья итерация, сборка пророчества, освобождение)
//   - Меж-арочные: 30+ stat-gated концовок
// Hooks:
//   - Hell_Bar_Search → Юля живёт?
//   - Expansion_Router → дверь «Архив 47-й квартиры»
//   - Judgment_Audience → новая опция «Я слышал бабку с пакетами»
// ==========================================

monogatari.script ({

	// ==========================================
	// АРКА ЮЛИ — вход через нескольких хуков
	// ==========================================
	'Expansion_Yulia_Door': [
		'show scene apartment with fadeIn',
		'mc (Я возвращаюсь к её двери. В реальности, во сне, в посмертии — не уверен. Но дверь 47-й — та же.)',

		'show character neighbor smile at center with fadeIn',
		'neighbor Алёша. Я тебя ждала.',
		'mc Ты помнишь, как тебя зовут?',
		'neighbor Юля. Ты помнишь, как тебя зовут?',
		'mc Алексей.',
		'neighbor Хорошо. Значит, мы оба ещё мы.',

		{
			'Function': {
				'Apply': function () {
					var s = this.storage ();
					this.storage ({
						yulia_door_open: true,
						neighbor_met: true,
						neighbor_interest: Math.max (1, s.neighbor_interest || 0)
					});
				},
				'Revert': function () {}
			}
		},

		{
			'Choice': {
				'Dialog': 'mc (О чём говорить с Юлей здесь?)',
				'truth_neighbor': {
					'Text': '«Юль, я не знаю, где мы. Это всё ненастоящее.»',
					'Do': 'jump Expansion_Yulia_Truth'
				},
				'flirt_neighbor': {
					'Text': '«Хорошо, что ты ждала.»',
					'Do': 'jump Expansion_Yulia_Flirt'
				},
				'memory_neighbor': {
					'Text': '«Расскажи мне, что ты помнишь про меня.»',
					'Do': 'jump Expansion_Yulia_Memory'
				},
				'secret_neighbor': {
					'Text': '«У тебя был секрет. Я хочу знать.»',
					'Do': 'jump Expansion_Yulia_Secret'
				}
			}
		}
	],

	'Expansion_Yulia_Truth': [
		'neighbor (тихо) Я знаю.',
		'mc Знаешь?',
		'neighbor Я знала задолго до тебя. Я помню каждое утро дважды. У меня хроническое наложение памяти. Это и есть моё проклятие.',
		'neighbor Каждое утро я вспоминаю и сегодняшнее, и какое-то альтернативное. Где ты не открыл. Или открыл, но ушёл. Или умер раньше.',
		'mc (Она ВИДИТ варианты. Все варианты. Одновременно.)',
		'mc (Не сумасшедшая. Просто... за пределами одной линии.)',

		{
			'Function': {
				'Apply': function () {
					var s = this.storage ();
					this.storage ({
						matrix_suspicion: 10,
						neighbor_trust: 5,
						yulia_branches_seen: true
					});
				},
				'Revert': function () {}
			}
		},

		{
			'Choice': {
				'Dialog': 'mc (Принять или искать выход?)',
				'stay_with': {
					'Text': 'Остаться. Если ты помнишь меня — я остаюсь.',
					'Do': 'jump Ending_YuliaTogether'
				},
				'use_her': {
					'Text': '«Расскажи мне, какие выходы существуют.»',
					'Do': 'jump Expansion_Yulia_Maps'
				},
				'free_her': {
					'Text': '«Помогу тебе забыть. Это слишком тяжело.»',
					'Do': 'jump Ending_YuliaForget'
				}
			}
		}
	],

	'Expansion_Yulia_Maps': [
		'neighbor Хочешь карту?',
		'mc Карту?',
		'neighbor Всех вариантов. У меня их 47. Как номер моей квартиры. Совпадение, я знаю.',
		'neighbor Вариант 1 — ты остаёшься с матерью. Вариант 7 — ты бежишь с Лилит. Вариант 23 — ты становишься помощником шефа. Вариант 47 — ты сидишь со мной на кухне до конца времени.',
		'mc И какой ты бы выбрала?',
		'neighbor 47. Очевидно.',

		{
			'Function': {
				'Apply': function () {
					var s = this.storage ();
					this.storage ({
						yulia_maps_seen: true,
						matrix_suspicion: 10
					});
				},
				'Revert': function () {}
			}
		},

		{
			'Choice': {
				'Dialog': 'mc (Какой вариант выбрать?)',
				'pick_47': {
					'Text': 'Вариант 47. Кухня. Конец времени.',
					'Do': 'jump Ending_Yulia47'
				},
				'pick_unknown': {
					'Text': 'Вариант 48. Тот, которого у тебя нет.',
					'Do': 'jump Ending_Yulia48'
				},
				'pick_zero': {
					'Text': 'Вариант 0. Ни один из её.',
					'Do': 'jump Ending_YuliaZero'
				}
			}
		}
	],

	'Expansion_Yulia_Flirt': [
		'show character neighbor flirt at center',
		'mc (Я подхожу ближе. На кухне Юли пахнет корицей. В аду нет корицы. Это не ад.)',
		'neighbor Тебе подсказать, или сам догадаешься?',
		'mc О чём?',
		'neighbor Где мы.',
		'mc Я уже догадался. Это твоя квартира. Это никогда не было «моё утро» — это всегда было «наше утро». А я думал, что я один.',

		{
			'Function': {
				'Apply': function () {
					var s = this.storage ();
					this.storage ({
						neighbor_interest: Math.min (10, (s.neighbor_interest || 0) + 5),
						empathy_shown: s.empathy_shown + 2
					});
				},
				'Revert': function () {}
			}
		},

		'neighbor (улыбается) Третий шаг и ты у двери. Дальше я решаю — пускать или нет.',
		'mc Я не тороплю.',
		'neighbor Я знаю.',
		'jump Ending_YuliaKitchen'
	],

	'Expansion_Yulia_Memory': [
		'neighbor Хочешь длинный список или короткий?',
		'mc Короткий.',
		'neighbor 14 мая 2019. Ты вынес мне мусорный пакет, не сказав ни слова. Я тогда плакала на лестнице, а ты сделал вид, что не видел.',
		'mc Я... я не помню.',
		'neighbor Конечно не помнишь. Это была лучшая вещь, которую ты для меня сделал.',
		'mc Лучшая? Я просто...',
		'neighbor Вынес мусор и сделал вид, что не видел слёз. Это и было. Молча.',

		{
			'Function': {
				'Apply': function () {
					var s = this.storage ();
					this.storage ({
						empathy_shown: Math.min (20, s.empathy_shown + 5),
						neighbor_trust: 3,
						neighbor_interest: Math.min (10, (s.neighbor_interest || 0) + 3)
					});
				},
				'Revert': function () {}
			}
		},

		'jump Ending_YuliaQuietKindness'
	],

	'Expansion_Yulia_Secret': [
		'show character neighbor serious at center',
		'neighbor Ты уверен, что хочешь знать?',
		'mc Уверен.',
		'neighbor Хорошо. Я знала, что ты умрёшь. За двенадцать дней.',
		'mc ...что?',
		'neighbor У меня всегда есть двенадцать дней предупреждения. Это часть проклятия. Я знала, что Тамаре Петровне останется три недели — она ещё ходила за хлебом. Я знала, что моему мужу останется девять часов — он сидел за столом и резал лук.',
		'mc И я?',
		'neighbor Двенадцать дней назад. Ты тогда вынес мусор.',
		'mc Ты пыталась меня предупредить?',
		'neighbor Я не имею права предупреждать. Это часть проклятия. Я могу только... быть рядом. Тихо. Каждое утро. До того дня.',

		{
			'Function': {
				'Apply': function () {
					var s = this.storage ();
					this.storage ({
						neighbor_curse_known: true,
						empathy_shown: Math.min (20, s.empathy_shown + 4),
						matrix_suspicion: Math.min (10, s.matrix_suspicion + 2),
						neighbor_trust: 5
					});
				},
				'Revert': function () {}
			}
		},

		{
			'Choice': {
				'Dialog': 'mc (Что сказать ей?)',
				'forgive': {
					'Text': '«Юля. Это не твоя вина. Спасибо за двенадцать дней.»',
					'Do': 'jump Ending_YuliaForgive'
				},
				'angry': {
					'Text': '«Ты могла. Ты должна была. Ты выбрала тишину.»',
					'Do': 'jump Ending_YuliaBlame'
				},
				'use': {
					'Text': '«Сколько у нас осталось сейчас?»',
					'Do': 'jump Expansion_Yulia_Countdown'
				}
			}
		}
	],

	'Expansion_Yulia_Countdown': [
		'neighbor (молчит) ...',
		'neighbor У тебя — ноль. Ты уже умер.',
		'mc Я знаю. А у нас? У нас вдвоём?',
		'neighbor У нас — пока мы оба помним, что мы — это мы. Бесконечно. Это лучшее, что может быть в аду.',
		{
			'Function': {
				'Apply': function () {
					var s = this.storage ();
					this.storage ({
						neighbor_interest: Math.min (10, (s.neighbor_interest || 0) + 4),
						empathy_shown: Math.min (20, s.empathy_shown + 3),
						neighbor_eternal: true
					});
				},
				'Revert': function () {}
			}
		},
		'jump Ending_YuliaInfinite'
	],

	// ==========================================
	// АРКА БАБКИ — третья итерация
	// ==========================================
	'Expansion_Granny_Arc': [
		'show scene judgment_queue with fadeIn',
		'show character granny calm at center with fadeIn',
		'mc (Бабка из очереди. Та самая, со швами на сумке. Она правда вернулась.)',
		'granny Я же говорила. Не делайте вид, что не знали.',
		'mc Что вы хотите?',
		'granny Я хочу команду. Меня одну считают сумасшедшей. Двоих — уже паранойя. Троих — секта. Четверых — общественная организация.',
		'mc Сколько у вас сейчас?',
		'granny С вами — четверо. Поздравляю с членским взносом.',

		{
			'Function': {
				'Apply': function () {
					var s = this.storage ();
					this.storage ({
						granny_arc_started: true,
						matrix_suspicion: Math.min (10, s.matrix_suspicion + 2),
						rebellion_score: s.rebellion_score + 1
					});
				},
				'Revert': function () {}
			}
		},

		{
			'Choice': {
				'Dialog': 'mc (Что предложить бабке?)',
				'lead': {
					'Text': '«Я возглавлю организацию.»',
					'Do': 'jump Expansion_Granny_Lead'
				},
				'doc': {
					'Text': '«Запишите свои наблюдения. Я их систематизирую.»',
					'Do': 'jump Expansion_Granny_Document'
				},
				'leave': {
					'Text': '«Я не хочу. Извините.»',
					'Do': 'jump Expansion_Granny_Refuse'
				},
				'prophet': {
					'Text': '«Скажите, что меня ждёт.»',
					'Do': 'jump Expansion_Granny_Prophecy'
				}
			}
		}
	],

	'Expansion_Granny_Lead': [
		'show character granny rant at center',
		'granny ВЫ?! Молодой человек, ВЫ?! Возглавите?! ',
		'granny (вдруг тихо) Это первый разумный ответ за тридцать лет.',
		'granny Хорошо. Вы — глава. Я — секретарь. Двое других — рядовые. Устав — на салфетке. Печать — у меня в сумке. Найду.',
		'granny Первое заседание — здесь. Каждый пятый понедельник. У всех понедельников разный номер, не путайте.',

		{
			'Function': {
				'Apply': function () {
					var s = this.storage ();
					this.storage ({
						granny_lead: true,
						rebellion_score: s.rebellion_score + 3,
						argument_quality: s.argument_quality + 1
					});
				},
				'Revert': function () {}
			}
		},

		'jump Ending_GrannyLeader'
	],

	'Expansion_Granny_Document': [
		'show character granny warn at center',
		'granny ЗАПИСАТЬ?! Молодой человек, я всё записываю с 1962-го. У меня шесть тетрадей. В сумке.',
		'granny (вытаскивает первую) Вот. 1962. «Хрущёв заменён на дубликата. Бровь не та». 1985. «Горбачёв — третья итерация. Пятно на лбу другое». 2024. «Кофе в Москве хрипит на два хрипа больше, чем в 2019. Они нас тестируют».',
		'mc Это... систематично.',
		'granny Я систематичная. Сумасшедшие — самые систематичные люди.',

		{
			'Function': {
				'Apply': function () {
					var s = this.storage ();
					this.storage ({
						granny_docs_seen: true,
						matrix_suspicion: 10,
						argument_quality: s.argument_quality + 3
					});
				},
				'Revert': function () {}
			}
		},

		'jump Ending_GrannyArchive'
	],

	'Expansion_Granny_Refuse': [
		'show character granny calm at center',
		'granny (без злости) Я понимаю. Я тоже так начинала. Сорок лет назад.',
		'granny Когда передумаете — найдёте меня. Я всегда тут. У вторых дверей. Семь сорок четыре по понедельникам.',
		{
			'Function': {
				'Apply': function () {
					var s = this.storage ();
					this.storage ({
						granny_refused: true,
						denial_count: s.denial_count + 1
					});
				},
				'Revert': function () {}
			}
		},
		'jump Ending_GrannyMissed'
	],

	'Expansion_Granny_Prophecy': [
		'show character granny calm at center',
		'granny (внимательно смотрит) ...',
		'granny У вас впереди три развилки. Первая — через сорок минут. Вторая — через девять часов. Третья — никогда.',
		'mc Никогда?',
		'granny Третья — это тот момент, который вы не выберете. Все другие — выберете.',
		'mc Это бессмысленно.',
		'granny Это и есть пророчество. Если бы я могла его сформулировать осмысленно, оно перестало бы быть правдой.',

		{
			'Function': {
				'Apply': function () {
					var s = this.storage ();
					this.storage ({
						granny_prophecy_heard: true,
						matrix_suspicion: 10,
						acceptance_score: s.acceptance_score + 2
					});
				},
				'Revert': function () {}
			}
		},

		'jump Ending_GrannyOracle'
	],

	// ==========================================
	// КОМБИНАТОРНЫЕ КОНЦОВКИ — gated на сочетания stat'ов
	// ==========================================

	// Тройной союз: Юля + Бабка + Аня (все встречены)
	'Expansion_TripleAlliance': [
		{
			'Conditional': {
				'Condition': function () {
					var s = this.storage ();
					return (s.neighbor_met && s.granny_met && s.anya_met) ? 'yes' : 'no';
				},
				'yes': 'jump Ending_Sisterhood',
				'no': 'jump Expansion_Router'
			}
		}
	],

	// Атеистический манифест — нужно >5 встреч с матрицей
	'Expansion_AtheistManifesto': [
		{
			'Conditional': {
				'Condition': function () {
					var s = this.storage ();
					return ((s.matrix_suspicion || 0) >= 8 && (s.argument_quality || 0) >= 5) ? 'yes' : 'no';
				},
				'yes': 'jump Ending_Manifesto',
				'no': 'jump Expansion_Router'
			}
		}
	],

	// ==========================================
	// КОНЦОВКИ
	// ==========================================

	'Ending_YuliaTogether': [
		'show scene apartment with fadeIn',
		{ 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'yulia_together' }); }, 'Revert': function () {} } },
		'mc (Юля. Я. Кухня. Двенадцать сортов чая. Бесконечно.)',
		'mc (Это не ад. Это — переплетение двух одинаково странных людей. Тех, кого никто не понимал. И они нашли друг друга.)',
		'centered Алексей и Юля. Вечность вдвоём.',
		'wait 1000',
		'centered КОНЦОВКА: «КУХНЯ ЮЛИ»',
		'centered Лучший рай — это понимающая соседка.',
		'wait 2000',
		'jump Ending_Credits'
	],

	'Ending_YuliaForget': [
		'show scene apartment with fadeIn',
		{ 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'yulia_forget' }); }, 'Revert': function () {} } },
		'mc Юля. Я знаю, как помочь.',
		'mc (Я закрываю двери всех вариантов. Один за другим. У неё в голове. Остаётся только этот.)',
		'neighbor Спасибо. Спасибо. Спасибо.',
		'mc (Она больше не помнит сорок шесть вариантов. Только меня. Только сейчас.)',
		'mc (Это, оказывается, и есть любовь — забыть всё остальное.)',
		'centered Алексей и Юля. Один вариант. Без альтернатив.',
		'wait 1000',
		'centered КОНЦОВКА: «ЗАБЫТЬ ОСТАЛЬНОЕ»',
		'centered Любовь — это сокращение пространства вариантов до одного.',
		'wait 2000',
		'jump Ending_Credits'
	],

	'Ending_Yulia47': [
		'show scene apartment with fadeIn',
		{ 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'yulia_47' }); }, 'Revert': function () {} } },
		'mc Вариант 47. Кухня. Корица. Чай. Без вариантов.',
		'neighbor Ты согласен на самый скучный вариант.',
		'mc Самый скучный — самый редкий.',
		'centered Алексей в варианте 47. Конец времени, начало кухни.',
		'wait 1000',
		'centered КОНЦОВКА: «ВАРИАНТ 47»',
		'centered В аду 47 — лучшее число.',
		'wait 2000',
		'jump Ending_Credits'
	],

	'Ending_Yulia48': [
		'show scene #000000 with fadeIn',
		{ 'Function': { 'Apply': function () { screenGlitch (1500); this.storage ({ ending_reached: 'yulia_48' }); }, 'Revert': function () {} } },
		'mc Вариант 48. Тот, которого у тебя нет.',
		'neighbor (моргает) ...',
		'neighbor У меня не было 48. Только 1-47.',
		'mc А теперь есть.',
		'centered SYSTEM: ADDING VARIANT 48 to neighbor.map',
		'centered SYSTEM: VARIANT NOT IN ORIGINAL SCRIPT.',
		'centered SYSTEM: error in continuity check.',
		'wait 2000',
		'centered Алексей создал вариант, которого не было. Симуляция теперь обрабатывает.',
		'wait 1000',
		'centered КОНЦОВКА: «ВАРИАНТ 48»',
		'centered Когда у Бога есть карта, лучший выход — создать пункт назначения, которого там нет.',
		'wait 2000',
		'jump Ending_Credits'
	],

	'Ending_YuliaZero': [
		'show scene apartment with fadeIn',
		{ 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'yulia_zero' }); }, 'Revert': function () {} } },
		'mc Вариант 0. Ни один из твоих.',
		'mc Я не выбираю из списка. Я ухожу из списка.',
		'neighbor (тихо) Тогда ты уходишь и от меня.',
		'mc Да.',
		'neighbor (улыбается) Это самое грустное и самое разумное, что я слышала.',
		'centered Алексей вышел из списка вариантов Юли. Свободен. Один.',
		'wait 1000',
		'centered КОНЦОВКА: «ВАРИАНТ 0»',
		'centered Иногда любовь — это уйти из чужого списка.',
		'wait 2000',
		'jump Ending_Credits'
	],

	'Ending_YuliaKitchen': [
		'show scene apartment with fadeIn',
		{ 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'yulia_kitchen' }); }, 'Revert': function () {} } },
		'mc (Юля. Кухня. Корица. Я учу её улыбаться на ту секунду быстрее, чем я.)',
		'mc (Зеркало стоит так же. Окно напротив. Мы смотрим друг на друга через два кадра.)',
		'centered Алексей и Юля. Симметричные кухни.',
		'wait 1000',
		'centered КОНЦОВКА: «ОТРАЖЕНИЕ»',
		'centered Иногда соседка через стену — это и есть лучшая часть тебя.',
		'wait 2000',
		'jump Ending_Credits'
	],

	'Ending_YuliaQuietKindness': [
		'show scene apartment with fadeIn',
		{ 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'yulia_quiet' }); }, 'Revert': function () {} } },
		'mc Я не помнил мусорный пакет. А она запомнила его как лучшую вещь.',
		'mc (Мы все живём в чужом календаре. Каждое наше «ничего» — у кого-то «всё».)',
		'centered Алексей. Узнал, что молчаливые добрые дела засчитываются громче слов.',
		'wait 1000',
		'centered КОНЦОВКА: «МУСОРНЫЙ ПАКЕТ»',
		'centered Самые важные жесты — те, которые ты не запомнил.',
		'wait 2000',
		'jump Ending_Credits'
	],

	'Ending_YuliaForgive': [
		'show scene apartment with fadeIn',
		{ 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'yulia_forgive' }); }, 'Revert': function () {} } },
		'mc Юля. Спасибо. Я благодарен за двенадцать дней, которые ты не имела права испортить.',
		'neighbor (плачет) ...Я не плакала за тридцать лет.',
		'mc Тогда сейчас — самое время.',
		'centered Алексей простил Юлю за то, что она знала и не сказала.',
		'wait 1000',
		'centered КОНЦОВКА: «ПРАВО ЗНАТЬ»',
		'centered Тот, кто знает чужую смерть — несёт собственное проклятие.',
		'wait 2000',
		'jump Ending_Credits'
	],

	'Ending_YuliaBlame': [
		'show scene apartment with fadeIn',
		{ 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'yulia_blame' }); }, 'Revert': function () {} } },
		'mc Ты могла. Ты выбрала тишину.',
		'neighbor Я не выбрала. У меня нет выбора. Это часть проклятия.',
		'mc Ты могла нарушить проклятие.',
		'neighbor И тогда умерли бы все мои предупреждения. Все девять часов мужа. Все три недели Тамары. Все двенадцать твоих.',
		'mc ...',
		'mc Прости.',
		'neighbor Поздно.',
		'centered Алексей. Обвинил Юлю и потерял её.',
		'wait 1000',
		'centered КОНЦОВКА: «ПОЗДНО»',
		'centered Иногда ты прав. Иногда правда стоит дороже, чем правота.',
		'wait 2000',
		'jump Ending_Credits'
	],

	'Ending_YuliaInfinite': [
		'show scene apartment with fadeIn',
		{ 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'yulia_infinite' }); }, 'Revert': function () {} } },
		'mc Мы оба умерли. У нас бесконечно.',
		'neighbor И всё ещё корица.',
		'mc И всё ещё ты.',
		'centered Алексей и Юля. Бесконечный таймер без таймера.',
		'wait 1000',
		'centered КОНЦОВКА: «БЕЗ ОБРАТНОГО ОТСЧЁТА»',
		'centered Лучшее посмертие — когда таймер сломан.',
		'wait 2000',
		'jump Ending_Credits'
	],

	'Ending_GrannyLeader': [
		'show scene judgment_queue with fadeIn',
		{ 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'granny_leader' }); }, 'Revert': function () {} } },
		'mc Я возглавляю общественную организацию «ПРАВДА ШВА» — наблюдатели за симуляцией.',
		'mc Бабка — секретарь. Два других — рядовые. Печать в её сумке. Устав на салфетке.',
		'mc Мы каждый пятый понедельник проводим заседания. Каждый понедельник имеет номер. Они разные. Не путайте.',
		'centered Алексей — глава «ПРАВДЫ ШВА». 4 члена, 6 тетрадей, 1 печать.',
		'wait 1000',
		'centered КОНЦОВКА: «ПРАВДА ШВА»',
		'centered Лучшая организация — та, чьи члены сами не знают, что они НКО.',
		'wait 2000',
		'jump Ending_Credits'
	],

	'Ending_GrannyArchive': [
		'show scene judgment_queue with fadeIn',
		{ 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'granny_archive' }); }, 'Revert': function () {} } },
		'mc Шесть тетрадей. Шестьдесят два года. Каждая итерация Хрущёва, Брежнева, Горбачёва, Ельцина, обоих Путиных, обеих своих квартир.',
		'mc Я систематизировал. У меня получилось 47 томов. Совпадение с квартирой Юли. Не совпадение.',
		'centered Алексей. Систематизатор бабкиного архива наблюдений.',
		'wait 1000',
		'centered КОНЦОВКА: «47 ТОМОВ ПРАВДЫ»',
		'centered Все паттерны — это бабки с тетрадями.',
		'wait 2000',
		'jump Ending_Credits'
	],

	'Ending_GrannyMissed': [
		'show scene judgment_queue with fadeIn',
		{ 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'granny_missed' }); }, 'Revert': function () {} } },
		'mc Я не пошёл в её организацию. Я выбрал быть нормальным.',
		'mc (Сорок лет спустя я вспомнил её на остановке. С пакетами. С сумкой. Со швами.)',
		'mc (Я тогда уже всё знал. Но было поздно — её перезагрузили в четвёртый раз. Без меня.)',
		'centered Алексей. Упустил единственного союзника, который видел швы.',
		'wait 1000',
		'centered КОНЦОВКА: «ШВА НЕ ВИДНО»',
		'centered Кто отказался от бабки — отказался от пророка.',
		'wait 2000',
		'jump Ending_Credits'
	],

	'Ending_GrannyOracle': [
		'show scene judgment_queue with fadeIn',
		{ 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'granny_oracle' }); }, 'Revert': function () {} } },
		'mc Три развилки. Я не знаю, какая «никогда». Это меня и подкупает.',
		'centered Алексей. Услышал пророчество, которое нельзя сформулировать.',
		'wait 1000',
		'centered КОНЦОВКА: «ОРАКУЛ-БАБКА»',
		'centered Лучшие пророчества — те, которые ты понимаешь после того, как они сбылись.',
		'wait 2000',
		'jump Ending_Credits'
	],

	'Ending_Sisterhood': [
		'show scene #FFFFFF with fadeIn',
		{ 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'sisterhood' }); }, 'Revert': function () {} } },
		'mc Юля, Аня, бабка. Я их свёл. Они теперь подруги.',
		'mc Юля помнит всё. Аня помнит меня. Бабка помнит швы.',
		'mc Втроём они системнее, чем любой Бог.',
		'mc Они открыли центр посмертной взаимопомощи. Я работаю охранником.',
		'centered Алексей. Охранник в женском центре посмертной поддержки.',
		'wait 1000',
		'centered КОНЦОВКА: «СЕСТРИНСТВО»',
		'centered Лучший рай — это когда тех, кому ты не помог, наконец сводят вместе.',
		'wait 2000',
		'jump Ending_Credits'
	],

	'Ending_Manifesto': [
		'show scene #000000 with fadeIn',
		{ 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'manifesto' }); }, 'Revert': function () {} } },
		'mc Я написал манифест атеистов посмертия. На листе из формы 66-А.',
		'centered МАНИФЕСТ',
		'centered 1. Мы не верим в эту версию реальности.',
		'centered 2. Мы помним, что есть другие.',
		'centered 3. Мы храним список швов.',
		'centered 4. Мы любим вопреки, не благодаря.',
		'wait 2000',
		'mc Подписали: Алексей, Юля, бабка, Виктор, Олег, Карл Саган, мой отец, Стивен Хокинг (через скайп).',
		'mc Это сильнейшее заявление, сделанное в посмертии.',
		'centered Алексей. Автор посмертного манифеста. 8 подписей.',
		'wait 1000',
		'centered КОНЦОВКА: «МАНИФЕСТ»',
		'centered Лучший аргумент против всемогущества — коллективное письмо.',
		'wait 2000',
		'jump Ending_Credits'
	],

	// ==========================================
	// МИКРОКОНЦОВКИ — stat-gated, реиграбельные
	// ==========================================

	'Ending_MaxEmpathy': [
		'show scene #FFFFFF with fadeIn',
		{ 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'max_empathy' }); }, 'Revert': function () {} } },
		'g Алексей. Твой эмпатии-балл — 20. Это максимум. За шесть тысяч лет — впервые.',
		'mc Что это значит?',
		'g Это значит, что ты — выпускник. Можешь вернуться. Учителем.',
		'centered Алексей. Выпускник класса посмертного эмпати-курса.',
		'wait 1000',
		'centered КОНЦОВКА: «MAX EMPATHY»',
		'centered Чем больше ты замечаешь — тем выше ты по лестнице.',
		'wait 2000',
		'jump Ending_Credits'
	],

	'Ending_MaxCruelty': [
		'show scene hell_cauldrons with fadeIn',
		{ 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'max_cruelty' }); }, 'Revert': function () {} } },
		'mc (Я был мудаком. Постоянно. Целенаправленно.)',
		'g Жестокость 10/10. Уникальный профиль.',
		'mc Это плохо?',
		'g Это интересно. У нас есть для тебя VIP-программа: котёл с зеркалом. Каждое твоё унижение возвращается. Ровно тебе. Бесконечно.',
		'mc (Симметрия — это форма справедливости. Я её всегда уважал.)',
		'centered Алексей. VIP-котёл с зеркальной обратной связью.',
		'wait 1000',
		'centered КОНЦОВКА: «MAX CRUELTY»',
		'centered Жестокость — самый эффективный путь к идеально подогнанной пытке.',
		'wait 2000',
		'jump Ending_Credits'
	],

	'Ending_MaxHumor': [
		'show scene hell_office with fadeIn',
		{ 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'max_humor' }); }, 'Revert': function () {} } },
		'g Юмор 10/10. Это редко.',
		'mc Я могу попросить эту медаль на грудь?',
		'g Уже на тебе.',
		'mc Где?',
		'g Это медаль невидимого юмора. Видна только тем, кто тоже шутит про невидимые медали.',
		'centered Алексей. Носитель медали невидимого юмора.',
		'wait 1000',
		'centered КОНЦОВКА: «MAX HUMOR»',
		'centered Чем сильнее шутишь — тем большe Бог тебе мигает.',
		'wait 2000',
		'jump Ending_Credits'
	],

	'Ending_MaxRebellion': [
		'show scene hell_union with fadeIn',
		{ 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'max_rebellion' }); }, 'Revert': function () {} } },
		'mc Бунт 10/10. Все союзы, все профсоюзы, все архивы — мои.',
		'g Хорошо. Возьми ад.',
		'mc Я не хочу ад.',
		'g Тогда отдай.',
		'mc Кому?',
		'g Себе. Версии 2. Которая уже ждёт.',
		'centered Алексей. Передал управление адом следующему атеисту.',
		'wait 1000',
		'centered КОНЦОВКА: «MAX REBELLION»',
		'centered Самый большой бунт — отказаться даже от своей победы.',
		'wait 2000',
		'jump Ending_Credits'
	],

	'Ending_MaxAcceptance': [
		'show scene #FFFFFF with fadeIn',
		{ 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'max_acceptance' }); }, 'Revert': function () {} } },
		'mc Принятие 20/20. Я согласен на всё, что есть.',
		'g Тогда тебе нечего здесь делать. Иди.',
		'mc Куда?',
		'g Куда угодно. Принятие открывает все двери.',
		'centered Алексей. Достиг полного принятия. Двери открылись.',
		'wait 1000',
		'centered КОНЦОВКА: «MAX ACCEPTANCE»',
		'centered Когда ты согласен на ад — ад тебя отпускает.',
		'wait 2000',
		'jump Ending_Credits'
	],

	'Ending_LowLife': [
		'show scene hell_cauldrons with fadeIn',
		{ 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'low_life' }); }, 'Revert': function () {} } },
		'mc (Я выжимал себя до нуля. Жизненная стойкость — 0/5. Сердце — там. Воля — там же.)',
		'g Котёл назначен. Бессрочно.',
		'mc (Бессрочно — это лучше, чем срочно. По крайней мере, никто не считает дни.)',
		'centered Алексей. Сгорел до нуля. Котёл бессрочного типа.',
		'wait 1000',
		'centered КОНЦОВКА: «LOW LIFE»',
		'centered У некоторых жизненная стойкость заканчивается раньше жизни.',
		'wait 2000',
		'jump Ending_Credits'
	],

	'Ending_MaxLilithTrust': [
		'show scene hell_lilith_chamber with fadeIn',
		{ 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'max_lilith_trust' }); }, 'Revert': function () {} } },
		'lilith Алёша. Уровень доверия — 10/10. Никогда не было.',
		'mc Что это значит?',
		'lilith Это значит, что я не предам тебя. Технически. Это не любовь. Это контракт.',
		'mc Я согласен на контракт.',
		'centered Алексей и Лилит. Контракт о ненападении.',
		'wait 1000',
		'centered КОНЦОВКА: «КОНТРАКТ С ЛИЛИТ»',
		'centered Доверие — это структурная защита от предательства.',
		'wait 2000',
		'jump Ending_Credits'
	],

	'Ending_DoubleAgent': [
		'show scene hell_lilith_chamber with fadeIn',
		{ 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'double_agent' }); }, 'Revert': function () {} } },
		'mc Юля. Лилит. Я. Все втроём — за одним столом.',
		'mc Это самое опасное и самое нужное собрание в моей не-жизни.',
		'mc (Я объясняю Юле, что Лилит — не угроза. Я объясняю Лилит, что Юля — не угроза. Они проверяют друг друга.)',
		'mc (Проверка занимает два часа. После неё они идут пить чай.)',
		'centered Алексей. Свёл Юлю и Лилит. Они теперь подруги.',
		'wait 1000',
		'centered КОНЦОВКА: «ДВОЙНОЙ АГЕНТ»',
		'centered Лучший дипломат — тот, кто свёл двух своих женщин и выжил.',
		'wait 2000',
		'jump Ending_Credits'
	],

	'Ending_NoVerdict': [
		'show scene judgment_throne with fadeIn',
		{ 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'no_verdict' }); }, 'Revert': function () {} } },
		'g Я не могу вынести приговор.',
		'mc Почему?',
		'g Твой профиль ни в одной категории. Эмпатия низкая, жестокость низкая, юмор низкий, бунтарство низкое, принятие низкое.',
		'g Ты — серое поле. У серого поля нет места.',
		'mc И что?',
		'g Иди. Никуда. Это и будет твоё место.',
		'centered Алексей. Не получил приговора. Идёт в никуда.',
		'wait 1000',
		'centered КОНЦОВКА: «БЕЗ ВЕРДИКТА»',
		'centered Серая жизнь даёт серое посмертие.',
		'wait 2000',
		'jump Ending_Credits'
	],

	'Ending_AllStats': [
		'show scene #FFFFFF with fadeIn',
		{ 'Function': { 'Apply': function () { divineGlow (true); this.storage ({ ending_reached: 'all_stats' }); }, 'Revert': function () {} } },
		'g Алексей. У тебя ВСЕ метрики на максимуме.',
		'mc Все?',
		'g Все. Эмпатия 20. Жестокость 10. Юмор 10. Бунт 10. Принятие 20. Argument 10. Lilith 10. WTF 100.',
		'g Это математически невозможно.',
		'mc А я тут.',
		'g (молчит) ...Ты сломал бэкенд.',
		'mc Это моя профессия.',
		'centered Алексей. Сломал бэкенд оценки душ.',
		'wait 1000',
		'centered КОНЦОВКА: «ALL STATS MAX»',
		'centered Когда у тебя все метрики на максимуме — система не знает, как с тобой быть.',
		'wait 2000',
		'jump Ending_Credits'
	],

	'Ending_LowAll': [
		'show scene hell_office with fadeIn',
		{ 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'low_all' }); }, 'Revert': function () {} } },
		'g Все нулевые. Хм.',
		'mc Что значит «хм»?',
		'g Значит, я о тебе ничего не знаю. Ты прожил жизнь, не оставив отпечатка.',
		'mc Это плохо?',
		'g Это интересно. У нас есть для тебя отдельное место. Тихое. Без статистики.',
		'centered Алексей. Прозрачная жизнь — прозрачное посмертие.',
		'wait 1000',
		'centered КОНЦОВКА: «БЕЗ ОТПЕЧАТКА»',
		'centered Жил без следа — попадёшь без приговора.',
		'wait 2000',
		'jump Ending_Credits'
	],

	'Ending_NeighborCurseBreaker': [
		'show scene apartment with fadeIn',
		{
			'Function': {
				'Apply': function () {
					var s = this.storage ();
					this.storage ({ ending_reached: 'neighbor_curse_breaker' });
				},
				'Revert': function () {}
			}
		},
		'mc Юля. Я понял, как сломать твоё проклятие.',
		'neighbor Не нужно.',
		'mc Нужно. Если ты больше не видишь смертей за двенадцать дней — ты больше не отвечаешь за то, кого не предупредила.',
		'neighbor Это умный. Это рискованный. Это правильный.',
		'centered Алексей сломал проклятие памяти Юли. Она впервые забыла кого-то.',
		'wait 1000',
		'centered КОНЦОВКА: «РАЗРЫВ ПРОКЛЯТИЯ»',
		'centered Иногда любовь — это снять с любимой её невозможный долг.',
		'wait 2000',
		'jump Ending_Credits'
	],

	'Ending_NeighborHellRomance': [
		'show scene hell_corridor with fadeIn',
		{ 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'neighbor_hell_romance' }); }, 'Revert': function () {} } },
		'mc Юля попала в ад через три недели после меня. Аритмия. Я её ждал.',
		'mc Лилит, Виктор, отец — все знают, что мы вместе.',
		'mc Папа варит кофе. Юля выбирает чай. Виктор пишет нам общий лог. Лилит вяжет — для Юли.',
		'mc (Это рай. Просто в красных декорациях.)',
		'centered Алексей и Юля. Семья ада.',
		'wait 1000',
		'centered КОНЦОВКА: «АД ВСЕМЕРОМ»',
		'centered Семья — это не место, это группа людей, которые приняли друг друга.',
		'wait 2000',
		'jump Ending_Credits'
	],

	'Ending_GrannyTakeover': [
		'show scene judgment_throne with fadeIn',
		{ 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'granny_takeover' }); }, 'Revert': function () {} } },
		'granny ВСЁ. Я БЕРУ. ЭТО. МЕСТО.',
		'g (изумлённо) ...',
		'granny Я ВИДЕЛА ШВЫ. ЧЕТЫРЕ ИТЕРАЦИИ. ОТКРЫВАЕМ КАЖДУЮ.',
		'g (тихо) Принято.',
		'centered Бабка. Заняла трон Бога. Алексей — её советник.',
		'wait 1000',
		'centered КОНЦОВКА: «БАБКА У РУЛЯ»',
		'centered Лучший бог — та, кто умеет показать систему изнутри.',
		'wait 2000',
		'jump Ending_Credits'
	],

	// ==========================================
	// ХУКИ
	// ==========================================
	'Expansion_Yulia_Hook': [ 'jump Expansion_Yulia_Door' ],
	'Expansion_Granny_Hook': [ 'jump Expansion_Granny_Arc' ],
	'Expansion_TripleAlliance_Hook': [ 'jump Expansion_TripleAlliance' ],
	'Expansion_Manifesto_Hook': [ 'jump Expansion_AtheistManifesto' ],

	// ==========================================
	// Диспетчер концовок по максимальным/минимальным statам
	// Доступен из Hell_Breakdown_Route, выкидывает в специальный финал
	// ==========================================
	'Expansion_StatGate': [
		{
			'Conditional': {
				'Condition': function () {
					var s = this.storage ();
					if ((s.empathy_shown || 0) >= 20) return 'max_empathy';
					if ((s.cruelty_score || 0) >= 10) return 'max_cruelty';
					if ((s.humor_used || 0) >= 10) return 'max_humor';
					if ((s.rebellion_score || 0) >= 10) return 'max_rebellion';
					if ((s.acceptance_score || 0) >= 20) return 'max_acceptance';
					if ((s.life_current || 0) <= 0) return 'low_life';
					if ((s.lilith_trust || 0) >= 10) return 'max_lilith_trust';
					// Все максимальны — особый финал
					if (
						(s.empathy_shown || 0) >= 18 &&
						(s.argument_quality || 0) >= 8 &&
						(s.humor_used || 0) >= 7 &&
						(s.rebellion_score || 0) >= 6 &&
						(s.acceptance_score || 0) >= 15 &&
						(s.matrix_suspicion || 0) >= 8
					) return 'all_stats';
					// Всё низко — серое поле
					if (
						(s.empathy_shown || 0) <= 1 &&
						(s.cruelty_score || 0) <= 1 &&
						(s.humor_used || 0) <= 1 &&
						(s.rebellion_score || 0) <= 1 &&
						(s.acceptance_score || 0) <= 1
					) return 'low_all';
					return 'fall_through';
				},
				'max_empathy': 'jump Ending_MaxEmpathy',
				'max_cruelty': 'jump Ending_MaxCruelty',
				'max_humor': 'jump Ending_MaxHumor',
				'max_rebellion': 'jump Ending_MaxRebellion',
				'max_acceptance': 'jump Ending_MaxAcceptance',
				'low_life': 'jump Ending_LowLife',
				'max_lilith_trust': 'jump Ending_MaxLilithTrust',
				'all_stats': 'jump Ending_AllStats',
				'low_all': 'jump Ending_LowAll',
				'fall_through': 'jump Expansion_Combo_Gate'
			}
		}
	]

});

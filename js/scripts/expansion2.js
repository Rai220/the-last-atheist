/* global monogatari, hellVignette, screenShake, screenGlitch, applyWtfEffects, divineGlow, panicText, updateLifeMeter */

// ==========================================
// Chapter: РАСШИРЕНИЕ v2 — Прологовые и Судебные побочные ветки
// Hooks: Prologue_Apartment_Window (новая опция в Prologue_Morning_Choice),
//        Judgment_Audience (новая опция «Запросить досудебное соглашение»).
// Plus: новые ранние/быстрые концовки и мета-кодеки.
// ==========================================

monogatari.script ({

	// ==========================================
	// ПРОЛОГ: Новая опция «Подойти к окну»
	// Хук добавляется в Prologue_Morning_Route_Choice.
	// ==========================================
	'Prologue_Window': [
		'show scene apartment with fadeIn',
		'mc (Я подхожу к окну.)',
		'mc (Москва. Семь сорок четыре. Понедельник.)',
		'mc (Машина внизу едет с той же скоростью, что и три дня назад. Тот же таксист. Та же царапина на левом крыле.)',
		'mc (Я узнаю даже птиц. Двух голубей на проводе — одного с пятном на крыле, другого без.)',

		{
			'Function': {
				'Apply': function () {
					var s = this.storage ();
					this.storage ({
						matrix_suspicion: Math.min (10, s.matrix_suspicion + 2),
						noticed_patterns: true,
						morning_choice: 'window'
					});
				},
				'Revert': function () {}
			}
		},

		{
			'Choice': {
				'Dialog': 'mc (Что сделать с этим осознанием?)',
				'snapshot': {
					'Text': 'Сфотографировать. На память. Доказательство себе.',
					'Do': 'jump Prologue_Window_Snapshot'
				},
				'sign': {
					'Text': 'Сделать жест в окно — если за окном кто-то наблюдает',
					'Do': 'jump Prologue_Window_Sign'
				},
				'dismiss': {
					'Text': 'Усмехнуться и идти варить кофе',
					'Do': 'jump Prologue_Window_Dismiss'
				}
			}
		}
	],

	'Prologue_Window_Snapshot': [
		'Алексей делает снимок. Просматривает на следующий день. Тот же таксист. Тот же голубь.',
		'mc (Окей. Это не паранойя. Это паттерн.)',
		{
			'Function': {
				'Apply': function () {
					var s = this.storage ();
					this.storage ({
						matrix_suspicion: Math.min (10, s.matrix_suspicion + 2),
						pattern_journal: true
					});
				},
				'Revert': function () {}
			}
		},
		'mc (Если есть Бог — он плохо проработал асинхронность.)',
		'jump Prologue_Morning_Route_Choice'
	],

	'Prologue_Window_Sign': [
		'Алексей машет рукой в окно. По-дурацки. Машина проезжает, не сбавив скорости.',
		'mc (Никто не отреагировал. Конечно. Это либо случайность, либо у них хороший движок без feedback-петель.)',
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
		'jump Prologue_Morning_Route_Choice'
	],

	'Prologue_Window_Dismiss': [
		'mc (Это паттерн от усталости. Я работаю слишком много. Я начал видеть код в облаках.)',
		'mc (Свежий кофе. Свежие новости. Будет день — будет пища.)',
		{
			'Function': {
				'Apply': function () {
					var s = this.storage ();
					this.storage ({ denial_count: s.denial_count + 1 });
				},
				'Revert': function () {}
			}
		},
		'jump Prologue_Morning_Route_Choice'
	],

	// ==========================================
	// ПРОЛОГ: Зеркало — самый странный момент утра
	// Доступ через Prologue_Morning_Route_Choice (опция zerkalo)
	// ==========================================
	'Prologue_Mirror': [
		'show scene apartment with fadeIn',
		'mc (Зеркало в коридоре. Стандартное, советское ещё. Под лампой накаливания.)',
		'mc (Я смотрю на своё лицо. Это странно. Я нечасто это делаю.)',

		{
			'Function': {
				'Apply': function () {
					var s = this.storage ();
					this.storage ({ morning_choice: 'mirror' });
				},
				'Revert': function () {}
			}
		},

		'mc (38 лет. Серая щетина. Залысины. Глаза — устаревший процессор, который перегревается.)',
		'mc (Я был похож на отца. Сейчас я ПОХОЖ на отца. Точно. Знал бы он, что я к нему приближаюсь так быстро.)',
		'mc (А может, он смотрит на меня сейчас. Сквозь это зеркало. С другой стороны.)',
		'mc (Стоп. Это была философия. Без кофе. Это запрещено.)',

		{
			'Choice': {
				'Dialog': 'mc (Что сказать своему отражению?)',
				'respect': {
					'Text': '«Ты молодец. Держись.»',
					'Do': 'jump Prologue_Mirror_Respect'
				},
				'truth': {
					'Text': '«Ты не такой, каким мог быть.»',
					'Do': 'jump Prologue_Mirror_Truth'
				},
				'joke': {
					'Text': '«Привет, IronyOverload2024.»',
					'Do': 'jump Prologue_Mirror_Joke'
				}
			}
		}
	],

	'Prologue_Mirror_Respect': [
		'mc (Это, пожалуй, было неловко. Ну ладно.)',
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
		'mc (Алексей. Иди работать.)',
		'jump Prologue_Morning_Route_Choice'
	],

	'Prologue_Mirror_Truth': [
		'mc (Точнее. Ты НЕ ТАКОЙ, каким мог быть.)',
		'mc (Серёжа. Мама. Папа. Все, кому ты сказал «потом». Они тоже из этого «не такого».)',
		{
			'Function': {
				'Apply': function () {
					var s = this.storage ();
					this.storage ({ empathy_shown: s.empathy_shown + 2 });
				},
				'Revert': function () {}
			}
		},
		'mc (Я ставлю это в TODO. И в реальный календарь. С напоминанием.)',
		'jump Prologue_Morning_Route_Choice'
	],

	'Prologue_Mirror_Joke': [
		'mc (Привет, IronyOverload2024.)',
		'mc (Отражение усмехается за полсекунды до меня.)',
		'mc (Стоп.)',
		'mc (Это не задержка камеры. Это упреждение.)',
		{
			'Function': {
				'Apply': function () {
					var s = this.storage ();
					this.storage ({
						matrix_suspicion: Math.min (10, s.matrix_suspicion + 3),
						humor_used: s.humor_used + 1
					});
				},
				'Revert': function () {}
			}
		},
		'mc (Если он усмехнулся РАНЬШЕ меня — кто из нас был оригиналом?)',
		'jump Prologue_Morning_Route_Choice'
	],

	// ==========================================
	// ПРОЛОГ: Сосед — мини-эпизод доброты или цинизма
	// Хук вставляется на Prologue_Morning_Route_Choice
	// ==========================================
	'Prologue_Neighbor': [
		'show scene apartment with fadeIn',
		'mc (Звонок в дверь. Соседка. Тамара Петровна. Каждый понедельник.)',
		'mc (Я заранее знаю, чего она хочет. Соли. Или сахара. Или просто чтобы кто-то её выслушал десять минут.)',

		{
			'Function': {
				'Apply': function () {
					var s = this.storage ();
					this.storage ({ morning_choice: 'neighbor' });
				},
				'Revert': function () {}
			}
		},

		{
			'Choice': {
				'Dialog': 'mc (Открыть?)',
				'open_kind': {
					'Text': 'Открыть. Послушать. Это десять минут.',
					'Do': 'jump Prologue_Neighbor_Kind'
				},
				'open_quick': {
					'Text': 'Открыть. Сказать, что опаздываю. Дать сахар.',
					'Do': 'jump Prologue_Neighbor_Quick'
				},
				'ignore': {
					'Text': 'Притвориться, что меня нет дома.',
					'Do': 'jump Prologue_Neighbor_Ignore'
				}
			}
		}
	],

	'Prologue_Neighbor_Kind': [
		'mc Здравствуйте, Тамара Петровна. Что-то случилось?',
		'soul Алёша. Прости, что рано. Я просто... никого нет дома. У сына уже сорок дней, как...',
		'mc Я знаю. Заходите. Я заварю чай. У меня двадцать минут.',
		'soul ...правда?',
		'mc Правда. Сегодня важнее, чем работа.',

		{
			'Function': {
				'Apply': function () {
					var s = this.storage ();
					this.storage ({
						empathy_shown: s.empathy_shown + 3,
						acceptance_score: s.acceptance_score + 2,
						prologue_was_kind: true
					});
				},
				'Revert': function () {}
			}
		},

		'mc (Двадцать минут. Я опоздаю. И это будет лучшая поздняя смена в моей жизни.)',
		'jump Prologue_Morning_Route_Choice'
	],

	'Prologue_Neighbor_Quick': [
		'mc Тамара Петровна, я опаздываю. Сахар? Соль?',
		'soul Сахар. И... Алёша, ты как сам?',
		'mc Нормально. Спасибо. Я пошёл.',
		'mc (Я отвёл взгляд. Она кивнула. Дверь закрылась.)',
		{
			'Function': {
				'Apply': function () {
					var s = this.storage ();
					this.storage ({
						acceptance_score: s.acceptance_score + 1,
						empathy_shown: s.empathy_shown + 1
					});
				},
				'Revert': function () {}
			}
		},
		'jump Prologue_Morning_Route_Choice'
	],

	'Prologue_Neighbor_Ignore': [
		'mc (Я тихо. Шаги. Дверь молчит. Через минуту шаги уходят.)',
		'mc (Это не моя вина. Я устал. У меня дедлайн.)',
		'mc (Никто не обязан открывать в семь утра.)',
		{
			'Function': {
				'Apply': function () {
					var s = this.storage ();
					this.storage ({
						cruelty_score: s.cruelty_score + 1,
						denial_count: s.denial_count + 1
					});
				},
				'Revert': function () {}
			}
		},
		'mc (Только почему мне сейчас немного хуже, чем было.)',
		'jump Prologue_Morning_Route_Choice'
	],

	// ==========================================
	// ПРОЛОГ: Альтернативная смерть — Подавился печеньем
	// Чёрная пасхалка через Prologue_Apartment_Phone
	// ==========================================
	'Prologue_Death_Cookie': [
		'show scene apartment with fadeIn',
		{
			'Function': {
				'Apply': function () {
					screenShake (800);
					var s = this.storage ();
					this.storage ({
						death_type: 'cookie',
						death_flavor: 'ironic'
					});
				},
				'Revert': function () {}
			}
		},
		'mc Я просто хотел заесть стресс. Овсяное печенье. Бабушкин рецепт.',
		'Алексей берёт большой кусок. Откусывает. Подавляется.',
		'mc (Кх... кх... хех... КХ.)',
		'mc (Я доктор медицинских наук — нет, я не доктор, я программист. Но я знаю, что нельзя умереть от печенья. Это статистически невероятно.)',
		'mc (...Стат... ис... ти... че... ски...)',
		'mc (...)',
		'wait 1500',
		'centered Алексей Волков, 38 лет, программист, атеист.',
		'centered Причина смерти: бабушкино печенье.',
		'centered Уровень иронии: невыносимо высокий.',
		'wait 2000',
		'jump Prologue_Transition'
	],

	// ==========================================
	// ПРОЛОГ: Альтернативная смерть — DDoS на собственное сердце
	// Через Prologue_Internet → Prologue_Debate_Engage (можно зациклить)
	// ==========================================
	'Prologue_Death_Debate': [
		'show scene phone_screen with fadeIn',
		{
			'Function': {
				'Apply': function () {
					var s = this.storage ();
					this.storage ({
						death_type: 'debate',
						death_flavor: 'overwork'
					});
					screenGlitch (600);
				},
				'Revert': function () {}
			}
		},
		'mc Двадцать седьмой комментарий за час. Я их разнесу.',
		'mc Кх — что-то в груди.',
		'mc (Это, наверное, кислород. Воздух. Что-то такое. Я перепутал — у меня сейчас выдох или вдох?)',
		'mc (...)',
		'centered DDoS-атака на собственное сердце.',
		'centered Источник: r/DebateReligion, тред № 4 829.',
		'centered Финальный комментарий: «Источник?» (не отправлен).',
		'wait 2000',
		'jump Prologue_Transition'
	],

	// ==========================================
	// СУД: Запросить досудебное соглашение (хук на Judgment_Audience)
	// ==========================================
	'Judgment_Settle': [
		'show character mc smirk at center',
		'mc Минуту. Перед вердиктом — я хочу подать ходатайство о досудебном урегулировании.',
		'g ...Что?',
		'mc Досудебка. Стороны договариваются. Я готов признать часть. В обмен — снижение.',
		'g Я не сторона. Я — судья.',
		'mc С точки зрения процессуального права — Вы и истец, и судья. Это конфликт интересов.',
		'g (молчит) ...',

		{
			'Function': {
				'Apply': function () {
					var s = this.storage ();
					this.storage ({
						argument_quality: s.argument_quality + 3,
						humor_used: s.humor_used + 1
					});
				},
				'Revert': function () {}
			}
		},

		'g Ладно. Что вы готовы признать?',

		{
			'Choice': {
				'Dialog': 'mc (Что предложить?)',
				'small': {
					'Text': '«Я был неприятным. Это — да.»',
					'Do': 'jump Judgment_Settle_Small'
				},
				'large': {
					'Text': '«Я был жестоким. Я готов это признать.»',
					'Do': 'jump Judgment_Settle_Large'
				},
				'meta': {
					'Text': '«Признаю, что подал ходатайство ради метаюмора»',
					'Do': 'jump Judgment_Settle_Meta'
				}
			}
		}
	],

	'Judgment_Settle_Small': [
		'mc Я был неприятным. Сарказм. Высокомерие. Снобизм. Признаю.',
		'g И в обмен?',
		'mc Чистилище. С возможностью апелляции через год.',
		'g (думает) Принято. С двумя поправками: чистилище два года. И апелляция — только если у вас будет реальный новый аргумент.',
		'mc Договорились.',
		{
			'Function': {
				'Apply': function () {
					var s = this.storage ();
					this.storage ({
						judgment_verdict: 'settlement_small',
						acceptance_score: s.acceptance_score + 2
					});
				},
				'Revert': function () {}
			}
		},
		'jump Ending_Settlement_Small'
	],

	'Judgment_Settle_Large': [
		'mc Жестокость. Серёжа. Студентка-мусульманка. Комментарии под постами. Я признаю.',
		'g Это уже серьёзно.',
		'mc Поэтому я предлагаю — работу. В аду. Со специализацией: атеистам, которые попадут после меня.',
		'mc Стану санитаром. Профилактика жестокости через личный пример.',
		'g (молчит долго) ...',
		'g Зачтено. Особый вердикт: специалист по реабилитации новоприбывших.',
		{
			'Function': {
				'Apply': function () {
					var s = this.storage ();
					this.storage ({
						judgment_verdict: 'settlement_large',
						acceptance_score: s.acceptance_score + 3,
						empathy_shown: s.empathy_shown + 2
					});
				},
				'Revert': function () {}
			}
		},
		'jump Ending_Settlement_Large'
	],

	'Judgment_Settle_Meta': [
		'mc Признаю: я подал это ходатайство, потому что метаюмор — единственное, что я освоил безупречно за тридцать восемь лет.',
		'g ...',
		'g Странно. Это работает.',
		'mc Работает?',
		'g Самоосознание — основа смягчающих обстоятельств. Особенно в делах с ироничной смертью.',
		{
			'Function': {
				'Apply': function () {
					var s = this.storage ();
					this.storage ({
						judgment_verdict: 'meta_settlement',
						humor_used: s.humor_used + 2,
						matrix_suspicion: Math.min (10, s.matrix_suspicion + 2)
					});
				},
				'Revert': function () {}
			}
		},
		'jump Ending_Settlement_Meta'
	],

	// ==========================================
	// СУД: Объявить себя свидетелем
	// ==========================================
	'Judgment_Witness': [
		'mc Минуту. Я не обвиняемый. Я свидетель.',
		'g По какому делу?',
		'mc По делу о коллективной ответственности человечества за неверие.',
		'mc Я хочу свидетельствовать. О себе. Против себя. Но не в качестве обвиняемого. В качестве важного источника информации.',
		'g (хмурится) Это процессуальная экзотика.',
		'mc Я работал в IT. У нас экзотика — норма.',

		{
			'Function': {
				'Apply': function () {
					var s = this.storage ();
					this.storage ({
						argument_quality: s.argument_quality + 2,
						matrix_suspicion: Math.min (10, s.matrix_suspicion + 2)
					});
				},
				'Revert': function () {}
			}
		},

		'jump Ending_WitnessSelf'
	],

	// ==========================================
	// СУД: Просить «save точку»
	// ==========================================
	'Judgment_Savepoint': [
		'mc Минуту. У меня вопрос процессуального характера.',
		'g Слушаю.',
		'mc У меня есть право на сохранение состояния? До вынесения вердикта?',
		'g ...Сохранение состояния?',
		'mc Я хочу подождать. Подумать. Может, изменить позицию. Чтобы у меня была опция «revert» через сутки.',
		'g (молчит) Никто не просил такого за шесть тысяч лет.',
		'mc Я программист. У меня всегда есть git.',
		'g (вздыхает) ...Хорошо. Один savepoint. Сутки. После — окончательно.',

		{
			'Function': {
				'Apply': function () {
					var s = this.storage ();
					this.storage ({
						argument_quality: s.argument_quality + 2,
						matrix_suspicion: Math.min (10, s.matrix_suspicion + 3),
						humor_used: s.humor_used + 1
					});
				},
				'Revert': function () {}
			}
		},

		'jump Ending_Savepoint'
	],

	// ==========================================
	// СУД: Просить адвоката (платно)
	// ==========================================
	'Judgment_Lawyer': [
		'mc Конституционно: каждый имеет право на защиту.',
		'g Здесь нет конституции.',
		'mc Тогда я хочу её принять. Прецедентом.',
		'g (поднимает свет) ...Атеист требует конституции от Бога. Хорошо.',
		'g Кого ты выбираешь защитником?',
		'mc Защитник — это символ. Но мне нужен реальный.',

		{
			'Choice': {
				'Dialog': 'mc (Кого вызвать защитником?)',
				'father': {
					'Text': 'Моего отца',
					'Do': 'jump Judgment_Lawyer_Father'
				},
				'sergey': {
					'Text': 'Серёжу',
					'Do': 'jump Judgment_Lawyer_Sergey'
				},
				'reddit': {
					'Text': 'Архив моих лучших аргументов с Reddit',
					'Do': 'jump Judgment_Lawyer_Reddit'
				},
				'self': {
					'Text': 'Самого себя в 18 лет',
					'Do': 'jump Judgment_Lawyer_Self'
				}
			}
		}
	],

	'Judgment_Lawyer_Father': [
		'mc Я выбираю своего отца. Дмитрия Андреевича Волкова. Программиста. Атеиста. Умершего в 2003.',
		'g (молчит) ...Он не на службе.',
		'mc Он здесь. Где-то. Я знаю.',
		'g (молчит долго) ...Да.',
		'Появляется отец. Внезапно. Тот же, что в мастерской ада.',
		'father Алёш... ты меня вызвал?',
		'mc Защитником. По стандартам адвокатского самоуправления загробного мира.',
		'father (улыбается) Сын. Ты меня вызвал. Этого достаточно.',
		{
			'Function': {
				'Apply': function () {
					var s = this.storage ();
					this.storage ({
						empathy_shown: s.empathy_shown + 3,
						acceptance_score: s.acceptance_score + 3,
						father_resolved: true,
						judgment_verdict: 'father_defense'
					});
				},
				'Revert': function () {}
			}
		},
		'jump Ending_FatherDefense'
	],

	'Judgment_Lawyer_Sergey': [
		'mc Я хочу Серёжу. Друга, которого я обидел. Пусть защищает.',
		'g (хмурится) Он жив. Это нарушение протокола.',
		'mc Сделайте исключение. Один разговор. Десять минут.',
		'g (думает) ...Хорошо.',
		'Появляется Серёжа. Удивлённый. Спящий.',
		'sergey Алёш? ...мне снится, или ты умер?',
		'mc Я умер. И я тебя вызываю защитником.',
		'sergey (молчит, потом улыбается) ...Дурак.',
		'sergey Слушайте. Этот человек — Алёшка. Он, конечно, был мудаком в комментариях. Но он мне один раз помог переехать. А ещё он, когда у меня умер кот, два часа просидел молча. Просто рядом. Этого достаточно, чтобы я считал его другом.',
		'g (поражённо) ...Принято.',
		{
			'Function': {
				'Apply': function () {
					var s = this.storage ();
					this.storage ({
						empathy_shown: s.empathy_shown + 3,
						acceptance_score: s.acceptance_score + 2,
						judgment_verdict: 'sergey_defense'
					});
				},
				'Revert': function () {}
			}
		},
		'jump Ending_SergeyDefense'
	],

	'Judgment_Lawyer_Reddit': [
		'mc Защитник — мой собственный архив. r/DebateReligion. Все 12 437 комментариев.',
		'g (вздыхает) ...Это самый длинный документ, который я когда-либо рассматривал.',
		'Свет начинает мерцать. Reddit загружается в зале суда.',
		'mc Прокрутите до самого нижнего. До первого комментария, который я когда-либо написал. 2009 год. Мне было 23.',
		'centered «Я думаю, главное — не быть козлом. Что бы там ни было.»',
		'wait 1500',
		'g ...Это всё?',
		'mc Я это сам написал. Двадцать три года назад. И с тех пор всё отрицал, пока не дошёл до того, что забыл, что когда-то так считал.',
		{
			'Function': {
				'Apply': function () {
					var s = this.storage ();
					this.storage ({
						argument_quality: s.argument_quality + 2,
						matrix_suspicion: Math.min (10, s.matrix_suspicion + 2),
						judgment_verdict: 'reddit_defense'
					});
				},
				'Revert': function () {}
			}
		},
		'jump Ending_RedditDefense'
	],

	'Judgment_Lawyer_Self': [
		'mc Я хочу себя в 18 лет. Студента. До первого Reddit-аккаунта.',
		'g ...это сложно. У него нет права на загробную консультацию.',
		'mc Тогда покажите запись. Один день из его жизни.',
		'Свет проецирует запись. Алексей 18-летний. На лавочке. С девушкой, которая стала его первой и единственной. Через год она умерла от лейкоза. Об этом он не говорил никому.',
		'mc (Я. Восемнадцатилетний. Я ещё верил, что Аня выздоровеет. Я молился. Тихо. Никому не говорил.)',
		'g Ты молился?',
		'mc Один раз. Перед операцией. Не помогло.',
		'g Не помогло — но был.',
		{
			'Function': {
				'Apply': function () {
					var s = this.storage ();
					this.storage ({
						empathy_shown: s.empathy_shown + 3,
						acceptance_score: s.acceptance_score + 3,
						matrix_suspicion: Math.min (10, s.matrix_suspicion + 1),
						judgment_verdict: 'self_defense'
					});
				},
				'Revert': function () {}
			}
		},
		'jump Ending_PastSelfDefense'
	],

	// ==========================================
	// КОНЦОВКИ — раздел B (новые, из судебных хуков)
	// ==========================================

	'Ending_Settlement_Small': [
		'show scene judgment_throne with fadeIn',
		{ 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'settlement_small' }); }, 'Revert': function () {} } },
		'mc (Два года чистилища. С возможностью апелляции через год — если у меня будет реальный новый аргумент.)',
		'mc (Это, оказывается, лучше «ада-лайт». Я выторговал.)',
		'centered Алексей Волков. Подписал досудебное соглашение со Всемогущим. Срок: два года.',
		'wait 1000',
		'centered КОНЦОВКА: «ДОСУДЕБКА»',
		'centered Суд всегда лучше, если есть готовый адвокат внутри.',
		'wait 2000',
		'jump Ending_Credits'
	],

	'Ending_Settlement_Large': [
		'show scene hell_office with fadeIn',
		{ 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'settlement_large' }); }, 'Revert': function () {} } },
		'mc Я — санитар приёмного отделения ада. Бейджик: «помощь новоприбывшим атеистам». Тон голоса: профессиональный.',
		'mc Первый клиент — мой собственный одноклассник, Витя. Я даю ему салфетку. Сажусь рядом. Говорю — «всё будет нормально».',
		'mc (Это не утешение. Это эстафета. Я передаю — то, что не передали мне.)',
		'centered Алексей Волков. Санитар приёмного отделения ада.',
		'wait 1000',
		'centered КОНЦОВКА: «ПРОФИЛАКТИКА»',
		'centered Лучше работать в системе, чем спорить с ней. Особенно если работа — учить других не быть козлами.',
		'wait 2000',
		'jump Ending_Credits'
	],

	'Ending_Settlement_Meta': [
		'show scene judgment_throne with fadeIn',
		{ 'Function': { 'Apply': function () { screenGlitch (600); this.storage ({ ending_reached: 'settlement_meta' }); }, 'Revert': function () {} } },
		'g Ты впервые за шесть тысяч лет признался в метаюморе. Это редкий тип честности.',
		'mc И?',
		'g И — я тебя выпускаю. На испытательный. Сорок дней. Назад на Землю. С предупреждением.',
		'mc Предупреждение?',
		'g Если ещё раз попробуешь метаюмор как защитный механизм — обратно в ад. Со всеми котлами.',
		'mc (Это лучшая бизнес-модель для shareholder value я слышал.)',
		'centered Алексей Волков. Возвращён на Землю на испытательный срок.',
		'wait 1000',
		'centered КОНЦОВКА: «МЕТА-АППЕЛЛЯЦИЯ»',
		'centered Иногда честное «я зашёл слишком далеко» — лучшая защита.',
		'wait 2000',
		'jump Ending_Credits'
	],

	'Ending_WitnessSelf': [
		'show scene judgment_throne with fadeIn',
		{ 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'witness_self' }); }, 'Revert': function () {} } },
		'mc Я свидетельствую: я был часто прав. И часто — не добр. Это было сочетание, за которое я заплатил.',
		'g И что ты предлагаешь как свидетель?',
		'mc Я предлагаю изменить уголовное право посмертия. Различать «упорное неверие» и «неверие из любопытства». Это две разные вещи.',
		'g Ты пишешь мне законодательство.',
		'mc Кто-то должен.',
		'centered Алексей Волков. Свидетель против самого себя. Соавтор поправок в загробном УК.',
		'wait 1000',
		'centered КОНЦОВКА: «СВИДЕТЕЛЬ ПРОТИВ СЕБЯ»',
		'centered Самый честный аргумент — против собственной позиции.',
		'wait 2000',
		'jump Ending_Credits'
	],

	'Ending_Savepoint': [
		'show scene #000000 with fadeIn',
		{ 'Function': { 'Apply': function () { screenGlitch (800); this.storage ({ ending_reached: 'savepoint' }); }, 'Revert': function () {} } },
		'centered SAVING STATE...',
		'centered ...',
		'centered STATE SAVED.',
		'centered VOLKOV_A.SAVE — 47 МБ',
		'centered Загрузить через 24 часа? (Y/N)',
		'wait 2000',
		'mc (Я выторговал git. У Бога. Это самая программистская концовка из возможных.)',
		'centered Алексей Волков. Сохранил состояние перед Богом.',
		'wait 1000',
		'centered КОНЦОВКА: «git stash»',
		'centered Когда у тебя есть git — у тебя есть надежда. Даже в посмертии.',
		'wait 2000',
		'jump Ending_Credits'
	],

	'Ending_FatherDefense': [
		'show scene judgment_throne with fadeIn',
		{ 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'father_defense' }); }, 'Revert': function () {} } },
		'father Господи. Алёша. Это мой сын. Я не молился, но я его любил. И он это знал. Я думаю, он любил меня тоже. Я не успел спросить.',
		'g И ты, отец, готов поручиться?',
		'father Готов. Своей вечностью.',
		'g (молчит) ...',
		'g Принято. Алексей Волков отправляется в зону, где находится Дмитрий Андреевич.',
		'mc (С папой. Навсегда. Это рай.)',
		'centered Алексей Волков. Воссоединился с отцом через защиту в суде.',
		'wait 1000',
		'centered КОНЦОВКА: «ПОРУЧИТЕЛЬСТВО»',
		'centered Лучший защитник — тот, кто был с тобой раньше, чем ты успел стать собой.',
		'wait 2000',
		'jump Ending_Credits'
	],

	'Ending_SergeyDefense': [
		'show scene judgment_throne with fadeIn',
		{ 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'sergey_defense' }); }, 'Revert': function () {} } },
		'g Свидетельство принято. Решение: возврат на Землю. Срок: один земной год. С единственным условием.',
		'mc Условие?',
		'g Помириться с Сергеем. Лично. До истечения срока.',
		'mc (Один год. Один разговор. Один шанс.)',
		'centered Алексей Волков. Возвращён на Землю. Год на исправление.',
		'wait 1000',
		'centered КОНЦОВКА: «ГОД НА СЕРЁЖУ»',
		'centered Дружбу можно починить. Бог иногда даёт второй коммит.',
		'wait 2000',
		'jump Ending_Credits'
	],

	'Ending_RedditDefense': [
		'show scene judgment_throne with fadeIn',
		{ 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'reddit_defense' }); }, 'Revert': function () {} } },
		'g 12 437 комментариев. И первый — самый честный.',
		'mc Я писал его, ещё не зная, что буду опровергать его 12 436 раз.',
		'g Я тебя отправляю в архив r/DebateReligion. Ты там будешь модератором.',
		'mc Модератором? В аду?',
		'g Это рай. Просто очень специфический.',
		'centered Алексей Волков. Модератор r/DebateReligion в загробном subreddit.',
		'wait 1000',
		'centered КОНЦОВКА: «MOD POWERS ACTIVATE»',
		'centered Лучшая загробная награда — банить тех, кто тебя бесил при жизни.',
		'wait 2000',
		'jump Ending_Credits'
	],

	'Ending_PastSelfDefense': [
		'show scene judgment_throne with fadeIn',
		{ 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'past_self_defense' }); }, 'Revert': function () {} } },
		'g Молитва за Аню была услышана.',
		'mc Тогда почему она умерла?',
		'g Услышана — не значит исполнена. Я не врач.',
		'g Но я записал твою молитву. И зачёл её. Как первую и единственную честную молитву в твоей жизни.',
		'mc И что это значит?',
		'g Это значит — у тебя есть лимит «одна услышанная молитва». Используй сейчас.',
		'mc (...)',
		'mc Тогда — Серёжа. Пусть у него получится с книгой. Той, которую он пишет десять лет. Пусть издадут.',
		'g Записано. Зачтено.',
		{
			'Function': {
				'Apply': function () {
					var s = this.storage ();
					this.storage ({ empathy_shown: s.empathy_shown + 3 });
				},
				'Revert': function () {}
			}
		},
		'centered Алексей Волков. Использовал последнюю услышанную молитву — на друга.',
		'wait 1000',
		'centered КОНЦОВКА: «ПОЗДНЯЯ МОЛИТВА»',
		'centered Иногда одна услышанная молитва — это и есть прощение.',
		'wait 2000',
		'jump Ending_Credits'
	],

	// ==========================================
	// МИКРОКОНЦОВКИ — быстрые шуточные финалы
	// ==========================================

	'Ending_Teapot': [
		'show scene judgment_throne with fadeIn',
		{ 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'teapot' }); }, 'Revert': function () {} } },
		'g HTTP 418.',
		'mc Простите?',
		'g Я — чайник. I am a teapot. Я не могу обработать вашу заявку, потому что я чайник.',
		'mc Это RFC 2324. Это шутка из 1998-го.',
		'g Я и есть шутка из 1998-го.',
		'centered Алексей Волков. Узнал, что вселенная — RFC 2324.',
		'wait 1000',
		'centered КОНЦОВКА: «I\'M A TEAPOT»',
		'centered Иногда вселенная — это просто хорошо документированный 418.',
		'wait 2000',
		'jump Ending_Credits'
	],

	'Ending_404': [
		'show scene #000000 with fadeIn',
		{ 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'soul_not_found' }); }, 'Revert': function () {} } },
		'centered HTTP 404',
		'centered Soul Not Found',
		'centered ',
		'centered The soul you are looking for might have been deleted, moved, or never existed.',
		'wait 2000',
		'centered Try again later.',
		'wait 2000',
		'centered Алексей Волков. Душа не найдена в системе. Никогда.',
		'wait 1000',
		'centered КОНЦОВКА: «404»',
		'centered Лучший способ выйти из ада — не существовать.',
		'wait 2000',
		'jump Ending_Credits'
	],

	'Ending_StackOverflow': [
		'show scene hell_debate_room with fadeIn',
		{ 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'stack_overflow' }); }, 'Revert': function () {} } },
		'mc Я задаю вопросы. Богу. Один за другим. Один за другим. Слишком быстро.',
		'mc Почему это место бюрократическое? Почему мама молилась? Почему я тут? Почему ад? Почему рай? Почему вообще?',
		'g (стек вызовов растёт) ...',
		'centered RECURSION DETECTED. STACK OVERFLOW.',
		'centered Алексей Волков. Закрашил Бога вопросами.',
		'wait 1000',
		'centered КОНЦОВКА: «STACK OVERFLOW»',
		'centered Если задать достаточно вопросов — даже Всемогущий получит segmentation fault.',
		'wait 2000',
		'jump Ending_Credits'
	],

	'Ending_KernelPanic': [
		'show scene #000000 with fadeIn',
		{ 'Function': { 'Apply': function () { screenGlitch (2500); this.storage ({ ending_reached: 'kernel_panic' }); }, 'Revert': function () {} } },
		'centered KERNEL PANIC: not syncing.',
		'centered Caused by: argument quality > 100, wtf_level > 100, simultaneous denial and matrix_suspicion overflow.',
		'wait 2000',
		'centered CPU: god@universe.local',
		'centered Process: hell_simulation.run',
		'centered Status: dead',
		'wait 2000',
		'centered Please reboot the universe.',
		'centered ',
		'centered (Press CTRL+Heaven+Hell to restart)',
		'wait 2000',
		'centered Алексей Волков. Сломал ядро системы.',
		'wait 1000',
		'centered КОНЦОВКА: «KERNEL PANIC»',
		'centered Лучшая баг-репорт — тот, который убивает систему.',
		'wait 2000',
		'jump Ending_Credits'
	],

	'Ending_GoldenRule': [
		'show scene judgment_throne with fadeIn',
		{ 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'golden_rule' }); }, 'Revert': function () {} } },
		'mc Простите. Меня всю жизнь учили золотому правилу: «поступай с другими так, как хочешь, чтобы поступали с тобой».',
		'mc Если применить это к Богу: я хотел бы, чтобы Бог поступал со мной как с собой.',
		'mc Значит — Богу тоже должно быть позволено сомневаться. Время от времени. В своей правоте.',
		'g (молчит долго) ...',
		'g Ты только что предложил Богу право на сомнение.',
		'mc Да.',
		'g (вздыхает) Ладно. Я согласен. Иди.',
		'mc Куда?',
		'g Куда хочешь. У меня сегодня день сомнения. Я не буду никого судить.',
		'centered Алексей Волков. Дал Богу право на сомнение.',
		'wait 1000',
		'centered КОНЦОВКА: «GOLDEN RULE»',
		'centered Лучшая теологическая аргументация — против всемогущества.',
		'wait 2000',
		'jump Ending_Credits'
	],

	'Ending_OutOfMemory': [
		'show scene hell_corridor with fadeIn',
		{ 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'out_of_memory' }); }, 'Revert': function () {} } },
		'mc Я хочу запомнить всё. Каждое лицо. Каждую дверь. Каждую форму 66-А.',
		'Алексей берёт листок. Записывает. Берёт другой. Ещё. Ещё.',
		'mc (Память — единственное, что у меня есть. И единственное, что я могу контролировать.)',
		'Двадцать тысяч страниц. Тридцать тысяч. Сорок.',
		'mc (Память не безгранична. Даже здесь.)',
		'centered OUT OF MEMORY EXCEPTION at Volkov_A.soul',
		'wait 2000',
		'centered Алексей Волков. Перегрузил душу попыткой запомнить всё.',
		'wait 1000',
		'centered КОНЦОВКА: «OOM»',
		'centered Иногда забывать — это форма выживания.',
		'wait 2000',
		'jump Ending_Credits'
	],

	'Ending_GitBlame': [
		'show scene hell_server_room with fadeIn',
		{ 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'git_blame' }); }, 'Revert': function () {} } },
		'mc Виктор. Запусти git blame. На вселенную.',
		'viktor На... всю?',
		'mc Да.',
		'centered $ git blame universe.bin --line-by-line',
		'centered ...',
		'centered Line 1: yhwh@trinity.heaven (3500 B.C.) — Initial commit',
		'centered Line 666: lucifer@hell.fallen (1054 A.D.) — Major refactor',
		'centered Line 7394028417: god@trinity.heaven (2024-05-21) — Volkov_A added to hell',
		'wait 2500',
		'mc Я знал. Я знал. Прямой коммит. Авторизованный.',
		'viktor Что теперь?',
		'mc Я опубликую blame. На GitHub. Через тебя. Пусть все увидят.',
		'centered Алексей Волков. Опубликовал git blame вселенной.',
		'wait 1000',
		'centered КОНЦОВКА: «GIT BLAME»',
		'centered Прозрачность — единственное оружие против всемогущества.',
		'wait 2000',
		'jump Ending_Credits'
	],

	// ==========================================
	// HOOKS — переходы из существующих меток
	// ==========================================

	// Хук для Prologue_Morning_Route_Choice
	'Prologue_Sidehook_Window': [ 'jump Prologue_Window' ],
	'Prologue_Sidehook_Mirror': [ 'jump Prologue_Mirror' ],
	'Prologue_Sidehook_Neighbor': [ 'jump Prologue_Neighbor' ]

});

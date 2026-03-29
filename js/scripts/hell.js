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

		// 'play music hell_drone with loop fade 3',
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
		// 'play music hell_bureaucracy with loop fade 2',

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

		'demon Так, заполните форму 66-А. «Признание факта существования загробной жизни».',

		{
			'Choice': {
				'Dialog': 'mc (Заполнять эту чушь?)',
				'fill': {
					'Text': 'Заполнить форму',
					'Do': 'jump Hell_Form_Fill',
					'onChosen': function () {
						const s = this.storage ();
						this.storage ({
							acceptance_score: s.acceptance_score + 1
						});
					}
				},
				'refuse': {
					'Text': 'Отказаться',
					'Do': 'jump Hell_Form_Refuse',
					'onChosen': function () {
						const s = this.storage ();
						this.storage ({
							rebellion_score: s.rebellion_score + 1,
							wtf_level: Math.min (100, s.wtf_level + 5)
						});
					}
				},
				'joke': {
					'Text': '«А можно форму на апелляцию?»',
					'Do': 'jump Hell_Form_Appeal',
					'onChosen': function () {
						const s = this.storage ();
						this.storage ({
							humor_used: s.humor_used + 1,
							argument_quality: s.argument_quality + 1
						});
					}
				}
			}
		}
	],

	'Hell_Bureaucracy_Other': [
		'show scene hell_office with fadeIn',
		// 'stop sound fire_crackle with fade 1',
		// 'play music hell_bureaucracy with loop fade 2',

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
				'second': 'jump Hell_Debate_Round_2',
				'breakdown': 'jump Hell_Breakdown'
			}
		}
	],

	'Hell_Debate_Round_1': [
		'show scene hell_debate_room with fadeIn',
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
					'Do': 'jump Hell_Debate_Loop',
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
					'Do': 'jump Hell_Debate_Loop',
					'onChosen': function () {
						const s = this.storage ();
						this.storage ({
							acceptance_score: s.acceptance_score + 1
						});
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

		// 'stop music hell_drone with fade 2',
		// 'stop music hell_bureaucracy with fade 2',

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

		{
			'Choice': {
				'Dialog': 'mc (Что делать?)',
				'submit': {
					'Text': 'Сдаться. Признать. Поверить.',
					'Do': 'jump Hell_Submit',
					'onChosen': function () {
						const s = this.storage ();
						this.storage ({
							acceptance_score: s.acceptance_score + 5
						});
					}
				},
				'rebel': {
					'Text': 'Нет. Если это ад — пора менять правила.',
					'Do': 'jump Hell_Rebellion',
					'onChosen': function () {
						const s = this.storage ();
						this.storage ({
							rebellion_score: s.rebellion_score + 5
						});
					}
				},
				'bar': {
					'Text': '...А если нельзя выиграть — можно хотя бы выпить?',
					'Do': 'jump Hell_Bar_Idea',
					'onChosen': function () {
						const s = this.storage ();
						this.storage ({
							humor_used: s.humor_used + 1,
							found_bar_location: true
						});
					}
				}
			}
		}
	],

	// ==========================================
	// АД: Путь подчинения → Концовка «Верующий»
	// ==========================================
	'Hell_Submit': [
		'mc ...Ладно.',
		'mc Ладно. Вы победили. ОН победил.',
		'mc Я... верю.',

		'Слова выходят тяжело. Как камни.',

		'mc Я верю, что это реально. Что Бог существует. Что я был неправ.',
		'mc 38 лет я считал себя умнее всех. И вот я — в аду. Доказывая то, что опровергнуто самим моим местоположением.',

		'Тишина.',
		'А потом — голос. Тот самый.',

		'g Ты не веришь, Алексей.',
		'g Ты просто устал.',
		'g Но это — начало.',

		'jump Ending_Believer'
	],

	// ==========================================
	// АД: Путь бунта → Концовка «Революция»
	// ==========================================
	'Hell_Rebellion': [
		'show character mc angry at center',

		'mc Нет.',
		'mc НЕТ.',
		'mc Я не буду сдаваться. Не перед богом, не перед демонами, не перед абсурдной бюрократией загробного мира.',

		'mc Если это ад — значит, ад можно ИЗМЕНИТЬ.',
		'mc Я программист. Я решаю проблемы. Это просто... очень большой баг.',

		'Алексей встаёт. Впервые за... долгое время.',

		'mc Демоны устали. Души сломлены. Система работает на инерции.',
		'mc Знаете, что разрушает любую систему? Люди, которые отказываются играть по правилам.',

		'mc Мне нужны союзники.',

		'jump Hell_Rebellion_Recruit'
	],

	'Hell_Rebellion_Recruit': [
		'show scene hell_cauldrons with fadeIn',
		'show character mc angry at center',
		// 'play music hell_drone with loop fade 2',

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

	// ==========================================
	// АД: Путь бара → Концовка «Бар»
	// ==========================================
	'Hell_Bar_Idea': [
		'mc (А если нельзя выиграть — можно хотя бы выпить?)',

		'Странная мысль. Но... почему нет?',
		'Ад — это место. Место можно обустроить. Даже плохое место.',

		'mc (В аду есть бюрократия. Значит, есть и лазейки.)',
		'mc (А где лазейки — там бизнес.)',

		'Алексей поднимается. Усмехается.',

		'mc Где-то в этом аду есть место, которое никто не использует.',
		'mc Потому что оно бесполезно. Потому что там нечего мучить.',
		'mc И именно там я открою бар.',

		'jump Hell_Bar_Search'
	],

	'Hell_Bar_Search': [
		'show scene hell_cauldrons with fadeIn',
		'show character mc smirk at center',
		// 'play music hell_drone with loop fade 2',

		'Алексей ищет. Шатается по аду, как турист по незнакомому городу.',
		'Мимо котлов (кивок соседям-политикам), мимо зоны дебатов, мимо бесконечного кроссфита...',

		'И находит.',
		'Пустое помещение. Бывший склад адского инвентаря, судя по ржавым вилам в углу.',
		'Никому не нужное, забытое, неприметное.',

		'mc Идеально.',

		'Дальше — дело техники. И связей.',
		'Борис (бывший военный) добывает мебель — оказывается, в аду есть свалка ненужных вещей.',
		'Ли (философ) находит рецепт напитка из адской серы, который «почти не отвратителен».',

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
	]
});

/* global monogatari */

// ==========================================
// Chapter: СТРАШНЫЙ СУД
// Scenes: hall → queue → throne
// Stats affected: argument_quality, humor_used, empathy_shown, cruelty_score, wtf_level, matrix_suspicion
// Key checks: humor_used >= 3 && argument_quality >= 4 → Loophole early exit
// Branches: 4 audience responses → Review → Verdict → Hell or early endings
// ==========================================

monogatari.script ({

	// ==========================================
	// СТРАШНЫЙ СУД: Прибытие
	// ==========================================
	'Judgment_Arrival': [
		'show scene judgment_hall with fadeIn',
		'show character mc shock at center',

		'Зал. Нет — Зал с большой буквы.',
		'Потолок — если он есть — теряется где-то в облаках. Буквально в облаках.',
		'Колонны из белого камня, испещрённые символами всех религий мира.',
		'Ангелы. Настоящие, мать их, ангелы. С крыльями. С мечами. С выражением лица уставших охранников в «Ашане».',

		// 'play sound crowd_murmur with loop',

		'mc (Так. Спокойно. Это DMT. Или кома. Или очень, очень хороший VR.)',
		'mc (Кто-то подключил мне VR-шлем в реанимации. Точно. Это объясняет всё.)',

		{
			'Choice': {
				'Dialog': 'mc (Ладно, допустим. Что делать?)',
				'vr': {
					'Text': '«Эй! Снимите с меня этот VR-шлем!»',
					'Do': 'jump Judgment_VR_Denial',
					'onChosen': function () {
						const s = this.storage ();
						this.storage ({
							wtf_level: Math.min (100, s.wtf_level + 15),
							denial_count: s.denial_count + 1,
							judgment_tried_vr: true
						});
					}
				},
				'queue': {
					'Text': 'Молча встать в очередь',
					'Do': 'jump Judgment_Queue',
					'onChosen': function () {
						const s = this.storage ();
						this.storage ({
							acceptance_score: s.acceptance_score + 1
						});
					}
				},
				'panic': {
					'Text': '(Паника)',
					'Do': 'jump Judgment_Panic',
					'onChosen': function () {
						const s = this.storage ();
						this.storage ({
							wtf_level: Math.min (100, s.wtf_level + 5)
						});
					}
				}
			}
		}
	],

	// --- VR-отрицание ---
	'Judgment_VR_Denial': [
		'show character mc angry at center',
		'mc ЭЙ! Кто тут главный?! Это незаконный эксперимент! У меня права!',

		'mc (Окей, Алексей, думай. VR-шлем? Нет, я помню смерть. Нейростимуляция? Кто-то подключил электроды к трупу?)',
		'mc (Или... DMT. Диметилтриптамин. Мозг вырабатывает его при смерти. Это галлюцинация. Красивая, детальная галлюцинация.)',
		'mc (Тогда почему она такая СКУЧНАЯ? Очередь? Талон? Мой предсмертный бред — это бюрократия?!)',

		'Никто не обращает внимания. Очередь движется. Ангел-охранник косится.',

		'show character angel bored at right with fadeIn',
		'angel Ещё один.',
		'angel Сэр, встаньте в очередь. Номер 7 394 028 417.',
		'mc Какой, к чёрту, номер?! Я требую адвоката!',
		'angel Адвокатов здесь нет. Есть Защитник, но он занят. Встаньте в очередь.',

		{
			'Function': {
				'Apply': function () {
					applyWtfEffects (this.storage ().wtf_level);
				},
				'Revert': function () {}
			}
		},

		'hide character angel with fadeOut',
		'jump Judgment_Queue'
	],

	// --- Паника ---
	'Judgment_Panic': [
		'show character mc shock at center',

		{
			'Function': {
				'Apply': function () {
					screenShake (400);
					panicText (true);
				},
				'Revert': function () {
					panicText (false);
				}
			}
		},

		'mc (Нет нет нет нет нет нет нет)',
		'mc (Я умер. Я УМЕР. И это... это...)',
		'mc (ЭТОГО НЕ МОЖЕТ БЫТЬ.)',
		'mc (Я читал все исследования. Я знаю, как работает мозг. Сознание — продукт нейронов. Нейроны мертвы. Значит, сознания нет.)',
		'mc (Но я ДУМАЮ. Я думаю о том, что не могу думать. Это парадокс. Парадоксы не существуют в реальности.)',
		'mc (Значит, это не реальность. Это... что? Что это?!)',
		'mc (Я учёный. Я должен наблюдать. Фиксировать. Но у меня нет рук, чтобы записать. Нет глаз — и я вижу. Нет ушей — и я слышу.)',
		'mc (Каждый мой инструмент познания был физическим. И все они сгнили. Чем я сейчас познаю?)',

		{
			'Function': {
				'Apply': function () {
					panicText (false);
				},
				'Revert': function () {}
			}
		},

		'Кто-то трогает Алексея за плечо. Полупрозрачная рука.',

		'show character soul sad at left with fadeIn',
		'soul Эй, приятель. Дыши. Ну, как бы... по привычке.',
		'soul Я тоже так реагировал. Все так реагируют.',
		'mc Кто... кто вы?',
		'soul Борис. Инфаркт. Вторник. А ты?',
		{
			'Conditional': {
				'Condition': function () { return this.storage ().death_type; },
				'heart_attack': 'mc ...Алексей. Тоже... инфаркт. Кажется.',
				'car_accident': 'mc ...Алексей. Меня машина сбила. На пробежке.',
				'overwork': 'mc ...Алексей. Инфаркт. На работе. За компьютером.'
			}
		},
		'soul Ну, добро пожаловать в очередь.',
		'hide character soul with fadeOut',

		'jump Judgment_Queue'
	],

	// ==========================================
	// СТРАШНЫЙ СУД: Очередь
	// ==========================================
	'Judgment_Queue': [
		'show scene judgment_queue with fadeIn',
		'show character mc normal at center',

		'Очередь движется. Быстрее, чем в любом учреждении на Земле. Подозрительно быстро.',
		'Каждые 40 секунд — одна душа. Алексей считал. Ровно 40. Каждый раз.',
		'mc (40 секунд. Как тактовая частота процессора. Как refresh rate. Это...)',

		'Вокруг — души. Разные эпохи, культуры.',
		'Мужчина в тоге повторяет одну и ту же фразу соседу. Дважды. Слово в слово.',
		'mc (Он только что сказал то же самое. Точно так же. С той же интонацией.)',

		'Чуть впереди — парень в пионерской форме. Красный галстук, шорты. Растерянный.',
		'mc (Пионер? Сейчас? Это из какого года?)',
		'Парень бормочет: «Я просто ехал в автобусе... Зима была... А потом — лето, лагерь... А потом — это...»',
		'mc (Бедняга. Автобус, лагерь, загробная жизнь. Интересный маршрут.)',

		'show character panchin shocked at left with fadeIn',
		'Рядом — высокий мужчина в очках, с рюкзаком. На футболке — ДНК. Нервно протирает очки.',
		'panchin Вы тоже?! Вы тоже атеист?!',
		'mc ...Да.',
		'panchin Это невозможно! Я писал книги! Объяснял когнитивные искажения! Десятки лекций прочитал про то, что это всё нейробиология!',
		'panchin И вот я тут. ЗДЕСЬ. В очереди на СТРАШНЫЙ СУД.',
		'mc (Популяризатор науки? Тут? Если даже ОН попал сюда...)',
		'panchin Знаете, что самое обидное? Я знал, что confirmation bias существует. И всё равно не допускал, что ошибаюсь.',
		'mc Мы все не допускали.',
		'hide character panchin with fadeOut',

		'К очереди подлетает молодой ангел с планшетом. Крылья ещё слишком белые, взгляд — слишком живой.',
		'show character intern nervous at right with fadeIn',
		'intern Волков Алексей Дмитриевич? Подтвердите, пожалуйста, что вы осознаёте факт смерти.',
		'mc Нет.',
		'intern Понял. Ставлю «частично».',
		'mc Почему частично?',
		'intern Вы спорите. Значит, процесс признания уже начался.',
		'mc (Даже небесные стажёры работают по agile.)',
		'hide character intern with fadeOut',

		'show character soul resigned at left with fadeIn',
		'soul2 Простите, вы крайний?',
		'mc Видимо, да.',
		'soul2 А вы... за какое?',
		'mc В смысле?',
		'soul2 Ну, вы знали, куда попадёте? Я — буддист. Думал, будет реинкарнация...',
		'soul2 А тут — ЭТО. Какой-то христианский ЗАГС.',

		'mc (Буддист в христианском раю?! Это... это...)',
		'mc (Подождите. Если христианская версия — правильная, почему тут буддисты?)',
		'mc (Это как будто кто-то взял ВСЕ религии и смешал в один сеттинг...)',
		'mc (Как в плохо написанной игре. Или... нет, бред.)',

		{
			'Function': {
				'Apply': function () {
					this.storage ({ matrix_suspicion: this.storage ().matrix_suspicion + 1 });
				},
				'Revert': function () {
					this.storage ({ matrix_suspicion: this.storage ().matrix_suspicion - 1 });
				}
			}
		},

		{
			'Choice': {
				'Dialog': 'mc (Что ответить?)',
				'atheist_proud': {
					'Text': '«Я атеист. Я вообще не должен тут быть.»',
					'Do': 'jump Judgment_Queue_Atheist',
					'onChosen': function () {
						const s = this.storage ();
						this.storage ({
							denial_count: s.denial_count + 1,
							wtf_level: Math.min (100, s.wtf_level + 5)
						});
					}
				},
				'sympathy': {
					'Text': '«Сочувствую. Я тоже не ожидал.»',
					'Do': 'jump Judgment_Queue_Sympathy',
					'onChosen': function () {
						const s = this.storage ();
						this.storage ({
							empathy_shown: s.empathy_shown + 1
						});
					}
				},
				'humor': {
					'Text': '«А скидки за групповой визит есть?»',
					'Do': 'jump Judgment_Queue_Humor',
					'onChosen': function () {
						const s = this.storage ();
						this.storage ({
							humor_used: s.humor_used + 1
						});
					}
				},
				'notice_silhouette': {
					'Text': 'Заметить знакомый силуэт в толпе',
					'Do': 'jump Judgment_Queue_Silhouette',
					'Condition': function () { return this.storage ().inna_met; },
					'onChosen': function () {
						this.storage ({
							lilith_interest: this.storage ().lilith_interest + 1,
							seen_inna_parallels: true
						});
					}
				}
			}
		}
	],

	// --- Ветка: гордый атеист ---
	'Judgment_Queue_Atheist': [
		'mc Я атеист. Я вообще не должен тут быть. По определению.',
		'soul2 ...Атеист?',

		'Пауза. Буддист смотрит с искренним состраданием.',

		'soul2 О, бедняга.',
		'mc Почему «бедняга»?!',
		'soul2 Ну... для нас это просто неправильная религия. А для тебя — вообще отрицание всего этого.',
		'soul2 Тебе тяжелее всех будет.',

		'mc (Утешил, спасибо.)',
		'hide character soul with fadeOut',

		'jump Judgment_Audience'
	],

	// --- Ветка: сочувствие ---
	'Judgment_Queue_Sympathy': [
		'mc Сочувствую. Я тоже не это ожидал.',
		'soul2 А вы какой религии?',
		'mc Никакой. Атеист.',

		'Буддист моргает.',

		'soul2 ...И вы так спокойны?',
		'mc Внутри я ору. Но снаружи стараюсь держать лицо.',
		'soul2 Респект.',

		'Они стоят в тишине. Странно, но это помогает.',
		'hide character soul with fadeOut',

		'jump Judgment_Audience'
	],

	// --- Ветка: юмор ---
	'Judgment_Queue_Humor': [
		'mc А скидки за групповой визит есть? Или хотя бы программа лояльности?',

		'Буддист фыркает. Потом начинает смеяться. Потом — несколько душ рядом.',

		'soul2 Вы... вы серьёзно?',
		'mc Абсолютно. Если это и правда загробная жизнь, я хочу знать условия обслуживания.',

		'Смех. Впервые за... ну, за всю посмертную жизнь.',
		'hide character soul with fadeOut',

		'jump Judgment_Audience'
	],

	'Judgment_Queue_Silhouette': [
		'В толпе — знакомая фигура. Высокая, тёмные волосы, каблуки.',
		'mc (Инна?!)',
		'Алексей пробирается сквозь очередь. Но силуэт растворяется за колонной.',
		'mc (Нет. Показалось. У меня нет мозга — какие могут быть галлюцинации?)',
		'mc (Хотя... если это место существует, то и галлюцинации, видимо, тоже.)',
		{
			'Conditional': {
				'Condition': function () { return this.storage ().death_type === 'overwork' ? 'sms' : 'brief'; },
				'sms': 'mc (Или она тоже умерла? Нет. Она была жива. Она писала мне в одиннадцать вечера.)',
				'brief': 'mc (Или она тоже умерла? Нет. Я видел её сегодня живой. Слишком живой для этого места.)'
			}
		},
		'mc (...Почему меня это так зацепило?)',

		'hide character soul with fadeOut',

		'jump Judgment_Audience'
	],

	// ==========================================
	// СТРАШНЫЙ СУД: Аудиенция
	// ==========================================
	'Judgment_Audience': [
		'show scene judgment_throne with fadeIn',
		'stop music choir_ethereal with fade 1',
		'play music judgment_tension with loop fade 2',

		'show character mc shock at center',

		'Алексей стоит перед чем-то, для чего нет ни слова, ни мысли.',
		'Не свет. Не существо. Не место. Присутствие, которое заполняет всё.',
		'И это присутствие — знает его. Лучше, чем он знает себя.',

		{
			'Function': {
				'Apply': function () {
					screenShake (500);
					divineGlow (true);
				},
				'Revert': function () { divineGlow (false); }
			}
		},

		'g Алексей Дмитриевич Волков.',
		'g 38 лет. Программист. Москва.',
		'g Атеист.',

		{
			'Conditional': {
				'Condition': function () { return this.storage ().death_type; },
				'heart_attack': 'g Инфаркт на Тверской. Банально.',
				'car_accident': 'g Перебежал дорогу на красный. Под подкаст про свободу воли. Я оценил иронию.',
				'overwork': 'g Умер за рабочим столом. Лицом в клавиатуру. Последнее слово — пробел.'
			}
		},

		'mc (Этот голос... он не звучит. Он ВОЗНИКАЕТ. Сразу в голове, минуя уши.)',
		'mc (Это не акустика. Это прямая запись в память. Bypass всех сенсоров.)',
		'mc (Либо я стою перед чем-то, что имеет прямой доступ к моему сознанию...)',
		'mc (Либо я и ЕСТЬ чьё-то сознание. Подпрограмма. Функция, которой передали аргументы.)',

		'g Мы знакомы, хотя ты считал иначе.',
		'g Я читал все твои посты на Reddit.',

		'mc ......',
		'mc (Reddit? Серьёзно?)',
		'mc (Всеведущее существо — и ему интересен мой r/DebateReligion?)',
		'mc (Или кто-то загрузил мой профиль в базу данных. Как датасет.)',
		'mc (Стоп. Если это существо знает мой Reddit, оно знает ВСЕ мои аргументы. Каждый пост. Каждый комментарий.)',
		'mc (Я 15 лет оттачивал аргументы против него. И теперь стою перед ним. С теми же аргументами.)',
		'mc (Это как прийти на собеседование, где интервьюер прочитал все твои твиты.)',

		{
			'Function': {
				'Apply': function () {
					this.storage ({ matrix_suspicion: this.storage ().matrix_suspicion + 1 });
				},
				'Revert': function () {
					this.storage ({ matrix_suspicion: this.storage ().matrix_suspicion - 1 });
				}
			}
		},

		{
			'Choice': {
				'Dialog': 'g Что скажешь в своё оправдание?',
				'argue_stats': {
					'Text': '«По статистике, вы не можете всех отправить в ад!»',
					'Do': 'jump Judgment_Stats_Argument',
					'onChosen': function () {
						const s = this.storage ();
						this.storage ({
							judgment_argued_stats: true,
							argument_quality: s.argument_quality + 2,
							wtf_level: Math.min (100, s.wtf_level + 10)
						});
					}
				},
				'deny_reality': {
					'Text': '«Это невозможно. Вас не существует.»',
					'Do': 'jump Judgment_Deny',
					'onChosen': function () {
						const s = this.storage ();
						this.storage ({
							denial_count: s.denial_count + 1,
							wtf_level: Math.min (100, s.wtf_level + 15)
						});
					}
				},
				'beg': {
					'Text': '«Я... простите. Я не знал.»',
					'Do': 'jump Judgment_Beg',
					'onChosen': function () {
						const s = this.storage ();
						this.storage ({
							judgment_begged: true,
							acceptance_score: s.acceptance_score + 2
						});
					}
				},
				'sarcasm': {
					'Text': '«Неплохой спецэффект. Мейджор студия?»',
					'Do': 'jump Judgment_Sarcasm',
					'onChosen': function () {
						const s = this.storage ();
						this.storage ({
							humor_used: s.humor_used + 1,
							wtf_level: Math.min (100, s.wtf_level + 5)
						});
					}
				}
			}
		}
	],

	// --- Аргумент статистикой ---
	'Judgment_Stats_Argument': [
		'show character mc angry at center',
		'mc Секунду! По данным исследования Pew Research, более миллиарда людей — неверующие!',
		'mc Вы не можете отправить миллиард людей в ад! Это... это геноцид!',

		'Пауза. Свет слегка мерцает. Это что — усмешка?',

		'g Ты пришёл спорить с БОГОМ с помощью Pew Research?',
		'g ...Мне нравится твоя дерзость.',
		'g Но нет. Статистика здесь не аргумент.',
		'g Впрочем, аргумент зачтён. За храбрость.',

		'mc (Он... зачёл мой аргумент?!)',
		'jump Judgment_Review'
	],

	// --- Отрицание реальности ---
	'Judgment_Deny': [
		'show character mc angry at center',
		'mc Вас. Не. Существует.',
		'mc Я стоял на этой позиции 38 лет и я не собираюсь менять её из-за какого-то светового шоу!',

		{
			'Function': {
				'Apply': function () {
					screenGlitch (600);
					applyWtfEffects (this.storage ().wtf_level);
				},
				'Revert': function () {}
			}
		},

		'Свет становится ярче. НАМНОГО ярче. Алексея как будто прижимают к стене несуществующей силой.',

		'g Ты отрицаешь Меня.',
		'g Стоя ПЕРЕДО МНОЙ.',
		'g ...',
		'g Я видел многое. Но такое упрямство — редкость.',

		'mc (Мне больно. Почему мне больно?! У меня нет тела!)',

		'g Зачтено. Как отягчающее.',
		'jump Judgment_Review'
	],

	// --- Мольба ---
	'Judgment_Beg': [
		'show character mc despair at center',
		'mc Я... простите.',
		'mc Я не знал. Я думал... наука... доказательства...',
		'mc Если бы были явные доказательства, я бы...',

		'g Ты бы что? Поверил?',

		'mc ...Я бы рассмотрел гипотезу.',

		'g Хм.',
		'g Честно. Это больше, чем многие.',
		'g Зачтено. Как смягчающее.',

		'jump Judgment_Review'
	],

	// --- Сарказм ---
	'Judgment_Sarcasm': [
		'show character mc smirk at center',
		'mc Серьёзно, кто делал эти спецэффекты? Industrial Light & Magic? Я впечатлён.',
		'mc Свет, голос Джеймса Эрла Джонса, колонны до неба... Бюджет явно не из десятины.',

		'Тишина. Потом...',

		'g Ха.',

		'mc (Бог... засмеялся?)',

		'g Ты смешной, Алексей. Мне будет жаль.',
		'g Зачтено. Как... ну, просто зачтено.',

		'jump Judgment_Review'
	],

	// ==========================================
	// СТРАШНЫЙ СУД: Обзор жизни
	// ==========================================
	'Judgment_Review': [
		'show scene judgment_review with fadeIn',
		'show character mc shock at center',

		'Пространство вокруг Алексея начинает меняться. Появляются образы.',
		'Его жизнь. Каждый момент. Каждое слово.',

		'mc (Нет... не надо...)',

		{
			'Conditional': {
				'Condition': function () { return this.storage ().death_type; },
				'heart_attack': 'Вот он выходит из офиса. Думает: «надо бы начать бегать». Не начал.',
				'car_accident': 'Вот он бежит на красный свет. Наушники в ушах. Рационалист, который не рассчитал массу автомобиля.',
				'overwork': 'Вот он сидит в пустом офисе. 23:47. «Ещё один коммит». Последний.'
			}
		},

		'Вот он в пятом классе обзывает Петю «дурачком» за то, что тот молится перед едой.',
		'Вот он в университете публично унижает студентку-мусульманку на семинаре.',

		{
			'Conditional': {
				'Condition': function () {
					return this.storage ().prologue_was_kind ? 'kind' : 'cruel';
				},
				'kind': 'jump Judgment_Review_Kind',
				'cruel': 'jump Judgment_Review_Cruel'
			}
		}
	],

	'Judgment_Review_Kind': [
		'Но вот — моменты доброты.',
		'Вот Алексей молча помогает соседке-старушке нести сумки, хотя она идёт из церкви.',
		'Вот он пишет Серёже «рад за тебя», вместо того чтобы высмеивать.',

		'g Ты не безнадёжен, Алексей.',
		'g Ты заблуждался. Но ты не был жесток.',
		'g По крайней мере, не всегда.',

		'mc (Это... хоть что-то значит?)',

		'jump Judgment_Sergey_Witness'
	],

	'Judgment_Review_Cruel': [
		'Вот Алексей на семинаре. Студентка-мусульманка говорит про свою веру. Тихо, нервно.',
		'Алексей поднимает руку. Разбирает её слова по пунктам. Методично. Публично. При всей аудитории.',
		'Она плачет. Аудитория молчит. Алексей садится с чувством выполненного долга.',

		'И ещё. Комментарий под постом больной женщины:',
		'«Вместо молитв — к онкологу. Молитва — плацебо для отчаявшихся.»',
		'Она плакала. Алексей этого не видел.',

		'И ещё. Серёжа. Друг из института. Написал про спину, про молитву.',
		'Алексей высмеял его в чате. Серёжа не ответил. Больше никогда не писал первым.',

		{
			'Function': {
				'Apply': function () {
					screenShake (400);
					this.storage ({ cruelty_score: this.storage ().cruelty_score + 2 });
				},
				'Revert': function () {}
			}
		},

		'g Ты был не просто неверующим, Алексей.',
		'g Ты был жестоким. Не ко Мне. К ним.',
		'g Серёжа молился за тебя каждый вечер. Ты знал?',

		'mc ......',
		'mc (Серёжа... молился за меня?)',
		'mc (Я высмеивал его. А он молился за меня.)',
		'mc (Я был прав. Технически. Молитва не лечит спину. МРТ и физиотерапия лечат. Это факт.)',
		'mc (Но Серёже нужен был не факт. Ему нужен был друг.)',
		'mc (А я выбрал быть правым. Потому что быть правым — легче, чем быть добрым.)',
		'mc (Рационализм — прекрасный щит. За ним можно прятать что угодно. Даже обычную человеческую трусость.)',

		'jump Judgment_Sergey_Witness'
	],

	// --- Свидетельство Серёжи: не про правоту, а про человека за тезисом ---
	'Judgment_Sergey_Witness': [
		'Среди образов вспыхивает ещё один. Не яркий. Домашний.',
		'Экран телефона. Тот самый чат. И голос, который Алексей узнаёт сразу.',

		{
			'Conditional': {
				'Condition': function () {
					return this.storage ().prologue_was_kind ? 'kind' : 'cruel';
				},
				'kind': 'jump Judgment_Sergey_Witness_Kind',
				'cruel': 'jump Judgment_Sergey_Witness_Cruel'
			}
		}
	],

	'Judgment_Sergey_Witness_Kind': [
		'show character sergey gentle at left with fadeIn',
		'sergey Я тогда написал про спину. Неловко написал, наверное.',
		'sergey Ждал, что ты меня разнесёшь. Ты умел. Очень чисто, по пунктам.',
		'sergey А ты написал: «рад за тебя».',
		'mc (Я даже не помнил, что ответил именно так.)',
		'sergey Для тебя это была вежливость. Для меня — вечер, где мне не пришлось защищаться перед другом.',
		'g Добро без согласия. Редкая вещь.',
		'jump Judgment_Sergey_Witness_Tail'
	],

	'Judgment_Sergey_Witness_Cruel': [
		'show character sergey hurt at left with fadeIn',
		'sergey Я тогда долго смотрел на твой ответ.',
		'sergey Ты был прав. Наверное. Спина правда могла пройти сама. Я это понимал.',
		'sergey Только я написал не диссертацию. Я написал другу, что мне стало легче.',
		'mc ......',
		'sergey Потом я молился за тебя. Не чтобы победить в споре.',
		'sergey Чтобы перестать на тебя злиться.',
		'g Ты просил фактов, Алексей. Вот факт: он страдал. Ты этого не проверял.',
		'jump Judgment_Sergey_Witness_Tail'
	],

	'Judgment_Sergey_Witness_Tail': [
		'mc (Я всю жизнь спорил с тезисами. Иногда за ними стояли люди.)',
		'mc (И я называл это интеллектуальной честностью.)',
		'hide character sergey with fadeOut',

		'jump Judgment_Verdict'
	],

	// ==========================================
	// СТРАШНЫЙ СУД: Вердикт
	// ==========================================
	'Judgment_Verdict': [
		'show scene judgment_throne with fadeIn',
		'show character mc despair at center',

		// Проверяем ранний выход: Лазейка
		{
			'Conditional': {
				'Condition': function () {
					const s = this.storage ();
					return (s.humor_used >= 3 && s.argument_quality >= 4) ? 'loophole' : 'normal';
				},
				'loophole': 'jump Ending_Loophole',
				'normal': 'jump Judgment_Verdict_Calc'
			}
		}
	],

	'Judgment_Verdict_Calc': [
		'show scene judgment_throne with fadeIn',
		'show character mc despair at center',

		// Вычисляем вердикт
		{
			'Function': {
				'Apply': function () {
					const s = this.storage ();
					let verdict;
					if (s.empathy_shown >= 2 && s.cruelty_score <= 1) {
						verdict = 'light';
					} else if (s.cruelty_score >= 3) {
						verdict = 'personalized';
					} else {
						verdict = 'standard';
					}
					this.storage ({ judgment_verdict: verdict });
				},
				'Revert': function () {
					this.storage ({ judgment_verdict: 'standard' });
				}
			}
		},

		// 'play sound gavel',
		'g Вердикт.',

		{
			'Function': {
				'Apply': function () {
					screenShake (600);
				},
				'Revert': function () {}
			}
		},

		{
			'Conditional': {
				'Condition': function () {
					return this.storage ().judgment_verdict;
				},
				'light': 'jump Judgment_Verdict_Light',
				'standard': 'jump Judgment_Verdict_Standard',
				'personalized': 'jump Judgment_Verdict_Personalized'
			}
		}
	],

	'Judgment_Verdict_Light': [
		'g Ты заблуждался, но не был лишён совести.',

		{
			'Conditional': {
				'Condition': function () { return this.storage ().prologue_was_kind ? 'kind' : 'default'; },
				'kind': 'g Ты написал Серёже «рад за тебя». Это немного, но это честно.',
				'default': 'g Ты не был жесток. Этого достаточно.'
			}
		},

		'g Ад. Но... облегчённая версия.',
		'g Считай это чистилищем с расширенной программой.',

		'mc Ад?! Облегчённый?! Это как — ад-лайт?! Без сахара?!',
		'g Именно. Без сахара.',

		'stop music judgment_tension with fade 2',
		'hide character mc with fadeOut',
		'show scene #000000 with fadeIn',
		'wait 1000',
		'jump Hell_Arrival'
	],

	'Judgment_Verdict_Standard': [
		'g Ты не верил. Это твоё право.',
		'g Но право выбора не освобождает от последствий.',
		'g Ад. Стандартный пакет.',

		'mc Стандартный... пакет?',
		'g Котлы, огонь, зубовный скрежет. Классика.',

		'mc (Он серьёзно использовал слово «пакет»?!)',

		'stop music judgment_tension with fade 2',
		'hide character mc with fadeOut',
		'show scene #000000 with fadeIn',
		'wait 1000',
		'jump Hell_Arrival'
	],

	'Judgment_Verdict_Personalized': [
		'g Ты не просто не верил.',
		'g Ты издевался. Ты насмехался. Ты считал себя умнее всех.',

		{
			'Conditional': {
				'Condition': function () { return this.storage ().prologue_personality === 'aggressive' ? 'aggressive' : 'default'; },
				'aggressive': 'g Ты высмеял друга. Публично. За то, что ему стало легче.',
				'default': 'g Ты думал, что жестокость — это интеллектуальная честность.'
			}
		},

		{
			'Function': {
				'Apply': function () {
					screenGlitch (800);
				},
				'Revert': function () {}
			}
		},

		'g Ад. Персональный пакет.',
		'g Специально для тебя.',

		'mc Персональный?! Что это значит?!',

		'g Увидишь.',

		'Свет гаснет. Мгновенно. Тишина.',

		'stop music judgment_tension with fade 1',
		'hide character mc with fadeOut',
		'show scene #000000 with fadeIn',
		'wait 1500',
		'jump Hell_Arrival'
	]
});

/* global monogatari */

// ==========================================
// Chapter: РАСШИРЕНИЕ v9 — Третий архипелаг
// 120+ ультра-микро-концовок, доступ через Expansion_Archipelago3
// ==========================================

// Helper-функция для генерации компактных endings опускаем — пишем явно для отладки.

monogatari.script ({

	'Expansion_Archipelago3': [
		'show scene #114433 with fadeIn',
		'centered Третий архипелаг. Самый компактный.',
		'wait 1000',
		{
			'Choice': {
				'Dialog': 'mc (Куда?)',
				'a3_season': { 'Text': 'Сезоны',     'Do': 'jump A3_Season' },
				'a3_verb':   { 'Text': 'Глаголы',    'Do': 'jump A3_Verb' },
				'a3_city':   { 'Text': 'Города',     'Do': 'jump A3_City' },
				'a3_state':  { 'Text': 'Агрегатные', 'Do': 'jump A3_State' },
				'a3_feel':   { 'Text': 'Чувства',    'Do': 'jump A3_Feel' },
				'a3_family': { 'Text': 'Родня',      'Do': 'jump A3_Family' },
				'a3_money':  { 'Text': 'Деньги',     'Do': 'jump A3_Money' },
				'a3_material':{'Text': 'Материалы',  'Do': 'jump A3_Material' },
				'a3_tool':   { 'Text': 'Инструменты','Do': 'jump A3_Tool' },
				'a3_nature': { 'Text': 'Природа',    'Do': 'jump A3_Nature' },
				'a3_vehicle':{ 'Text': 'Транспорт',  'Do': 'jump A3_Vehicle' },
				'a3_drink':  { 'Text': 'Напитки',    'Do': 'jump A3_Drink' },
				'a3_plant':  { 'Text': 'Растения',   'Do': 'jump A3_Plant' },
				'a3_word':   { 'Text': 'Слова',      'Do': 'jump A3_Word' },
				'a3_lang':   { 'Text': 'Языки',      'Do': 'jump A3_Lang' }
			}
		}
	],

	// Сезоны
	'A3_Season': [{ 'Choice': { 'Dialog': 'mc (Какой сезон?)',
		's1':{ 'Text': 'Зима', 'Do':'jump E9_Winter' }, 's2':{ 'Text': 'Весна', 'Do':'jump E9_Spring' },
		's3':{ 'Text': 'Лето', 'Do':'jump E9_Summer' }, 's4':{ 'Text': 'Осень', 'Do':'jump E9_Autumn' },
		's5':{ 'Text': 'Новый год', 'Do':'jump E9_NewYear' }, 's6':{ 'Text': 'Май 9', 'Do':'jump E9_May9' },
		's7':{ 'Text': '1 сентября', 'Do':'jump E9_Sep1' }, 's8':{ 'Text': '31 декабря', 'Do':'jump E9_Dec31' }
	} }],
	'E9_Winter':  [ 'show scene #ddeeff with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'season_winter' }); }, 'Revert': function () {} } }, 'centered Я зима. Тихо. Снег. Никто не торопится. Лучший мой сезон.', 'centered КОНЦОВКА: «ЗИМА»', 'wait 1500', 'jump Ending_Credits' ],
	'E9_Spring':  [ 'show scene #aaddaa with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'season_spring' }); }, 'Revert': function () {} } }, 'centered Я весна. Грязь. Слякоть. Аллергия. Никто не радуется.', 'centered КОНЦОВКА: «ВЕСНА»', 'wait 1500', 'jump Ending_Credits' ],
	'E9_Summer':  [ 'show scene #ffddaa with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'season_summer' }); }, 'Revert': function () {} } }, 'centered Я лето. Дача. Комары. Пекло. Лучшее детство.', 'centered КОНЦОВКА: «ЛЕТО»', 'wait 1500', 'jump Ending_Credits' ],
	'E9_Autumn':  [ 'show scene #cc8844 with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'season_autumn' }); }, 'Revert': function () {} } }, 'centered Я осень. Меланхолия. Кофе. Длинные тени. Самый честный из четырёх.', 'centered КОНЦОВКА: «ОСЕНЬ»', 'wait 1500', 'jump Ending_Credits' ],
	'E9_NewYear': [ 'show scene #aa44cc with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'season_new_year' }); }, 'Revert': function () {} } }, 'centered Я Новый год. Раз в год. Бесконечный круг ожидания «вот сейчас всё изменится».', 'centered КОНЦОВКА: «НОВЫЙ ГОД»', 'wait 1500', 'jump Ending_Credits' ],
	'E9_May9':    [ 'show scene #ff8844 with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'season_may9' }); }, 'Revert': function () {} } }, 'centered Я 9 мая. Серёжки в деревне. Дед молчит. Все молчат.', 'centered КОНЦОВКА: «9 МАЯ»', 'wait 1500', 'jump Ending_Credits' ],
	'E9_Sep1':    [ 'show scene #ddcc88 with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'season_sep1' }); }, 'Revert': function () {} } }, 'centered Я 1 сентября. Букеты. Линейка. Школа №47.', 'centered КОНЦОВКА: «1 СЕНТЯБРЯ»', 'wait 1500', 'jump Ending_Credits' ],
	'E9_Dec31':   [ 'show scene #4488aa with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'season_dec31' }); }, 'Revert': function () {} } }, 'centered Я 31 декабря. Тот вечер, когда мама ждала. Я не приехал — был на работе.', 'centered КОНЦОВКА: «31 ДЕКАБРЯ»', 'wait 1500', 'jump Ending_Credits' ],

	// Глаголы
	'A3_Verb': [{ 'Choice': { 'Dialog': 'mc (Каким глаголом стать?)',
		'v1':{ 'Text': 'Идти', 'Do':'jump E9_Go' }, 'v2':{ 'Text': 'Ждать', 'Do':'jump E9_Wait' },
		'v3':{ 'Text': 'Любить', 'Do':'jump E9_Love' }, 'v4':{ 'Text': 'Помнить', 'Do':'jump E9_Remember' },
		'v5':{ 'Text': 'Прощать', 'Do':'jump E9_Forgive' }, 'v6':{ 'Text': 'Молчать', 'Do':'jump E9_BeSilent' }
	} }],
	'E9_Go':       [ 'show scene #aaaaaa with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'verb_go' }); }, 'Revert': function () {} } }, 'centered Я глагол «идти». Несовершенный вид. Бесконечный процесс.', 'centered КОНЦОВКА: «ИДТИ»', 'wait 1500', 'jump Ending_Credits' ],
	'E9_Wait':     [ 'show scene #888888 with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'verb_wait' }); }, 'Revert': function () {} } }, 'centered Я глагол «ждать». Самый важный в посмертии.', 'centered КОНЦОВКА: «ЖДАТЬ»', 'wait 1500', 'jump Ending_Credits' ],
	'E9_Love':     [ 'show scene #ff6688 with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'verb_love' }); }, 'Revert': function () {} } }, 'centered Я глагол «любить». Continuous. Без формы прошедшего.', 'centered КОНЦОВКА: «ЛЮБИТЬ»', 'wait 1500', 'jump Ending_Credits' ],
	'E9_Remember': [ 'show scene #aacccc with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'verb_remember' }); }, 'Revert': function () {} } }, 'centered Я глагол «помнить». Тяжёлый. Самый затратный.', 'centered КОНЦОВКА: «ПОМНИТЬ»', 'wait 1500', 'jump Ending_Credits' ],
	'E9_Forgive':  [ 'show scene #ffffff with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'verb_forgive' }); }, 'Revert': function () {} } }, 'centered Я глагол «прощать». Действительный залог. Тяжелее переноса.', 'centered КОНЦОВКА: «ПРОЩАТЬ»', 'wait 1500', 'jump Ending_Credits' ],
	'E9_BeSilent': [ 'show scene #000000 with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'verb_be_silent' }); }, 'Revert': function () {} } }, 'centered Я глагол «молчать». Самый честный из всех.', 'centered КОНЦОВКА: «МОЛЧАТЬ»', 'wait 1500', 'jump Ending_Credits' ],

	// Города
	'A3_City': [{ 'Choice': { 'Dialog': 'mc (Какой город?)',
		'c1':{ 'Text': 'Москва', 'Do':'jump E9_Moscow' }, 'c2':{ 'Text': 'Питер', 'Do':'jump E9_Spb' },
		'c3':{ 'Text': 'Воронеж', 'Do':'jump E9_Voronezh' }, 'c4':{ 'Text': 'Челябинск', 'Do':'jump E9_Chelyabinsk' },
		'c5':{ 'Text': 'Сочи', 'Do':'jump E9_Sochi' }, 'c6':{ 'Text': 'Совёнок-6', 'Do':'jump E9_Sovenok' }
	} }],
	'E9_Moscow':    [ 'show scene #aa6644 with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'city_moscow' }); }, 'Revert': function () {} } }, 'centered Я Москва-2026. Цифровая. Бессонная. Я всех вас знаю.', 'centered КОНЦОВКА: «МОСКВА»', 'wait 1500', 'jump Ending_Credits' ],
	'E9_Spb':       [ 'show scene #6688aa with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'city_spb' }); }, 'Revert': function () {} } }, 'centered Я Питер. Сыро. Депрессивно. Артистично. Идеальный ад.', 'centered КОНЦОВКА: «ПИТЕР»', 'wait 1500', 'jump Ending_Credits' ],
	'E9_Voronezh':  [ 'show scene #888866 with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'city_voronezh' }); }, 'Revert': function () {} } }, 'centered Я Воронеж. Самый произвольный из городов посмертия.', 'centered КОНЦОВКА: «ВОРОНЕЖ»', 'wait 1500', 'jump Ending_Credits' ],
	'E9_Chelyabinsk':[ 'show scene #aa8866 with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'city_chelyabinsk' }); }, 'Revert': function () {} } }, 'centered Я Челябинск. На улицах — метеорит. Я и есть метеорит. Семь часов утра.', 'centered КОНЦОВКА: «ЧЕЛЯБИНСК»', 'wait 1500', 'jump Ending_Credits' ],
	'E9_Sochi':     [ 'show scene #ddcc88 with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'city_sochi' }); }, 'Revert': function () {} } }, 'centered Я Сочи. Бесконечный отпуск. У всех душ — один сезон.', 'centered КОНЦОВКА: «СОЧИ»', 'wait 1500', 'jump Ending_Credits' ],
	'E9_Sovenok':   [ 'show scene #443388 with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'city_sovenok' }); }, 'Revert': function () {} } }, 'centered Я пионерлагерь Совёнок-6. У меня всегда лето. Автобус ушёл.', 'centered КОНЦОВКА: «СОВЁНОК-6»', 'wait 1500', 'jump Ending_Credits' ],

	// Агрегатные состояния
	'A3_State': [{ 'Choice': { 'Dialog': 'mc (Каким состоянием?)',
		'st1':{ 'Text': 'Твёрдым', 'Do':'jump E9_Solid' }, 'st2':{ 'Text': 'Жидким', 'Do':'jump E9_Liquid' },
		'st3':{ 'Text': 'Газом', 'Do':'jump E9_Gas' }, 'st4':{ 'Text': 'Плазмой', 'Do':'jump E9_Plasma' },
		'st5':{ 'Text': 'БЭК', 'Do':'jump E9_BEC' }, 'st6':{ 'Text': 'Стеклом', 'Do':'jump E9_Glass' }
	} }],
	'E9_Solid':  [ 'show scene #888888 with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'state_solid' }); }, 'Revert': function () {} } }, 'centered Я твёрдый. Прочный. Скучный. Кому-то нужный.', 'centered КОНЦОВКА: «ТВЁРДЫЙ»', 'wait 1500', 'jump Ending_Credits' ],
	'E9_Liquid': [ 'show scene #4488aa with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'state_liquid' }); }, 'Revert': function () {} } }, 'centered Я жидкий. Приму форму любого сосуда. И буду в нём пожизненно.', 'centered КОНЦОВКА: «ЖИДКИЙ»', 'wait 1500', 'jump Ending_Credits' ],
	'E9_Gas':    [ 'show scene #aacccc with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'state_gas' }); }, 'Revert': function () {} } }, 'centered Я газ. Всюду. Никогда. Никем не пойман.', 'centered КОНЦОВКА: «ГАЗ»', 'wait 1500', 'jump Ending_Credits' ],
	'E9_Plasma': [ 'show scene #ff6688 with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'state_plasma' }); }, 'Revert': function () {} } }, 'centered Я плазма. Самое радикальное состояние. Самое короткое.', 'centered КОНЦОВКА: «ПЛАЗМА»', 'wait 1500', 'jump Ending_Credits' ],
	'E9_BEC':    [ 'show scene #ccddff with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'state_bec' }); }, 'Revert': function () {} } }, 'centered Я бозе-эйнштейновский конденсат. У меня все частицы — в одном состоянии. Гомогенная вечность.', 'centered КОНЦОВКА: «БЭК»', 'wait 1500', 'jump Ending_Credits' ],
	'E9_Glass':  [ 'show scene #ddffff with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'state_glass' }); }, 'Revert': function () {} } }, 'centered Я стекло. Полутвёрд, полужидок. Самое поэтическое состояние.', 'centered КОНЦОВКА: «СТЕКЛО»', 'wait 1500', 'jump Ending_Credits' ],

	// Чувства
	'A3_Feel': [{ 'Choice': { 'Dialog': 'mc (Каким чувством?)',
		'f1':{ 'Text': 'Нежность', 'Do':'jump E9_Tender' }, 'f2':{ 'Text': 'Ярость', 'Do':'jump E9_Rage' },
		'f3':{ 'Text': 'Скука', 'Do':'jump E9_Boredom' }, 'f4':{ 'Text': 'Тоска', 'Do':'jump E9_Toska' },
		'f5':{ 'Text': 'Зависть', 'Do':'jump E9_Envy' }, 'f6':{ 'Text': 'Стыд', 'Do':'jump E9_Shame' }
	} }],
	'E9_Tender':  [ 'show scene #ffccdd with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'feel_tender' }); }, 'Revert': function () {} } }, 'centered Я нежность. Меня мало. Меня редко. Меня всегда мало.', 'centered КОНЦОВКА: «НЕЖНОСТЬ»', 'wait 1500', 'jump Ending_Credits' ],
	'E9_Rage':    [ 'show scene #cc0044 with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'feel_rage' }); }, 'Revert': function () {} } }, 'centered Я ярость. Краткая. Сильная. Заразная.', 'centered КОНЦОВКА: «ЯРОСТЬ»', 'wait 1500', 'jump Ending_Credits' ],
	'E9_Boredom': [ 'show scene #aaaa88 with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'feel_boredom' }); }, 'Revert': function () {} } }, 'centered Я скука. Худшее из всех чувств — потому что я не наполняюсь.', 'centered КОНЦОВКА: «СКУКА»', 'wait 1500', 'jump Ending_Credits' ],
	'E9_Toska':   [ 'show scene #4466aa with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'feel_toska' }); }, 'Revert': function () {} } }, 'centered Я тоска. Слово, которое нельзя перевести. Я и есть непереводимость.', 'centered КОНЦОВКА: «ТОСКА»', 'wait 1500', 'jump Ending_Credits' ],
	'E9_Envy':    [ 'show scene #44aa66 with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'feel_envy' }); }, 'Revert': function () {} } }, 'centered Я зависть. Все её прячут. Я — единственное, что у всех общее.', 'centered КОНЦОВКА: «ЗАВИСТЬ»', 'wait 1500', 'jump Ending_Credits' ],
	'E9_Shame':   [ 'show scene #cc8844 with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'feel_shame' }); }, 'Revert': function () {} } }, 'centered Я стыд. Никто не хочет меня видеть. Я и есть отвернутый взгляд.', 'centered КОНЦОВКА: «СТЫД»', 'wait 1500', 'jump Ending_Credits' ],

	// Родня
	'A3_Family': [{ 'Choice': { 'Dialog': 'mc (Какая роль в семье?)',
		'fm1':{ 'Text': 'Сын', 'Do':'jump E9_Son' }, 'fm2':{ 'Text': 'Отец', 'Do':'jump E9_Father' },
		'fm3':{ 'Text': 'Брат', 'Do':'jump E9_Brother' }, 'fm4':{ 'Text': 'Дядя', 'Do':'jump E9_Uncle' },
		'fm5':{ 'Text': 'Внук', 'Do':'jump E9_Grandson' }, 'fm6':{ 'Text': 'Свояк', 'Do':'jump E9_BrotherInLaw' }
	} }],
	'E9_Son':           [ 'show scene #aaaaff with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'family_son' }); }, 'Revert': function () {} } }, 'centered Я сын. Снова. Бесконечно. У меня хорошая мама. У меня нет времени её любить.', 'centered КОНЦОВКА: «СЫН»', 'wait 1500', 'jump Ending_Credits' ],
	'E9_Father':        [ 'show scene #aaccaa with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'family_father' }); }, 'Revert': function () {} } }, 'centered Я отец. Не успел. Так и не успел.', 'centered КОНЦОВКА: «НЕСЛОЖИВШИЙСЯ ОТЕЦ»', 'wait 1500', 'jump Ending_Credits' ],
	'E9_Brother':       [ 'show scene #ccaa88 with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'family_brother' }); }, 'Revert': function () {} } }, 'centered Я брат. У меня нет брата. Но в посмертии — всех называют так. У меня их миллиарды.', 'centered КОНЦОВКА: «БРАТ»', 'wait 1500', 'jump Ending_Credits' ],
	'E9_Uncle':         [ 'show scene #88aaaa with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'family_uncle' }); }, 'Revert': function () {} } }, 'centered Я дядя. Тот, кто появляется раз в год, чтобы привезти конфет. Самая лёгкая роль.', 'centered КОНЦОВКА: «ДЯДЯ»', 'wait 1500', 'jump Ending_Credits' ],
	'E9_Grandson':      [ 'show scene #ddcccc with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'family_grandson' }); }, 'Revert': function () {} } }, 'centered Я внук. У бабушки последнее лето. Она знала. Я нет.', 'centered КОНЦОВКА: «ВНУК»', 'wait 1500', 'jump Ending_Credits' ],
	'E9_BrotherInLaw':  [ 'show scene #aacc88 with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'family_brother_in_law' }); }, 'Revert': function () {} } }, 'centered Я свояк. Самая абсурдная семейная роль. Раз в год — на свадьбу.', 'centered КОНЦОВКА: «СВОЯК»', 'wait 1500', 'jump Ending_Credits' ],

	// Деньги
	'A3_Money': [{ 'Choice': { 'Dialog': 'mc (Какой валютой?)',
		'm1':{ 'Text': 'Рубль', 'Do':'jump E9_Ruble' }, 'm2':{ 'Text': 'Доллар', 'Do':'jump E9_Dollar' },
		'm3':{ 'Text': 'Биткоин', 'Do':'jump E9_BTC' }, 'm4':{ 'Text': 'Карма', 'Do':'jump E9_Karma' },
		'm5':{ 'Text': 'Памят', 'Do':'jump E9_Memory' }, 'm6':{ 'Text': 'Час', 'Do':'jump E9_Hour' }
	} }],
	'E9_Ruble':  [ 'show scene #aa4422 with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'money_ruble' }); }, 'Revert': function () {} } }, 'centered Я рубль. 1991 года. У меня уже три номинала за жизнь. И один в посмертии.', 'centered КОНЦОВКА: «РУБЛЬ»', 'wait 1500', 'jump Ending_Credits' ],
	'E9_Dollar': [ 'show scene #44aa44 with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'money_dollar' }); }, 'Revert': function () {} } }, 'centered Я доллар. Резервная валюта. На каждом — глаз пирамиды. И тот глаз — мой.', 'centered КОНЦОВКА: «ДОЛЛАР»', 'wait 1500', 'jump Ending_Credits' ],
	'E9_BTC':    [ 'show scene #ffaa44 with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'money_btc' }); }, 'Revert': function () {} } }, 'centered Я биткоин. Не имею тела. Имею только хэш. Идеально для посмертия.', 'centered КОНЦОВКА: «БТК»', 'wait 1500', 'jump Ending_Credits' ],
	'E9_Karma':  [ 'show scene #ffffff with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'money_karma' }); }, 'Revert': function () {} } }, 'centered Я карма. Главная валюта посмертия. У всех — баланс. Никто не знает, какой.', 'centered КОНЦОВКА: «КАРМА»', 'wait 1500', 'jump Ending_Credits' ],
	'E9_Memory': [ 'show scene #ccaaff with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'money_memory' }); }, 'Revert': function () {} } }, 'centered Я воспоминание. Платежеспособная единица. Билет в музей сожалений стоит одно.', 'centered КОНЦОВКА: «ВОСПОМИНАНИЕ»', 'wait 1500', 'jump Ending_Credits' ],
	'E9_Hour':   [ 'show scene #aaaaaa with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'money_hour' }); }, 'Revert': function () {} } }, 'centered Я час. Самая дорогая единица. Покупается за «не успел».', 'centered КОНЦОВКА: «ЧАС»', 'wait 1500', 'jump Ending_Credits' ],

	// Материалы
	'A3_Material': [{ 'Choice': { 'Dialog': 'mc (Каким материалом?)',
		'mt1':{ 'Text': 'Дерево', 'Do':'jump E9_Wood' }, 'mt2':{ 'Text': 'Камень', 'Do':'jump E9_Stone' },
		'mt3':{ 'Text': 'Бетон', 'Do':'jump E9_Concrete' }, 'mt4':{ 'Text': 'Шёлк', 'Do':'jump E9_Silk' },
		'mt5':{ 'Text': 'Резина', 'Do':'jump E9_Rubber' }, 'mt6':{ 'Text': 'Стекло', 'Do':'jump E9_GlassMt' }
	} }],
	'E9_Wood':     [ 'show scene #aa6633 with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'mat_wood' }); }, 'Revert': function () {} } }, 'centered Я дерево. Папа резал доски. Я был доской. Теперь — частью полки.', 'centered КОНЦОВКА: «ДЕРЕВО»', 'wait 1500', 'jump Ending_Credits' ],
	'E9_Stone':    [ 'show scene #888888 with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'mat_stone' }); }, 'Revert': function () {} } }, 'centered Я камень. Без эмоций. Без сроков. Идеал.', 'centered КОНЦОВКА: «КАМЕНЬ»', 'wait 1500', 'jump Ending_Credits' ],
	'E9_Concrete': [ 'show scene #cccccc with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'mat_concrete' }); }, 'Revert': function () {} } }, 'centered Я бетон. Серый. Стандартный. Хорошо, что меня много.', 'centered КОНЦОВКА: «БЕТОН»', 'wait 1500', 'jump Ending_Credits' ],
	'E9_Silk':     [ 'show scene #ffddee with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'mat_silk' }); }, 'Revert': function () {} } }, 'centered Я шёлк. Юлин платок. Никогда не порвался.', 'centered КОНЦОВКА: «ШЁЛК»', 'wait 1500', 'jump Ending_Credits' ],
	'E9_Rubber':   [ 'show scene #222222 with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'mat_rubber' }); }, 'Revert': function () {} } }, 'centered Я резина. На колёсах того самого автобуса (Семён в нём ехал).', 'centered КОНЦОВКА: «РЕЗИНА»', 'wait 1500', 'jump Ending_Credits' ],
	'E9_GlassMt':  [ 'show scene #aaddff with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'mat_glass' }); }, 'Revert': function () {} } }, 'centered Я стекло окна. То, через которое Юля видела меня все утра.', 'centered КОНЦОВКА: «СТЕКЛО ОКНА»', 'wait 1500', 'jump Ending_Credits' ],

	// Инструменты
	'A3_Tool': [{ 'Choice': { 'Dialog': 'mc (Каким инструментом?)',
		'tl1':{ 'Text': 'Молоток', 'Do':'jump E9_Hammer' }, 'tl2':{ 'Text': 'Отвёртка', 'Do':'jump E9_Screwdriver' },
		'tl3':{ 'Text': 'Пила', 'Do':'jump E9_Saw' }, 'tl4':{ 'Text': 'Линейка', 'Do':'jump E9_Ruler' },
		'tl5':{ 'Text': 'Молоток-клавиатура', 'Do':'jump E9_KbdHammer' }, 'tl6':{ 'Text': 'Перфоратор', 'Do':'jump E9_Drill' }
	} }],
	'E9_Hammer':      [ 'show scene #888844 with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'tool_hammer' }); }, 'Revert': function () {} } }, 'centered Я молоток. У меня есть гвоздь. Любой гвоздь. Любой проблеме — гвоздь.', 'centered КОНЦОВКА: «МОЛОТОК»', 'wait 1500', 'jump Ending_Credits' ],
	'E9_Screwdriver': [ 'show scene #ccaa44 with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'tool_screwdriver' }); }, 'Revert': function () {} } }, 'centered Я отвёртка. Крестовая. Без вариантов.', 'centered КОНЦОВКА: «КРЕСТОВАЯ»', 'wait 1500', 'jump Ending_Credits' ],
	'E9_Saw':         [ 'show scene #aaaa44 with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'tool_saw' }); }, 'Revert': function () {} } }, 'centered Я пила. Двуручная. Нужен партнёр. Партнёр — Юля.', 'centered КОНЦОВКА: «ПИЛА»', 'wait 1500', 'jump Ending_Credits' ],
	'E9_Ruler':       [ 'show scene #cccccc with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'tool_ruler' }); }, 'Revert': function () {} } }, 'centered Я линейка. 30 см. Минимально достаточно для жизни.', 'centered КОНЦОВКА: «ЛИНЕЙКА»', 'wait 1500', 'jump Ending_Credits' ],
	'E9_KbdHammer':   [ 'show scene #444477 with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'tool_kbd_hammer' }); }, 'Revert': function () {} } }, 'centered Я клавиатура-молоток. Каждая клавиша — гвоздь в чужой пост.', 'centered КОНЦОВКА: «KBD»', 'wait 1500', 'jump Ending_Credits' ],
	'E9_Drill':       [ 'show scene #cc4444 with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'tool_drill' }); }, 'Revert': function () {} } }, 'centered Я перфоратор. Сосед сверху. Утро субботы.', 'centered КОНЦОВКА: «ПЕРФОРАТОР»', 'wait 1500', 'jump Ending_Credits' ],

	// Природа
	'A3_Nature': [{ 'Choice': { 'Dialog': 'mc (Какой природой?)',
		'n1':{ 'Text': 'Дуб', 'Do':'jump E9_Oak' }, 'n2':{ 'Text': 'Берёза', 'Do':'jump E9_Birch' },
		'n3':{ 'Text': 'Лужа', 'Do':'jump E9_Puddle' }, 'n4':{ 'Text': 'Травинка', 'Do':'jump E9_Grass' },
		'n5':{ 'Text': 'Тайга', 'Do':'jump E9_Taiga' }, 'n6':{ 'Text': 'Тундра', 'Do':'jump E9_Tundra' }
	} }],
	'E9_Oak':     [ 'show scene #aa6644 with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'nat_oak' }); }, 'Revert': function () {} } }, 'centered Я дуб. Стою. Триста лет. Никто меня не пилит — пилили бы, я был бы доской.', 'centered КОНЦОВКА: «ДУБ»', 'wait 1500', 'jump Ending_Credits' ],
	'E9_Birch':   [ 'show scene #eeeeee with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'nat_birch' }); }, 'Revert': function () {} } }, 'centered Я берёза. Самое русское дерево. Меня воспели даже атеисты.', 'centered КОНЦОВКА: «БЕРЁЗА»', 'wait 1500', 'jump Ending_Credits' ],
	'E9_Puddle':  [ 'show scene #4466aa with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'nat_puddle' }); }, 'Revert': function () {} } }, 'centered Я лужа. Дети меня перепрыгивают. Взрослые обходят. Никто не остаётся.', 'centered КОНЦОВКА: «ЛУЖА»', 'wait 1500', 'jump Ending_Credits' ],
	'E9_Grass':   [ 'show scene #66aa44 with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'nat_grass' }); }, 'Revert': function () {} } }, 'centered Я травинка. На лужайке детского сада. На той самой, где Поля играла.', 'centered КОНЦОВКА: «ТРАВИНКА»', 'wait 1500', 'jump Ending_Credits' ],
	'E9_Taiga':   [ 'show scene #224433 with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'nat_taiga' }); }, 'Revert': function () {} } }, 'centered Я тайга. Тёмная. Без выхода. Лисичка пробегает где-то.', 'centered КОНЦОВКА: «ТАЙГА»', 'wait 1500', 'jump Ending_Credits' ],
	'E9_Tundra':  [ 'show scene #ddeeff with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'nat_tundra' }); }, 'Revert': function () {} } }, 'centered Я тундра. Ничего. Бесконечно. Самое честное место на планете.', 'centered КОНЦОВКА: «ТУНДРА»', 'wait 1500', 'jump Ending_Credits' ],

	// Транспорт
	'A3_Vehicle': [{ 'Choice': { 'Dialog': 'mc (Каким транспортом?)',
		'v1':{ 'Text': 'Автобус', 'Do':'jump E9_Bus' }, 'v2':{ 'Text': 'Маршрутка', 'Do':'jump E9_Marshrutka' },
		'v3':{ 'Text': 'Самолёт', 'Do':'jump E9_Plane' }, 'v4':{ 'Text': 'Скейтборд', 'Do':'jump E9_Skate' },
		'v5':{ 'Text': 'Велосипед', 'Do':'jump E9_Bike' }, 'v6':{ 'Text': 'Самокат', 'Do':'jump E9_Scooter' }
	} }],
	'E9_Bus':         [ 'show scene #ccaa44 with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'vh_bus' }); }, 'Revert': function () {} } }, 'centered Я автобус. Тот самый. Зимой едет, летом приезжает. Семён выходит.', 'centered КОНЦОВКА: «АВТОБУС»', 'wait 1500', 'jump Ending_Credits' ],
	'E9_Marshrutka':  [ 'show scene #aa6644 with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'vh_marshrutka' }); }, 'Revert': function () {} } }, 'centered Я маршрутка №47. От 1990-х. Без расписания. Без оплаты картой.', 'centered КОНЦОВКА: «МАРШРУТКА 47»', 'wait 1500', 'jump Ending_Credits' ],
	'E9_Plane':       [ 'show scene #aaccff with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'vh_plane' }); }, 'Revert': function () {} } }, 'centered Я самолёт. Лечу. Никогда не сажусь — нет аэропорта посмертия.', 'centered КОНЦОВКА: «САМОЛЁТ»', 'wait 1500', 'jump Ending_Credits' ],
	'E9_Skate':       [ 'show scene #cc44aa with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'vh_skate' }); }, 'Revert': function () {} } }, 'centered Я скейтборд. У меня нет колёс — посмертные скейты на ничём.', 'centered КОНЦОВКА: «СКЕЙТ»', 'wait 1500', 'jump Ending_Credits' ],
	'E9_Bike':        [ 'show scene #44aa66 with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'vh_bike' }); }, 'Revert': function () {} } }, 'centered Я велосипед. Тот самый, на котором папа учил меня ездить в 1992.', 'centered КОНЦОВКА: «ВЕЛИК»', 'wait 1500', 'jump Ending_Credits' ],
	'E9_Scooter':     [ 'show scene #aacc44 with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'vh_scooter' }); }, 'Revert': function () {} } }, 'centered Я самокат. Электрический. Хайповый. Бесполезный. Идеал 2025-го.', 'centered КОНЦОВКА: «САМОКАТ»', 'wait 1500', 'jump Ending_Credits' ],

	// Напитки
	'A3_Drink': [{ 'Choice': { 'Dialog': 'mc (Каким напитком?)',
		'd1':{ 'Text': 'Чай', 'Do':'jump E9_TeaD' }, 'd2':{ 'Text': 'Кофе', 'Do':'jump E9_CoffeeD' },
		'd3':{ 'Text': 'Какао', 'Do':'jump E9_Cocoa' }, 'd4':{ 'Text': 'Сок', 'Do':'jump E9_Juice' },
		'd5':{ 'Text': 'Лимонад', 'Do':'jump E9_Lemonade' }, 'd6':{ 'Text': 'Молоко', 'Do':'jump E9_Milk' }
	} }],
	'E9_TeaD':      [ 'show scene #553311 with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'drink_tea_d' }); }, 'Revert': function () {} } }, 'centered Я чай. Чёрный. Крепкий. Бесконечный.', 'centered КОНЦОВКА: «ЧАЙ-Д»', 'wait 1500', 'jump Ending_Credits' ],
	'E9_CoffeeD':   [ 'show scene #443322 with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'drink_coffee_d' }); }, 'Revert': function () {} } }, 'centered Я кофе. Семь хрипов утром. Я и есть эти хрипы.', 'centered КОНЦОВКА: «КОФЕ-Д»', 'wait 1500', 'jump Ending_Credits' ],
	'E9_Cocoa':     [ 'show scene #aa6644 with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'drink_cocoa' }); }, 'Revert': function () {} } }, 'centered Я какао. Тёплое. С плёнкой сверху. У мамы рецепт.', 'centered КОНЦОВКА: «КАКАО»', 'wait 1500', 'jump Ending_Credits' ],
	'E9_Juice':     [ 'show scene #ffaa44 with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'drink_juice' }); }, 'Revert': function () {} } }, 'centered Я сок. Свежевыжатый. Где-то на даче, в 90-х.', 'centered КОНЦОВКА: «СОК»', 'wait 1500', 'jump Ending_Credits' ],
	'E9_Lemonade':  [ 'show scene #ffcc44 with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'drink_lemonade' }); }, 'Revert': function () {} } }, 'centered Я лимонад. Из автомата за три копейки. Газ кончился. Дети уехали.', 'centered КОНЦОВКА: «ЛИМОНАД»', 'wait 1500', 'jump Ending_Credits' ],
	'E9_Milk':      [ 'show scene #eeeedd with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'drink_milk' }); }, 'Revert': function () {} } }, 'centered Я молоко. Из стеклянной бутылки. С пенкой. Лето 1989.', 'centered КОНЦОВКА: «МОЛОКО»', 'wait 1500', 'jump Ending_Credits' ],

	// Растения
	'A3_Plant': [{ 'Choice': { 'Dialog': 'mc (Каким растением?)',
		'pl1':{ 'Text': 'Кактус', 'Do':'jump E9_Cactus' }, 'pl2':{ 'Text': 'Алоэ', 'Do':'jump E9_Aloe' },
		'pl3':{ 'Text': 'Фикус', 'Do':'jump E9_Ficus' }, 'pl4':{ 'Text': 'Орхидея', 'Do':'jump E9_Orchid' },
		'pl5':{ 'Text': 'Папоротник', 'Do':'jump E9_Fern' }, 'pl6':{ 'Text': 'Шиповник', 'Do':'jump E9_Rosehip' }
	} }],
	'E9_Cactus':  [ 'show scene #88aa44 with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'plant_cactus' }); }, 'Revert': function () {} } }, 'centered Я кактус на офисном столе. Стою 11 лет. Никто меня не поливает. Я и так в порядке.', 'centered КОНЦОВКА: «КАКТУС»', 'wait 1500', 'jump Ending_Credits' ],
	'E9_Aloe':    [ 'show scene #66aa66 with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'plant_aloe' }); }, 'Revert': function () {} } }, 'centered Я алоэ. Сосед — бабушка. Меня используют от всего. Я не помогаю — но они верят.', 'centered КОНЦОВКА: «АЛОЭ»', 'wait 1500', 'jump Ending_Credits' ],
	'E9_Ficus':   [ 'show scene #449944 with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'plant_ficus' }); }, 'Revert': function () {} } }, 'centered Я фикус на кухне. Свидетель всех семейных скандалов. И всех примирений.', 'centered КОНЦОВКА: «ФИКУС»', 'wait 1500', 'jump Ending_Credits' ],
	'E9_Orchid':  [ 'show scene #ffaadd with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'plant_orchid' }); }, 'Revert': function () {} } }, 'centered Я орхидея. Меня подарили. Меня бросили. У меня одно условие — не вижу солнце.', 'centered КОНЦОВКА: «ОРХИДЕЯ»', 'wait 1500', 'jump Ending_Credits' ],
	'E9_Fern':    [ 'show scene #228822 with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'plant_fern' }); }, 'Revert': function () {} } }, 'centered Я папоротник. Цветок в ночь на Купалу. Меня никто не нашёл. Я был.', 'centered КОНЦОВКА: «ПАПОРОТНИК»', 'wait 1500', 'jump Ending_Credits' ],
	'E9_Rosehip': [ 'show scene #cc4466 with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'plant_rosehip' }); }, 'Revert': function () {} } }, 'centered Я шиповник. Меня заваривают зимой. Я полезен. Меня не любят за вкус.', 'centered КОНЦОВКА: «ШИПОВНИК»', 'wait 1500', 'jump Ending_Credits' ],

	// Слова
	'A3_Word': [{ 'Choice': { 'Dialog': 'mc (Каким словом?)',
		'wd1':{ 'Text': 'Может', 'Do':'jump E9_Maybe' }, 'wd2':{ 'Text': 'Прости', 'Do':'jump E9_Sorry' },
		'wd3':{ 'Text': 'Спасибо', 'Do':'jump E9_Thanks' }, 'wd4':{ 'Text': 'Потом', 'Do':'jump E9_Later' },
		'wd5':{ 'Text': 'Нет', 'Do':'jump E9_No' }, 'wd6':{ 'Text': 'Поехали', 'Do':'jump E9_LetsGo' }
	} }],
	'E9_Maybe':  [ 'show scene #aaaaaa with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'word_maybe' }); }, 'Revert': function () {} } }, 'centered Я слово «может». Сослагательное наклонение всего сущего.', 'centered КОНЦОВКА: «МОЖЕТ»', 'wait 1500', 'jump Ending_Credits' ],
	'E9_Sorry':  [ 'show scene #ffffff with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'word_sorry' }); }, 'Revert': function () {} } }, 'centered Я слово «прости». Самое тяжёлое из всех русских слов.', 'centered КОНЦОВКА: «ПРОСТИ»', 'wait 1500', 'jump Ending_Credits' ],
	'E9_Thanks': [ 'show scene #ffeeaa with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'word_thanks' }); }, 'Revert': function () {} } }, 'centered Я слово «спасибо». Дешёвое в употреблении, дорогое в значении.', 'centered КОНЦОВКА: «СПАСИБО»', 'wait 1500', 'jump Ending_Credits' ],
	'E9_Later':  [ 'show scene #888866 with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'word_later' }); }, 'Revert': function () {} } }, 'centered Я слово «потом». Самое опасное слово русского языка.', 'centered КОНЦОВКА: «ПОТОМ»', 'wait 1500', 'jump Ending_Credits' ],
	'E9_No':     [ 'show scene #cc4444 with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'word_no' }); }, 'Revert': function () {} } }, 'centered Я слово «нет». Самое сложное слово в любой ситуации.', 'centered КОНЦОВКА: «НЕТ»', 'wait 1500', 'jump Ending_Credits' ],
	'E9_LetsGo': [ 'show scene #44aaff with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'word_lets_go' }); }, 'Revert': function () {} } }, 'centered Я слово «поехали». Гагаринское. Делает страшное небольшим.', 'centered КОНЦОВКА: «ПОЕХАЛИ»', 'wait 1500', 'jump Ending_Credits' ],

	// Языки
	'A3_Lang': [{ 'Choice': { 'Dialog': 'mc (Каким языком?)',
		'lg1':{ 'Text': 'Русский', 'Do':'jump E9_Russian' }, 'lg2':{ 'Text': 'Английский', 'Do':'jump E9_English' },
		'lg3':{ 'Text': 'Латынь', 'Do':'jump E9_Latin' }, 'lg4':{ 'Text': 'C++', 'Do':'jump E9_Cpp' },
		'lg5':{ 'Text': 'JavaScript', 'Do':'jump E9_JS' }, 'lg6':{ 'Text': 'Tongue-of-no-words', 'Do':'jump E9_NoWords' }
	} }],
	'E9_Russian': [ 'show scene #ddccaa with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'lang_russian' }); }, 'Revert': function () {} } }, 'centered Я русский язык. На мне ругаются, любят, прощают и не успевают.', 'centered КОНЦОВКА: «РУССКИЙ»', 'wait 1500', 'jump Ending_Credits' ],
	'E9_English': [ 'show scene #ddeeff with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'lang_english' }); }, 'Revert': function () {} } }, 'centered Я английский язык. На мне пишут все мои Reddit-комментарии. Все 12 437.', 'centered КОНЦОВКА: «ENGLISH»', 'wait 1500', 'jump Ending_Credits' ],
	'E9_Latin':   [ 'show scene #ccaa88 with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'lang_latin' }); }, 'Revert': function () {} } }, 'centered Я латынь. Мёртвый язык. У меня в посмертии — пенсия.', 'centered КОНЦОВКА: «LATINA»', 'wait 1500', 'jump Ending_Credits' ],
	'E9_Cpp':     [ 'show scene #4488cc with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'lang_cpp' }); }, 'Revert': function () {} } }, 'centered Я C++. Сегментация. Указатели. Утечки. Идеальный ад.', 'centered КОНЦОВКА: «C++»', 'wait 1500', 'jump Ending_Credits' ],
	'E9_JS':      [ 'show scene #ffcc44 with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'lang_js' }); }, 'Revert': function () {} } }, 'centered Я JavaScript. NaN. Undefined. typeof null === \'object\'. Лучший язык посмертия.', 'centered КОНЦОВКА: «JS»', 'wait 1500', 'jump Ending_Credits' ],
	'E9_NoWords': [ 'show scene #000000 with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'lang_no_words' }); }, 'Revert': function () {} } }, 'centered Я язык, на котором нет слов. Только смыслы. Только намерения.', 'centered КОНЦОВКА: «БЕЗ СЛОВ»', 'wait 1500', 'jump Ending_Credits' ]

});

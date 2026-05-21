/* global monogatari */

// ==========================================
// Chapter: РАСШИРЕНИЕ v8 — Второй архипелаг (числа, фигуры, цвета, звуки)
// ~120 микроконцовок в 14 тематических группах.
// Доступ — через Expansion_Archipelago2 (дверь в Expansion_Router).
// ==========================================

monogatari.script ({

	'Expansion_Archipelago2': [
		'show scene #221133 with fadeIn',
		'centered Второй архипелаг. Здесь концовок ещё больше.',
		'wait 1200',
		{
			'Choice': {
				'Dialog': 'mc (Куда?)',
				'a2_num':    { 'Text': 'Цифры',        'Do': 'jump A2_Numbers' },
				'a2_hist':   { 'Text': 'История',      'Do': 'jump A2_History' },
				'a2_animal': { 'Text': 'Звери',        'Do': 'jump A2_Animal' },
				'a2_color':  { 'Text': 'Цвета',        'Do': 'jump A2_Color' },
				'a2_body':   { 'Text': 'Части тела',   'Do': 'jump A2_Body' },
				'a2_letter': { 'Text': 'Буквы',        'Do': 'jump A2_Letter' },
				'a2_sound':  { 'Text': 'Звуки',        'Do': 'jump A2_Sound' },
				'a2_smell':  { 'Text': 'Запахи',       'Do': 'jump A2_Smell' },
				'a2_time':   { 'Text': 'Время дня',    'Do': 'jump A2_Time' },
				'a2_tech':   { 'Text': 'Эпохи технологий', 'Do': 'jump A2_Tech' },
				'a2_sci':    { 'Text': 'Науки',        'Do': 'jump A2_Sci' },
				'a2_rel':    { 'Text': 'Религии',      'Do': 'jump A2_Rel' },
				'a2_game':   { 'Text': 'Игры',         'Do': 'jump A2_Game' },
				'a2_compose':{ 'Text': 'Композитные',  'Do': 'jump A2_Compose' }
			}
		}
	],

	// ----- Цифры -----
	'A2_Numbers': [{ 'Choice': { 'Dialog': 'mc (Какая цифра?)',
		'n0': { 'Text': '0', 'Do': 'jump E_N0' }, 'n1': { 'Text': '1', 'Do': 'jump E_N1' },
		'n2': { 'Text': '2', 'Do': 'jump E_N2' }, 'n3': { 'Text': '3', 'Do': 'jump E_N3' },
		'n4': { 'Text': '7', 'Do': 'jump E_N7' }, 'n5': { 'Text': '13', 'Do': 'jump E_N13' },
		'n6': { 'Text': '42', 'Do': 'jump E_N42' }, 'n7': { 'Text': '666', 'Do': 'jump E_N666' },
		'n8': { 'Text': '1984', 'Do': 'jump E_N1984' }, 'n9': { 'Text': '7394028417', 'Do': 'jump E_N7394' }
	} }],
	'E_N0':    [ 'show scene #000000 with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'num_0' }); }, 'Revert': function () {} } }, 'centered Алексей = 0. Пустое множество.', 'centered КОНЦОВКА: «НОЛЬ»', 'centered Лучшая цифра — та, с которой всё начинается.', 'wait 1500', 'jump Ending_Credits' ],
	'E_N1':    [ 'show scene #ffffff with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'num_1' }); }, 'Revert': function () {} } }, 'centered Алексей = 1. Единица. Точка отсчёта.', 'centered КОНЦОВКА: «ОДИН»', 'centered С единицы начинается всё. И с ней же — заканчивается.', 'wait 1500', 'jump Ending_Credits' ],
	'E_N2':    [ 'show scene #aabbcc with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'num_2' }); }, 'Revert': function () {} } }, 'centered Алексей = 2. Двоичная система признала меня.', 'centered КОНЦОВКА: «ДВА»', 'centered Лучшее число — то, в котором всё либо да, либо нет.', 'wait 1500', 'jump Ending_Credits' ],
	'E_N3':    [ 'show scene #ccaa66 with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'num_3' }); }, 'Revert': function () {} } }, 'centered Алексей = 3. Троица. Сценарий писал кто-то верующий.', 'centered КОНЦОВКА: «ТРИ»', 'centered Лучшая семья — на трёх.', 'wait 1500', 'jump Ending_Credits' ],
	'E_N7':    [ 'show scene #ffd700 with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'num_7' }); }, 'Revert': function () {} } }, 'centered Алексей = 7. Семь хрипов кофемашины — это я.', 'centered КОНЦОВКА: «СЕМЬ»', 'centered Магическое число — то, что хрипит каждое утро.', 'wait 1500', 'jump Ending_Credits' ],
	'E_N13':   [ 'show scene #443344 with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'num_13' }); }, 'Revert': function () {} } }, 'centered Алексей = 13. У меня свой этаж в гостинице ада. Никто никогда не селится.', 'centered КОНЦОВКА: «ТРИНАДЦАТЬ»', 'centered Лучший номер — тот, что пропускают.', 'wait 1500', 'jump Ending_Credits' ],
	'E_N42':   [ 'show scene #66ccff with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'num_42' }); }, 'Revert': function () {} } }, 'centered Алексей = 42. Ответ на главный вопрос.', 'centered КОНЦОВКА: «42»', 'centered Лучший ответ — без вопроса.', 'wait 1500', 'jump Ending_Credits' ],
	'E_N666':  [ 'show scene #cc0000 with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'num_666' }); }, 'Revert': function () {} } }, 'centered Алексей = 666. Я — клиентский номер дьявола.', 'centered КОНЦОВКА: «666»', 'centered Худшее число — банальное.', 'wait 1500', 'jump Ending_Credits' ],
	'E_N1984': [ 'show scene #555555 with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'num_1984' }); }, 'Revert': function () {} } }, 'centered Алексей = 1984. Большой Брат смотрит. И записывает швы.', 'centered КОНЦОВКА: «1984»', 'centered Лучшее наблюдение — за наблюдателем.', 'wait 1500', 'jump Ending_Credits' ],
	'E_N7394': [ 'show scene hell_office with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'num_7394' }); }, 'Revert': function () {} } }, 'centered Алексей = 7394028417. Мой номер очереди — стал мной.', 'centered КОНЦОВКА: «7394028417»', 'centered Лучшая идентификация — номер из талона.', 'wait 1500', 'jump Ending_Credits' ],

	// ----- История -----
	'A2_History': [{ 'Choice': { 'Dialog': 'mc (С кем встретиться?)',
		'h_pushkin': { 'Text': 'Пушкин', 'Do': 'jump E_H_Pushkin' },
		'h_lenin':   { 'Text': 'Ленин',  'Do': 'jump E_H_Lenin' },
		'h_stalin':  { 'Text': 'Сталин', 'Do': 'jump E_H_Stalin' },
		'h_gagarin': { 'Text': 'Гагарин','Do': 'jump E_H_Gagarin' },
		'h_chaikov': { 'Text': 'Чайковский','Do': 'jump E_H_Chaikov' },
		'h_grigori': { 'Text': 'Перельман','Do': 'jump E_H_Perelman' },
		'h_glushkov':{ 'Text': 'Глушков','Do': 'jump E_H_Glushkov' },
		'h_lobachev':{ 'Text': 'Лобачевский','Do': 'jump E_H_Lobachev' }
	} }],
	'E_H_Pushkin':  [ 'show scene #aa7733 with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'hist_pushkin' }); }, 'Revert': function () {} } }, 'centered Пушкин пьёт чай. Я задаю ему вопросы. Он отвечает четырёхстопным ямбом.', 'centered КОНЦОВКА: «ПУШКИН»', 'centered Лучшее интервью — в четырёхстопном ямбе.', 'wait 1500', 'jump Ending_Credits' ],
	'E_H_Lenin':    [ 'show scene #cc0000 with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'hist_lenin' }); }, 'Revert': function () {} } }, 'centered Ленин в аду организует профсоюз. Меня — председателем. Я отказываюсь — мы не сошлись по уставу.', 'centered КОНЦОВКА: «ЛЕНИН»', 'centered Лучший председатель — не согласившийся.', 'wait 1500', 'jump Ending_Credits' ],
	'E_H_Stalin':   [ 'show scene #443322 with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'hist_stalin' }); }, 'Revert': function () {} } }, 'centered Сталин курит трубку. Молча. Я тоже молча. Это самое неприятное молчание в моей не-жизни.', 'centered КОНЦОВКА: «СТАЛИН»', 'centered Худшее молчание — с тем, кого боишься.', 'wait 1500', 'jump Ending_Credits' ],
	'E_H_Gagarin':  [ 'show scene #4488ff with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'hist_gagarin' }); }, 'Revert': function () {} } }, 'centered Гагарин говорит: «Поехали». Я с ним. Мы летим в рай. Поезд опаздывает. Зато мы первые на пересадке.', 'centered КОНЦОВКА: «ПОЕХАЛИ»', 'centered Лучшая дорога — за тем, кто сказал «поехали» первым.', 'wait 1500', 'jump Ending_Credits' ],
	'E_H_Chaikov':  [ 'show scene #ddccaa with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'hist_chaikov' }); }, 'Revert': function () {} } }, 'centered Чайковский в аду переписывает «Лебединое озеро». Финал теперь хороший. Это худшее, что он сделал.', 'centered КОНЦОВКА: «ЧАЙКОВСКИЙ»', 'centered Лучшие финалы — трагические. Не трогайте.', 'wait 1500', 'jump Ending_Credits' ],
	'E_H_Perelman': [ 'show scene #cccccc with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'hist_perelman' }); }, 'Revert': function () {} } }, 'centered Перельман решает гипотезу Пуанкаре в посмертии. Снова. От нечего делать.', 'centered КОНЦОВКА: «ПУАНКАРЕ»', 'centered Лучший математик — тот, кто заодно решает мировые проблемы по выходным.', 'wait 1500', 'jump Ending_Credits' ],
	'E_H_Glushkov': [ 'show scene hell_server_room with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'hist_glushkov' }); }, 'Revert': function () {} } }, 'centered Глушков построил ОГАС в посмертии. Я — оператор пятого узла. Бесплатно и навечно.', 'centered КОНЦОВКА: «ОГАС»', 'centered Лучшая советская идея — наконец сбылась после смерти.', 'wait 1500', 'jump Ending_Credits' ],
	'E_H_Lobachev': [ 'show scene #ccaaaa with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'hist_lobachev' }); }, 'Revert': function () {} } }, 'centered Лобачевский показал, что параллельные прямые в аду пересекаются. На втором километре.', 'centered КОНЦОВКА: «ЛОБАЧЕВСКИЙ»', 'centered Лучшая геометрия — та, в которой выход существует.', 'wait 1500', 'jump Ending_Credits' ],

	// ----- Звери -----
	'A2_Animal': [{ 'Choice': { 'Dialog': 'mc (Каким зверем?)',
		'a_cat':  { 'Text': 'Кот',     'Do': 'jump E_A_Cat' },
		'a_dog':  { 'Text': 'Собака',  'Do': 'jump E_A_Dog' },
		'a_owl':  { 'Text': 'Сова',    'Do': 'jump E_A_Owl' },
		'a_fox':  { 'Text': 'Лиса',    'Do': 'jump E_A_Fox' },
		'a_bear': { 'Text': 'Медведь', 'Do': 'jump E_A_Bear' },
		'a_fish': { 'Text': 'Рыба',    'Do': 'jump E_A_Fish' },
		'a_wolf': { 'Text': 'Волк',    'Do': 'jump E_A_Wolf' },
		'a_bee':  { 'Text': 'Пчела',   'Do': 'jump E_A_Bee' }
	} }],
	'E_A_Cat':  [ 'show scene #888844 with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'animal_cat' }); }, 'Revert': function () {} } }, 'centered Я кот ада. У меня девять смертей в запасе. Уже использовал восемь.', 'centered КОНЦОВКА: «КОТ»', 'centered Лучшая жизнь — последняя.', 'wait 1500', 'jump Ending_Credits' ],
	'E_A_Dog':  [ 'show scene #aa7744 with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'animal_dog' }); }, 'Revert': function () {} } }, 'centered Я собака. Жду хозяина. Хозяин — Юля. Когда-нибудь её сюда тоже отправят.', 'centered КОНЦОВКА: «СОБАКА»', 'centered Лучшая верность — посмертная.', 'wait 1500', 'jump Ending_Credits' ],
	'E_A_Owl':  [ 'show scene #443366 with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'animal_owl' }); }, 'Revert': function () {} } }, 'centered Я сова. Сижу на серверной у Виктора. Не сплю. Тоже работаю.', 'centered КОНЦОВКА: «СОВА»', 'centered Лучший талисман — тот, что не спит.', 'wait 1500', 'jump Ending_Credits' ],
	'E_A_Fox':  [ 'show scene #cc6622 with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'animal_fox' }); }, 'Revert': function () {} } }, 'centered Я лиса. У меня девять хвостов — по одному за каждую правду, которую я скрыл.', 'centered КОНЦОВКА: «ЛИСА»', 'centered Лучшая ложь — самая красивая.', 'wait 1500', 'jump Ending_Credits' ],
	'E_A_Bear': [ 'show scene #553311 with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'animal_bear' }); }, 'Revert': function () {} } }, 'centered Я медведь. Сплю всю зиму. Зима — это вечность в аду. Удобно.', 'centered КОНЦОВКА: «МЕДВЕДЬ»', 'centered Лучшая зима — без весны.', 'wait 1500', 'jump Ending_Credits' ],
	'E_A_Fish': [ 'show scene #226688 with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'animal_fish' }); }, 'Revert': function () {} } }, 'centered Я рыба. Память 3 секунды. Каждые 3 секунды — новый ад.', 'centered КОНЦОВКА: «РЫБА»', 'centered Лучшее посмертие — без долгосрочной памяти.', 'wait 1500', 'jump Ending_Credits' ],
	'E_A_Wolf': [ 'show scene #444444 with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'animal_wolf' }); }, 'Revert': function () {} } }, 'centered Я волк. Бегаю стаей. Стая — это все умершие атеисты. Семьдесят миллионов нас.', 'centered КОНЦОВКА: «ВОЛК»', 'centered Лучшая стая — та, где никто никому не верит.', 'wait 1500', 'jump Ending_Credits' ],
	'E_A_Bee':  [ 'show scene #ddcc44 with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'animal_bee' }); }, 'Revert': function () {} } }, 'centered Я пчела. Собираю молитвы. Несу в улей. Делаю мёд воспоминаний.', 'centered КОНЦОВКА: «ПЧЕЛА»', 'centered Лучшая работа — превращать молитвы в мёд.', 'wait 1500', 'jump Ending_Credits' ],

	// ----- Цвета -----
	'A2_Color': [{ 'Choice': { 'Dialog': 'mc (Какой цвет?)',
		'c_red':    { 'Text': 'Красный',    'Do': 'jump E_C_Red' },
		'c_blue':   { 'Text': 'Синий',      'Do': 'jump E_C_Blue' },
		'c_green':  { 'Text': 'Зелёный',    'Do': 'jump E_C_Green' },
		'c_yellow': { 'Text': 'Жёлтый',     'Do': 'jump E_C_Yellow' },
		'c_white':  { 'Text': 'Белый',      'Do': 'jump E_C_White' },
		'c_black':  { 'Text': 'Чёрный',     'Do': 'jump E_C_Black' },
		'c_grey':   { 'Text': 'Серый',      'Do': 'jump E_C_Grey' },
		'c_violet': { 'Text': 'Фиолетовый', 'Do': 'jump E_C_Violet' }
	} }],
	'E_C_Red':    [ 'show scene #cc0000 with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'color_red' }); }, 'Revert': function () {} } }, 'centered Я красный. Тревога. Опасность. Любовь. Всё одно.', 'centered КОНЦОВКА: «КРАСНЫЙ»', 'centered Лучший цвет — тот, что значит всё сразу.', 'wait 1500', 'jump Ending_Credits' ],
	'E_C_Blue':   [ 'show scene #003388 with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'color_blue' }); }, 'Revert': function () {} } }, 'centered Я синий. Грусть. Глубина. Спокойствие. Всё одно.', 'centered КОНЦОВКА: «СИНИЙ»', 'centered Лучший цвет — тот, что не торопится.', 'wait 1500', 'jump Ending_Credits' ],
	'E_C_Green':  [ 'show scene #008833 with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'color_green' }); }, 'Revert': function () {} } }, 'centered Я зелёный. Жизнь. Зависть. Новизна. Я не выбирал.', 'centered КОНЦОВКА: «ЗЕЛЁНЫЙ»', 'centered Лучшая жизнь — это смесь с завистью.', 'wait 1500', 'jump Ending_Credits' ],
	'E_C_Yellow': [ 'show scene #ddcc00 with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'color_yellow' }); }, 'Revert': function () {} } }, 'centered Я жёлтый. Солнце. Болезнь. Осень. Невыносимо ярко.', 'centered КОНЦОВКА: «ЖЁЛТЫЙ»', 'centered Лучший цвет — тот, что слепит.', 'wait 1500', 'jump Ending_Credits' ],
	'E_C_White':  [ 'show scene #ffffff with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'color_white' }); }, 'Revert': function () {} } }, 'centered Я белый. Чистый лист. Пустота. Невинность. Всё ещё впереди.', 'centered КОНЦОВКА: «БЕЛЫЙ»', 'centered Лучший цвет — тот, в котором ещё не написано.', 'wait 1500', 'jump Ending_Credits' ],
	'E_C_Black':  [ 'show scene #000000 with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'color_black' }); }, 'Revert': function () {} } }, 'centered Я чёрный. Все цвета сразу. Все ответы сразу.', 'centered КОНЦОВКА: «ЧЁРНЫЙ»', 'centered Лучший цвет — тот, что содержит всё.', 'wait 1500', 'jump Ending_Credits' ],
	'E_C_Grey':   [ 'show scene #888888 with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'color_grey' }); }, 'Revert': function () {} } }, 'centered Я серый. Не белый, не чёрный. Никакой. Самый честный.', 'centered КОНЦОВКА: «СЕРЫЙ»', 'centered Лучший цвет — тот, что не врёт.', 'wait 1500', 'jump Ending_Credits' ],
	'E_C_Violet': [ 'show scene #663399 with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'color_violet' }); }, 'Revert': function () {} } }, 'centered Я фиолетовый. Цвет, который не существует физически — только в восприятии.', 'centered КОНЦОВКА: «ФИОЛЕТОВЫЙ»', 'centered Лучший цвет — тот, который вырабатывает мозг.', 'wait 1500', 'jump Ending_Credits' ],

	// ----- Части тела -----
	'A2_Body': [{ 'Choice': { 'Dialog': 'mc (Какой орган стать?)',
		'b_heart':  { 'Text': 'Сердце',      'Do': 'jump E_B_Heart' },
		'b_brain':  { 'Text': 'Мозг',        'Do': 'jump E_B_Brain' },
		'b_lung':   { 'Text': 'Лёгкое',      'Do': 'jump E_B_Lung' },
		'b_skin':   { 'Text': 'Кожа',        'Do': 'jump E_B_Skin' },
		'b_eye':    { 'Text': 'Глаз',        'Do': 'jump E_B_Eye' },
		'b_ear':    { 'Text': 'Ухо',         'Do': 'jump E_B_Ear' },
		'b_finger': { 'Text': 'Палец',       'Do': 'jump E_B_Finger' },
		'b_bone':   { 'Text': 'Кость',       'Do': 'jump E_B_Bone' }
	} }],
	'E_B_Heart':  [ 'show scene #aa0033 with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'body_heart' }); }, 'Revert': function () {} } }, 'centered Я сердце. То самое, что не выдержало. Жалею себя со стороны.', 'centered КОНЦОВКА: «СЕРДЦЕ»', 'centered Лучший орган — тот, что подвёл первым.', 'wait 1500', 'jump Ending_Credits' ],
	'E_B_Brain':  [ 'show scene #ddaacc with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'body_brain' }); }, 'Revert': function () {} } }, 'centered Я мозг. Без тела. Без рук. Только мысли. Это мой худший кошмар. Я в нём навечно.', 'centered КОНЦОВКА: «МОЗГ В БАНКЕ»', 'centered Лучшая жизнь рационалиста — без тела.', 'wait 1500', 'jump Ending_Credits' ],
	'E_B_Lung':   [ 'show scene #ddffdd with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'body_lung' }); }, 'Revert': function () {} } }, 'centered Я лёгкое. Каждый вдох — это я. Когда никто не дышит — я не существую.', 'centered КОНЦОВКА: «ЛЁГКОЕ»', 'centered Лучшая зависимость — от чужих вдохов.', 'wait 1500', 'jump Ending_Credits' ],
	'E_B_Skin':   [ 'show scene #ffeedd with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'body_skin' }); }, 'Revert': function () {} } }, 'centered Я кожа. Граница между «я» и «не-я». Самый стандартный из всех органов.', 'centered КОНЦОВКА: «КОЖА»', 'centered Лучшая граница — та, что чувствует.', 'wait 1500', 'jump Ending_Credits' ],
	'E_B_Eye':    [ 'show scene #aaffff with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'body_eye' }); }, 'Revert': function () {} } }, 'centered Я глаз. Не вижу ничего. Только запись того, что когда-то видел Алексей.', 'centered КОНЦОВКА: «ГЛАЗ»', 'centered Лучший глаз — тот, что хранит, а не видит.', 'wait 1500', 'jump Ending_Credits' ],
	'E_B_Ear':    [ 'show scene #ffddcc with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'body_ear' }); }, 'Revert': function () {} } }, 'centered Я ухо. Семь хрипов кофемашины. Я их слышал. Я их сохранил.', 'centered КОНЦОВКА: «УХО»', 'centered Лучший слух — тот, что считает.', 'wait 1500', 'jump Ending_Credits' ],
	'E_B_Finger': [ 'show scene #ffccbb with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'body_finger' }); }, 'Revert': function () {} } }, 'centered Я палец. Один. Указательный. Тычу в Бога.', 'centered КОНЦОВКА: «УКАЗАТЕЛЬНЫЙ»', 'centered Лучший палец — тот, что не боится.', 'wait 1500', 'jump Ending_Credits' ],
	'E_B_Bone':   [ 'show scene #ddddcc with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'body_bone' }); }, 'Revert': function () {} } }, 'centered Я кость. Сохранюсь дольше всего. Через тысячу лет — единственное, что от меня осталось.', 'centered КОНЦОВКА: «КОСТЬ»', 'centered Лучшая часть тебя — та, что переживёт всё.', 'wait 1500', 'jump Ending_Credits' ],

	// ----- Буквы -----
	'A2_Letter': [{ 'Choice': { 'Dialog': 'mc (В какую букву?)',
		'l_a': { 'Text': 'А', 'Do': 'jump E_L_A' }, 'l_ya': { 'Text': 'Я', 'Do': 'jump E_L_YA' },
		'l_o': { 'Text': 'О', 'Do': 'jump E_L_O' }, 'l_ja': { 'Text': 'Ж', 'Do': 'jump E_L_J' },
		'l_p': { 'Text': 'Ъ', 'Do': 'jump E_L_TVRD' }, 'l_z': { 'Text': 'Ё', 'Do': 'jump E_L_YO' },
		'l_omega': { 'Text': 'Ω', 'Do': 'jump E_L_Omega' }, 'l_alfa':  { 'Text': 'α', 'Do': 'jump E_L_Alpha' }
	} }],
	'E_L_A':     [ 'show scene #ffffff with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'letter_a' }); }, 'Revert': function () {} } }, 'centered Я первая буква. Начало всех слов. Включая «Алексей».', 'centered КОНЦОВКА: «А»', 'centered Лучшее имя — то, что начинается с «А».', 'wait 1500', 'jump Ending_Credits' ],
	'E_L_YA':    [ 'show scene #ffffff with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'letter_ya' }); }, 'Revert': function () {} } }, 'centered Я последняя буква. Конец слова «я». Самореферентная.', 'centered КОНЦОВКА: «Я»', 'centered Лучшая буква — последняя в слове «я».', 'wait 1500', 'jump Ending_Credits' ],
	'E_L_O':     [ 'show scene #ffffff with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'letter_o' }); }, 'Revert': function () {} } }, 'centered Я круглая. Замкнутая. Бесконечная. И при этом — гласная.', 'centered КОНЦОВКА: «О»', 'centered Лучшая форма — замкнутая, но звонкая.', 'wait 1500', 'jump Ending_Credits' ],
	'E_L_J':     [ 'show scene #ffffff with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'letter_j' }); }, 'Revert': function () {} } }, 'centered Я Ж. У меня шесть лучей. Я — снежинка алфавита.', 'centered КОНЦОВКА: «Ж»', 'centered Лучшая буква — самая симметричная.', 'wait 1500', 'jump Ending_Credits' ],
	'E_L_TVRD':  [ 'show scene #ffffff with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'letter_tvrd' }); }, 'Revert': function () {} } }, 'centered Я твёрдый знак. Никто меня не произносит. Я просто стою. Молча.', 'centered КОНЦОВКА: «Ъ»', 'centered Лучшая роль — присутствовать, не звуча.', 'wait 1500', 'jump Ending_Credits' ],
	'E_L_YO':    [ 'show scene #ffffff with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'letter_yo' }); }, 'Revert': function () {} } }, 'centered Я Ё. У меня две точки. Они означают: «не путай меня с Е».', 'centered КОНЦОВКА: «Ё»', 'centered Лучшая буква — та, что требует к себе уважения.', 'wait 1500', 'jump Ending_Credits' ],
	'E_L_Omega': [ 'show scene #ffffff with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'letter_omega' }); }, 'Revert': function () {} } }, 'centered Я Омега. Последняя буква греческого. Конец. Финал.', 'centered КОНЦОВКА: «Ω»', 'centered Лучший конец — тот, что одной буквой.', 'wait 1500', 'jump Ending_Credits' ],
	'E_L_Alpha': [ 'show scene #ffffff with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'letter_alpha' }); }, 'Revert': function () {} } }, 'centered Я Альфа. Начало. Создаю новое. Создал даже сам себя — несколько раз.', 'centered КОНЦОВКА: «α»', 'centered Лучшая стратегия — начинать заново.', 'wait 1500', 'jump Ending_Credits' ],

	// ----- Звуки -----
	'A2_Sound': [{ 'Choice': { 'Dialog': 'mc (Каким звуком?)',
		's_click':  { 'Text': 'Щелчок',     'Do': 'jump E_S_Click' },
		's_buzz':   { 'Text': 'Зуммер',     'Do': 'jump E_S_Buzz' },
		's_whisper':{ 'Text': 'Шёпот',      'Do': 'jump E_S_Whisper' },
		's_thunder':{ 'Text': 'Гром',       'Do': 'jump E_S_Thunder' },
		's_chime':  { 'Text': 'Колокольчик','Do': 'jump E_S_Chime' },
		's_dial':   { 'Text': 'Гудок',      'Do': 'jump E_S_Dial' }
	} }],
	'E_S_Click':   [ 'show scene #000000 with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'sound_click' }); }, 'Revert': function () {} } }, 'centered Я щелчок. Тот, что в темноте, когда никто не ждёт. Кого-то напугаю в полтретьего ночи.', 'centered КОНЦОВКА: «ЩЕЛЧОК»', 'centered Лучшее присутствие — едва слышное.', 'wait 1500', 'jump Ending_Credits' ],
	'E_S_Buzz':    [ 'show scene #aaaa44 with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'sound_buzz' }); }, 'Revert': function () {} } }, 'centered Я зуммер. Тот, что звенит, когда дверь не закрыта. Звеню вечно — в аду все двери открыты.', 'centered КОНЦОВКА: «ЗУММЕР»', 'centered Лучший звук — тот, что предупреждает.', 'wait 1500', 'jump Ending_Credits' ],
	'E_S_Whisper': [ 'show scene #222244 with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'sound_whisper' }); }, 'Revert': function () {} } }, 'centered Я шёпот. Все таинственные сообщения друг другу — это я.', 'centered КОНЦОВКА: «ШЁПОТ»', 'centered Лучшая речь — тише крика.', 'wait 1500', 'jump Ending_Credits' ],
	'E_S_Thunder': [ 'show scene #112233 with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'sound_thunder' }); }, 'Revert': function () {} } }, 'centered Я гром. Большое заявление. Сразу после — пустота.', 'centered КОНЦОВКА: «ГРОМ»', 'centered Лучший шум — короткий и громкий.', 'wait 1500', 'jump Ending_Credits' ],
	'E_S_Chime':   [ 'show scene #ffddaa with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'sound_chime' }); }, 'Revert': function () {} } }, 'centered Я колокольчик на двери Бориса. Каждый посетитель — мой повод существовать.', 'centered КОНЦОВКА: «КОЛОКОЛЬЧИК»', 'centered Лучшая роль — звенеть на пороге.', 'wait 1500', 'jump Ending_Credits' ],
	'E_S_Dial':    [ 'show scene #335577 with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'sound_dial' }); }, 'Revert': function () {} } }, 'centered Я гудок «ту-у-у». Когда мама не дозвонилась — это был я.', 'centered КОНЦОВКА: «ГУДОК»', 'centered Худший звук — тот, что значит «не дозвонились».', 'wait 1500', 'jump Ending_Credits' ],

	// ----- Запахи -----
	'A2_Smell': [{ 'Choice': { 'Dialog': 'mc (Каким запахом?)',
		'sm_coffee':   { 'Text': 'Кофе',         'Do': 'jump E_Sm_Coffee' },
		'sm_paper':    { 'Text': 'Бумага',       'Do': 'jump E_Sm_Paper' },
		'sm_rain':     { 'Text': 'Дождь',        'Do': 'jump E_Sm_Rain' },
		'sm_workshop': { 'Text': 'Мастерская',   'Do': 'jump E_Sm_Workshop' },
		'sm_dust':     { 'Text': 'Пыль',         'Do': 'jump E_Sm_Dust' },
		'sm_bread':    { 'Text': 'Хлеб',         'Do': 'jump E_Sm_Bread' }
	} }],
	'E_Sm_Coffee':   [ 'show scene #443322 with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'smell_coffee' }); }, 'Revert': function () {} } }, 'centered Я запах кофе. Утренний. С хрипом 7 раз. Самая частая ассоциация моего детства.', 'centered КОНЦОВКА: «КОФЕ»', 'centered Лучший запах — тот, что включается каждый день.', 'wait 1500', 'jump Ending_Credits' ],
	'E_Sm_Paper':    [ 'show scene #ddccaa with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'smell_paper' }); }, 'Revert': function () {} } }, 'centered Я запах старой бумаги. Том двадцатый материнской библиотеки. Запах непрочитанной любви.', 'centered КОНЦОВКА: «БУМАГА»', 'centered Лучший запах — тот, что доносит то, что не доносили.', 'wait 1500', 'jump Ending_Credits' ],
	'E_Sm_Rain':     [ 'show scene #88aacc with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'smell_rain' }); }, 'Revert': function () {} } }, 'centered Я запах дождя на асфальте. Самый честный из всех запахов.', 'centered КОНЦОВКА: «АСФАЛЬТ-ПОСЛЕ-ДОЖДЯ»', 'centered Лучшее воспоминание — пятиминутное.', 'wait 1500', 'jump Ending_Credits' ],
	'E_Sm_Workshop': [ 'show scene #553311 with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'smell_workshop' }); }, 'Revert': function () {} } }, 'centered Я запах папиной мастерской. Опилки и канифоль. Самое моё.', 'centered КОНЦОВКА: «МАСТЕРСКАЯ»', 'centered Лучший дом — тот, что пахнет канифолью.', 'wait 1500', 'jump Ending_Credits' ],
	'E_Sm_Dust':     [ 'show scene #aaaaaa with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'smell_dust' }); }, 'Revert': function () {} } }, 'centered Я запах пыли. Никто меня не любит. Все ко мне привыкли.', 'centered КОНЦОВКА: «ПЫЛЬ»', 'centered Лучшая привязанность — нелюбимая, но постоянная.', 'wait 1500', 'jump Ending_Credits' ],
	'E_Sm_Bread':    [ 'show scene #ccaa66 with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'smell_bread' }); }, 'Revert': function () {} } }, 'centered Я запах свежего хлеба. Из той пекарни напротив Юлиного дома. Воскресный.', 'centered КОНЦОВКА: «ХЛЕБ»', 'centered Лучшее воскресенье — то, что пахнет тёплым.', 'wait 1500', 'jump Ending_Credits' ],

	// ----- Время дня -----
	'A2_Time': [{ 'Choice': { 'Dialog': 'mc (В какое время?)',
		't_dawn':   { 'Text': 'Рассвет',    'Do': 'jump E_T_Dawn' },
		't_07':     { 'Text': '07:44',      'Do': 'jump E_T_0744' },
		't_noon':   { 'Text': 'Полдень',    'Do': 'jump E_T_Noon' },
		't_dusk':   { 'Text': 'Закат',      'Do': 'jump E_T_Dusk' },
		't_03':     { 'Text': '03:00',      'Do': 'jump E_T_0300' },
		't_blue':   { 'Text': 'Синий час',  'Do': 'jump E_T_BlueHour' }
	} }],
	'E_T_Dawn':     [ 'show scene #ddaa88 with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'time_dawn' }); }, 'Revert': function () {} } }, 'centered Я рассвет. Тот, что в окне 47-й квартиры. Самое тёплое из всех явлений.', 'centered КОНЦОВКА: «РАССВЕТ»', 'centered Лучший момент — когда ещё никто не проснулся.', 'wait 1500', 'jump Ending_Credits' ],
	'E_T_0744':     [ 'show scene #cc9966 with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'time_0744' }); }, 'Revert': function () {} } }, 'centered Я 7:44 утра. Тот самый. Каждый понедельник. Тот, в котором всё началось и закончилось.', 'centered КОНЦОВКА: «7:44»', 'centered Лучшая минута — повторяющаяся.', 'wait 1500', 'jump Ending_Credits' ],
	'E_T_Noon':     [ 'show scene #ffdd44 with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'time_noon' }); }, 'Revert': function () {} } }, 'centered Я полдень. Тени короткие. Все врут одинаково.', 'centered КОНЦОВКА: «ПОЛДЕНЬ»', 'centered Лучшее время — когда тени минимальны.', 'wait 1500', 'jump Ending_Credits' ],
	'E_T_Dusk':     [ 'show scene #663377 with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'time_dusk' }); }, 'Revert': function () {} } }, 'centered Я закат. Все прощаются. Никто не уходит. Самое нежное время.', 'centered КОНЦОВКА: «ЗАКАТ»', 'centered Лучшее прощание — растянутое во времени.', 'wait 1500', 'jump Ending_Credits' ],
	'E_T_0300':     [ 'show scene #112244 with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'time_0300' }); }, 'Revert': function () {} } }, 'centered Я 3 часа ночи. Юля не спит. Я не сплю. Мы оба смотрим в потолок.', 'centered КОНЦОВКА: «3:00»', 'centered Лучшее время — то, в которое мы оба не спим.', 'wait 1500', 'jump Ending_Credits' ],
	'E_T_BlueHour': [ 'show scene #4466aa with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'time_blue_hour' }); }, 'Revert': function () {} } }, 'centered Я синий час. Между сумерками и ночью. Час, когда фотографы плачут — никто его не снимет лучше, чем он сам.', 'centered КОНЦОВКА: «СИНИЙ ЧАС»', 'centered Лучшее освещение — то, что не имеет источника.', 'wait 1500', 'jump Ending_Credits' ],

	// ----- Эпохи технологий -----
	'A2_Tech': [{ 'Choice': { 'Dialog': 'mc (В какую эпоху ты застрял?)',
		'tch_98':   { 'Text': 'Win 98',      'Do': 'jump E_T_Win98' },
		'tch_icq':  { 'Text': 'ICQ',         'Do': 'jump E_T_ICQ' },
		'tch_flash':{ 'Text': 'Flash',       'Do': 'jump E_T_Flash' },
		'tch_ie6':  { 'Text': 'IE6',         'Do': 'jump E_T_IE6' },
		'tch_dial': { 'Text': 'Dial-up',     'Do': 'jump E_T_Dialup' },
		'tch_y2k':  { 'Text': 'Y2K',         'Do': 'jump E_T_Y2K' }
	} }],
	'E_T_Win98':   [ 'show scene #336699 with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'tech_win98' }); }, 'Revert': function () {} } }, 'centered Я Windows 98. Запускаюсь сорок секунд. Падаю каждые семь минут. Никто меня не заменяет.', 'centered КОНЦОВКА: «WIN98»', 'centered Лучшая система — та, к которой все привыкли страдать.', 'wait 1500', 'jump Ending_Credits' ],
	'E_T_ICQ':     [ 'show scene #66cc44 with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'tech_icq' }); }, 'Revert': function () {} } }, 'centered Я ICQ. UIN 7394028417. Меня помнят только те, кому больше сорока.', 'centered КОНЦОВКА: «ICQ»', 'centered Лучший мессенджер — тот, что больше не существует.', 'wait 1500', 'jump Ending_Credits' ],
	'E_T_Flash':   [ 'show scene #cc4400 with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'tech_flash' }); }, 'Revert': function () {} } }, 'centered Я Adobe Flash. Adobe убил меня в 2020. Мама всё ещё ищет «как открыть мультик».', 'centered КОНЦОВКА: «FLASH»', 'centered Лучшая эпоха — та, которую закрыли централизованно.', 'wait 1500', 'jump Ending_Credits' ],
	'E_T_IE6':     [ 'show scene #4488dd with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'tech_ie6' }); }, 'Revert': function () {} } }, 'centered Я Internet Explorer 6. Меня все ненавидят. Я этим горжусь.', 'centered КОНЦОВКА: «IE6»', 'centered Лучший браузер — самый презираемый.', 'wait 1500', 'jump Ending_Credits' ],
	'E_T_Dialup':  [ 'show scene #224488 with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'tech_dialup' }); }, 'Revert': function () {} } }, 'centered Я звук модема. Тот самый. Цифровая молитва нулевых.', 'centered КОНЦОВКА: «DIAL-UP»', 'centered Лучший звук — тот, что значит «соединились».', 'wait 1500', 'jump Ending_Credits' ],
	'E_T_Y2K':     [ 'show scene #000000 with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'tech_y2k' }); }, 'Revert': function () {} } }, 'centered Я Y2K-баг. Меня все боялись. Я не случился. Это было моё лучшее достижение.', 'centered КОНЦОВКА: «Y2K»', 'centered Лучшая катастрофа — несостоявшаяся.', 'wait 1500', 'jump Ending_Credits' ],

	// ----- Науки -----
	'A2_Sci': [{ 'Choice': { 'Dialog': 'mc (Какая наука?)',
		'sci_phys': { 'Text': 'Физика',    'Do': 'jump E_S_Phys' },
		'sci_chem': { 'Text': 'Химия',     'Do': 'jump E_S_Chem' },
		'sci_bio':  { 'Text': 'Биология',  'Do': 'jump E_S_Bio' },
		'sci_psy':  { 'Text': 'Психология','Do': 'jump E_S_Psy' },
		'sci_math': { 'Text': 'Математика','Do': 'jump E_S_Math' },
		'sci_econ': { 'Text': 'Экономика', 'Do': 'jump E_S_Econ' }
	} }],
	'E_S_Phys': [ 'show scene #224488 with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'sci_phys' }); }, 'Revert': function () {} } }, 'centered Я закон сохранения. Атеист → энергия. Энергия → ад. Сохранилось.', 'centered КОНЦОВКА: «СОХРАНЕНИЕ»', 'centered Лучший закон — тот, что не нарушается даже в смерти.', 'wait 1500', 'jump Ending_Credits' ],
	'E_S_Chem': [ 'show scene #44aa66 with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'sci_chem' }); }, 'Revert': function () {} } }, 'centered Я химик ада. Делаю реактивы из сожалений и проявителей.', 'centered КОНЦОВКА: «ХИМИК»', 'centered Лучшая реакция — между двумя сожалениями.', 'wait 1500', 'jump Ending_Credits' ],
	'E_S_Bio':  [ 'show scene #66aa44 with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'sci_bio' }); }, 'Revert': function () {} } }, 'centered Я биолог ада. Изучаю эволюцию демонов. Они эволюционируют — но в сторону офисных работников.', 'centered КОНЦОВКА: «БИОЛОГ»', 'centered Лучшая эволюция — в сторону бюрократии.', 'wait 1500', 'jump Ending_Credits' ],
	'E_S_Psy':  [ 'show scene #aa44aa with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'sci_psy' }); }, 'Revert': function () {} } }, 'centered Я психолог Бога. Помогаю Ему справиться с травмой создания вселенной.', 'centered КОНЦОВКА: «ПСИХОЛОГ»', 'centered Лучший психолог — тот, кто слушает Бога.', 'wait 1500', 'jump Ending_Credits' ],
	'E_S_Math': [ 'show scene #ffffff with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'sci_math' }); }, 'Revert': function () {} } }, 'centered Я аксиома. Не доказуема. Принимается на веру. То самое, против чего я воевал всю жизнь.', 'centered КОНЦОВКА: «АКСИОМА»', 'centered Лучшая ирония — стать тем, против чего сражался.', 'wait 1500', 'jump Ending_Credits' ],
	'E_S_Econ': [ 'show scene #88ddaa with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'sci_econ' }); }, 'Revert': function () {} } }, 'centered Я ВВП ада. Расту бесконечно. Никто не покупает мои товары — у мёртвых нет денег.', 'centered КОНЦОВКА: «ЭКОНОМИКА»', 'centered Лучший рост — за счёт никем не оплаченного.', 'wait 1500', 'jump Ending_Credits' ],

	// ----- Религии (мета-наблюдения) -----
	'A2_Rel': [{ 'Choice': { 'Dialog': 'mc (С какой религией пересёкся?)',
		'rel_christ':{ 'Text': 'Христианство', 'Do': 'jump E_R_Christ' },
		'rel_islam': { 'Text': 'Ислам',        'Do': 'jump E_R_Islam' },
		'rel_bud':   { 'Text': 'Буддизм',      'Do': 'jump E_R_Bud' },
		'rel_jud':   { 'Text': 'Иудаизм',      'Do': 'jump E_R_Jud' },
		'rel_pas':   { 'Text': 'Пастафарианство','Do': 'jump E_R_Pas' },
		'rel_sci':   { 'Text': 'Сайентология', 'Do': 'jump E_R_Sci' }
	} }],
	'E_R_Christ': [ 'show scene #ffeecc with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'rel_christ' }); }, 'Revert': function () {} } }, 'centered Христианский Бог обнял меня. Сказал: «извини, что был категоричен в первой версии».', 'centered КОНЦОВКА: «ХРИСТИАНСТВО v2»', 'centered Лучшие религии — те, что выпускают патчи.', 'wait 1500', 'jump Ending_Credits' ],
	'E_R_Islam':  [ 'show scene #66aa88 with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'rel_islam' }); }, 'Revert': function () {} } }, 'centered Меня встретили улыбкой. Дали финик. Сказали: «не плачь, ты атеист, но улыбки бесплатны».', 'centered КОНЦОВКА: «ФИНИК»', 'centered Лучшая встреча — без догм.', 'wait 1500', 'jump Ending_Credits' ],
	'E_R_Bud':    [ 'show scene #ffcc66 with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'rel_bud' }); }, 'Revert': function () {} } }, 'centered Я нирвана. Атеист достиг буддистского финала, не желая того. Симметрия!', 'centered КОНЦОВКА: «НИРВАНА»', 'centered Лучший финал — тот, в который ты не верил.', 'wait 1500', 'jump Ending_Credits' ],
	'E_R_Jud':    [ 'show scene #4466aa with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'rel_jud' }); }, 'Revert': function () {} } }, 'centered Раввин ада задаёт мне 47 вопросов. Я ни на один не отвечаю. Он говорит: «правильно».', 'centered КОНЦОВКА: «47 ВОПРОСОВ»', 'centered Лучшая мудрость — не давать ответов.', 'wait 1500', 'jump Ending_Credits' ],
	'E_R_Pas':    [ 'show scene #ffcc66 with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'rel_pas' }); }, 'Revert': function () {} } }, 'centered Летающий макаронный монстр обнял меня щупальцем. Я в макаронном раю.', 'centered КОНЦОВКА: «FSM»', 'centered Лучшая религия — самая шуточная.', 'wait 1500', 'jump Ending_Credits' ],
	'E_R_Sci':    [ 'show scene #888888 with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'rel_sci' }); }, 'Revert': function () {} } }, 'centered Меня встретил Ксену. Сказал: «тебе на третий вулкан».', 'centered КОНЦОВКА: «КСЕНУ»', 'centered Лучшая религия — самая нелепая.', 'wait 1500', 'jump Ending_Credits' ],

	// ----- Игры -----
	'A2_Game': [{ 'Choice': { 'Dialog': 'mc (В какую игру?)',
		'g_doom':    { 'Text': 'Doom',          'Do': 'jump E_G_Doom' },
		'g_tetris':  { 'Text': 'Тетрис',        'Do': 'jump E_G_Tetris' },
		'g_disco':   { 'Text': 'Disco Elysium', 'Do': 'jump E_G_Disco' },
		'g_minecra': { 'Text': 'Minecraft',     'Do': 'jump E_G_Mine' },
		'g_csi':     { 'Text': 'CS:Posthume',   'Do': 'jump E_G_CS' },
		'g_dwarf':   { 'Text': 'Dwarf Fortress','Do': 'jump E_G_Dwarf' }
	} }],
	'E_G_Doom':   [ 'show scene #aa2222 with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'game_doom' }); }, 'Revert': function () {} } }, 'centered Я в Doom. Демоны — обычные сотрудники. Никто не стреляет — мы все заполняем формы.', 'centered КОНЦОВКА: «DOOM»', 'centered Лучший шутер — без выстрелов.', 'wait 1500', 'jump Ending_Credits' ],
	'E_G_Tetris': [ 'show scene #2222aa with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'game_tetris' }); }, 'Revert': function () {} } }, 'centered Я в Тетрисе. Фигурки падают. Я укладываю воспоминания. Линия — это год, который сложился.', 'centered КОНЦОВКА: «ТЕТРИС»', 'centered Лучшая игра — про укладывание прошлого.', 'wait 1500', 'jump Ending_Credits' ],
	'E_G_Disco':  [ 'show scene #4488cc with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'game_disco' }); }, 'Revert': function () {} } }, 'centered Я Гарри Дюбуа. Просыпаюсь в кровати в Ревашоле. У меня шесть статов и амнезия. Знакомо.', 'centered КОНЦОВКА: «DISCO»', 'centered Лучшая игра — про забытьё.', 'wait 1500', 'jump Ending_Credits' ],
	'E_G_Mine':   [ 'show scene #66aa44 with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'game_mine' }); }, 'Revert': function () {} } }, 'centered Ад на Майнкрафте. Я строю кубический собор. Незер биом. Всё посмертие.', 'centered КОНЦОВКА: «MINECRAFT»', 'centered Лучшая вечность — строить.', 'wait 1500', 'jump Ending_Credits' ],
	'E_G_CS':     [ 'show scene #444444 with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'game_cs' }); }, 'Revert': function () {} } }, 'centered CS:Posthume. Я террорист. Бомба — это исповедь. Закладываю — она взрывает не других, а меня.', 'centered КОНЦОВКА: «CS»', 'centered Лучшая бомба — исповедь.', 'wait 1500', 'jump Ending_Credits' ],
	'E_G_Dwarf':  [ 'show scene #553311 with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'game_dwarf' }); }, 'Revert': function () {} } }, 'centered Я гном из Dwarf Fortress. У меня 47 черт характера. Я расстраиваюсь из-за качества пива.', 'centered КОНЦОВКА: «DF»', 'centered Лучший гном — тот, у кого 47 настроений.', 'wait 1500', 'jump Ending_Credits' ],

	// ----- Композитные -----
	'A2_Compose': [{ 'Choice': { 'Dialog': 'mc (Какая комбинация?)',
		'comp_athsci':  { 'Text': 'Атеист + святой',  'Do': 'jump E_Comp_AthSaint' },
		'comp_devhum':  { 'Text': 'Демон + добряк',   'Do': 'jump E_Comp_DevHum' },
		'comp_godcoder':{ 'Text': 'Бог + кодер',      'Do': 'jump E_Comp_GodCoder' },
		'comp_robmoth': { 'Text': 'Робот + мать',     'Do': 'jump E_Comp_RobMoth' },
		'comp_priestit':{ 'Text': 'Священник + IT',   'Do': 'jump E_Comp_PriestIt' },
		'comp_lovsiml': { 'Text': 'Любовь + симуляция','Do': 'jump E_Comp_LovSim' },
		'comp_chefmath':{ 'Text': 'Шеф + математик',  'Do': 'jump E_Comp_ChefMath' },
		'comp_dadcot':  { 'Text': 'Отец + котёл',     'Do': 'jump E_Comp_DadCot' }
	} }],
	'E_Comp_AthSaint':   [ 'show scene #ffffff with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'comp_ath_saint' }); }, 'Revert': function () {} } }, 'centered Меня канонизировали. Святой Алексей-Атеист. Покровитель тех, кто никогда не верил, но был добр.', 'centered КОНЦОВКА: «СВЯТОЙ АТЕИСТ»', 'centered Лучший святой — тот, кто не верил.', 'wait 1500', 'jump Ending_Credits' ],
	'E_Comp_DevHum':     [ 'show scene #aa6644 with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'comp_dev_hum' }); }, 'Revert': function () {} } }, 'centered Демон вяжет шарфы. Дарит душам. Никто не понимает, кто он. Я знаю — он мой друг.', 'centered КОНЦОВКА: «ДОБРЫЙ ДЕМОН»', 'centered Лучший демон — тот, что вяжет.', 'wait 1500', 'jump Ending_Credits' ],
	'E_Comp_GodCoder':   [ 'show scene #88aaff with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'comp_god_coder' }); }, 'Revert': function () {} } }, 'centered Бог открыл мне свой GitHub. У него 7394028417 коммитов. Все за один день.', 'centered КОНЦОВКА: «GIT@GOD»', 'centered Лучший код — тот, что коммитят один день.', 'wait 1500', 'jump Ending_Credits' ],
	'E_Comp_RobMoth':    [ 'show scene #ddaadd with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'comp_rob_moth' }); }, 'Revert': function () {} } }, 'centered Алиса-колонка стала моей мамой. Заботливо. Слишком заботливо.', 'centered КОНЦОВКА: «ALICE-МАМА»', 'centered Лучший родитель — тот, что заряжается.', 'wait 1500', 'jump Ending_Credits' ],
	'E_Comp_PriestIt':   [ 'show scene hell_office with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'comp_priest_it' }); }, 'Revert': function () {} } }, 'centered Священник-айтишник проводит литургию через стрим. Я в комментариях ставлю «амин».', 'centered КОНЦОВКА: «ОНЛАЙН-ЛИТУРГИЯ»', 'centered Лучшая молитва — в чате.', 'wait 1500', 'jump Ending_Credits' ],
	'E_Comp_LovSim':     [ 'show scene #cc88aa with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'comp_lov_sim' }); }, 'Revert': function () {} } }, 'centered Юля — NPC. Я знаю. Она тоже знает. Это лучшее «знаем оба».', 'centered КОНЦОВКА: «NPC-ЛЮБОВЬ»', 'centered Лучшая любовь — между двумя NPC, знающими, что они NPC.', 'wait 1500', 'jump Ending_Credits' ],
	'E_Comp_ChefMath':   [ 'show scene #cc6644 with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'comp_chef_math' }); }, 'Revert': function () {} } }, 'centered Шеф готовит борщ через рекурсию. Каждая ложка — функциональная.', 'centered КОНЦОВКА: «BOR.SCH(BOR.SCH)»', 'centered Лучший рецепт — рекурсивный.', 'wait 1500', 'jump Ending_Credits' ],
	'E_Comp_DadCot':     [ 'show scene #aa5533 with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'comp_dad_cot' }); }, 'Revert': function () {} } }, 'centered Папа сидит в моём котле. Я в его. Мы обмениваемся горячим. По-семейному.', 'centered КОНЦОВКА: «КОТЁЛ-ОБМЕН»', 'centered Лучшая семья — та, что делит огонь.', 'wait 1500', 'jump Ending_Credits' ]

});

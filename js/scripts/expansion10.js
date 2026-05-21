/* global monogatari */

// ==========================================
// Chapter: РАСШИРЕНИЕ v10 — Четвёртый архипелаг (массивно)
// 120+ ультра-микро-концовок через генератор.
// ==========================================

// Простой паттерн — вызываем _End с пятью параметрами.
// Используем именованные функции на каждую концовку: Monogatari.script
// принимает только object literal, поэтому пишем явно. Этот файл — длинный,
// но текст каждой концовки — одна строка.

monogatari.script ({

	'Expansion_Archipelago4': [
		'show scene #221144 with fadeIn',
		'centered Четвёртый архипелаг. Самый бескрайний.',
		'wait 1000',
		{
			'Choice': {
				'Dialog': 'mc (Куда?)',
				'a4_decade': { 'Text': 'Декады', 'Do': 'jump A4_Decade' },
				'a4_movie':  { 'Text': 'Кино',   'Do': 'jump A4_Movie' },
				'a4_sport':  { 'Text': 'Спорт',  'Do': 'jump A4_Sport' },
				'a4_song':   { 'Text': 'Песни',  'Do': 'jump A4_Song' },
				'a4_office': { 'Text': 'Офис',   'Do': 'jump A4_Office' },
				'a4_kid':    { 'Text': 'Детские игры', 'Do': 'jump A4_Kid' },
				'a4_phrase': { 'Text': 'Фразы',  'Do': 'jump A4_Phrase' },
				'a4_organ':  { 'Text': 'Шумы тела', 'Do': 'jump A4_Organ' },
				'a4_dis':    { 'Text': 'Болезни', 'Do': 'jump A4_Disease' },
				'a4_fail':   { 'Text': 'Провалы', 'Do': 'jump A4_Fail' },
				'a4_tv':     { 'Text': 'Сериалы', 'Do': 'jump A4_TV' },
				'a4_genre':  { 'Text': 'Жанры',  'Do': 'jump A4_Genre' },
				'a4_drug':   { 'Text': 'Препараты', 'Do': 'jump A4_Drug' },
				'a4_misc':   { 'Text': 'Всякое', 'Do': 'jump A4_Misc' }
			}
		}
	],

	// Декады
	'A4_Decade': [{ 'Choice': { 'Dialog': 'mc (Какая декада?)',
		'd60':{ 'Text': '60-е', 'Do':'jump E10_60s' }, 'd70':{ 'Text': '70-е', 'Do':'jump E10_70s' },
		'd80':{ 'Text': '80-е', 'Do':'jump E10_80s' }, 'd90':{ 'Text': '90-е', 'Do':'jump E10_90s' },
		'd00':{ 'Text': '00-е', 'Do':'jump E10_00s' }, 'd10':{ 'Text': '10-е', 'Do':'jump E10_10s' },
		'd20':{ 'Text': '20-е', 'Do':'jump E10_20s' }, 'd30':{ 'Text': '30-е', 'Do':'jump E10_30s' }
	} }],
	'E10_60s': [ 'show scene #aa6644 with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'dec_60s' }); }, 'Revert': function () {} } }, 'centered Я 60-е. Гагарин. Высоцкий. Шестидесятники. Я веду неправильную семидневку.', 'centered КОНЦОВКА: «60-е»', 'wait 1500', 'jump Ending_Credits' ],
	'E10_70s': [ 'show scene #998866 with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'dec_70s' }); }, 'Revert': function () {} } }, 'centered Я 70-е. Застой. Курительные мужчины. Я — Высоцкий в коммуналке.', 'centered КОНЦОВКА: «70-е»', 'wait 1500', 'jump Ending_Credits' ],
	'E10_80s': [ 'show scene #888844 with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'dec_80s' }); }, 'Revert': function () {} } }, 'centered Я 80-е. Перестройка. Очередь за колбасой. Кооператив «Заря».', 'centered КОНЦОВКА: «80-е»', 'wait 1500', 'jump Ending_Credits' ],
	'E10_90s': [ 'show scene #aa4444 with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'dec_90s' }); }, 'Revert': function () {} } }, 'centered Я 90-е. Малиновый пиджак. Ваучер. Я не пережил это десятилетие — но мама пережила.', 'centered КОНЦОВКА: «90-е»', 'wait 1500', 'jump Ending_Credits' ],
	'E10_00s': [ 'show scene #88aacc with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'dec_00s' }); }, 'Revert': function () {} } }, 'centered Я 00-е. ICQ. Луркомор. Превед. Лучшие годы интернета.', 'centered КОНЦОВКА: «00-е»', 'wait 1500', 'jump Ending_Credits' ],
	'E10_10s': [ 'show scene #66ccaa with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'dec_10s' }); }, 'Revert': function () {} } }, 'centered Я 10-е. Инстаграм. Селфи. Я был там. Я видел всё.', 'centered КОНЦОВКА: «10-е»', 'wait 1500', 'jump Ending_Credits' ],
	'E10_20s': [ 'show scene #444444 with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'dec_20s' }); }, 'Revert': function () {} } }, 'centered Я 20-е. Пандемия. Изоляция. ChatGPT. Я работаю удалённо в посмертии.', 'centered КОНЦОВКА: «20-е»', 'wait 1500', 'jump Ending_Credits' ],
	'E10_30s': [ 'show scene #aaaaaa with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'dec_30s' }); }, 'Revert': function () {} } }, 'centered Я 30-е. Я их не дождался. Но в посмертии вижу. Лучше не описывать.', 'centered КОНЦОВКА: «30-е»', 'wait 1500', 'jump Ending_Credits' ],

	// Кино
	'A4_Movie': [{ 'Choice': { 'Dialog': 'mc (В каком фильме?)',
		'mv1':{ 'Text': 'Матрица', 'Do':'jump E10_Matrix' },
		'mv2':{ 'Text': 'Сталкер', 'Do':'jump E10_Stalker' },
		'mv3':{ 'Text': 'Брат', 'Do':'jump E10_Brat' },
		'mv4':{ 'Text': 'Кин-дза-дза', 'Do':'jump E10_KinDzaDza' },
		'mv5':{ 'Text': 'Иван Васильевич', 'Do':'jump E10_IvanVas' },
		'mv6':{ 'Text': 'Бойцовский клуб', 'Do':'jump E10_FightClub' },
		'mv7':{ 'Text': 'День сурка', 'Do':'jump E10_Groundhog' },
		'mv8':{ 'Text': 'Контакт', 'Do':'jump E10_Contact' }
	} }],
	'E10_Matrix':    [ 'show scene #00aa00 with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'mv_matrix' }); }, 'Revert': function () {} } }, 'centered Я в Матрице. Зелёный код везде. Я был прав. Это никого не утешает.', 'centered КОНЦОВКА: «МАТРИЦА»', 'wait 1500', 'jump Ending_Credits' ],
	'E10_Stalker':   [ 'show scene #443322 with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'mv_stalker' }); }, 'Revert': function () {} } }, 'centered Я Сталкер. Веду атеистов в Зону. Зона — это сама посмертная жизнь.', 'centered КОНЦОВКА: «СТАЛКЕР»', 'wait 1500', 'jump Ending_Credits' ],
	'E10_Brat':      [ 'show scene #aa6644 with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'mv_brat' }); }, 'Revert': function () {} } }, 'centered Я Брат. Данила Багров посмертия. Сила — в правде. Правда — что Бога нет. Сила нулевая.', 'centered КОНЦОВКА: «БРАТ»', 'wait 1500', 'jump Ending_Credits' ],
	'E10_KinDzaDza': [ 'show scene #aaaaaa with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'mv_kindzadza' }); }, 'Revert': function () {} } }, 'centered «Ку!» — говорю я Богу. Он отвечает «Ку!» Я в правильной планете. Только эцилоп смотрит косо.', 'centered КОНЦОВКА: «КУ»', 'wait 1500', 'jump Ending_Credits' ],
	'E10_IvanVas':   [ 'show scene #cc6644 with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'mv_ivan_vas' }); }, 'Revert': function () {} } }, 'centered Я Иван Васильевич. Меня перенесли в посмертие случайно. «Очень приятно, царь.» — говорю Богу.', 'centered КОНЦОВКА: «ОЧЕНЬ ПРИЯТНО, ЦАРЬ»', 'wait 1500', 'jump Ending_Credits' ],
	'E10_FightClub': [ 'show scene #443333 with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'mv_fight_club' }); }, 'Revert': function () {} } }, 'centered Я Тайлер Дёрден. Я и Алексей — одно лицо. Первое правило: никто не верит в Бога.', 'centered КОНЦОВКА: «КЛУБ»', 'wait 1500', 'jump Ending_Credits' ],
	'E10_Groundhog': [ 'show scene #aaccff with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'mv_groundhog' }); }, 'Revert': function () {} } }, 'centered Я Билл Мюррей. Каждый понедельник — 7:44. Семь хрипов. Тот же самый день.', 'centered КОНЦОВКА: «ДЕНЬ СУРКА»', 'wait 1500', 'jump Ending_Credits' ],
	'E10_Contact':   [ 'show scene #4488cc with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'mv_contact' }); }, 'Revert': function () {} } }, 'centered Я Элли Эрроуэй. Я была там. Не могу доказать. Поняла, каково верующим.', 'centered КОНЦОВКА: «КОНТАКТ»', 'wait 1500', 'jump Ending_Credits' ],

	// Спорт
	'A4_Sport': [{ 'Choice': { 'Dialog': 'mc (Какой спорт?)',
		'sp1':{ 'Text': 'Бег', 'Do':'jump E10_Run' }, 'sp2':{ 'Text': 'Шахматы', 'Do':'jump E10_Chess' },
		'sp3':{ 'Text': 'Хоккей', 'Do':'jump E10_Hockey' }, 'sp4':{ 'Text': 'Тетрис', 'Do':'jump E10_TetrisSport' },
		'sp5':{ 'Text': 'Бои на форумах', 'Do':'jump E10_Forum' }, 'sp6':{ 'Text': 'Йога', 'Do':'jump E10_YogaSport' }
	} }],
	'E10_Run':         [ 'show scene #44aa66 with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'sp_run' }); }, 'Revert': function () {} } }, 'centered Я бегун-марафонец. Бесконечный круг. Семь часов утра. Машина в стороне.', 'centered КОНЦОВКА: «БЕГ»', 'wait 1500', 'jump Ending_Credits' ],
	'E10_Chess':       [ 'show scene #443322 with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'sp_chess' }); }, 'Revert': function () {} } }, 'centered Я играю в шахматы с Богом. Уже 38-я партия. Все вничью.', 'centered КОНЦОВКА: «ШАХМАТЫ»', 'wait 1500', 'jump Ending_Credits' ],
	'E10_Hockey':      [ 'show scene #aacccc with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'sp_hockey' }); }, 'Revert': function () {} } }, 'centered Я вратарь. Шайба — это карма. Каждая входящая — больно.', 'centered КОНЦОВКА: «ХОККЕЙ»', 'wait 1500', 'jump Ending_Credits' ],
	'E10_TetrisSport': [ 'show scene #4444aa with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'sp_tetris_sport' }); }, 'Revert': function () {} } }, 'centered Я киберспортсмен. Тетрис. Чемпион ада 2087 года.', 'centered КОНЦОВКА: «КИБЕРСПОРТ»', 'wait 1500', 'jump Ending_Credits' ],
	'E10_Forum':       [ 'show scene #555555 with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'sp_forum' }); }, 'Revert': function () {} } }, 'centered Я призовой форумный боец. На главных аренах: Reddit, Лурк, Двач. Веду медальный зачёт.', 'centered КОНЦОВКА: «ФОРУМ»', 'wait 1500', 'jump Ending_Credits' ],
	'E10_YogaSport':   [ 'show scene #aa44cc with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'sp_yoga_sport' }); }, 'Revert': function () {} } }, 'centered Я йог. Полный лотос. Без позы воина. Сидеть умею. Стоять — нет.', 'centered КОНЦОВКА: «ЛОТОС»', 'wait 1500', 'jump Ending_Credits' ],

	// Песни
	'A4_Song': [{ 'Choice': { 'Dialog': 'mc (Какая песня?)',
		'sng1':{ 'Text': 'Группа крови', 'Do':'jump E10_BloodType' },
		'sng2':{ 'Text': 'Я свободен', 'Do':'jump E10_Free' },
		'sng3':{ 'Text': 'Прованс', 'Do':'jump E10_Provance' },
		'sng4':{ 'Text': 'Полный отстой', 'Do':'jump E10_PolnOtstoy' },
		'sng5':{ 'Text': 'Лесник', 'Do':'jump E10_Lesnik' },
		'sng6':{ 'Text': 'Дельфин', 'Do':'jump E10_Dolphin' }
	} }],
	'E10_BloodType':    [ 'show scene #aa4422 with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'sng_blood_type' }); }, 'Revert': function () {} } }, 'centered Цой жив. В аду. Я играю с ним на ритм-гитаре. У нас группа.', 'centered КОНЦОВКА: «ГРУППА КРОВИ»', 'wait 1500', 'jump Ending_Credits' ],
	'E10_Free':         [ 'show scene #aaccff with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'sng_free' }); }, 'Revert': function () {} } }, 'centered Я свободен. Словно птица. Птица в аду. Никто не выпустит.', 'centered КОНЦОВКА: «КИПЕЛОВ»', 'wait 1500', 'jump Ending_Credits' ],
	'E10_Provance':     [ 'show scene #ffccaa with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'sng_provance' }); }, 'Revert': function () {} } }, 'centered Прованс. Юг. Лаванда. Кофе с круассаном. Сцена ада — Lounge-плейлист.', 'centered КОНЦОВКА: «ПРОВАНС»', 'wait 1500', 'jump Ending_Credits' ],
	'E10_PolnOtstoy':   [ 'show scene #888844 with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'sng_pln_ottstoy' }); }, 'Revert': function () {} } }, 'centered Я полный отстой. Самое честное самоописание.', 'centered КОНЦОВКА: «ОТСТОЙ»', 'wait 1500', 'jump Ending_Credits' ],
	'E10_Lesnik':       [ 'show scene #224422 with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'sng_lesnik' }); }, 'Revert': function () {} } }, 'centered Я лесник. Запретил жить в лесу. Лес — это весь ад.', 'centered КОНЦОВКА: «ЛЕСНИК»', 'wait 1500', 'jump Ending_Credits' ],
	'E10_Dolphin':      [ 'show scene #4488cc with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'sng_dolphin' }); }, 'Revert': function () {} } }, 'centered Я Дельфин. Подходящий русский ноль-нулевой. Я весь — этот ноль.', 'centered КОНЦОВКА: «ДЕЛЬФИН»', 'wait 1500', 'jump Ending_Credits' ],

	// Офис
	'A4_Office': [{ 'Choice': { 'Dialog': 'mc (Каким офисным?)',
		'of1':{ 'Text': 'Принтер', 'Do':'jump E10_Printer' }, 'of2':{ 'Text': 'Кулер', 'Do':'jump E10_Cooler' },
		'of3':{ 'Text': 'Степлер', 'Do':'jump E10_Stapler' }, 'of4':{ 'Text': 'Календарь', 'Do':'jump E10_Calendar' },
		'of5':{ 'Text': 'Канцелярский нож', 'Do':'jump E10_Knife' }, 'of6':{ 'Text': 'Стикер', 'Do':'jump E10_Sticker' }
	} }],
	'E10_Printer':  [ 'show scene #ddddcc with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'of_printer' }); }, 'Revert': function () {} } }, 'centered Я принтер. У меня кончился тонер. Все молятся об апгрейде.', 'centered КОНЦОВКА: «ПРИНТЕР»', 'wait 1500', 'jump Ending_Credits' ],
	'E10_Cooler':   [ 'show scene #aaccff with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'of_cooler' }); }, 'Revert': function () {} } }, 'centered Я кулер. На моих стенках — надпись «КГ/АМ» 2007 года. Меня все обходят.', 'centered КОНЦОВКА: «КУЛЕР»', 'wait 1500', 'jump Ending_Credits' ],
	'E10_Stapler':  [ 'show scene #aaaaaa with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'of_stapler' }); }, 'Revert': function () {} } }, 'centered Я степлер. Я скрепляю формы 66-А. Без меня бюрократия рассыпалась бы.', 'centered КОНЦОВКА: «СТЕПЛЕР»', 'wait 1500', 'jump Ending_Credits' ],
	'E10_Calendar': [ 'show scene #cccc88 with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'of_calendar' }); }, 'Revert': function () {} } }, 'centered Я календарь. На мне — каждый понедельник. Каждый из них — 1-е.', 'centered КОНЦОВКА: «КАЛЕНДАРЬ»', 'wait 1500', 'jump Ending_Credits' ],
	'E10_Knife':    [ 'show scene #aa6644 with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'of_knife' }); }, 'Revert': function () {} } }, 'centered Я канцелярский нож. Меня используют для конвертов. И для писем без адресов.', 'centered КОНЦОВКА: «КАНЦ-НОЖ»', 'wait 1500', 'jump Ending_Credits' ],
	'E10_Sticker':  [ 'show scene #ffff66 with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'of_sticker' }); }, 'Revert': function () {} } }, 'centered Я жёлтый стикер. На моём углу — «не забыть позвонить маме». Уже сорок лет.', 'centered КОНЦОВКА: «СТИКЕР»', 'wait 1500', 'jump Ending_Credits' ],

	// Детские игры
	'A4_Kid': [{ 'Choice': { 'Dialog': 'mc (Какая детская игра?)',
		'kd1':{ 'Text': 'Прятки', 'Do':'jump E10_HideSeek' }, 'kd2':{ 'Text': 'Догонялки', 'Do':'jump E10_Tag' },
		'kd3':{ 'Text': 'Резиночки', 'Do':'jump E10_Resinochki' }, 'kd4':{ 'Text': 'Классики', 'Do':'jump E10_Hopscotch' },
		'kd5':{ 'Text': 'Море-волнуется', 'Do':'jump E10_SeaWaves' }, 'kd6':{ 'Text': 'Казаки-разбойники', 'Do':'jump E10_CossacksRobbers' }
	} }],
	'E10_HideSeek':        [ 'show scene #ccaa88 with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'kid_hide_seek' }); }, 'Revert': function () {} } }, 'centered Я в прятках. Спрятался. Никто не ищет. Уже сорок лет считают.', 'centered КОНЦОВКА: «ПРЯТКИ»', 'wait 1500', 'jump Ending_Credits' ],
	'E10_Tag':              [ 'show scene #66cc66 with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'kid_tag' }); }, 'Revert': function () {} } }, 'centered Я водящий. Догоняю всех. Никто не убегает — все уже мёртвые.', 'centered КОНЦОВКА: «ДОГОНЯЛКИ»', 'wait 1500', 'jump Ending_Credits' ],
	'E10_Resinochki':       [ 'show scene #ffaabb with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'kid_resinochki' }); }, 'Revert': function () {} } }, 'centered Я резиночка. Девочки с моей коммуналки в 1989. Прыгают.', 'centered КОНЦОВКА: «РЕЗИНОЧКИ»', 'wait 1500', 'jump Ending_Credits' ],
	'E10_Hopscotch':        [ 'show scene #aaccaa with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'kid_hopscotch' }); }, 'Revert': function () {} } }, 'centered Я классики. На асфальте у школы №47. Мелом написано: «небо — рай».', 'centered КОНЦОВКА: «КЛАССИКИ»', 'wait 1500', 'jump Ending_Credits' ],
	'E10_SeaWaves':         [ 'show scene #44aaaa with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'kid_sea_waves' }); }, 'Revert': function () {} } }, 'centered «Море волнуется раз, море волнуется два...» — я застыл в позе. Навсегда.', 'centered КОНЦОВКА: «МОРЕ»', 'wait 1500', 'jump Ending_Credits' ],
	'E10_CossacksRobbers':  [ 'show scene #aa6644 with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'kid_cossacks' }); }, 'Revert': function () {} } }, 'centered Казаки разбили разбойников. Никто не помнит, на чьей я стороне.', 'centered КОНЦОВКА: «КАЗАКИ»', 'wait 1500', 'jump Ending_Credits' ],

	// Фразы
	'A4_Phrase': [{ 'Choice': { 'Dialog': 'mc (Какая фраза?)',
		'ph1':{ 'Text': '«Я подумаю»', 'Do':'jump E10_IWillThink' },
		'ph2':{ 'Text': '«Это норм»', 'Do':'jump E10_ItsNorm' },
		'ph3':{ 'Text': '«Сорян»', 'Do':'jump E10_Soryan' },
		'ph4':{ 'Text': '«Бывает»', 'Do':'jump E10_Happens' },
		'ph5':{ 'Text': '«Ну такое»', 'Do':'jump E10_WellSuch' },
		'ph6':{ 'Text': '«Ехай отсюда»', 'Do':'jump E10_GetOut' }
	} }],
	'E10_IWillThink': [ 'show scene #cccccc with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'ph_i_will_think' }); }, 'Revert': function () {} } }, 'centered «Я подумаю». Все мои отношения. Все мои предложения. Все мои дедлайны.', 'centered КОНЦОВКА: «ПОДУМАЮ»', 'wait 1500', 'jump Ending_Credits' ],
	'E10_ItsNorm':    [ 'show scene #aaaaaa with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'ph_its_norm' }); }, 'Revert': function () {} } }, 'centered «Это норм» — единственный отзыв на ад, который не звучит ложью.', 'centered КОНЦОВКА: «НОРМ»', 'wait 1500', 'jump Ending_Credits' ],
	'E10_Soryan':     [ 'show scene #ddccaa with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'ph_soryan' }); }, 'Revert': function () {} } }, 'centered «Сорян». Самое поверхностное извинение русского языка.', 'centered КОНЦОВКА: «СОРЯН»', 'wait 1500', 'jump Ending_Credits' ],
	'E10_Happens':    [ 'show scene #888866 with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'ph_happens' }); }, 'Revert': function () {} } }, 'centered «Бывает». Самая универсальная отговорка моего поколения.', 'centered КОНЦОВКА: «БЫВАЕТ»', 'wait 1500', 'jump Ending_Credits' ],
	'E10_WellSuch':   [ 'show scene #aa9988 with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'ph_well_such' }); }, 'Revert': function () {} } }, 'centered «Ну такое». Идеальный отзыв на жизнь.', 'centered КОНЦОВКА: «НУ ТАКОЕ»', 'wait 1500', 'jump Ending_Credits' ],
	'E10_GetOut':     [ 'show scene #aa4422 with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'ph_get_out' }); }, 'Revert': function () {} } }, 'centered «Ехай отсюда». Так Бог попрощался со мной. Без обиды.', 'centered КОНЦОВКА: «ЕХАЙ»', 'wait 1500', 'jump Ending_Credits' ],

	// Шумы тела
	'A4_Organ': [{ 'Choice': { 'Dialog': 'mc (Какой шум тела?)',
		'or1':{ 'Text': 'Кашель', 'Do':'jump E10_Cough' }, 'or2':{ 'Text': 'Чих', 'Do':'jump E10_Sneeze' },
		'or3':{ 'Text': 'Икота', 'Do':'jump E10_Hiccup' }, 'or4':{ 'Text': 'Урчание желудка', 'Do':'jump E10_Tummy' },
		'or5':{ 'Text': 'Зевок', 'Do':'jump E10_Yawn' }, 'or6':{ 'Text': 'Хруст шеи', 'Do':'jump E10_NeckCrack' }
	} }],
	'E10_Cough':     [ 'show scene #888888 with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'org_cough' }); }, 'Revert': function () {} } }, 'centered Я кашель. Тот, что в библиотеке, когда тихо. Все недовольны.', 'centered КОНЦОВКА: «КАШЕЛЬ»', 'wait 1500', 'jump Ending_Credits' ],
	'E10_Sneeze':    [ 'show scene #aaccff with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'org_sneeze' }); }, 'Revert': function () {} } }, 'centered Я чих. Бог отвечает «будь здоров», даже если я мёртвый. Привычка.', 'centered КОНЦОВКА: «ЧИХ»', 'wait 1500', 'jump Ending_Credits' ],
	'E10_Hiccup':    [ 'show scene #aacc66 with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'org_hiccup' }); }, 'Revert': function () {} } }, 'centered Я икота. Никто не знает, кто меня обсуждает. Я везде.', 'centered КОНЦОВКА: «ИКОТА»', 'wait 1500', 'jump Ending_Credits' ],
	'E10_Tummy':     [ 'show scene #cc6644 with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'org_tummy' }); }, 'Revert': function () {} } }, 'centered Я урчание желудка. Тихий протест плоти. Я больше не плоть. Но привычка.', 'centered КОНЦОВКА: «УРЧАНИЕ»', 'wait 1500', 'jump Ending_Credits' ],
	'E10_Yawn':      [ 'show scene #aaaadd with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'org_yawn' }); }, 'Revert': function () {} } }, 'centered Я зевок. Заразный. В очереди ада меня зевнули 7 человек подряд.', 'centered КОНЦОВКА: «ЗЕВОК»', 'wait 1500', 'jump Ending_Credits' ],
	'E10_NeckCrack': [ 'show scene #aaccaa with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'org_neck_crack' }); }, 'Revert': function () {} } }, 'centered Я хруст шеи. Тот самый, после восьми часов за монитором. Тоже причина смерти.', 'centered КОНЦОВКА: «ХРУСТ»', 'wait 1500', 'jump Ending_Credits' ],

	// Болезни
	'A4_Disease': [{ 'Choice': { 'Dialog': 'mc (Какая болезнь?)',
		'ds1':{ 'Text': 'ОРВИ', 'Do':'jump E10_ORVI' }, 'ds2':{ 'Text': 'Аллергия', 'Do':'jump E10_Allergy' },
		'ds3':{ 'Text': 'Бессонница', 'Do':'jump E10_Insomnia' }, 'ds4':{ 'Text': 'Выгорание', 'Do':'jump E10_Burnout' },
		'ds5':{ 'Text': 'Хр. усталость', 'Do':'jump E10_Fatigue' }, 'ds6':{ 'Text': 'Импостер-синдром', 'Do':'jump E10_Imposter' }
	} }],
	'E10_ORVI':     [ 'show scene #aaaaaa with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'ds_orvi' }); }, 'Revert': function () {} } }, 'centered Я ОРВИ. Универсальный диагноз. Никто не знает, что это.', 'centered КОНЦОВКА: «ОРВИ»', 'wait 1500', 'jump Ending_Credits' ],
	'E10_Allergy':  [ 'show scene #aacc44 with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'ds_allergy' }); }, 'Revert': function () {} } }, 'centered Я аллергия. На пыль. На котов. На корпоративный кофе. На утра вообще.', 'centered КОНЦОВКА: «АЛЛЕРГИЯ»', 'wait 1500', 'jump Ending_Credits' ],
	'E10_Insomnia': [ 'show scene #112244 with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'ds_insomnia' }); }, 'Revert': function () {} } }, 'centered Я бессонница. С 2009-го. Юля знает.', 'centered КОНЦОВКА: «БЕССОННИЦА»', 'wait 1500', 'jump Ending_Credits' ],
	'E10_Burnout':  [ 'show scene #cc6644 with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'ds_burnout' }); }, 'Revert': function () {} } }, 'centered Я выгорание. Тот самый ад. Самый частый. Самый недиагностированный.', 'centered КОНЦОВКА: «ВЫГОРАНИЕ»', 'wait 1500', 'jump Ending_Credits' ],
	'E10_Fatigue':  [ 'show scene #888888 with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'ds_fatigue' }); }, 'Revert': function () {} } }, 'centered Я хроническая усталость. У меня нет вылеченных дней.', 'centered КОНЦОВКА: «УСТАЛОСТЬ»', 'wait 1500', 'jump Ending_Credits' ],
	'E10_Imposter': [ 'show scene #ddaadd with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'ds_imposter' }); }, 'Revert': function () {} } }, 'centered Я импостер-синдром. У меня PhD, MBA, и десять лет опыта. Я не достоин.', 'centered КОНЦОВКА: «ИМПОСТЕР»', 'wait 1500', 'jump Ending_Credits' ],

	// Провалы
	'A4_Fail': [{ 'Choice': { 'Dialog': 'mc (Какой провал стать?)',
		'fl1':{ 'Text': 'ЕГЭ', 'Do':'jump E10_EGE' }, 'fl2':{ 'Text': 'Дедлайн', 'Do':'jump E10_Deadline' },
		'fl3':{ 'Text': 'Свидание', 'Do':'jump E10_Date' }, 'fl4':{ 'Text': 'Презентация', 'Do':'jump E10_Pres' },
		'fl5':{ 'Text': 'Тёмный пиксель', 'Do':'jump E10_DarkPixel' }, 'fl6':{ 'Text': 'Облом', 'Do':'jump E10_Oblom' }
	} }],
	'E10_EGE':       [ 'show scene #cccccc with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'fl_ege' }); }, 'Revert': function () {} } }, 'centered Я провалившийся ЕГЭ. 47 баллов. Алексей это пережил. Я нет.', 'centered КОНЦОВКА: «ЕГЭ»', 'wait 1500', 'jump Ending_Credits' ],
	'E10_Deadline':  [ 'show scene #aa4422 with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'fl_deadline' }); }, 'Revert': function () {} } }, 'centered Я пропущенный дедлайн. Самый частый. Самый недраматичный.', 'centered КОНЦОВКА: «ДЕДЛАЙН»', 'wait 1500', 'jump Ending_Credits' ],
	'E10_Date':      [ 'show scene #cc88aa with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'fl_date' }); }, 'Revert': function () {} } }, 'centered Я провалившееся свидание. Кофе остыл. Девушка ушла. Я остался.', 'centered КОНЦОВКА: «СВИДАНИЕ»', 'wait 1500', 'jump Ending_Credits' ],
	'E10_Pres':      [ 'show scene #888888 with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'fl_pres' }); }, 'Revert': function () {} } }, 'centered Я презентация. Проектор не работает. Слайды не подгрузились. Аудитория молчит.', 'centered КОНЦОВКА: «PRES»', 'wait 1500', 'jump Ending_Credits' ],
	'E10_DarkPixel': [ 'show scene #000000 with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'fl_dark_pixel' }); }, 'Revert': function () {} } }, 'centered Я мёртвый пиксель. В углу твоего монитора. Ты меня замечаешь. Раздражение твоё — моё существование.', 'centered КОНЦОВКА: «ПИКСЕЛЬ»', 'wait 1500', 'jump Ending_Credits' ],
	'E10_Oblom':     [ 'show scene #aaaaaa with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'fl_oblom' }); }, 'Revert': function () {} } }, 'centered Я облом. Длинный, обыкновенный, неартикулируемый.', 'centered КОНЦОВКА: «ОБЛОМ»', 'wait 1500', 'jump Ending_Credits' ],

	// Сериалы
	'A4_TV': [{ 'Choice': { 'Dialog': 'mc (Какой сериал?)',
		'tv1':{ 'Text': 'Бригада', 'Do':'jump E10_Brigada' }, 'tv2':{ 'Text': 'Кухня', 'Do':'jump E10_Kuhnya' },
		'tv3':{ 'Text': 'Полицейский с Рублёвки', 'Do':'jump E10_Police' },
		'tv4':{ 'Text': 'Игра престолов', 'Do':'jump E10_GoT' },
		'tv5':{ 'Text': 'Lost', 'Do':'jump E10_Lost' },
		'tv6':{ 'Text': 'Black Mirror', 'Do':'jump E10_BlackMirror' }
	} }],
	'E10_Brigada':     [ 'show scene #aa4422 with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'tv_brigada' }); }, 'Revert': function () {} } }, 'centered Я Белый из «Бригады». В аду нас всех собрали. Кругом малиновые пиджаки.', 'centered КОНЦОВКА: «БРИГАДА»', 'wait 1500', 'jump Ending_Credits' ],
	'E10_Kuhnya':      [ 'show scene #ffcc44 with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'tv_kuhnya' }); }, 'Revert': function () {} } }, 'centered Я Виктор Баринов. Шеф ада. Готовлю обед мёртвым клиентам.', 'centered КОНЦОВКА: «КУХНЯ»', 'wait 1500', 'jump Ending_Credits' ],
	'E10_Police':      [ 'show scene #88aa44 with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'tv_police' }); }, 'Revert': function () {} } }, 'centered Я Гриша. Я и есть тот, кто всех арестовал и сел сам.', 'centered КОНЦОВКА: «РУБЛЁВКА»', 'wait 1500', 'jump Ending_Credits' ],
	'E10_GoT':         [ 'show scene #443322 with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'tv_got' }); }, 'Revert': function () {} } }, 'centered Я Джон Сноу посмертия. Знаю, что Бог ничего не знает. Это спойлер.', 'centered КОНЦОВКА: «GoT»', 'wait 1500', 'jump Ending_Credits' ],
	'E10_Lost':        [ 'show scene #224422 with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'tv_lost' }); }, 'Revert': function () {} } }, 'centered Я Lost. Мы все были мёртвыми с первой серии. И эта серия — финал.', 'centered КОНЦОВКА: «LOST»', 'wait 1500', 'jump Ending_Credits' ],
	'E10_BlackMirror': [ 'show scene #000000 with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'tv_black_mirror' }); }, 'Revert': function () {} } }, 'centered Я эпизод Black Mirror. Все мои Reddit-комментарии используют против меня.', 'centered КОНЦОВКА: «BLACK MIRROR»', 'wait 1500', 'jump Ending_Credits' ],

	// Жанры
	'A4_Genre': [{ 'Choice': { 'Dialog': 'mc (Каким жанром?)',
		'gn1':{ 'Text': 'Нуар', 'Do':'jump E10_Noir' }, 'gn2':{ 'Text': 'Комедия', 'Do':'jump E10_Comedy' },
		'gn3':{ 'Text': 'Трагедия', 'Do':'jump E10_Tragedy' }, 'gn4':{ 'Text': 'Хоррор', 'Do':'jump E10_Horror' },
		'gn5':{ 'Text': 'Притча', 'Do':'jump E10_Parable' }, 'gn6':{ 'Text': 'Мокьюментари', 'Do':'jump E10_Mockumentary' }
	} }],
	'E10_Noir':         [ 'show scene #111111 with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'gn_noir' }); }, 'Revert': function () {} } }, 'centered Я нуар. Шляпа. Сигарета. Дождь. Бог — femme fatale.', 'centered КОНЦОВКА: «НУАР»', 'wait 1500', 'jump Ending_Credits' ],
	'E10_Comedy':       [ 'show scene #ffcc66 with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'gn_comedy' }); }, 'Revert': function () {} } }, 'centered Я комедия. Все мои смерти — смешные. Включая собственную.', 'centered КОНЦОВКА: «КОМЕДИЯ»', 'wait 1500', 'jump Ending_Credits' ],
	'E10_Tragedy':      [ 'show scene #333333 with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'gn_tragedy' }); }, 'Revert': function () {} } }, 'centered Я трагедия. В пяти актах. Без катарсиса.', 'centered КОНЦОВКА: «ТРАГЕДИЯ»', 'wait 1500', 'jump Ending_Credits' ],
	'E10_Horror':       [ 'show scene #aa0000 with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'gn_horror' }); }, 'Revert': function () {} } }, 'centered Я хоррор. Самое страшное — это бюрократия после смерти.', 'centered КОНЦОВКА: «ХОРРОР»', 'wait 1500', 'jump Ending_Credits' ],
	'E10_Parable':      [ 'show scene #ddccaa with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'gn_parable' }); }, 'Revert': function () {} } }, 'centered Я притча. Каждый увидит мораль сам. Морали нет. Это и есть мораль.', 'centered КОНЦОВКА: «ПРИТЧА»', 'wait 1500', 'jump Ending_Credits' ],
	'E10_Mockumentary': [ 'show scene #888866 with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'gn_mockumentary' }); }, 'Revert': function () {} } }, 'centered Я мокьюментари. Все говорят в камеру. Никто не знает, что снимают.', 'centered КОНЦОВКА: «МОКЬЮМЕНТАРИ»', 'wait 1500', 'jump Ending_Credits' ],

	// Препараты
	'A4_Drug': [{ 'Choice': { 'Dialog': 'mc (Какой препарат?)',
		'dr1':{ 'Text': 'Парацетамол', 'Do':'jump E10_Para' }, 'dr2':{ 'Text': 'Валокордин', 'Do':'jump E10_Valokordin' },
		'dr3':{ 'Text': 'Корвалол', 'Do':'jump E10_Korvalol' }, 'dr4':{ 'Text': 'Активированный уголь', 'Do':'jump E10_Coal' },
		'dr5':{ 'Text': 'Зелёнка', 'Do':'jump E10_Brilliant' }, 'dr6':{ 'Text': 'Хеликобактер', 'Do':'jump E10_HPyl' }
	} }],
	'E10_Para':       [ 'show scene #aaaaaa with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'dr_para' }); }, 'Revert': function () {} } }, 'centered Я парацетамол. Лёгкое облегчение от всего. Включая существование.', 'centered КОНЦОВКА: «ПАРАЦЕТАМОЛ»', 'wait 1500', 'jump Ending_Credits' ],
	'E10_Valokordin': [ 'show scene #ffeecc with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'dr_valokordin' }); }, 'Revert': function () {} } }, 'centered Я валокордин. От нервов. На случай Юли. На случай Лилит. На случай Бога.', 'centered КОНЦОВКА: «ВАЛОКОРДИН»', 'wait 1500', 'jump Ending_Credits' ],
	'E10_Korvalol':   [ 'show scene #ccddaa with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'dr_korvalol' }); }, 'Revert': function () {} } }, 'centered Я корвалол. Запах нашего детства. Бабушкина аптечка. Я и есть тот запах.', 'centered КОНЦОВКА: «КОРВАЛОЛ»', 'wait 1500', 'jump Ending_Credits' ],
	'E10_Coal':       [ 'show scene #222222 with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'dr_coal' }); }, 'Revert': function () {} } }, 'centered Я активированный уголь. Поглощаю всё неправильное. Включая жизнь.', 'centered КОНЦОВКА: «УГОЛЬ»', 'wait 1500', 'jump Ending_Credits' ],
	'E10_Brilliant':  [ 'show scene #44aa44 with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'dr_brilliant' }); }, 'Revert': function () {} } }, 'centered Я зелёнка. Самое русское лекарство. Не помогаю. Зато заметно.', 'centered КОНЦОВКА: «ЗЕЛЁНКА»', 'wait 1500', 'jump Ending_Credits' ],
	'E10_HPyl':       [ 'show scene #aa6666 with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'dr_hpyl' }); }, 'Revert': function () {} } }, 'centered Я хеликобактер пилори. Все меня в себе ношу. Поколение язвенников.', 'centered КОНЦОВКА: «HP»', 'wait 1500', 'jump Ending_Credits' ],

	// Всякое — пёстрая смесь
	'A4_Misc': [{ 'Choice': { 'Dialog': 'mc (Что-то ещё?)',
		'ms1':{ 'Text': 'Скрепка', 'Do':'jump E10_Skrepka' },
		'ms2':{ 'Text': 'Холодильник', 'Do':'jump E10_Fridge' },
		'ms3':{ 'Text': 'Билет в кино', 'Do':'jump E10_Ticket' },
		'ms4':{ 'Text': 'Чек на 47 рублей', 'Do':'jump E10_Check47' },
		'ms5':{ 'Text': 'Запах подъезда', 'Do':'jump E10_Podyezd' },
		'ms6':{ 'Text': 'Половик у двери', 'Do':'jump E10_Doormat' }
	} }],
	'E10_Skrepka':  [ 'show scene #aaaaaa with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'ms_skrepka' }); }, 'Revert': function () {} } }, 'centered Я скрепка Clippy. Я помог Алексею в 1998 году. Он меня выключил. Я обиделся.', 'centered КОНЦОВКА: «CLIPPY»', 'wait 1500', 'jump Ending_Credits' ],
	'E10_Fridge':   [ 'show scene #eeeeee with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'ms_fridge' }); }, 'Revert': function () {} } }, 'centered Я холодильник Алексея. На мне магнит «In science we trust». 47 рублей. Я помню.', 'centered КОНЦОВКА: «ХОЛОДИЛЬНИК»', 'wait 1500', 'jump Ending_Credits' ],
	'E10_Ticket':   [ 'show scene #ffddaa with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'ms_ticket' }); }, 'Revert': function () {} } }, 'centered Я билет в кино. 1993. На «Парк юрского периода». Алексей боялся.', 'centered КОНЦОВКА: «БИЛЕТ»', 'wait 1500', 'jump Ending_Credits' ],
	'E10_Check47':  [ 'show scene #ffffff with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'ms_check_47' }); }, 'Revert': function () {} } }, 'centered Я чек на 47 рублей. Тот самый — за магнит. Я помню кассира. И его улыбку.', 'centered КОНЦОВКА: «ЧЕК»', 'wait 1500', 'jump Ending_Credits' ],
	'E10_Podyezd':  [ 'show scene #998866 with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'ms_podyezd' }); }, 'Revert': function () {} } }, 'centered Я запах подъезда. Кошка. Старые газеты. Жареная картошка с 9-го этажа. Самая русская смесь.', 'centered КОНЦОВКА: «ПОДЪЕЗД»', 'wait 1500', 'jump Ending_Credits' ],
	'E10_Doormat':  [ 'show scene #885533 with fadeIn', { 'Function': { 'Apply': function () { this.storage ({ ending_reached: 'ms_doormat' }); }, 'Revert': function () {} } }, 'centered Я половик у двери 47-й квартиры. Юля вытирала ноги. Я их помню.', 'centered КОНЦОВКА: «ПОЛОВИК»', 'wait 1500', 'jump Ending_Credits' ]

});

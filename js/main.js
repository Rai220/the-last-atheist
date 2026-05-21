'use strict';
/* global Monogatari, monogatari */

const { $_ready, $_ } = Monogatari;

// Все концовки для трекера
const ALL_ENDINGS = {
	// ★ Major endings
	'matrix': '★ Контакт',
	'beta_tester': '★ Бета-тестер',
	'prophet': '★ Пророк',
	'full_circle': '★ Полный круг',
	'lilith_betrayal': '★ Персональный пакет',
	'lilith_conflicted': '★ Перевод',
	'hell_romance': '★ Ад вдвоём',
	'escape_together': '★ Служебный выход',
	'therapist': '★ Терапевт',
	'archivist': '★ Архивариус',
	'witness': '★ Свидетель',
	'last_call': '★ Последний звонок',
	'empty_throne': '★ Пустой престол',
	'i_am_the_bug': '★ Я — баг',
	// Regular endings
	'believer': 'Обращённый',
	'pascal': 'Пари Паскаля',
	'theologian': 'Теолог',
	'rebellion': 'Революция',
	'hacker': 'Хакер',
	'democracy': 'Демократия',
	'appeal': 'Прецедент',
	'bar': 'Последний бар',
	'franchise': 'Франшиза',
	'awakening': 'Пробуждение',
	'dev_commentary': 'README.md',
	'anon_from_hell': 'Аноним из ада',
	'control_group': 'Контрольная группа',
	'alice_log': 'Лог Алисы',
	'alice_silent': 'Тишина Алисы',
	'nihilist': 'Ничто',
	// Quick endings
	'loophole': 'Лазейка',
	'demon_friend': 'Коллега',
	'glitch': 'Глитч',
	'debate_win': 'Аргумент',
	'speedrun': 'Спидран',
	'escape_caught': 'Пойманы',
	'cauldron_eternal': 'Вечный котёл',
	'sisyphus': 'Сизиф',
	'viktor_hack': 'sudo rm pain',
	'viktor_freedom': 'DROP TABLE sinners',

	// Expansion Pack v1 — Cafeteria, Library, Union, Helpdesk, Group, Child, Father, Maintenance, Inna
	'hell_chef': 'Ризотто',
	'cafeteria_leader': 'Клуб у окна',
	'library_read': 'Архив запоздалого чтения',
	'letter_to_sergey': 'Ответ Серёже',
	'father_reply': 'Тетрадь',
	'unspoken_prayers': '★ Невысказанные',
	'hell_strike': '★ Забастовка ада',
	'demon_lawsuit': 'Иск против Всемогущего',
	'great_union': 'Великое объединение',
	'demon_pension': 'Пенсия в лимбе',
	'hard_reset': '★ Hard Reset',
	'logs_reader': 'Почтальон',
	'pull_request': '★ Pull Request',
	'truth_group': 'Терапия уверенности',
	'atheist_therapist': 'Терапевт ада',
	'atheist_stay': 'В кругу',
	'child_keep': '★ Усыновление',
	'child_saved': 'Открытая дверь',
	'family_hell': 'Семья в аду',
	'father_son': '★ Мастерская',
	'father_escape': 'Команда Волковых',
	'dev_maintenance': '★ Кофе с разработчиком',
	'eula_reader': 'RTFM',
	'removed': 'Удалён',
	'dev_colleague': 'SELECT *',
	'inna_romance': '★ Инна',
	'inna_forgive': 'Не моя вина',
	'inna_revolt': 'Рассылка в 23:00',

	// Expansion Pack v2 — судебные хуки и микроконцовки
	'settlement_small': 'Досудебка',
	'settlement_large': 'Профилактика',
	'settlement_meta': '★ Мета-апелляция',
	'witness_self': '★ Свидетель против себя',
	'savepoint': 'git stash',
	'father_defense': '★ Поручительство',
	'sergey_defense': '★ Год на Серёжу',
	'reddit_defense': 'Mod powers',
	'past_self_defense': '★ Поздняя молитва',
	'teapot': 'I\'m a teapot',
	'soul_not_found': '404',
	'stack_overflow': 'Stack Overflow',
	'kernel_panic': 'Kernel Panic',
	'golden_rule': '★ Golden Rule',
	'out_of_memory': 'OOM',
	'git_blame': 'git blame',

	// Expansion Pack v3 — Бар Бориса, встречи, цикл, Аня
	'bar_guitar': '★ Ученик Семёна',
	'bar_franchise2': 'Сеть «*-Атеист»',
	'anya_forgiven': '★ Прощение Ани',
	'anya_love': '★ Continuous',
	'anya_together': '★ Длинная очередь любви',
	'loop_broken': 'Бездействие',
	'accepted_loop': 'Принятый цикл',
	'loop_complete': '★ Все двери',
	'speedrun_master': 'any% rec',

	// Expansion Pack v4 — Босс, Саган, Подписка, Программист, Just Lilith
	'sagan_guide': '★ Ученик Сагана',
	'pale_blue_dot': '★ Pale Blue Dot',
	'cosmos_afterlife': 'Космос 2',
	'bog_premium': 'Bog Premium',
	'free_user': 'Freemium',
	'unsubscribe_preemptive': 'Preemptive unsub',
	'programmer_rebel': '★ Вышел из симуляции',
	'refactor_self': '★ Рефакторинг себя',
	'v1_forever': 'V1 forever',
	'just_lilith_alt': '★ Just Lilith',

	// Expansion Pack v5 — Юля, бабка, комбинаторные
	'yulia_together': '★ Кухня Юли',
	'yulia_forget': 'Забыть остальное',
	'yulia_47': 'Вариант 47',
	'yulia_48': '★ Вариант 48',
	'yulia_zero': 'Вариант 0',
	'yulia_kitchen': 'Отражение',
	'yulia_quiet': 'Мусорный пакет',
	'yulia_forgive': 'Право знать',
	'yulia_blame': 'Поздно',
	'yulia_infinite': '★ Без обратного отсчёта',
	'neighbor_curse_breaker': '★ Разрыв проклятия',
	'neighbor_hell_romance': '★ Ад всемером',
	'granny_leader': 'Правда шва',
	'granny_archive': '47 томов правды',
	'granny_missed': 'Шва не видно',
	'granny_oracle': 'Оракул-бабка',
	'granny_takeover': '★ Бабка у руля',
	'sisterhood': '★ Сестринство',
	'manifesto': '★ Манифест',
	'max_empathy': '★ Max Empathy',
	'max_cruelty': 'Max Cruelty',
	'max_humor': 'Max Humor',
	'max_rebellion': 'Max Rebellion',
	'max_acceptance': '★ Max Acceptance',
	'low_life': 'Low Life',
	'max_lilith_trust': 'Контракт с Лилит',
	'all_stats': '★ All Stats Max',
	'low_all': 'Без отпечатка',
	'double_agent': '★ Двойной агент',
	'no_verdict': 'Без вердикта',

	// Expansion Pack v6 — Колесо RNG (24) + комбинаторные + секретные
	'wheel_fish_tank': 'Аквариум',
	'wheel_cosplayer': 'Косплей',
	'wheel_crypto': 'Grief-coin',
	'wheel_yoga': 'Шавасана',
	'wheel_drone_swarm': 'Улей',
	'wheel_bookshop': 'Лавка ненаписанного',
	'wheel_garage': 'Гараж',
	'wheel_taxi': 'Такси',
	'wheel_post_office': 'Почта',
	'wheel_bakery': 'Пироги опоздавших',
	'wheel_subway': 'Кольцевая',
	'wheel_helpline': 'Телефон доверия',
	'wheel_lighthouse': 'Маяк',
	'wheel_night_owl': 'Сова',
	'wheel_time_keeper': 'Хранитель часов',
	'wheel_cartographer': 'Картограф',
	'wheel_beekeeper': 'Пасечник',
	'wheel_curator': 'Музей',
	'wheel_translator': 'Переводчик',
	'wheel_watchman': 'Стражник',
	'wheel_florist': 'Флорист',
	'wheel_mechanic': 'Механик сердец',
	'wheel_astronomer': 'Астроном',
	'wheel_conductor': 'Дирижёр',
	'dark_path': 'Тёмный путь',
	'light_path': '★ Светлый путь',
	'trickster': '★ Трикстер',
	'lonely_monk': 'Монах-атеист',
	'puzzle_solver': '★ 100%',
	'bug_collector': 'Bug Bounty',
	'lore_master': '★ Lore-мастер',
	'no_reset': 'Без сброса',
	'all_skipped': 'Skip All',

	// Expansion Pack v7 — Архипелаг (10 островов × 6-10 концовок)
	// Мемы
	'meme_rickroll': 'Рикролл', 'meme_doge': 'Much Wow', 'meme_pepe': 'Feels Bad',
	'meme_fine': 'This Is Fine', 'meme_distracted': 'Отвлёкся',
	'meme_galaxy_brain': 'Galaxy Brain', 'meme_wojak': 'Feels Guy', 'meme_preved': 'Превед-2007',
	// Профессии
	'pro_sysadmin': 'Hell Engine v2', 'pro_manager': 'Middle Manager', 'pro_cashier': 'Касса 7',
	'pro_teacher': 'Учитель', 'pro_doctor': 'Терапевт', 'pro_cop': 'Гаишник',
	'pro_janitor': 'Уборщик', 'pro_judge': 'Секретарь', 'pro_streamer': 'Стример', 'pro_philosopher': 'PhD',
	// Мифы
	'myth_orpheus': '★ Орфей', 'myth_prometheus': 'Прометей IT', 'myth_narcissus': 'Нарцисс-38',
	'myth_tantalus': 'Пирог Тантала', 'myth_icarus': 'Икар', 'myth_minotaur': 'Минотавр',
	'myth_persephone': 'Персефона 6/6', 'myth_ouroboros': 'Уроборос',
	// Еда
	'food_borsch': 'Борщ', 'food_pelmeni': '★ Пельмени с мамой', 'food_pirog': '★ Субботний пирог',
	'food_doshik': 'Доширак', 'food_olivier': 'Оливье', 'food_tea': 'Чай', 'food_vodka': 'Водка', 'food_kvass': 'Квас-91',
	// Математика
	'math_liar': 'Лжец', 'math_russell': 'Russell', 'math_sorites': 'Куча',
	'math_monty': 'Monty Hall', 'math_zeno': 'Зенон', 'math_godel': 'Гёдель',
	'math_cantor': 'Cantor', 'math_turing': '★ Turing Test',
	// Предметы
	'thing_spoon': 'Ложка', 'thing_lamp': 'Лампа', 'thing_door': 'Дверь 47',
	'thing_mirror': 'Зеркало', 'thing_usb': 'USB', 'thing_clock': 'Часы',
	'thing_book': 'Книга', 'thing_pencil': 'Карандаш',
	// Литература
	'lit_dosto': 'Достоевский', 'lit_tolstoy': 'Толстой', 'lit_chekhov': 'Чехов',
	'lit_bulgakov': 'Булгаков', 'lit_kafka': 'Кафка', 'lit_borges': '★ Борхес',
	// Музыка
	'music_classic': 'Шостакович', 'music_jazz': 'Джаз', 'music_rock': '★ Семь хрипов',
	'music_rap': 'Баттл', 'music_silence': '4\'33\'\'', 'music_morse': 'Морзе',
	// Погода
	'weather_rain': 'Дождь', 'weather_snow': 'Снег', 'weather_fog': 'Туман',
	'weather_sun': 'Солнце', 'weather_wind': 'Ветер', 'weather_storm': '★ Гроза 2003',
	// Мета
	'meta_4thwall': '★ 4-я стена', 'meta_menu': 'Main Menu', 'meta_save': 'Save File',
	'meta_cheat': 'IDDQD', 'meta_dev_mode': 'Dev Mode', 'meta_unlock': '★ Unlock All',

	// Expansion Pack v8 — Второй архипелаг (14 групп ~90 концовок)
	'num_0': '0', 'num_1': '1', 'num_2': '2', 'num_3': '3', 'num_7': '★ Семь хрипов',
	'num_13': '13', 'num_42': '42', 'num_666': '666', 'num_1984': '1984', 'num_7394': '7394028417',
	'hist_pushkin': 'Пушкин', 'hist_lenin': 'Ленин', 'hist_stalin': 'Сталин',
	'hist_gagarin': 'Гагарин', 'hist_chaikov': 'Чайковский', 'hist_perelman': 'Пуанкаре',
	'hist_glushkov': 'ОГАС', 'hist_lobachev': 'Лобачевский',
	'animal_cat': 'Кот', 'animal_dog': 'Собака', 'animal_owl': 'Сова', 'animal_fox': 'Лиса',
	'animal_bear': 'Медведь', 'animal_fish': 'Рыба', 'animal_wolf': 'Волк', 'animal_bee': 'Пчела',
	'color_red': 'Красный', 'color_blue': 'Синий', 'color_green': 'Зелёный', 'color_yellow': 'Жёлтый',
	'color_white': 'Белый', 'color_black': 'Чёрный', 'color_grey': 'Серый', 'color_violet': 'Фиолетовый',
	'body_heart': '★ Сердце', 'body_brain': 'Мозг в банке', 'body_lung': 'Лёгкое', 'body_skin': 'Кожа',
	'body_eye': 'Глаз', 'body_ear': 'Ухо', 'body_finger': 'Указательный', 'body_bone': 'Кость',
	'letter_a': 'А', 'letter_ya': 'Я', 'letter_o': 'О', 'letter_j': 'Ж',
	'letter_tvrd': 'Ъ', 'letter_yo': 'Ё', 'letter_omega': 'Ω', 'letter_alpha': 'α',
	'sound_click': 'Щелчок', 'sound_buzz': 'Зуммер', 'sound_whisper': 'Шёпот',
	'sound_thunder': 'Гром', 'sound_chime': 'Колокольчик', 'sound_dial': 'Гудок',
	'smell_coffee': 'Кофе', 'smell_paper': 'Бумага', 'smell_rain': 'Асфальт-дождь',
	'smell_workshop': 'Мастерская', 'smell_dust': 'Пыль', 'smell_bread': 'Хлеб',
	'time_dawn': 'Рассвет', 'time_0744': '★ 7:44', 'time_noon': 'Полдень',
	'time_dusk': 'Закат', 'time_0300': '3:00', 'time_blue_hour': 'Синий час',
	'tech_win98': 'Win98', 'tech_icq': 'ICQ', 'tech_flash': 'Flash',
	'tech_ie6': 'IE6', 'tech_dialup': 'Dial-up', 'tech_y2k': 'Y2K',
	'sci_phys': 'Сохранение', 'sci_chem': 'Химик', 'sci_bio': 'Биолог',
	'sci_psy': 'Психолог Бога', 'sci_math': 'Аксиома', 'sci_econ': 'ВВП ада',
	'rel_christ': 'Христианство v2', 'rel_islam': 'Финик', 'rel_bud': 'Нирвана',
	'rel_jud': '47 вопросов', 'rel_pas': 'FSM', 'rel_sci': 'Ксену',
	'game_doom': 'Doom', 'game_tetris': 'Тетрис', 'game_disco': 'Disco',
	'game_mine': 'Minecraft', 'game_cs': 'CS', 'game_dwarf': 'DF',
	'comp_ath_saint': 'Святой атеист', 'comp_dev_hum': 'Добрый демон',
	'comp_god_coder': 'git@god', 'comp_rob_moth': 'Alice-мама',
	'comp_priest_it': 'Онлайн-литургия', 'comp_lov_sim': 'NPC-любовь',
	'comp_chef_math': 'borsch(borsch)', 'comp_dad_cot': 'Котёл-обмен',

	// Expansion Pack v9 — Третий архипелаг (15 групп ~90 концовок)
	'season_winter': 'Зима', 'season_spring': 'Весна', 'season_summer': 'Лето',
	'season_autumn': 'Осень', 'season_new_year': 'Новый год', 'season_may9': '9 мая',
	'season_sep1': '1 сентября', 'season_dec31': '★ 31 декабря',
	'verb_go': 'Идти', 'verb_wait': 'Ждать', 'verb_love': '★ Любить',
	'verb_remember': 'Помнить', 'verb_forgive': 'Прощать', 'verb_be_silent': 'Молчать',
	'city_moscow': 'Москва', 'city_spb': 'Питер', 'city_voronezh': 'Воронеж',
	'city_chelyabinsk': 'Челябинск', 'city_sochi': 'Сочи', 'city_sovenok': 'Совёнок-6',
	'state_solid': 'Твёрдый', 'state_liquid': 'Жидкий', 'state_gas': 'Газ',
	'state_plasma': 'Плазма', 'state_bec': 'БЭК', 'state_glass': 'Стекло',
	'feel_tender': 'Нежность', 'feel_rage': 'Ярость', 'feel_boredom': 'Скука',
	'feel_toska': '★ Тоска', 'feel_envy': 'Зависть', 'feel_shame': 'Стыд',
	'family_son': 'Сын', 'family_father': 'Несложившийся отец',
	'family_brother': 'Брат', 'family_uncle': 'Дядя',
	'family_grandson': 'Внук', 'family_brother_in_law': 'Свояк',
	'money_ruble': 'Рубль', 'money_dollar': 'Доллар', 'money_btc': 'BTC',
	'money_karma': 'Карма', 'money_memory': 'Воспоминание', 'money_hour': 'Час',
	'mat_wood': 'Дерево', 'mat_stone': 'Камень', 'mat_concrete': 'Бетон',
	'mat_silk': 'Шёлк', 'mat_rubber': 'Резина', 'mat_glass': 'Стекло окна',
	'tool_hammer': 'Молоток', 'tool_screwdriver': 'Крестовая',
	'tool_saw': 'Пила', 'tool_ruler': 'Линейка',
	'tool_kbd_hammer': 'kbd', 'tool_drill': 'Перфоратор',
	'nat_oak': 'Дуб', 'nat_birch': 'Берёза', 'nat_puddle': 'Лужа',
	'nat_grass': 'Травинка', 'nat_taiga': 'Тайга', 'nat_tundra': 'Тундра',
	'vh_bus': 'Автобус', 'vh_marshrutka': 'Маршрутка 47',
	'vh_plane': 'Самолёт', 'vh_skate': 'Скейт',
	'vh_bike': 'Велик', 'vh_scooter': 'Самокат',
	'drink_tea_d': 'Чай-Д', 'drink_coffee_d': 'Кофе-Д',
	'drink_cocoa': 'Какао', 'drink_juice': 'Сок',
	'drink_lemonade': 'Лимонад', 'drink_milk': 'Молоко',
	'plant_cactus': 'Кактус', 'plant_aloe': 'Алоэ', 'plant_ficus': 'Фикус',
	'plant_orchid': 'Орхидея', 'plant_fern': 'Папоротник', 'plant_rosehip': 'Шиповник',
	'word_maybe': 'Может', 'word_sorry': '★ Прости', 'word_thanks': 'Спасибо',
	'word_later': 'Потом', 'word_no': 'Нет', 'word_lets_go': 'Поехали',
	'lang_russian': 'Русский', 'lang_english': 'English', 'lang_latin': 'Latina',
	'lang_cpp': 'C++', 'lang_js': 'JS', 'lang_no_words': 'Без слов',

	// Expansion Pack v10 — Четвёртый архипелаг
	'dec_60s': '60-е', 'dec_70s': '70-е', 'dec_80s': '80-е', 'dec_90s': '90-е',
	'dec_00s': '00-е', 'dec_10s': '10-е', 'dec_20s': '20-е', 'dec_30s': '30-е',
	'mv_matrix': '★ Матрица', 'mv_stalker': 'Сталкер', 'mv_brat': 'Брат',
	'mv_kindzadza': 'Ку', 'mv_ivan_vas': 'Очень приятно, царь',
	'mv_fight_club': 'Клуб', 'mv_groundhog': 'День сурка', 'mv_contact': '★ Контакт',
	'sp_run': 'Бег', 'sp_chess': 'Шахматы', 'sp_hockey': 'Хоккей',
	'sp_tetris_sport': 'Киберспорт', 'sp_forum': 'Форум', 'sp_yoga_sport': 'Лотос',
	'sng_blood_type': 'Группа крови', 'sng_free': 'Кипелов',
	'sng_provance': 'Прованс', 'sng_pln_ottstoy': 'Отстой',
	'sng_lesnik': 'Лесник', 'sng_dolphin': 'Дельфин',
	'of_printer': 'Принтер', 'of_cooler': 'Кулер', 'of_stapler': 'Степлер',
	'of_calendar': 'Календарь', 'of_knife': 'Канц-нож', 'of_sticker': 'Стикер',
	'kid_hide_seek': 'Прятки', 'kid_tag': 'Догонялки',
	'kid_resinochki': 'Резиночки', 'kid_hopscotch': 'Классики',
	'kid_sea_waves': 'Море', 'kid_cossacks': 'Казаки',
	'ph_i_will_think': 'Подумаю', 'ph_its_norm': 'Норм',
	'ph_soryan': 'Сорян', 'ph_happens': 'Бывает',
	'ph_well_such': 'Ну такое', 'ph_get_out': 'Ехай',
	'org_cough': 'Кашель', 'org_sneeze': 'Чих', 'org_hiccup': 'Икота',
	'org_tummy': 'Урчание', 'org_yawn': 'Зевок', 'org_neck_crack': 'Хруст',
	'ds_orvi': 'ОРВИ', 'ds_allergy': 'Аллергия',
	'ds_insomnia': 'Бессонница', 'ds_burnout': '★ Выгорание',
	'ds_fatigue': 'Усталость', 'ds_imposter': 'Импостер',
	'fl_ege': 'ЕГЭ', 'fl_deadline': 'Дедлайн', 'fl_date': 'Свидание',
	'fl_pres': 'PRES', 'fl_dark_pixel': 'Пиксель', 'fl_oblom': 'Облом',
	'tv_brigada': 'Бригада', 'tv_kuhnya': 'Кухня', 'tv_police': 'Рублёвка',
	'tv_got': 'GoT', 'tv_lost': '★ Lost', 'tv_black_mirror': 'Black Mirror',
	'gn_noir': 'Нуар', 'gn_comedy': 'Комедия', 'gn_tragedy': 'Трагедия',
	'gn_horror': 'Хоррор', 'gn_parable': 'Притча', 'gn_mockumentary': 'Мокьюментари',
	'dr_para': 'Парацетамол', 'dr_valokordin': 'Валокордин',
	'dr_korvalol': 'Корвалол', 'dr_coal': 'Уголь',
	'dr_brilliant': 'Зелёнка', 'dr_hpyl': 'HP',
	'ms_skrepka': 'Clippy', 'ms_fridge': 'Холодильник',
	'ms_ticket': 'Билет', 'ms_check_47': 'Чек 47₽',
	'ms_podyezd': 'Подъезд', 'ms_doormat': 'Половик 47',

	// Expansion Pack v11 — Giant Archipelago (141 процедурных)
	'gen_dvornik': 'Дворник', 'gen_konduktor': 'Кондуктор', 'gen_pochta': 'Почтальон', 'gen_vahter': 'Вахтёр',
	'gen_doktor_p': 'Доктор-П', 'gen_taksist': 'Таксист', 'gen_oper': 'Оператор', 'gen_buhgalter': 'Бухгалтер',
	'gen_floppy': 'Дискета', 'gen_cd': 'CD', 'gen_cassette': 'Кассета', 'gen_walkman': 'Walkman',
	'gen_pager': 'Пейджер', 'gen_nokia3310': 'Nokia 3310', 'gen_ipod': 'iPod', 'gen_palm': 'Palm',
	'gen_bench': 'Скамейка', 'gen_kachalki': 'Качели', 'gen_pesoch': 'Песочница', 'gen_lestnitsa': 'Лестница',
	'gen_lift': 'Лифт', 'gen_drog': 'Остановка', 'gen_remont': 'Ремонт', 'gen_introvert': 'Интроверт',
	'gen_extrovert': 'Экстраверт', 'gen_perfect': 'Перфекционист', 'gen_procras': 'Прокрастинатор', 'gen_overthinker': 'Overthinker',
	'gen_minimal': 'Минималист', 'gen_maximalist': 'Максималист', 'gen_workahol': 'Трудоголик', 'gen_goth': 'Гот',
	'gen_hipster': 'Хипстер', 'gen_gopnik': 'Гопник', 'gen_bohemian': 'Богема', 'gen_nerd': 'Нерд',
	'gen_geek': 'Гик', 'gen_dandy': 'Денди', 'gen_punk': 'Панк', 'gen_apathy': 'Апатия',
	'gen_anger': 'Гнев', 'gen_loneli': 'Одиночество', 'gen_joy': 'Радость', 'gen_grief': 'Скорбь',
	'gen_hope': 'Надежда', 'gen_curiosity': 'Любопытство', 'gen_relief': 'Облегчение', 'gen_yesterday': 'Вчера',
	'gen_tomorrow': 'Завтра', 'gen_never': 'Никогда', 'gen_always': 'Всегда', 'gen_now': 'Сейчас',
	'gen_then': 'Тогда', 'gen_anywhere': 'Где-то', 'gen_nowhere': 'Нигде', 'gen_lurker': 'Луркер',
	'gen_troll': 'Тролль', 'gen_likemaster': 'Лайк-мастер', 'gen_meme_lord': 'Мем-лорд', 'gen_blogger': 'Блогер',
	'gen_subreddit_admin': 'Mod', 'gen_youtube_kid': 'YT-Коммент', 'gen_tikbros': 'TT', 'gen_keys': 'Ключи',
	'gen_wallet': 'Кошелёк', 'gen_phone': 'Телефон', 'gen_card': 'Карта', 'gen_lighter': 'Зажигалка',
	'gen_pill': 'Таблетка', 'gen_handkerchief': 'Платок', 'gen_metro_token': 'Жетон', 'gen_voicemail': 'Voicemail',
	'gen_missed': 'Пропущенный', 'gen_unread_msg': 'Непрочитанное', 'gen_typing': 'Печатает', 'gen_seen_no_reply': 'Прочитан',
	'gen_block': 'Block', 'gen_pause': 'Pause', 'gen_loading': 'Load', 'gen_savefile_corrupt': 'Corrupted',
	'gen_achievement': 'Achievement', 'gen_tutorial': 'Tutorial', 'gen_end_credits': 'Credits', 'gen_new_game_plus': 'NG+',
	'gen_speedrun_glitch': 'Glitch', 'gen_aurora': 'Сияние', 'gen_meteor': 'Метеор', 'gen_eclipse': 'Затмение',
	'gen_rainbow': 'Радуга', 'gen_hail': 'Град', 'gen_smog': 'Смог', 'gen_river': 'Река',
	'gen_mountain': 'Гора', 'gen_desert': 'Пустыня', 'gen_ocean': 'Океан', 'gen_volcano': 'Вулкан',
	'gen_glacier': 'Ледник', 'gen_jester': 'Шут', 'gen_sage': 'Мудрец', 'gen_warrior': 'Воин',
	'gen_lover': 'Любовник', 'gen_hermit': 'Отшельник', 'gen_orphan': 'Сирота', 'gen_creator': 'Создатель',
	'gen_explorer': 'Исследователь', 'gen_warm': 'Тепло', 'gen_cold': 'Холод', 'gen_soft': 'Мягкое',
	'gen_hard': 'Твёрдое', 'gen_smooth': 'Гладкое', 'gen_rough': 'Шероховатое', 'gen_breathe': 'Вдох',
	'gen_blink': 'Моргание', 'gen_sleep': 'Сон', 'gen_dream': 'Сновидение', 'gen_wake': 'Пробуждение',
	'gen_yawn2': 'Зевок-2', 'gen_qr': 'QR', 'gen_recaptcha': 'reCAPTCHA', 'gen_404': 'HTTP 404',
	'gen_500': 'HTTP 500', 'gen_cookie': 'Cookie', 'gen_eula': 'EULA', 'gen_ai_hallucination': 'LLM-Halluc',
	'gen_finetune': 'Finetune', 'gen_chance': 'Шанс', 'gen_destiny': 'Судьба', 'gen_freewill': 'Свободная воля',
	'gen_meaning': 'Смысл', 'gen_truth': 'Истина', 'gen_lie': 'Ложь', 'gen_silence': 'Тишина',
	'gen_void': 'Пустота', 'gen_alright': 'Норм', 'gen_meh': 'Meh', 'gen_oof': 'Oof',
	'gen_cringe': 'Кринж', 'gen_bruh': 'Bruh', 'gen_yeet': 'Yeet', 'gen_sus': 'Sus',
	'gen_based': 'Based',

	// Expansion Pack v12 — Mass2 (154 процедурных)
	'mass2_einstein': 'Эйнштейн', 'mass2_hawking': 'Хокинг', 'mass2_darwin': 'Дарвин', 'mass2_curie': 'Кюри',
	'mass2_newton': 'Ньютон', 'mass2_kant': 'Кант', 'mass2_marx': 'Маркс', 'mass2_freud': 'Фрейд',
	'mass2_alisa': 'Алиса', 'mass2_aria': 'Ария', 'mass2_ddt': 'ДДТ', 'mass2_nautilus': 'Наутилус',
	'mass2_machina_vremeni': 'МВ', 'mass2_chaif': 'Чайф', 'mass2_aukstion': 'Аукцыон', 'mass2_grebenshchikov': 'БГ',
	'mass2_vympel': 'Вымпел', 'mass2_ankarov': 'Анкарова', 'mass2_avoska': 'Авоська', 'mass2_almaznoe': 'Алмазная',
	'mass2_brichka': 'Бричка', 'mass2_gaz53': 'ГАЗ-53', 'mass2_kalashniko': 'АК', 'mass2_kolbasa': 'Колбаса',
	'mass2_kvas_b': 'Бочка кваса', 'mass2_pioner': 'Галстук',
	'mass2_chaek': 'Чаёк', 'mass2_pirogok': 'Пирожок', 'mass2_solnyshko': 'Солнышко', 'mass2_rybonka': 'Рыбонька',
	'mass2_serdechnyy': 'Сердешный', 'mass2_zaichik': 'Зайчик',
	'mass2_python': 'Python', 'mass2_rust': 'Rust', 'mass2_lua': 'Lua', 'mass2_ruby': 'Ruby',
	'mass2_haskell': 'Haskell', 'mass2_prolog': 'Prolog',
	'mass2_pain_back': 'Спина', 'mass2_pain_head': 'Мигрень', 'mass2_pain_neck': 'Шея',
	'mass2_pain_wrist': 'Запястье', 'mass2_pain_eyes': 'Глаза', 'mass2_pain_soul': 'Душа',
	'mass2_joy_morn': 'Утро', 'mass2_joy_first_snow': 'Первый снег', 'mass2_joy_friend': 'Звонок',
	'mass2_joy_letter': 'Письмо', 'mass2_joy_seat': 'Место', 'mass2_joy_warm': 'Ванна',
	'mass2_awk_mom': 'Неловкость', 'mass2_awk_zoom': 'Zoom', 'mass2_awk_wave': 'Махание',
	'mass2_awk_hug': 'Полу-объятие', 'mass2_awk_name': 'Имя', 'mass2_awk_door': 'Дверь',
	'mass2_food_kiev': 'Киевская', 'mass2_food_olivier': 'Оливье-2', 'mass2_food_borshok': 'Борщок',
	'mass2_food_seledka': 'Селёдка', 'mass2_food_studen': 'Холодец', 'mass2_food_cake': 'Прага',
	'mass2_app_meat_grinder': 'Мясорубка', 'mass2_app_pylesos': 'Тайфун',
	'mass2_app_fridge': 'ЗИЛ', 'mass2_app_tv': 'Рубин',
	'mass2_app_blender': 'Венчик', 'mass2_app_radio': 'Маяк',
	'mass2_ad_mmm': 'МММ', 'mass2_ad_sn': 'Лёня', 'mass2_ad_pf': 'Сникерс',
	'mass2_ad_jl': 'Джинн', 'mass2_ad_zh': 'Love is', 'mass2_ad_ld': 'Ефимыч',
	'mass2_otho': 'Ыщо', 'mass2_uchen': 'Учитиль', 'mass2_klap': 'Клуп',
	'mass2_devachka': 'Девачка', 'mass2_priyo': 'Прийо', 'mass2_zaeb': 'Зайбал',
	'mass2_metro_ploshad': 'Площадь', 'mass2_metro_kievskaya': 'Киевская-К',
	'mass2_metro_kropotkin': 'Кропоткинская', 'mass2_metro_park': 'Парк Победы',
	'mass2_metro_byelorus': 'Белорусская', 'mass2_metro_perekrest': 'Переход',
	'mass2_q_kavkaz': 'Кто не работает', 'mass2_q_ivanvas': 'Банкет',
	'mass2_q_brilliantruka': 'Дядь Алёша', 'mass2_q_dmb': 'ДМБ',
	'mass2_q_brigada': 'Жизнь-такая', 'mass2_q_dukov': 'База',
	'mass2_su_man': 'Стенд-ап-1', 'mass2_su_it': 'Стенд-ап-IT', 'mass2_su_dad': 'Стенд-ап-отец',
	'mass2_su_med': 'Стенд-ап-медик', 'mass2_su_school': 'Стенд-ап-учитель', 'mass2_su_atheist': 'Стенд-ап-атеист',
	'mass2_anxiety_door': 'Дверь-тревога', 'mass2_anxiety_iron': 'Утюг', 'mass2_anxiety_phone': 'Чат',
	'mass2_anxiety_call': 'Звонок-тревога', 'mass2_anxiety_morn': 'Понедельник', 'mass2_anxiety_clock': 'Продуктивность',
	'mass2_anxiety_health': 'Рак', 'mass2_anxiety_void': 'Безобъектная',
	'mass2_lonely_dinner': 'Ужин', 'mass2_lonely_bday': 'День Р', 'mass2_lonely_walk': 'Прогулка',
	'mass2_lonely_cafe': 'Кафе', 'mass2_lonely_taxi': 'Таксист-2', 'mass2_lonely_train': 'Поезд',
	'mass2_stereo_subway_old': 'Бабка-метро', 'mass2_stereo_dachnik': 'Дачник',
	'mass2_stereo_intelligent': 'Интеллигент', 'mass2_stereo_blogger': 'Блогер-2',
	'mass2_stereo_chinov': 'Чиновник', 'mass2_stereo_dvor': 'Двор',
	'mass2_dig_emoji_smile': '🙂', 'mass2_dig_emoji_skull': '💀',
	'mass2_dig_emoji_fire': '🔥', 'mass2_dig_emoji_eye': '👁️👄👁️',
	'mass2_dig_chatgpt': 'GPT', 'mass2_dig_telegram': 'TG',
	'mass2_dig_vk': 'ВК', 'mass2_dig_2gis': '2ГИС',
	'mass2_book_master': 'ММ', 'mass2_book_warandpeace': 'ВИМ', 'mass2_book_idiot': 'Идиот',
	'mass2_book_strugat': 'Стругацкие', 'mass2_book_perel': 'Пелевин', 'mass2_book_dovlatov': 'Довлатов',
	'mass2_book_bunin': 'Бунин', 'mass2_book_brodsky': 'Бродский',
	'mass2_90_lichinki': 'Пиджак', 'mass2_90_vau': 'Ваучер', 'mass2_90_lottery': 'Лотерея',
	'mass2_90_chechen': 'Чечня', 'mass2_90_default': 'Дефолт', 'mass2_90_yeltsin': 'Ельцин',
	'mass2_90_kgb': 'ФСБ', 'mass2_90_kalashnikov': 'Калаш',
	'mass2_dream_dacha': 'Дача', 'mass2_dream_trip': 'Италия', 'mass2_dream_house': 'Дом с садом',
	'mass2_dream_book': 'Книга-мечта', 'mass2_dream_kid': 'Ребёнок', 'mass2_dream_pet': 'Хаски',
	'mass2_final_joke1': 'Шутка', 'mass2_final_joke2': 'Двойной', 'mass2_final_joke3': 'Анекдот',
	'mass2_final_joke4': 'Литургия', 'mass2_final_joke5': '★ Удалите', 'mass2_final_joke6': '★ Потаённый'
};

// ============================================================
// Route map data: nodes and edges for the game flowchart
// ============================================================
const ROUTE_MAP = {
	groups: [
		{ id: 'prologue', title: 'Пролог', color: '#4488cc' },
		{ id: 'judgment', title: 'Страшный Суд', color: '#ddaa00' },
		{ id: 'hell', title: 'Ад', color: '#cc3333' },
		{ id: 'endings', title: 'Концовки', color: '#44bb44' }
	],
	nodes: [
		{ id: 'Prologue_Morning_Choice', label: 'Утро', group: 'prologue' },
		{ id: 'Prologue_Apartment_Pattern', label: 'Паттерны', group: 'prologue' },
		{ id: 'Prologue_Pattern_Log', label: 'Журнал', group: 'prologue' },
		{ id: 'Prologue_Pattern_Detour', label: 'Сломать маршрут', group: 'prologue' },
		{ id: 'Prologue_Mother_Call', label: 'Звонок маме', group: 'prologue' },
		{ id: 'Prologue_Apartment_Phone', label: 'Телефон', group: 'prologue' },
		{ id: 'Prologue_Mock', label: 'Высмеять', group: 'prologue' },
		{ id: 'Prologue_Ignore', label: 'Промолчать', group: 'prologue' },
		{ id: 'Prologue_Kind', label: 'Поддержать', group: 'prologue' },
		{ id: 'Prologue_Sergey_Call', label: 'Звонок Серёже', group: 'prologue' },
		{ id: 'Prologue_Internet', label: 'Reddit', group: 'prologue' },
		{ id: 'Prologue_Debate_Engage', label: 'Дебаты', group: 'prologue' },
		{ id: 'Prologue_Skip_Debate', label: 'Пропустить', group: 'prologue' },
		{ id: 'Prologue_Oversleep', label: 'Проспал', group: 'prologue' },
		{ id: 'Prologue_Oversleep_Helped', label: 'Помог бабушке', group: 'prologue' },
		{ id: 'Prologue_Jogging', label: 'Пробежка', group: 'prologue' },
		{ id: 'Prologue_Work_Inna', label: 'Офис + Инна', group: 'prologue' },
		{ id: 'Prologue_Work_Inna_Late', label: 'Опоздал + Инна', group: 'prologue' },
		{ id: 'Prologue_Death', label: 'Инфаркт', group: 'prologue' },
		{ id: 'Prologue_Death_Car', label: 'ДТП', group: 'prologue' },
		{ id: 'Prologue_Death_Overwork', label: 'Переработка', group: 'prologue' },
		{ id: 'Prologue_Transition', label: 'Переход', group: 'prologue' },

		{ id: 'Judgment_Arrival', label: 'Прибытие', group: 'judgment' },
		{ id: 'Judgment_VR_Denial', label: 'VR-отрицание', group: 'judgment' },
		{ id: 'Judgment_Panic', label: 'Паника', group: 'judgment' },
		{ id: 'Judgment_Queue', label: 'Очередь', group: 'judgment' },
		{ id: 'Judgment_Queue_Silhouette', label: 'Силуэт', group: 'judgment' },
		{ id: 'Judgment_Audience', label: 'Аудиенция', group: 'judgment' },
		{ id: 'Judgment_Stats_Argument', label: 'Статистика', group: 'judgment' },
		{ id: 'Judgment_Deny', label: 'Отрицание', group: 'judgment' },
		{ id: 'Judgment_Beg', label: 'Мольба', group: 'judgment' },
		{ id: 'Judgment_Sarcasm', label: 'Сарказм', group: 'judgment' },
		{ id: 'Judgment_Ask_True_Judge', label: 'Кто судит?', group: 'judgment' },
		{ id: 'Judgment_Review', label: 'Обзор жизни', group: 'judgment' },
		{ id: 'Judgment_Mother_Witness', label: 'Мама', group: 'judgment' },
		{ id: 'Judgment_Verdict', label: 'Вердикт', group: 'judgment' },

		{ id: 'Hell_Arrival', label: 'Врата ада', group: 'hell' },
		{ id: 'Hell_Exploration_Seed', label: 'Зерно', group: 'hell' },
		{ id: 'Hell_Viktor_Midgame', label: 'Виктор: логи', group: 'hell' },
		{ id: 'Hell_Bureaucracy', label: 'Бюрократия', group: 'hell' },
		{ id: 'Hell_Lilith_Intro', label: 'Лилит', group: 'hell' },
		{ id: 'Hell_Viktor_Intro', label: 'Виктор', group: 'hell' },
		{ id: 'Hell_Light', label: 'Ад-лайт', group: 'hell' },
		{ id: 'Hell_Standard', label: 'Котлы', group: 'hell' },
		{ id: 'Hell_Personalized', label: 'Персональный', group: 'hell' },
		{ id: 'Hell_Debate_Round_1', label: 'Дебаты 1', group: 'hell' },
		{ id: 'Hell_Exploration', label: 'Исследование', group: 'hell' },
		{ id: 'Hell_Mira_Archive_Open', label: 'Архив молитв', group: 'hell' },
		{ id: 'Hell_Breakdown', label: 'Кризис', group: 'hell' },
		{ id: 'Hell_Lilith_Romance', label: 'Роман', group: 'hell' },
		{ id: 'Hell_Matrix_Realization', label: 'Осознание', group: 'hell' },
		{ id: 'Hell_Bug_Discovery', label: 'git log', group: 'hell' },

		{ id: 'Ending_CauldronEternal', label: 'Вечный котёл', group: 'endings', ending: 'cauldron_eternal' },
		{ id: 'Ending_Loophole', label: 'Лазейка', group: 'endings', ending: 'loophole' },
		{ id: 'Ending_DemonFriend', label: 'Коллега', group: 'endings', ending: 'demon_friend' },
		{ id: 'Ending_Glitch', label: 'Глитч', group: 'endings', ending: 'glitch' },
		{ id: 'Ending_DebateWin', label: 'Аргумент', group: 'endings', ending: 'debate_win' },
		{ id: 'Ending_Believer', label: 'Обращённый', group: 'endings', ending: 'believer' },
		{ id: 'Ending_Pascal', label: 'Пари Паскаля', group: 'endings', ending: 'pascal' },
		{ id: 'Ending_Theologian', label: 'Теолог', group: 'endings', ending: 'theologian' },
		{ id: 'Ending_Rebellion', label: 'Революция', group: 'endings', ending: 'rebellion' },
		{ id: 'Ending_Hacker', label: 'Хакер', group: 'endings', ending: 'hacker' },
		{ id: 'Ending_Democracy', label: 'Демократия', group: 'endings', ending: 'democracy' },
		{ id: 'Ending_Appeal', label: 'Прецедент', group: 'endings', ending: 'appeal' },
		{ id: 'Ending_Bar', label: 'Бар', group: 'endings', ending: 'bar' },
		{ id: 'Ending_Franchise', label: 'Франшиза', group: 'endings', ending: 'franchise' },
		{ id: 'Ending_Therapist', label: 'Терапевт', group: 'endings', ending: 'therapist' },
		{ id: 'Ending_Archivist', label: 'Архивариус', group: 'endings', ending: 'archivist' },
		{ id: 'Ending_Matrix', label: 'Контакт', group: 'endings', ending: 'matrix' },
		{ id: 'Ending_Speedrun', label: 'Спидран', group: 'endings', ending: 'speedrun' },
		{ id: 'Ending_BetaTester', label: 'Бета-тестер', group: 'endings', ending: 'beta_tester' },
		{ id: 'Ending_Awakening', label: 'Пробуждение', group: 'endings', ending: 'awakening' },
		{ id: 'Ending_DevCommentary', label: 'README', group: 'endings', ending: 'dev_commentary' },
		{ id: 'Ending_EmptyThrone', label: 'Пустой престол', group: 'endings', ending: 'empty_throne' },
		{ id: 'Ending_AnonFromHell', label: 'Аноним из ада', group: 'endings', ending: 'anon_from_hell' },
		{ id: 'Ending_ControlGroup', label: 'Контрольная группа', group: 'endings', ending: 'control_group' },
		{ id: 'Ending_IAmTheBug', label: 'Я — баг', group: 'endings', ending: 'i_am_the_bug' },
		{ id: 'Ending_AliceLog', label: 'Лог Алисы', group: 'endings', ending: 'alice_log' },
		{ id: 'Ending_AliceSilent', label: 'Тишина Алисы', group: 'endings', ending: 'alice_silent' },
		{ id: 'Ending_Nihilist', label: 'Ничто', group: 'endings', ending: 'nihilist' },
		{ id: 'Ending_Prophet', label: 'Пророк', group: 'endings', ending: 'prophet' },
		{ id: 'Ending_Witness', label: 'Свидетель', group: 'endings', ending: 'witness' },
		{ id: 'Ending_LastCall', label: 'Последний звонок', group: 'endings', ending: 'last_call' },
		{ id: 'Ending_FullCircle', label: 'Полный круг', group: 'endings', ending: 'full_circle' },
		{ id: 'Ending_HellRomance', label: 'Ад вдвоём', group: 'endings', ending: 'hell_romance' },
		{ id: 'Ending_EscapeTogether', label: 'Побег', group: 'endings', ending: 'escape_together' },
		{ id: 'Ending_LilithBetrayal', label: 'Предательство', group: 'endings', ending: 'lilith_betrayal' },
		{ id: 'Ending_LilithConflicted', label: 'Перевод', group: 'endings', ending: 'lilith_conflicted' },
		{ id: 'Escape_Caught', label: 'Пойманы', group: 'endings', ending: 'escape_caught' },
		{ id: 'Ending_Sisyphus', label: 'Сизиф', group: 'endings', ending: 'sisyphus' },
		{ id: 'Ending_ViktorHack', label: 'sudo rm pain', group: 'endings', ending: 'viktor_hack' },
		{ id: 'Ending_ViktorFreedom', label: 'DROP TABLE', group: 'endings', ending: 'viktor_freedom' },

		// Expansion Pack v1 nodes
		{ id: 'Expansion_Router', label: 'Боковые двери', group: 'hell' },
		{ id: 'Expansion_Cafeteria_Intro', label: 'Столовая', group: 'hell' },
		{ id: 'Expansion_Library_Intro', label: 'Библиотека молитв', group: 'hell' },
		{ id: 'Expansion_Union_Intro', label: 'Профсоюз демонов', group: 'hell' },
		{ id: 'Expansion_Helpdesk_Intro', label: 'IT-поддержка', group: 'hell' },
		{ id: 'Expansion_AtheistGroup_Intro', label: 'Группа атеистов', group: 'hell' },
		{ id: 'Expansion_Child_Intro', label: 'Детский сектор', group: 'hell' },
		{ id: 'Expansion_Father_Intro', label: 'Папа', group: 'hell' },
		{ id: 'Expansion_Maintenance_Intro', label: 'Разработчик', group: 'hell' },
		{ id: 'Expansion_Inna_Intro', label: 'Инна в аду', group: 'hell' },

		{ id: 'Ending_HellChef', label: 'Ризотто', group: 'endings', ending: 'hell_chef' },
		{ id: 'Ending_CafeteriaLeader', label: 'Клуб у окна', group: 'endings', ending: 'cafeteria_leader' },
		{ id: 'Ending_Library_Read', label: 'Архив', group: 'endings', ending: 'library_read' },
		{ id: 'Ending_LetterToSergey', label: 'Ответ Серёже', group: 'endings', ending: 'letter_to_sergey' },
		{ id: 'Ending_FatherReply', label: 'Тетрадь', group: 'endings', ending: 'father_reply' },
		{ id: 'Ending_UnspokenPrayers', label: 'Невысказанные', group: 'endings', ending: 'unspoken_prayers' },
		{ id: 'Ending_HellStrike', label: 'Забастовка', group: 'endings', ending: 'hell_strike' },
		{ id: 'Ending_DemonLawsuit', label: 'Иск', group: 'endings', ending: 'demon_lawsuit' },
		{ id: 'Ending_GreatUnion', label: 'Объединение', group: 'endings', ending: 'great_union' },
		{ id: 'Ending_DemonPension', label: 'Пенсия', group: 'endings', ending: 'demon_pension' },
		{ id: 'Ending_HardReset', label: 'Hard Reset', group: 'endings', ending: 'hard_reset' },
		{ id: 'Ending_LogsReader', label: 'Почтальон', group: 'endings', ending: 'logs_reader' },
		{ id: 'Ending_PullRequest', label: 'PR #7', group: 'endings', ending: 'pull_request' },
		{ id: 'Ending_TruthGroup', label: 'Уверенность', group: 'endings', ending: 'truth_group' },
		{ id: 'Ending_AtheistTherapist', label: 'Терапевт', group: 'endings', ending: 'atheist_therapist' },
		{ id: 'Ending_AtheistGroup_Stay', label: 'В кругу', group: 'endings', ending: 'atheist_stay' },
		{ id: 'Ending_ChildKeep', label: 'Усыновление', group: 'endings', ending: 'child_keep' },
		{ id: 'Ending_ChildSaved', label: 'Открытая дверь', group: 'endings', ending: 'child_saved' },
		{ id: 'Ending_FamilyHell', label: 'Семья', group: 'endings', ending: 'family_hell' },
		{ id: 'Ending_FatherSon', label: 'Мастерская', group: 'endings', ending: 'father_son' },
		{ id: 'Ending_FatherEscape', label: 'Команда', group: 'endings', ending: 'father_escape' },
		{ id: 'Ending_DevMaintenance', label: 'Кофе с devом', group: 'endings', ending: 'dev_maintenance' },
		{ id: 'Ending_EULAReader', label: 'RTFM', group: 'endings', ending: 'eula_reader' },
		{ id: 'Ending_Removed', label: 'Удалён', group: 'endings', ending: 'removed' },
		{ id: 'Ending_DevColleague', label: 'SELECT *', group: 'endings', ending: 'dev_colleague' },
		{ id: 'Ending_InnaRomance', label: 'Инна', group: 'endings', ending: 'inna_romance' },
		{ id: 'Ending_InnaForgive', label: 'Не моя вина', group: 'endings', ending: 'inna_forgive' },
		{ id: 'Ending_InnaRevolt', label: 'Рассылка', group: 'endings', ending: 'inna_revolt' },

		// Expansion Pack v2 — prologue/judgment sidehooks and microendings
		{ id: 'Prologue_Window', label: 'Окно', group: 'prologue' },
		{ id: 'Prologue_Mirror', label: 'Зеркало', group: 'prologue' },
		{ id: 'Prologue_Neighbor', label: 'Соседка', group: 'prologue' },
		{ id: 'Judgment_Settle', label: 'Досудебка', group: 'judgment' },
		{ id: 'Judgment_Witness', label: 'Свидетель', group: 'judgment' },
		{ id: 'Judgment_Savepoint', label: 'Savepoint', group: 'judgment' },
		{ id: 'Judgment_Lawyer', label: 'Адвокат', group: 'judgment' },

		{ id: 'Ending_Settlement_Small', label: 'Досудебка', group: 'endings', ending: 'settlement_small' },
		{ id: 'Ending_Settlement_Large', label: 'Профилактика', group: 'endings', ending: 'settlement_large' },
		{ id: 'Ending_Settlement_Meta', label: 'Мета-апелляция', group: 'endings', ending: 'settlement_meta' },
		{ id: 'Ending_WitnessSelf', label: 'Свидетель', group: 'endings', ending: 'witness_self' },
		{ id: 'Ending_Savepoint', label: 'git stash', group: 'endings', ending: 'savepoint' },
		{ id: 'Ending_FatherDefense', label: 'Поручительство', group: 'endings', ending: 'father_defense' },
		{ id: 'Ending_SergeyDefense', label: 'Год на Серёжу', group: 'endings', ending: 'sergey_defense' },
		{ id: 'Ending_RedditDefense', label: 'Mod powers', group: 'endings', ending: 'reddit_defense' },
		{ id: 'Ending_PastSelfDefense', label: 'Поздняя молитва', group: 'endings', ending: 'past_self_defense' },
		{ id: 'Ending_Teapot', label: 'Teapot', group: 'endings', ending: 'teapot' },
		{ id: 'Ending_404', label: '404', group: 'endings', ending: 'soul_not_found' },
		{ id: 'Ending_StackOverflow', label: 'Stack Overflow', group: 'endings', ending: 'stack_overflow' },
		{ id: 'Ending_KernelPanic', label: 'Kernel Panic', group: 'endings', ending: 'kernel_panic' },
		{ id: 'Ending_GoldenRule', label: 'Golden Rule', group: 'endings', ending: 'golden_rule' },
		{ id: 'Ending_OutOfMemory', label: 'OOM', group: 'endings', ending: 'out_of_memory' },
		{ id: 'Ending_GitBlame', label: 'git blame', group: 'endings', ending: 'git_blame' },

		// Expansion Pack v3 nodes
		{ id: 'Expansion_Bar_Entry', label: 'Бар Бориса', group: 'hell' },
		{ id: 'Expansion_Encounter_Random', label: 'Случайная встреча', group: 'hell' },
		{ id: 'Expansion_Loop_Discovery', label: 'Цикл вечности', group: 'hell' },
		{ id: 'Expansion_Speedrun_Start', label: 'Спидран', group: 'prologue' },

		{ id: 'Ending_Bar_Guitar', label: 'Ученик Семёна', group: 'endings', ending: 'bar_guitar' },
		{ id: 'Ending_BarFranchise2', label: 'Сеть баров', group: 'endings', ending: 'bar_franchise2' },
		{ id: 'Ending_AnyaForgiven', label: 'Прощение Ани', group: 'endings', ending: 'anya_forgiven' },
		{ id: 'Ending_AnyaLove', label: 'Continuous', group: 'endings', ending: 'anya_love' },
		{ id: 'Ending_AnyaTogether', label: 'Аня вместе', group: 'endings', ending: 'anya_together' },
		{ id: 'Ending_LoopBroken', label: 'Бездействие', group: 'endings', ending: 'loop_broken' },
		{ id: 'Ending_AcceptedLoop', label: 'Принятый цикл', group: 'endings', ending: 'accepted_loop' },
		{ id: 'Ending_LoopComplete', label: 'Все двери', group: 'endings', ending: 'loop_complete' },
		{ id: 'Ending_SpeedrunMaster', label: 'any%', group: 'endings', ending: 'speedrun_master' },

		// Expansion Pack v4 nodes
		{ id: 'Prologue_Boss_Meeting', label: 'Босс', group: 'prologue' },
		{ id: 'Expansion_Bar_Quiz', label: 'Викторина', group: 'hell' },
		{ id: 'Expansion_Famous_Meeting', label: 'Карл Саган', group: 'hell' },
		{ id: 'Expansion_Subscription', label: 'Bog Premium', group: 'hell' },
		{ id: 'Expansion_Programmer_Intro', label: 'Программист', group: 'hell' },
		{ id: 'Expansion_Final_Doors', label: 'Финальные двери', group: 'hell' },
		{ id: 'Expansion_Just_Lilith_Alt', label: 'Just Lilith', group: 'hell' },

		{ id: 'Ending_SaganGuide', label: 'Ученик Сагана', group: 'endings', ending: 'sagan_guide' },
		{ id: 'Ending_PaleBlueDot', label: 'Pale Blue Dot', group: 'endings', ending: 'pale_blue_dot' },
		{ id: 'Ending_CosmosAfterlife', label: 'Космос 2', group: 'endings', ending: 'cosmos_afterlife' },
		{ id: 'Ending_BogPremium', label: 'Premium', group: 'endings', ending: 'bog_premium' },
		{ id: 'Ending_FreeUser', label: 'Freemium', group: 'endings', ending: 'free_user' },
		{ id: 'Ending_UnsubscribePreemptive', label: 'Preempt unsub', group: 'endings', ending: 'unsubscribe_preemptive' },
		{ id: 'Ending_ProgrammerRebel', label: 'Из симуляции', group: 'endings', ending: 'programmer_rebel' },
		{ id: 'Ending_RefactorSelf', label: 'Рефакторинг', group: 'endings', ending: 'refactor_self' },
		{ id: 'Ending_V1Forever', label: 'V1', group: 'endings', ending: 'v1_forever' }
	],
	edges: [
		['Prologue_Morning_Choice', 'Prologue_Apartment_Phone'],
		['Prologue_Morning_Choice', 'Prologue_Apartment_Pattern'],
		['Prologue_Morning_Choice', 'Prologue_Mother_Call'],
		['Prologue_Morning_Choice', 'Prologue_Oversleep'],
		['Prologue_Morning_Choice', 'Prologue_Jogging'],
		['Prologue_Apartment_Pattern', 'Prologue_Pattern_Log'],
		['Prologue_Apartment_Pattern', 'Prologue_Pattern_Detour'],
		['Prologue_Apartment_Pattern', 'Prologue_Sergey_Call'],
		['Prologue_Pattern_Log', 'Prologue_Internet'],
		['Prologue_Pattern_Log', 'Prologue_Work_Inna'],
		['Prologue_Pattern_Detour', 'Prologue_Work_Inna'],
		['Prologue_Mother_Call', 'Prologue_Work_Inna'],
		['Prologue_Apartment_Phone', 'Prologue_Mock'],
		['Prologue_Apartment_Phone', 'Prologue_Ignore'],
		['Prologue_Apartment_Phone', 'Prologue_Kind'],
		['Prologue_Apartment_Phone', 'Prologue_Sergey_Call'],
		['Prologue_Mock', 'Prologue_Internet'],
		['Prologue_Ignore', 'Prologue_Internet'],
		['Prologue_Kind', 'Prologue_Internet'],
		['Prologue_Sergey_Call', 'Prologue_Work_Inna'],
		['Prologue_Internet', 'Prologue_Debate_Engage'],
		['Prologue_Internet', 'Prologue_Skip_Debate'],
		['Prologue_Debate_Engage', 'Prologue_Work_Inna'],
		['Prologue_Skip_Debate', 'Prologue_Work_Inna'],
		['Prologue_Oversleep', 'Prologue_Work_Inna_Late'],
		['Prologue_Jogging', 'Prologue_Death_Car'],
		['Prologue_Jogging', 'Prologue_Work_Inna'],
		['Prologue_Work_Inna', 'Prologue_Death'],
		['Prologue_Work_Inna_Late', 'Prologue_Death_Overwork'],
		['Prologue_Work_Inna_Late', 'Prologue_Death'],
		['Prologue_Death', 'Prologue_Transition'],
		['Prologue_Death_Car', 'Prologue_Transition'],
		['Prologue_Death_Overwork', 'Prologue_Transition'],
		['Prologue_Transition', 'Judgment_Arrival'],
		['Judgment_Arrival', 'Judgment_VR_Denial'],
		['Judgment_Arrival', 'Judgment_Queue'],
		['Judgment_Arrival', 'Judgment_Panic'],
		['Judgment_VR_Denial', 'Judgment_Queue'],
		['Judgment_Panic', 'Judgment_Queue'],
		['Judgment_Queue', 'Judgment_Audience'],
		['Judgment_Audience', 'Judgment_Stats_Argument'],
		['Judgment_Audience', 'Judgment_Deny'],
		['Judgment_Audience', 'Judgment_Beg'],
		['Judgment_Audience', 'Judgment_Sarcasm'],
		['Judgment_Audience', 'Judgment_Ask_True_Judge'],
		['Judgment_Stats_Argument', 'Judgment_Review'],
		['Judgment_Deny', 'Judgment_Review'],
		['Judgment_Beg', 'Judgment_Review'],
		['Judgment_Sarcasm', 'Judgment_Review'],
		['Judgment_Ask_True_Judge', 'Judgment_Review'],
		['Judgment_Review', 'Judgment_Mother_Witness'],
		['Judgment_Mother_Witness', 'Judgment_Verdict'],
		['Judgment_Review', 'Judgment_Verdict'],
		['Judgment_Verdict', 'Ending_Loophole'],
		['Judgment_Verdict', 'Hell_Arrival'],
		['Hell_Arrival', 'Hell_Bureaucracy'],
		['Hell_Bureaucracy', 'Hell_Lilith_Intro'],
		['Hell_Lilith_Intro', 'Hell_Viktor_Intro'],
		['Hell_Viktor_Intro', 'Hell_Light'],
		['Hell_Viktor_Intro', 'Hell_Standard'],
		['Hell_Viktor_Intro', 'Hell_Personalized'],
		['Hell_Light', 'Hell_Debate_Round_1'],
		['Hell_Standard', 'Hell_Debate_Round_1'],
		['Hell_Personalized', 'Hell_Debate_Round_1'],
		['Hell_Debate_Round_1', 'Hell_Exploration'],
		['Hell_Exploration', 'Hell_Exploration_Seed'],
		['Hell_Exploration', 'Hell_Mira_Archive_Open'],
		['Hell_Mira_Archive_Open', 'Hell_Exploration_Seed'],
		['Hell_Exploration_Seed', 'Hell_Viktor_Midgame'],
		['Hell_Exploration_Seed', 'Hell_Breakdown'],
		['Hell_Viktor_Midgame', 'Hell_Breakdown'],
		['Prologue_Mock', 'Ending_CauldronEternal'],
		['Hell_Bureaucracy', 'Ending_CauldronEternal'],
		['Hell_Bureaucracy', 'Ending_DemonFriend'],
		['Hell_Debate_Round_1', 'Ending_Glitch'],
		['Hell_Debate_Round_1', 'Ending_DebateWin'],
		['Hell_Breakdown', 'Ending_Believer'],
		['Hell_Breakdown', 'Ending_Pascal'],
		['Hell_Breakdown', 'Ending_Theologian'],
		['Hell_Breakdown', 'Ending_Rebellion'],
		['Hell_Breakdown', 'Ending_Hacker'],
		['Hell_Breakdown', 'Ending_Democracy'],
		['Hell_Breakdown', 'Ending_Appeal'],
		['Hell_Breakdown', 'Ending_Bar'],
		['Hell_Breakdown', 'Ending_Franchise'],
		['Hell_Breakdown', 'Ending_Therapist'],
		['Hell_Breakdown', 'Ending_Archivist'],
		['Hell_Breakdown', 'Hell_Matrix_Realization'],
		['Hell_Breakdown', 'Ending_Nihilist'],
		['Hell_Breakdown', 'Ending_Prophet'],
		['Hell_Breakdown', 'Ending_Witness'],
		['Hell_Breakdown', 'Ending_LastCall'],
		['Hell_Breakdown', 'Ending_FullCircle'],
		['Hell_Breakdown', 'Hell_Lilith_Romance'],
		['Hell_Matrix_Realization', 'Ending_Matrix'],
		['Hell_Matrix_Realization', 'Ending_Speedrun'],
		['Hell_Matrix_Realization', 'Ending_BetaTester'],
		['Hell_Matrix_Realization', 'Ending_Awakening'],
		['Hell_Matrix_Realization', 'Ending_DevCommentary'],
		['Hell_Matrix_Realization', 'Ending_EmptyThrone'],
		['Hell_Matrix_Realization', 'Ending_AnonFromHell'],
		['Hell_Matrix_Realization', 'Ending_ControlGroup'],
		['Hell_Matrix_Realization', 'Hell_Bug_Discovery'],
		['Hell_Bug_Discovery', 'Ending_IAmTheBug'],
		['Hell_Matrix_Realization', 'Ending_AliceLog'],
		['Hell_Matrix_Realization', 'Ending_AliceSilent'],
		['Hell_Lilith_Romance', 'Ending_HellRomance'],
		['Hell_Lilith_Romance', 'Ending_EscapeTogether'],
		['Hell_Lilith_Romance', 'Ending_LilithBetrayal'],
		['Hell_Lilith_Romance', 'Ending_LilithConflicted'],
		['Hell_Lilith_Romance', 'Escape_Caught'],

		// Expansion Pack v1 — edges from Breakdown to side doors and onward
		['Hell_Breakdown', 'Expansion_Router'],
		['Expansion_Router', 'Expansion_Cafeteria_Intro'],
		['Expansion_Router', 'Expansion_Library_Intro'],
		['Expansion_Router', 'Expansion_Union_Intro'],
		['Expansion_Router', 'Expansion_Helpdesk_Intro'],
		['Expansion_Router', 'Expansion_AtheistGroup_Intro'],
		['Expansion_Router', 'Expansion_Child_Intro'],
		['Expansion_Router', 'Expansion_Father_Intro'],
		['Expansion_Router', 'Expansion_Maintenance_Intro'],
		['Expansion_Router', 'Expansion_Inna_Intro'],

		['Expansion_Cafeteria_Intro', 'Ending_HellChef'],
		['Expansion_Cafeteria_Intro', 'Ending_CafeteriaLeader'],

		['Expansion_Library_Intro', 'Ending_Library_Read'],
		['Expansion_Library_Intro', 'Ending_LetterToSergey'],
		['Expansion_Library_Intro', 'Ending_FatherReply'],
		['Expansion_Library_Intro', 'Ending_UnspokenPrayers'],
		['Expansion_Library_Intro', 'Expansion_Father_Intro'],

		['Expansion_Union_Intro', 'Ending_HellStrike'],
		['Expansion_Union_Intro', 'Ending_DemonLawsuit'],
		['Expansion_Union_Intro', 'Ending_GreatUnion'],
		['Expansion_Union_Intro', 'Ending_DemonPension'],

		['Expansion_Helpdesk_Intro', 'Ending_HardReset'],
		['Expansion_Helpdesk_Intro', 'Ending_LogsReader'],
		['Expansion_Helpdesk_Intro', 'Ending_PullRequest'],

		['Expansion_AtheistGroup_Intro', 'Ending_TruthGroup'],
		['Expansion_AtheistGroup_Intro', 'Ending_AtheistTherapist'],
		['Expansion_AtheistGroup_Intro', 'Ending_AtheistGroup_Stay'],

		['Expansion_Child_Intro', 'Ending_ChildKeep'],
		['Expansion_Child_Intro', 'Ending_ChildSaved'],
		['Expansion_Child_Intro', 'Ending_FamilyHell'],

		['Expansion_Father_Intro', 'Ending_FatherSon'],
		['Expansion_Father_Intro', 'Ending_FatherEscape'],

		['Expansion_Maintenance_Intro', 'Ending_DevMaintenance'],
		['Expansion_Maintenance_Intro', 'Ending_EULAReader'],
		['Expansion_Maintenance_Intro', 'Ending_Removed'],
		['Expansion_Maintenance_Intro', 'Ending_DevColleague'],

		['Expansion_Inna_Intro', 'Ending_InnaRomance'],
		['Expansion_Inna_Intro', 'Ending_InnaForgive'],
		['Expansion_Inna_Intro', 'Ending_InnaRevolt'],

		// Expansion v2 prologue sidehooks
		['Prologue_Morning_Choice', 'Prologue_Window'],
		['Prologue_Morning_Choice', 'Prologue_Mirror'],
		['Prologue_Morning_Choice', 'Prologue_Neighbor'],

		// Judgment hook chain
		['Judgment_Audience', 'Judgment_Settle'],
		['Judgment_Audience', 'Judgment_Witness'],
		['Judgment_Audience', 'Judgment_Savepoint'],
		['Judgment_Audience', 'Judgment_Lawyer'],
		['Judgment_Audience', 'Ending_Teapot'],
		['Judgment_Audience', 'Ending_GoldenRule'],

		['Judgment_Settle', 'Ending_Settlement_Small'],
		['Judgment_Settle', 'Ending_Settlement_Large'],
		['Judgment_Settle', 'Ending_Settlement_Meta'],
		['Judgment_Witness', 'Ending_WitnessSelf'],
		['Judgment_Savepoint', 'Ending_Savepoint'],
		['Judgment_Lawyer', 'Ending_FatherDefense'],
		['Judgment_Lawyer', 'Ending_SergeyDefense'],
		['Judgment_Lawyer', 'Ending_RedditDefense'],
		['Judgment_Lawyer', 'Ending_PastSelfDefense'],

		// Expansion router hooks for microendings
		['Expansion_Router', 'Ending_404'],
		['Expansion_Router', 'Ending_StackOverflow'],
		['Expansion_Router', 'Ending_KernelPanic'],
		['Expansion_Router', 'Ending_OutOfMemory'],
		['Expansion_Router', 'Ending_GitBlame'],

		// Expansion v3 edges
		['Expansion_Router', 'Expansion_Bar_Entry'],
		['Expansion_Router', 'Expansion_Encounter_Random'],
		['Expansion_Router', 'Expansion_Loop_Discovery'],
		['Expansion_Bar_Entry', 'Ending_Bar_Guitar'],
		['Expansion_Bar_Entry', 'Ending_BarFranchise2'],
		['Expansion_Encounter_Random', 'Ending_AnyaForgiven'],
		['Expansion_Encounter_Random', 'Ending_AnyaLove'],
		['Expansion_Encounter_Random', 'Ending_AnyaTogether'],
		['Expansion_Loop_Discovery', 'Ending_LoopBroken'],
		['Expansion_Loop_Discovery', 'Ending_AcceptedLoop'],
		['Expansion_Loop_Discovery', 'Ending_LoopComplete'],
		['Prologue_Morning_Choice', 'Expansion_Speedrun_Start'],
		['Expansion_Speedrun_Start', 'Ending_SpeedrunMaster'],

		// Expansion v4 edges
		['Prologue_Inna_Professional', 'Prologue_Boss_Meeting'],
		['Prologue_Boss_Meeting', 'Prologue_Leave_Ontime'],
		['Prologue_Boss_Meeting', 'Prologue_Stay_Late'],
		['Prologue_Boss_Meeting', 'Prologue_Death_Car'],
		['Expansion_Bar_Entry', 'Expansion_Bar_Quiz'],
		['Expansion_Bar_Quiz', 'Expansion_Famous_Meeting'],
		['Expansion_Famous_Meeting', 'Ending_SaganGuide'],
		['Expansion_Famous_Meeting', 'Ending_PaleBlueDot'],
		['Expansion_Famous_Meeting', 'Ending_CosmosAfterlife'],
		['Expansion_Router', 'Expansion_Final_Doors'],
		['Expansion_Final_Doors', 'Expansion_Subscription'],
		['Expansion_Final_Doors', 'Expansion_Programmer_Intro'],
		['Expansion_Subscription', 'Ending_BogPremium'],
		['Expansion_Subscription', 'Ending_FreeUser'],
		['Expansion_Subscription', 'Ending_UnsubscribePreemptive'],
		['Expansion_Programmer_Intro', 'Ending_ProgrammerRebel'],
		['Expansion_Programmer_Intro', 'Ending_RefactorSelf'],
		['Expansion_Programmer_Intro', 'Ending_V1Forever'],
		['Expansion_Router', 'Expansion_Just_Lilith_Alt']
	]
};

// ============================================================
// Seen-text persistence (across all playthroughs)
// ============================================================
var _seenLabels = JSON.parse (localStorage.getItem ('tla_seen_labels') || '{}');

function markLabelVisited (label) {
	if (!label || _seenLabels[label]) return;
	_seenLabels[label] = 1;
	localStorage.setItem ('tla_seen_labels', JSON.stringify (_seenLabels));
}

function isLabelVisited (label) {
	return !!_seenLabels[label];
}

// ============================================================
// Initialization
// ============================================================
// Глобальный перехват «Wait period has not ended.»: внутри Monogatari эта
// ошибка может отвергаться без участия наших обёрток над proceed/run, что
// засоряет консоль и в потенциале мешает отладчикам считать игру стабильной.
// Это не баг сценария, а нормальная ситуация при быстром proceed во время `wait N`.
if (typeof window !== 'undefined') {
	window.addEventListener ('unhandledrejection', function (event) {
		var reason = event && event.reason;
		var msg = reason && (reason.message || reason);
		if (typeof msg === 'string' && /Wait period has not ended/i.test (msg)) {
			event.preventDefault ();
		}
	});
}

$_ready (() => {
	monogatari.init ('#monogatari').then (() => {
		installProceedGuard ();
		addSkipButton ();
		addRouteMapButton ();
		watchMainMenuForRouteMapBtn ();
		updateEndingCounter ();
		startLabelTracker ();
		initJustLilithEasterEgg ();
		initPostGlitchEffects ();
		initDevMode ();

		const observer = new MutationObserver (() => {
			updateEndingCounter ();
		});
		const mainScreen = document.querySelector ('[data-screen="main"]');
		if (mainScreen) {
			observer.observe (mainScreen, { attributes: true });
		}
	});
});

// ============================================================
// Runtime guard: recover from script actions that reject forever
// ============================================================
function installProceedGuard () {
	if (monogatari._tlaProceedGuardInstalled || typeof monogatari.proceed !== 'function') return;

	const originalProceed = monogatari.proceed.bind (monogatari);
	const originalRun = monogatari.run.bind (monogatari);
	const originalLoadFromSlot = typeof monogatari.loadFromSlot === 'function' ? monogatari.loadFromSlot.bind (monogatari) : null;
	monogatari._tlaProceedGuardInstalled = true;

	monogatari.run = function () {
		return originalRun.apply (monogatari, arguments).catch (function (error) {
			if (isWaitPeriodError (error)) {
				// Игрок проматывает во время `wait N` — это не баг, просто ждём.
				return;
			}
			if (!isRecoverableScriptError (error)) {
				throw error;
			}

			const label = monogatari.state ('label');
			const step = monogatari.state ('step');
			console.warn ('[TLA] Skipping bad script action after Monogatari run rejection', {
				label: label,
				step: step,
				error: String (error)
			});

			return skipRejectedStatement (label, step);
		});
	};

	monogatari.proceed = function () {
		return originalProceed.apply (monogatari, arguments).catch (function (error) {
			if (isWaitPeriodError (error)) {
				// Игрок проматывает во время `wait N` — обычное дело при скипе.
				return;
			}
			if (!isRecoverableScriptError (error)) {
				throw error;
			}

			const label = monogatari.state ('label');
			const step = monogatari.state ('step');
			console.warn ('[TLA] Skipping bad script action after Monogatari rejection', {
				label: label,
				step: step,
				error: String (error)
			});

			return skipRejectedStatement (label, step);
		});
	};

	if (originalLoadFromSlot) {
		monogatari.loadFromSlot = function () {
			return originalLoadFromSlot.apply (monogatari, arguments).then (function (result) {
				schedulePostLoadRecovery ();
				return result;
			}).catch (function (error) {
				recoverFromLoadFailure ();
				throw error;
			});
		};
	}
}

function isRecoverableScriptError (error) {
	const message = String (error && (error.message || error));
	return message === 'Extra condition check failed.';
}

function isWaitPeriodError (error) {
	const message = String (error && (error.message || error));
	return /Wait period has not ended/i.test (message);
}

function skipRejectedStatement (label, step) {
	const script = monogatari.label (label);
	const nextStep = step + 1;
	monogatari.state ({ label: label, step: nextStep });

	if (!script || !script[nextStep]) {
		return Promise.resolve ();
	}

	return monogatari.run (script[nextStep], false);
}

function recoverFromLoadFailure () {
	try {
		monogatari.global ('playing', false);
		monogatari.global ('block', false);
		monogatari.global ('_engine_block', false);
		monogatari.showScreen ('load');
	} catch (e) {
		try { monogatari.showScreen ('main'); } catch (ignored) {}
	}
}

function schedulePostLoadRecovery () {
	setTimeout (recoverEmptyGameScreenAfterLoad, 400);
	setTimeout (recoverEmptyGameScreenAfterLoad, 1200);
}

function recoverEmptyGameScreenAfterLoad () {
	try {
		const gameScreen = document.querySelector ('[data-screen="game"]');
		const choiceContainer = document.querySelector ('choice-container, [data-component="choice-container"]');
		const centered = document.querySelector ('[data-component="centered-dialog"]');
		const sayText = document.querySelector ('[data-ui="say"]');
		const hasChoices = choiceContainer && choiceContainer.children.length > 0;
		const hasCentered = centered && centered.innerText.trim ();
		const hasSayText = sayText && sayText.innerText.trim ();
		const gameOpen = gameScreen && gameScreen.classList.contains ('active');

		if (!gameOpen || hasChoices || hasCentered || hasSayText) return;

		console.warn ('[TLA] Empty game screen after load; advancing one step to recover dialogue', {
			label: monogatari.state ('label'),
			step: monogatari.state ('step')
		});
		monogatari.global ('block', false);
		monogatari.global ('_engine_block', false);
		monogatari.proceed ();
	} catch (e) {
		console.warn ('[TLA] Post-load recovery failed', e);
	}
}

// ============================================================
// Label tracker — polls the engine state to record visited labels
// ============================================================
function startLabelTracker () {
	var _lastLabel = '';
	setInterval (function () {
		try {
			var label = monogatari.state ('label');
			if (label && label !== _lastLabel) {
				_lastLabel = label;
				markLabelVisited (label);
			}
		} catch (e) {}
	}, 200);
}

// ============================================================
// Ending counter on main screen
// ============================================================
function updateEndingCounter () {
	const mainScreen = document.querySelector ('[data-screen="main"]');
	if (!mainScreen) return;

	let counter = document.getElementById ('ending-counter');
	if (!counter) {
		counter = document.createElement ('div');
		counter.id = 'ending-counter';
		counter.style.cssText = 'position:absolute;bottom:15px;left:50%;transform:translateX(-50%);' +
			'color:rgba(255,255,255,0.6);font-size:0.85em;font-family:inherit;cursor:pointer;' +
			'transition:color 0.3s;z-index:10;text-align:center;';
		counter.addEventListener ('mouseenter', () => { counter.style.color = '#ff6666'; });
		counter.addEventListener ('mouseleave', () => { counter.style.color = 'rgba(255,255,255,0.6)'; });
		counter.addEventListener ('click', showEndingGallery);
		mainScreen.style.position = 'relative';
		mainScreen.appendChild (counter);
	}

	const endings = JSON.parse (localStorage.getItem ('tla_endings') || '{}');
	const count = Object.keys (endings).length;
	counter.textContent = 'Концовки: ' + count + ' / ' + Object.keys (ALL_ENDINGS).length;
}

function showEndingGallery () {
	const endings = JSON.parse (localStorage.getItem ('tla_endings') || '{}');
	let html = '<div style="max-height:60vh;overflow-y:auto;text-align:left;padding:10px;">';
	html += '<h3 style="text-align:center;margin-bottom:15px;">Коллекция концовок</h3>';

	for (const [key, name] of Object.entries (ALL_ENDINGS)) {
		const found = endings[key];
		if (found) {
			html += '<p style="margin:5px 0;color:#88ff88;">✓ ' + name + '</p>';
		} else {
			html += '<p style="margin:5px 0;color:#666;">? ? ? ? ?</p>';
		}
	}

	html += '</div>';

	monogatari.action ('message').messages ({
		'EndingGallery': {
			title: 'Концовки: ' + Object.keys (endings).length + ' / ' + Object.keys (ALL_ENDINGS).length,
			subtitle: 'Нажмите, чтобы закрыть',
			body: html
		}
	});

	monogatari.run ('show message EndingGallery', false);
}

// ============================================================
// Skip / Fast-forward button
// Uses label-level tracking: a label is "seen" if it was ever
// entered during ANY playthrough (persisted in localStorage).
//
// Strategy: place the button as a fixed-position overlay near
// the bottom bar (Shadow DOM makes appendChild unreliable),
// and use the engine's own monogatari.skip() API to advance.
// A watchdog interval handles "seen" mode stops and acceleration.
// ============================================================
var _skipWatchdog = null;
var _skipMode = 'seen';
var _skipActive = false;

// --- Skip acceleration: bypass wait() and CSS animations ---
var _skipStyleEl = null;
var _origSetTimeout = window.setTimeout.bind (window);

function _enableSkipAcceleration () {
	_skipActive = true;

	// Inject CSS that kills all animations and transitions instantly
	if (!_skipStyleEl) {
		_skipStyleEl = document.createElement ('style');
		_skipStyleEl.id = 'skip-acceleration-css';
		_skipStyleEl.textContent =
			'*, *::before, *::after {' +
			'  animation-duration: 0s !important;' +
			'  animation-delay: 0s !important;' +
			'  transition-duration: 0s !important;' +
			'  transition-delay: 0s !important;' +
			'}';
		document.head.appendChild (_skipStyleEl);
	}

	// Monkey-patch setTimeout: timers ≤ 10s (wait commands,
	// engine transition delays) fire near-instantly during skip
	window.setTimeout = function (fn, delay) {
		if (_skipActive && typeof fn === 'function' && typeof delay === 'number' && delay > 5 && delay <= 10000) {
			return _origSetTimeout (fn, 1);
		}
		return _origSetTimeout.apply (window, arguments);
	};
}

function _disableSkipAcceleration () {
	_skipActive = false;

	if (_skipStyleEl && _skipStyleEl.parentNode) {
		_skipStyleEl.parentNode.removeChild (_skipStyleEl);
		_skipStyleEl = null;
	}

	window.setTimeout = _origSetTimeout;
}

function stopSkip () {
	// Stop engine skip
	try { monogatari.skip (false); } catch (e) {}

	if (_skipWatchdog) {
		clearInterval (_skipWatchdog);
		_skipWatchdog = null;
	}
	_disableSkipAcceleration ();

	var btn = document.getElementById ('skip-btn');
	if (btn) {
		btn.style.opacity = '0.7';
		btn.style.color = '';
		btn.textContent = '⏩';
	}
}

function startSkip () {
	var btn = document.getElementById ('skip-btn');
	if (btn) {
		btn.style.opacity = '1';
		btn.style.color = _skipMode === 'all' ? '#ffaa00' : '#ff6666';
		btn.textContent = _skipMode === 'all' ? '⏭' : '⏩';
	}

	_enableSkipAcceleration ();

	// Use the engine's built-in skip (calls proceed in a loop)
	try { monogatari.skip (true); } catch (e) {}

	// Watchdog: stop at choices, modals, or unseen labels
	_skipWatchdog = setInterval (function () {
		try {
			// Stop at choices
			var choices = document.querySelector ('choice-container');
			if (!choices) choices = document.querySelector ('[data-component="choice-container"]');
			if (choices && choices.children.length > 0) {
				stopSkip ();
				return;
			}
			// Stop at messages (modals)
			var msg = document.querySelector ('[data-component="message-modal"]');
			if (msg && msg.classList.contains ('active')) {
				stopSkip ();
				return;
			}
			// In "seen" mode, stop if current label was never visited
			if (_skipMode === 'seen') {
				var label = monogatari.state ('label');
				if (label && !isLabelVisited (label)) {
					stopSkip ();
					return;
				}
			}
		} catch (e) {
			stopSkip ();
		}
	}, 100);
}

function addSkipButton () {
	// Create button as a fixed overlay — avoids Shadow DOM issues
	var skipBtn = document.createElement ('div');
	skipBtn.id = 'skip-btn';
	skipBtn.textContent = '⏩';
	skipBtn.title = 'Перемотка (двойной клик — переключить режим)';
	skipBtn.style.cssText =
		'position:fixed; bottom:8px; right:8px; z-index:99999;' +
		'cursor:pointer; font-size:1.5em; padding:6px 10px;' +
		'opacity:0.7; user-select:none;' +
		'background:rgba(0,0,0,0.5); border-radius:8px;' +
		// display:none по умолчанию — кнопке нечего делать на главном меню/splash.
		'display:none;' +
		'transition:all 0.2s; line-height:1;';
	skipBtn.addEventListener ('mouseenter', function () {
		if (!_skipWatchdog) skipBtn.style.opacity = '1';
	});
	skipBtn.addEventListener ('mouseleave', function () {
		if (!_skipWatchdog) skipBtn.style.opacity = '0.7';
	});

	var _lastClick = 0;
	skipBtn.addEventListener ('click', function (e) {
		e.stopPropagation ();
		e.preventDefault ();
		var now = Date.now ();

		// Double-click: toggle mode
		if (now - _lastClick < 400) {
			_skipMode = _skipMode === 'all' ? 'seen' : 'all';
			_lastClick = 0;
			if (_skipWatchdog) {
				skipBtn.textContent = _skipMode === 'all' ? '⏭' : '⏩';
				skipBtn.style.color = _skipMode === 'all' ? '#ffaa00' : '#ff6666';
			}
			return;
		}
		_lastClick = now;

		if (_skipWatchdog) {
			stopSkip ();
		} else {
			startSkip ();
		}
	});

	document.body.appendChild (skipBtn);

	// Показываем только когда игрок реально в игре (game-screen активен и
	// не идёт сплеш-сцена). Стартует скрытой — см. style.display=none выше.
	setInterval (function () {
		var gameScreen = document.querySelector ('[data-screen="game"]');
		var gameOpen = gameScreen && (gameScreen.classList.contains ('active') ||
			getComputedStyle (gameScreen).display !== 'none');
		var onSplash = gameScreen && gameScreen.classList.contains ('splash-screen');
		var label = (function () { try { return monogatari.state ('label'); } catch { return ''; } }) ();
		var isStartLabel = label === 'Start' || label === '_SplashScreen' || label === '';
		skipBtn.style.display = (gameOpen && !onSplash && !isStartLabel) ? '' : 'none';
	}, 500);
}

// ============================================================
// Route Map button and rendering
// ============================================================
function addRouteMapButton () {
	const quickMenu = document.querySelector ('[data-component="quick-menu"]');
	if (!quickMenu) return;

	const mapBtn = document.createElement ('span');
	mapBtn.textContent = '🗺';
	mapBtn.title = 'Карта рутов';
	mapBtn.style.cssText = 'cursor:pointer;font-size:1.1em;padding:0 8px;opacity:0.6;transition:all 0.2s;user-select:none;';
	mapBtn.id = 'route-map-btn';

	mapBtn.addEventListener ('click', function (e) {
		e.stopPropagation ();
		showRouteMap ();
	});

	quickMenu.appendChild (mapBtn);

	// Also add to main menu. Скрин рендерится не сразу — пытаемся, и если не вышло,
	// наблюдаем за DOM до появления кнопок главного меню.
	tryInsertMainRouteMapBtn ();
}

function tryInsertMainRouteMapBtn () {
	if (document.getElementById ('main-route-map-btn')) return true;
	var mainScreen = document.querySelector ('[data-screen="main"]');
	if (!mainScreen) return false;
	// `<main-menu>` внутри main-screen — web-component, его кнопки лежат в shadow root.
	// Берём первый подходящий контейнер, в который наш button реально встанет.
	var menuHost = mainScreen.querySelector ('[data-action-list="in-menu"]')
		|| mainScreen.querySelector ('main-menu')
		|| mainScreen.querySelector ('div')
		|| mainScreen;
	var mainMapBtn = document.createElement ('button');
	mainMapBtn.textContent = '🗺 Карта рутов';
	mainMapBtn.id = 'main-route-map-btn';
	mainMapBtn.style.cssText = 'margin-top:0.5em;cursor:pointer;background:transparent;border:1px solid currentColor;color:inherit;padding:0.4em 0.8em;font-family:inherit;font-size:0.95em;';
	mainMapBtn.addEventListener ('click', showRouteMap);
	try { menuHost.appendChild (mainMapBtn); } catch (e) { return false; }
	return true;
}

// Наблюдатель за main-screen: при показе главного меню гарантируем,
// что кнопка карты рутов в нём присутствует.
function watchMainMenuForRouteMapBtn () {
	var mainScreen = document.querySelector ('[data-screen="main"]');
	if (!mainScreen) return;
	if (tryInsertMainRouteMapBtn ()) return;
	var observer = new MutationObserver (function () {
		if (tryInsertMainRouteMapBtn ()) observer.disconnect ();
	});
	observer.observe (mainScreen, { childList: true, subtree: true, attributes: true });
}

function showRouteMap () {
	var overlay = document.getElementById ('route-map-overlay');
	if (overlay) {
		overlay.remove ();
		return;
	}

	overlay = document.createElement ('div');
	overlay.id = 'route-map-overlay';

	var endings = JSON.parse (localStorage.getItem ('tla_endings') || '{}');

	var html = '<div class="route-map-header">';
	html += '<h2>Карта рутов</h2>';
	html += '<span class="route-map-close" id="route-map-close">&times;</span>';
	html += '</div>';
	html += '<div class="route-map-legend">';
	ROUTE_MAP.groups.forEach (function (g) {
		html += '<span class="route-map-legend-item"><span class="route-map-dot" style="background:' + g.color + '"></span>' + g.title + '</span>';
	});
	html += '<span class="route-map-legend-item"><span class="route-map-dot" style="background:#333;border:1px dashed #555;"></span>Не открыто</span>';
	html += '</div>';
	html += '<div class="route-map-scroll" id="route-map-scroll">';
	html += renderRouteMapSVG (endings);
	html += '</div>';

	overlay.innerHTML = html;
	document.body.appendChild (overlay);

	document.getElementById ('route-map-close').addEventListener ('click', function () {
		overlay.remove ();
	});
	overlay.addEventListener ('click', function (e) {
		if (e.target === overlay) overlay.remove ();
	});
}

function renderRouteMapSVG (endings) {
	var nodes = ROUTE_MAP.nodes;
	var edges = ROUTE_MAP.edges;
	var groupMap = {};
	ROUTE_MAP.groups.forEach (function (g) { groupMap[g.id] = g; });

	// Layout: assign positions
	var nodePos = {};
	var groupRows = { prologue: [], judgment: [], hell: [], endings: [] };
	nodes.forEach (function (n) {
		if (groupRows[n.group]) groupRows[n.group].push (n);
	});

	var Y_OFFSETS = { prologue: 0, judgment: 1, hell: 2, endings: 3 };
	var ROW_HEIGHT = 100;
	var COL_WIDTH = 110;
	var PAD_X = 60;
	var PAD_Y = 50;

	Object.keys (groupRows).forEach (function (gid) {
		var row = groupRows[gid];
		var y = Y_OFFSETS[gid] * ROW_HEIGHT + PAD_Y;
		var totalWidth = row.length * COL_WIDTH;
		var startX = PAD_X;
		row.forEach (function (n, i) {
			nodePos[n.id] = { x: startX + i * COL_WIDTH + COL_WIDTH / 2, y: y + ROW_HEIGHT / 2 };
		});
	});

	var svgW = Math.max (800, PAD_X * 2 + Math.max.apply (null, Object.keys (groupRows).map (function (k) { return groupRows[k].length * COL_WIDTH; })));
	var svgH = PAD_Y * 2 + 4 * ROW_HEIGHT;

	var svg = '<svg viewBox="0 0 ' + svgW + ' ' + svgH + '" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;min-width:700px;">';

	// Group backgrounds
	Object.keys (groupRows).forEach (function (gid) {
		var g = groupMap[gid];
		var y = Y_OFFSETS[gid] * ROW_HEIGHT + PAD_Y;
		var row = groupRows[gid];
		if (!row.length) return;
		var w = row.length * COL_WIDTH + 20;
		svg += '<rect x="' + (PAD_X - 10) + '" y="' + (y - 5) + '" width="' + w + '" height="' + (ROW_HEIGHT - 5) + '" rx="8" fill="' + g.color + '" opacity="0.06" />';
		svg += '<text x="' + (PAD_X - 5) + '" y="' + (y + 12) + '" fill="' + g.color + '" font-size="11" opacity="0.5" font-family="PT Serif,serif">' + g.title + '</text>';
	});

	// Edges
	edges.forEach (function (e) {
		var from = nodePos[e[0]];
		var to = nodePos[e[1]];
		if (!from || !to) return;
		var visited = isLabelVisited (e[0]) && isLabelVisited (e[1]);
		var color = visited ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.06)';
		var width = visited ? '1.5' : '0.8';
		// Curved line for clarity
		var midY = (from.y + to.y) / 2;
		svg += '<path d="M' + from.x + ',' + from.y + ' Q' + from.x + ',' + midY + ' ' + to.x + ',' + to.y + '" fill="none" stroke="' + color + '" stroke-width="' + width + '"/>';
	});

	// Nodes
	nodes.forEach (function (n) {
		var pos = nodePos[n.id];
		if (!pos) return;
		var visited = isLabelVisited (n.id);
		var isEnding = !!n.ending;
		var endingUnlocked = isEnding && endings[n.ending];
		var g = groupMap[n.group] || { color: '#666' };

		var r = isEnding ? 18 : 14;
		var fillColor, strokeColor, textColor, textOpacity, labelText;

		if (visited || endingUnlocked) {
			fillColor = g.color;
			strokeColor = g.color;
			textColor = '#fff';
			textOpacity = '1';
			labelText = n.label;
		} else {
			fillColor = '#1a1a1a';
			strokeColor = '#444';
			textColor = '#555';
			textOpacity = '0.5';
			labelText = isEnding ? '???' : n.label;
		}

		if (isEnding && endingUnlocked) {
			svg += '<circle cx="' + pos.x + '" cy="' + pos.y + '" r="' + (r + 3) + '" fill="none" stroke="' + g.color + '" stroke-width="1" opacity="0.3"/>';
		}

		svg += '<circle cx="' + pos.x + '" cy="' + pos.y + '" r="' + r + '" fill="' + fillColor + '" stroke="' + strokeColor + '" stroke-width="' + (visited ? '2' : '1') + '" ' + (visited ? '' : 'stroke-dasharray="3,3"') + ' opacity="' + (visited || endingUnlocked ? '0.9' : '0.4') + '"/>';

		// Text label (truncated)
		var displayLabel = labelText.length > 10 ? labelText.substring (0, 9) + '…' : labelText;
		svg += '<text x="' + pos.x + '" y="' + (pos.y + 4) + '" text-anchor="middle" fill="' + textColor + '" font-size="' + (isEnding ? '8' : '9') + '" font-family="PT Serif,serif" opacity="' + textOpacity + '">' + displayLabel + '</text>';

		if (isEnding && endingUnlocked) {
			svg += '<text x="' + pos.x + '" y="' + (pos.y - r - 5) + '" text-anchor="middle" fill="' + g.color + '" font-size="7" font-family="PT Serif,serif">★</text>';
		}
	});

	svg += '</svg>';
	return svg;
}

// ============================================================
// Post-Glitch ending: UI glitches persist on main menu (DDLC-style)
// ============================================================
function initPostGlitchEffects () {
	var endings = JSON.parse (localStorage.getItem ('tla_endings') || '{}');
	if (!endings['glitch']) return;

	setInterval (function () {
		var mainScreen = document.querySelector ('[data-screen="main"]');
		if (!mainScreen || !mainScreen.classList.contains ('active')) return;
		if (Math.random () > 0.05) return;

		mainScreen.style.filter = 'hue-rotate(' + (Math.random () * 30 - 15) + 'deg) saturate(' + (0.8 + Math.random () * 0.4) + ')';
		mainScreen.style.transform = 'translateX(' + (Math.random () * 4 - 2) + 'px)';
		setTimeout (function () {
			mainScreen.style.filter = '';
			mainScreen.style.transform = '';
		}, 150);
	}, 3000);
}

// ============================================================
// Easter egg: "Just Lilith" flashes on main menu
// Triggers if wtf_level was ever maxed (stored across sessions)
// ============================================================
function initJustLilithEasterEgg () {
	// Check if any ending with high lilith_interest was reached
	var endings = JSON.parse (localStorage.getItem ('tla_endings') || '{}');
	var lilithEndings = ['hell_romance', 'escape_together', 'lilith_betrayal', 'lilith_conflicted'];
	var hasLilith = lilithEndings.some (function (e) { return endings[e]; });
	if (!hasLilith) return;

	// Periodically flash "Just Lilith" on main screen
	setInterval (function () {
		var mainScreen = document.querySelector ('[data-screen="main"]');
		if (!mainScreen || !mainScreen.classList.contains ('active')) return;
		if (Math.random () > 0.08) return; // ~8% chance each tick

		var flash = document.createElement ('div');
		flash.textContent = 'Just Lilith';
		flash.style.cssText =
			'position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);' +
			'color:#ff4444;font-family:"PT Serif",serif;font-size:2.5em;font-weight:700;' +
			'text-shadow:0 0 20px rgba(255,0,0,0.8);z-index:999;pointer-events:none;' +
			'opacity:0.9;';
		mainScreen.appendChild (flash);

		setTimeout (function () {
			flash.style.opacity = '0';
			flash.style.transition = 'opacity 0.15s';
			setTimeout (function () { flash.remove (); }, 200);
		}, 300);
	}, 5000);
}

// ============================================================
// Dev mode: show live stats overlay during gameplay
// Toggle with Ctrl+Shift+D (or Cmd+Shift+D on Mac)
// ============================================================
var _devOverlay = null;
var _devInterval = null;

function initDevMode () {
	document.addEventListener ('keydown', function (e) {
		if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'D') {
			e.preventDefault ();
			toggleDevMode ();
		}
	});
}

function toggleDevMode () {
	if (_devOverlay) {
		_devOverlay.remove ();
		_devOverlay = null;
		if (_devInterval) { clearInterval (_devInterval); _devInterval = null; }
		return;
	}

	_devOverlay = document.createElement ('div');
	_devOverlay.id = 'dev-stats-overlay';
	_devOverlay.style.cssText =
		'position:fixed;top:10px;left:10px;z-index:99999;' +
		'background:rgba(0,0,0,0.85);color:#0f0;font-family:monospace;font-size:11px;' +
		'padding:10px 14px;border-radius:6px;border:1px solid #333;' +
		'pointer-events:none;max-width:280px;line-height:1.5;';
	document.body.appendChild (_devOverlay);

	function updateStats () {
		if (!_devOverlay) return;
		try {
			var s = monogatari.storage ();
			var label = monogatari.state ('label') || '—';
			var step = monogatari.state ('step') || 0;

			_devOverlay.innerHTML =
				'<div style="color:#ff6;margin-bottom:4px;font-weight:bold;">DEV MODE</div>' +
				'<div style="color:#888;">Label: <span style="color:#fff;">' + label + '</span> [' + step + ']</div>' +
				'<div style="margin-top:6px;">' +
				stat ('wtf', s.wtf_level) +
				stat ('denial', s.denial_count) +
				stat ('cruelty', s.cruelty_score) +
				stat ('argument', s.argument_quality) +
				stat ('empathy', s.empathy_shown) +
				stat ('humor', s.humor_used) +
				stat ('rebellion', s.rebellion_score) +
				stat ('acceptance', s.acceptance_score) +
				stat ('life', s.life_current + '/' + s.life_max) +
				'</div>' +
				'<div style="margin-top:6px;border-top:1px solid #333;padding-top:4px;">' +
				stat ('lilith', s.lilith_interest) +
				stat ('viktor', s.viktor_friendship) +
				stat ('matrix', s.matrix_suspicion) +
				stat ('demon', s.demon_friendship) +
				stat ('inna', s.inna_interest) +
				stat ('alice', s.alice_rapport) +
				'</div>' +
				'<div style="margin-top:4px;color:#666;">verdict: ' + (s.judgment_verdict || '—') + '</div>';
		} catch (e) {
			_devOverlay.innerHTML = '<div style="color:#f66;">No active game</div>';
		}
	}

	function stat (name, val) {
		var numeric = typeof val === 'number' ? val : parseFloat (val);
		var color = numeric > 0 ? '#0f0' : numeric < 0 ? '#f44' : '#666';
		return '<div>' + name + ': <span style="color:' + color + ';">' + val + '</span></div>';
	}

	updateStats ();
	_devInterval = setInterval (updateStats, 500);
}

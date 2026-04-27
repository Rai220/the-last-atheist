/* global monogatari */

monogatari.storage ({
	player: {
		name: ''
	},

	// --- Ключевые счётчики ---
	wtf_level: 0,            // 0-100, «уровень охреневания»
	denial_count: 0,         // кол-во отрицаний
	cruelty_score: 0,        // жестокость/унижение верующих
	argument_quality: 0,     // качество аргументов (-10 .. +10)
	empathy_shown: 0,        // проявленная эмпатия
	humor_used: 0,           // сарказм
	rebellion_score: 0,      // бунтарство в аду
	acceptance_score: 0,     // принятие
	life_current: 5,         // уровень жизни/стойкости; 0 → котёл
	life_max: 5,

	// --- Флаги: Пролог ---
	prologue_debate_won: false,
	prologue_was_kind: false,
	death_type: 'heart_attack',
	death_flavor: '',            // 'mundane'/'ironic'/'overwork' — влияет на атмосферу ада
	morning_choice: '',
	prologue_personality: '',    // 'aggressive'/'neutral'/'empathetic' — composite
	inna_met: false,
	inna_interest: 0,
	alice_rapport: 0,            // отношение к домашнему ИИ-помощнику
	alice_encountered: false,    // встретили ли мы Алису в аду

	// --- Флаги: Страшный Суд ---
	judgment_tried_vr: false,
	judgment_argued_stats: false,
	judgment_begged: false,
	judgment_verdict: 'standard',

	// --- Флаги: Ад ---
	met_other_atheists: false,
	started_rebellion: false,
	found_bar_location: false,
	debate_cycle: 0,
	demon_friendship: 0,
	lilith_interest: 0,
	lilith_met: false,
	viktor_friendship: 0,
	viktor_met: false,

	// --- Флаги: Матрица ---
	matrix_suspicion: 0,
	noticed_patterns: false,
	debate_strategy: '',         // 'logical'/'procedural'/'absurdist' — выбор в дебатах
	seen_inna_parallels: false,
	lilith_trust: 0,             // эмоциональная глубина, отдельно от interest

	// --- Концовки ---
	ending_reached: '',

	// --- Мини-игры ---
	papers_please_score: 0,
	qte_escapes: 0
});

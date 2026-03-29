/* global monogatari */

monogatari.storage ({
	player: {
		name: ''
	},

	// --- Ключевые счётчики ---
	wtf_level: 0,            // 0-100, «уровень охреневания»
	denial_count: 0,         // кол-во отрицаний
	argument_quality: 0,     // качество аргументов на суде (-10 .. +10)
	empathy_shown: 0,        // проявленная эмпатия
	humor_used: 0,           // сарказм
	rebellion_score: 0,      // бунтарство в аду
	acceptance_score: 0,     // принятие

	// --- Флаги: Пролог ---
	prologue_debate_won: false,
	prologue_was_kind: false,
	death_type: 'heart_attack',

	// --- Флаги: Страшный Суд ---
	judgment_tried_vr: false,
	judgment_argued_stats: false,
	judgment_begged: false,
	judgment_verdict: 'standard',  // 'standard' | 'personalized' | 'light'

	// --- Флаги: Ад ---
	met_other_atheists: false,
	started_rebellion: false,
	found_bar_location: false,
	debate_cycle: 0,

	// --- Флаги: Матрица ---
	matrix_suspicion: 0,     // подозрение что это симуляция
	noticed_patterns: false, // заметил паттерны

	// --- Концовки ---
	ending_reached: '',

	// --- Мини-игры ---
	papers_please_score: 0,
	qte_escapes: 0
});

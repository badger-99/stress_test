export interface Question {
	id: string;
	text: string;
	category: string;
	reverse_score: boolean;
}

export interface Answer {
	id: string;
	/** 0-4 on the PSS scale (Never ... Very often). */
	value: number;
	category: string;
	reverse_score: boolean;
}

export interface Feedback {
	stress_level: string;
	description: string;
	recommendations: string[];
}

export interface Result {
	name: string;
	id: string;
	score: number;
	answers: Record<string, Answer>;
	created_at: number;
	feedback: Feedback;
}

export interface Insight {
	stress_level: string;
	/** Inclusive score range for this band. */
	min_score: number;
	max_score: number;
	description: string;
	recommendations: string[];
}

export interface ResultHistoryItem {
	id: string;
	name: string;
	score: number;
	created_at: number;
	time: string;
	index: number;
}

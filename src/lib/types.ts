export interface Question {
	id: string;
	text: string;
	category: string;
	reverse_score: boolean;
}

export interface StressTest {
	questions: Record<string, Question>;
}

export interface Answer {
	id: string;
	value: number;
	category: string;
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
	time: number;
	feedback: Feedback;
}

export interface Results {
	history: Result[];
	latest: Result | null;
}

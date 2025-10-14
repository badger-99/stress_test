import { StressTest } from './types';

export const stress_test: StressTest = {
	questions: {
		q1: {
			id: "q1",
			question: "I feel tense or on edge during the day.",
			category: "Physical Tension",
			reverse_score: false,
		},
		q2: {
			id: "q2",
			question: "I find it hard to relax even when I have time to rest.",
			category: "Relaxation Difficulty",
			reverse_score: false,
		},
		q3: {
			id: "q3",
			question: "I worry about things more than I'd like to.",
			category: "Worry",
			reverse_score: false,
		},
		q4: {
			id: "q4",
			question: "I feel impatient or easily irritated.",
			category: "Irritability",
			reverse_score: false,
		},
		q5: {
			id: "q5",
			question: "I feel overwhelmed by my responsibilities.",
			category: "Overload",
			reverse_score: false,
		},
		q6: {
			id: "q6",
			question: "I find it hard to concentrate or stay focused.",
			category: "Focus",
			reverse_score: false,
		},
		q7: {
			id: "q7",
			question: "I sleep less or worse than usual.",
			category: "Sleep",
			reverse_score: false,
		},
		q8: {
			id: "q8",
			question: "I feel emotionally drained at the end of the",
			category: "Fatigue",
			reverse_score: false,
		},
		q9: {
			id: "q9",
			question: "I still find small things to enjoy in my day.",
			category: "Positivity",
			reverse_score: true,
		},
		q10: {
			id: "q10",
			question: "I feel supported by people around me.",
			category: "Support",
			reverse_score: true,
		},
	},
};

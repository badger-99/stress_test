import { Insight, Question } from '@/lib/types';

// Question set and feedback bands, formerly the `questions` and `insights`
// tables in Supabase. Kept in the repo so the app needs no database.

export const questions: Question[] = [
	{ id: '1', text: 'I feel tense or on edge during the day.', category: 'Physical Tension', reverse_score: false },
	{ id: '2', text: 'I find it hard to relax even when I have time to rest.', category: 'Relaxation Difficulty', reverse_score: false },
	{ id: '3', text: "I worry about things more than I'd like to.", category: 'Worry', reverse_score: false },
	{ id: '4', text: 'I feel impatient or easily irritated.', category: 'Irritability', reverse_score: false },
	{ id: '5', text: 'I feel overwhelmed by my responsibilities.', category: 'Overload', reverse_score: false },
	{ id: '6', text: 'I find it hard to concentrate or stay focused.', category: 'Focus', reverse_score: false },
	{ id: '7', text: 'I sleep less or worse than usual.', category: 'Sleep', reverse_score: false },
	{ id: '8', text: 'I feel emotionally drained at the end of the day.', category: 'Fatigue', reverse_score: false },
	{ id: '9', text: 'I still find small things to enjoy in my day.', category: 'Positivity', reverse_score: true },
	{ id: '10', text: 'I feel supported by people around me.', category: 'Support', reverse_score: true },
];

// Ordered from lowest to highest stress; the test page picks one by score.
export const insights: Insight[] = [
	{
		stress_level: 'Low',
		description: 'You seem relaxed and emotionally balanced. Keep nurturing that!',
		recommendations: [
			'Keep up your healthy balance — regular breaks and mindful downtime are working well for you.',
			'Stay connected with friends and activities that make you feel good.',
			'Keep a short reflection habit — noting what went well each day strengthens resilience.',
			'Try small mindfulness moments (e.g., noticing your breathing for 30 seconds) to stay centered.',
		],
	},
	{
		stress_level: 'Mild',
		description:
			"You experience some stress, but you're managing it fairly well. A few small lifestyle tweaks might help.",
		recommendations: [
			'Take short pauses between tasks — even 2-3 minutes helps reset your focus.',
			'Notice early signs of tension and stretch or walk it out before continuing.',
			'Set gentle boundaries on screen time or work hours to protect rest.',
			'Keep your weekends restorative — plan one enjoyable or slow activity.',
		],
	},
	{
		stress_level: 'Moderate',
		description:
			"You're feeling the strain of daily pressures. It might help to step back and recharge regularly.",
		recommendations: [
			'Prioritize quality sleep: consistent bedtime and no screens 30 minutes before bed.',
			'Try a daily decompression ritual — breathing exercise, music, or journaling.',
			'Break big tasks into smaller steps to reduce overwhelm.',
			"Share how you're feeling with someone supportive — connection reduces stress load.",
		],
	},
	{
		stress_level: 'High',
		description:
			'Your stress levels appear elevated. Consider reaching out for support or making deliberate rest part of your routine.',
		recommendations: [
			"Talk to someone you trust about what's been weighing on you — you don't have to handle it alone.",
			'Schedule real breaks: even short walks or deep-breathing sessions help calm the system.',
			'Check your basics — sleep, meals, hydration — they matter more than they seem.',
			'If stress feels constant or overwhelming, consider reaching out to a counselor or mental health professional.',
		],
	},
];

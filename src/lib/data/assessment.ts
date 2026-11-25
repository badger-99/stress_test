import { Answer, Insight, Question } from '@/lib/types';

// Perceived Stress Scale, 10-item version (PSS-10).
// Cohen, S., Kamarck, T., & Mermelstein, R. (1983). A global measure of perceived
// stress. Journal of Health and Social Behavior, 24, 385-396.
// Free for non-commercial use; commercial use needs permission.
//
// Each item is answered on a fixed 0-4 scale and the items are summed (0-40).
// The scale was validated with these five discrete answers, so the UI must offer
// exactly these options (no free slider) for the score to mean anything.

export const PROMPT = 'In the last month, how often have you…';

// `display` adds a soft hyphen (\u00AD) so "Sometimes" can break as "Some-times"
// inside a fifth of a phone screen; screen readers get the plain `label`.
export const SCALE = [
	{ value: 0, label: 'Never', display: 'Never' },
	{ value: 1, label: 'Almost never', display: 'Almost never' },
	{ value: 2, label: 'Sometimes', display: 'Some\u00ADtimes' },
	{ value: 3, label: 'Fairly often', display: 'Fairly often' },
	{ value: 4, label: 'Very often', display: 'Very often' },
] as const;

const SCALE_MAX = 4;

// The 4 positively worded items (4, 5, 7, 8) are reverse-scored.
// `category` is the item's factor in the PSS literature: helplessness items raise
// stress directly, self-efficacy items lower it.
const HELPLESSNESS = 'Perceived helplessness';
const SELF_EFFICACY = 'Perceived self-efficacy';

export const questions: Question[] = [
	{ id: '1', text: 'been upset because of something that happened unexpectedly?', category: HELPLESSNESS, reverse_score: false },
	{ id: '2', text: 'felt that you were unable to control the important things in your life?', category: HELPLESSNESS, reverse_score: false },
	{ id: '3', text: 'felt nervous and stressed?', category: HELPLESSNESS, reverse_score: false },
	{ id: '4', text: 'felt confident about your ability to handle your personal problems?', category: SELF_EFFICACY, reverse_score: true },
	{ id: '5', text: 'felt that things were going your way?', category: SELF_EFFICACY, reverse_score: true },
	{ id: '6', text: 'found that you could not cope with all the things that you had to do?', category: HELPLESSNESS, reverse_score: false },
	{ id: '7', text: 'been able to control irritations in your life?', category: SELF_EFFICACY, reverse_score: true },
	{ id: '8', text: 'felt that you were on top of things?', category: SELF_EFFICACY, reverse_score: true },
	{ id: '9', text: 'been angered because of things that happened that were outside of your control?', category: HELPLESSNESS, reverse_score: false },
	{ id: '10', text: 'felt difficulties were piling up so high that you could not overcome them?', category: HELPLESSNESS, reverse_score: false },
];

export const MAX_SCORE = questions.length * SCALE_MAX; // 40

/** Total PSS-10 score: sum of item values, with reverse-scored items flipped (4 - value). */
export function scoreAnswers(answers: Record<string, Answer>): number {
	return Object.values(answers).reduce(
		(total, a) => total + (a.reverse_score ? SCALE_MAX - a.value : a.value),
		0
	);
}

// Bands 0-13 / 14-26 / 27-40 are the cutoffs most commonly used with the PSS-10.
// They are a convention, not official norms from the scale's authors, so the
// report presents them as a guide.
export const PROFESSIONAL_HELP =
	'If stress feels constant or overwhelming, consider reaching out to a counselor or mental health professional.';

export const insights: Insight[] = [
	{
		stress_level: 'Low',
		min_score: 0,
		max_score: 13,
		description:
			"Your answers suggest you've been handling the demands of the last month fairly well. Keep nurturing what's working.",
		recommendations: [
			'Keep up your healthy balance — regular breaks and mindful downtime are working well for you.',
			'Stay connected with friends and activities that make you feel good.',
			'Keep a short reflection habit — noting what went well each day strengthens resilience.',
			'Notice early signs of tension and stretch or walk it out before they build up.',
		],
	},
	{
		stress_level: 'Moderate',
		min_score: 14,
		max_score: 26,
		description:
			"You're feeling a noticeable amount of strain from daily pressures. Small, regular ways to step back and recharge can make a real difference.",
		recommendations: [
			'Prioritize quality sleep: consistent bedtime and no screens 30 minutes before bed.',
			'Take short pauses between tasks — even 2-3 minutes helps reset your focus.',
			'Break big tasks into smaller steps to reduce overwhelm.',
			"Share how you're feeling with someone supportive — connection reduces stress load.",
		],
	},
	{
		stress_level: 'High',
		min_score: 27,
		max_score: 40,
		description:
			'Your stress levels appear elevated. Consider reaching out for support and making deliberate rest part of your routine.',
		recommendations: [
			"Talk to someone you trust about what's been weighing on you — you don't have to handle it alone.",
			'Schedule real breaks: even short walks or deep-breathing sessions help calm the system.',
			'Check your basics — sleep, meals, hydration — they matter more than they seem.',
			PROFESSIONAL_HELP,
		],
	},
];

/** The feedback band a total score falls into. */
export function bandFor(score: number): Insight {
	return insights.find((b) => score >= b.min_score && score <= b.max_score) ?? insights[insights.length - 1];
}

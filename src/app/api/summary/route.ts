import { generateText, Output } from 'ai';
import { createDeepSeek } from '@ai-sdk/deepseek';
import { z } from 'zod';
import { bandFor, PROFESSIONAL_HELP, PROMPT, questions, SCALE, scoreAnswers } from '@/lib/data/assessment';
import { Answer } from '@/lib/types';

const instructions = `You write the personal summary section of StressTest, a self-reflection tool based on the Perceived Stress Scale (PSS-10). The person has just answered the 10 PSS-10 questions about the last month. The app has already calculated their stress level and shows it to them separately.

Write directly to the person, using "you", in warm, plain, everyday English. Be honest but never alarming.

Rules:
- Do not mention any numbers: no scores, counts or percentages.
- Base everything only on the answers given. Do not guess at causes, events or circumstances the person did not report.
- This is not a diagnosis. Never name or suggest a medical or mental health condition, and never give advice about medication, supplements or treatment.
- Keep recommendations small, practical and doable this week. Tie each one to something in their answers.
- Plain text only: no markdown, headings, bullet characters or emoji.

Output:
- summary: 2 to 3 sentences. Name the one or two patterns that stand out most in the answers, and acknowledge any strengths they show.
- recommendations: 3 or 4 items, one sentence each.

If the stress level is High, one recommendation must gently suggest talking to someone they trust, or to a counselor or mental health professional.`;

const deepSeek = createDeepSeek({
	apiKey: process.env.DEEPSEEK_API_KEY ?? '',
});

const answerValue = z.number().int().min(0).max(4);
const answersShape = Object.fromEntries(questions.map((q) => [q.id, answerValue]));
const answersSchema = z.object(answersShape).strict();
const requestSchema = z.object({ answers: answersSchema }).strict();

const positive_note = '(positively worded: answering often means less stress)';
function buildPrompt(answers: Record<string, Answer>, level: string): string {
	const line = questions.map((q, i) => {
		const question = q.text;
		const answer = answers[q.id];
		const scale = SCALE.find((option) => answer.value === option.value)?.label;
		const reverse_note = answer.reverse_score ? positive_note : '';

		return `${i + 1}. …${question} ${scale} ${reverse_note}`;
	});
	return [`Stress Level: ${level}`, '', `Answers to "${PROMPT}":`, ...line].join('\n').trim();
}

const PROFESSIONAL_WORDS = /counsell?or|therapist|mental health professional/i;

function ensureProfessionalHelp(recommendations: string[], level: string): string[] {
	if (level !== 'High') return recommendations;

	const alreadyThere = recommendations.some((r) => PROFESSIONAL_WORDS.test(r));
	if (alreadyThere) return recommendations;

	return [...recommendations, PROFESSIONAL_HELP];
}

export async function POST(request: Request) {
	let body;
	try {
		body = await request.json();
	} catch (error) {
		return Response.json({ error: 'Invalid answers' }, { status: 400 });
	}

	const result = requestSchema.safeParse(body);

	if (!result.success) {
		return Response.json({ error: 'Invalid answers' }, { status: 400 });
	}

	const answers: Record<string, Answer> = Object.fromEntries(
		questions.map((q) => [
			q.id,
			{
				id: q.id,
				value: result.data.answers[q.id],
				category: q.category,
				reverse_score: q.reverse_score,
			},
		]),
	);

	const score = scoreAnswers(answers);
	const band = bandFor(score);

	try {
		const { output } = await generateText({
			model: deepSeek('deepseek-v4-flash'),
			instructions,
			output: Output.object({
				schema: z.object({
					summary: z.string().nonempty().nonoptional(),
					recommendations: z.string().array().min(3).max(4),
				}),
			}),
			prompt: buildPrompt(answers, band.stress_level),
			maxOutputTokens: 3000,
			abortSignal: AbortSignal.timeout(20000),
		});

		return Response.json({
			summary: output.summary,
			recommendations: ensureProfessionalHelp(output.recommendations, band.stress_level),
		});
	} catch (error) {
		if (error instanceof Error) {
			console.error('summary failed:', error.name);
		} else {
			console.error('summary failed');
		}
		return Response.json({ error: 'Summary unavailable' }, { status: 502 });
	}
}

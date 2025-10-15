'use client';

import { stress_test } from '@/lib/questions';
import QuestionCard from '@/components/question';
import { useEffect, useState } from 'react';
import { Answer, Result } from '@/lib/types';
import { user } from '@/lib/mock-data';
import { useResults } from '@/providers/results-provider';
import { useRouter } from 'next/navigation';

export default function Test() {
	const suite = stress_test.questions;
	const router = useRouter();
	const { results, setResults } = useResults();
	const [score, setScore] = useState(0);
	const [answers, setAnswers] = useState<Record<string, Answer>>(() => {
		const initialAnswers: Record<string, Answer> = {};
		Object.keys(suite).forEach((qid) => {
			const q = suite[qid];
			initialAnswers[q.id] = { id: q.id, value: 0, category: q.category };
		});
		return initialAnswers;
	});

	const handleResponse = (id: string, value: number, category: string) => {
		setAnswers((prev) => ({ ...prev, [id]: { id, value, category } }));
	};

	useEffect(() => {
		setScore(Object.values(answers).reduce((sum, answer) => sum + answer.value, 0));
	}, [answers, setScore]);

	const handleResults = () => {
		const result: Result = {
			name: user.name,
			id: user.id,
			score,
			answers,
			time: Date.now(),
		};
		setResults({ history: [...results.history, result], latest: result });
		router.push('/results');
	};

	return (
		<div className='flex-1 p-4'>
			<p className='text-2xl font-semibold'>StressTest</p>
			<p>
				Emotional Well-Being Check-In: Quick, friendly self-assessment of perceived stress and
				emotional balance.
			</p>
			<div className='w-full flex flex-col p-2 items-center justify-center gap-6'>
				total score = {`${score}`}
				<p className='text-sm'>
					Answer how much each statement applied to you today (1 = Not at all, 5 = Extremely).
				</p>
				<div className='flex flex-col gap-4 w-3xl'>
					{Object.keys(suite).map((question) => {
						const q = suite[question];
						return (
							<QuestionCard
								key={q.id}
								question={q}
								value={answers[q.id]?.value || 0}
								onChange={(value) => handleResponse(q.id, value, q.category)}
							/>
						);
					})}
				</div>
			</div>
			<button onClick={handleResults}>see results</button>
		</div>
	);
}

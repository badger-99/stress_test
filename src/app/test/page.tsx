'use client';

import { stress_test } from '@/lib/questions';
import QuestionCard from '@/components/question';
import { useEffect, useState } from 'react';
import { Answer, Feedback, Result } from '@/lib/types';
import { insights, user } from '@/lib/data';
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
			initialAnswers[q.id] = { id: q.id, value: 1, category: q.category };
		});
		return initialAnswers;
	});

	const handleResponse = (id: string, value: number, category: string) => {
		setAnswers((prev) => ({ ...prev, [id]: { id, value, category } }));
	};

	useEffect(() => {
		setScore(Object.values(answers).reduce((sum, answer) => sum + answer.value, 0));
  }, [answers, setScore]);
  
  const getFeedback = () => {
    if (score < 20) {
      return insights[1];
    } else if (score < 30) {
      return insights[2];
    } else if (score < 40) {
      return insights[3];
    } else {
      return insights[4];
    }
  }

	const handleResults = () => {
    const result: Result = {
      name: user.name,
      id: user.id,
      score,
      answers,
      time: Date.now(),
      feedback: getFeedback(),
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

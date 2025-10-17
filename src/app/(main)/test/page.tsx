'use client';

import { stress_test } from '@/lib/questions';
import QuestionCard from '@/components/question';
import { useEffect, useState } from 'react';
import { Answer, Feedback, Result } from '@/lib/types';
import { insights, user } from '@/lib/data';
import { useResults } from '@/providers/results-provider';
import { useRouter } from 'next/navigation';
import { useUser } from '@/providers/user-provider';
import { Button } from '@/components/ui/button';

export default function Test() {
	const suite = stress_test.questions;
	const router = useRouter();
	const { results, setResults } = useResults();
	const [score, setScore] = useState(0);
	const [guest, setGuest] = useState('');
	const [answers, setAnswers] = useState<Record<string, Answer>>(() => {
		const initialAnswers: Record<string, Answer> = {};
		Object.keys(suite).forEach((qid) => {
			const q = suite[qid];
			initialAnswers[q.id] = {
				id: q.id,
				value: 1,
				category: q.category,
				reverse_score: q.reverse_score,
			};
		});
		return initialAnswers;
	});
	const { user } = useUser();

	const handleResponse = (id: string, value: number, category: string, reverse_score: boolean) => {
		setAnswers((prev) => ({ ...prev, [id]: { id, value, category, reverse_score } }));
	};

	useEffect(() => {
		let total = 0;
		Object.values(answers).map((answer) => {
			if (answer.reverse_score) {
				total += 6 - answer.value;
			} else {
				total += answer.value;
			}
		});
		setScore(total);
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
	};

	const handleResults = () => {
		const result: Result = {
			name: user ? user.user_metadata.name : guest,
			id: user ? user.id : 'guest123',
			score,
			answers,
			time: Date.now(),
			feedback: getFeedback(),
		};

		setResults({ history: [...results.history, result], latest: result });
		router.push('/results');
	};

	return (
		<div className='flex-1 p-4 mt-8 text-center'>
			<div className='w-full flex flex-col p-2 items-center justify-center gap-6 mb-8'>
				<div>
					<p className='text-2xl font-semibold'>StressTest</p>
					<p className='text-md mt-2 mb-5'>
						Answer how much each statement applied to you today (1 = Not at all, 5 = Extremely).
					</p>
				</div>

				<div className='flex flex-col gap-4 w-3xl'>
					{Object.keys(suite).map((question) => {
						const q = suite[question];
						return (
							<QuestionCard
								key={q.id}
								question={q}
								value={answers[q.id]?.value || 0}
								onChange={(value) => handleResponse(q.id, value, q.category, q.reverse_score)}
							/>
						);
					})}
				</div>
				{user ? (
					<button
						className='border border-foreground bg-gradient-to-br from-blue-600 to-blue-400 p-2 rounded-lg font-semibold text-white cursor-pointer'
						onClick={handleResults}
					>
						See Results
					</button>
				) : (
					<div className='flex flex-row justify-between w-md'>
						<input
							type='text'
							placeholder='Enter Your Name'
							className='p-2 border border-blue-500 rounded-lg w-[20rem]'
							onChange={(e) => setGuest(e.target.value)}
						/>
						<Button
							className='border border-foreground bg-gradient-to-br from-blue-600 to-blue-400 p-2 rounded-lg font-semibold cursor-pointer'
							disabled={!guest}
							onClick={handleResults}
						>
							See Results
						</Button>
					</div>
				)}
			</div>
			<footer className='text-center text-xs text-gray-600 py-6'>
				Made with ♥ — StressTest Prototype ©2025
			</footer>
		</div>
	);
}

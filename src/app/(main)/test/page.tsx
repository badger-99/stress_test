'use client';

import QuestionCard from '@/components/question';
import { useState } from 'react';
import { Answer, Result } from '@/lib/types';
import { useResult } from '@/providers/results-provider';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { bandFor, PROMPT, questions, scoreAnswers } from '@/lib/data/assessment';

export default function Test() {
	const router = useRouter();
	const { addResult } = useResult();
	const [guest, setGuest] = useState('');
	// Only answered items are in here; an item is missing until it's answered.
	const [answers, setAnswers] = useState<Record<string, Answer>>({});

	const answeredCount = Object.keys(answers).length;
	const allAnswered = answeredCount === questions.length;

	const handleResponse = (id: string, value: number, category: string, reverse_score: boolean) => {
		setAnswers((prev) => ({ ...prev, [id]: { id, value, category, reverse_score } }));
	};

	const handleResults = () => {
		// Score and band are worked out from the answers at submit time, never stored separately.
		const score = scoreAnswers(answers);
		const result: Result = {
			name: guest.trim(),
			id: crypto.randomUUID(),
			score,
			answers,
			created_at: Date.now(),
			feedback: bandFor(score),
		};
		addResult(result);
		router.push('/results');
	};

	return (
		<div className='mx-auto flex flex-col md:w-full justify-center items-center text-center py-10 px-2'>
			<div className='flex flex-col md:w-full p-2 items-center justify-center gap-6 mb-8 mx-auto'>
				<div className='flex flex-col mx-auto text-center gap-2 mb-5 max-w-2xl'>
					<p className='text-2xl font-semibold'>StressTest</p>
					<p className='text-md'>
						These questions ask about your feelings and thoughts during the last month. For each
						one, pick how often you felt or thought that way.
					</p>
					<p className='text-lg font-medium mt-2'>{PROMPT}</p>
				</div>

				<div className='flex flex-col gap-4 w-full md:max-w-3xl'>
					{questions.map((q, i) => (
						<QuestionCard
							key={q.id}
							number={i + 1}
							question={q}
							value={answers[q.id]?.value}
							onChange={(value) => handleResponse(q.id, value, q.category, q.reverse_score)}
						/>
					))}
				</div>

				<div className='flex flex-col justify-between gap-4 md:w-md'>
					<p className='text-sm text-muted-foreground' aria-live='polite'>
						{answeredCount} of {questions.length} answered
					</p>
					<input
						type='text'
						placeholder='Enter Your Name'
						className='p-2 border border-blue-500 rounded-lg'
						value={guest}
						onChange={(e) => setGuest(e.target.value)}
					/>
					<Button
						className='border border-foreground bg-gradient-to-br from-blue-600 to-blue-400 p-2 rounded-lg font-semibold cursor-pointer text-white w-fit mx-auto'
						disabled={!guest.trim() || !allAnswered}
						onClick={handleResults}
					>
						See Results
					</Button>
				</div>
			</div>
			<footer className='text-center text-xs text-gray-600 py-6 mx-auto'>
				Alfred M. — StressTest ©2025
			</footer>
		</div>
	);
}

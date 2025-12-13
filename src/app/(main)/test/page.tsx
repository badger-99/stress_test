'use client';

import QuestionCard from '@/components/question';
import { useEffect, useState } from 'react';
import { Answer, Result } from '@/lib/types';
import { useResults } from '@/providers/results-provider';
import { useRouter } from 'next/navigation';
import { useUser } from '@/providers/user-provider';
import { Button } from '@/components/ui/button';
import { useQuestions } from '@/providers/questions-provider';
import { useInsights } from '@/providers/insights-provider';
import { Spinner } from '@/components/ui/spinner';
import { getResults, saveResults } from '@/lib/server_actions/results';

export default function Test() {
	const router = useRouter();
	const { questions } = useQuestions();
	const { insights } = useInsights();
	const { results, setResults } = useResults();
	const [score, setScore] = useState(0);
	const [guest, setGuest] = useState('');
	const [isProcessing, setIsProcessing] = useState(false)
	const [answers, setAnswers] = useState<Record<string, Answer>>(() => {
		const initialAnswers: Record<string, Answer> = {};
		questions.forEach((q) => {
			initialAnswers[q.id] = {
				id: q.id,
				value: 50,
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
			const processed = Math.ceil(answer.value / 20); // converting to 1...5 scale
			if (answer.reverse_score) {
				total += 5 - processed;
			} else {
				total += processed;
			}
		});
		setScore(total);
	}, [answers, setScore]);

	const getFeedback = () => {
		if (score < 20) {
			return insights[0];
		} else if (score < 30) {
			return insights[1];
		} else if (score < 40) {
			return insights[2];
		} else {
			return insights[3];
		}
	};

	const handleResults = async () => {
		if (user) {
			setIsProcessing(true)
			// converting raw 100-scale answers to 1...5 scale
			const processedAnswers = Object.fromEntries(
				Object.entries(answers).map(([k, a]) => [
					k,
					{ ...a, value: Math.ceil(a.value / 20) },
				])
			);
			const result: Result = {
				name: user.user_metadata.name,
				id: user.id,
				score,
				answers: processedAnswers,
				created_at: Date.now(),
				feedback: getFeedback(),
			};
			console.log(result.name)
			await saveResults(result); // calls server action
			const data = await getResults(); // calls server action
			console.log(data.latest?.name)
			setResults(data);
		} else {
			setIsProcessing(true)
			const result: Result = {
				name: guest,
				id: '',
				score,
				answers,
				created_at: Date.now(),
				feedback: getFeedback(),
			};
			
			setResults({ history: [...results.history, result], latest: result });
		}
		
		setIsProcessing(false)
		router.push('/results');
	};

	return (
		<div className='mx-auto flex flex-col md:w-full justify-center items-center text-center py-10 px-2'>
			<div className='flex flex-col md:w-full p-2 items-center justify-center gap-6 mb-8 mx-auto'>
				<div className='flex flex-col mx-auto text-center gap-2 mb-5'>
					<p className='text-2xl font-semibold'>StressTest</p>
					<p className='text-md'>Answer how much each statement applies to you right now.</p>
					<p className='text-md'>(1 = Not at all, 5 = Extremely)</p>
				</div>

				<div className='flex flex-col gap-4 w-full md:max-w-3xl border'>
					{questions.map((q) => {
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
					<Button
						className='border border-foreground bg-gradient-to-br from-blue-600 to-blue-400 p-2 rounded-lg font-semibold cursor-pointer text-white w-fit mx-auto'
						disabled={isProcessing}
						onClick={handleResults}
					>
						{isProcessing ? (
							<>
								<Spinner /> Please wait
							</>
						) : (
							'See Results'
						)}
					</Button>
				) : (
					<div className='flex flex-col justify-between gap-4 md:w-md'>
						<input
							type='text'
							placeholder='Enter Your Name'
							className='p-2 border border-blue-500 rounded-lg'
							onChange={(e) => setGuest(e.target.value)}
						/>
						<Button
							className='border border-foreground bg-gradient-to-br from-blue-600 to-blue-400 p-2 rounded-lg font-semibold cursor-pointer text-white w-fit mx-auto'
							disabled={!guest || isProcessing}
							onClick={handleResults}
						>
							{isProcessing && <Spinner />} See Results
						</Button>
					</div>
				)}
			</div>
			<footer className='text-center text-xs text-gray-600 py-6 mx-auto'>
				Alfred M. — StressTest ©2025
			</footer>
		</div>
	);
}

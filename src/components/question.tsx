import { Question } from '@/lib/types';

interface Props {
  question: Question;
  value: number;
  onChange: (value: number) => void
}

export default function QuestionCard({ question, value, onChange }: Props) {
	return (
		<div className='p-4 rounded-lg bg-secondary dark:bg-secondary/10 border border-foreground/20'>
			<div className='flex items-center justify-between mb-2'>
				<div className='font-medium'>{question.text}</div>
				{/* <div className='text-sm text-gray-300'>{answers[q.id]} / 4</div> */}
			</div>
			<input
				type='range'
				min='1'
				max='5'
				step='1'
				value={value}
				onChange={(e) => onChange(Number(e.target.value))}
				className='w-full'
			/>
			<div className='flex items-center justify-between text-xs text-gray-400 mt-2'>
				<div>Not at all</div>
				<div>Extremely</div>
			</div>
		</div>
	);
}

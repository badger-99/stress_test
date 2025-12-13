import { Question } from '@/lib/types';

interface Props {
  question: Question;
  value: number;
  onChange: (value: number) => void
}

export default function QuestionCard({ question, value, onChange }: Props) {
	return (
		<div className='flex flex-col w-full gap-6 md:gap-4 mx-auto p-4 text-center rounded-lg bg-secondary dark:bg-secondary/10 border border-foreground/20'>
			<p className='font-medium wrap-normal'>{question.text}</p>
			<input
				type='range'
				min='0'
				max='100'
				step='1'
				value={value}
				onChange={(e) => onChange(Number(e.target.value))}
				className='w-full'
			/>
			<div className='flex items-center justify-between text-xs text-gray-400'>
				<div>Not at all</div>
				<div>Extremely</div>
			</div>
		</div>
	);
}

import { Question } from "@/lib/types";

interface Props {
  question: Question;
}

export default function QuestionCard({question}: Props) {
  return (
		<div className='p-4 rounded-lg bg-white/3 border border-white/6'>
			<div className='flex items-center justify-between mb-2'>
				<div className='font-medium'>{question.text}</div>
				{/* <div className='text-sm text-gray-300'>{answers[q.id]} / 4</div> */}
			</div>
			<input
				type='range'
				min='0'
				max='4'
				step='1'
				// value={answers[q.id]}
				// onChange={(e) => handleSliderChange(q.id, e.target.value)}
				className='w-full'
			/>
			<div className='flex items-center justify-between text-xs text-gray-400 mt-2'>
				<div>Not at all</div>
				<div>Extremely</div>
			</div>
		</div>
	);
}

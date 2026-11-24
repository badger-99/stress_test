import { SCALE } from '@/lib/data/assessment';
import { Question } from '@/lib/types';
import { cn } from '@/lib/utils';

interface Props {
	question: Question;
	number: number;
	/** Selected scale value, or undefined while unanswered. */
	value: number | undefined;
	onChange: (value: number) => void;
}

// One PSS item with its five fixed answers. Nothing is preselected: a default
// answer would quietly count toward the score for anyone who skips an item.
export default function QuestionCard({ question, number, value, onChange }: Props) {
	const labelId = `question-${question.id}`;

	return (
		<div className='flex flex-col w-full gap-4 mx-auto p-3 sm:p-4 text-center rounded-lg bg-secondary dark:bg-secondary/10 border border-foreground/20'>
			<p id={labelId} className='font-medium wrap-normal'>
				<span className='text-muted-foreground'>{number}.</span> …{question.text}
			</p>
			<div role='radiogroup' aria-labelledby={labelId} className='grid grid-cols-5 gap-1 sm:gap-2'>
				{SCALE.map((option) => {
					const selected = value === option.value;
					return (
						<button
							key={option.value}
							type='button'
							role='radio'
							aria-checked={selected}
							aria-label={option.label}
							onClick={() => onChange(option.value)}
							className={cn(
								'min-w-0 hyphens-manual rounded-lg border px-0.5 py-2 text-[11px] sm:px-1 sm:text-sm leading-tight cursor-pointer transition-colors',
								selected
									? 'border-blue-600 bg-gradient-to-br from-blue-600 to-blue-400 text-white font-semibold'
									: 'border-foreground/20 bg-background hover:border-blue-400'
							)}
						>
							{option.display}
						</button>
					);
				})}
			</div>
		</div>
	);
}

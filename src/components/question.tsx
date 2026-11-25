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
								// Shared: same lift + stronger glow on hover for every answer, selected or not.
								'min-w-0 hyphens-manual rounded-lg border px-0.5 py-2 text-[11px] sm:px-1 sm:text-sm leading-tight cursor-pointer',
								'transition-[color,background-color,border-color,box-shadow,transform] duration-150 ease-out',
								'hover:-translate-y-0.5 hover:shadow-[0_0_14px_rgba(59,130,246,0.45)] motion-reduce:transform-none',
								'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background',
								selected
									? 'border-blue-600 bg-gradient-to-br from-blue-600 to-blue-400 text-white font-semibold shadow-[0_0_10px_rgba(59,130,246,0.35)]'
									: 'border-blue-300/80 bg-background shadow-[0_0_6px_rgba(59,130,246,0.22)] hover:border-blue-500 dark:border-blue-400/40 dark:hover:border-blue-400'
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

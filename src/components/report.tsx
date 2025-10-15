import { Result } from '@/lib/types';

interface Props {
	data: Result;
}

export function Report({ data }: Props) {
  const date = new Date(data.time).toLocaleString()
	return (
		<div className='mx-auto max-w-4xl bg-white p-12 text-foreground print:p-8 border border-black'>
			{/* Header Section */}
			<header className='mb-8 border-b-2 border-gray-300 pb-6'>
				<div className='mb-4 flex items-center justify-between'>
					<div className='flex items-center gap-3'>
						<div className='flex items-center justify-center rounded-lg'>
							<div className='w-12 h-12 rounded-lg bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center text-2xl font-bold text-white'>
								ST
							</div>
						</div>
						<div>
							<h1 className='text-2xl font-bold text-gray-900'>Stress Test</h1>
							<p className='text-sm text-gray-600'>Emotional Well-Being Check-In</p>
						</div>
					</div>
				</div>
				<div className='mt-4 grid grid-cols-2 gap-4 text-md'>
					<div>
						<span className='font-semibold text-gray-700'>Date:</span>
						<span className='ml-2 text-gray-900'>{date}</span>
					</div>
					<div>
						<span className='font-semibold text-gray-700'>Name:</span>
						<span className='ml-2 text-gray-900'>{data.name}</span>
					</div>
				</div>
			</header>

			{/* Summary Section */}
			<section className='mb-12'>
				<h2 className='mb-4 text-xl font-bold text-gray-900'>Results</h2>
				<div className='rounded-lg border border-gray-200 bg-gray-50 p-6'>
					<div className='mb-4 grid grid-cols-2 gap-6'>
						<div>
							<p className='mb-1 text-sm font-semibold uppercase tracking-wide text-gray-600'>
								Overall Score
							</p>
							<p className='text-3xl font-bold text-gray-900'>{data.score} / 50</p>
						</div>
						<div>
							<p className='mb-1 text-sm font-semibold uppercase tracking-wide text-gray-600'>
								Stress Level
							</p>
							<p className='text-3xl font-bold text-gray-900'>{data.feedback.stress_level}</p>
						</div>
					</div>
					<div className='border-t border-gray-300 pt-4'>
						<p className='mb-1 text-sm font-semibold uppercase tracking-wide text-gray-600'>
							Interpretation
						</p>
						<p className='leading-relaxed text-gray-800'>{data.feedback.description}</p>
					</div>
				</div>
			</section>

			{/* Recommendations Section */}
			<section className='mb-16'>
				<h2 className='mb-4 text-xl font-bold text-gray-900'>Recommendations</h2>
				<div className='rounded-lg border border-gray-200 bg-white p-6'>
					<ul className='space-y-3'>
						{data.feedback.recommendations.map((recommendation, index) => (
							<li key={index} className='flex gap-3'>
								<span className='mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground'>
									{index + 1}
								</span>
								<span className='leading-relaxed text-gray-800'>{recommendation}</span>
							</li>
						))}
					</ul>
				</div>
			</section>

			{/* Footer Section */}
			<footer className='border-t border-gray-300 pt-6'>
				<div className='rounded-lg bg-gray-100 p-4'>
					<p className='text-xs leading-relaxed text-gray-700'>
						<span className='font-semibold'>Disclaimer:</span> This tool is for personal reflection
						and not a medical diagnosis.
					</p>
				</div>
			</footer>
		</div>
	);
}

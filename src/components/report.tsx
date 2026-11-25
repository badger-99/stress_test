import { MAX_SCORE } from '@/lib/data/assessment';
import { Result } from '@/lib/types';
import { Sparkles } from 'lucide-react';

interface Props {
	data: Result;
}

// Small pill marking text written by the language model.
function AiBadge() {
	return (
		<span className='inline-flex items-center gap-1 rounded-full border border-blue-200 bg-blue-50 px-2 py-0.5 text-[11px] font-semibold normal-case tracking-normal text-blue-700'>
			<Sparkles className='size-3' aria-hidden='true' />
			AI-generated
		</span>
	);
}

export function Report({ data }: Props) {
	// AI recommendations replace the static ones when the summary call succeeded.
	const recommendations = data.ai?.recommendations ?? data.feedback.recommendations;
  const date = new Date(data.created_at).toLocaleString()
	return (
		<div className='mx-auto max-w-4xl bg-white p-5 sm:p-8 md:p-12 text-foreground print:p-8 border border-black'>
			{/* Header Section */}
			<header className='mb-8 border-b-2 border-gray-300 pb-6'>
				<div className='mb-4 flexitems-center justify-between'>
					<div className='flex flex-col md:flex-row items-center gap-3'>
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
				<div className='mt-4 grid grid-rows-2 md:grid-cols-2 gap-4 text-md'>
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
				<div className='rounded-lg border border-gray-200 bg-gray-50 p-4 sm:p-6'>
					<div className='mb-4 grid grid-cols-2 gap-3 sm:gap-6'>
						<div>
							<p className='mb-1 text-sm font-semibold uppercase tracking-wide text-gray-600'>
								Overall Score
							</p>
							<p className='whitespace-nowrap text-lg min-[340px]:text-xl sm:text-3xl font-bold text-gray-900'>{data.score} / {MAX_SCORE}</p>
						</div>
						<div>
							<p className='mb-1 text-sm font-semibold uppercase tracking-wide text-gray-600'>
								Stress Level
							</p>
							<p className='whitespace-nowrap text-lg min-[340px]:text-xl sm:text-3xl font-bold text-gray-900'>{data.feedback.stress_level}</p>
						</div>
					</div>
					<div className='border-t border-gray-300 pt-4'>
						<p className='mb-1 text-sm font-semibold uppercase tracking-wide text-gray-600'>
							Interpretation
						</p>
						<p className='leading-relaxed text-gray-800 text-left sm:text-center'>{data.feedback.description}</p>
					</div>
					{data.ai && (
						<div className='mt-4 border-t border-gray-300 pt-4'>
							<div className='mb-1 flex flex-wrap items-center justify-center gap-2'>
								<p className='text-sm font-semibold uppercase tracking-wide text-gray-600'>
									Your Personal Summary
								</p>
								<AiBadge />
							</div>
							<p className='leading-relaxed text-gray-800 text-left sm:text-center'>{data.ai.summary}</p>
						</div>
					)}
				</div>
			</section>

			{/* Recommendations Section */}
			<section className='mb-16'>
				<div className='mb-4 flex flex-wrap items-center justify-center gap-2'>
					<h2 className='text-xl font-bold text-gray-900'>Recommendations</h2>
					{data.ai && <AiBadge />}
				</div>
				<div className='rounded-lg border border-gray-200 bg-white p-4 sm:p-6'>
					<ul className='space-y-3 text-left'>
						{recommendations.map((recommendation, index) => (
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
						and not a medical diagnosis. Questions from the Perceived Stress Scale (PSS-10; Cohen,
						Kamarck &amp; Mermelstein, 1983). Stress levels use commonly applied score ranges and are
						a guide, not a clinical cutoff.
						{data.ai &&
							' Sections marked AI-generated were written by a language model from your answers only (no name or other personal details were sent) and may not be perfect.'}
					</p>
				</div>
			</footer>
		</div>
	);
}

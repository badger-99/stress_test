import Header from '@/components/header';
import Link from 'next/link';

export default function Home() {
	return (
		<div className='flex flex-col min-h-screen pt-19'>
			<Header />
			<div className='flex-1 flex justify-center w-full h-full items-center'>
				<div className='flex flex-col text-center gap-4'>
					<div>
						<p className='text-2xl font-semibold'>Welcome to StressTest!</p>
						<p className='text-lg'>The Emotional Well-Being Check-In</p>
					</div>
					<div className='max-w-2xl px-5'>
						<p>
							Take a free, quick, and friendly self-assessment to explore your current stress levels
							and emotional balance. Gain a clearer picture of your overall mental well-being today.
						</p>
						<p className='mt-3'>
							The questions come from the Perceived Stress Scale (PSS-10; Cohen, Kamarck & Mermelstein,
							1983), one of the most widely used and validated stress questionnaires.
						</p>
						<p className='mt-3 text-sm text-muted-foreground'>
							No account needed. Your results are saved in this browser only. To write your personal summary, your answers (never your name) are sent to an AI model (DeepSeek); StressTest itself doesn&apos;t store them.
						</p>
					</div>
					<div className='flex justify-center gap-8 p-8'>
						<Link
							href='/test'
							className='border border-foreground bg-gradient-to-br from-blue-600 to-blue-400 p-2 rounded-lg font-semibold text-white w-[8rem]'
						>
							Free Test
						</Link>
					</div>
				</div>
			</div>
			<footer className='text-center text-xs text-gray-600 py-6'>
				Alfred M. — StressTest ©2025–2026
			</footer>
		</div>
	);
}

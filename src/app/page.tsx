'use client';
import Header from '@/components/header';
import { firstName } from '@/lib/utils';
import { useUser } from '@/providers/user-provider';
import Link from 'next/link';

export default function Home() {
	const { user } = useUser();

	if (user) {
		const name = firstName(user.user_metadata.name);

		return (
			<div className='flex flex-col min-h-screen pt-19'>
				<Header />
				<div className='flex-1 flex justify-center w-full'>
					<div className='flex flex-col text-center gap-4 mt-32'>
						{/* <div> */}
						<p className='text-2xl font-semibold'>Welcome {`${name}`}!</p>
						{/* </div> */}
						<div className='max-w-2xl'>
							<p>
								Take a quick, and friendly self-assessment to explore your current stress levels and
								emotional balance. Gain a clearer picture of your overall mental well-being today.
							</p>
						</div>
						<div className='flex justify-center gap-8 p-8'>
							<Link
								href='/test'
								className='border border-foreground bg-gradient-to-br from-blue-600 to-blue-400 p-2 rounded-lg font-semibold text-white w-[8rem]'
							>
								Take Test
							</Link>
							<Link
								href='#'
								className='border border-foreground bg-gradient-to-br from-blue-600 to-blue-400 p-2 rounded-lg font-semibold text-white w-[8rem]'
							>
								See History
							</Link>
						</div>
					</div>
				</div>
				<footer className='text-center text-xs text-gray-600 py-6'>
					Made with ♥ — StressTest Prototype ©2025
				</footer>
			</div>
		);
	}

	return (
		<div className='flex flex-col min-h-screen pt-19'>
			<Header />
			<div className='flex-1 flex justify-center w-full'>
				<div className='flex flex-col text-center gap-4 mt-32'>
					<div className=''>
						<p className='text-2xl font-semibold'>Welcome to StressTest!</p>
						<p className='text-lg'>The Emotional Well-Being Check-In</p>
					</div>
					<div className='max-w-2xl'>
						<p>
							Take a free, quick, and friendly self-assessment to explore your current stress levels
							and emotional balance. Gain a clearer picture of your overall mental well-being today.
						</p>
					</div>
					<div className='flex justify-center gap-8 p-8'>
						<Link
							href='/test'
							className='border border-foreground bg-gradient-to-br from-blue-600 to-blue-400 p-2 rounded-lg font-semibold text-white w-[8rem]'
						>
							Free Test
						</Link>
						<Link
							href='/auth/login'
							className='border border-foreground bg-gradient-to-br from-blue-600 to-blue-400 p-2 rounded-lg font-semibold text-white w-[8rem]'
						>
							Log in
						</Link>
					</div>
				</div>
			</div>
			<footer className='text-center text-xs text-gray-600 py-6'>
				Made with ♥ — StressTest Prototype ©2025
			</footer>
		</div>
	);
}

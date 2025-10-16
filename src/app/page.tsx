import Link from "next/link";

export default function Home() {
	return (
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
					<Link href='/test' className='border border-foreground bg-gradient-to-br from-blue-600 to-blue-400 p-2 rounded-lg font-semibold text-white w-[8rem]'>
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
	);
}

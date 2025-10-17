import ThemeToggle from '@/components/theme-toggle';
import { cookies } from 'next/headers';
import Link from 'next/link';

export default async function InfoPage() {
	const cookieStore = await cookies();
	const email = cookieStore.get('signup_email')?.value ?? 'm@example.com';

	return (
		<div className='relative flex flex-col items-center pt-[20rem] w-full h-screen p-8'>
			<Link href='/' className='absolute top-4 left-4 '>
				<div className='w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center text-2xl font-bold text-white'>
					ST
				</div>
			</Link>

			<div className='absolute top-5 right-4'>
				<ThemeToggle size={20} />
			</div>

			<p className='text-xl font-semibold mb-4'>Thank you for signing up!</p>
			<p className=''>
				Please go to your registered email (
				<span className='font-semibold text-blue-400'>{email}</span>) to complete the sign-up
				process.
			</p>
		</div>
	);
}

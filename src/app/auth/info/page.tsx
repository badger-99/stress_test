'use client';
import ThemeToggle from '@/components/theme-toggle';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function InfoPage() {
	const router = useRouter()
	const [email, setEmail] = useState<string|null>(null);
	const savedEmail = Cookies.get('signup_email');

	useEffect(() => {
		if (savedEmail) {
			setEmail(savedEmail);
			Cookies.remove('signup_email');
		} else {
			router.replace('/')
		}
	}, [router, savedEmail]);

	if (!email) {
		return null
	}

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

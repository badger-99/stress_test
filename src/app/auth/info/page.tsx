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
	}, [router]);

	if (!email) {
		return null
	}

	return (
		<div className='relative flex flex-col items-center pt-[20rem] w-full h-screen p-8'>
			<p className='text-xl font-semibold mb-4'>Thank you for signing up!</p>
			<p className=''>
				Please go to your registered email (
				<span className='font-semibold text-blue-400'>{email}</span>) to complete the sign-up
				process.
			</p>
		</div>
	);
}

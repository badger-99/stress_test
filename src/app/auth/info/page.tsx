import { cookies } from 'next/headers';

export default async function InfoPage() {
	const cookieStore = await cookies();
  const email = cookieStore.get('signup_email')?.value ?? 'm@example.com';
  
	return (
		<div className='flex-1 flex flex-col items-center justify-center w-full'>
			<p className='text-xl font-semibold mb-4'>Thank you for signing up!</p>
			<p className=''>
				Please go to your registered email (<span className='font-semibold text-blue-400'>{email}</span>) to complete the sign-up process.
			</p>
		</div>
	);
}

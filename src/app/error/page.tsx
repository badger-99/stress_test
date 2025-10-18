import ThemeToggle from '@/components/theme-toggle';
import Link from 'next/link';

export default function ErrorPage() {
	return (
		<div className='relative flex flex-col items-center pt-[20rem] w-full h-screen p-8 gap-4 text-2xl'>
			<Link href='/' className='absolute top-4 left-4'>
				<div className='w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center text-2xl font-bold text-white'>
					ST
				</div>
			</Link>
			<div className='absolute top-5 right-4'>
				<ThemeToggle size={20} />
			</div>

			<p>Sorry, something went wrong!</p>
			<div>
				Return to the{' '}
				<Link href='/' className=' text-blue-400'>
					home
				</Link>{' '}
				page
			</div>
		</div>
	);
}

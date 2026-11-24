'use client';

import Link from 'next/link';
import ThemeToggle from './theme-toggle';

export default function Header() {
	return (
		<header className='fixed w-full top-0 left-0 flex items-center justify-center overflow-hidden z-50 bg-background'>
			<div className='w-full'>
				<div className='flex items-center justify-between px-4 py-4 sm:py-4'>
					<Link href='/' className='flex items-center space-x-2'>
						<div className='w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center text-2xl font-bold text-white'>
							ST
						</div>
						<span className='text-lg font-semibold select-none'>StressTest</span>
					</Link>

					<div className='flex flex-row w-fit px-2 gap-4'>
						<ThemeToggle size={20} />
					</div>
				</div>
			</div>
		</header>
	);
}

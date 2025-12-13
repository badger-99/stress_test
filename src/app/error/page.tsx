import Link from 'next/link';
import AuxHeader from '@/components/aux-header';

export default function ErrorPage() {
	return (
		<div className='relative flex flex-col items-center justify-center text-center w-full h-screen p-8 gap-4 text-2xl'>
			<AuxHeader />

			<div className='-translate-y-10 flex flex-col items-center gap-4'>
				<p>Sorry, something went wrong!</p>
				<div>
					Return to the{' '}
					<Link href='/' className='text-blue-400'>
						home
					</Link>{' '}
					page
				</div>
			</div>
		</div>
	);
}

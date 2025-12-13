import AuxHeader from '@/components/aux-header';
import Link from 'next/link';

export default function GoodBye() {
	return (
		<div className='relative flex flex-col items-center justify-center text-center w-full h-screen p-8 gap-4 text-2xl'>
			<AuxHeader />
			<div className='-translate-y-10 flex flex-col items-center gap-4 max-w-2xl'>
				<div>
          Thank you for using StressTest! 
				</div>
				<div>
					Feel free to sign up again, or you can send me a message at{' '}
					<Link href='mailto:hello@alfredm.me' className='text-blue-400'>
						hello@alfredm.me
					</Link>{' '}
					and tell me what you liked, didn't like, or would like to see, or you can return to the{' '}<Link href='/' className='text-blue-400'>
						home
					</Link>{' '}
					page {':)'}
				</div>
			</div>
		</div>
	);
}

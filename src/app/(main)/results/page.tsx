'use client';

import { useResults } from '@/providers/results-provider';
import { Report } from '@/components/report';
import { pdf } from '@react-pdf/renderer';
import { PDFReport } from '@/components/pdf-report';
import Link from 'next/link';
import { useUser } from '@/providers/user-provider';
import { firstName } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function Results() {
	const { results } = useResults();
	const { user } = useUser();
	const router = useRouter();

	if (!results.latest || !results.history) {
		return (
			<div className='relative flex flex-col items-center pt-[20rem] w-full h-screen p-8 gap-4 text-2xl'>
				<p>There are no results to display,</p>
				<div>
					Please take a{' '}
					<Link href='/test' className=' text-blue-400'>
						test
					</Link>{' '}
					first.
				</div>
			</div>
		);
	}

	const latest = results.latest!;

	if (user) {
		latest.name = user.user_metadata.name;
	}

	const name = user ? firstName(user.user_metadata.name) : latest.name;

	const handleDownload = async () => {
		const blob = await pdf(<PDFReport data={latest} />).toBlob();
		const url = URL.createObjectURL(blob);
		const link = document.createElement('a');
		link.href = url;
		link.download = `stress-report-${name.toLowerCase()}.pdf`;
		link.click();
		URL.revokeObjectURL(url);
	};

	const handleNav = (path: string) => {
		 if (typeof window !== 'undefined') {
				localStorage.setItem('pending_report', JSON.stringify(latest));
			}
		router.push(path);
	};

	return (
		<div className='flex-1 p-4 mt-8 text-center'>
			<div className='text-2xl font-semibold mb-5'>Test Results</div>
			<div className='flex flex-row w-full justify-center gap-18'>
				<div id='report'>
					<Report data={latest}></Report>
				</div>
				<div>
					{user ? (
						<button
							className='border border-foreground bg-gradient-to-br from-blue-600 to-blue-400 p-2 rounded-lg font-semibold text-white h-fit cursor-pointer'
							onClick={handleDownload}
						>
							Download PDF
						</button>
					) : (
						<div className='text-center w-fit'>
							<div>
								<Button
									variant='link'
									onClick={() => handleNav('/auth/signup')}
									className=' text-blue-500 text-lg'
								>
									Sign up
								</Button>{' '}
								or{' '}
								<Button
									variant='link'
									onClick={() => handleNav('/auth/login')}
									className=' text-blue-500 text-lg'
								>
									Log in
								</Button>
							</div>
							<p>to generate PDF report.</p>
							<p>(We will keep you results for you 😉)</p>
						</div>
					)}
				</div>
			</div>
			<footer className='text-center text-xs text-gray-600 py-6'>
				Made with ♥ — StressTest Prototype ©2025
			</footer>
		</div>
	);
}

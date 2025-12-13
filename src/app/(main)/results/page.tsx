'use client';

import { useResults } from '@/providers/results-provider';
import { Report } from '@/components/report';
import { pdf } from '@react-pdf/renderer';
import { PDFReport } from '@/components/pdf-report';
import { useUser } from '@/providers/user-provider';
import { firstName } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import EmptyResults from '@/components/empty-results';

export default function Results() {
	const { results } = useResults();
	const { user } = useUser();
	const router = useRouter();

	if (!results.latest || !results.history) {
		return (
			<EmptyResults />
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
		<div className='flex-1 p-4 mt-16 text-center'>
			<div className='text-2xl font-semibold mb-5'>Test Results</div>
			<div className='flex flex-col lg:flex-row w-full justify-center lg:items-start gap-6 lg:gap-12'>
				<div id='report' className='max-w-2xl mx-auto lg:mx-0'>
					<Report data={latest}></Report>
				</div>
				<div className='flex flex-col w-fit justify-center items-center gap-4 mx-auto lg:mx-0'>
					<Button
						className='border border-foreground bg-gradient-to-br from-blue-600 to-blue-400 p-2 rounded-lg font-semibold text-white h-fit cursor-pointer w-fit'
						onClick={handleDownload}
					>
						Download PDF
					</Button>
					{!user && (
						<div className='text-center w-fit'>
							<div>
								<Button
									variant='link'
									onClick={() => handleNav('/auth/signup')}
									className='p-2 text-blue-500 text-lg border border-blue-500 cursor-pointer'
								>
									Sign up
								</Button>{' '}
								or{' '}
								<Button
									variant='link'
									onClick={() => handleNav('/auth/login')}
									className='p-2 text-blue-500 text-lg border border-blue-500 cursor-pointer'
								>
									Log in
								</Button>
							</div>
							<p>To add these results to your history</p>
							<p>(We&apos;ll make sure they don&apos;t get lost 😉)</p>
						</div>
					)}
				</div>
			</div>
			<footer className='text-center text-xs text-gray-600 py-10'>
				Alfred M. — StressTest ©2025
			</footer>
		</div>
	);
}

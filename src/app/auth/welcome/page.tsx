'use client';

import { saveResults, getResults } from '@/lib/server_actions/results';
import { Result } from '@/lib/types';
import { useResults } from '@/providers/results-provider';
import { useUser } from '@/providers/user-provider';
import { useState, useEffect } from 'react';
import { Spinner } from '@/components/ui/spinner';
import { firstName } from '@/lib/utils';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Home() {
	const { user } = useUser();
	const { setResults } = useResults();
	const [isPending, setIsPending] = useState(false);
	const [savedReport, setSavedReport] = useState<string | null>(null)
	const name = firstName(user?.user_metadata.name);
	const router = useRouter()
	
	useEffect(() => {
		const probe = localStorage.getItem('pending_report');
		setSavedReport(probe);
		if (!probe) {
			router.replace('/')
		}
	},[router])

	useEffect(() => {
		if (user && savedReport) {
			const savePendingReport = async () => {
				setIsPending(true);
				const report = JSON.parse(savedReport) as Result;
				report.id = user.id;
				await saveResults(report);
				const data = await getResults();
				setResults(data);
				localStorage.removeItem('pending_report');
				setIsPending(false);
			};

			savePendingReport();
		}
	}, [user, savedReport, setResults]);

	if (!savedReport) {
		return null
	}

	return (
		<div className='flex flex-col min-h-screen pt-19'>
			<div className='flex-1 flex justify-center w-full'>
				<div className='flex flex-col text-center gap-4 mt-32'>
					<p className='text-2xl font-semibold'>Welcome {`${name}`}!</p>
					<div className='max-w-2xl'>
						<p className='text-lg'>
							Thank you for signing up with us, and we hope this tool will add value to your
							wellbeing!
						</p>
					</div>
					<div className='flex justify-center gap-8 p-8'>
						{isPending ? (
							<div className='border border-blue-500 bg-secondary p-2 rounded-lg font-semibold flex items-center justify-center gap-2'>
								<Spinner className='size-5 text-blue-500' /> <p>Preparing your report</p>
							</div>
						) : (
							<Link
								href='/results'
								className='border border-foreground bg-gradient-to-br from-blue-600 to-blue-400 p-2 rounded-lg font-semibold text-white'
							>
								See Your Results
							</Link>
						)}
					</div>
				</div>
			</div>
			<footer className='text-center text-xs text-gray-600 py-6'>
				Made with ♥ — StressTest Prototype ©2025
			</footer>
		</div>
	);
}

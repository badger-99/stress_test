'use client';

import { useResults } from '@/providers/results-provider';
import { useRouter } from 'next/navigation';
import { Report } from '@/components/report';
import { useEffect } from 'react';
import { pdf } from '@react-pdf/renderer';
import { PDFReport } from '@/components/pdf-report';


export default function Results() {
  const router = useRouter();
  const { results } = useResults();

  useEffect(() => {
		if (!results.latest || !results.history) {
			router.push('/');
		}
	}, [results, router]);

	// If redirecting, avoid rendering rest of component
	if (!results.latest || !results.history) {
		return null;
	}

  const latest = results.latest!

  const handleDownload = async () => {
    const blob = await pdf(<PDFReport data={latest} />).toBlob();
		const url = URL.createObjectURL(blob);
		const link = document.createElement('a');
		link.href = url;
		link.download = `stress-report-${latest.name}.pdf`;
		link.click();
		URL.revokeObjectURL(url);
	};

  return (
		<div className='flex-1 p-4'>
			Results displayed on this page.
			<div className='flex flex-row w-full p-8 justify-center gap-26'>
				<div id='report'>
					<Report data={latest}></Report>
				</div>
				<button
					className='border border-foreground bg-gradient-to-br from-blue-600 to-blue-400 p-2 rounded-lg font-semibold text-white h-fit cursor-pointer'
					onClick={handleDownload}
				>
					Download PDF
				</button>
			</div>
		</div>
	);
}
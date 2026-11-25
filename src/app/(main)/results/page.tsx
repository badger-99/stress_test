'use client';

import { useResult } from '@/providers/results-provider';
import { Report } from '@/components/report';
import { pdf } from '@react-pdf/renderer';
import { PDFReport } from '@/components/pdf-report';
import { Button } from '@/components/ui/button';
import EmptyResults from '@/components/empty-results';
import { PageTitle } from '@/components/page-title';

export default function Results() {
	const { latest: result, loaded } = useResult();

	if (!loaded) return null;

	if (!result) {
		return (
			<div className='flex-1'>
				<PageTitle title='Test Results' />
				<EmptyResults />
			</div>
		);
	}

	const handleDownload = async () => {
		const blob = await pdf(<PDFReport data={result} />).toBlob();
		const url = URL.createObjectURL(blob);
		const link = document.createElement('a');
		link.href = url;
		link.download = `stress-report-${result.name.trim().toLowerCase().replace(/\s+/g, '-')}.pdf`;
		link.click();
		URL.revokeObjectURL(url);
	};

	return (
		<div className='flex-1 px-4 pb-4 text-center'>
			<PageTitle title='Test Results' />
			<div className='flex flex-col lg:flex-row w-full justify-center lg:items-start gap-6 lg:gap-12'>
				<div id='report' className='max-w-2xl mx-auto lg:mx-0'>
					<Report data={result}></Report>
				</div>
				<div className='flex flex-col w-fit justify-center items-center gap-4 mx-auto lg:mx-0'>
					<Button
						className='border border-foreground bg-gradient-to-br from-blue-600 to-blue-400 p-2 rounded-lg font-semibold text-white h-fit cursor-pointer w-fit'
						onClick={handleDownload}
					>
						Download PDF
					</Button>
					<p className='max-w-56 text-sm text-muted-foreground'>
						Saved in this browser only. Download the PDF to keep a copy elsewhere.
					</p>
				</div>
			</div>
			<footer className='text-center text-xs text-gray-600 py-10'>
				Alfred M. — StressTest ©2025–2026
			</footer>
		</div>
	);
}

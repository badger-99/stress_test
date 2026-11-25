'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { pdf } from '@react-pdf/renderer';
import { useResult } from '@/providers/results-provider';
import { Report } from '@/components/report';
import { PDFReport } from '@/components/pdf-report';
import { Button } from '@/components/ui/button';
import EmptyResults from '@/components/empty-results';
import { PageTitle } from '@/components/page-title';

export default function PastResult() {
	const { id } = useParams<{ id: string }>();
	const { history, loaded } = useResult();

	if (!loaded) return null;

	const selected = history.find((r) => r.id === id);

	if (!selected)
		return (
			<div className='flex-1'>
				<PageTitle title='Test Results' />
				<EmptyResults />
			</div>
		);

	const handleDownload = async () => {
		const blob = await pdf(<PDFReport data={selected} />).toBlob();
		const url = URL.createObjectURL(blob);
		const link = document.createElement('a');
		link.href = url;
		link.download = `stress-report-${selected.name.trim().toLowerCase().replace(/\s+/g, '-')}.pdf`;
		link.click();
		URL.revokeObjectURL(url);
	};

	return (
		<div className='flex-1 px-4 pb-4 text-center'>
			<PageTitle title='Test Results' />
			<div className='flex flex-col lg:flex-row w-full justify-center lg:items-start gap-6 lg:gap-12'>
				<div id='report' className='max-w-2xl mx-auto lg:mx-0'>
					<Report data={selected}></Report>
				</div>
				<div className='flex flex-col w-fit justify-center items-center gap-4 mx-auto lg:mx-0'>
					<Button
						className='border border-foreground bg-gradient-to-br from-blue-600 to-blue-400 p-2 rounded-lg font-semibold text-white h-fit cursor-pointer w-fit'
						onClick={handleDownload}
					>
						Download PDF
					</Button>
					<Link href='/history' className='text-sm text-blue-500'>
						Back to history
					</Link>
				</div>
			</div>
			<footer className='text-center text-xs text-gray-600 py-10'>
				Alfred M. — StressTest ©2025–2026
			</footer>
		</div>
	);
}

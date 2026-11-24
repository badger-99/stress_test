import { ChartColumn } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
	Empty,
	EmptyContent,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
} from '@/components/ui/empty';
import Link from 'next/link';

export function EmptyHistory() {
	return (
		<Empty>
			<EmptyHeader>
				<EmptyMedia variant='icon'>
					<ChartColumn />
				</EmptyMedia>
				<EmptyTitle>No Results History Yet</EmptyTitle>
				<EmptyDescription>
					Each check-in you take is saved in this browser, so you can see how your stress levels
					change over time.
				</EmptyDescription>
			</EmptyHeader>
			<EmptyContent>
				<div className='flex gap-2'>
					<Button
						asChild
						className='border border-foreground bg-gradient-to-br from-blue-600 to-blue-400 rounded-lg font-semibold text-white h-fit cursor-pointer'
					>
						<Link href='/test'>Take A Test</Link>
					</Button>
				</div>
			</EmptyContent>
		</Empty>
	);
}

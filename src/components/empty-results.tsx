import { ClipboardMinus } from 'lucide-react';

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

export default function EmptyResults() {
	return (
		<Empty>
			<EmptyHeader>
				<EmptyMedia variant='icon'>
					<ClipboardMinus />
				</EmptyMedia>
        <EmptyTitle>No Test Results To Display</EmptyTitle>
        <EmptyDescription className='text-md '>
          Follow the link below to take your first StressTest
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

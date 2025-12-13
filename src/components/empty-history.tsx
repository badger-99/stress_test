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
import { User } from '@supabase/supabase-js';
import Link from 'next/link';

interface Props {
	user: User | null;
}

export function EmptyHistory({ user }: Props) {
	return (
		<Empty>
			<EmptyHeader>
				<EmptyMedia variant='icon'>
					<ChartColumn />
				</EmptyMedia>
				<EmptyTitle>No Results History Yet</EmptyTitle>
			</EmptyHeader>
			{user ? (
				<>
					<EmptyDescription>
						Take your first StressTest to start recording your wellness history.
					</EmptyDescription>
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
				</>
			) : (
				<EmptyContent>
					<div className='flex gap-2 items-center'>
						<Button
            asChild
							variant='link'
							className='w-[5.85rem] text-blue-500 text-lg border border-blue-500 cursor-pointer'
						>
							<Link href='/auth/signup'>Sign up</Link>
						</Button>
						<p className='text-lg'>or</p>
						<Button
            asChild
							variant='link'
							className='w-[5.85rem] text-blue-500 text-lg border border-blue-500 cursor-pointer'
						>
							<Link href='/auth/login'>Log in</Link>
						</Button>
					</div>
					<EmptyDescription>To add test results to your history.</EmptyDescription>
				</EmptyContent>
			)}
		</Empty>
	);
}

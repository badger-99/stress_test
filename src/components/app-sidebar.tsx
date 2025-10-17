'use client';

import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarSeparator,
} from '@/components/ui/sidebar';
import { usePathname } from 'next/navigation';
import { BookOpenCheck, ClipboardPlus, ChartColumn } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import ThemeToggle from './theme-toggle';
import { User } from '@supabase/supabase-js';
import { NavUser } from './sidebar-user-nav';
import { getInitials } from '@/lib/utils';

export function AppSidebar({ user }: { user: User | null }) {
	const pathname = usePathname();
	const initials = getInitials(user?.user_metadata.display_name);

	const items = [
		{
			title: 'Test',
			url: '/test',
			icon: BookOpenCheck,
		},
		{
			title: 'Result',
			url: '/results',
			icon: ClipboardPlus,
		},
	];

	return (
		<Sidebar collapsible='icon' className='bg-secondary'>
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton asChild className='hover:bg-transparent'>
							<Link href='/' className='flex flex-row items-center gap-2'>
								<div className='aspect-square size-6'>
									<Image src='/st_logo-3.png' width={23} height={23} alt='st-logo' />
								</div>

								<span className='text-lg font-semibold select-none'>StressTest</span>
							</Link>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent className='px-2'>
				<SidebarSeparator className='mx-0' />
				<SidebarGroup />
				<SidebarGroupContent>
					<SidebarMenu>
						{items.map((item) => (
							<SidebarMenuItem
								key={item.title}
								className={`${pathname == item.url && 'border border-blue-400 rounded-lg'}`}
							>
								<SidebarMenuButton
									className={`${pathname == item.url && 'rounded-lg hover:bg-transparent'}`}
									asChild
								>
									<Link href={item.url}>
										<item.icon />
										<span>{item.title}</span>
									</Link>
								</SidebarMenuButton>
							</SidebarMenuItem>
						))}
						{user && <SidebarMenuItem
							key='History'
							className={`${pathname == '/history' && 'border border-blue-400 rounded-lg'}`}
						>
							<SidebarMenuButton
								className={`${pathname == '/history' && 'rounded-lg hover:bg-transparent'}`}
								asChild
							>
								<Link href='/history'>
									<ChartColumn />
									<span>History</span>
								</Link>
							</SidebarMenuButton>
						</SidebarMenuItem>}
					</SidebarMenu>
				</SidebarGroupContent>
				<SidebarGroup />
			</SidebarContent>
			<SidebarFooter className='pb-6'>
				<div className='w-full ml-2 mb-2 pr-3 flex flex-row justify-between'>
					<ThemeToggle />{' '}
					{!user && (
						<Link
							href='/auth/login'
							className='border border-foreground bg-blue-500 p-2 rounded-lg font-semibold text-white w-24 text-center'
						>
							Log in
						</Link>
					)}
				</div>

				{user && <NavUser user={user} initials={initials} />}
			</SidebarFooter>
		</Sidebar>
	);
}

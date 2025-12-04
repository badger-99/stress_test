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
import { BookOpenCheck, ClipboardPlus, ChartColumn, LogIn, PanelLeftCloseIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import ThemeToggle from './theme-toggle';
import { User } from '@supabase/supabase-js';
import { NavUser } from './sidebar-user-nav';
import { getInitials } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { useSidebar } from '@/components/ui/sidebar';
import { Button } from './ui/button';

export function AppSidebar({ user }: { user: User | null }) {
	const pathname = usePathname();
	const initials = getInitials(user?.user_metadata.name);
	const { toggleSidebar } = useSidebar();
	const isMobile = useIsMobile();

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
		{
			title: 'History',
			url: '/history',
			icon: ChartColumn,
		},
	];

	return (
		<Sidebar collapsible='icon' className='bg-secondary'>
			<SidebarHeader>
				<SidebarMenu className='flex-row justify-between'>
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
						{isMobile && (
								<Button variant={'ghost'} size={'icon'} onClick={toggleSidebar}>
									<PanelLeftCloseIcon />
								</Button>
						)}
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
					</SidebarMenu>
				</SidebarGroupContent>
				<SidebarGroup />
			</SidebarContent>
			<SidebarFooter className='pb-6'>
				<SidebarMenu>
					<SidebarMenuItem>
						{' '}
						<ThemeToggle />{' '}
					</SidebarMenuItem>
					<SidebarMenuItem>
						{!user && (
							<SidebarMenuButton asChild className='flex justify-center'>
								<Link
									href='/auth/login'
									className='border border-foreground bg-blue-500 p-2 rounded-lg'
								>
									<LogIn />
									<span className='font-semibold text-white'>Log in</span>
								</Link>
							</SidebarMenuButton>
						)}
					</SidebarMenuItem>
					{user && <NavUser user={user} initials={initials} />}
				</SidebarMenu>
			</SidebarFooter>
		</Sidebar>
	);
}

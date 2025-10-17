import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import { getUser } from '@/lib/supabase/server';

export default async function MainLayout({ children }: { children: React.ReactNode }) {
  const user = await getUser();
	return (
		<SidebarProvider>
			<AppSidebar user={user} />
				<SidebarTrigger />
				{children}
		</SidebarProvider>
	);
}
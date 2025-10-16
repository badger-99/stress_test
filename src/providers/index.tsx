'use client';

import { ThemeProvider } from './theme-provider';
import { UserProvider } from './user-provider';
import { ResultsProvider } from './results-provider';
import { User } from '@supabase/supabase-js';

interface ProviderProps {
	children: React.ReactNode;
	user: User | null;
}

export function Providers({ children, user }: ProviderProps) {
	return (
		<ThemeProvider enableSystem attribute='class' defaultTheme='system' disableTransitionOnChange>
			<UserProvider user={user}>
				<ResultsProvider>{children}</ResultsProvider>
			</UserProvider>
		</ThemeProvider>
	);
}

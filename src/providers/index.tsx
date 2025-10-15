'use client';

import { Results } from '@/lib/types';
import { ThemeProvider } from './theme-provider';
import { ResultsProvider } from './results-provider';

interface ProviderProps {
	children: React.ReactNode;
}

export function Providers({ children }: ProviderProps) {
	return (
		<ThemeProvider enableSystem attribute='class' defaultTheme='system' disableTransitionOnChange>
			<ResultsProvider>{children}</ResultsProvider>
		</ThemeProvider>
	);
}

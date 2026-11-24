'use client';

import { ThemeProvider } from './theme-provider';
import { ResultProvider } from './results-provider';

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<ThemeProvider enableSystem attribute='class' defaultTheme='system' disableTransitionOnChange>
			<ResultProvider>{children}</ResultProvider>
		</ThemeProvider>
	);
}

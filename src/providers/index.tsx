'use client';

import { ThemeProvider } from './theme-provider';

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<ThemeProvider enableSystem attribute='class' defaultTheme='system' disableTransitionOnChange>
			{children}
		</ThemeProvider>
	);
}

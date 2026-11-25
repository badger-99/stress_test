import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Providers } from '@/providers';
import { Toaster } from 'sonner';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'StressTest',
	description: 'Check-in for emotional well-being',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en' suppressHydrationWarning={true}>
			<body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}>
				<Providers>
					{children}
					<Toaster richColors position='top-center' />
				</Providers>
			</body>
		</html>
	);
}

import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Providers } from '@/providers';
import { getUser } from '@/lib/supabase/server';
import { getInsights, getQuestions } from '@/lib/db/elevated-queries';

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

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const user = await getUser();
	const questions = await getQuestions();
	const insights = await getInsights();
	return (
		<html lang='en' suppressHydrationWarning={true}>
			<body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
				<Providers user={user} questions={questions} insights={insights}>
					{children}
				</Providers>
			</body>
		</html>
	);
}

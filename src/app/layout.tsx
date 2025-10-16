import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/providers";
import Header from "../components/header";
import { getUser } from "@/lib/supabase/server";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
  const user = await getUser()
  return (
		<html lang='en' suppressHydrationWarning={true}>
			<body className={`flex flex-col min-h-screen pt-19 ${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers user={user}>
          <Header />
          {children}
        </Providers>
			</body>
		</html>
	);
}

'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
	size?: number;
}

export default function ThemeToggle({ size = 18 }: ThemeToggleProps) {
	const { resolvedTheme, setTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	useEffect(() => setMounted(true), []);
	if (!mounted) return null;

	const isDark = resolvedTheme === 'dark';

	return (
		<button
			onClick={() => setTheme(isDark ? 'light' : 'dark')}
			className='p-1 transition-colors duration-200 rounded-md cursor-pointer'
			aria-label='Toggle theme'
		>
			{isDark ? <Sun size={size} /> : <Moon size={size} />}
		</button>
	);
}

'use client';

import { useResults } from '@/providers/results-provider';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { useEffect, useState, useMemo } from 'react';
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	Tooltip,
	ResponsiveContainer,
	CartesianGrid,
} from 'recharts';
import { Button } from '@/components/ui/button';
import Cookies from 'js-cookie';
import { cn } from '@/lib/utils';

const formatTime = (timestamp: number, scale: 'minutes' | 'hours' | 'days') => {
	const date = new Date(timestamp);
	if (scale === 'minutes')
		return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
	if (scale === 'hours') return date.toLocaleString([], { hour: '2-digit', minute: '2-digit' });
	return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
};

export default function HistoryPage() {
	const { results } = useResults();
	const { theme } = useTheme();
	const router = useRouter();

	const [scale, setScale] = useState<'minutes' | 'hours' | 'days'>('days');
	const [data, setData] = useState<any[]>([]);

	useEffect(() => {
		if (results.history && results.history.length > 0) {
			const formatted = results.history.map((r, index) => ({
				id: r.id,
				name: r.name,
				score: r.score,
				time: formatTime(r.created_at, scale),
				created_at: r.created_at,
				index,
			}));
			setData(formatted.reverse());
		}
	}, [results.history, scale]);

	const averageScore = useMemo(() => {
		if (!data.length) return 0;
		return Math.round(data.reduce((sum, r) => sum + r.score, 0) / data.length);
	}, [data]);

	const handlePointClick = (entry: any) => {
		router.push(`/results/${entry.id}`);
	};

	const isDark = theme === 'dark';

	return (
		<div className='flex flex-col items-center justify-center w-full min-h-screen p-8 gap-4'>
			<h1 className='text-2xl font-semibold text-foreground'>Your Wellness History</h1>
			<p className='text-muted-foreground text-sm mb-4'>
				Track how your stress levels changed over time.
			</p>

			{/* Time Scale Switcher */}
			<div className='flex gap-2 mb-4'>
				{['minutes', 'hours', 'days'].map((s) => (
					<Button
						key={s}
						onClick={() => setScale(s as any)}
						variant={scale === s ? 'default' : 'outline'}
						className={cn(
							'text-sm capitalize',
							scale === s ? 'bg-blue-500 text-white hover:bg-blue-600' : ''
						)}
					>
						{s}
					</Button>
				))}
			</div>

			{/* Average Score */}
			{data.length > 0 && (
				<div className='flex items-center justify-center gap-2 mb-6'>
					<p className='text-sm text-muted-foreground'>Average Score:</p>
					<p className='font-semibold text-blue-500'>{averageScore}</p>
				</div>
			)}

			{/* Chart */}
			{data.length > 0 ? (
				<ResponsiveContainer width='95%' height={400}>
					<LineChart data={data}>
						<CartesianGrid
							strokeDasharray='3 3'
							stroke={isDark ? 'var(--border)' : 'var(--border)'}
						/>
						<XAxis
							dataKey='time'
							stroke='var(--muted-foreground)'
							tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }}
						/>
						<YAxis
							stroke='var(--muted-foreground)'
							tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }}
							domain={[0, 'dataMax + 5']}
						/>
						<Tooltip
							cursor={{ stroke: 'var(--border)', strokeWidth: 1 }}
							contentStyle={{
								backgroundColor: 'var(--background)',
								border: `1px solid var(--border)`,
								borderRadius: '0.5rem',
								color: 'var(--foreground)',
							}}
							formatter={(value: number) => [`${value}`, 'Score']}
							labelStyle={{ color: 'var(--muted-foreground)' }}
						/>
						<Line
							type='monotone'
							dataKey='score'
							stroke='#3b82f6'
							strokeWidth={3}
							activeDot={{
								r: 6,
								fill: '#3b82f6',
								stroke: '#1e40af',
								strokeWidth: 2,
							}}
							dot={<CustomDot onClick={handlePointClick} />}
						/>
					</LineChart>
				</ResponsiveContainer>
			) : (
				<p className='text-muted-foreground text-sm mt-12'>
					No history yet. Take your first test to see results here!
				</p>
			)}
		</div>
	);
}

function CustomDot({ cx, cy, payload, onClick }: any) {
	return (
		<circle
			cx={cx}
			cy={cy}
			r={5}
			fill='#3b82f6'
			stroke='#1e40af'
			strokeWidth={1.5}
			style={{ cursor: 'pointer' }}
			onClick={() => onClick(payload)}
		/>
	);
}

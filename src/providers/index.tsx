'use client';

import { ThemeProvider } from './theme-provider';
import { UserProvider } from './user-provider';
import { QuestionsProvider } from './questions-provider';
import { ResultsProvider } from './results-provider';
import { InsightsProvider } from './insights-provider';
import { User } from '@supabase/supabase-js';
import { Question, Insight, Results } from '@/lib/types';

interface ProviderProps {
	children: React.ReactNode;
	user: User | null;
	questions: Question[];
	insights: Insight[];
	results: Results;
}

export function Providers({ children, user, questions, insights, results }: ProviderProps) {
	return (
		<ThemeProvider enableSystem attribute='class' defaultTheme='system' disableTransitionOnChange>
			<UserProvider user={user}>
				<QuestionsProvider questions={questions}>
					<InsightsProvider insights={insights}>
						<ResultsProvider dbResults={results}>{children}</ResultsProvider>
					</InsightsProvider>
				</QuestionsProvider>
			</UserProvider>
		</ThemeProvider>
	);
}

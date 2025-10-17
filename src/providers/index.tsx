'use client';

import { ThemeProvider } from './theme-provider';
import { UserProvider } from './user-provider';
import { QuestionsProvider } from './questions-provider';
import { ResultsProvider } from './results-provider';
import { User } from '@supabase/supabase-js';
import { Question } from '@/lib/types';

interface ProviderProps {
	children: React.ReactNode;
	user: User | null;
	questions: Question[];
}

export function Providers({ children, user, questions }: ProviderProps) {
	return (
		<ThemeProvider enableSystem attribute='class' defaultTheme='system' disableTransitionOnChange>
			<UserProvider user={user}>
				<QuestionsProvider questions={questions}>
					<ResultsProvider>{children}</ResultsProvider>
				</QuestionsProvider>
			</UserProvider>
		</ThemeProvider>
	);
}

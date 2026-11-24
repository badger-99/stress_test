import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { Result } from '@/lib/types';

// Check-in history lives only in this browser (localStorage). Nothing is sent
// to a server. Storage can be unavailable (private mode, blocked site data),
// so every access is guarded and the app still works for the current session.
const STORAGE_KEY = 'stresstest:history:v1';

function readStored(): Result[] {
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		const parsed: unknown = raw ? JSON.parse(raw) : [];
		return Array.isArray(parsed) ? (parsed as Result[]) : [];
	} catch {
		return [];
	}
}

function writeStored(history: Result[]) {
	try {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
	} catch {
		// Storage full or blocked: keep the in-memory copy only.
	}
}

interface ResultContextType {
	/** Oldest first. */
	history: Result[];
	latest: Result | null;
	/** False until the stored history has been read on the client. */
	loaded: boolean;
	addResult: (result: Result) => void;
	clearHistory: () => void;
}

const ResultContext = createContext<ResultContextType | undefined>(undefined);

export const useResult = () => {
	const context = useContext(ResultContext);
	if (context === undefined) {
		throw new Error('useResult must be used within a ResultProvider');
	}
	return context;
};

export const ResultProvider = ({ children }: { children: React.ReactNode }) => {
	const [history, setHistory] = useState<Result[]>([]);
	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		setHistory(readStored());
		setLoaded(true);
	}, []);

	const addResult = useCallback((result: Result) => {
		setHistory((prev) => {
			const next = [...prev, result];
			writeStored(next);
			return next;
		});
	}, []);

	const clearHistory = useCallback(() => {
		setHistory([]);
		try {
			localStorage.removeItem(STORAGE_KEY);
		} catch {
			// Nothing stored, or storage blocked.
		}
	}, []);

	const latest = history.length ? history[history.length - 1] : null;

	return (
		<ResultContext.Provider value={{ history, latest, loaded, addResult, clearHistory }}>
			{children}
		</ResultContext.Provider>
	);
};

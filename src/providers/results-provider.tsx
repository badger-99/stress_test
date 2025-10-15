import { createContext, useContext } from 'react';
import { Results } from '@/lib/types';
import { useState } from 'react';

interface ResultsContextType {
  results: Results[];
  setResults: React.Dispatch<React.SetStateAction<Results[]>>;
}

const ResultsContext = createContext<ResultsContextType | undefined>(undefined);

export const useResults = () => {
	const context = useContext(ResultsContext);
	if (context === undefined) {
		throw new Error('useResults must be used within a ResultsProvider');
	}
	return context;
};

interface ProviderProps {
	children: React.ReactNode;
}

export const ResultsProvider = ({ children }: ProviderProps) => {
  const [results, setResults] = useState<Results[]>([])

	return <ResultsContext.Provider value={{ results, setResults }}>{children}</ResultsContext.Provider>;
};

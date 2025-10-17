import { createContext, useContext } from 'react';
import { Question } from '@/lib/types';

interface QuestionsContextProp {
	questions: Question[];
}

const QuestionsContext = createContext<QuestionsContextProp | undefined>(undefined);

export const useQuestions = () => {
	const context = useContext(QuestionsContext);

	if (context === undefined) {
		throw new Error('useQuestions must be used within a QuestionsProvider');
	}

	return context;
};

interface ProviderProps{
  children: React.ReactNode;
  questions: Question[]
}

export const QuestionsProvider = ({ children, questions }: ProviderProps) => {
  return <QuestionsContext.Provider value={{questions}}>{ children }</QuestionsContext.Provider>
}
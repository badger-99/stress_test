import { createContext, useContext } from 'react';
import { Insight } from '@/lib/types';

interface InsightsContextProp {
  insights: Insight[];
}

const InsightsContext = createContext<InsightsContextProp | undefined>(undefined);

export const useInsights = () => {
  const context = useContext(InsightsContext);

  if (context === undefined) {
    throw new Error('useInsights must be used within a InsightsProvider');
  }

  return context;
};

interface ProviderProps{
  children: React.ReactNode;
  insights: Insight[]
}

export const InsightsProvider = ({ children, insights }: ProviderProps) => {
  return <InsightsContext.Provider value={{insights}}>{ children }</InsightsContext.Provider>
}
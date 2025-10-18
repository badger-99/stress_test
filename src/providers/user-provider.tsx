import { createContext, useContext } from 'react';
import { User } from '@supabase/supabase-js';

interface UserContextProp {
	user: User | null;
}

const UserContext = createContext<UserContextProp | undefined>(undefined);

export const useUser = () => {
	const context = useContext(UserContext);
	if (context === undefined) {
		throw new Error('useUser must be used within a UserProvider');
	}
	return context;
};

interface ProviderProps {
	children: React.ReactNode;
	user: User | null;
}

export const UserProvider = ({ children, user }: ProviderProps) => {
	return <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>;
};

import React, {
	createContext,
	useContext,
	useState,
	useEffect,
	ReactNode,
} from 'react';
import { getGames } from './services/service';
import { Game } from './interface/interface';

interface AppContextProps {
	games: Game[];
}

interface AppProviderProps {
	children: ReactNode;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
	const [games, setGames] = useState<Game[]>([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const gamesData = await getGames();
				setGames(gamesData);
			} catch (error) {
				console.error('Error fetching games:', error);
			}
		};

		fetchData();
	}, []);

	return (
		<AppContext.Provider value={{ games }}>{children}</AppContext.Provider>
	);
};

export const useAppContext = (): AppContextProps => {
	const context = useContext(AppContext);
	if (!context) {
		throw new Error('useAppContext must be used within an AppProvider');
	}
	return context;
};

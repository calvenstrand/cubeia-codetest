import React, {
	createContext,
	useContext,
	useState,
	useEffect,
	ReactNode,
} from 'react';
import { getGames, getStudios, getTags } from './services/service';
import { Game, Studio, Tags } from './interface/interface';

interface AppContextProps {
	games: Game[];
	studios: Studio[];
	tags: Tags[];
}

interface AppProviderProps {
	children: ReactNode;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
	const [games, setGames] = useState<Game[]>([]);
	const [studios, setStudios] = useState<Studio[]>([]);
	const [tags, setTags] = useState<Tags[]>([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const gamesData = await getGames();
				const studiosData = await getStudios();
				const tagsData = await getTags();
				setGames(gamesData);
				setStudios(studiosData);
				setTags(tagsData);
			} catch (error) {
				console.error('Error fetching games:', error);
			}
		};

		fetchData();
	}, []);

	return (
		<AppContext.Provider value={{ games, studios, tags }}>
			{children}
		</AppContext.Provider>
	);
};

export const useAppContext = (): AppContextProps => {
	const context = useContext(AppContext);
	if (!context) {
		throw new Error('useAppContext must be used within an AppProvider');
	}
	return context;
};

import axios from 'axios';
import { Game, LobbyData, Studio, Tags } from '../interface/interface';

const BASE_URL =
	'https://cubeia-code-tests.s3.eu-west-1.amazonaws.com/lobby.json';

let cachedData: LobbyData | null = null;

const fetchLobbyData = async (): Promise<LobbyData> => {
	if (cachedData) {
		return cachedData;
	}

	try {
		const response = await axios.get<LobbyData>(BASE_URL);
		cachedData = response.data;
		console.log(response.data);
		return cachedData;
	} catch (error) {
		console.error('Error fetching lobby data:', error);
		throw new Error('Failed to fetch lobby data');
	}
};

export const getGames = async (): Promise<Game[]> => {
	const data = await fetchLobbyData();
	return data.games;
};

export const getStudios = async (): Promise<Studio[]> => {
	const data = await fetchLobbyData();
	return data.studios;
};

export const getCurrencies = async (): Promise<any[]> => {
	const data = await fetchLobbyData();
	return data.currencies;
};

export const getTags = async (): Promise<Tags[]> => {
	const data = await fetchLobbyData();
	return data.tags;
};

export const getGameById = async (id: number): Promise<Game | undefined> => {
	const games = await getGames();
	return games.find((game) => game.id === id);
};

export const getStudioById = async (
	id: number
): Promise<Studio | undefined> => {
	const studios = await getStudios();
	return studios.find((studio) => studio.id === id);
};

// get studios games from studio id
export const getStudioGames = async (id: number): Promise<Game[]> => {
	const games = await getGames();
	return games.filter((game) => game.studioId === id);
};

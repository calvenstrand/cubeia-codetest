import { Game } from '../interface/interface';

export const filterGames = (
	games: Game[],
	selectedStudio: string,
	selectedGameType: string,
	selectedCurrency: string,
	studioBlockedCurrencies: { [key: number]: string[] }
): Game[] => {
	let filteredGames = games;

	if (selectedStudio !== 'all') {
		filteredGames = filteredGames.filter(
			(game) => game.studioId === Number(selectedStudio)
		);
	}

	if (selectedGameType !== 'all') {
		filteredGames = filteredGames.filter(
			(game) => game.gameType === selectedGameType
		);
	}

	if (selectedCurrency !== 'all') {
		filteredGames = filteredGames.filter(
			(game) =>
				!studioBlockedCurrencies[game.studioId]?.includes(selectedCurrency)
		);
	}

	return filteredGames;
};

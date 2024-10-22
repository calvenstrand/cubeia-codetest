import { Game } from '../interface/interface';

export const filterGames = (
	games: Game[],
	selectedStudio: string,
	selectedCurrency: string,
	studioBlockedCurrencies: { [key: number]: string[] }
): Game[] => {
	let filteredGames = games;

	if (selectedStudio !== 'all') {
		filteredGames = filteredGames.filter(
			(game) => game.studioId === Number(selectedStudio)
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

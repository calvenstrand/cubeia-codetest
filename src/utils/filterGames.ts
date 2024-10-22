import { Game, Studio, Tags } from '../interface/interface';

export const filterGames = (
	games: Game[],
	selectedStudio: string,
	selectedCurrency: string,
	selectedTags: Tags[],
	studios: Studio[]
): Game[] => {
	let filteredGames = games;

	if (selectedStudio !== 'all') {
		filteredGames = filteredGames.filter(
			(game) => game.studioId === Number(selectedStudio)
		);
	}

	const studioBlockedCurrencies = studios.reduce((acc, studio) => {
		acc[studio.id] = studio.blockedCountries
			? studio.blockedCountries.split(',')
			: [];
		return acc;
	}, {} as { [key: number]: string[] });

	if (selectedCurrency !== 'all') {
		filteredGames = filteredGames.filter(
			(game) =>
				!studioBlockedCurrencies[game.studioId]?.includes(selectedCurrency)
		);
	}

	if (selectedTags.length > 0) {
		const selectedTagIds = selectedTags.map((tag) => tag.id);
		filteredGames = filteredGames.filter((game) =>
			game.gameTags.some((tagId) => selectedTagIds.includes(tagId))
		);
	}

	return filteredGames;
};

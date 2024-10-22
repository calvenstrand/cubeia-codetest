import { Game, Studio, Tags } from '../interface/interface';
import { filterGames } from './filterGames';

export const updateAvailableTags = (
	games: Game[],
	selectedStudio: string,
	selectedCurrency: string,
	studios: Studio[],
	tags: Tags[],
	setAvailableTags: (tags: Tags[]) => void
) => {
	let filteredGames = filterGames(
		games,
		selectedStudio,
		selectedCurrency,
		[],
		studios
	);

	const availableTagIds = new Set<number>();
	filteredGames.forEach((game) => {
		game.gameTags.forEach((tagId) => availableTagIds.add(tagId));
	});

	const newAvailableTags = tags.filter((tag) => availableTagIds.has(tag.id));
	setAvailableTags(newAvailableTags);
};

export const updateAvailableStudios = (
	games: Game[],
	selectedTags: Tags[],
	studios: Studio[],
	setAvailableStudios: (studios: Studio[]) => void
) => {
	let filteredGames = filterGames(games, 'all', 'all', selectedTags, studios);
	const availableStudioIds = new Set<number>();

	filteredGames.forEach((game) => {
		availableStudioIds.add(game.studioId);
	});

	const newAvailableStudios = studios.filter((studio) =>
		availableStudioIds.has(studio.id)
	);
	setAvailableStudios(newAvailableStudios);
};

export const createStudioNameMap = (
	studios: Studio[]
): { [key: number]: string } => {
	const studioNameMap: { [key: number]: string } = {};
	studios.forEach((studio) => {
		studioNameMap[studio.id] = studio.name;
	});
	return studioNameMap;
};

export const getStudioName = (
	studioId: number,
	studioNameMap: { [key: number]: string }
): string => {
	return studioNameMap[studioId] || 'Unknown Studio';
};

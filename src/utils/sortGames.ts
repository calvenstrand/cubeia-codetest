import { Game } from '../interface/interface';

export const sortGames = (games: Game[], sortOption: string): Game[] => {
	return games.sort((a, b) => {
		if (sortOption === 'name') {
			return a.name.localeCompare(b.name);
		} else if (sortOption === 'releaseDate') {
			return b.releaseDate - a.releaseDate;
		}
		return 0;
	});
};

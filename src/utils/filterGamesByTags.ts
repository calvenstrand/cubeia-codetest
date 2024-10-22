import { Game, Tags } from '../interface/interface';

export function filterGamesByTags(games: Game[], selectedTags: Tags[]): Game[] {
	if (selectedTags.length === 0) {
		return games;
	}
	const selectedTagIds = selectedTags.map((tag) => tag.id);
	return games.filter((game) =>
		game.gameTags.some((tagId) => selectedTagIds.includes(tagId))
	);
}

import { Studio } from '../interface/interface';

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

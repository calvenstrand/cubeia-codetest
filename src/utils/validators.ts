import { LobbyData } from '../interface/interface';

export const isValidLobbyData = (data: any): data is LobbyData => {
	return data && Array.isArray(data.games) && Array.isArray(data.studios);
};

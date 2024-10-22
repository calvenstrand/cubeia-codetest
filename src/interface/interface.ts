export interface LobbyData {
	games: Game[];
	studios: Studio[];
	currencies: any[];
	tags: Tags[];
}

export interface Game {
	id: number;
	name: string;
	mobile: boolean;
	desktop: boolean;
	playForFun: boolean;
	externalId: string;
	mobileExternalId: string;
	display: string;
	imageUrl: string;
	gameType: string;
	aspectRatio: string;
	integration: string;
	studioId: number;
	translations: any[];
	releaseDate: number;
	gameTags: number[];
	backgroundImageUrl: string;
	description: string;
}

export interface Studio {
	id: number;
	name: string;
	externalId: string;
	integration: string;
	enabled: boolean;
	imageUrl: string;
	blockedCountries: string;
	lobbyOrder: number;
	providerBlockedCountries: string;
	blockedCurrencies: string;
	icon: string;
	popular: boolean;
}

export interface Tags {
	id: number;
	name: string;
	nameId: string;
	display: boolean;
	translations: {
		[key: string]: string;
	};
}

export interface PaginationProps {
	itemsPerPage: number;
	totalItems: number;
	paginate: (pageNumber: number) => void;
	currentPage: number;
}

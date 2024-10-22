import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Tags, Studio } from '../interface/interface';
import Pagination from '../components/Pagination';
import Filter from '../components/Filter';
import GameCard from '../components/GameCard';
import { filterGames } from '../utils/filterGames';
import { createStudioNameMap } from '../utils/utils';
import { useAppContext } from '../AppContext';

const Home: React.FC = () => {
	const { page } = useParams<{ page: string }>();
	const navigate = useNavigate();
	const { games, studios, tags } = useAppContext();
	const [currentPage, setCurrentPage] = useState<number>(Number(page) || 1);
	const [selectedStudio, setSelectedStudio] = useState<string>('all');
	const [selectedCurrency, setSelectedCurrency] = useState<string>('EUR');
	const [selectedTags, setSelectedTags] = useState<Tags[]>([]);
	const [availableTags, setAvailableTags] = useState<Tags[]>(tags);
	const [availableStudios, setAvailableStudios] = useState<Studio[]>(studios);
	const itemsPerPage = 20;

	useEffect(() => {
		setAvailableStudios(studios);
		setAvailableTags(tags);
	}, [studios, tags]);

	useEffect(() => {
		updateAvailableTags();
		updateAvailableStudios();
	}, [selectedStudio, selectedCurrency, selectedTags]);

	const handleStudioChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectedStudio(e.target.value);
	};

	const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectedCurrency(e.target.value);
	};

	const handleTagChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const selectedTagId = Number(e.target.value);
		if (selectedTagId === 0) {
			setSelectedTags([]);
		} else {
			const selectedTag = tags.find((tag) => tag.id === selectedTagId);
			if (selectedTag) {
				setSelectedTags((prevTags) => [...prevTags, selectedTag]);
			}
		}
	};

	const updateAvailableTags = () => {
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

	const updateAvailableStudios = () => {
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

	const filteredGames = filterGames(
		games,
		selectedStudio,
		selectedCurrency,
		selectedTags,
		studios
	);

	const indexOfLastGame = currentPage * itemsPerPage;
	const indexOfFirstGame = indexOfLastGame - itemsPerPage;
	const currentGames = filteredGames.slice(indexOfFirstGame, indexOfLastGame);

	const paginate = (pageNumber: number) => {
		setCurrentPage(pageNumber);
		navigate(`/page/${pageNumber}`);
	};

	const studioNameMap = createStudioNameMap(studios);

	return (
		<div className='container container--home'>
			<h1>Games</h1>
			<Filter
				selectedStudio={selectedStudio}
				selectedCurrency={selectedCurrency}
				studios={availableStudios}
				tags={availableTags}
				handleStudioChange={handleStudioChange}
				handleCurrencyChange={handleCurrencyChange}
				handleTagChange={handleTagChange}
			/>
			<div className='row'>
				{currentGames.map((game) => (
					<GameCard key={game.id} game={game} studioNameMap={studioNameMap} />
				))}
			</div>
			<Pagination
				itemsPerPage={itemsPerPage}
				totalItems={filteredGames.length}
				paginate={paginate}
				currentPage={currentPage}
			/>
		</div>
	);
};

export default Home;

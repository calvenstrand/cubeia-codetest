import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Tags } from '../interface/interface';
import Pagination from '../components/Pagination';
import Filter from '../components/Filter';
import GameCard from '../components/GameCard';
import { filterGames } from '../utils/filterGames';
import { filterGamesByTags } from '../utils/filterGamesByTags';
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
	const itemsPerPage = 12;

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

	const studioBlockedCurrencies = studios.reduce((acc, studio) => {
		acc[studio.id] = studio.blockedCountries
			? studio.blockedCountries.split(',')
			: [];
		return acc;
	}, {} as { [key: number]: string[] });

	const filteredGames = filterGames(
		games,
		selectedStudio,
		selectedCurrency,
		studioBlockedCurrencies
	);

	const filteredGamesByTags = filterGamesByTags(filteredGames, selectedTags);

	const indexOfLastGame = currentPage * itemsPerPage;
	const indexOfFirstGame = indexOfLastGame - itemsPerPage;
	const currentGames = filteredGamesByTags.slice(
		indexOfFirstGame,
		indexOfLastGame
	);

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
				studios={studios}
				tags={tags}
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
				totalItems={filteredGamesByTags.length}
				paginate={paginate}
				currentPage={currentPage}
			/>
		</div>
	);
};

export default Home;

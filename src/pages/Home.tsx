import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getGames, getStudios } from '../services/service';
import { Game, Studio } from '../interface/interface';
import Pagination from '../components/Pagination';
import Filter from '../components/Filter';
import GameCard from '../components/GameCard';
import { sortGames } from '../utils/sortGames';
import { filterGames } from '../utils/filterGames';
import { createStudioNameMap } from '../utils/utils';

const Home: React.FC = () => {
	const { page } = useParams<{ page: string }>();
	const navigate = useNavigate();
	const [games, setGames] = useState<Game[]>([]);
	const [studios, setStudios] = useState<Studio[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);
	const [currentPage, setCurrentPage] = useState<number>(Number(page) || 1);
	const [sortOption, setSortOption] = useState<string>('name'); // State for sorting option
	const [selectedStudio, setSelectedStudio] = useState<string>('all'); // State for studio filter
	const [selectedGameType, setSelectedGameType] = useState<string>('all'); // State for game type filter
	const [selectedCurrency, setSelectedCurrency] = useState<string>('EUR'); // State for currency filter
	const itemsPerPage = 12;

	useEffect(() => {
		const fetchData = async () => {
			try {
				const gamesData = await getGames();
				const studiosData = await getStudios();
				setGames(gamesData);
				setStudios(studiosData);
			} catch (error) {
				setError('Error fetching data');
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setSortOption(e.target.value);
	};

	const handleStudioChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectedStudio(e.target.value);
	};

	const handleGameTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectedGameType(e.target.value);
	};

	const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectedCurrency(e.target.value);
	};

	const sortedGames = sortGames(games, sortOption);

	const studioBlockedCurrencies = studios.reduce((acc, studio) => {
		acc[studio.id] = studio.blockedCountries
			? studio.blockedCountries.split(',')
			: [];
		return acc;
	}, {} as { [key: number]: string[] });

	const filteredGames = filterGames(
		sortedGames,
		selectedStudio,
		selectedGameType,
		selectedCurrency,
		studioBlockedCurrencies
	);

	const indexOfLastGame = currentPage * itemsPerPage;
	const indexOfFirstGame = indexOfLastGame - itemsPerPage;
	const currentGames = filteredGames.slice(indexOfFirstGame, indexOfLastGame);

	const paginate = (pageNumber: number) => {
		setCurrentPage(pageNumber);
		navigate(`/page/${pageNumber}`);
	};

	if (loading) return <div>Loading...</div>;
	if (error) return <div>{error}</div>;

	const studioNameMap = createStudioNameMap(studios);

	return (
		<div className='container mt-4'>
			<h1>Games</h1>
			<Filter
				sortOption={sortOption}
				selectedStudio={selectedStudio}
				selectedGameType={selectedGameType}
				selectedCurrency={selectedCurrency}
				studios={studios}
				games={games}
				handleSortChange={handleSortChange}
				handleStudioChange={handleStudioChange}
				handleGameTypeChange={handleGameTypeChange}
				handleCurrencyChange={handleCurrencyChange}
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

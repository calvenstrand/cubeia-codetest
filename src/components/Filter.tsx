import React from 'react';
import { Game, Studio } from '../interface/interface';

interface FilterProps {
	sortOption: string;
	filterOption: string;
	selectedStudio: string;
	selectedGameType: string;
	selectedCurrency: string;
	studios: Studio[];
	games: Game[];
	handleSortChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
	handleFilterChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
	handleStudioChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
	handleGameTypeChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
	handleCurrencyChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Filter: React.FC<FilterProps> = ({
	sortOption,
	selectedStudio,
	selectedGameType,
	selectedCurrency,
	studios,
	games,
	handleSortChange,
	handleStudioChange,
	handleGameTypeChange,
	handleCurrencyChange,
}) => {
	return (
		<div>
			<div className='mb-3'>
				<label htmlFor='sort' className='form-label'>
					Sort by:
				</label>
				<select
					id='sort'
					className='form-select'
					value={sortOption}
					onChange={handleSortChange}
				>
					<option value='name'>Name</option>
					<option value='releaseDate'>Release Date</option>
				</select>
			</div>
			<div className='mb-3'>
				<label htmlFor='studio' className='form-label'>
					Filter by Studio:
				</label>
				<select
					id='studio'
					className='form-select'
					value={selectedStudio}
					onChange={handleStudioChange}
				>
					<option value='all'>All</option>
					{studios.map((studio) => (
						<option key={studio.id} value={studio.id}>
							{studio.name}
						</option>
					))}
				</select>
			</div>
			<div className='mb-3'>
				<label htmlFor='gameType' className='form-label'>
					Filter by Game Type:
				</label>
				<select
					id='gameType'
					className='form-select'
					value={selectedGameType}
					onChange={handleGameTypeChange}
				>
					<option value='all'>All</option>
					{Array.from(new Set(games.map((game) => game.gameType))).map(
						(gameType) => (
							<option key={gameType} value={gameType}>
								{gameType}
							</option>
						)
					)}
				</select>
			</div>
			<div className='mb-3'>
				<label htmlFor='currency' className='form-label'>
					Filter by Currency:
				</label>
				<select
					id='currency'
					className='form-select'
					value={selectedCurrency}
					onChange={handleCurrencyChange}
				>
					<option value='EUR'>EUR</option>
					<option value='USD'>USD</option>
					<option value='mBTC'>mBTC</option>
				</select>
			</div>
		</div>
	);
};

export default Filter;

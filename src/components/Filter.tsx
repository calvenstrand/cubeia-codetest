import React from 'react';
import { Studio, Tags } from '../interface/interface';

interface FilterProps {
	selectedStudio: string;
	selectedCurrency: string;
	studios: Studio[];
	tags: Tags[];
	handleStudioChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
	handleCurrencyChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
	handleTagChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Filter: React.FC<FilterProps> = ({
	selectedStudio,
	selectedCurrency,
	studios,
	tags,
	handleStudioChange,
	handleCurrencyChange,
	handleTagChange,
}) => {
	return (
		<div className='row mb-3'>
			<div className='col-md-4 mb-3'>
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
			<div className='col-md-4 mb-3'>
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
			<div className='col-md-4 mb-3'>
				<label htmlFor='tags' className='form-label'>
					Filter by Tags:
				</label>
				<select id='tags' className='form-select' onChange={handleTagChange}>
					<option value='0'>All</option>
					{tags.map((tag) => (
						<option key={tag.id} value={tag.id}>
							{tag.name}
						</option>
					))}
				</select>
			</div>
		</div>
	);
};

export default Filter;

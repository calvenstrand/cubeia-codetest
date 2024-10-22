import React from 'react';
import { PaginationProps } from '../interface/interface';

const Pagination: React.FC<PaginationProps> = ({
	itemsPerPage,
	totalItems,
	paginate,
	currentPage,
}) => {
	const totalPages = Math.ceil(totalItems / itemsPerPage);
	const maxPageNumbersToShow = 5;

	if (totalPages <= 1) return null;

	const getPageNumbers = () => {
		const pages: (number | string)[] = [];
		const halfMaxPageNumbersToShow = Math.floor(maxPageNumbersToShow / 2);

		let startPage = Math.max(currentPage - halfMaxPageNumbersToShow, 1);
		let endPage = Math.min(currentPage + halfMaxPageNumbersToShow, totalPages);

		if (currentPage <= halfMaxPageNumbersToShow) {
			endPage = Math.min(maxPageNumbersToShow, totalPages);
		} else if (currentPage + halfMaxPageNumbersToShow >= totalPages) {
			startPage = Math.max(totalPages - maxPageNumbersToShow + 1, 1);
		}

		for (let i = startPage; i <= endPage; i++) {
			pages.push(i);
		}

		if (startPage > 1) {
			pages.unshift(1);
			if (startPage > 2) {
				pages.splice(1, 0, '...');
			}
		}

		if (endPage < totalPages) {
			pages.push(totalPages);
			if (endPage < totalPages - 1) {
				pages.splice(pages.length - 1, 0, '...');
			}
		}

		return pages;
	};

	const pageNumbersToShow = getPageNumbers();

	return (
		<nav>
			<ul className='pagination justify-content-center'>
				{pageNumbersToShow.map((number, index) => (
					<li
						key={index}
						className={`page-item ${currentPage === number ? 'active' : ''}`}
					>
						{typeof number === 'number' ? (
							<a
								onClick={() => paginate(number)}
								href='#'
								className='page-link'
							>
								{number}
							</a>
						) : (
							<span className='page-link'>{number}</span>
						)}
					</li>
				))}
			</ul>
		</nav>
	);
};

export default Pagination;

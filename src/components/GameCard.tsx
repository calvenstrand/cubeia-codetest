import React from 'react';
import { Link } from 'react-router-dom';
import { Game } from '../interface/interface';
import { getStudioName } from '../utils/utils';

interface GameCardProps {
	game: Game;
	studioNameMap?: { [key: number]: string };
}

const GameCard: React.FC<GameCardProps> = ({ game, studioNameMap }) => {
	return (
		<div className='col-lg-3 col-md-4 mb-4'>
			<div className='card'>
				<Link to={`/game/${game.id}`}>
					<img src={game.imageUrl} className='card-img-top' alt={game.name} />
				</Link>
				<div className='card-body'>
					<h5 className='card-title'>
						<Link to={`/game/${game.id}`}>{game.name}</Link>
					</h5>
					{studioNameMap && (
						<p className='card-text'>
							<Link to={`/studio/${game.studioId}`}>
								{getStudioName(game.studioId, studioNameMap)}
							</Link>
						</p>
					)}
				</div>
			</div>
		</div>
	);
};

export default GameCard;

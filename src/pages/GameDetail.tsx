import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Game } from '../interface/interface';
import { getGameById } from '../services/service';
import 'bootstrap/dist/css/bootstrap.min.css';

const GameDetail: React.FC = () => {
	const { id } = useParams<{ id: string }>();
	const [game, setGame] = useState<Game | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchGame = async () => {
			try {
				const gameData = await getGameById(Number(id));
				if (gameData) {
					setGame(gameData);
				} else {
					setError('Game not found');
				}
			} catch (error) {
				setError('Error fetching game details');
			} finally {
				setLoading(false);
			}
		};

		fetchGame();
	}, [id]);

	if (loading) return <div>Loading...</div>;
	if (error) return <div>{error}</div>;
	if (!game) return <div>Game not found</div>;

	return (
		<div className='container mt-4'>
			{game.backgroundImageUrl && (
				<div className='hero-image mb-4'>
					<img
						src={game.backgroundImageUrl}
						alt='Game background'
						className='img-fluid w-100'
					/>
				</div>
			)}
			<div className='row'>
				<div className='col-md-8'>
					<h1>{game.name}</h1>
					<p>{game.description}</p>
				</div>
				<div className='col-md-4'>
					<h5>Game Details</h5>
					<ul className='list-group'>
						<li className='list-group-item'>
							<strong>Game Type:</strong> {game.gameType}
						</li>
						<li className='list-group-item'>
							<strong>Aspect Ratio:</strong> {game.aspectRatio}
						</li>
						<li className='list-group-item'>
							<strong>Integration:</strong> {game.integration}
						</li>
						<li className='list-group-item'>
							<strong>Release Date:</strong>{' '}
							{new Date(game.releaseDate).toLocaleDateString()}
						</li>
						<li className='list-group-item'>
							<strong>Studio ID:</strong> {game.studioId}
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
};

export default GameDetail;

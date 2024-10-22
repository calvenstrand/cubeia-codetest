import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Game } from '../interface/interface';
import { getGameById } from '../services/service';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createStudioNameMap, getStudioName } from '../utils/utils';
import { useAppContext } from '../AppContext';
import StatusMessage from '../components/StatusMessage';

const GameDetail: React.FC = () => {
	const { id } = useParams<{ id: string }>();
	const { studios } = useAppContext();
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

	const studioNameMap = createStudioNameMap(studios);

	if (loading || error || !game) {
		return <StatusMessage loading={loading} error={error} notFound={!game} />;
	}

	return (
		<div className='container container--game-detail'>
			<div className='row'>
				<div className='col-md-6'>
					{game.imageUrl && (
						<div className='hero-image'>
							<img
								src={game.imageUrl}
								alt='Game background'
								className='img-fluid w-100'
							/>
						</div>
					)}
				</div>
				<div className='card mb-4 text-white bg-dark col-md-6'>
					<div className='card-header'>
						<h1>{game.name}</h1>
					</div>
					<div className='card-body'>
						<div className='col-md-12'>
							<p>{game.description}</p>
							<p>
								<strong>Game Type:</strong> {game.gameType}
							</p>
							<p>
								<strong>Aspect Ratio:</strong> {game.aspectRatio}
							</p>
							<p>
								<strong>Integration:</strong> {game.integration}
							</p>
							<p>
								<strong>Release Date:</strong>{' '}
								{new Date(game.releaseDate).toLocaleDateString()}
							</p>
							<p>
								<strong>Studio ID:</strong>
								{getStudioName(game.studioId, studioNameMap)}
							</p>

							<div className='d-grid gap-2 mt-4'>
								<a
									href='https://www.cubeia.com/'
									className='btn btn-primary btn-cta'
									rel='noreferrer noopener'
								>
									Play {game.name}
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default GameDetail;

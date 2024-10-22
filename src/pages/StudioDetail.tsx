import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getStudioById, getStudioGames } from '../services/service';
import { Game, Studio } from '../interface/interface';
import 'bootstrap/dist/css/bootstrap.min.css';
import GameCard from '../components/GameCard';

const fallbackImageUrl = '';

const StudioDetail: React.FC = () => {
	const { id } = useParams<{ id: string }>();
	const [studio, setStudio] = useState<Studio | null>(null);
	const [studioGames, setStudioGames] = useState<Game[] | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchStudio = async () => {
			try {
				const studioData = await getStudioById(Number(id));
				if (studioData) {
					setStudio(studioData);
				} else {
					setError('Studio not found');
				}
			} catch (error) {
				setError('Error fetching studio details');
			} finally {
				setLoading(false);
			}
		};

		const fetchStudioGames = async () => {
			try {
				const games = await getStudioGames(Number(id));
				setStudioGames(games);
			} catch (error) {
				console.error('Error fetching studio games', error);
			}
		};

		fetchStudioGames();
		fetchStudio();
	}, [id]);

	if (loading) return <div>Loading...</div>;
	if (error) return <div>{error}</div>;
	if (!studio) return <div>Studio not found</div>;

	return (
		<div className='container container--studio-detail'>
			<div className='row'>
				{studio.imageUrl && (
					<div className='col-md-6 mb-4'>
						<div className='hero-image'>
							<img
								src={studio.imageUrl}
								alt='Studio background'
								className='img-fluid w-100'
								onError={(e) => {
									e.currentTarget.src = fallbackImageUrl;
								}}
							/>
						</div>
					</div>
				)}
				<div className='col-md-6'>
					<div className='card text-white bg-dark'>
						<div className='card-header'>
							<h1>{studio.name}</h1>
						</div>
						<div className='card-body'>
							<div className='row'>
								<div className='col-md-6'>
									<p>
										<strong>External ID:</strong> {studio.externalId}
									</p>
									<p>
										<strong>Integration:</strong> {studio.integration}
									</p>
									<p>
										<strong>Enabled:</strong> {studio.enabled ? 'Yes' : 'No'}
									</p>
									<p>
										<strong>Lobby Order:</strong> {studio.lobbyOrder}
									</p>
									<p>
										<strong>Popular:</strong> {studio.popular ? 'Yes' : 'No'}
									</p>
								</div>
								<div className='col-md-6'>
									<p>
										<strong>Blocked Countries:</strong>{' '}
										{studio.blockedCountries}
									</p>
									<p>
										<strong>Provider Blocked Countries:</strong>
										{studio.providerBlockedCountries}
									</p>
									<p>
										<strong>Icon:</strong> {studio.icon}
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			{studioGames && (
				<div className='row'>
					<h2 className='text-center mb-5 mt-5'>{studio.name} Games</h2>
					{studioGames.map((game) => (
						<GameCard key={game.id} game={game} />
					))}
				</div>
			)}
		</div>
	);
};

export default StudioDetail;

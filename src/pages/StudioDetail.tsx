import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getStudioById } from '../services/service';
import { Studio } from '../interface/interface';
import 'bootstrap/dist/css/bootstrap.min.css';

const fallbackImageUrl = '';

const StudioDetail: React.FC = () => {
	const { id } = useParams<{ id: string }>();
	const [studio, setStudio] = useState<Studio | null>(null);
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

		fetchStudio();
	}, [id]);

	if (loading) return <div>Loading...</div>;
	if (error) return <div>{error}</div>;
	if (!studio) return <div>Studio not found</div>;

	return (
		<div className='container mt-4'>
			{studio.imageUrl && (
				<div className='hero-image mb-4'>
					<img
						src={studio.imageUrl}
						alt='Studio background'
						className='img-fluid w-100'
						onError={(e) => {
							e.currentTarget.src = fallbackImageUrl;
						}}
					/>
				</div>
			)}
			<div className='card'>
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
								<strong>Blocked Countries:</strong> {studio.blockedCountries}
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
	);
};

export default StudioDetail;

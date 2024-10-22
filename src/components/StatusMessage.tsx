import React from 'react';

interface StatusMessageProps {
	loading: boolean;
	error: string | null;
	notFound: boolean;
}

const StatusMessage: React.FC<StatusMessageProps> = ({
	loading,
	error,
	notFound,
}) => {
	if (loading) {
		return (
			<div className='container'>
				<div className='alert alert-info' role='alert'>
					Loading...
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className='container'>
				<div className='alert alert-danger' role='alert'>
					{error}
				</div>
			</div>
		);
	}

	if (notFound) {
		return (
			<div className='container'>
				<div className='alert alert-warning' role='alert'>
					Not found
				</div>
			</div>
		);
	}

	return null;
};

export default StatusMessage;

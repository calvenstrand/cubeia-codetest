import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import { AppProvider } from './AppContext';

const rootElement = document.getElementById('root');
if (rootElement) {
	createRoot(rootElement).render(
		<StrictMode>
			<AppProvider>
				<App />
			</AppProvider>
		</StrictMode>
	);
} else {
	console.error('Root element not found');
}

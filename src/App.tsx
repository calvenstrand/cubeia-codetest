import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import GameDetails from './pages/GameDetail';
import StudioDetail from './pages/StudioDetail';

const App = () => {
	return (
		<Router>
			<Header />
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/page/:page' element={<Home />} />
				<Route path='/game/:id' element={<GameDetails />} />
				<Route path='/studio/:id' element={<StudioDetail />} />
			</Routes>
		</Router>
	);
};

export default App;

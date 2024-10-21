import { Link } from 'react-router-dom';
import logo from '../assets/cubeia.png';
import Navbar from 'react-bootstrap/Navbar';

const Header = () => {
	return (
		<Navbar className='navbar-dark bg-dark sticky-top'>
			<div className='container-fluid'>
				<Link className='navbar-brand' to='/'>
					<img alt='cubeia' src={logo} />
				</Link>
			</div>
		</Navbar>
	);
};

export default Header;

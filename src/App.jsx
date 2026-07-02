import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from './components/navigation';
import { Container } from 'react-bootstrap';
import Welcome from './components/Welcome';
import BookingForm from './components/BookingForm';
import Home from './components/Home';
import Footer from './components/Footer';
import BookingList from './components/BookingList';

function App() {
	return (
		<>
			<div className='bg-body-secondary min-vh-100'>
				<Navigation />
				<Container>
					<Welcome />
					<Home />
					<BookingForm />
					<hr />
					<BookingList />
				</Container>
				<Footer />
			</div>
		</>
	);
}

export default App;

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from './components/navigation';
import { Container } from 'react-bootstrap';
import Welcome from './components/Welcome';
import BookingForm from './components/BookingForm';

function App() {
	return (
		<>
			<div className='bg-body-secondary min-vh-100'>
				<Navigation />
				<Container>
					<Welcome />
					<BookingForm />
				</Container>
			</div>
		</>
	);
}

export default App;

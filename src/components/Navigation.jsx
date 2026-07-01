import { Container, Nav, Navbar } from 'react-bootstrap';

function Navigation() {
	return (
		<Navbar bg='dark' data-bs-theme='dark'>
			<Container fluid={true} className='d-flex justify-content-between'>
				<Navbar.Brand href='#home' className='w-50'>Ristorante</Navbar.Brand>
				<Nav className='text-end'>
					<Nav.Link href='#home'>Home</Nav.Link>
					<Nav.Link href='#features'>Menu</Nav.Link>
					<Nav.Link href='#pricing'>Prenotazioni</Nav.Link>
				</Nav>
			</Container>
		</Navbar>
	);
}

export default Navigation;

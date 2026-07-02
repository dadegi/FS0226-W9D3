// import { Container, Row, Col, Carousel } from 'react-bootstrap';
import { Component } from 'react';
import menu from '../data/menu.json';
import { Carousel, Col, Container, Row } from 'react-bootstrap';

class Home extends Component {
	state = {
		// lo state è la memoria del component, che sarà sempre un oggetto con tutte le proprietà che ci servono
		activeItem: menu[0],
		// Impostando lo state iniziale sul primo elemennto dell'array, possiamo poi mappare l'array modificando lo state e comunicando al component chi caricare nel carousel di volta in volta
	};

	render() {
		return (
			<Container>
				<Row className='justify-content-center mt-3'>
					<Col className='text-center' xs={12} md={6}>
						{/* inizio carousel */}
						<Carousel
							onSlide={(index) => {
								console.log(index);
								// index è l'indice dell'elemento del json che arriverà nel carousel; aggiornando lo stato con questo index gli oggetti man mano che arrivano vengono inseriti nello stato e si alternano nel carousel
								this.setState({ activeItem: menu[index] });
							}}
						>
							{menu.map((item) => {
								return (
									<Carousel.Item key={item.id}>
										<img src={item.image} />
										<Carousel.Caption>
											<h3>{item.name}</h3>
										</Carousel.Caption>
									</Carousel.Item>
								);
							})}
						</Carousel>
						{/*Fine carousel */}
					</Col>
				</Row>
			</Container>
		);
	}
}

export default Home;

import { Component } from 'react';
import {
	Container,
	Row,
	Col,
	Spinner,
	ListGroup,
	Alert,
	Button,
} from 'react-bootstrap';

const APIURL = 'https://striveschool-api.herokuapp.com/api/reservation/';

class BookingList extends Component {
	// Lo stato servirà a memorizzare nella memoria del component quello che arriverà dalla GET e a collegare il rendering
	state = {
		reservations: [],
		loading: true, // servirà per gestire il rendering dello spinner
		error: false, // servirà per gestire il rendering dell'alert di bootstrap
	};

	listReservations = () => {
		fetch(APIURL)
			.then((response) => {
				if (response.ok) {
					return response.json();
				} else {
					throw new Error('Errore nel recupero delle prenotazioni');
				}
			})
			.then((list) => {
				// Il setState va sempre eseguito nel metodo/funzione che gestisce i dati: se venisse eseguito all'interno del render/return provocherebbe il ricaricamento del component, perché ogni volta che cambia uno stato il component recepisce il cambiamento e aggiorna il rendering; questo potrebbe provocare un loop del rendering
				this.setState({
					reservations: list,
					loading: false, // al termine della fetch scompare lo spinner
				});
			})
			.catch((err) => {
				console.log('Errore: ', err);
				this.setState({
					loading: false, // al termine della fetch scompare lo spinner
					error: true, // Se c'è un errore compare l'alert di bootstrap
				});
			});
	};

	deleteItem = (itemId) => {
		fetch(APIURL + itemId, {
			method: 'DELETE',
		})
			.then((response) => {
				if (response.ok) {
					alert('Prenotazione cancellata');
				} else {
					throw new Error(
						'Errore nella cancellazione della prenotazione',
					);
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};

	// componentDidMount è un metodo di lyfecycle (ciclo di vita del component, indica all'applicazione di eseguire le istruzioni DOPO che il componente è stato caricato, senza quindi bloccare il rendering delle parti statiche)
	componentDidMount() {
		this.listReservations();
	}
	// componentDidMount viene eseguito UNA VOLTA SOLA, al PRIMO caricamento del component, quindi eventuali cambiamenti nella base dati (in questo caso una nuova prenotazione o l'eliminazione di una prenotazione esistente) non vengono renderizzati subito, perché listReservations() non viene rieseguito; bisogna ricaricare il component per vedere la lsita aggiornata

	render() {
		console.log(this.state.reservations);
		return (
			<Container>
				<Row className='justify-content-center mt-3'>
					<Col className='text-center' xs={12} md={6}>
						<h2 className='text-center'>Lista prenotazioni</h2>
						{/*Conditional rendering di spinner e alert */}
						{this.state.loading && (
							<div className='text-center'>
								<Spinner variant='primary' animation='border' />
							</div>
						)}
						{this.state.error && (
							<div>
								<Alert variant='danger'>
									Errore nel recupero della lista prenotazioni
								</Alert>
							</div>
						)}
						<ListGroup>
							{this.state.reservations.map((item) => {
								let itemId = item._id;
								let itemDate = new Date(
									item.dateTime,
								).toLocaleDateString();
								let itemTime = new Date(
									item.dateTime,
								).toLocaleTimeString();
								return (
									<ListGroup.Item
										key={item._id}
										className='bookingList'
									>
										Prenotazione a nome di {item.name} per{' '}
										{item.numberOfPeople} persone, per il{' '}
										{itemDate} alle {itemTime}. Richieste
										speciali: {item.specialRequests}
										<p>
											<Button
												type='button'
												variant='light'
												onClick={() =>
													this.deleteItem(itemId)
												}
											>
												❌
											</Button>
										</p>
									</ListGroup.Item>
								);
							})}
						</ListGroup>
					</Col>
				</Row>
			</Container>
		);
	}
}

export default BookingList;

// Componente che genera il form di prenotazione
// Deve essere un class component perché serve this per la gestione dello stato, che sarà l'oggetto della prenotazione
// Questo è necessario ogni volta che si costruisce un form
import { Component } from 'react';

// Importazione dei componenti React Bootstrap necessari per la costruzione del form
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

const APIURL = 'https://striveschool-api.herokuapp.com/api/reservation';

const initialState = {
	name: '',
	phone: '',
	numberOfPeople: '',
	smoking: false,
	dateTime: '',
	specialRequests: '',
};

class BookingForm extends Component {
	// Stato iniziale del form: l'oggetto poteva essere scritto direttamente nello stato, ma creando una costante al submit l'oggetto risulterà già impacchettato. Le chiamate saranno quindi this.state.booking.name, this.state.booking.phone...
	state = {
		booking: initialState,
	};

	render() {
		return (
			<Container>
				<Row className='justify-content-center mt-3'>
					<Col className='text-center' xs={12} md={6}>
						<h3>Prenota un tavolo</h3>
						{/* Creazione del form */}
						<Form
							onSubmit={(event) => {
								event.preventDefault();
								// POST per inserire la prenotazione
								fetch(APIURL, {
									method: 'POST',
									headers: {
										'Content-Type': 'application/json',
									},
									body: JSON.stringify(this.state.booking),
								})
									.then((res) => {
										if (res.ok) {
											console.log(this.state.booking);
											alert('prenotazione salvata');
											// Per svuotare il form basta resettare lo state alla condizione iniziale della costante (Two-Way Data Binding)
											this.setState({
												booking: initialState,
											});
										} else {
											throw new Error(
												'Errore nella prenotazione',
											);
										}
									})
									.catch((err) => {
										console.error(
											'Errore nel salvataggio della prenotazione: ',
											err,
										);
									});
							}}
						>
							{' '}
							{/*Campi del form */}
							{/*Campo name */}
							<Form.Group className='mb-3'>
								<Form.Label>
									Prenotazione a nome di:{' '}
								</Form.Label>
								<Form.Control
									type='text' // input di tipo text
									value={this.state.booking.name} // valore inziale: il valore attuale dello state, cioè vuoto
									onChange={(e) => {
										// Quando il valore dell'input cambia...
										this.setState({
											// ...setta lo stato...
											booking: {
												...this.state.booking, // ...lasciando invariate tutte le proprietà dell'oggetto state...
												name: e.target.value, // ...e modificando soltanto la proprietà name
											},
										});
									}}
									placeholder='Inserisci il nome del titolare della prenotazione'
									required
								/>
							</Form.Group>
							{/*Campo phone */}
							<Form.Group className='mb-3'>
								<Form.Label>Numero di telefono</Form.Label>
								<Form.Control
									type='text'
									value={this.state.booking.phone}
									onChange={(e) => {
										this.setState({
											booking: {
												...this.state.booking,
												phone: e.target.value,
											},
										});
									}}
									placeholder='Inserisci il numero di telefono del titolare della prenotazione'
									required
								/>
							</Form.Group>
							{/*Campo numero ospiti */}
							<Form.Group className='mb-3'>
								<Form.Label>Numero di ospiti</Form.Label>
								<Form.Select
									value={this.state.booking.numberOfPeople}
									onChange={(e) => {
										this.setState({
											booking: {
												...this.state.booking,
												numberOfPeople: e.target.value,
											},
										});
									}}
								>
									<option>1</option>
									<option>2</option>
									<option>3</option>
									<option>4</option>
									<option>5</option>
									<option>6</option>
									<option>7</option>
								</Form.Select>
								<p>
									Per prenotazioni con più di 7 ospiti
									contattaci telefonicamente
								</p>
							</Form.Group>
							{/*Campo fumatori */}
							<Form.Group className='mb-3'>
								<Form.Check
									type='checkbox'
									label='Tavolo fumatori?'
									className='d-flex justify-content-center gap-2'
									checked={this.state.booking.smoking}
									onChange={(e) => {
										this.setState({
											booking: {
												...this.state.booking,
												smoking: e.target.checked,
											},
										});
									}}
								/>
							</Form.Group>
							{/*Campo data */}
							<Form.Group className='mb-3'>
								<Form.Label>
									Data e ora della prenotazione
								</Form.Label>
								<Form.Control
									type='datetime-local'
									required
									value={this.state.booking.dateTime}
									onChange={(e) => {
										const now = new Date().toISOString();
										if (e.target.value < now) {
											alert(
												'Data anteriore alla data odierna',
											);
											e.target.value = '';
											return;
										}
										this.setState({
											booking: {
												...this.state.booking,
												dateTime: e.target.value,
											},
										});
									}}
								/>
							</Form.Group>
							{/*Campo esigenze */}
							<Form.Group className='mb-3'>
								<Form.Label>Richieste particolari</Form.Label>
								<Form.Control
									as='textarea'
									rows={5}
									value={this.state.booking.specialRequests}
									onChange={(e) => {
										this.setState({
											booking: {
												...this.state.booking,
												specialRequests: e.target.value,
											},
										});
									}}
								/>
							</Form.Group>
							{/*Evento submit */}
							<Button variant='primary' type='submit'>
								INVIA
							</Button>
						</Form>
					</Col>
				</Row>
			</Container>
		);
	}
}

export default BookingForm;

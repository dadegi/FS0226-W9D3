import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
	return (
		<Container fluid={true} className='bg-dark text-light'>
			<Row className='justify-content-center mt-3'>
				<Col className='text-center' xs={12} lg={4}></Col>
				<Col className='text-center' xs={12} lg={4}>
					<h4>FS0226IT Restaurant</h4>
				</Col>
				<Col className='text-center' xs={12} lg={4}></Col>
			</Row>
		</Container>
	);
};

export default Footer;

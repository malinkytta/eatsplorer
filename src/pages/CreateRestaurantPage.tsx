import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'

import { Restaurant } from '../types/Restaurant.types'
import { restaurantCol } from '../services/firebase'
import { addDoc } from 'firebase/firestore'
import { getLatLngFromAddress } from '../services/googleMapsAPI'
import CreateRestaurantForm from '../components/CreateRestaurantForm'

const CreateRestaurantPage = () => {
	const onCreate = async (data: Restaurant) => {
		const { lat, lng } = await getLatLngFromAddress(data.address, data.city)

		await addDoc(restaurantCol, {
			...data,
			lat,
			lng,
			isConfirmedByAdmin: false,
		})
		console.log(data)
	}

	return (
		<Container>
			<Row>
				<Col md={{ span: 8, offset: 2 }}>
					<Card className='mt-3' bg='dark' text='white'>
						<Card.Body>
							<Card.Title>Create Restaurant</Card.Title>
							<CreateRestaurantForm onCreate={onCreate} />
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Container>
	)
}

export default CreateRestaurantPage

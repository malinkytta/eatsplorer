import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import Alert from 'react-bootstrap/Alert'

import { Restaurant } from '../types/Restaurant.types'
import { restaurantCol } from '../services/firebase'
import { addDoc } from 'firebase/firestore'
import { getLatLngFromAddress } from '../services/googleMapsAPI'
import CreateRestaurantForm from '../components/CreateRestaurantForm'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FirebaseError } from 'firebase/app'

const CreateRestaurantPage = () => {
	const [success, setSuccess] = useState<boolean | null>(null)

	const navigate = useNavigate()

	const onCreate = async (data: Restaurant) => {
		try {
			const { lat, lng } = await getLatLngFromAddress(
				data.address,
				data.city
			)
			console.log(data)
			setSuccess(true)

			await addDoc(restaurantCol, {
				...data,
				lat,
				lng,
				isConfirmedByAdmin: false,
			})

			navigate('/')
		} catch (error) {
			if (error instanceof FirebaseError) {
				console.error(error.message)
			}
			setSuccess(false)
			console.log(error)
		}
	}

	return (
		<Container className='mb-2'>
			<Row>
				<Col md={{ span: 8, offset: 2 }}>
					<Card className='mt-3' bg='dark' text='white'>
						<Card.Body>
							{success && (
								<Alert variant='success'>
									New restaurant created!
								</Alert>
							)}
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

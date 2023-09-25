import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Modal from 'react-bootstrap/Modal'

import Row from 'react-bootstrap/Row'
import Alert from 'react-bootstrap/Alert'
import { useNavigate, useParams } from 'react-router-dom'
import useGetRestaurant from '../hooks/useGetRestaurant'
import { SubmitHandler } from 'react-hook-form'
import { Restaurant } from '../types/Restaurant.types'
import { doc, updateDoc } from 'firebase/firestore'
import { restaurantCol } from '../services/firebase'
import CreateRestaurantForm from './CreateRestaurantForm'
import { useState } from 'react'

interface IProps {
	show: boolean
	onHide: () => void
}

const EditRestaurant: React.FC<IProps> = ({ show, onHide }) => {
	const [success, setSuccess] = useState<boolean | null>(null)
	const navigate = useNavigate()

	const { id } = useParams()
	const documentId = id as string
	const { data: restaurant } = useGetRestaurant(documentId)

	if (!restaurant) {
		return <p>Data do exist, dont be rude!</p>
	}

	const onFormSubmit: SubmitHandler<Restaurant> = async (
		data: Restaurant
	) => {
		try {
			const docRef = doc(restaurantCol, restaurant._id)
			await updateDoc(docRef, { ...data })
			setSuccess(true)
			navigate('/admin-page#restaurants')
		} catch (error) {
			console.error(error)
			setSuccess(false)
		}
	}

	return (
		<Modal show={show} onHide={onHide}>
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
								<Card.Title>
									Edit restaurant: {restaurant.name}
								</Card.Title>
								<CreateRestaurantForm
									onCreate={onFormSubmit}
									initialValues={restaurant}
								/>
							</Card.Body>
						</Card>
					</Col>
				</Row>
			</Container>
		</Modal>
	)
}

export default EditRestaurant

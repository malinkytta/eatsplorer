import Card from 'react-bootstrap/Card'
import Modal from 'react-bootstrap/Modal'
import Alert from 'react-bootstrap/Alert'
import { useParams } from 'react-router-dom'
import useGetRestaurant from '../hooks/useGetRestaurant'
import { SubmitHandler } from 'react-hook-form'
import { Restaurant } from '../types/Restaurant.types'
import { useState } from 'react'
import EditRestaurantForm from './EditRestaurantForm'
import useUpdateRestaurant from '../hooks/useUpdateRestaurant'

interface IProps {
	show: boolean
	onHide: () => void
}

const EditRestaurant: React.FC<IProps> = ({ show, onHide }) => {
	const [success, setSuccess] = useState<boolean | null>(null)

	const { id } = useParams()
	const documentId = id as string
	const { data: restaurant } = useGetRestaurant(documentId)
	const { updateRestaurant } = useUpdateRestaurant(documentId)

	if (!restaurant) {
		return <p>Data do exist, dont be rude!</p>
	}

	const onFormSubmit: SubmitHandler<Restaurant> = async (
		data: Restaurant
	) => {
		try {
			updateRestaurant(data)
			setSuccess(true)
		} catch (error) {
			console.error(error)
			setSuccess(false)
		}
	}

	return (
		<Modal className='edit-restaurant-modal' show={show} onHide={onHide}>
			{success && (
				<Alert variant='success'>
					Restaurant is successfully updated!
				</Alert>
			)}
			<Card.Title>Edit restaurant: {restaurant.name}</Card.Title>
			<EditRestaurantForm
				onCreate={onFormSubmit}
				initialValues={restaurant}
			/>
		</Modal>
	)
}

export default EditRestaurant

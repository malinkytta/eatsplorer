import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Alert from 'react-bootstrap/Alert'
import { Link, useParams } from 'react-router-dom'
import useGetRestaurant from '../hooks/useGetRestaurant'
import { SubmitHandler } from 'react-hook-form'
import { Restaurant } from '../types/Restaurant.types'
import EditRestaurantForm from './EditRestaurantForm'
import useUpdateRestaurant from '../hooks/useUpdateRestaurant'
import { toast } from 'react-toastify'

interface IProps {
	show: boolean
	onHide: () => void
}

const EditRestaurant: React.FC<IProps> = ({ show, onHide }) => {
	const { id } = useParams()
	const documentId = id as string
	const { data: restaurant } = useGetRestaurant(documentId)
	const { updateRestaurant } = useUpdateRestaurant(documentId)

	if (!restaurant) {
		return (
			<Modal show={show}>
				<Alert
					variant='warning'
					className='d-flex flex-column py-4 px-4 align-items-center'
				>
					<h2>Restaurant Not Found</h2>
					We're sorry, but we couldn't find the restaurant with ID{' '}
					{documentId}.
					<div>
						<Link to={'/'}>
							<Button className='mt-3' variant='dark'>
								Go Back Home
							</Button>
						</Link>
					</div>
				</Alert>
			</Modal>
		)
	}

	const onFormSubmit: SubmitHandler<Restaurant> = async (
		data: Restaurant
	) => {
		try {
			updateRestaurant(data)
			toast('Restaurant information updated and saved!')
		} catch (error) {
			console.error(error)
			toast(
				'An error occurred while updating restaurant information. Please try again.'
			)
		}
	}

	return (
		<Modal className='edit-restaurant-modal' show={show} onHide={onHide}>
			<EditRestaurantForm
				onCreate={onFormSubmit}
				initialValues={restaurant}
			/>
		</Modal>
	)
}

export default EditRestaurant

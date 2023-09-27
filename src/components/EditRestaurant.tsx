import Modal from 'react-bootstrap/Modal'
import { useParams } from 'react-router-dom'
import useGetRestaurant from '../hooks/useGetRestaurant'
import { SubmitHandler } from 'react-hook-form'
import { Restaurant } from '../types/Restaurant.types'
import EditRestaurantForm from './EditRestaurantForm'
import useUpdateRestaurant from '../hooks/useUpdateRestaurant'
import { toast } from 'react-toastify'
import { ErrorModal } from './ErrorModal'
import { ScaleLoader } from 'react-spinners'

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
			<div className='loader'>
				<ScaleLoader color={'#888'} speedMultiplier={1.1} />
			</div>
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

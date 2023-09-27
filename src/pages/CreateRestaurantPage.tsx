import { Restaurant } from '../types/Restaurant.types'
import { restaurantCol } from '../services/firebase'
import { addDoc } from 'firebase/firestore'
import CreateRestaurantForm from '../components/CreateRestaurantForm'
import { useNavigate } from 'react-router-dom'
import { FirebaseError } from 'firebase/app'
import useAuth from '../hooks/useAuth'
import { getLatLng, getGeocode } from 'use-places-autocomplete'
import { toast } from 'react-toastify'

const CreateRestaurantPage = () => {
	const { admin } = useAuth()

	const navigate = useNavigate()

	const onCreate = async (data: Restaurant) => {
		try {
			const { address, city } = data
			const query = `${address}, ${city}`
			const results = await getGeocode({ address: query })
			const { lat, lng } = getLatLng(results[0])

			{
				!admin
					? toast(
							'Success! The restaurant has been submitted for admin review and will be visible once approved.',
							{
								className: 'custom-toast',
							}
					  )
					: toast(
							'Hooray! The restaurant has been created and is available for all to discover.',
							{
								className: 'custom-toast',
							}
					  )
			}

			await addDoc(restaurantCol, {
				...data,
				lat,
				lng,
				isConfirmedByAdmin: admin,
			})

			navigate('/')
		} catch (error) {
			if (error instanceof FirebaseError) {
				console.error(error.message)
				toast.error(error.message, {
					className: 'custom-toast',
				})
			}
			console.log(error)
			toast.error(
				'Oops! Something went wrong while trying to create the restaurant. Please try again later.',
				{
					className: 'custom-toast',
				}
			)
		}
	}

	return (
		<div className='restaurant-page'>
			<CreateRestaurantForm onCreate={onCreate} />
		</div>
	)
}

export default CreateRestaurantPage

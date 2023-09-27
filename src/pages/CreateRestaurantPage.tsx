import Row from 'react-bootstrap/Row'
import Card from 'react-bootstrap/Card'
import Alert from 'react-bootstrap/Alert'

import { Restaurant } from '../types/Restaurant.types'
import { restaurantCol } from '../services/firebase'
import { addDoc } from 'firebase/firestore'
import CreateRestaurantForm from '../components/CreateRestaurantForm'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FirebaseError } from 'firebase/app'
import useAuth from '../hooks/useAuth'
import { getLatLng, getGeocode } from 'use-places-autocomplete'

const CreateRestaurantPage = () => {
	const [success, setSuccess] = useState<boolean | null>(null)
	const { admin } = useAuth()

	const navigate = useNavigate()

	const onCreate = async (data: Restaurant) => {
		try {
			const { address, city } = data
			const query = `${address}, ${city}`
			const results = await getGeocode({ address: query })
			const { lat, lng } = getLatLng(results[0])
			setSuccess(true)

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
			}
			setSuccess(false)
			console.log(error)
		}
	}

	return (
		<div className='restaurant-page'>
			<Row>
				{success && (
					<Alert variant='success'>New restaurant created!</Alert>
				)}
				<CreateRestaurantForm onCreate={onCreate} />
			</Row>
		</div>
	)
}

export default CreateRestaurantPage

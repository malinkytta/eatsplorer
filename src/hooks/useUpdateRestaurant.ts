import { doc, updateDoc } from 'firebase/firestore'
import { useState } from 'react'
import { restaurantCol } from '../services/firebase'
import { Restaurant } from '../types/Restaurant.types'

export const useUpdateRestaurant = (id: string) => {
	const [error, setError] = useState(false)

	const updateRestaurant = async (data: Restaurant) => {
		setError(false)

		try {
			const docRef = doc(restaurantCol, id)
			await updateDoc(docRef, { ...data })
		} catch (err) {
			setError(true)
			console.log(err)
			console.error('Something went wrong when updating the restaurant')
		}
	}
	return {
		updateRestaurant,
		error,
	}
}

export default useUpdateRestaurant

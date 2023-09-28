import { doc, updateDoc } from 'firebase/firestore'
import { restaurantCol } from '../services/firebase'
import { Restaurant } from '../types/Restaurant.types'

export const useUpdateRestaurant = (id: string) => {
	const updateRestaurant = async (data: Restaurant) => {
		try {
			const docRef = doc(restaurantCol, id)
			await updateDoc(docRef, { ...data })
		} catch (err) {
			console.error('Something went wrong when updating the restaurant')
		}
	}

	return {
		updateRestaurant,
	}
}

export default useUpdateRestaurant

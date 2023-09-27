import { deleteDoc, doc } from 'firebase/firestore'
import { useState } from 'react'
import { restaurantCol } from '../services/firebase'

export const useDeleteRestaurant = () => {
	const [error, setError] = useState(false)

	const removeDoc = async (id: string) => {
		setError(false)

		try {
			const docRef = doc(restaurantCol, id)
			await deleteDoc(docRef)
		} catch (err) {
			setError(true)
			console.error('Something went wrong when deleting the document')
		}
	}
	return {
		removeDoc,
		error,
	}
}

export default useDeleteRestaurant

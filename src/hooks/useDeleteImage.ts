import { deleteDoc, doc } from 'firebase/firestore'
import { useState } from 'react'
import { restaurantImageCol } from '../services/firebase'

export const useDeleteImage = () => {
	const [error, setError] = useState(false)

	const removeDoc = async (id: string) => {
		setError(false)

		try {
			const docRef = doc(restaurantImageCol, id)
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

export default useDeleteImage

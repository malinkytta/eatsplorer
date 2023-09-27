import { deleteDoc, doc, updateDoc } from 'firebase/firestore'
import {
	restaurantCol,
	restaurantImageCol,
	storage,
} from '../services/firebase'
import { deleteObject, ref } from 'firebase/storage'

export const useDeleteImage = () => {
	const removeDoc = async (id: string, photoPath: string) => {
		try {
			const docRef = doc(restaurantImageCol, id)
			await deleteDoc(docRef)

			const storageRef = ref(storage, photoPath)
			await deleteObject(storageRef)
		} catch (err) {
			console.error(
				'Something went wrong when deleting the document',
				err
			)
		}
	}

	const removeFromRestaurantDoc = async (documenId: string) => {
		try {
			const docImgRef = doc(restaurantCol, documenId)
			await updateDoc(docImgRef, {
				photo: null,
			})
		} catch (err) {
			console.error(err)
		}
	}

	return {
		removeDoc,
		removeFromRestaurantDoc,
	}
}

export default useDeleteImage

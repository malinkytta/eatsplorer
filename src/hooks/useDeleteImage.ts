import {
	deleteDoc,
	doc,
	getDocs,
	query,
	updateDoc,
	where,
} from 'firebase/firestore'
import {
	restaurantCol,
	restaurantImageCol,
	storage,
} from '../services/firebase'
import { deleteObject, ref } from 'firebase/storage'

export const useDeleteImage = () => {
	const deleteImage = async (id: string, photoPath: string) => {
		try {
			console.log('id från hook', id)
			console.log('path från hook', photoPath)
			//Ta bort bilden från 'restaurant-images'
			const docRef = doc(restaurantImageCol, id)
			await deleteDoc(docRef)
			//Ta bort bilden från Storage
			// const storageRef = ref(storage, photoPath)
			// await deleteObject(storageRef)
		} catch (err) {
			console.error(
				'Something went wrong when deleting the document',
				err
			)
		}
	}

	const deleteImgFromStorage = async (photoPath: string) => {
		try {
			const storageRef = ref(storage, photoPath)
			await deleteObject(storageRef)
		} catch (error) {
			console.error(error)
		}
	}

	const deleteImageFromImgCol = async (id: string) => {
		const queryRef = query(
			restaurantImageCol,
			where('restaurantId', '==', id)
		)

		try {
			const querySnapshot = await getDocs(queryRef)

			if (!querySnapshot.empty) {
				querySnapshot.forEach(async (doc) => {
					await deleteDoc(doc.ref)
					console.log(`Dokument med ID ${doc.id} har tagits bort.`)
				})
				return true
			} else {
				console.log('Inga dokument att ta bort.')
				return false
			}
		} catch (error) {
			console.error('Fel vid borttagning av dokument:', error)
			return false
		}
	}

	// Uppdatera doc 'restaurants' så att kopplingen till photo blir null
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

	// tar bort resturangen från 'restaurants'
	const deleteRestaurant = async (id: string) => {
		try {
			const docRef = doc(restaurantCol, id)
			await deleteDoc(docRef)
		} catch (err) {
			console.error('Something went wrong when deleting the document')
		}
	}

	return {
		deleteImage,
		removeFromRestaurantDoc,
		deleteRestaurant,
		deleteImgFromStorage,
		deleteImageFromImgCol,
	}
}

export default useDeleteImage

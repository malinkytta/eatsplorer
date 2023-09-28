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

export const useDelete = () => {
	//Ta bort bild från collection 'restaurant-image' för radera bild sida
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

	// Ta bort bilden från Storage
	const deleteImgFromStorage = async (photoPath: string) => {
		try {
			const storageRef = ref(storage, photoPath)
			await deleteObject(storageRef)
		} catch (error) {
			console.error(error)
		}
	}

	// Ta bort bilden från collection 'restaurant-image' för radera restaurang
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
				})
				return true
			} else {
				return false
			}
		} catch (error) {
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

export default useDelete

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
import { deleteObject, getDownloadURL, ref } from 'firebase/storage'

export const useDelete = () => {
	//Ta bort bild från collection 'restaurant-image' för radera bild sida
	const deleteImage = async (id: string) => {
		try {
			const docRef = doc(restaurantImageCol, id)
			await deleteDoc(docRef)
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

			await getDownloadURL(storageRef)

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

	// Uppdatera doc 'restaurants' så att kopplingen till photo blir null ändra namn till updatePhotoInRestaurantDoc
	const removeFromRestaurantDoc = async (documentId: string) => {
		try {
			const queryRef = query(
				restaurantImageCol,
				where('restaurantId', '==', documentId)
			)

			const querySnapshot = await getDocs(queryRef)

			if (!querySnapshot.empty) {
				// Url till den första matchande dokument
				const firstImageDoc = querySnapshot.docs[0].data()
				const imageURL = firstImageDoc.url

				const restaurantDocRef = doc(restaurantCol, documentId)
				// Om fler bilder än 1, photo = imageURL annars null
				await updateDoc(restaurantDocRef, {
					photo: querySnapshot.size > 1 ? imageURL : null,
				})
			} else {
				const restaurantDocRef = doc(restaurantCol, documentId)
				await updateDoc(restaurantDocRef, {
					photo: null,
				})
			}
		} catch (error) {
			console.error(error)
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

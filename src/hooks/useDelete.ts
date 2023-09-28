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

	const deleteImgFromStorage = async (photoPath: string) => {
		try {
			const storageRef = ref(storage, photoPath)

			await getDownloadURL(storageRef)

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
				})
				return true
			} else {
				return false
			}
		} catch (error) {
			return false
		}
	}

	const removeFromRestaurantDoc = async (documentId: string) => {
		try {
			const queryRef = query(
				restaurantImageCol,
				where('restaurantId', '==', documentId)
			)

			const querySnapshot = await getDocs(queryRef)

			if (!querySnapshot.empty) {
				const firstImageDoc = querySnapshot.docs[0].data()
				const imageURL = firstImageDoc.url

				const restaurantDocRef = doc(restaurantCol, documentId)
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

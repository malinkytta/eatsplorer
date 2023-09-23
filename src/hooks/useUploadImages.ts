import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { useState } from 'react'
import { v4 } from 'uuid'
import { restaurantImageCol, storage } from '../services/firebase'
import { addDoc } from 'firebase/firestore'
import useAuth from './useAuth'

const useUploadImages = () => {
	const [error, setError] = useState<string | null>(null)
	const [isError, setIsError] = useState<boolean | null>(null)
	const [isSuccess, setIsSuccess] = useState<boolean | null>(null)
	const [isUploading, setIsUploading] = useState<boolean | null>(null)
	const [progress, setProgress] = useState<number | null>(null)

	const { currentUser, admin } = useAuth()

	const upload = async (
		image: File,
		restaurantId: string,
		restaurant: string
	) => {
		setError(null)
		setIsError(null)
		setIsSuccess(null)
		setIsUploading(true)
		setProgress(null)

		try {
			const uuid = v4()

			const ext = image.name.substring(image.name.lastIndexOf('.') + 1)
			const storageFilename = `${uuid}.${ext}`
			const storageRef = ref(
				storage,
				`restaurants/${restaurantId}/${storageFilename}`
			)
			const uploadTask = uploadBytesResumable(storageRef, image)

			uploadTask.on('state_changed', (snapshot) => {
				setProgress(
					Math.round(
						(snapshot.bytesTransferred / snapshot.totalBytes) * 1000
					) / 10
				)
			})

			await uploadTask.then()

			const url = await getDownloadURL(storageRef)

			const colRef = restaurantImageCol

			console.log('restaurant id for image id in doc', restaurantId)

			await addDoc(colRef, {
				_id: restaurantId,
				name: image.name,
				path: storageRef.fullPath,
				size: image.size,
				approved: admin,
				restaurant: restaurant,
				type: image.type,
				uid: currentUser?.uid,
				url: url,
			})

			console.log(' får jag namnet på restaurangen?', restaurant)
			setIsSuccess(true)
			setProgress(null)
		} catch (error) {
			console.log('Something went wrong with the upload', error)
			setIsError(true)
			if (error instanceof Error) {
				setError(error.message)
			} else {
				setError('Error error error!!!')
			}
		} finally {
			setIsUploading(false)
		}
	}

	return {
		error,
		isError,
		isSuccess,
		isUploading,
		progress,
		upload,
	}
}

export default useUploadImages

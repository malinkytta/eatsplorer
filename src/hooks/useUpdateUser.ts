import { doc, updateDoc } from 'firebase/firestore'
import { usersCol } from '../services/firebase'
import { UpdateProfileFormData } from '../types/User.types'

export const useUpdateUser = () => {
	const removeProfilePhoto = async (id: string) => {
		const docRef = doc(usersCol, id)
		await updateDoc(docRef, {
			photoFile: null,
		})
	}

	const updateProfilePhoto = async (id: string, photoURL: string) => {
		const docRef = doc(usersCol, id)

		await updateDoc(docRef, {
			photoFile: photoURL,
		})
	}

	const updateProfile = async (
		id: string,
		photoURL: string | null,
		data: UpdateProfileFormData
	) => {
		const docRef = doc(usersCol, id)

		await updateDoc(docRef, {
			...data,
			photoFile: photoURL,
		})
	}

	return {
		removeProfilePhoto,
		updateProfilePhoto,
		updateProfile,
	}
}

export default useUpdateUser

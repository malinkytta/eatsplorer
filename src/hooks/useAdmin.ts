import {
	restaurantCol,
	restaurantImageCol,
	usersCol,
} from '../services/firebase'
import { doc, updateDoc } from 'firebase/firestore'

export const useAdmin = () => {
	const updateAdmin = async (id: string, admin: boolean) => {
		const docRef = doc(usersCol, id)

		await updateDoc(docRef, {
			isAdmin: !admin,
		})
	}

	const confirmedByAdmin = async (id: string, confirmed: boolean) => {
		const docRef = doc(restaurantCol, id)
		await updateDoc(docRef, {
			isConfirmedByAdmin: !confirmed,
		})
	}

	const approvedByAdmin = async (id: string, approved: boolean) => {
		const docRef = doc(restaurantImageCol, id)

		await updateDoc(docRef, {
			approved: !approved,
		})
	}

	return {
		updateAdmin,
		confirmedByAdmin,
		approvedByAdmin,
	}
}

export default useAdmin

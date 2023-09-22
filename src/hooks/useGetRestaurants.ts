import useStreamCollection from './useStreamCollection'
import { restaurantCol } from '../services/firebase'
import { Restaurant } from '../types/Restaurant.types'
import { where } from 'firebase/firestore'

const useGetRestaurants = () => {
	const data = useStreamCollection<Restaurant>(restaurantCol)

	const getConfirmStatus = (isConfirmedByAdmin: boolean) => {
		return useStreamCollection<Restaurant>(
			restaurantCol,
			where('isConfirmedByAdmin', '==', isConfirmedByAdmin)
		)
	}

	const confirmedByAdminTrue = getConfirmStatus(true)
	const confirmedByAdminFalse = getConfirmStatus(false)

	return {
		data,
		confirmedByAdminTrue,
		confirmedByAdminFalse,
	}
}

export default useGetRestaurants

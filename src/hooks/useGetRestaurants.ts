import useStreamCollection from './useStreamCollection'
import { restaurantCol } from '../services/firebase'
import { Restaurant } from '../types/Restaurant.types'
import { where } from 'firebase/firestore'
// import useGetCollection from './useGetCollection'

const useGetRestaurants = () => {
	return useStreamCollection<Restaurant>(
		restaurantCol,
		where('isConfirmedByAdmin', '==', true)
	)
}

export default useGetRestaurants

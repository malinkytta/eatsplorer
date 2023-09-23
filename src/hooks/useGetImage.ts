import { where } from 'firebase/firestore'
import { restaurantImageCol } from '../services/firebase'
import { RestaurantImage } from '../types/Restaurant.types'
import useStreamCollection from './useStreamCollection'

const useGetImage = (id: string) => {
	return useStreamCollection<RestaurantImage>(
		restaurantImageCol,
		where('_id', '==', id),
		where('approved', '==', true)
	)
}

export default useGetImage

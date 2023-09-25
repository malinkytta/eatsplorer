import { orderBy } from 'firebase/firestore'
import { restaurantImageCol } from '../services/firebase'
import { RestaurantImage } from '../types/Restaurant.types'
import useStreamCollection from './useStreamCollection'

const useGetImages = () => {
	return useStreamCollection<RestaurantImage>(
		restaurantImageCol,
		orderBy('approved'),
		orderBy('restaurant')
	)
}

export default useGetImages

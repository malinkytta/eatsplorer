import { restaurantImageCol } from '../services/firebase'
import { RestaurantImage } from '../types/Restaurant.types'
import useStreamCollection from './useStreamCollection'

const useRestaurantImage = () => {
	return useStreamCollection<RestaurantImage>(restaurantImageCol)
}

export default useRestaurantImage

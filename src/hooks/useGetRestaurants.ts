import useStreamCollection from './useStreamCollection'
import { restaurantCol } from '../services/firebase'
import { Restaurant } from '../types/Restaurants.types'

const useGetRestaurants = () => {
	return useStreamCollection<Restaurant>(restaurantCol)
}

export default useGetRestaurants

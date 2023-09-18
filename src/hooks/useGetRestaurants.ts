import { restaurantCol } from '../services/firebase'
import { Restaurant } from '../types/Restaurant.types'
import useStreamCollection from './useGetCollection'

const useGetRestaurants = () => {
	return useStreamCollection<Restaurant>(restaurantCol)
}

export default useGetRestaurants

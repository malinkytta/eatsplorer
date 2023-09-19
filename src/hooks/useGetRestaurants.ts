import useStreamCollection from './useStreamCollection'
import { restaurantCol } from '../services/firebase'
import { Restaurant } from '../types/Restaurant.types'
// import useGetCollection from './useGetCollection'

const useGetRestaurants = () => {
	return useStreamCollection<Restaurant>(restaurantCol)
}

export default useGetRestaurants

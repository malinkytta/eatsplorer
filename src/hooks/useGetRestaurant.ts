import { restaurantCol } from '../services/firebase'
import { Restaurant } from '../types/Restaurant.types'
import useStreamDocument from './useStreamDocument'

const useGetRestaurant = (documentId: string) => {
	return useStreamDocument<Restaurant>(restaurantCol, documentId)
}

export default useGetRestaurant

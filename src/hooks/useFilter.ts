import { useEffect, useState } from 'react'
import { onSnapshot } from 'firebase/firestore'
import { restaurantCol } from '../services/firebase'
import { UserLocation } from '../types/User.types'
import { calculateDistance } from '../helpers/calulateDistance'
import { Restaurant } from '../types/Restaurant.types'

const useFilter = (
	city: string | null,
	category: string | null,
	offer: string | null,
	userLocation: UserLocation | null
) => {
	const [restaurants, setRestaurants] = useState<Restaurant[]>([])

	useEffect(() => {
		const unsubscribe = onSnapshot(
			restaurantCol,
			(snapshot) => {
				const filteredData = snapshot.docs
					.map((doc) => ({
						...doc.data(),
						_id: doc.id,
					}))
					.filter((restaurant) => {
						let includeRestaurant = true

						if (city && restaurant.city !== city) {
							includeRestaurant = false
						}

						if (category && restaurant.category !== category) {
							includeRestaurant = false
						}

						if (offer && restaurant.offer !== offer) {
							includeRestaurant = false
						}

						return includeRestaurant
					})

				if (filteredData.length === 0) {
					setRestaurants([])
				}

				if (userLocation && filteredData.length > 0) {
					const updatedRestaurants = filteredData.map(
						(restaurant) => {
							const distance = calculateDistance(
								userLocation.lat,
								userLocation.lng,
								restaurant.lat,
								restaurant.lng
							)
							return {
								...restaurant,
								distance: distance,
							}
						}
					)
					setRestaurants(updatedRestaurants)
				} else if (!userLocation && filteredData.length > 0) {
					setRestaurants(filteredData)
				}
			},
			(error) => {
				console.log('ERROR ERROR', error)
			}
		)
		return unsubscribe
	}, [city, category, offer, userLocation])
	return restaurants
}

export default useFilter

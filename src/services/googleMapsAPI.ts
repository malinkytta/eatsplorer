import axios from 'axios'
import { UserLocation } from '../types/User.types'
import { Restaurant } from '../types/Restaurant.types'

// Funktion för att hämta latitud och longitud från en adress
export const getLatLngFromAddress = async (address: string, city: string) => {
	const response = await axios.get(
		'https://maps.googleapis.com/maps/api/geocode/json',
		{
			params: {
				address: address,
				city: city,
				key: import.meta.env.VITE_GEOCODING_API_KEY,
			},
		}
	)

	if (response.data.status === 'OK' && response.data.results.length > 0) {
		const { lat, lng } = response.data.results[0].geometry.location
		return { lat, lng }
	} else {
		throw new Error('Could not find latitude and longitude for adress')
	}
}

export const getDirections = (
	restaurant: Restaurant,
	userLocation: UserLocation
) => {
	if (userLocation) {
		const userLatLng = `${userLocation.lat},${userLocation.lng}`
		const restaurantLatLng = `${restaurant.lat},${restaurant.lng}`

		// Skapa Google Maps URL för vägbeskrivning
		const mapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${userLatLng}&destination=${restaurantLatLng}`

		// Öppna Google Maps i en ny flik
		window.open(mapsUrl, '_blank')
	}
}

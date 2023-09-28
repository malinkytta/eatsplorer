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

export const getCityFromCoordinates = async (lat: number, lng: number) => {
	try {
		const response = await axios.get(
			`https://maps.googleapis.com/maps/api/geocode/json`,
			{
				params: {
					latlng: `${lat},${lng}`,
					key: import.meta.env.VITE_GEOCODING_API_KEY,
				},
			}
		)
		if (response.data.status === 'OK') {
			const results = response.data.results

			if (results.length > 0) {
				for (const result of results) {
					for (const component of result.address_components) {
						if (component.types.includes('postal_town')) {
							const city = component.long_name
							console.log('City:', city)
							return city
						}
					}
				}
				throw new Error('No city found')
			} else {
				throw new Error('No results found')
			}
		} else {
			throw new Error('Geocode error')
		}
	} catch (error) {
		console.error('Geocode error', error)
		return null
	}
}

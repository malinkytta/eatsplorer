import axios from 'axios'

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
		// console.log(lat, lng)
		return { lat, lng }
	} else {
		throw new Error('Could not find latitude and longitude for adress')
	}
}

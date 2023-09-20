import { useEffect, useRef, useState } from 'react'
import { GoogleMap, MarkerF, useLoadScript } from '@react-google-maps/api'
import { Container } from 'react-bootstrap'
import { containerStyle, options, center } from '../MapSettings'
import { Restaurant } from '../types/Restaurant.types'
import { getLatLngFromAddress } from '../services/googleMapsAPI'
interface Iprops {
	restaurants: Restaurant[]
}

const Map: React.FC<Iprops> = ({ restaurants }) => {
	const { isLoaded } = useLoadScript({
		googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
	})
	console.log(restaurants)
	const [restaurantsWithLatLng, setRestaurantsWithLatLng] = useState<
		Restaurant[]
	>([])

	const mapRef = useRef<google.maps.Map | null>(null)
	const onLoad = (map: google.maps.Map) => {
		mapRef.current = map
	}
	const onUnMount = () => {
		mapRef.current = null
	}
	const onMarkerClick = (marker: Restaurant) => {
		console.log(marker)
	}

	useEffect(() => {
		const fetchLatLngForRestaurants = async () => {
			// promise all inväntar att alla restaurangers latitude och longitude ska hämtas
			const updatedRestaurants = await Promise.all(
				restaurants.map(async (restaurant) => {
					try {
						const { lat, lng } = await getLatLngFromAddress(
							restaurant.address,
							restaurant.city
						)
						return { ...restaurant, latLng: { lat, lng } }
					} catch (error) {
						console.error(error)
						return restaurant
					}
				})
			)
			setRestaurantsWithLatLng(updatedRestaurants)
		}

		if (isLoaded) {
			fetchLatLngForRestaurants()
		}
	}, [isLoaded, restaurants])

	if (!isLoaded) return <p>Map not loaded</p>

	return (
		<Container>
			{/* <p>karta!!!!</p> */}
			<GoogleMap
				mapContainerStyle={containerStyle}
				options={options}
				center={center}
				zoom={12}
				onLoad={onLoad}
				onUnmount={onUnMount}
			>
				{restaurantsWithLatLng.length > 0 &&
					restaurantsWithLatLng.map((restaurant) => (
						<>
							<MarkerF
								key={restaurant.lat}
								position={{
									lat: restaurant.lat,
									lng: restaurant.lng,
								}}
								title={restaurant.name}
								onClick={() => onMarkerClick(restaurant)}
							/>
							{console.log(restaurant.lat, restaurant.lng)}
						</>
					))}
			</GoogleMap>
		</Container>
	)
}

export default Map

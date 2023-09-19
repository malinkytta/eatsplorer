import { useEffect, useRef, useState } from 'react'
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api'
import { Container } from 'react-bootstrap'
import { containerStyle, options } from '../MapSettings'
import { Restaurant } from '../types/Restaurant.types'
import { getLatLngFromAddress } from '../services/googleMapsAPI'
import { UserLocation } from '../types/User.types'
interface Iprops {
	restaurants: Restaurant[]
}

const Map: React.FC<Iprops> = ({ restaurants }) => {
	const { isLoaded } = useLoadScript({
		googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
	})
	const [restaurantsWithLatLng, setRestaurantsWithLatLng] = useState<
		Restaurant[]
	>([])
	const [userLocation, setUserLocation] = useState<UserLocation | null>(null)
	console.log('user location state', userLocation)

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

	const getUserLocation = () => {
		navigator.geolocation.getCurrentPosition(
			(position: GeolocationPosition) => {
				const { latitude, longitude } = position.coords
				console.log('My Position', latitude, longitude)
				setUserLocation({
					lat: latitude,
					lng: longitude,
				})
			}
		)
	}

	useEffect(() => {
		const fetchLatLngForRestaurants = async () => {
			// promise all inväntar att alla restaurangers latitude och longitude ska hämtas
			const updatedRestaurants = await Promise.all(
				restaurants.map(async (restaurant) => {
					try {
						const { lat, lng } = await getLatLngFromAddress(
							restaurant.address
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
			getUserLocation()
		}
	}, [isLoaded, restaurants])

	if (!isLoaded) return <p>Map not loaded</p>
	if (!userLocation) return <p>User dont have location lol</p>

	return (
		<Container>
			<GoogleMap
				mapContainerStyle={containerStyle}
				options={options}
				center={userLocation}
				zoom={13}
				onLoad={onLoad}
				onUnmount={onUnMount}
			>
				{restaurantsWithLatLng.length > 0 &&
					restaurantsWithLatLng.map((restaurant) => (
						<>
							<Marker
								key={restaurant.latLng.lat}
								position={restaurant.latLng}
								onClick={() => onMarkerClick(restaurant)}
							/>
							{console.log(restaurant.latLng)}
						</>
					))}
				{/* userlocation  */}
				<Marker key={userLocation.lat} position={userLocation} />
			</GoogleMap>
		</Container>
	)
}

export default Map

import { useEffect, useRef, useState } from 'react'
import {
	GoogleMap,
	MarkerF,
	useLoadScript,
	Autocomplete,
} from '@react-google-maps/api'
import { Container } from 'react-bootstrap'
import { containerStyle, options } from '../MapSettings'
import { Restaurant } from '../types/Restaurant.types'
// import { getGeocode, getLatLng } from 'use-places-autocomplete'
// import { getLatLngFromAddress } from '../services/googleMapsAPI'
import { UserLocation } from '../types/User.types'
import { Places } from '../../googleMapsConfig'
import { useSearchParams } from 'react-router-dom'
interface Iprops {
	restaurants: Restaurant[]
}

const Map: React.FC<Iprops> = ({ restaurants }) => {
	const { isLoaded } = useLoadScript({
		googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
		libraries: Places,
	})

	const [userLocation, setUserLocation] = useState<UserLocation | null>(null)
	const [searchedLocation, setSearchedLocation] =
		useState<UserLocation | null>(null)
	const [searchParams, setSearchParams] = useSearchParams()

	const mapRef = useRef<google.maps.Map | null>(null)
	const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null)
	const onLoad = (map: google.maps.Map) => {
		mapRef.current = map
	}
	const onUnMount = () => {
		mapRef.current = null
	}
	const onMarkerClick = (marker: Restaurant) => {
		console.log(marker)
	}

	const onLoadAutoComplete = (
		autocomplete: google.maps.places.Autocomplete
	) => {
		autocompleteRef.current = autocomplete
	}
	const handlePlaceChanged = () => {
		const searchedLocation = autocompleteRef.current?.getPlace()

		if (searchedLocation) {
			const { geometry, name } = searchedLocation

			console.log('geometry location', geometry?.location)
			setSearchParams({
				lat: String(geometry?.location?.lat()),
				lng: String(geometry?.location?.lng()),
				q: name ? name : '',
			})
			// const bounds = new window.google.maps.LatLngBounds()

			// if (geometry?.viewport) {
			// 	bounds.union(geometry.viewport)
			// } else {
			// 	bounds.extend(geometry?.location ?? { lat: 0, lng: 0 })
			// }

			// mapRef.current?.fitBounds(bounds)
		}
	}

	useEffect(() => {
		const getUserLocation = () => {
			navigator.geolocation.getCurrentPosition(
				(position: GeolocationPosition) => {
					const { latitude, longitude } = position.coords
					setUserLocation({
						lat: latitude,
						lng: longitude,
					})
				}
			)
		}
		getUserLocation()
		const latParam = searchParams.get('lat')
		const lngParam = searchParams.get('lng')

		if (latParam && lngParam) {
			const lat = parseFloat(latParam)
			const lng = parseFloat(lngParam)
			setSearchedLocation({ lat, lng })
		}
	}, [searchParams])

	if (!isLoaded || !userLocation || restaurants.length === 0)
		return <p>Loading....</p>

	return (
		<Container>
			<GoogleMap
				mapContainerStyle={containerStyle}
				options={options}
				center={searchedLocation ? searchedLocation : userLocation}
				zoom={12}
				onLoad={onLoad}
				onUnmount={onUnMount}
			>
				<Autocomplete
					onLoad={onLoadAutoComplete}
					onPlaceChanged={handlePlaceChanged}
				>
					<input
						type='text'
						placeholder='Search Location'
						className='search-input'
					/>
				</Autocomplete>
				{restaurants.map((restaurant) => (
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
				{userLocation && (
					<MarkerF
						key={userLocation.lng}
						position={userLocation}
						icon='https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png'
						title='Your Location'
					/>
				)}
				{searchedLocation && (
					<MarkerF
						key={searchedLocation.lat}
						position={searchedLocation}
						icon='https://cdn.jsdelivr.net/gh/pointhi/leaflet-color-markers@master/img/marker-icon-green.png'
						title='Searched Location'
					/>
				)}
			</GoogleMap>
		</Container>
	)
}

export default Map

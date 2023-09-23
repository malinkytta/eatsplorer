/* eslint-disable no-mixed-spaces-and-tabs */
import { useEffect, useRef, useState } from 'react'
import {
	GoogleMap,
	MarkerF,
	useLoadScript,
	Autocomplete,
} from '@react-google-maps/api'
import Button from 'react-bootstrap/Button'
import { containerStyle, options } from '../MapSettings'
import { Restaurant } from '../types/Restaurant.types'
import { UserLocation } from '../types/User.types'
import { Places } from '../../googleMapsConfig'
import { useSearchParams } from 'react-router-dom'
import OffcanvasComponent from './OffcanvasComponent'

import BeerIcon from '../assets/images/beer-27-128.png'
import RestaurantImg from '../assets/images/restaurant-building.png'
import Bakery from '../assets/images/muffin.png'

import Cafe from '../assets/images/coffee-cup.png'
import FastfoodIcon from '../assets/images/burger.png'
import { calculateDistance } from '../helpers/calulateDistance'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUtensils } from '@fortawesome/free-solid-svg-icons'

interface Iprops {
	restaurants: Restaurant[]
}

const Map: React.FC<Iprops> = ({ restaurants }) => {
	const [show, setShow] = useState(false)
	const handleClose = () => setShow(false)
	const handleShow = () => setShow(true)
	const toggleShow = () => setShow(!show)

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
	const onMarkerClick = (restaurant: Restaurant) => {
		if (userLocation) {
			const userLatLng = `${userLocation.lat},${userLocation.lng}`
			const restaurantLatLng = `${restaurant.lat},${restaurant.lng}`

			// Skapa Google Maps URL för vägbeskrivning
			const mapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${userLatLng}&destination=${restaurantLatLng}`

			// Öppna Google Maps i en ny flik
			window.open(mapsUrl, '_blank')
		}
		console.log(restaurant)
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
		}
	}

	// Beräkna avstånden och uppdatera restaurangobjekten med avstånd om userLocation finns
	const updatedRestaurants = userLocation
		? restaurants.map((restaurant) => {
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
		  })
		: restaurants
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

	const defaultLatitude = 55.60704137913798
	const defaultLongitude = 13.02105927994256

	if (!isLoaded || restaurants.length === 0) return <p>Loading....</p>

	if (!updatedRestaurants) return <p>waiting for distance</p>

	return (
		<>
			<OffcanvasComponent
				show={show}
				handleClose={handleClose}
				handleShow={handleShow}
				restaurants={updatedRestaurants}
			/>

			<GoogleMap
				mapContainerStyle={containerStyle}
				options={options}
				center={
					searchedLocation
						? {
								lat: searchedLocation.lat,
								lng: searchedLocation.lng,
						  }
						: userLocation
						? {
								lat: userLocation.lat,
								lng: userLocation.lng,
						  }
						: {
								lat: defaultLatitude,
								lng: defaultLongitude,
						  }
				}
				zoom={12}
				onLoad={onLoad}
				onUnmount={onUnMount}
			>
				<Autocomplete
					onLoad={onLoadAutoComplete}
					onPlaceChanged={handlePlaceChanged}
				>
					<div className='search-input'>
						<Button
							variant='transparent'
							onClick={toggleShow}
							className='map-btn'
						>
							<FontAwesomeIcon icon={faUtensils} />
						</Button>
						<input
							type='text'
							placeholder='Search Location'
							// className='search-input'
						/>
					</div>
				</Autocomplete>
				{updatedRestaurants.map((restaurant) => (
					<MarkerF
						key={restaurant._id}
						title={restaurant.name}
						position={{
							lat: restaurant.lat,
							lng: restaurant.lng,
						}}
						icon={
							restaurant.category === 'Pub'
								? {
										url: BeerIcon,
										scaledSize: new window.google.maps.Size(
											50,
											50
										),
								  }
								: restaurant.category === 'Fast-food'
								? {
										url: FastfoodIcon,
										scaledSize: new window.google.maps.Size(
											30,
											30
										),
								  }
								: restaurant.category === 'Café'
								? {
										url: Cafe,
										scaledSize: new window.google.maps.Size(
											40,
											40
										),
								  }
								: restaurant.category === 'Restaurant'
								? {
										url: RestaurantImg,
										scaledSize: new window.google.maps.Size(
											40,
											40
										),
								  }
								: restaurant.category === 'Bakery'
								? {
										url: Bakery,
										scaledSize: new window.google.maps.Size(
											40,
											40
										),
								  }
								: undefined
						}
						onClick={() => onMarkerClick(restaurant)}
					/>
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
		</>
	)
}

export default Map

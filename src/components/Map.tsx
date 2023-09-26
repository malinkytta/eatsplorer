/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-mixed-spaces-and-tabs */
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { GoogleMap, MarkerF } from '@react-google-maps/api'
import { center, containerStyle, options } from '../MapSettings'
import { Restaurant } from '../types/Restaurant.types'
import OffcanvasComponent from './OffcanvasComponent'
import BeerIcon from '../assets/images/beer-27-128.png'
import useGetUserLocation from '../hooks/useGetUserLocation'
import { getDirections } from '../services/googleMapsAPI'
import { LatLngCity } from '../types/Location.types'
import useGetRestaurants from '../hooks/useGetRestaurants'
import { useSearchParams } from 'react-router-dom'
import usePlacesAutocomplete, {
	getGeocode,
	getLatLng,
} from 'use-places-autocomplete'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faUtensils,
	faBars,
	faSearch,
	faLocationArrow,
} from '@fortawesome/free-solid-svg-icons'
import { restaurantCol } from '../services/firebase'
import { onSnapshot, query, where } from 'firebase/firestore'
import Button from 'react-bootstrap/Button'

const Map: React.FC = () => {
	const [searchParams, setSearchParams] = useSearchParams()
	const city = searchParams.get('city')
	const lat = searchParams.get('lat')
	const lng = searchParams.get('lng')
	const position = {
		latitude: lat ? Number(lat) : 55.60700496304167,
		longitude: lng ? Number(lng) : 13.021011006455181,
	}
	const {
		ready,
		value,
		suggestions: { status, data },
		setValue,
		clearSuggestions,
	} = usePlacesAutocomplete()

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [_location, setLocation] = useState<LatLngCity | null>(null)
	const { data: confirmedRestaurants, loading: confirmedLoading } =
		useGetRestaurants()
	// const { data: restaurantsCity, loading: cityLoading } =
	// 	useGetRestaurantsByCity(city ?? '')
	const [show, setShow] = useState(true)
	const handleClose = () => setShow(false)
	const toggleClose = () => setShow(!show)
	const { userLocation } = useGetUserLocation()
	const [restaurants, setRestaurants] = useState<Restaurant[]>()
	const mapRef = useRef<google.maps.Map | null>(null)
	const onLoad = (map: google.maps.Map) => {
		mapRef.current = map
	}
	const onUnMount = () => {
		mapRef.current = null
	}

	useEffect(() => {
		if (!city && confirmedRestaurants) {
			setRestaurants(confirmedRestaurants)
		}
	}, [confirmedRestaurants])

	useEffect(() => {
		const queryRef = query(
			restaurantCol,
			where('isConfirmedByAdmin', '==', true),
			where('city', '==', city)
		)
		const unsubscribe = onSnapshot(
			queryRef,
			(snapshot) => {
				const data: Restaurant[] = snapshot.docs.map((doc) => {
					return {
						...doc.data(),
						_id: doc.id,
					}
				})
				setRestaurants(data)
			},
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			(error) => {
				console.log('ERROR ERROR', error)
			}
		)
		return unsubscribe
	}, [city])

	const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
		console.log(value)
		setValue(e.target.value)
	}

	const handleSelect = (description: string) => async () => {
		setValue(description)
		clearSuggestions()
		const searchedLocation = description.split(',')[0].trim()
		const results = await getGeocode({ address: description })
		const { lat, lng } = getLatLng(results[0])
		setLocation({ lat, lng, city: searchedLocation })
		setSearchParams({
			lat: String(lat),
			lng: String(lng),
			city: searchedLocation,
		})
	}

	const renderSuggestions = () =>
		data.map((suggestion) => {
			const {
				place_id,
				structured_formatting: { main_text, secondary_text },
			} = suggestion

			return (
				<li
					key={place_id}
					onClick={handleSelect(suggestion.description)}
				>
					<span>{main_text}</span> <span>{secondary_text}</span>
				</li>
			)
		})

	return (
		<>
			{restaurants && (
				<OffcanvasComponent
					show={show}
					handleClose={handleClose}
					restaurants={restaurants}
				/>
			)}
			<GoogleMap
				mapContainerStyle={containerStyle}
				options={options}
				center={
					position
						? {
								lat: position.latitude,
								lng: position.longitude,
						  }
						: center
				}
				zoom={12}
				onLoad={onLoad}
				onUnmount={onUnMount}
			>
				{/* känns som magi 🪄*/}
				<div>
					{/* {userLocation && (
						<Button
							className='my-position-btn'
							variant='light'
							onClick={() => {
								if (mapRef.current) {
									mapRef.current.panTo({
										lat: userLocation.lat,
										lng: userLocation.lng,
									})
								}
							}}
						>
							Go to my position
						</Button>
					)} */}

					<div className='search-input'>
						<Button variant='transparent'>
							<FontAwesomeIcon icon={faBars} />
						</Button>

						<Button
							variant='transparent'
							onClick={() => {
								if (userLocation && mapRef.current) {
									mapRef.current.panTo({
										lat: userLocation.lat,
										lng: userLocation.lng,
									})
								}
							}}
						>
							<FontAwesomeIcon icon={faLocationArrow} />
						</Button>

						<Button onClick={toggleClose} variant='transparent'>
							<FontAwesomeIcon icon={faUtensils} />
						</Button>
						<input
							value={value}
							onChange={handleInput}
							disabled={!ready}
							placeholder='Where are you going?'
							// className='search-input'
						/>
						<Button variant='transparent' className='search-btn'>
							<FontAwesomeIcon icon={faSearch} />
						</Button>
					</div>
					{status === 'OK' && (
						<ul className='suggestions'>{renderSuggestions()}</ul>
					)}
				</div>
				{restaurants &&
					restaurants.map((restaurant) => (
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
											scaledSize:
												new window.google.maps.Size(
													50,
													50
												),
									  }
									: undefined
							}
							onClick={() =>
								getDirections(restaurant, userLocation!)
							}
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
				{position && (
					<MarkerF
						position={{
							lat: position.latitude,
							lng: position.longitude,
						}}
						icon='https://cdn.jsdelivr.net/gh/pointhi/leaflet-color-markers@master/img/marker-icon-green.png'
						title='Searched Location'
					/>
				)}
			</GoogleMap>
		</>
	)
}

export default Map

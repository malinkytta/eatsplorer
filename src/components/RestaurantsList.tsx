import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'
import RestaurantImg from '../assets/images/jason-leung-poI7DelFiVA-unsplash.jpg'

import { Restaurant } from '../types/Restaurant.types'
import { UserLocation } from '../types/User.types'
import { useEffect, useState } from 'react'

interface IProps {
	data: Restaurant[]
}
const RestaurantsList: React.FC<IProps> = ({ data }) => {
	const [userLocation, setUserLocation] = useState<UserLocation | null>(null)

	const onMarkerClick = (restaurant: Restaurant) => {
		console.log(restaurant)
		if (userLocation) {
			const userLatLng = `${userLocation.lat},${userLocation.lng}`
			const restaurantLatLng = `${restaurant.lat},${restaurant.lng}`

			const mapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${userLatLng}&destination=${restaurantLatLng}`

			window.open(mapsUrl, '_blank')
		} else {
			alert('Where are you?')
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
	}, [])

	return (
		<>
			{data.map((restaurant) => (
				<Card
					key={restaurant.name}
					className='d-flex flex-row restaurants-card'
				>
					<Image
						fluid
						className='restaurant-img w-50'
						src={RestaurantImg}
					/>
					<Card.Body>
						<Card.Title>{restaurant.name}</Card.Title>
						<Card.Text>
							{restaurant.address}, {restaurant.city}
						</Card.Text>
						<Card.Text>
							{restaurant.distance
								? restaurant.distance.toFixed(2) + 'km'
								: ''}
						</Card.Text>
						<Button variant='dark' href={`/${restaurant._id}`}>
							More Information
						</Button>
						<Button
							variant='outline-light'
							onClick={() => onMarkerClick(restaurant)}
						>
							Get Directions
						</Button>
					</Card.Body>
				</Card>
			))}
		</>
	)
}

export default RestaurantsList

import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faLocationArrow,
	faCircleInfo,
	faRoute,
} from '@fortawesome/free-solid-svg-icons'
import { Restaurant } from '../types/Restaurant.types'
import { UserLocation } from '../types/User.types'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

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
					key={restaurant._id}
					className='d-flex flex-row slider-restaurant-card'
				>
					<Image
						className='restaurant-img'
						src={
							restaurant.photo ||
							'https://placehold.co/100x100?text=Restaurant+Image'
						}
						alt='Restaurant'
					/>

					<Card.Body className='restaurant-card-body'>
						<Card.Title>{restaurant.name}</Card.Title>
						<Card.Text className='distance-text'>
							<FontAwesomeIcon icon={faRoute} />{' '}
							{restaurant.distance
								? restaurant.distance.toFixed(2) + ' km away'
								: ''}
						</Card.Text>

						<Card.Text>
							{restaurant.address}, {restaurant.city}
						</Card.Text>

						<div className='restaurant-icons'>
							<Link to={`/${restaurant._id}`}>
								<Button variant='transparent'>
									<FontAwesomeIcon icon={faCircleInfo} />
								</Button>
							</Link>
							<Button
								variant='transparent'
								onClick={() => onMarkerClick(restaurant)}
							>
								<FontAwesomeIcon icon={faLocationArrow} />
							</Button>
							{/* {restaurant.facebook && (
								<Link to={`/${restaurant.facebook}`}>
									<Button variant='transparent'>
										<FaFacebook />
									</Button>
								</Link>
							)}
							{restaurant.instagram && (
								<Link to={`/${restaurant.instagram}`}>
									<Button variant='transparent'>
										<FaInstagram />
									</Button>
								</Link>
							)} */}
						</div>
					</Card.Body>
				</Card>
			))}
		</>
	)
}

export default RestaurantsList

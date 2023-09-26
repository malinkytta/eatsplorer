import { useEffect, useState } from 'react'
import { UserLocation } from '../types/User.types'

const useGetUserLocation = () => {
	const [userLocation, setUserLocation] = useState<UserLocation | null>(null)

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
	useEffect(() => {
		getUserLocation()
	}, [])
	return {
		userLocation,
	}
}

export default useGetUserLocation

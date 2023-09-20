import React from 'react'
import useGetRestaurants from '../hooks/useGetRestaurants'
import Map from '../components/Map'

const HomePage = () => {
	const { data: restaurants } = useGetRestaurants()
	// const { isLoaded } = useLoadScript({
	// 	googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
	// })
	if (!restaurants) return <p>No restaurants for u m8</p>

	return (
		<>
			<h1>hej!!</h1>

			<Map restaurants={restaurants} />
		</>
	)
}

export default HomePage

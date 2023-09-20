import useGetRestaurants from '../hooks/useGetRestaurants'
import Map from '../components/Map'

const HomePage = () => {
	const { data: restaurants } = useGetRestaurants()
	if (!restaurants) return <p>No restaurants for u m8</p>
	return (
		<>
			<h1>hej!!</h1>
			<Map restaurants={restaurants} />
		</>
	)
}

export default HomePage

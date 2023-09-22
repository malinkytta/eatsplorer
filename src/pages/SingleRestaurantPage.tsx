import useGetRestaurant from '../hooks/useGetRestaurant'
import { useParams } from 'react-router-dom'

const SingleRestaurantPage = () => {
	const { id } = useParams()

	const documentId = id as string

	const { data: restaurant } = useGetRestaurant(documentId)

	if (!restaurant) {
		return <p>Loading....</p>
	}
	return (
		<>
			<div>{restaurant.name}</div>
		</>
	)
}

export default SingleRestaurantPage

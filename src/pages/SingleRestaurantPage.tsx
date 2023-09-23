import UploadImages from '../components/UploadImages'
import useGetRestaurant from '../hooks/useGetRestaurant'
import { useParams } from 'react-router-dom'
import Image from 'react-bootstrap/Image'
import useGetImage from '../hooks/useGetImage'

const SingleRestaurantPage = () => {
	const { id } = useParams()

	const documentId = id as string

	const { data } = useGetRestaurant(documentId)
	const { data: image } = useGetImage(documentId)

	console.log(image)
	if (!data || !image) {
		return <p>Loading...!!!.</p>
	}

	return (
		<>
			<div>{data.name}</div>
			<p>Alla bilder i listan</p>
			{image && image.map((image) => <Image src={image.url} />)}

			<p>Första bilden i listan</p>
			{image && image.length > 0 && <Image src={image[0].url} />}

			<UploadImages restaurantId={documentId} restaurant={data.name} />
		</>
	)
}

export default SingleRestaurantPage

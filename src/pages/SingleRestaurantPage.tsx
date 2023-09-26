import UploadImages from '../components/UploadImages'
import useGetRestaurant from '../hooks/useGetRestaurant'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import Col from 'react-bootstrap/Col'

import useGetImage from '../hooks/useGetImage'
import { useEffect, useState } from 'react'
import EditRestaurant from '../components/EditRestaurant'
import { SingleRestaurantComponent } from '../components/SingleRestaurantComponent'

const SingleRestaurantPage = () => {
	const [show, setShow] = useState(false)
	const navigate = useNavigate()
	const [searchParams] = useSearchParams()

	const { id } = useParams()
	const documentId = id as string

	const { data } = useGetRestaurant(documentId)
	const { data: image } = useGetImage(documentId)

	useEffect(() => {
		const openModalParam = searchParams.get('openModal')

		if (openModalParam === 'true') {
			setShow(true)
		} else {
			setShow(false)
		}
	}, [searchParams])

	const handleHide = () => {
		setShow(false)
		navigate(`/${documentId}`)
	}
	if (!data || !image) {
		return <p>Loading...</p>
	}

	return (
		<>
			<EditRestaurant show={show} onHide={handleHide} />
			<SingleRestaurantComponent data={data} image={image} />

			<Col sm={10} className='mx-auto'>
				<UploadImages
					restaurantId={documentId}
					restaurant={data.name}
				/>
			</Col>
		</>
	)
}

export default SingleRestaurantPage

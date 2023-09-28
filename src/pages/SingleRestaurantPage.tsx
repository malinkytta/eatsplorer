import UploadImages from '../components/UploadImages'
import useGetRestaurant from '../hooks/useGetRestaurant'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import Col from 'react-bootstrap/Col'
import useGetImage from '../hooks/useGetImage'
import { useEffect, useState } from 'react'
import EditRestaurant from '../components/EditRestaurant'
import { SingleRestaurantComponent } from '../components/SingleRestaurantComponent'
import { ScaleLoader } from 'react-spinners'
import { ErrorModal } from '../components/ErrorModal'

const SingleRestaurantPage = () => {
	const [show, setShow] = useState(false)
	const navigate = useNavigate()
	const [searchParams] = useSearchParams()

	const { id } = useParams()
	const documentId = id as string

	const { data, loading } = useGetRestaurant(documentId)
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
		navigate(`/restaurant/${documentId}`)
	}

	if (loading) {
		return (
			<div className='loader'>
				<ScaleLoader color={'#888'} speedMultiplier={1.1} />
			</div>
		)
	}
	if (!data || !image) {
		return (
			<ErrorModal>
				<h2>No data found</h2>
			</ErrorModal>
		)
	}

	return (
		<div
			className='background-restaurant'
			style={{
				backgroundImage: data.photo ? `url(${data.photo})` : '',
			}}
		>
			<div className='blur'>
				<EditRestaurant show={show} onHide={handleHide} />
				<SingleRestaurantComponent data={data} image={image} />

				<Col sm={10} className='mx-auto'>
					<UploadImages
						restaurantId={documentId}
						restaurant={data.name}
					/>
				</Col>
			</div>
		</div>
	)
}

export default SingleRestaurantPage

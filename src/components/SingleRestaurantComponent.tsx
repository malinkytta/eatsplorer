import Image from 'react-bootstrap/Image'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import Button from 'react-bootstrap/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGlobe, faRoute } from '@fortawesome/free-solid-svg-icons'
import { FaFacebook, FaInstagram } from 'react-icons/fa'
import { Restaurant, RestaurantImage } from '../types/Restaurant.types'

interface IProps {
	data: Restaurant
	image: RestaurantImage[]
}

export const SingleRestaurantComponent: React.FC<IProps> = ({
	data,
	image,
}) => {
	return (
		<Row className='d-flex align-items-center justify-content-center mx-auto'>
			<Col xs={12} md={6} className='restaurant-col'>
				<Card className='single-restaurant-card'>
					<Card.Body className='d-flex flex-column justify-content-center align-items-center'>
						<h2>{data.name}</h2>

						<Row
							className='py-3 d-flex justify-content-center'
							style={{ padding: '0 20px' }}
						>
							<Col xs={5}>
								<p>Address:</p>
								<p>Description:</p>
								<p>Category:</p>
								<p>Offer:</p>
								<p>Phone:</p>
								<p>Email:</p>
							</Col>
							<Col xs={7}>
								<p>
									{data.address}, {data.city}
								</p>
								<p>{data.description}</p>
								<p>{data.category}</p>
								<p>{data.offer}</p>
								<p>{data.phone}</p>
								<p>{data.email}</p>
							</Col>
						</Row>
						{data.distance && (
							<Card.Text className='distance-text'>
								<>
									<FontAwesomeIcon icon={faRoute} />
									data.distance.toFixed(2) + ' km away'
								</>
							</Card.Text>
						)}
						{data.website && (
							<a
								href={data.website}
								target='_blank'
								rel='noopener noreferrer'
							>
								<Button variant='transparent'>
									<FaFacebook />
								</Button>
							</a>
						)}
						{data.facebook && (
							<a
								href={data.facebook}
								target='_blank'
								rel='noopener noreferrer'
							>
								<Button variant='transparent'>
									<FontAwesomeIcon icon={faGlobe} />{' '}
								</Button>
							</a>
						)}
						{data.instagram && (
							<a
								href={data.instagram}
								target='_blank'
								rel='noopener noreferrer'
							>
								<Button variant='transparent'>
									<FaInstagram />
								</Button>
							</a>
						)}
					</Card.Body>
				</Card>
			</Col>
			<Col xs={11} md={6} className='restaurant-col'>
				<Card className='single-restaurant-card'>
					{image.length ? (
						<Image className='restaurant-img' src={image[0].url} />
					) : (
						<Image
							fluid
							className='restaurant-img'
							src='https://placehold.co/600x360?text=No+Image+Available'
						/>
					)}
				</Card>
			</Col>
			{image.length > 0 && (
				<Col xs={12} className='d-flex restaurant-img-slider'>
					{image.map((image) => (
						<Col key={image._id} xs={10} sm={6} md={4} lg={3}>
							<img
								className='restaurant-img'
								src={image.url}
								alt={image.restaurant}
							/>
						</Col>
					))}
				</Col>
			)}
		</Row>
	)
}

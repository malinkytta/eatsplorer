import Image from 'react-bootstrap/Image'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import Button from 'react-bootstrap/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGlobe, faRoute } from '@fortawesome/free-solid-svg-icons'
import { FaFacebook, FaInstagram } from 'react-icons/fa'
import { Restaurant, RestaurantImage } from '../types/Restaurant.types'
import { Link } from 'react-router-dom'

interface IProps {
	data: Restaurant
	image: RestaurantImage[]
}

export const SingleRestaurantComponent: React.FC<IProps> = ({
	data,
	image,
}) => {
	return (
		<Row className='d-flex align-items-center justify-content-center'>
			<Col sm={10} md={5}>
				<Card className='single-restaurant-card'>
					<Card.Body>
						<Card.Title>{data.name}</Card.Title>
						<Card.Text>
							<span>Adress:</span> {data.address}, {data.city}
						</Card.Text>
						<Card.Text>
							<span>Description</span> {data.description}
						</Card.Text>
						<Card.Text>
							<span>Category</span> {data.category}
						</Card.Text>
						<Card.Text>
							<span>Offer</span> {data.offer}
						</Card.Text>
						<Card.Text className='distance-text'>
							{data.distance && (
								<>
									<FontAwesomeIcon icon={faRoute} />
									data.distance.toFixed(2) + ' km away'
								</>
							)}
						</Card.Text>

						{data.website && (
							<Link to={`/${data.website}`}>
								<Button variant='transparent'>
									<FaFacebook />
								</Button>
							</Link>
						)}
						{data.facebook && (
							<Link to={`/${data.facebook}`}>
								<Button variant='transparent'>
									<FontAwesomeIcon icon={faGlobe} />{' '}
								</Button>
							</Link>
						)}
						{data.instagram && (
							<Link to={`/${data.instagram}`}>
								<Button variant='transparent'>
									<FaInstagram />
								</Button>
							</Link>
						)}
					</Card.Body>
				</Card>
			</Col>
			<Col sm={10} md={5}>
				<Card className='single-restaurant-card'>
					{image.length ? (
						<Image className='restaurant-img' src={image[0].url} />
					) : (
						<Image
							fluid
							src='https://placehold.co/?text=Restaurant+Image'
						/>
					)}
				</Card>
			</Col>
			{image.length > 0 && (
				<Col sm={12} className='d-flex restaurant-img-slider'>
					{image.map((image) => (
						<Col key={image._id} xs={12} sm={6} md={4} lg={3}>
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

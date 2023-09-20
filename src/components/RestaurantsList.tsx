import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Card from 'react-bootstrap/Card'
import Image from 'react-bootstrap/Image'
import RestaurantImg from '../assets/images/jason-leung-poI7DelFiVA-unsplash.jpg'

import { Restaurant } from '../types/Restaurant.types'

interface IProps {
	data: Restaurant[]
}
const RestaurantsList: React.FC<IProps> = ({ data }) => {
	return (
		<Row xs={1} className='g-2'>
			{/* <h2>Restaurants</h2> */}
			{data.map((restaurant) => (
				<Col key={restaurant._id}>
					<Card className='d-flex flex-row restaurants-card'>
						<Image
							fluid
							className='restaurant-img w-50'
							// src='https://placehold.co/100x100'
							src={RestaurantImg}
							// width={150}
						/>
						<Card.Body>
							<Card.Title>{restaurant.name}</Card.Title>
							<Card.Text>
								{restaurant.address}, {restaurant.city}
							</Card.Text>
							<Card.Text>
								<a href=''>More information</a>
							</Card.Text>
							<Card.Text>
								<a href=''>Get directions</a>
							</Card.Text>
						</Card.Body>
					</Card>
				</Col>
			))}
		</Row>
	)
}

export default RestaurantsList

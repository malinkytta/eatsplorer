import React from 'react'
import Row from 'react-bootstrap/Row'

import RestaurantsList from './RestaurantsList'
import { Restaurant } from '../types/Restaurant.types'

interface IProps {
	data: Restaurant[]
}

const MobileCarousel: React.FC<IProps> = ({ data }) => {
	return (
		<>
			<Row className=' mobile-carousel flex-nowrap d-sm-none'>
				<RestaurantsList data={data} />
			</Row>
		</>
	)
}

export default MobileCarousel

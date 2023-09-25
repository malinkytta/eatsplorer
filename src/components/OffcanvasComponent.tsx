import React from 'react'
import Offcanvas from 'react-bootstrap/Offcanvas'
import Row from 'react-bootstrap/Row'
import RestaurantsList from './RestaurantsList'
import { Restaurant } from '../types/Restaurant.types'
import MobileCarousel from './MobileCarousel'

interface IProps {
	handleClose: () => void
	show: boolean
	restaurants: Restaurant[]
}

const OffcanvasComponent: React.FC<IProps> = ({
	show,
	handleClose,
	restaurants,
}) => {
	return (
		<>
			<Offcanvas
				data-bs-theme='dark'
				show={show}
				onHide={handleClose}
				scroll
				backdrop={false}
				className='custom-offcanvas d-none d-sm-flex'
			>
				<Offcanvas.Header closeButton>
					<Offcanvas.Title>Restaurants</Offcanvas.Title>
				</Offcanvas.Header>
				<Offcanvas.Body>
					<Row xs={1} className='g-2'>
						<RestaurantsList data={restaurants} />
					</Row>
				</Offcanvas.Body>
			</Offcanvas>
			<MobileCarousel data={restaurants} />
		</>
	)
}

export default OffcanvasComponent

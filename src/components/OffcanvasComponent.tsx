import React from 'react'
import Offcanvas from 'react-bootstrap/Offcanvas'
import Button from 'react-bootstrap/Button'
import RestaurantsList from './RestaurantsList'
import { Restaurant } from '../types/Restaurant.types'

interface IProps {
	handleShow: () => void
	handleClose: () => void
	show: boolean
	restaurants: Restaurant[]
}

const OffcanvasComponent: React.FC<IProps> = ({
	handleShow,
	show,
	handleClose,
	restaurants,
}) => {
	return (
		<>
			{/* <Button
				variant='transparent'
				onClick={handleShow}
				className='map-btn'
			>
				🔍
			</Button> */}
			<Offcanvas
				data-bs-theme='dark'
				show={show}
				onHide={handleClose}
				scroll
				backdrop={false}
				className='offcanvas-custom'
			>
				<Offcanvas.Header closeButton>
					<Offcanvas.Title className='mt-3'>
						Restaurants
					</Offcanvas.Title>
				</Offcanvas.Header>
				<Offcanvas.Body>
					<RestaurantsList data={restaurants} />
				</Offcanvas.Body>
			</Offcanvas>
		</>
	)
}

export default OffcanvasComponent

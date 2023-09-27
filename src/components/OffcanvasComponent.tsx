import React, { useState } from 'react'
import Offcanvas from 'react-bootstrap/Offcanvas'
import Row from 'react-bootstrap/Row'
import Form from 'react-bootstrap/Form'
import RestaurantsList from './RestaurantsList'
import { Restaurant } from '../types/Restaurant.types'
import MobileCarousel from './MobileCarousel'

interface IProps {
	// handleClose: () => void
	show: boolean
	restaurants: Restaurant[]
	showHeader: boolean
	category: string
	setCategory: React.Dispatch<React.SetStateAction<string>>
}

const OffcanvasComponent: React.FC<IProps> = ({
	show,
	// handleClose,
	restaurants,
	showHeader,
	category,
	setCategory,
}) => {
	return (
		<>
			<Offcanvas
				data-bs-theme='dark'
				show={show}
				// onHide={handleClose}
				scroll
				backdrop={false}
				className='custom-offcanvas d-none d-sm-flex'
			>
				{showHeader && (
					<Offcanvas.Header>
						<div className='d-flex flex-column justify-content-center align-items-start p-3 '>
							<Form.Group controlId='category' className='mb-2'>
								<Form.Label>Category:</Form.Label>
								<Form.Select
									value={category}
									onChange={(e) =>
										setCategory(e.target.value)
									}
								>
									<option value='Café'>Café</option>
									<option value='Restaurant'>
										Restaurant
									</option>
									<option value='Pub'>Pub</option>
									<option value='Fine-dining'>
										Fine Dining
									</option>
									<option value='Fast-food'>Fast Food</option>
									<option value='Bakery'>Bakery</option>
									<option value='Deli'>Deli</option>
								</Form.Select>
							</Form.Group>
						</div>
						{/* <Offcanvas.Title>Restaurants</Offcanvas.Title> */}
					</Offcanvas.Header>
				)}
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

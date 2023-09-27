import React, { useEffect, useState } from 'react'
import Offcanvas from 'react-bootstrap/Offcanvas'
import Row from 'react-bootstrap/Row'
import RestaurantsList from './RestaurantsList'
import { Restaurant } from '../types/Restaurant.types'
import MobileCarousel from './MobileCarousel'
import { Form } from 'react-bootstrap'

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
	const [sortedRestaurants, setSortedRestaurants] = useState<
		Restaurant[] | null
	>(null)
	const [filter, setFilter] = useState<string>()

	useEffect(() => {
		if (filter === 'Name') {
			const sortByName = () => {
				const sortedByName = [...restaurants]
				sortedByName.sort((a, b) => a.name.localeCompare(b.name))
				setSortedRestaurants(sortedByName)
			}
			sortByName()
			console.log('sorted rest', sortedRestaurants)
		} else if (filter === 'Distance') {
			const sortByDistance = () => {
				const sortedByDistance = [...restaurants]
				sortedByDistance.sort((a, b) => {
					const distanceA = Number(a.distance)
					const distanceB = Number(b.distance)
					return distanceA - distanceB
				})
				setSortedRestaurants(sortedByDistance)
			}
			sortByDistance()
		} else {
			setSortedRestaurants(restaurants)
		}
	}, [filter, restaurants])
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
					<Form.Group className='mb-2'>
						<Form.Label>Filter: </Form.Label>
						<Form.Select
							value={filter}
							onChange={(e) => {
								setFilter(e.target.value)
							}}
						>
							<option value='No filter'>No filter</option>
							<option value='Name'>Name</option>
							<option value='Distance'>Distance</option>
						</Form.Select>
					</Form.Group>
				</Offcanvas.Header>
				<Offcanvas.Body>
					<Row xs={1} className='g-2'>
						{restaurants.length === 0 && <p>No restaurant found</p>}
						<RestaurantsList
							data={
								sortedRestaurants
									? sortedRestaurants
									: restaurants
							}
						/>
					</Row>
				</Offcanvas.Body>
			</Offcanvas>
			<MobileCarousel data={restaurants} />
		</>
	)
}

export default OffcanvasComponent

import React, { useEffect, useState } from 'react'
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
	restaurants,
	showHeader,
	category,
	setCategory,
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
				scroll
				backdrop={false}
				className='custom-offcanvas d-none d-sm-flex'
			>
				{showHeader && (
					<Offcanvas.Header className='justify-content-center flex-column filter-header'>
						<div className='d-flex '>
							<Form.Group
								controlId='category'
								className='mb-2 mx-2'
							>
								<Form.Label>Category:</Form.Label>
								<Form.Select
									value={category}
									onChange={(e) =>
										setCategory(e.target.value)
									}
								>
									<option value=''>All</option>
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

							<Form.Group className='mb-2 mx-3'>
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
						</div>
						{restaurants.length === 0 && (
							<div className='my-2 mx-2 flex-column'>
								<p>No restaurants found</p>
							</div>
						)}
						{restaurants.length > 0 && (
							<div className='my-2 mx-2 flex-column'>
								<Offcanvas.Title>Restaurants</Offcanvas.Title>
							</div>
						)}
					</Offcanvas.Header>
				)}

				<Offcanvas.Body>
					<Row xs={1} className='g-2'>
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

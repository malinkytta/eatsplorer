import React, { useEffect, useState } from 'react'
import Offcanvas from 'react-bootstrap/Offcanvas'
import Row from 'react-bootstrap/Row'
import RestaurantsList from './RestaurantsList'
import { Restaurant } from '../types/Restaurant.types'
import MobileCarousel from './MobileCarousel'
import FilterForm from './FilterForm'
import { useSearchParams, useNavigate } from 'react-router-dom'

interface IProps {
	show: boolean
	restaurants: Restaurant[]
	showHeader: boolean
	category: string
	offer: string
	setCategory: React.Dispatch<React.SetStateAction<string>>
	setOffer: React.Dispatch<React.SetStateAction<string>>
}

const OffcanvasComponent: React.FC<IProps> = ({
	show,
	restaurants,
	showHeader,
	category,
	offer,
	setCategory,
	setOffer,
}) => {
	const [sortedRestaurants, setSortedRestaurants] = useState<
		Restaurant[] | null
	>(null)
	const [filter, setFilter] = useState<string>('')
	const [searchParams] = useSearchParams()

	const navigate = useNavigate()

	const filterparams = searchParams.get('filter')

	useEffect(() => {
		const sortedRestaurantsCopy = [...restaurants]
		if (filterparams === 'Name') {
			sortedRestaurantsCopy.sort((a, b) => a.name.localeCompare(b.name))
		} else if (filterparams === 'Distance') {
			sortedRestaurantsCopy.sort((a, b) => {
				const distanceA = Number(a.distance)
				const distanceB = Number(b.distance)
				return distanceA - distanceB
			})
		}
		let filteredRestaurants = sortedRestaurantsCopy
		// if (offerparams && offerparams !== 'All') {
		// 	filteredRestaurants = sortedRestaurantsCopy.filter(
		// 		(restaurant) => restaurant.offer === offerparams
		// 	)
		// }
		const searchParamsCopy = new URLSearchParams(searchParams.toString())

		if (filter) {
			if (!filterparams) {
				searchParamsCopy.set('filter', filter)
			} else {
				searchParamsCopy.set('filter', filter)
			}
		}

		// if (offer) {
		// 	if (!offerparams) {
		// 		searchParamsCopy.set('offer', offer)
		// 	} else {
		// 		searchParamsCopy.set('offer', offer)
		// 	}
		// }

		const newUrl = `?${searchParamsCopy.toString()}`
		navigate(newUrl)
		setSortedRestaurants(filteredRestaurants)
	}, [
		filter,
		restaurants,
		offer,
		// offerparams,
		filterparams,
		searchParams,
		navigate,
	])

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
						<FilterForm
							category={category}
							offer={offer}
							filter={filter}
							setCategory={setCategory}
							setOffer={setOffer}
							setFilter={setFilter}
						/>

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

import React, { useEffect, useState } from 'react'
import Row from 'react-bootstrap/Row'
import RestaurantsList from './RestaurantsList'
import { Restaurant } from '../types/Restaurant.types'
import FilterForm from './FilterForm'
import { useSearchParams, useNavigate } from 'react-router-dom'

interface IProps {
	data: Restaurant[]
	showMobile: boolean
	category: string
	offer: string
	show: boolean
	setCategory: React.Dispatch<React.SetStateAction<string>>
	setOffer: React.Dispatch<React.SetStateAction<string>>
}

const MobileCarousel: React.FC<IProps> = ({
	data,
	showMobile,
	category,
	offer,
	show,
	setCategory,
	setOffer,
}) => {
	const [filter, setFilter] = useState<string>('')
	const [searchParams] = useSearchParams()
	const navigate = useNavigate()
	const filterparams = searchParams.get('filter')
	const [sortedRestaurants, setSortedRestaurants] = useState<
		Restaurant[] | null
	>(null)

	useEffect(() => {
		const sortedRestaurantsCopy = [...data]
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

		const searchParamsCopy = new URLSearchParams(searchParams.toString())

		if (filter) {
			if (!filterparams) {
				searchParamsCopy.set('filter', filter)
			} else {
				searchParamsCopy.set('filter', filter)
			}
		}

		const newUrl = `?${searchParamsCopy.toString()}`
		navigate(newUrl)
		setSortedRestaurants(filteredRestaurants)
	}, [filter, data, offer, filterparams, searchParams, navigate])

	return (
		<>
			{showMobile && (
				<div className=' mobile-filter-wrapper d-sm-none'>
					<div className='mobile-filter'>
						<FilterForm
							category={category}
							offer={offer}
							filter={filter}
							setCategory={setCategory}
							setOffer={setOffer}
							setFilter={setFilter}
						/>
						{data.length === 0 && (
							<div className='my-2 mx-3 flex-column'>
								<p>No restaurants found</p>
							</div>
						)}
					</div>
				</div>
			)}
			{show && (
				<Row className=' mobile-carousel flex-nowrap d-sm-none'>
					<RestaurantsList
						data={sortedRestaurants ? sortedRestaurants : data}
					/>
				</Row>
			)}
		</>
	)
}

export default MobileCarousel

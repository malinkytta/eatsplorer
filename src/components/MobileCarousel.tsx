import React from 'react'
import Row from 'react-bootstrap/Row'

import RestaurantsList from './RestaurantsList'
import { Restaurant } from '../types/Restaurant.types'
import FilterForm from './FilterForm'

interface IProps {
	data: Restaurant[]
	showMobile: boolean
	category: string
	offer: string
	filter: string
	show: boolean
	setCategory: React.Dispatch<React.SetStateAction<string>>
	setOffer: React.Dispatch<React.SetStateAction<string>>
	setFilter: React.Dispatch<React.SetStateAction<string>>
}

const MobileCarousel: React.FC<IProps> = ({
	data,
	showMobile,
	category,
	offer,
	filter,
	show,
	setCategory,
	setOffer,
	setFilter,
}) => {
	{
	}
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
					</div>
				</div>
			)}
			{show && (
				<Row className=' mobile-carousel flex-nowrap d-sm-none'>
					<RestaurantsList data={data} />
				</Row>
			)}
		</>
	)
}

export default MobileCarousel

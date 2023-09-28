import React from 'react'
import Form from 'react-bootstrap/Form'

interface IProps {
	category: string
	offer: string
	filter: string
	setCategory: (value: string) => void
	setOffer: (value: string) => void
	setFilter: (value: string) => void
}
const FilterForm: React.FC<IProps> = ({
	category,
	offer,
	filter,
	setCategory,
	setOffer,
	setFilter,
}) => {
	return (
		<div className='d-flex'>
			<Form.Group controlId='category' className='mb-2 mx-2'>
				<Form.Label>Category:</Form.Label>
				<Form.Select
					value={category}
					onChange={(e) => setCategory(e.target.value)}
				>
					<option value=''>All</option>
					<option value='Café'>Café</option>
					<option value='Restaurant'>Restaurant</option>
					<option value='Pub'>Pub</option>
					<option value='Fine-dining'>Fine Dining</option>
					<option value='Fast-food'>Fast Food</option>
					<option value='Bakery'>Bakery</option>
					<option value='Deli'>Deli</option>
				</Form.Select>
			</Form.Group>

			<Form.Group className='mb-2 mx-3'>
				<Form.Label>Offer: </Form.Label>
				<Form.Select
					value={offer}
					onChange={(e) => {
						setOffer(e.target.value)
					}}
				>
					<option value=''>All</option>
					<option value='Brunch'>Brunch</option>
					<option value='Lunch'>Lunch</option>
					<option value='Dinner'>Dinner</option>
					<option value='After Work'>After Work</option>
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
	)
}

export default FilterForm

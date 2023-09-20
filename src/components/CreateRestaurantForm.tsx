import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

import { SubmitHandler, useForm } from 'react-hook-form'
import { Restaurant } from '../types/Restaurant.types'
import { useEffect } from 'react'

interface IProps {
	onCreate: (data: Restaurant) => void
}

const CreateRestaurantForm: React.FC<IProps> = ({ onCreate }) => {
	const {
		handleSubmit,
		register,
		reset,
		formState: { errors, isSubmitSuccessful },
	} = useForm<Restaurant>()

	const onFormSubmit: SubmitHandler<Restaurant> = (data: Restaurant) => {
		onCreate(data)
	}

	useEffect(() => {
		reset()
	}, [isSubmitSuccessful, reset])

	return (
		<Form onSubmit={handleSubmit(onFormSubmit)} className='mt-4'>
			<Form.Group controlId='name' className='mb-2'>
				<Form.Label>Name:</Form.Label>
				<Form.Control
					placeholder='Restaurant Name'
					type='text'
					{...register('name', {
						required: 'Please enter the name of the restaurant',
						minLength: {
							value: 2,
							message:
								'The restaurant must contain at least 2 characters',
						},
					})}
				/>
				{errors.name && (
					<p className='invalid'>
						{errors.name.message ?? 'Invalid value'}
					</p>
				)}
			</Form.Group>

			<Row>
				<Col className='mb-2'>
					<Form.Group controlId='category'>
						<Form.Label>Category:</Form.Label>
						<Form.Select
							aria-label='Default select example'
							{...register('category')}
						>
							<option value='Café'>Café</option>
							<option value='Restaurant'>Restaurant</option>
							<option value='Pub'>Pub</option>
							<option value='Fine-dining'>Fine Dining</option>
							<option value='Fast-food'>Fast Food</option>
							<option value='Bakery'>Bakery</option>
							<option value='Deli'>Deli</option>
						</Form.Select>

						{errors.category && (
							<p className='invalid'>
								{errors.category.message ?? 'Invalid value'}
							</p>
						)}
					</Form.Group>
				</Col>
				<Col>
					<Form.Group controlId='offer'>
						<Form.Label>Offer:</Form.Label>
						<Form.Select {...register('offer')}>
							<option value='brunch'>Brunch</option>
							<option value='lunch'>Lunch</option>
							<option value='dinner'>Dinner</option>
							<option value='after-work'>After Work</option>
						</Form.Select>
						{errors.offer && (
							<p className='invalid'>
								{errors.offer.message ?? 'Invalid value'}
							</p>
						)}
					</Form.Group>
				</Col>
			</Row>

			<Row>
				<Col className='mb-2'>
					<Form.Group controlId='address'>
						<Form.Label>Adress</Form.Label>

						<Form.Control
							placeholder='Address'
							type='text'
							{...register('address', {
								required: 'There must be an adress',
								minLength: {
									value: 2,
									message:
										'The adress must contain at least 2 characters',
								},
							})}
						/>
						{errors.address && (
							<p className='invalid'>
								{errors.address.message ?? 'Invalid value'}
							</p>
						)}
					</Form.Group>
				</Col>
				<Col>
					<Form.Group controlId='city'>
						<Form.Label>City:</Form.Label>
						<Form.Control
							placeholder='City'
							type='text'
							{...register('city', {
								required: 'There must be a city',
								minLength: {
									value: 2,
									message:
										'The city must contain at least 2 characters',
								},
							})}
						/>
						{errors.city && (
							<p className='invalid'>
								{errors.city.message ?? 'Invalid value'}
							</p>
						)}
					</Form.Group>
				</Col>
			</Row>

			<Row>
				<Col className='mb-2'>
					<Form.Group controlId='phone' className='mb-2'>
						<Form.Label>Phone Number</Form.Label>
						<Form.Control type='phone' {...register('phone')} />
						{errors.phone && (
							<p className='invalid'>
								{errors.phone.message ?? 'Invalid value'}
							</p>
						)}
					</Form.Group>
				</Col>
				<Col>
					<Form.Group controlId='email' className='mb-2'>
						<Form.Label>Email</Form.Label>
						<Form.Control type='email' {...register('email')} />
						{errors.email && (
							<p className='invalid'>
								{errors.email.message ?? 'Invalid value'}
							</p>
						)}
					</Form.Group>
				</Col>
			</Row>
			{/* <Form.Group controlId='photo' className='mb-2'>
				<Form.Label>Photo</Form.Label>
				<Form.Control
					type='file'
					accept='image/gif,image/jpeg,image/png,image/webp'
					{...register('photo')}
				/>
				{errors.photo && (
					<p className='invalid'>
						{errors.photo.message ?? 'Invalid value'}
					</p>
				)}
			</Form.Group> */}

			<Form.Group controlId='description' className='mb-2'>
				<Form.Label>Description:</Form.Label>
				<Form.Control
					placeholder='Description'
					type='text'
					as='textarea'
					{...register('description', {
						required: 'There must be a description',
						minLength: {
							value: 2,
							message:
								'The description must contain at least 2 characters',
						},
					})}
				/>
				{errors.description && (
					<p className='invalid'>
						{errors.description.message ?? 'Invalid value'}
					</p>
				)}
			</Form.Group>

			<Form.Group controlId='website' className='mb-2'>
				<Form.Label>Website</Form.Label>
				<Form.Control type='url' {...register('website')} />
				{errors.website && (
					<p className='invalid'>
						{errors.website.message ?? 'Invalid value'}
					</p>
				)}
			</Form.Group>
			<Row>
				<Col className='mb-2'>
					<Form.Group controlId='instagram'>
						<Form.Label>Instagram</Form.Label>
						<Form.Control type='url' {...register('instagram')} />
						{errors.instagram && (
							<p className='invalid'>
								{errors.instagram.message ?? 'Invalid value'}
							</p>
						)}
					</Form.Group>
				</Col>
				<Col>
					<Form.Group controlId='facebook'>
						<Form.Label>Facebook</Form.Label>
						<Form.Control type='url' {...register('facebook')} />
						{errors.facebook && (
							<p className='invalid'>
								{errors.facebook.message ?? 'Invalid value'}
							</p>
						)}
					</Form.Group>
				</Col>
			</Row>
			<Button
				// disabled={loading}
				className='mt-3 border-white'
				variant='dark'
				type='submit'
			>
				Create
			</Button>
		</Form>
	)
}

export default CreateRestaurantForm

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Card from 'react-bootstrap/Card'

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
		setValue,
		formState: { errors, isSubmitSuccessful },
	} = useForm<Restaurant>()

	const onFormSubmit: SubmitHandler<Restaurant> = (data: Restaurant) => {
		onCreate(data)
	}

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const capitalize = (text: string) => {
			return text.charAt(0).toUpperCase() + text.slice(1)
		}
		const fieldName = e.target.name as keyof Restaurant
		const capitalizedValue = capitalize(e.target.value)
		setValue(fieldName, capitalizedValue)
	}

	useEffect(() => {
		reset()
	}, [isSubmitSuccessful, reset])

	return (
		<Row>
			<Form onSubmit={handleSubmit(onFormSubmit)} className='mt-4 form'>
				<Row className='justify-content-center'>
					<Col sm={10} md={6} lg={4} className='restaurant-col'>
						<Card className='restaurant-card'>
							<Card.Body className='restaurant-card-body'>
								<Card.Title>Add a Restaurant</Card.Title>
								<Card.Text>
									Share your culinary discoveries and
									contribute to our growing restaurant guide.
								</Card.Text>
							</Card.Body>
						</Card>
					</Col>
					<Col sm={10} md={6} lg={4} className='restaurant-col'>
						<Card className='restaurant-card'>
							<Card.Body className='restaurant-card-body'>
								<Form.Group controlId='name' className='mb-2'>
									<Form.Label>Name:</Form.Label>
									<Form.Control
										placeholder='Restaurant Name'
										type='text'
										{...register('name', {
											required:
												'Please enter the name of the restaurant',
											minLength: {
												value: 2,
												message:
													'The restaurant must contain at least 2 characters',
											},
										})}
										onChange={handleInputChange}
									/>
									{errors.name && (
										<p className='invalid'>
											{errors.name.message ??
												'Invalid value'}
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
												<option value='Café'>
													Café
												</option>
												<option value='Restaurant'>
													Restaurant
												</option>
												<option value='Pub'>Pub</option>
												<option value='Fine-dining'>
													Fine Dining
												</option>
												<option value='Fast-food'>
													Fast Food
												</option>
												<option value='Bakery'>
													Bakery
												</option>
												<option value='Deli'>
													Deli
												</option>
											</Form.Select>

											{errors.category && (
												<p className='invalid'>
													{errors.category.message ??
														'Invalid value'}
												</p>
											)}
										</Form.Group>
									</Col>
									<Col>
										<Form.Group controlId='offer'>
											<Form.Label>Offer:</Form.Label>
											<Form.Select {...register('offer')}>
												<option value='Brunch'>
													Brunch
												</option>
												<option value='Lunch'>
													Lunch
												</option>
												<option value='Dinner'>
													Dinner
												</option>
												<option value='After-work'>
													After Work
												</option>
											</Form.Select>
											{errors.offer && (
												<p className='invalid'>
													{errors.offer.message ??
														'Invalid value'}
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
													required:
														'There must be an adress',
													minLength: {
														value: 2,
														message:
															'The adress must contain at least 2 characters',
													},
												})}
												onChange={handleInputChange}
											/>
											{errors.address && (
												<p className='invalid'>
													{errors.address.message ??
														'Invalid value'}
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
													required:
														'There must be a city',
													minLength: {
														value: 2,
														message:
															'The city must contain at least 2 characters',
													},
												})}
												onChange={handleInputChange}
											/>
											{errors.city && (
												<p className='invalid'>
													{errors.city.message ??
														'Invalid value'}
												</p>
											)}
										</Form.Group>
									</Col>

									<Form.Group
										controlId='description'
										className='mb-2'
									>
										<Form.Label>Description:</Form.Label>
										<Form.Control
											placeholder='Description'
											type='text'
											as='textarea'
											{...register('description', {
												required:
													'There must be a description',
												minLength: {
													value: 2,
													message:
														'The description must contain at least 2 characters',
												},
											})}
											onChange={handleInputChange}
										/>
										{errors.description && (
											<p className='invalid'>
												{errors.description.message ??
													'Invalid value'}
											</p>
										)}
									</Form.Group>
								</Row>
							</Card.Body>
						</Card>
					</Col>

					{/* Second card */}
					<Col sm={10} md={6} lg={4} className='restaurant-col'>
						<Card className='restaurant-card'>
							<Card.Body className='restaurant-card-body'>
								<Row>
									<Col>
										<Form.Group
											controlId='phone'
											className='mb-2'
										>
											<Form.Label>
												Phone Number
											</Form.Label>
											<Form.Control
												type='tel'
												{...register('phone', {
													pattern: {
														value: /^(?:(?:\+|00)46|0)[\s-]?[1-9]\d{1,2}[\s-]?\d{2,3}[\s-]?\d{2}[\s-]?\d{2}$/,
														message:
															'Invalid phone number, please enter a valid Swedish phone number.',
													},
												})}
												placeholder='Phone Number'
											/>
											{errors.phone && (
												<p className='invalid'>
													{errors.phone.message ??
														'Invalid value'}
												</p>
											)}
										</Form.Group>
									</Col>
									<Col>
										<Form.Group
											controlId='email'
											className='mb-2'
										>
											<Form.Label>Email</Form.Label>
											<Form.Control
												type='email'
												{...register('email')}
												placeholder='example@email.com'
											/>
											{errors.email && (
												<p className='invalid'>
													{errors.email.message ??
														'Invalid value'}
												</p>
											)}
										</Form.Group>
									</Col>
								</Row>

								<Form.Group
									controlId='website'
									className='mb-2'
								>
									<Form.Label>Website</Form.Label>
									<Form.Control
										type='url'
										{...register('website')}
										placeholder='https://www.example.com'
									/>
									{errors.website && (
										<p className='invalid'>
											{errors.website.message ??
												'Invalid value'}
										</p>
									)}
								</Form.Group>
								<Row>
									<Col className='mb-2'>
										<Form.Group controlId='instagram'>
											<Form.Label>Instagram</Form.Label>
											<Form.Control
												type='url'
												{...register('instagram')}
												placeholder='https://www.instagram.com/example'
											/>
											{errors.instagram && (
												<p className='invalid'>
													{errors.instagram.message ??
														'Invalid value'}
												</p>
											)}
										</Form.Group>
									</Col>
									<Col>
										<Form.Group controlId='facebook'>
											<Form.Label>Facebook</Form.Label>
											<Form.Control
												type='url'
												{...register('facebook')}
												placeholder='https://www.facebook.com/example/'
											/>
											{errors.facebook && (
												<p className='invalid'>
													{errors.facebook.message ??
														'Invalid value'}
												</p>
											)}
										</Form.Group>
									</Col>
								</Row>
								<div>
									<Button
										className='mt-3 form-btn'
										variant='dark'
										type='submit'
									>
										Create
									</Button>
								</div>
							</Card.Body>
						</Card>
					</Col>
				</Row>
			</Form>
		</Row>
	)
}

export default CreateRestaurantForm

import { doc, setDoc } from 'firebase/firestore'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import { Alert, Button, Card, Form } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { SubmitHandler, useForm } from 'react-hook-form'
import { NewUserCredentials } from '../types/User.types'
import { FirebaseError } from 'firebase/app'
import useAuth from '../hooks/useAuth'
import { useRef, useState } from 'react'
import { newUsersCol } from '../services/firebase'
import { v4 as uuid } from 'uuid'

const SignupPage = () => {
	const [errorMessage, setErrorMessage] = useState<string | null>(null)
	const [loading, setLoading] = useState(false)
	const {
		handleSubmit,
		register,
		watch,
		formState: { errors },
	} = useForm<NewUserCredentials>()

	const { signup } = useAuth()
	const navigate = useNavigate()

	const passwordRef = useRef('')
	passwordRef.current = watch('password')

	const onSignup: SubmitHandler<NewUserCredentials> = async (data) => {
		const docRef = doc(newUsersCol)

		await setDoc(docRef, {
			_uid: uuid(),
			name: data.name,
			email: data.email,
			isAdmin: false,
			profileImage: null,
		})

		setErrorMessage(null)

		try {
			setLoading(true)
			await signup(data.email, data.password)
			navigate('/')
		} catch (error) {
			if (error instanceof FirebaseError) {
				setErrorMessage(error.message)
			} else {
				setErrorMessage("Something went wrong and it wasn't Firebase.")
			}
			setLoading(false)
		}
	}
	return (
		<Container>
			<Row>
				<Col md={{ span: 6, offset: 3 }}>
					<Card className='mt-3' bg='dark' text='white'>
						<Card.Body>
							<Card.Title>Sign Up</Card.Title>
							{errorMessage && (
								<Alert variant='warning'>{errorMessage}</Alert>
							)}
							<Form onSubmit={handleSubmit(onSignup)}>
								<Form.Group controlId='name' className='mb-2'>
									<Form.Label>Name:</Form.Label>
									<Form.Control
										placeholder='John Doe'
										type='text'
										{...register('name', {
											required: 'You must enter a name.',
											minLength: {
												value: 2,
												message:
													"You're name must contain atleast 2 characters",
											},
										})}
									/>
									{errors.name && (
										<p className='invalid'>
											{errors.name.message ??
												'Invalid value'}
										</p>
									)}
								</Form.Group>

								<Form.Group controlId='email' className='mb-2'>
									<Form.Label>Email:</Form.Label>
									<Form.Control
										placeholder='user@email.com'
										type='email'
										{...register('email', {
											required:
												'You must enter an email.',
										})}
									/>
									{errors.email && (
										<p className='invalid'>
											{errors.email.message ??
												'Invalid value'}
										</p>
									)}
								</Form.Group>
								<Form.Group
									controlId='password'
									className='mb-2'
								>
									<Form.Label>Password:</Form.Label>
									<Form.Control
										type='password'
										autoComplete='new-password'
										{...register('password', {
											required:
												'You need a password to continue.',
											minLength: {
												value: 6,
												message:
													'Please enter atleast 6 characters',
											},
										})}
									/>
									{errors.password && (
										<p className='invalid'>
											{errors.password.message ??
												'Invalid value'}
										</p>
									)}
								</Form.Group>
								<Form.Group controlId='confirm-password'>
									<Form.Label>Confirm Password:</Form.Label>
									<Form.Control
										type='password'
										autoComplete='off'
										{...register('confirmPassword', {
											required:
												'Please re-enter your password.',
											minLength: {
												value: 3,
												message:
													'Please enter at least 6 characters',
											},
											validate: (value) => {
												return (
													value ===
														passwordRef.current ||
													'The passwords do not match'
												)
											},
										})}
									/>
									{errors.confirmPassword && (
										<p className='invalid'>
											{errors.confirmPassword.message ??
												'Invalid value'}
										</p>
									)}
								</Form.Group>
								<Button
									disabled={loading}
									className='mt-3 border-white'
									variant='dark'
									type='submit'
								>
									{loading
										? 'Creating account...'
										: 'Create Account'}
								</Button>
							</Form>
						</Card.Body>
						<div className='text-center mb-3'>
							Done this before? <Link to='/login'>Log In</Link>
						</div>
					</Card>
				</Col>
			</Row>
		</Container>
	)
}

export default SignupPage

import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Alert from 'react-bootstrap/Alert'
import Modal from 'react-bootstrap/Modal'

import { Link, useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import { SubmitHandler, useForm } from 'react-hook-form'
import { LoginCredentials } from '../types/User.types'
import { FirebaseError } from 'firebase/app'
import ForgotPasswordPage from './ForgotPasswordPage'

const LoginPage = () => {
	const [errorMessage, setErrorMessage] = useState<string | null>(null)
	const [loading, setLoading] = useState(false)
	const [showModal, setShowModal] = useState(false)

	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm<LoginCredentials>()
	const { login } = useAuth()
	const navigate = useNavigate()
	const openModal = () => {
		setShowModal(true)
	}

	const closeModal = () => {
		setShowModal(false)
	}
	const onLogin: SubmitHandler<LoginCredentials> = async (data) => {
		setErrorMessage(null)
		try {
			setLoading(true)
			await login(data.email, data.password)
			navigate('/')
		} catch (error) {
			if (error instanceof FirebaseError) {
				setErrorMessage(error.message)
			} else {
				setErrorMessage('Something went wrong and it was not Firebase.')
			}
			setLoading(false)
		}
	}

	return (
		<div className='login-page'>
			<Row className='d-flex justify-content-center align-items-center'>
				<Col md={6} className='d-none d-md-flex'></Col>
				<Col md={6}>
					<Card className='login-card' text='white'>
						<Card.Body className='form-card'>
							<Card.Title className='mb-4'>Log In</Card.Title>
							{errorMessage && (
								<Alert variant='danger'>{errorMessage}</Alert>
							)}
							<Form
								onSubmit={handleSubmit(onLogin)}
								className='form'
							>
								<Form.Group
									controlId='email'
									className='mt-3 mb-4'
								>
									<Form.Label className='mb-0'>
										Email:
									</Form.Label>
									<Form.Control
										placeholder='user@email.com'
										type='email'
										{...register('email', {
											required:
												'You need to enter an email',
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
									<Form.Label className='mb-0'>
										Password:
									</Form.Label>
									<Form.Control
										type='password'
										autoComplete='new-password'
										{...register('password', {
											required:
												'You need to enter your password.',
											minLength: {
												value: 6,
												message:
													'Your password is at least 6 characters.',
											},
										})}
									/>
									{errors.password && (
										<p className='invalid'>
											{errors.password.message ??
												'Invalid value'}
										</p>
									)}
									<div
										className='mb-3 reset-btn'
										onClick={openModal}
									>
										Forgot Password?
										{/* <Button onClick={openModal}></Button> */}
									</div>
								</Form.Group>
								<Button
									disabled={loading}
									className='mt-3 '
									variant='dark'
									type='submit'
								>
									{loading ? 'Logging in...' : 'Log in'}
								</Button>
							</Form>
						</Card.Body>

						<Modal show={showModal} onHide={closeModal}>
							<ForgotPasswordPage />
						</Modal>

						<div className='text-center mt-3'>
							Need an account?{' '}
							<Link to='/signup'>Sign Up here</Link>
						</div>
					</Card>
				</Col>
			</Row>
		</div>
	)
}

export default LoginPage

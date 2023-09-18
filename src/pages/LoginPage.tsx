import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import { Link, useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import { SubmitHandler, useForm } from 'react-hook-form'
import { LoginCredentials } from '../types/User.types'
import { FirebaseError } from 'firebase/app'
import { Alert } from 'react-bootstrap'

const LoginPage = () => {
	const [errorMessage, setErrorMessage] = useState<string | null>(null)
	const [loading, setLoading] = useState(false)
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm<LoginCredentials>()
	const { login } = useAuth()
	const navigate = useNavigate()

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
		<Container>
			<Row>
				<Col md={{ span: 6, offset: 3 }}>
					<Card className='mt-3' bg='dark' text='white'>
						<Card.Body>
							<Card.Title>Log in</Card.Title>
							{errorMessage && (
								<Alert variant='danger'>{errorMessage}</Alert>
							)}
							<Form onSubmit={handleSubmit(onLogin)}>
								<Form.Group controlId='email' className='mb-2'>
									<Form.Label>Email:</Form.Label>
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
									<Form.Label>Password:</Form.Label>
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
								</Form.Group>
								<Button
									disabled={loading}
									className='mt-3 border-white'
									variant='dark'
									type='submit'
								>
									{loading ? 'Logging in...' : 'Log in'}
								</Button>
							</Form>
						</Card.Body>
						<div className='text-center mb-3'>
							Forgot Password?{' '}
							<Link to='/forgot-password'>Reset Password</Link>
						</div>
					</Card>
					<div className='text-center mt-3'>
						Need an account? <Link to='/signup'>Sign Up here</Link>
					</div>
				</Col>
			</Row>
		</Container>
	)
}

export default LoginPage

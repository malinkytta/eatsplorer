import { FirebaseError } from 'firebase/app'
import { useState } from 'react'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import { useForm, SubmitHandler } from 'react-hook-form'
import useAuth from '../hooks/useAuth'
import { ForgotPasswordType } from '../types/User.types'

const ForgotPasswordPage = () => {
	const [errorMessage, setErrorMessage] = useState<string | null>(null)
	const [successMessage, setSuccessMessage] = useState<string | null>(null)
	const [loading, setLoading] = useState(false)
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm<ForgotPasswordType>()
	const { resetPassword } = useAuth()

	const onForgotPassword: SubmitHandler<ForgotPasswordType> = async (
		data
	) => {
		setErrorMessage(null)
		try {
			setLoading(true)
			await resetPassword(data.email)
			setSuccessMessage('A link to reset has been sent to your email.')
			setLoading(false)
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
							<Card.Title className='mb-3'>
								Forgot Password?
							</Card.Title>

							{errorMessage && (
								<Alert variant='danger'>{errorMessage}</Alert>
							)}
							{successMessage && (
								<Alert variant='success'>
									{successMessage}
								</Alert>
							)}
							<p>
								Enter your email below to reset your password.
							</p>

							<Form onSubmit={handleSubmit(onForgotPassword)}>
								<Form.Group controlId='email' className='mb-3'>
									<Form.Label>Email:</Form.Label>
									<Form.Control
										placeholder='user@email.com'
										type='email'
										{...register('email', {
											required:
												'You have to enter your email',
										})}
									/>
									{errors.email && (
										<p className='invalid'>
											{errors.email.message ??
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
										? 'Sending email...'
										: 'Send password reset email'}
								</Button>
							</Form>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Container>
	)
}

export default ForgotPasswordPage

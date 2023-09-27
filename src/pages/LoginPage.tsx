import { useState } from 'react'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'

import Row from 'react-bootstrap/Row'
import Alert from 'react-bootstrap/Alert'

import { Link, useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import { SubmitHandler } from 'react-hook-form'
import { LoginCredentials } from '../types/User.types'
import { FirebaseError } from 'firebase/app'
import LoginForm from '../components/LoginForm'

const LoginPage = () => {
	const [errorMessage, setErrorMessage] = useState<string | null>(null)
	const [loading, setLoading] = useState(false)

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

							<LoginForm loading={loading} onLogin={onLogin} />
						</Card.Body>
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

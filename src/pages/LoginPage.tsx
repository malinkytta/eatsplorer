import { useState } from 'react'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import { Link, useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import { SubmitHandler } from 'react-hook-form'
import { LoginCredentials } from '../types/User.types'
import { FirebaseError } from 'firebase/app'
import { Alert } from 'react-bootstrap'
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
		<Container>
			<Row>
				<Col md={{ span: 6, offset: 3 }}>
					<Card className='mt-3' bg='dark' text='white'>
						<Card.Body>
							<Card.Title>Log in</Card.Title>
							{errorMessage && (
								<Alert variant='danger'>{errorMessage}</Alert>
							)}
							<LoginForm loading={loading} onLogin={onLogin} />
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

import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Card from 'react-bootstrap/Card'
import Alert from 'react-bootstrap/Alert'
import { Link, useNavigate } from 'react-router-dom'
import { SubmitHandler } from 'react-hook-form'
import { NewUserCredentials } from '../types/User.types'
import { FirebaseError } from 'firebase/app'
import useAuth from '../hooks/useAuth'
import { useState } from 'react'
import SignupForm from '../components/SignupForm'
import { toast } from 'react-toastify'

const SignupPage = () => {
	const [errorMessage, setErrorMessage] = useState<string | null>(null)
	const [loading, setLoading] = useState(false)
	const { signup } = useAuth()
	const navigate = useNavigate()

	const onSignup: SubmitHandler<NewUserCredentials> = async (data) => {
		setErrorMessage(null)

		if (!data.photoFile) {
			return
		}

		try {
			setLoading(true)
			await signup(data.email, data.password, data.name, data.photoFile)
			toast('Registration was successful. Welcome!')

			navigate('/')
		} catch (error) {
			if (error instanceof FirebaseError) {
				toast(error.message)
			} else {
				console.error(error)
				toast(
					'Something went wrong during registration. Please try again.'
				)
			}
			setLoading(false)
		}
	}
	return (
		<div className='login-page'>
			<Row className='d-flex justify-content-center align-items-center '>
				<Col md={6}>
					<Card className='signup-card' text='white'>
						<Card.Title className='mb-3'>Sign Up</Card.Title>
						<Card.Body className='form-card'>
							{errorMessage && (
								<Alert variant='warning'>{errorMessage}</Alert>
							)}

							<SignupForm loading={loading} onSignup={onSignup} />
						</Card.Body>
						<div className='text-center mb-3'>
							Done this before? <Link to='/login'>Log In</Link>
						</div>
					</Card>
				</Col>
				<Col md={6} className='d-none d-md-flex'></Col>
			</Row>
		</div>
	)
}

export default SignupPage

import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import { Alert, Card } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { SubmitHandler } from 'react-hook-form'
import { NewUserCredentials } from '../types/User.types'
import { FirebaseError } from 'firebase/app'
import useAuth from '../hooks/useAuth'
import { useState } from 'react'
//import { addDoc } from 'firebase/firestore'
//import { usersCol } from '../services/firebase'
import SignupForm from '../components/SignupForm'

const SignupPage = () => {
	const [errorMessage, setErrorMessage] = useState<string | null>(null)
	const [loading, setLoading] = useState(false)
	const { signup } = useAuth()
	const navigate = useNavigate()

	const onSignup: SubmitHandler<NewUserCredentials> = async (data) => {
		setErrorMessage(null)

		if (!data.photoFile) {
			return null
		}

		try {
			setLoading(true)
			await signup(data.email, data.password, data.name, data.photoFile)
			navigate('/')
		} catch (error) {
			if (error instanceof FirebaseError) {
				setErrorMessage(error.message)
			} else {
				console.error(error)
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
							<SignupForm loading={loading} onSignup={onSignup} />
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

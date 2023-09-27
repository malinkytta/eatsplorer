import { FirebaseError } from 'firebase/app'
import React, { useState } from 'react'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import { useForm, SubmitHandler } from 'react-hook-form'
import useAuth from '../hooks/useAuth'
import { ForgotPasswordType } from '../types/User.types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { toast } from 'react-toastify'
interface IProps {
	onCloseModal?: () => void
}

const ForgotPasswordModal: React.FC<IProps> = ({ onCloseModal }) => {
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
				toast(error.message)
			} else {
				setErrorMessage("Something went wrong and it wasn't Firebase.")
				toast("Something went wrong and it wasn't Firebase.")
			}
			setLoading(false)
		}
	}

	return (
		<Card className='mt-3 reset-card' text='white'>
			<div className='d-flex justify-content-end me-3 mt-3'>
				<Button variant='transparent' onClick={onCloseModal}>
					<FontAwesomeIcon icon={faXmark} />
				</Button>
			</div>
			<Card.Body>
				<Card.Title className='mb-3'>Forgot Password?</Card.Title>

				{errorMessage && <Alert variant='danger'>{errorMessage}</Alert>}
				{successMessage && (
					<Alert variant='success'>{successMessage}</Alert>
				)}
				<p>Enter your email below to reset your password.</p>

				<Form onSubmit={handleSubmit(onForgotPassword)}>
					<Form.Group controlId='email' className='mb-3'>
						<Form.Label>Email:</Form.Label>
						<Form.Control
							placeholder='user@email.com'
							type='email'
							{...register('email', {
								required: 'You have to enter your email',
							})}
						/>
						{errors.email && (
							<p className='invalid'>
								{errors.email.message ?? 'Invalid value'}
							</p>
						)}
					</Form.Group>

					<Button
						disabled={loading}
						className='mt-3 form-btn'
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
	)
}

export default ForgotPasswordModal

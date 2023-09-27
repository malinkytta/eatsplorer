import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useForm } from 'react-hook-form'
import { LoginCredentials } from '../types/User.types'
import Modal from 'react-bootstrap/Modal'
import { useState } from 'react'
import ForgotPasswordModal from '../components/ForgotPasswordModal'

interface IProps {
	onLogin: (data: LoginCredentials) => void
	loading: boolean
}

const LoginForm: React.FC<IProps> = ({ onLogin, loading }) => {
	const [showModal, setShowModal] = useState(false)

	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm<LoginCredentials>()

	const openModal = () => {
		setShowModal(true)
	}

	const closeModal = () => {
		setShowModal(false)
	}

	return (
		<>
			<Form onSubmit={handleSubmit(onLogin)} className='form'>
				<Form.Group controlId='email' className='mt-3 mb-4'>
					<Form.Label className='mb-0'>Email:</Form.Label>
					<Form.Control
						placeholder='user@email.com'
						type='email'
						{...register('email', {
							required: 'You need to enter an email',
						})}
					/>
					{errors.email && (
						<p className='invalid'>
							{errors.email.message ?? 'Invalid value'}
						</p>
					)}
				</Form.Group>
				<Form.Group controlId='password' className='mb-2'>
					<Form.Label className='mb-0'>Password:</Form.Label>
					<Form.Control
						type='password'
						autoComplete='new-password'
						{...register('password', {
							required: 'You need to enter your password.',
							minLength: {
								value: 6,
								message:
									'Your password is at least 6 characters.',
							},
						})}
					/>
					{errors.password && (
						<p className='invalid'>
							{errors.password.message ?? 'Invalid value'}
						</p>
					)}
					<div className='mb-3 reset-btn' onClick={openModal}>
						Forgot Password?
					</div>
				</Form.Group>
				<Button
					disabled={loading}
					className='mt-3 form-btn'
					variant='dark'
					type='submit'
				>
					{loading ? 'Logging in...' : 'Log in'}
				</Button>
			</Form>
			<Modal show={showModal} onHide={closeModal}>
				<ForgotPasswordModal onCloseModal={closeModal} />
			</Modal>
		</>
	)
}

export default LoginForm

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { SubmitHandler, useForm } from 'react-hook-form'
import { LoginCredentials } from '../types/User.types'

interface IProps {
	onLogin: (data: LoginCredentials) => void
	loading: boolean
}

const LoginForm: React.FC<IProps> = ({ onLogin, loading }) => {
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm<LoginCredentials>()

	const onFormSubmit: SubmitHandler<LoginCredentials> = (
		data: LoginCredentials
	) => {
		onLogin(data)
	}

	return (
		<Form onSubmit={handleSubmit(onFormSubmit)}>
			<Form.Group controlId='email' className='mb-2'>
				<Form.Label>Email:</Form.Label>
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
				<Form.Label>Password:</Form.Label>
				<Form.Control
					type='password'
					autoComplete='new-password'
					{...register('password', {
						required: 'You need to enter your password.',
						minLength: {
							value: 6,
							message: 'Your password is at least 6 characters.',
						},
					})}
				/>
				{errors.password && (
					<p className='invalid'>
						{errors.password.message ?? 'Invalid value'}
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
	)
}

export default LoginForm

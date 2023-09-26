import React, { useRef } from 'react'
import { NewUserCredentials } from '../types/User.types'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { SubmitHandler, useForm } from 'react-hook-form'

interface IProps {
	onSignup: (data: NewUserCredentials) => void
	loading: boolean
}

const SignupForm: React.FC<IProps> = ({ onSignup, loading }) => {
	const {
		handleSubmit,
		watch,
		register,
		formState: { errors },
	} = useForm<NewUserCredentials>()

	const passwordRef = useRef('')
	passwordRef.current = watch('password')

	const onFormSubmit: SubmitHandler<NewUserCredentials> = (
		data: NewUserCredentials
	) => {
		onSignup(data)
	}

	return (
		<Form onSubmit={handleSubmit(onFormSubmit)} className='form'>
			<Form.Group controlId='name' className='mb-2'>
				<Form.Label>Name:</Form.Label>
				<Form.Control
					placeholder='John Doe'
					type='text'
					{...register('name', {
						required: 'You must enter a name.',
						minLength: {
							value: 2,
							message:
								"You're name must contain atleast 2 characters",
						},
					})}
				/>
				{errors.name && (
					<p className='invalid'>
						{errors.name.message ?? 'Invalid value'}
					</p>
				)}
			</Form.Group>
			<Form.Group controlId='photo' className='mb-2'>
				<Form.Label>Photo</Form.Label>
				<Form.Control
					type='file'
					accept='image/gif,image/jpeg,image/png,image/webp'
					{...register('photoFile')}
				/>
				{errors.photoFile && (
					<p className='invalid'>
						{errors.photoFile.message ?? 'Invalid value'}
					</p>
				)}
			</Form.Group>
			<Form.Group controlId='email' className='mb-2'>
				<Form.Label>Email:</Form.Label>
				<Form.Control
					placeholder='user@email.com'
					type='email'
					{...register('email', {
						required: 'You must enter an email.',
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
						required: 'You need a password to continue.',
						minLength: {
							value: 6,
							message: 'Please enter atleast 6 characters',
						},
					})}
				/>
				{errors.password && (
					<p className='invalid'>
						{errors.password.message ?? 'Invalid value'}
					</p>
				)}
			</Form.Group>
			<Form.Group controlId='confirm-password'>
				<Form.Label>Confirm Password:</Form.Label>
				<Form.Control
					type='password'
					autoComplete='off'
					{...register('confirmPassword', {
						required: 'Please re-enter your password.',
						minLength: {
							value: 6,
							message: 'Please enter at least 6 characters',
						},
						validate: (value) => {
							return (
								value === passwordRef.current ||
								'The passwords do not match'
							)
						},
					})}
				/>
				{errors.confirmPassword && (
					<p className='invalid'>
						{errors.confirmPassword.message ?? 'Invalid value'}
					</p>
				)}
			</Form.Group>
			<Button
				disabled={loading}
				className='mt-3 border-white'
				variant='dark'
				type='submit'
			>
				{loading ? 'Creating account...' : 'Create Account'}
			</Button>
		</Form>
	)
}
export default SignupForm

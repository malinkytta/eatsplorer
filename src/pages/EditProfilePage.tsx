import { useRef, useState } from 'react'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import Form from 'react-bootstrap/Form'
import ProgressBar from 'react-bootstrap/ProgressBar'
import Row from 'react-bootstrap/Row'
import { SubmitHandler, useForm } from 'react-hook-form'
import { UpdateProfileFormData } from '../types/User.types'
import { FirebaseError } from 'firebase/app'
import { storage } from '../services/firebase'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import Button from 'react-bootstrap/Button'
import useAuth from '../hooks/useAuth'
import useUpdateUser from '../hooks/useUpdateUser'
import { ErrorModal } from '../components/ErrorModal'
import { toast } from 'react-toastify'

const EditProfilePage = () => {
	const [uploadProgress, setUploadProgress] = useState<number | null>(null)
	const [loading, setLoading] = useState(false)
	const { removeProfilePhoto, updateProfilePhoto, updateProfile } =
		useUpdateUser()

	const {
		currentUser,
		reloadUser,
		setDisplayName,
		setPassword,
		setPhotoUrl,
		userPhotoUrl,
	} = useAuth()
	const {
		handleSubmit,
		register,
		watch,
		formState: { errors },
	} = useForm<UpdateProfileFormData>({
		defaultValues: {
			email: currentUser?.email ?? '',
			name: currentUser?.displayName ?? '',
		},
	})

	const passwordRef = useRef('')
	passwordRef.current = watch('password')

	const photoFileRef = useRef<FileList | null>(null)
	photoFileRef.current = watch('photoFile')

	if (!currentUser) {
		return (
			<ErrorModal>
				<h2>Login Required</h2>
				You need to be logged in to update your profile.
			</ErrorModal>
		)
	}

	const handleDeletePhoto = async () => {
		try {
			setPhotoUrl(currentUser, '')
			removeProfilePhoto(currentUser.uid)
		} catch (err) {
			toast.error('An error occurred while deleting the photo', {
				className: 'custom-toast',
			})
		}
	}

	const onUpdateProfile: SubmitHandler<UpdateProfileFormData> = async (
		data
	) => {
		try {
			setLoading(true)
			if (data.name !== (currentUser.displayName ?? '')) {
				await setDisplayName(currentUser, data.name)
			}

			if (data.photoFile.length) {
				const photo = data.photoFile[0]
				const fileRef = ref(
					storage,
					`photos/${currentUser.uid}/${photo.name}`
				)
				const uploadTask = uploadBytesResumable(fileRef, photo)

				uploadTask.on(
					'state_changed',
					(snapshot) => {
						setUploadProgress(
							Math.round(
								(snapshot.bytesTransferred /
									snapshot.totalBytes) *
									1000
							) / 10
						)
					},

					(err) => {
						toast.error(
							'An error occurred while uploading the photo',
							{
								className: 'custom-toast',
							}
						)
						console.error(err)
					},
					async () => {
						const photoURL = await getDownloadURL(fileRef)
						if (photoFileRef.current === null) {
							return
						}

						await setPhotoUrl(currentUser, photoURL)
						setUploadProgress(null)
						setLoading(false)

						updateProfilePhoto(currentUser.uid, photoURL)
					}
				)
			}

			if (data.password) {
				await setPassword(data.password)
			}

			updateProfile(currentUser.uid, currentUser.photoURL, data)

			reloadUser()
			setLoading(false)
		} catch (error) {
			if (error instanceof FirebaseError) {
				toast.error(error.message, {
					className: 'custom-toast',
				})
				setLoading(false)
			} else {
				toast.error("Something went wrong and it wasn'tFirebase", {
					className: 'custom-toast',
				})
				setLoading(false)
			}
		}
	}

	return (
		<div className='edit-profile'>
			<Row className='d-flex mx-auto justify-content-center align-items-center align-items-stretch'>
				<Col
					md={4}
					sm={8}
					className='restaurant-col d-flex justify-content-center'
				>
					<Card className='edit-card'>
						<Card.Body className='form-card d-flex flex-column align-items-center justify-content-center'>
							<Image
								src={
									userPhotoUrl ||
									'https://via.placeholder.com/225'
								}
								fluid
								className='img-square profileImage'
							/>
							<Button
								className='mt-3 form-btn'
								onClick={handleDeletePhoto}
								size='sm'
								variant='dark'
							>
								Delete Photo
							</Button>
						</Card.Body>
					</Card>
				</Col>

				<Col md={4} sm={8} className='restaurant-col'>
					<Card text='white' className='edit-card'>
						<Card.Body className='form-card'>
							<Card.Title>Update profile</Card.Title>

							<Form onSubmit={handleSubmit(onUpdateProfile)}>
								<div className='profile-photo-wrapper text-center my-3'></div>
								<Form.Group
									controlId='displayName'
									className='mb-2'
								>
									<Form.Label>Name</Form.Label>
									<Form.Control
										placeholder='John Doe'
										type='text'
										{...register('name', {
											minLength: {
												value: 2,
												message:
													'Your name has to be atleast 3 characters long',
											},
										})}
									/>
									{errors.name && (
										<p className='invalid'>
											{errors.name.message ??
												'Invalid value'}
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
											{errors.photoFile.message ??
												'Invalid value'}
										</p>
									)}
									<Form.Text>
										{uploadProgress !== null ? (
											<ProgressBar
												now={uploadProgress}
												label={`${uploadProgress}%`}
												animated
												className='mt-1'
												variant='success'
											/>
										) : (
											photoFileRef.current &&
											photoFileRef.current.length > 0 && (
												<span>
													{
														photoFileRef.current[0]
															.name
													}{' '}
													(
													{Math.round(
														photoFileRef.current[0]
															.size / 1024
													)}{' '}
													kB)
												</span>
											)
										)}
									</Form.Text>
								</Form.Group>

								<Form.Group controlId='email' className='mb-2'>
									<Form.Label>Email</Form.Label>
									<Form.Control
										placeholder='user@email.com'
										type='email'
										{...register('email', {
											required:
												'You have to enter an email',
										})}
										disabled
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
									<Form.Label>Password</Form.Label>
									<Form.Control
										type='password'
										autoComplete='new-password'
										{...register('password', {
											minLength: {
												value: 6,
												message:
													'Please enter at least 6 characters',
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

								<Form.Group controlId='confirmPassword'>
									<Form.Label>Confirm Password</Form.Label>
									<Form.Control
										type='password'
										autoComplete='off'
										{...register('passwordConfirm', {
											minLength: {
												value: 6,
												message:
													'Please enter at least 6 characters',
											},
											validate: (value) => {
												return (
													!passwordRef.current ||
													value ===
														passwordRef.current ||
													'The passwords do not match'
												)
											},
										})}
									/>
									{errors.passwordConfirm && (
										<p className='invalid'>
											{errors.passwordConfirm.message ??
												'Invalid value'}
										</p>
									)}
								</Form.Group>

								<Button
									className='mt-3 form-btn'
									disabled={loading}
									variant='dark'
									type='submit'
								>
									{loading ? 'Updating profile...' : 'Save'}
								</Button>
							</Form>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</div>
	)
}

export default EditProfilePage

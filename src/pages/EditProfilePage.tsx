import { useRef, useState } from 'react'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import Form from 'react-bootstrap/Form'
import ProgressBar from 'react-bootstrap/ProgressBar'
import Row from 'react-bootstrap/Row'
import { SubmitHandler, useForm } from 'react-hook-form'
import { UpdateProfileFormData, UsersData } from '../types/User.types'
import { FirebaseError } from 'firebase/app'
import { storage, usersCol } from '../services/firebase'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { Alert, Button, Container } from 'react-bootstrap'
import useAuth from '../hooks/useAuth'
import { doc, setDoc } from 'firebase/firestore'

const EditProfilePage = () => {
	const [errorMessage, setErrorMessage] = useState<string | null>(null)
	const [uploadProgress, setUploadProgress] = useState<number | null>(null)
	const [loading, setLoading] = useState(false)
	const {
		currentUser,
		reloadUser,
		setDisplayName,
		setPassword,
		setPhotoUrl,
		userPhotoUrl,
		admin,
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
		return <p>Error, error, error!</p>
	}

	//const handleDeletePhoto = async () => {
	//	// Ta bort på något sätt med refFromUrl eller deleteDoc
	//	await reloadUser()
	//	console.log('Photo deleted successfully')
	//}

	const onUpdateProfile: SubmitHandler<UpdateProfileFormData> = async (
		data
	) => {
		setErrorMessage(null)
		try {
			setLoading(true)
			if (data.name !== (currentUser.displayName ?? '')) {
				console.log('Updating displayname...')
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
						setErrorMessage('Upload failed.')
						console.log('Upload failed.', err)
					},
					async () => {
						console.log('Upload completed')

						const photoURL = await getDownloadURL(fileRef)
						if (photoFileRef.current === null) {
							return
						}

						await setPhotoUrl(currentUser, photoURL)
						setUploadProgress(null)
						setLoading(false)

						const docRef = doc(usersCol, currentUser.uid)

						await setDoc(docRef, {
							_uid: currentUser.uid,
							name: data.name,
							photoFile: photoURL,
							email: data.email,
							isAdmin: admin,
						})
					}
				)
			}

			if (data.password) {
				console.log('Updating password')
				await setPassword(data.password)
			}

			const firestoreData: UsersData = {
				_uid: currentUser.uid,
				name: data.name,
				photoFile: currentUser.photoURL,
				email: data.email,
				isAdmin: admin,
			}

			const docRef = doc(usersCol, currentUser.uid)

			await setDoc(docRef, firestoreData)
			console.log('Profile updated, yaaaay!')

			reloadUser()
			setLoading(false)
		} catch (error) {
			if (error instanceof FirebaseError) {
				setErrorMessage(error.message)
				console.error(error)
				setLoading(false)
			} else {
				setErrorMessage('Something went wrong and it was not firebase')
				setLoading(false)
			}
		}
	}

	return (
		<Container>
			<Row>
				<Col md={{ span: 6, offset: 3 }}>
					<Card className='mt-3' bg='dark' text='white'>
						<Card.Body>
							<Card.Title>Update profile</Card.Title>
							{errorMessage && (
								<Alert variant='danger'>{errorMessage}</Alert>
							)}
							<Form onSubmit={handleSubmit(onUpdateProfile)}>
								<div className='profile-photo-wrapper text-center my-3'>
									<div className='d-flex justify-content-center mb-2'>
										<Image
											src={
												userPhotoUrl ||
												'https://via.placeholder.com/225'
											}
											fluid
											roundedCircle
											className='img-square profileImage w-50'
										/>
									</div>

									{/*<Button
										className='mt-3 border-white'
										onClick={handleDeletePhoto}
										size='sm'
										variant='dark'
									>
										Delete Photo
									</Button>*/}
								</div>
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
									className='mt-3 border-white'
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
		</Container>
	)
}

export default EditProfilePage

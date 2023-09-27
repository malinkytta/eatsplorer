import { useCallback } from 'react'
import Button from 'react-bootstrap/Button'
import { useDropzone } from 'react-dropzone'
import ProgressBar from 'react-bootstrap/ProgressBar'
import useUploadImages from '../hooks/useUploadImages'
import useAuth from '../hooks/useAuth'
import Alert from 'react-bootstrap/Alert'

interface IProps {
	restaurantId: string
	restaurant: string
}
const UploadImages: React.FC<IProps> = ({ restaurantId, restaurant }) => {
	const { admin } = useAuth()

	const uploadImages = useUploadImages()
	const onDrop = useCallback(
		(acceptedFiles: File[]) => {
			if (!acceptedFiles.length) {
				console.log('ajabaja!')
				return
			}
			acceptedFiles.forEach((file) => {
				uploadImages.upload(file, restaurantId, restaurant)
			})
		},
		[uploadImages]
	)

	const { getRootProps, getInputProps } = useDropzone({
		accept: {
			'image/gif': [],
			'image/jpeg': [],
			'image/png': [],
			'image/webp': [],
		},
		maxFiles: 3,
		maxSize: 4 * 1024 * 1024,
		onDrop,
	})

	return (
		<div {...getRootProps()} id='dropzone-wrapper'>
			<input {...getInputProps()} />
			<Button className='mb-2' variant='outline-dark'>
				Click to choose files
			</Button>
			<p>or drag and drop files here </p>

			{uploadImages.progress !== null && (
				<ProgressBar
					animated
					label={`${uploadImages.progress}`}
					now={uploadImages.progress}
					variant='success'
				/>
			)}

			{uploadImages.isError && <Alert>{uploadImages.error}</Alert>}

			{uploadImages.isSuccess && (
				<Alert variant='success'>
					Your {uploadImages.progress !== null ? 'photo(s)' : 'photo'}{' '}
					{uploadImages.progress !== null ? 'have' : 'has'} been
					uploaded
					{admin ? '!' : ' and will be reviewed by the admin.'}
				</Alert>
			)}
		</div>
	)
}

export default UploadImages

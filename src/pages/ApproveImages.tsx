import useGetImages from '../hooks/useGetImages'
import { createColumnHelper } from '@tanstack/react-table'
import { RestaurantImage } from '../types/Restaurant.types'
import SortableTable from '../components/SortableTable'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faToggleOff,
	faToggleOn,
	faTrashCan,
} from '@fortawesome/free-solid-svg-icons'
import Image from 'react-bootstrap/Image'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { useState } from 'react'
import useDeleteImage from '../hooks/useDeleteImage'
import useAdmin from '../hooks/useAdmin'

const ApproveImages = () => {
	const { removeDoc, removeFromRestaurantDoc } = useDeleteImage()
	const { approvedByAdmin } = useAdmin()
	const [show, setShow] = useState(false)
	const [selectedImage, setSelectedImage] = useState('')

	const openModal = (imageUrl: string) => {
		setShow(!show)
		setSelectedImage(imageUrl)
	}

	const closeModal = () => {
		setShow(false)
		setSelectedImage('')
	}

	const { data, loading } = useGetImages()
	if (!data) return <p>No photos</p>

	const handleApprove = async (id: string, approved: boolean) => {
		try {
			approvedByAdmin(id, approved)
		} catch (error) {
			console.error('Error updating approved status:', error)
		}
	}

	const handleDelete = (restaurantId: string, path: string, id: string) => {
		removeFromRestaurantDoc(restaurantId)
		console.log(id, restaurantId, path)
		removeDoc(id, path)
	}

	const columnHelper = createColumnHelper<RestaurantImage>()

	const columns = [
		columnHelper.display({
			id: 'Photo',
			header: 'Photo',
			cell: (props) => (
				<>
					<Image
						className='cursor-pointer'
						onClick={() => openModal(props.row.original.url)}
						fluid
						width={50}
						src={props.row.original.url}
					/>
					<Modal
						show={show}
						onHide={closeModal}
						contentLabel='Restaurant Image'
					>
						<Image fluid src={selectedImage} alt='Restaurant' />
					</Modal>
				</>
			),
		}),

		columnHelper.accessor('restaurant', {
			header: 'Restaurant',
			cell: (props) => <span>{props.getValue()}</span>,
		}),

		columnHelper.group({
			id: 'confirmedGroup',
			header: () => null,
			columns: [
				columnHelper.accessor('approved', {
					header: 'Approved',

					cell: (props) => (
						<>
							<span
								className={
									props.row.original.approved
										? 'valid'
										: 'invalid'
								}
							>
								{props.row.original.approved ? 'True' : 'False'}
							</span>
						</>
					),
				}),
				columnHelper.display({
					id: 'toggleConfirm',
					header: 'Toggle',
					cell: (props) => (
						<>
							{props.row.original.approved ? (
								<FontAwesomeIcon
									className='ms-2 cursor-pointer'
									onClick={() =>
										handleApprove(
											props.row.original._id,
											props.row.original.approved
										)
									}
									icon={faToggleOn}
								/>
							) : (
								<FontAwesomeIcon
									className='ms-2 cursor-pointer'
									onClick={() =>
										handleApprove(
											props.row.original._id,
											props.row.original.approved
										)
									}
									icon={faToggleOff}
								/>
							)}
						</>
					),
				}),
				columnHelper.display({
					id: 'removeButton',
					header: 'Delete',

					cell: (props) => (
						<Button
							variant='transparent'
							onClick={() =>
								handleDelete(
									props.row.original.restaurantId,
									props.row.original.path,
									props.row.original._id
								)
							}
						>
							<FontAwesomeIcon icon={faTrashCan} />
						</Button>
					),
				}),
			],
		}),
	]
	return (
		<>
			{loading && <p>Loading photos...</p>}
			{data && <SortableTable columns={columns} data={data} />}
		</>
	)
}

export default ApproveImages

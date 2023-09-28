import { createColumnHelper } from '@tanstack/react-table'
import SortableTable from '../components/SortableTable'
import Button from 'react-bootstrap/Button'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faEdit,
	faTrashCan,
	faToggleOff,
	faToggleOn,
} from '@fortawesome/free-solid-svg-icons'

import { Restaurant } from '../types/Restaurant.types'

import useDelete from '../hooks/useDelete'
import useAdmin from '../hooks/useAdmin'

interface IProps {
	data: Restaurant[]
}

const SortedRestaurants: React.FC<IProps> = ({ data }) => {
	const { deleteRestaurant, deleteImgFromStorage, deleteImageFromImgCol } =
		useDelete()
	const columnHelper = createColumnHelper<Restaurant>()
	const { confirmedByAdmin } = useAdmin()

	const handleApprove = (id: string, isConfirmedByAdmin: boolean) => {
		try {
			confirmedByAdmin(id, isConfirmedByAdmin)
		} catch (error) {
			console.error('Error updating isConfirmedByAdmin:', error)
		}
	}

	const handleDelete = async (id: string, photo: string) => {
		deleteImageFromImgCol(id)
		deleteImgFromStorage(photo)
		await deleteRestaurant(id)
	}

	const columns = [
		columnHelper.group({
			id: 'confirmedGroup',
			header: () => null,

			columns: [
				columnHelper.accessor('name', {
					header: 'Name',
					cell: (props) => <span>{props.getValue()}</span>,
				}),
				columnHelper.accessor('address', {
					header: 'Adress',
					cell: (props) => <span> {props.getValue()}</span>,
				}),
				columnHelper.accessor('city', {
					header: 'City',
				}),
				columnHelper.accessor('category', {
					header: 'Category',
				}),

				columnHelper.accessor('isConfirmedByAdmin', {
					header: 'Approved',

					cell: (props) => (
						<>
							<span
								className={
									props.row.original.isConfirmedByAdmin
										? 'valid'
										: 'invalid'
								}
							>
								{props.row.original.isConfirmedByAdmin
									? 'True'
									: 'False'}
							</span>
						</>
					),
				}),
				columnHelper.display({
					id: 'toggleConfirm',
					header: 'Toggle',
					cell: (props) => (
						<>
							{props.row.original.isConfirmedByAdmin ? (
								<FontAwesomeIcon
									className='ms-2 cursor-pointer'
									onClick={() =>
										handleApprove(
											props.row.original._id,
											props.row.original
												.isConfirmedByAdmin
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
											props.row.original
												.isConfirmedByAdmin
										)
									}
									icon={faToggleOff}
								/>
							)}
						</>
					),
				}),
				columnHelper.display({
					id: 'editButton',
					header: 'Edit',
					cell: (props) => (
						<Button
							href={`restaurant/${props.row.original._id}?openModal=true`}
							variant='transparent'
						>
							<FontAwesomeIcon icon={faEdit} />
						</Button>
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
									props.row.original._id,
									props.row.original.photo
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
	return <>{data && <SortableTable columns={columns} data={data} />}</>
}
export default SortedRestaurants

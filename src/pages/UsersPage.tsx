import { createColumnHelper } from '@tanstack/react-table'
import SortableTable from '../components/SortableTable'
import { UsersData } from '../types/User.types'
import useGetUsers from '../hooks/useGetUsers'
import Image from 'react-bootstrap/Image'
import Dropdown from 'react-bootstrap/Dropdown'
import Form from 'react-bootstrap/Form'
import { usersCol } from '../services/firebase'
import { doc, updateDoc } from 'firebase/firestore'

const UsersPage = () => {
	const { data, loading } = useGetUsers()

	const handleIsAdminToggle = async (userId: string, isAdmin: boolean) => {
		try {
			const docRef = doc(usersCol, userId)

			await updateDoc(docRef, {
				isAdmin: !isAdmin,
			})
		} catch (error) {
			console.error('Error updating isAdmin:', error)
		}
	}

	const columnHelper = createColumnHelper<UsersData>()

	const columns = [
		// columnHelper.accessor('_uid', {
		// 	header: 'ID',
		// }),
		// columnHelper.group({
		// 	header: 'Users',
		// columns: [
		columnHelper.display({
			id: 'profileImage',
			header: 'Profile Image',
			cell: (props) => (
				<Image
					src={
						props.row.original.profileImage ||
						'https://placehold.co/100x100?text=Profile+Image'
					}
					alt='Profile'
					roundedCircle
					width={75}
					className='table-img'
				/>
			),
		}),
		columnHelper.accessor('name', {
			header: 'Name',
			cell: (props) => <span> {props.getValue()}</span>,
		}),
		columnHelper.accessor('email', {
			header: 'Email',
		}),
		columnHelper.display({
			id: 'isAdmin',
			header: 'Role',
			cell: (props) => (
				<Form.Select
					aria-label='Default select example'
					onChange={() =>
						handleIsAdminToggle(
							props.row.original._uid,
							props.row.original.isAdmin
						)
					}
				>
					<option>
						{props.row.original.isAdmin ? 'Admin' : 'User'}
					</option>
					<option>
						{props.row.original.isAdmin ? 'User' : 'Admin'}
					</option>
				</Form.Select>
				// <Dropdown className='admin-btn'>
				// 	<Dropdown.Toggle variant='transparent' id='dropdown-basic'>
				// 		{props.row.original.isAdmin ? 'Admin' : 'User'}
				// 	</Dropdown.Toggle>

				// 	<Dropdown.Menu>
				// 		<Dropdown.Item
				// 			onClick={() =>
				// 				handleIsAdminToggle(
				// 					props.row.original._uid,
				// 					props.row.original.isAdmin
				// 				)
				// 			}
				// 		>
				// 			{props.row.original.isAdmin ? 'User' : 'Admin'}
				// 		</Dropdown.Item>
				// 	</Dropdown.Menu>
				// </Dropdown>
			),
		}),
		// ],
		// }),
	]
	return (
		<>
			{loading && <p>Loading users...</p>}

			{data && <SortableTable columns={columns} data={data} />}
		</>
	)
}

export default UsersPage

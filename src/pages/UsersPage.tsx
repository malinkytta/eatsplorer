import { createColumnHelper } from '@tanstack/react-table'
import SortableTable from '../components/SortableTable'
import { UsersData } from '../types/Users.types'
import useGetUsers from '../hooks/useGetUsers'
import Image from 'react-bootstrap/Image'
import Dropdown from 'react-bootstrap/Dropdown'

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
			<Dropdown className='admin-btn'>
				<Dropdown.Toggle variant='transparent' id='dropdown-basic'>
					{props.row.original.isAdmin ? 'Admin' : 'User'}
				</Dropdown.Toggle>

				<Dropdown.Menu>
					<Dropdown.Item>
						{props.row.original.isAdmin ? 'User' : 'Admin'}
					</Dropdown.Item>
				</Dropdown.Menu>
			</Dropdown>
		),
	}),
	// ],
	// }),
]

const UsersPage = () => {
	const { data, loading } = useGetUsers()

	return (
		<>
			{loading && <p>Loading users...</p>}

			{data && <SortableTable columns={columns} data={data} />}
		</>
	)
}

export default UsersPage

import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import Container from 'react-bootstrap/Container'

import UsersPage from './UsersPage'
import SortedRestaurants from './SortedRestaurants'
import useGetRestaurants from '../hooks/useGetRestaurants'
import ApproveImages from './ApproveImages'
import useGetImages from '../hooks/useGetImages'

function AdminPage() {
	const { confirmedByAdminTrue, confirmedByAdminFalse } = useGetRestaurants()
	const { data } = useGetImages()

	if (!confirmedByAdminFalse.data || !confirmedByAdminTrue.data) {
		return <p> No data exists</p>
	}

	return (
		<Container>
			<h2 className='my-3'>Admin Page</h2>
			<Tabs
				defaultActiveKey='users'
				id='uncontrolled-tab-example'
				className='mb-3 admin-page '
			>
				<Tab eventKey='users' title='Users'>
					<h2>Users</h2>

					<UsersPage />
				</Tab>
				<Tab eventKey='restaurants' title='Restaurants'>
					{confirmedByAdminFalse.data.length > 0 && (
						<>
							<h2>Restaurants to confirm</h2>
							<SortedRestaurants
								data={confirmedByAdminFalse.data}
							/>
						</>
					)}
					<h2>Restaurants</h2>
					{confirmedByAdminTrue.data && (
						<SortedRestaurants data={confirmedByAdminTrue.data} />
					)}
				</Tab>
				<Tab eventKey='requests' title='Requests'>
					{!data || data.length === 0 ? (
						<h2>No data</h2>
					) : (
						<>
							<h2>Photos</h2>
							<ApproveImages />
						</>
					)}
				</Tab>
			</Tabs>
		</Container>
	)
}

export default AdminPage

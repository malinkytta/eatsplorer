import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import Container from 'react-bootstrap/Container'
import UsersPage from './UsersPage'
import SortedRestaurants from './SortedRestaurants'

function AdminPage() {
	return (
		<Container>
			<h2 className='my-3'>Admin Page</h2>
			<Tabs
				defaultActiveKey='profile'
				id='uncontrolled-tab-example'
				className='mb-3 admin-page '
			>
				<Tab eventKey='users' title='Users'>
					<UsersPage />
				</Tab>
				<Tab eventKey='restaurants' title='Restaurants'>
					<SortedRestaurants />
				</Tab>
			</Tabs>
		</Container>
	)
}

export default AdminPage

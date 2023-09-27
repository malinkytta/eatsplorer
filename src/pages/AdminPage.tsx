import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import Container from 'react-bootstrap/Container'
import UsersPage from './UsersPage'
import SortedRestaurants from './SortedRestaurants'
import useGetConfirmStatus from '../hooks/useGetConfirmStatus'
import ApproveImages from './ApproveImages'
import useGetImages from '../hooks/useGetImages'
import { ScaleLoader } from 'react-spinners'

const AdminPage = () => {
	const { confirmedByAdminTrue, confirmedByAdminFalse } =
		useGetConfirmStatus()
	const { data } = useGetImages()

	if (!confirmedByAdminFalse.data || !confirmedByAdminTrue.data) {
		return (
			<div className='loader'>
				<ScaleLoader color={'#888'} speedMultiplier={1.1} />
			</div>
		)
	}

	return (
		<div className='admin-page'>
			<Container className='pt-5'>
				<h2 className='my-3'>Admin Page</h2>
				<Tabs defaultActiveKey='users' id='uncontrolled-tab-example'>
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
							<SortedRestaurants
								data={confirmedByAdminTrue.data}
							/>
						)}
					</Tab>
					<Tab eventKey='photos' title='Photos'>
						{!data || data.length === 0 ? (
							<h2>No photos</h2>
						) : (
							<>
								<h2>Photos</h2>
								<ApproveImages />
							</>
						)}
					</Tab>
				</Tabs>
			</Container>
		</div>
	)
}

export default AdminPage

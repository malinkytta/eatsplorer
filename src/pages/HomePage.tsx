import useGetRestaurants from '../hooks/useGetRestaurants'
import Map from '../components/Map'
import useAuth from '../hooks/useAuth'

import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Offcanvas from 'react-bootstrap/Offcanvas'
import Form from 'react-bootstrap/Form'

const HomePage = () => {
	const { currentUser } = useAuth()
	const [show, setShow] = useState(false)
	const handleClose = () => setShow(false)
	const handleShow = () => setShow(true)

	const { data: restaurants } = useGetRestaurants()
	console.log('currentUser:', currentUser)
	if (!restaurants) return <p>No restaurants for u m8</p>

	return (
		<>
			{/* <div className='search'>
				<Form className='d-flex justify-content-around'>
					<Form.Control
						type='search'
						placeholder='Search'
						className='me-2'
						aria-label='Search'
					/>
					<Button
						variant='transparent'
						onClick={handleShow}
						className={'map-btn'}
					>
						🔍
					</Button>
				</Form>
			</div>

			<Offcanvas
				show={show}
				onHide={handleClose}
				scroll
				backdrop={false}
				className='offcanvas-custom'
			>
				<Offcanvas.Header
					className='justify-content-end'
					closeButton
				></Offcanvas.Header>
				<Offcanvas.Body>Restaurants</Offcanvas.Body>
			</Offcanvas> */}
			{/* <h1>hej!!</h1> */}

			<Map restaurants={restaurants} />
		</>
	)
}

export default HomePage

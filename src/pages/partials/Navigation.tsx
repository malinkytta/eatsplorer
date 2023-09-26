import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Image from 'react-bootstrap/Image'
import NavDropdown from 'react-bootstrap/NavDropdown'
import { Link, NavLink, useLocation } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'

const Navigation = () => {
	const { currentUser, userEmail, userName, userPhotoUrl, admin } = useAuth()
	const location = useLocation()

	const navbarClass =
		location.pathname === '/signup' || location.pathname === '/login'
			? 'transparent-navbar'
			: 'standard-navbar'

	return (
		<Navbar expand='sm' data-bs-theme='dark' className={navbarClass}>
			<Container>
				<Navbar.Brand as={Link} to='/'>
					Eatsplorer
				</Navbar.Brand>
				<Navbar.Toggle aria-controls='basic-navbar-nav' />
				<Navbar.Collapse id='basic-navbar-nav'>
					<Nav className='ms-auto'>
						<>
							{currentUser ? (
								<>
									<Nav.Link
										as={NavLink}
										to='/create-restaurant'
									>
										Add Restaurant
									</Nav.Link>
									<NavDropdown
										title={
											userPhotoUrl ? (
												<Image
													src={userPhotoUrl}
													height={30}
													width={30}
													title={
														(userName ||
															userEmail) ??
														''
													}
													className='img-square profileImage'
													roundedCircle
													fluid
												/>
											) : (
												userName || userEmail
											)
										}
									>
										{admin && (
											<NavDropdown.Item
												as={NavLink}
												to='/admin'
											>
												Admin
											</NavDropdown.Item>
										)}
										<NavDropdown.Item
											as={NavLink}
											to='/edit-profile'
										>
											Edit profile
										</NavDropdown.Item>
										<NavDropdown.Item
											as={NavLink}
											to='/logout'
										>
											Logout
										</NavDropdown.Item>
									</NavDropdown>
								</>
							) : (
								<>
									<Nav.Link as={NavLink} to='/signup'>
										Sign Up
									</Nav.Link>
									<Nav.Link as={NavLink} to='/login'>
										Log In
									</Nav.Link>
								</>
							)}
						</>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	)
}

export default Navigation

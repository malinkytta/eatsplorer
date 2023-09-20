import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Image from 'react-bootstrap/Image'
//import NavDropdown from 'react-bootstrap/NavDropdown'
import { Link, NavLink } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import { NavDropdown } from 'react-bootstrap'

const Navigation = () => {
	const { currentUser, userEmail, userName, userPhotoUrl } = useAuth()
	return (
		<Navbar
			expand='lg'
			bg='dark'
			data-bs-theme='dark'
			className='bg-body-tertiary'
		>
			<Container>
				<Navbar.Brand as={Link} to='/'>
					React-Bootstrap
				</Navbar.Brand>
				<Navbar.Toggle aria-controls='basic-navbar-nav' />
				<Navbar.Collapse id='basic-navbar-nav'>
					<Nav className='ms-auto'>
						{currentUser ? (
							<>
								<NavDropdown
									title={
										userPhotoUrl ? (
											<Image
												src={userPhotoUrl}
												height={30}
												width={30}
												title={
													(userName || userEmail) ??
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
									<NavDropdown.Item>
										Placeholder
									</NavDropdown.Item>
									<NavDropdown.Divider />
									<NavDropdown.Item
										as={NavLink}
										to='/edit-profile'
									>
										Edit profile
									</NavDropdown.Item>
									<NavDropdown.Divider />
									<NavDropdown.Item as={NavLink} to='/logout'>
										Logout
									</NavDropdown.Item>
								</NavDropdown>
							</>
						) : (
							<>
								<Nav.Link as={NavLink} to='/signup'>
									Sign up
								</Nav.Link>
								<Nav.Link as={NavLink} to='/login'>
									Log in
								</Nav.Link>
							</>
						)}
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	)
}

export default Navigation

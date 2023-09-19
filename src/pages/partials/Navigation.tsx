import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
//import NavDropdown from 'react-bootstrap/NavDropdown'
import { Link, NavLink } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import { NavDropdown } from 'react-bootstrap'

const Navigation = () => {
	const { currentUser, userEmail, admin } = useAuth()

	return (
		<Navbar
			expand='md'
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
						<>
							{currentUser ? (
								<NavDropdown title={userEmail}>
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
										to='/update-profile'
									>
										Update Profile
									</NavDropdown.Item>
									<NavDropdown.Item as={NavLink} to='/logout'>
										Logout
									</NavDropdown.Item>
								</NavDropdown>
							) : (
								<>
									<Nav.Link as={NavLink} to='/signup'>
										Sign In
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

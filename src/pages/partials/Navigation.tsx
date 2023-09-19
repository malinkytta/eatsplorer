import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
//import NavDropdown from 'react-bootstrap/NavDropdown'
import { Link, NavLink } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import { NavDropdown } from 'react-bootstrap'

const Navigation = () => {
	const { currentUser, userEmail } = useAuth()
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
								<NavDropdown title={userEmail}>
									<NavDropdown.Item>
										Placeholder
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

import { useEffect } from 'react'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import { useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const LogoutPage = () => {
	const navigate = useNavigate()
	const { logout } = useAuth()

	useEffect(() => {
		const logoutUser = async () => {
			await logout()
			navigate('/login')
		}
		logoutUser()
	}, [logout, navigate])

	return (
		<Container>
			<Row>
				<Col md={{ span: 6, offset: 3 }}>
					<Card>
						<Card.Body>
							<Card.Text>
								You are now being logged out..
							</Card.Text>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Container>
	)
}

export default LogoutPage

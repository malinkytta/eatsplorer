import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
import { Link } from 'react-router-dom'

interface IProps {
	children: React.ReactNode
}
export const ErrorModal: React.FC<IProps> = ({ children }) => {
	return (
		<Modal show={true}>
			<Alert
				variant='warning'
				className='d-flex flex-column py-4 px-4 align-items-center'
			>
				{children}
				<div>
					<Link to={'/'}>
						<Button className='mt-3' variant='dark'>
							Go Back Home
						</Button>
					</Link>
				</div>
			</Alert>
		</Modal>
	)
}

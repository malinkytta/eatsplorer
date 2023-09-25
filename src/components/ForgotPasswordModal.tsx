import React from 'react'
import Modal from 'react-bootstrap/Modal'

interface IProps {
	show: boolean
	children: React.ReactNode
}
const ForgotPasswordModal: React.FC<IProps> = ({ show, children }) => {
	return <Modal show={show}>{children}</Modal>
}

export default ForgotPasswordModal

import React from 'react'
import { Navigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

interface Iprops {
	children: React.ReactNode
	redirectTo?: string
}

const RequireAdmin: React.FC<Iprops> = ({
	children,
	redirectTo = '/login',
}) => {
	const { admin } = useAuth()

	return admin ? <>{children}</> : <Navigate to={redirectTo} />
}

export default RequireAdmin

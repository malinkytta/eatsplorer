import React from 'react'
import { Navigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

interface IRequireAuthProps {
	children: React.ReactNode
	redirectTo?: string
}

const RequireAuth: React.FC<IRequireAuthProps> = ({
	children,
	redirectTo = '/login',
}) => {
	const { currentUser } = useAuth()

	return currentUser ? <>{children}</> : <Navigate to={redirectTo} />
}

export default RequireAuth

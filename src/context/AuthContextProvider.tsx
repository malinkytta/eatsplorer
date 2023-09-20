import {
	UserCredential,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	onAuthStateChanged,
	User,
	signOut,
	sendPasswordResetEmail,
	updatePassword,
	updateProfile,
} from 'firebase/auth'
import { createContext, useEffect, useState } from 'react'
import { auth } from '../services/firebase'
import { ScaleLoader } from 'react-spinners'

type AuthContextType = {
	currentUser: User | null
	login: (email: string, password: string) => Promise<UserCredential>
	signup: (email: string, password: string) => Promise<UserCredential>
	logout: () => Promise<void>
	resetPassword: (email: string) => Promise<void>
	reloadUser: () => Promise<boolean>
	setDisplayName: (displayName: string) => Promise<void>
	setPassword: (password: string) => Promise<void>
	setPhotoUrl: (photoURL: string) => Promise<void>
	userName: string | null
	userPhotoUrl: string | null
	userEmail: string | null
}

export const AuthContext = createContext<AuthContextType | null>(null)

type AuthContextProps = {
	children: React.ReactNode
}
const AuthContextProvider: React.FC<AuthContextProps> = ({ children }) => {
	const [currentUser, setCurrentUser] = useState<User | null>(null)
	const [loading, setLoading] = useState(true)
	const [userEmail, setUserEmail] = useState<string | null>(null)
	const [userName, setUserName] = useState<string | null>(null)
	const [userPhotoUrl, setUserPhotoUrl] = useState<string | null>(null)

	const login = (email: string, password: string) => {
		return signInWithEmailAndPassword(auth, email, password)
	}

	const logout = () => {
		return signOut(auth)
	}

	const signup = (email: string, password: string) => {
		return createUserWithEmailAndPassword(auth, email, password)
	}

	const reloadUser = async () => {
		if (!auth.currentUser) {
			return false
		}

		setUserName(auth.currentUser.displayName)
		setUserEmail(auth.currentUser.email)
		setUserPhotoUrl(auth.currentUser.photoURL)
		console.log('Reloaded user', auth.currentUser)
		return true
	}

	const resetPassword = (email: string) => {
		return sendPasswordResetEmail(auth, email, {
			url: window.location.origin + '/login',
		})
	}

	const setPassword = (password: string) => {
		if (!currentUser) {
			throw new Error('Current User is null!')
		}
		return updatePassword(currentUser, password)
	}

	const setDisplayName = (displayName: string) => {
		if (!currentUser) {
			throw new Error('Current User is null!')
		}
		return updateProfile(currentUser, { displayName })
	}

	const setPhotoUrl = (photoURL: string) => {
		if (!currentUser) {
			throw new Error('Current User is null!')
		}
		setUserPhotoUrl(photoURL)
		return updateProfile(currentUser, { photoURL })
	}

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			setCurrentUser(user)

			if (user) {
				setUserEmail(user.email)
				setUserName(user.displayName)
				setUserPhotoUrl(user.photoURL)
			} else {
				setUserEmail(null)
				setUserName(null)
				setUserPhotoUrl(null)
			}
			setLoading(false)
		})

		return unsubscribe
	}, [])

	return (
		<AuthContext.Provider
			value={{
				currentUser,
				login,
				logout,
				resetPassword,
				reloadUser,
				setDisplayName,
				setPassword,
				setPhotoUrl,
				signup,
				userEmail,
				userName,
				userPhotoUrl,
			}}
		>
			{loading ? (
				<div id='initial-loader'>
					<ScaleLoader color={'#888'} speedMultiplier={1.1} />
				</div>
			) : (
				<>{children}</>
			)}
		</AuthContext.Provider>
	)
}

export default AuthContextProvider

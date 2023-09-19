import {
	UserCredential,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	onAuthStateChanged,
	User,
	signOut,
	sendPasswordResetEmail,
	updateProfile,
} from 'firebase/auth'
import { createContext, useEffect, useState } from 'react'
import { auth, usersCol } from '../services/firebase'
import { ScaleLoader } from 'react-spinners'
import { doc, getDoc, setDoc } from 'firebase/firestore'

type AuthContextType = {
	currentUser: User | null
	login: (email: string, password: string) => Promise<UserCredential>
	admin: boolean
	signup: (
		name: string,
		email: string,
		password: string
	) => Promise<UserCredential>
	logout: () => Promise<void>
	resetPassword: (email: string) => Promise<void>
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
	const [admin, setAdmin] = useState<boolean>(false)

	const login = (email: string, password: string) => {
		return signInWithEmailAndPassword(auth, email, password)
	}

	const logout = () => {
		return signOut(auth)
	}

	const signup = async (name: string, email: string, password: string) => {
		const userCredentials = await createUserWithEmailAndPassword(
			auth,
			email,
			password
		)

		const docRef = doc(usersCol, userCredentials.user.uid)

		await setDoc(docRef, {
			_uid: userCredentials.user.uid,
			name: name,
			email: email,
			isAdmin: false,
			profileImage: null,
		})
		return userCredentials
	}

	const resetPassword = (email: string) => {
		return sendPasswordResetEmail(auth, email, {
			url: window.location.origin + '/login',
		})
	}

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, async (user) => {
			setCurrentUser(user)

			if (user) {
				// User is logged in
				setUserEmail(user.email)
				const docRef = doc(usersCol, user.uid)
				const docSnap = await getDoc(docRef)
				if (docSnap.exists()) {
					const isAdminValue = docSnap.data().isAdmin
					setAdmin(isAdminValue)
				}
			} else {
				setUserEmail(null)
				setAdmin(false)
			}
			setLoading(false)
		})

		return unsubscribe
	}, [])

	return (
		<AuthContext.Provider
			value={{
				currentUser,
				admin,
				login,
				logout,
				resetPassword,
				signup,
				userEmail,
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

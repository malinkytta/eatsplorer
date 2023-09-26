import {
	UserCredential,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	onAuthStateChanged,
	User,
	signOut,
	sendPasswordResetEmail,
	updateProfile,
	updatePassword,
} from 'firebase/auth'
import { createContext, useEffect, useState } from 'react'
import { auth, storage, usersCol } from '../services/firebase'
import { ScaleLoader } from 'react-spinners'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'

type AuthContextType = {
	currentUser: User | null
	login: (email: string, password: string) => Promise<UserCredential>
	admin: boolean

	signup: (
		email: string,
		password: string,
		name: string,
		photoFile: string | null
	) => Promise<UserCredential>
	logout: () => Promise<void>
	resetPassword: (email: string) => Promise<void>
	reloadUser: () => Promise<boolean>
	setDisplayName: (user: User, displayName: string) => Promise<void>
	setPassword: (password: string) => Promise<void>
	setPhotoUrl: (user: User, photoURL: string | FileList) => Promise<string>
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
	const [admin, setAdmin] = useState<boolean>(false)
	const [userName, setUserName] = useState<string | null>(null)
	const [userPhotoUrl, setUserPhotoUrl] = useState<string | null>(null)

	const login = (email: string, password: string) => {
		return signInWithEmailAndPassword(auth, email, password)
	}

	const logout = () => {
		return signOut(auth)
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
	const signup = async (
		email: string,
		password: string,
		name: string,
		photoFile: string | null
	) => {
		const userCredentials = await createUserWithEmailAndPassword(
			auth,
			email,
			password
		)
		await setDisplayName(userCredentials.user, name)

		if (photoFile?.length === 1) {
			await setPhotoUrl(userCredentials.user, photoFile)
		}

		const docRef = doc(usersCol, userCredentials.user.uid)
		await setDoc(docRef, {
			_uid: userCredentials.user.uid,
			name,
			email,
			isAdmin: false,
			photoFile: userCredentials.user.photoURL,
		})

		reloadUser()

		return userCredentials
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

	const setDisplayName = (user: User, displayName: string) => {
		return updateProfile(user, { displayName })
	}

	const setPhotoUrl = async (user: User, photoURL: string | FileList) => {
		let updatedPhotoURL = ''

		if (typeof photoURL === 'string') {
			updatedPhotoURL = photoURL
		} else if (photoURL instanceof FileList && photoURL.length > 0) {
			const photoFile = photoURL[0]

			const fileRef = ref(storage, `photos/${user.uid}/${photoFile.name}`)
			const uploadResult = await uploadBytes(fileRef, photoFile)

			updatedPhotoURL = await getDownloadURL(uploadResult.ref)
		} else {
			throw new Error('Ogiltig photoURL.')
		}

		await updateProfile(user, {
			photoURL: updatedPhotoURL,
		})

		setUserPhotoUrl(updatedPhotoURL)

		return updatedPhotoURL
	}

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, async (user) => {
			setCurrentUser(user)

			if (user) {
				setUserName(user.displayName)
				setUserPhotoUrl(user.photoURL)
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
				admin,
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

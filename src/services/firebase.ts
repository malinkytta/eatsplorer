// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import {
	CollectionReference,
	DocumentData,
	collection,
	getFirestore,
} from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import { UsersData, NewUser } from '../types/User.types'
import { Restaurant, RestaurantImage } from '../types/Restaurant.types'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
	authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
	projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
	storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
	appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Get Auth instance
export const auth = getAuth(app)

// Get Firestore instance
export const db = getFirestore(app)

// Get Storage instance
export const storage = getStorage(app)

const createCollection = <T = DocumentData>(collectionName: string) => {
	return collection(db, collectionName) as CollectionReference<T>
}

export const usersCol = createCollection<UsersData>('users')

export const restaurantCol = createCollection<Restaurant>('restaurants')
export const restaurantImageCol =
	createCollection<RestaurantImage>('restaurants')
export const newUsersCol = createCollection<NewUser>('users')

export default app

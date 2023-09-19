import useStreamCollection from './useStreamCollection'
import { usersCol } from '../services/firebase'
import { UsersData } from '../types/User.types'
import { orderBy } from 'firebase/firestore'

const useGetUsers = () => {
	return useStreamCollection<UsersData>(usersCol, orderBy('isAdmin', 'desc'))
}

export default useGetUsers

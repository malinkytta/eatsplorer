export type NewUserCredentials = {
	name: string
	email: string
	password: string
	confirmPassword: string
	photoFile: string | null
}

export type LoginCredentials = {
	email: string
	password: string
}

export type ForgotPasswordType = {
	email: string
}

export type NewUser = {
	_uid: string
	name: string
	email: string
	isAdmin: boolean
	// photoFile: string | null
	photoFile: FileList | null
}

export type UsersData = {
	_uid: string
	name: string
	photoFile: string | null
	email: string
	isAdmin: boolean
}

export type UserLocation = {
	lat: number
	lng: number
}

export type UpdateProfileFormData = {
	_uid: string
	name: string
	photoFile: FileList
	isAdmin: boolean
	email: string
	password: string
	passwordConfirm: string
}

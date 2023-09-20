export type NewUserCredentials = {
	name: string
	email: string
	password: string
	confirmPassword: string
	photoFile: FileList | null
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
	isAdmin: false
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
	name: string
	photoFile: FileList
	email: string
	password: string
	passwordConfirm: string
}

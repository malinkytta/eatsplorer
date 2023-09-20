export type NewUserCredentials = {
	name: string
	email: string
	password: string
	confirmPassword: string
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
	profileImage: FileList | null
}

export type UsersData = {
	_uid: number
	name: string
	profileImage: string | null
	email: string
	isAdmin: boolean
}

export type UpdateProfileFormData = {
	name: string
	photoFile: FileList
	email: string
	password: string
	passwordConfirm: string
}

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
    //_uid: string
    name: string
    email: string
    isAdmin: false
    profileImage: FileList | null
}
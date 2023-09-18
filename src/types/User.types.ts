export type NewUserCredentials = {
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
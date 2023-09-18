import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Navigation from './pages/partials/Navigation'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import ForgotPasswordPage from './pages/ForgotPasswordPage'
import './assets/scss/App.scss'
import LogoutPage from './pages/LogoutPage'

const App = () => {
	return (
		<>
			<Navigation />
			<Routes>
				<Route path='/' element={<HomePage />} />
				<Route path='/signup' element={<SignupPage />} />
				<Route path='/login' element={<LoginPage />} />
				<Route path='/logout' element={<LogoutPage />} />
				<Route
					path='/forgot-password'
					element={<ForgotPasswordPage />}
				/>
			</Routes>
		</>
	)
}

export default App

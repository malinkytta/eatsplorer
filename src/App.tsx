import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Navigation from './pages/partials/Navigation'
import AdminPage from './pages/AdminPage'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import ForgotPasswordPage from './pages/ForgotPasswordPage'
import './assets/scss/App.scss'
import LogoutPage from './pages/LogoutPage'
import RequireAuth from './components/RequireAuth'
import NotFoundPage from './pages/NotFoundPage'

const App = () => {
	return (
		<>
			<Navigation />
			<Routes>
				<Route path='*' element={<NotFoundPage />} />
				<Route path='/' element={<HomePage />} />
				<Route path='/admin' element={<AdminPage />} />
				<Route path='/signup' element={<SignupPage />} />
				<Route path='/login' element={<LoginPage />} />
				<Route
					path='/logout'
					element={
						<RequireAuth>
							<LogoutPage />
						</RequireAuth>
					}
				/>
				<Route
					path='/forgot-password'
					element={<ForgotPasswordPage />}
				/>
			</Routes>
		</>
	)
}

export default App

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
import RequireAdmin from './components/RequireAdmin'
import CreateRestaurantPage from './pages/CreateRestaurantPage'

const App = () => {
	return (
		<>
			<Navigation />
			<Routes>
				{/* Guest Routes */}
				<Route path='*' element={<NotFoundPage />} />
				<Route path='/' element={<HomePage />} />
				<Route path='/signup' element={<SignupPage />} />
				<Route path='/login' element={<LoginPage />} />

				{/* Auth Routes */}
				<Route
					path='/logout'
					element={
						<RequireAuth>
							<LogoutPage />
						</RequireAuth>
					}
				/>
				<Route
					path='/create-restaurant'
					element={
						<RequireAuth>
							<CreateRestaurantPage />
						</RequireAuth>
					}
				/>

				<Route
					path='/forgot-password'
					element={<ForgotPasswordPage />}
				/>

				{/* Admin Routes */}
				<Route
					path='/admin'
					element={
						<RequireAdmin>
							<AdminPage />
						</RequireAdmin>
					}
				/>
			</Routes>
		</>
	)
}

export default App

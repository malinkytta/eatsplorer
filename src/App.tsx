import { Routes, Route, useLocation } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Navigation from './pages/partials/Navigation'
import AdminPage from './pages/AdminPage'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import ForgotPasswordPage from './pages/ForgotPasswordPage'
import LogoutPage from './pages/LogoutPage'
import RequireAuth from './components/RequireAuth'
import NotFoundPage from './pages/NotFoundPage'
import RequireAdmin from './components/RequireAdmin'
import CreateRestaurantPage from './pages/CreateRestaurantPage'
import EditProfilePage from './pages/EditProfilePage'
import SingleRestaurantPage from './pages/SingleRestaurantPage'

import './assets/scss/App.scss'

const App = () => {
	const location = useLocation()

	const queryParams = new URLSearchParams(location.search)
	const openModal = queryParams.get('openModal')

	return (
		<>
			<Navigation />
			<Routes>
				{/* Guest Routes */}
				<Route path='*' element={<NotFoundPage />} />
				<Route path='/' element={<HomePage />} />
				<Route path='/signup' element={<SignupPage />} />
				<Route path='/login' element={<LoginPage />} />
				{!openModal && (
					<Route
						path='/:id'
						element={
							<RequireAdmin>
								<SingleRestaurantPage />
							</RequireAdmin>
						}
					/>
				)}
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
					path='/edit-profile'
					element={
						<RequireAuth>
							<EditProfilePage />
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
				{openModal && (
					<Route
						path='/:id'
						element={
							<RequireAdmin>
								<SingleRestaurantPage />
							</RequireAdmin>
						}
					/>
				)}
			</Routes>
		</>
	)
}

export default App

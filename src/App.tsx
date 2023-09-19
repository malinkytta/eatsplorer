import { Routes, Route } from 'react-router-dom'
import './assets/scss/App.scss'

import React from 'react'
import HomePage from './pages/HomePage'
import Navigation from './pages/partials/Navigation'
import AdminPage from './pages/AdminPage'

const App = () => {
	return (
		<>
			<Navigation />
			<Routes>
				<Route path='/' element={<HomePage />} />
				<Route path='/admin' element={<AdminPage />} />
			</Routes>
		</>
	)
}

export default App

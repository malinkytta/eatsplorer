import { Routes, Route } from 'react-router-dom'
import './assets/scss/App.scss'

import React from 'react'
import HomePage from './pages/HomePage'
import Navigation from './pages/partials/Navigation'

const App = () => {
	return (
		<>
			<Navigation />
			<Routes>
				<Route path='/' element={<HomePage />} />
			</Routes>
		</>
	)
}

export default App

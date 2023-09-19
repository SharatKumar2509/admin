import React, { Component } from 'react'
import {
	BrowserRouter,
	Navigate,
	Outlet,
	Route,
	Routes,
} from 'react-router-dom'

import Blogs from './components/Blogs/Blogs';
import Portfolio from './components/Portfolio/Portfolio';
import Statistics from './components/Statistics/Statistics';
import Testimonials from './components/Testimonials/Testimonials';
import Account from './components/Account/Account';
import Login from './components/Login/Login';

function ProtectedRoute() {
	let isLoggedIn = localStorage.getItem("isLoggedIn");
	return (
		isLoggedIn !== "true" ? <Navigate to="/login" /> : <Outlet />
	)
}

function UnprotectedRoute() {
	let isLoggedIn = localStorage.getItem("isLoggedIn");
	return (
		isLoggedIn === "true" ? <Navigate to="/blogs" /> : <Outlet />
	)
}

function RedirectRoute() {
	return (
		<Navigate to="/login" />
	)
}

export default class App extends Component {
	render() {
		return (
			<>
				<BrowserRouter>
					<Routes>
						<Route path="/" element={<RedirectRoute />} />
						<Route element={<UnprotectedRoute />}>
							<Route path="/login" element={<Login />} />
						</Route>
						<Route element={<ProtectedRoute />}>
							<Route path="/blogs" element={<Blogs />} />
							<Route path="/case-studies" element={<Portfolio />} />
							<Route path="/statistics" element={<Statistics />} />
							<Route path="/testimonials" element={<Testimonials />} />
							<Route path="/account" element={<Account />} />
						</Route>
						{/* <Route path="*" element={<NotFound />} /> */}
					</Routes>
				</BrowserRouter>
			</>
		)
	}
}

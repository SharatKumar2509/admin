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
		isLoggedIn !== "true" ? <Navigate to="/admin/login" /> : <Outlet />
	)
}

function UnprotectedRoute() {
	let isLoggedIn = localStorage.getItem("isLoggedIn");
	return (
		isLoggedIn === "true" ? <Navigate to="/admin/blogs" /> : <Outlet />
	)
}

function RedirectRoute() {
	return (
		<Navigate to="/admin/login" />
	)
}

export default class App extends Component {
	render() {
		return (
			<>
				<BrowserRouter>
					<Routes>
						<Route path="/admin" element={<RedirectRoute />} />
						<Route element={<UnprotectedRoute />}>
							<Route path="/admin/login" element={<Login />} />
						</Route>
						<Route element={<ProtectedRoute />}>
							<Route path="/admin/blogs" element={<Blogs />} />
							<Route path="/admin/portfolio" element={<Portfolio />} />
							<Route path="/admin/statistics" element={<Statistics />} />
							<Route path="/admin/testimonials" element={<Testimonials />} />
							<Route path="/admin/account" element={<Account />} />
						</Route>
						{/* <Route path="*" element={<NotFound />} /> */}
					</Routes>
				</BrowserRouter>
			</>
		)
	}
}

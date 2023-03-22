import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom'

import Layout from './components/Layout'
import Employees from './components/Employees'
import SignUp from './components/SignUp'
import SignIn from './components/SignIn'
import { refreshToken } from './store/reducers/actionCreators'
import { useDispatch } from 'react-redux'
import Users from './components/Users'
import Departments from './components/Departments'
import { useEffect } from 'react'
import PrivateRoutes from './components/PrivateRoutes'
import Profile from './components/Profile'

const App = () => {
	const dispatch = useDispatch()

	useEffect(() => {
		if (localStorage.getItem('token')) {
			dispatch(refreshToken())
		}
	}, [])

	const router = createBrowserRouter(
		createRoutesFromElements(
			<Route to="/" element={<Layout />}>
				<Route path="/sign-in" element={<SignIn />} />
				<Route path="/sign-up" element={<SignUp />} />
				<Route element={<PrivateRoutes auth={!!localStorage.getItem('token')} />}>
					<Route index element={<Users />} />
					<Route path="/employees" element={<Employees />} />
					<Route path="/departments" element={<Departments />} />
					<Route path="/profile" element={<Profile />} />
				</Route>
			</Route>
		)
	)

	return (
		<div className="App">
			<RouterProvider router={router} />
		</div>
	)
}

export default App

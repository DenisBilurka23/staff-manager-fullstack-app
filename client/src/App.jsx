import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom'

import Layout from './components/Layout'
import Employees from './components/Employees'
import Home from './components/Home'
import SignUp from './components/SignUp'
import SignIn from './components/SignIn'
import { fetchDepartments, fetchEmployees, fetchUsers } from './store/reducers/actionCreators'
import { useDispatch } from 'react-redux'
import Users from './components/Users'
import Departments from './components/Departments'

const App = () => {
	const dispatch = useDispatch()
	const getEmployeesHandler = () => dispatch(fetchEmployees())
	const getUsersHandler = () => dispatch(fetchUsers())
	const getDepartmentsHandler = () => dispatch(fetchDepartments())

	const router = createBrowserRouter(
		createRoutesFromElements(
			<Route to="/" element={<Layout />}>
				<Route path="/sign-in" element={<SignIn />} />
				<Route path="/sign-up" element={<SignUp />} />
				<Route index element={<Home />} />
				<Route path="/employees" element={<Employees />} loader={getEmployeesHandler} />
				<Route path="/users" element={<Users />} loader={getUsersHandler} />
				<Route path="/departments" element={<Departments />} loader={getDepartmentsHandler} />
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

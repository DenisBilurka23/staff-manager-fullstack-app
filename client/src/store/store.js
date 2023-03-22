import { combineReducers, configureStore } from '@reduxjs/toolkit'
import employees from './reducers/employeesSlice'
import users from './reducers/usersSlice'
import departments from './reducers/departmentsSlice'
import auth from './reducers/authSlice'

const rootReducer = combineReducers({
	employees,
	users,
	departments,
	auth
})

export const setupStore = () => {
	return configureStore({
		reducer: rootReducer
	})
}

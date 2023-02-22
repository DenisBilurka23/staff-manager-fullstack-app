import { combineReducers, configureStore } from '@reduxjs/toolkit'
import employeesSlice from './reducers/employeesSlice'
import usersSlice from './reducers/usersSlice'
import departmentsSlice from './reducers/departmentsSlice'

const rootReducer = combineReducers({
	employeesSlice,
	usersSlice,
	departmentsSlice
})

export const setupStore = () => {
	return configureStore({
		reducer: rootReducer
	})
}

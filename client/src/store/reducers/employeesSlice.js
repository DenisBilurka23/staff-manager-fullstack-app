import { createSlice } from '@reduxjs/toolkit'
import { fetchEmployees } from './actionCreators'

const initialState = {
	employees: null,
	error: null
}

export const employeesSlice = createSlice({
	name: 'employees',
	initialState,
	extraReducers: {
		[fetchEmployees.fulfilled.type]: (state, action) => {
			state.employees = action.payload
		},
		[fetchEmployees.rejected]: (state, action) => {
			state.error = action.payload
		}
	}
})

export default employeesSlice.reducer

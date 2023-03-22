import { createSlice } from '@reduxjs/toolkit'
import { fetchEmployees } from './actionCreators'

const initialState = {
	employees: null,
	error: null,
	loading: false
}

export const employeesSlice = createSlice({
	name: 'employees',
	initialState,
	extraReducers: {
		[fetchEmployees.pending.type]: state => {
			state.loading = true
		},
		[fetchEmployees.fulfilled.type]: (state, action) => {
			state.employees = action.payload
			state.loading = false
		},
		[fetchEmployees.rejected.type]: (state, action) => {
			state.error = action.payload
			state.loading = false
		}
	}
})

export default employeesSlice.reducer

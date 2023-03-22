import { createSlice } from '@reduxjs/toolkit'
import { fetchDepartments } from './actionCreators'

const initialState = {
	departments: null,
	loading: false,
	error: null
}

export const departmentsSlice = createSlice({
	name: 'users',
	initialState,
	extraReducers: {
		[fetchDepartments.pending.type]: state => {
			state.loading = true
		},
		[fetchDepartments.fulfilled.type]: (state, action) => {
			state.departments = action.payload
			state.loading = false
		},
		[fetchDepartments.rejected.type]: (state, action) => {
			state.error = action.payload
			state.loading = false
		}
	}
})

export default departmentsSlice.reducer

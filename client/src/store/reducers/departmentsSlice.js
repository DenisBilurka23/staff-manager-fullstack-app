import { createSlice } from '@reduxjs/toolkit'
import { fetchDepartments } from './actionCreators'

const initialState = {
	users: null,
	error: null
}

export const departmentsSlice = createSlice({
	name: 'users',
	initialState,
	extraReducers: {
		[fetchDepartments.fulfilled.type]: (state, action) => {
			state.employees = action.payload
		},
		[fetchDepartments.rejected]: (state, action) => {
			state.error = action.payload
		}
	}
})

export default departmentsSlice.reducer

import { createSlice } from '@reduxjs/toolkit'
import { fetchUsers } from './actionCreators'

const initialState = {
	users: null,
	error: null
}

export const usersSlice = createSlice({
	name: 'users',
	initialState,
	extraReducers: {
		[fetchUsers.fulfilled.type]: (state, action) => {
			state.employees = action.payload
		},
		[fetchUsers.rejected]: (state, action) => {
			state.error = action.payload
		}
	}
})

export default usersSlice.reducer

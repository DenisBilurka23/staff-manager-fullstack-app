import { createSlice } from '@reduxjs/toolkit'
import { fetchUsers } from './actionCreators'

const initialState = {
	users: null,
	error: null,
	loading: false
}

export const usersSlice = createSlice({
	name: 'users',
	initialState,
	extraReducers: {
		[fetchUsers.pending.type]: state => {
			state.loading = true
		},
		[fetchUsers.fulfilled.type]: (state, action) => {
			state.users = action.payload
			state.loading = false
		},
		[fetchUsers.rejected.type]: (state, action) => {
			state.error = action.payload
			state.loading = false
		}
	}
})

export default usersSlice.reducer

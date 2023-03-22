import { createSlice } from '@reduxjs/toolkit'
import { logout, refreshToken, signIn, signUp } from './actionCreators'

const initialState = {
	user: null,
	loading: false,
	errors: null
}

export const usersSlice = createSlice({
	name: 'users',
	initialState,
	extraReducers: {
		[signIn.fulfilled.type]: (state, action) => {
			state.user = action.payload
			state.loading = false
			localStorage.setItem('token', action.payload.accessToken)
		},
		[signIn.pending.type]: state => {
			state.loading = true
		},
		[signIn.rejected.type]: (state, action) => {
			state.errors = action.payload
			state.loading = false
		},
		[signUp.fulfilled.type]: state => {
			state.loading = false
		},
		[signUp.pending.type]: state => {
			state.loading = true
		},
		[signUp.rejected.type]: (state, action) => {
			state.errors = action.payload
			state.loading = false
		},
		[refreshToken.fulfilled.type]: (state, action) => {
			state.user = action.payload
			localStorage.setItem('token', action.payload.accessToken)
		},
		[refreshToken.rejected.type]: (state, action) => {
			state.errors = action.payload
		},
		[logout.fulfilled.type]: state => {
			state.user = null
			localStorage.removeItem('token')
		}
	}
})

export default usersSlice.reducer

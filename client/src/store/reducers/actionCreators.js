import { createAsyncThunk } from '@reduxjs/toolkit'
import { DELETE, GET, POST } from '../../api'

export const fetchEmployees = createAsyncThunk('employee', async (_, thunkApi) => {
	return GET('/employees', thunkApi)
})

export const fetchUsers = createAsyncThunk('users', async (_, thunkApi) => {
	return GET('/users', thunkApi)
})

export const fetchDepartments = createAsyncThunk('departments', async (_, thunkApi) => {
	return GET('/departments', thunkApi)
})

export const signIn = createAsyncThunk('auth/sign-in', async (params, thunkApi) => {
	return POST('/sign-in', params, thunkApi)
})

export const signUp = createAsyncThunk('auth/sign-up', async (params, thunkApi) => {
	return POST('/sign-up', params, thunkApi)
})

export const refreshToken = createAsyncThunk('auth/refresh-token', async () => {
	return GET('/refresh')
})

export const logout = createAsyncThunk('auth/logout', async () => {
	return DELETE('/logout')
})

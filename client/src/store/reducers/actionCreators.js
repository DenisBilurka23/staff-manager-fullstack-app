import { createAsyncThunk } from '@reduxjs/toolkit'
import { GET_THUNK } from '../../api'

export const fetchEmployees = createAsyncThunk('employee', async (_, thunkApi) => {
	return GET_THUNK('/employees', thunkApi)
})

export const fetchUsers = createAsyncThunk('users', async (_, thunkApi) => {
	return GET_THUNK('/users', thunkApi)
})

export const fetchDepartments = createAsyncThunk('departments', async (_, thunkApi) => {
	return GET_THUNK('/departments', thunkApi)
})

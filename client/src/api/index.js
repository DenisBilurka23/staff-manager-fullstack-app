import axios from 'axios'

export const api = axios.create({
	// eslint-disable-next-line no-undef
	baseURL: process.env.REACT_APP_API_ROOT
})

export const GET_THUNK = async (url, thunkApi) => {
	try {
		const res = await api.get(url)
		return res.data
	} catch (e) {
		console.log('e')
		return thunkApi.rejectWithValue(e.message)
	}
}

export const GET = async url => {
	try {
		const res = await api.get(url)
		return res.data
	} catch (e) {
		console.log('e')
	}
}

export const POST = async (url, params) => {
	try {
		const res = await api.post(url, params)
		return res.data
	} catch (e) {
		console.log(e)
		return { response: e.response.data, error: true }
	}
}

export const DELETE = async url => {
	try {
		const res = await api.delete(url)
		return res.data
	} catch (e) {
		console.log(e)
		return { response: e.response.data, error: true }
	}
}

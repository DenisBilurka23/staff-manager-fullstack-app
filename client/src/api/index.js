import axios from 'axios'

export const api = axios.create({
	// eslint-disable-next-line no-undef
	baseURL: process.env.REACT_APP_API_ROOT,
	withCredentials: true
})

api.interceptors.request.use(config => {
	config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
	return config
})

api.interceptors.response.use(
	config => config,
	async error => {
		if (error.response.status === 401 && !error.config.retry) {
			error.config.retry = true
			try {
				// eslint-disable-next-line no-undef
				const tokens = await axios.get(`${process.env.REACT_APP_API_ROOT}refresh`, { withCredentials: true })
				localStorage.setItem('token', tokens.data.accessToken)
				return api.request(error.config)
			} catch (e) {
				console.log(e)
			}
		}
		throw error
	}
)

export const GET = async (url, thunkApi) => {
	try {
		const res = await api.get(url)
		return res.data
	} catch (e) {
		console.log(e)
		if (thunkApi) {
			return thunkApi.rejectWithValue(e.response.data)
		}
	}
}

export const POST = async (url, params, thunkApi) => {
	try {
		const res = await api.post(url, params)
		return res.data
	} catch (e) {
		console.log(e)
		if (thunkApi) {
			return thunkApi.rejectWithValue(e.response.data)
		}
	}
}

export const DELETE = async (url, thunkApi) => {
	try {
		const res = await api.delete(url)
		return res.data
	} catch (e) {
		console.log(e)
		if (thunkApi) {
			return thunkApi.rejectWithValue(e.response.data)
		}
	}
}

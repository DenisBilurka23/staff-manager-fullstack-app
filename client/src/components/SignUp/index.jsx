import Auth from '../../patterns/Auth'

const SignUp = () => {
	const handleLogin = async params => {
		console.log('params: ', params)
		// await axios.post('sign-in', params)
	}

	return <Auth name="Sign up" cb={handleLogin} />
}

export default SignUp

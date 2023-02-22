import axios from 'axios'

import Auth from '../../patterns/Auth'

const SignIn = () => {
	const handleSubmit = async params => {
		await axios.post('sign-in', params)
	}

	return <Auth name="Sign in" cb={handleSubmit} />
}

export default SignIn

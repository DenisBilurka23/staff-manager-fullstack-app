import { useDispatch, useSelector } from 'react-redux'

import Auth from '../../patterns/Auth'
import { signUp } from '../../store/reducers/actionCreators'
import { useNavigate } from 'react-router-dom'

const SignUp = () => {
	const dispatch = useDispatch()
	const errors = useSelector(state => state.auth.errors)
	const navigate = useNavigate()

	const handleSubmit = async params => {
		const res = await dispatch(signUp(params))
		if (!('error' in res)) {
			navigate('/sign-in')
		}
	}

	return <Auth errors={errors} name="Sign up" cb={handleSubmit} />
}

export default SignUp

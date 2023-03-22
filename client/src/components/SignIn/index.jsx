import { useDispatch, useSelector } from 'react-redux'

import Auth from '../../patterns/Auth'
import { signIn } from '../../store/reducers/actionCreators'

const SignIn = () => {
	const dispatch = useDispatch()
	const errors = useSelector(state => state.auth.errors)

	const handleSubmit = async params => dispatch(signIn(params))

	return <Auth errors={errors} name="Sign in" cb={handleSubmit} />
}

export default SignIn

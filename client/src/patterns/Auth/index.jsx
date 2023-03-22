import { Button, TextField, Container, styled, Alert } from '@mui/material'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const AuthForm = styled(Container)({
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center'
})

const Field = styled(TextField)({
	width: '400px',
	margin: '0.5rem'
})

const Auth = ({ name, cb, errors }) => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const user = useSelector(state => state.auth.user)
	const navigate = useNavigate()

	const onUserNameChangeHandler = e => setEmail(e.target.value)
	const onPasswordChangeHandler = e => setPassword(e.target.value)
	const handleSubmit = () => cb({ email, password })

	useEffect(() => {
		if (user) {
			navigate('/')
		}
	}, [user])

	return (
		<AuthForm>
			<h2>{name}</h2>
			<Field label="Email" type="email" value={email} onChange={onUserNameChangeHandler} />
			<Field label="Password" type="password" value={password} onChange={onPasswordChangeHandler} />
			<Button onClick={handleSubmit}>{name}</Button>
			{typeof errors === 'string' ? (
				<Alert sx={{ width: '400px', boxSizing: 'border-box', marginBottom: '.5rem' }} severity="error">
					{errors}
				</Alert>
			) : (
				errors?.map(message => (
					<Alert sx={{ width: '400px', boxSizing: 'border-box', marginBottom: '.5rem' }} key={message} severity="error">
						{message}
					</Alert>
				))
			)}
		</AuthForm>
	)
}

export default Auth

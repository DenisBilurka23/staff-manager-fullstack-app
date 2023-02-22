import { Button, TextField, Container, styled } from '@mui/material'
import { useState } from 'react'

const AuthForm = styled(Container)({
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center'
})

const Field = styled(TextField)({
	width: '400px',
	margin: '0.5rem'
})

const Auth = ({ name, cb }) => {
	const [userName, setUserName] = useState('')
	const [password, setPassword] = useState('')

	const onUserNameChangeHandler = e => setUserName(e.target.value)
	const onPasswordChangeHandler = e => setPassword(e.target.value)
	const handleSubmit = () => cb({ userName, password })

	return (
		<AuthForm>
			<h2>{name}</h2>
			<Field label="Username" value={userName} onChange={onUserNameChangeHandler} />
			<Field label="Password" type="password" value={password} onChange={onPasswordChangeHandler} />
			<Button onClick={handleSubmit}>{name}</Button>
		</AuthForm>
	)
}

export default Auth

import { Box, Typography } from '@mui/material'
import { useSelector } from 'react-redux'

const Profile = () => {
	const user = useSelector(state => state.auth.user)
	return (
		<Box>
			<Typography>ID: {user?.id}</Typography>
			<Typography>Email: {user?.email}</Typography>
			<Typography>Activated: {user?.isActivated ? 'Yes' : 'No'}</Typography>
		</Box>
	)
}

export default Profile

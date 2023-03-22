import { Container, Typography } from '@mui/material'

import Table from '../../patterns/Table'
import { useEffect } from 'react'
import { fetchUsers } from '../../store/reducers/actionCreators'
import { useDispatch, useSelector } from 'react-redux'

const Users = () => {
	const dispatch = useDispatch()
	const { users, loading } = useSelector(state => state.users)
	
	useEffect(() => {
		dispatch(fetchUsers())
	}, [])

	return (
		<>
			<Container sx={{ display: 'flex', flexDirection: 'column', marginBottom: '1rem' }}>
				<Typography sx={{ fontSize: '2rem', fontWeight: 300, textAlign: 'center', margin: '1rem' }}>Users</Typography>
				<Table
					selectable={false}
					titles={['Email', 'ID', 'Activated', 'Created', 'Updated']}
					data={users}
					styles={{ marginBottom: '1rem' }}
				/>
				{loading && <span>Loading...</span>}
			</Container>
		</>
	)
}

export default Users

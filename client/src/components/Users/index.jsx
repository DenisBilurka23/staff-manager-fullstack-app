import { Container, Typography } from '@mui/material'
import { useNavigation, useLoaderData } from 'react-router-dom'

import Table from '../../patterns/Table'

const Users = () => {
	const data = useLoaderData()?.payload
	const dataState = useNavigation()

	return (
		<>
			<Container sx={{ display: 'flex', flexDirection: 'column', marginBottom: '1rem' }}>
				<Typography sx={{ fontSize: '2rem', fontWeight: 300, textAlign: 'center', margin: '1rem' }}>Users</Typography>
				<Table
					selectable={false}
					titles={['ID', 'Name', 'Date created']}
					data={data}
					styles={{ marginBottom: '1rem' }}
				/>
				{dataState.state === 'loading' && <span>Loading...</span>}
			</Container>
		</>
	)
}

export default Users

import { useState } from 'react'
import { Container, Typography } from '@mui/material'
import { useNavigation, useLoaderData } from 'react-router-dom'

import Table from '../../patterns/Table'
import ModifyEmployeeModal from '../ModifyEmployeeModal'
import DeleteModal from '../DeleteModal'
import { deleteEmployee } from '../../api/employees'

const Employees = () => {
	const [selected, setSelected] = useState(null)
	const [modifyEmployeeModalOpen, setModifyEmployeeModalOpen] = useState(false)
	const [deleteEmployeeModalOpen, setDeleteEmployeeModalOpen] = useState(false)
	const [edit, setEdit] = useState(false)
	const data = useLoaderData()?.payload
	const dataState = useNavigation()

	const handleModifyEmployee = edit => () => {
		setEdit(edit)
		setModifyEmployeeModalOpen(prev => !prev)
	}

	const handleDeleteEmployee = async () => {
		try {
			await deleteEmployee(selected)
			setSelected([])
		} catch (e) {
			console.log(e)
		}
	}

	const handleDeleteModalOpen = () => setDeleteEmployeeModalOpen(prev => !prev)

	return (
		<>
			<Container sx={{ display: 'flex', flexDirection: 'column', marginBottom: '1rem' }}>
				<Typography sx={{ fontSize: '2rem', fontWeight: 300, textAlign: 'center', margin: '1rem' }}>
					Employees
				</Typography>
				<Table
					titles={['ID', 'Name', 'Age', 'Salary', 'Department ID', 'Date created']}
					data={data}
					styles={{ marginBottom: '1rem' }}
					name="employee"
					onAdd={handleModifyEmployee(false)}
					onEdit={handleModifyEmployee(true)}
					onDelete={handleDeleteModalOpen}
					selected={selected}
					setSelected={setSelected}
				/>
				{dataState.state === 'loading' && <span>Loading...</span>}
			</Container>
			<ModifyEmployeeModal
				modifyEmployeeModalOpen={modifyEmployeeModalOpen}
				edit={edit}
				onHide={handleModifyEmployee(false)}
				id={selected}
			/>
			<DeleteModal
				title="employee"
				deleteModalOpen={deleteEmployeeModalOpen}
				onHide={handleDeleteModalOpen}
				onDelete={handleDeleteEmployee}
			/>
		</>
	)
}

export default Employees

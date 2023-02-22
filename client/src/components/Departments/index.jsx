import { useState } from 'react'
import { Container, Typography } from '@mui/material'
import { useNavigation, useLoaderData } from 'react-router-dom'

import Table from '../../patterns/Table'
import ModifyDepartmentModal from '../ModifyDepartmentModal'
import DeleteModal from '../DeleteModal'
import { deleteDepartment } from '../../api/departments'

const Departments = () => {
	const [selected, setSelected] = useState(null)
	const [modifyDepartmentModalOpen, setModifyDepartmentModalOpen] = useState(false)
	const [deleteDepartmentModalOpen, setDeleteDepartmentModalOpen] = useState(false)
	const data = useLoaderData()?.payload
	const dataState = useNavigation()
	const [edit, setEdit] = useState(false)

	const handleModifyDepartmentModal = () => setModifyDepartmentModalOpen(prev => !prev)

	const handleModifyDepartment = edit => () => {
		setEdit(edit)
		setModifyDepartmentModalOpen(prev => !prev)
	}

	const handleDeleteDepartment = async () => {
		try {
			await deleteDepartment(selected)
			setSelected([])
		} catch (e) {
			console.log(e)
		}
	}

	const handleDeleteModalOpen = () => setDeleteDepartmentModalOpen(prev => !prev)

	return (
		<>
			<Container sx={{ display: 'flex', flexDirection: 'column', marginBottom: '1rem' }}>
				<Typography sx={{ fontSize: '2rem', fontWeight: 300, textAlign: 'center', margin: '1rem' }}>
					Departments
				</Typography>
				<Table
					selected={selected}
					setSelected={setSelected}
					titles={['ID', 'Name']}
					data={data}
					styles={{ marginBottom: '1rem' }}
					name="department"
					onEdit={handleModifyDepartment(true)}
					onAdd={handleModifyDepartment(false)}
					onDelete={handleDeleteModalOpen}
				/>
				{dataState.state === 'loading' && <span>Loading...</span>}
			</Container>
			<ModifyDepartmentModal
				edit={edit}
				modifyDepartmentModalOpen={modifyDepartmentModalOpen}
				onHide={handleModifyDepartmentModal}
				id={selected}
			/>
			<DeleteModal
				onHide={handleDeleteModalOpen}
				title="department"
				deleteModalOpen={deleteDepartmentModalOpen}
				onDelete={handleDeleteDepartment}
			/>
		</>
	)
}

export default Departments

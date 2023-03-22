import { useEffect, useState } from 'react'
import { Container, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'

import Table from '../../patterns/Table'
import ModifyDepartmentModal from '../ModifyDepartmentModal'
import DeleteModal from '../DeleteModal'
import { deleteDepartment } from '../../api/departments'
import { fetchDepartments } from '../../store/reducers/actionCreators'

const Departments = () => {
	const dispatch = useDispatch()
	const [selected, setSelected] = useState(null)
	const [modifyDepartmentModalOpen, setModifyDepartmentModalOpen] = useState(false)
	const [deleteDepartmentModalOpen, setDeleteDepartmentModalOpen] = useState(false)
	const { departments, loading } = useSelector(state => state.departments)
	const [edit, setEdit] = useState(false)

	const handleModifyDepartmentModal = () => setModifyDepartmentModalOpen(prev => !prev)

	const handleModifyDepartment = edit => () => {
		setEdit(edit)
		setModifyDepartmentModalOpen(prev => !prev)
	}

	const handleDeleteDepartment = async () => {
		try {
			await deleteDepartment(selected)
			setSelected(null)
		} catch (e) {
			console.log(e)
		}
	}

	const handleDeleteModalOpen = () => setDeleteDepartmentModalOpen(prev => !prev)

	useEffect(() => {
		dispatch(fetchDepartments())
	}, [])

	return (
		<>
			<Container sx={{ display: 'flex', flexDirection: 'column', marginBottom: '1rem' }}>
				<Typography sx={{ fontSize: '2rem', fontWeight: 300, textAlign: 'center', margin: '1rem' }}>
					Departments
				</Typography>
				<Table
					selected={selected}
					setSelected={setSelected}
					titles={['ID', 'Name', 'Created', 'Updated', 'Available employees']}
					data={departments}
					styles={{ marginBottom: '1rem' }}
					onEdit={handleModifyDepartment(true)}
					onAdd={handleModifyDepartment(false)}
					onDelete={handleDeleteModalOpen}
				/>
				{loading && <span>Loading...</span>}
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

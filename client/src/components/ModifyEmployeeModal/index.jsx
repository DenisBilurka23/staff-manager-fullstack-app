import { useEffect, useState } from 'react'
import { useRevalidator } from 'react-router-dom'
import { Alert, FormControl, FormLabel, Input } from '@mui/material'

import Modal from '../../patterns/Modal'
import { addEmployee, editEmployee, getEmployee } from '../../api/employees'

const ModifyEmployeeModal = ({ modifyEmployeeModalOpen, onHide, edit, id }) => {
	const [name, setName] = useState('')
	const [age, setAge] = useState('')
	const [departmentId, setDepartmentId] = useState('')
	const [salary, setSalary] = useState('')
	const [file, setFile] = useState()
	const revalidator = useRevalidator()
	const [error, setError] = useState()

	const clearData = () => {
		setName('')
		setError(null)
		setAge('')
		setDepartmentId('')
		setSalary('')
		setFile(null)
	}

	const handleHide = () => {
		clearData()
		onHide()
	}

	const submitHandler = async () => {
		const formData = new FormData()
		Object.entries({ name, file, age, salary, departmentId }).forEach(([key, value]) => formData.append(key, value))

		const res = edit ? await editEmployee(id, formData) : await addEmployee(formData)
		if (typeof res !== 'string' && 'error' in res) {
			setError(res.response)
			return
		}
		handleHide()
		revalidator.revalidate()
		clearData()
	}

	useEffect(() => {
		if (edit) {
			(async () => {
				const data = await getEmployee(id)
				const { name, age, salary, departmentId } = data
				setName(name)
				setAge(age)
				setAge(age)
				setDepartmentId(departmentId)
				setSalary(salary)
			})()
		}
	}, [modifyEmployeeModalOpen])

	return (
		<Modal
			onSubmit={submitHandler}
			open={modifyEmployeeModalOpen}
			onHide={handleHide}
			title={edit ? 'Edit ' : 'Add ' + 'employee'}
		>
			<FormControl>
				<FormLabel>Name</FormLabel>
				<Input value={name} onChange={e => setName(e.target.value)} autoFocus required />
			</FormControl>
			<FormControl>
				<FormLabel>Age</FormLabel>
				<Input type="number" required value={age} onChange={e => setAge(e.target.value)} />
			</FormControl>
			<FormControl>
				<FormLabel>Department ID</FormLabel>
				<Input type="number" required value={departmentId} onChange={e => setDepartmentId(e.target.value)} />
			</FormControl>
			<FormControl>
				<FormLabel>Salary</FormLabel>
				<Input type="number" required value={salary} onChange={e => setSalary(e.target.value)} />
			</FormControl>
			<FormControl>
				<FormLabel>Picture</FormLabel>
				<Input type="file" onChange={e => setFile(e.target.files[0])} />
			</FormControl>
			{typeof error === 'string' ? (
				<Alert severity="error">{error}</Alert>
			) : (
				error?.map(message => (
					<Alert key={message} severity="error">
						{message}
					</Alert>
				))
			)}
		</Modal>
	)
}

export default ModifyEmployeeModal

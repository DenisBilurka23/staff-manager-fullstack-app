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
	const revalidator = useRevalidator()
	const [error, setError] = useState(null)

	const clearData = () => {
		setName('')
		setError('')
		setAge('')
		setDepartmentId('')
		setSalary('')
	}

	const handleHide = () => {
		clearData()
		onHide()
	}

	const submitHandler = async () => {
		const params = {
			name,
			age: +age || null,
			salary: +salary || null,
			departmentId: +departmentId || null
		}
		const res = edit ? await editEmployee(id, params) : await addEmployee(params)
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
				const { name, age, salary, department_id } = data[0]
				setName(name)
				setAge(age)
				setAge(age)
				setDepartmentId(department_id)
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
			{error &&
				error.map(message => (
					<Alert key={message} severity="error">
						{message}
					</Alert>
				))}
		</Modal>
	)
}

export default ModifyEmployeeModal

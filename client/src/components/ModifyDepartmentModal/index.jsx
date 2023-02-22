import { useEffect, useState } from 'react'
import { useRevalidator } from 'react-router-dom'
import { Alert, FormControl, FormLabel, Input } from '@mui/material'

import Modal from '../../patterns/Modal'
import { addDepartment, editDepartment, getDepartment } from '../../api/departments'

const ModifyDepartmentModal = ({ modifyDepartmentModalOpen, onHide, edit, id }) => {
	const [name, setName] = useState('')
	const revalidator = useRevalidator()
	const [error, setError] = useState(null)

	const clearData = () => {
		setName('')
		setError('')
	}

	const handleHide = () => {
		clearData()
		onHide()
	}

	const submitHandler = async () => {
		const res = edit ? await editDepartment(id, { name }) : await addDepartment({ name })
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
				const data = await getDepartment(id)
				const { name } = data[0]
				setName(name)
			})()
		}
	}, [modifyDepartmentModalOpen])

	return (
		<Modal onSubmit={submitHandler} open={modifyDepartmentModalOpen} onHide={handleHide} title="Confirm">
			<FormControl>
				<FormLabel>Name</FormLabel>
				<Input value={name} onChange={e => setName(e.target.value)} autoFocus required />
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

export default ModifyDepartmentModal

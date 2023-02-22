import { useRevalidator } from 'react-router-dom'
import { Typography } from '@mui/material'

import Modal from '../../patterns/Modal'

const DeleteModal = ({ title, deleteModalOpen, onHide, onDelete }) => {
	const revalidator = useRevalidator()

	const handleHide = () => onHide()

	const submitHandler = async () => {
		await onDelete()
		handleHide()
		revalidator.revalidate()
	}

	return (
		<Modal onSubmit={submitHandler} open={deleteModalOpen} onHide={handleHide} title={`Delete ${title}`}>
			<Typography>Are you sure you want to delete {title}?</Typography>
		</Modal>
	)
}

export default DeleteModal

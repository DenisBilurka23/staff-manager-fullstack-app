import { Box, Fab } from '@mui/material'
import { Add, DeleteOutline, ModeEditOutline } from '@mui/icons-material'

const ModifyTable = ({ selected, onEdit, onDelete, onAdd }) => (
	<Box sx={{ position: 'fixed', bottom: 25, right: 25, margin: '-.25rem' }}>
		<>
			{selected && (
				<Fab sx={{ margin: '.25rem' }} size="medium" color="secondary" onClick={onEdit}>
					<ModeEditOutline />
				</Fab>
			)}
			{selected && (
				<Fab sx={{ margin: '.25rem' }} size="medium" color="error" onClick={onDelete}>
					<DeleteOutline />
				</Fab>
			)}
		</>
		<Fab sx={{ margin: '.25rem' }} size="medium" color="primary" onClick={onAdd}>
			<Add />
		</Fab>
	</Box>
)

export default ModifyTable

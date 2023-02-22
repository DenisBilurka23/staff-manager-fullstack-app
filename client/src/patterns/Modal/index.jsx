import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, Typography } from '@mui/material'

const Modal = ({ open, onHide, onSubmit, title, children }) => {
	return (
		<Dialog onKeyPress={e => e.key === 'Enter' && onSubmit()} open={open} onClose={onHide}>
			<DialogTitle>
				<Typography align="center" fontSize="1.25rem">
					{title}
				</Typography>
			</DialogTitle>
			<DialogContent sx={{ width: '570px' }}>
				<form>
					<Stack spacing={2}>{children}</Stack>
				</form>
			</DialogContent>
			<DialogActions sx={{ display: 'flex', justifyContent: 'center', padding: '1rem' }}>
				<Button size="large" onClick={onSubmit}>
					Confirm
				</Button>
			</DialogActions>
		</Dialog>
	)
}

export default Modal

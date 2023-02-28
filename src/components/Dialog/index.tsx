import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton } from '@mui/material'
import { FormEvent } from 'react'
import CloseIcon from '@mui/icons-material/Close'
import { useTranslation } from 'react-i18next'

interface ConfirmDialogProps {
	open: boolean
	handleClose: () => void
	handleSubmit: (e?: FormEvent<HTMLFormElement>) => void
	dialogTitle?: string
	dialogContent: string
}

export default function ConfirmDialog(props: ConfirmDialogProps) {
	const { open, handleClose, handleSubmit, dialogTitle = '', dialogContent } = props
	const { t } = useTranslation()

	const onSubmitClick = (e?: FormEvent<HTMLFormElement>) => {
		e?.preventDefault()
		handleClose()
		handleSubmit(e)
	}

	return (
		<Dialog
			open={open}
			onClose={handleClose}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
			fullWidth
		>
			<IconButton
				aria-label="close"
				onClick={handleClose}
				sx={{
					position: 'absolute',
					right: 0,
					top: 0,
					color: (theme) => theme.palette.grey[500]
				}}
			>
				<CloseIcon />
			</IconButton>

			<form autoComplete="off" onSubmit={onSubmitClick}>
				<DialogTitle id="alert-dialog-title">{dialogTitle}</DialogTitle>
				<DialogContent sx={{ textAlign: 'center', padding: '25px' }}>
					<DialogContentText id="alert-dialog-description">{dialogContent}</DialogContentText>
				</DialogContent>
				<DialogActions sx={{ justifyContent: 'center', padding: '25px' }}>
					<Button type="submit" variant="contained" sx={{ width: '45%' }} autoFocus data-cy="confirmDialog">
						{t('default.buttons.confirm')}
					</Button>
					<Button onClick={handleClose} variant="contained" color="error" sx={{ width: '45%' }} data-cy="cancelDialog">
						{t('default.buttons.cancel')}
					</Button>
				</DialogActions>
			</form>
		</Dialog>
	)
}

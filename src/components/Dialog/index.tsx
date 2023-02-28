import { Box, Button, Dialog, DialogContent, Grid, IconButton, Typography, useMediaQuery } from '@mui/material'
import { ChangeEvent, FormEvent, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close'
import { useTranslation } from 'react-i18next'
import theme from 'src/theme'
import styles from './style'
import { useUploadCSVMutation } from '@features/Keyword'
import { useSnackbar } from 'notistack'
import { ErrorResponse } from '@utils/interface'

interface UploadDialogProps {
	open: boolean
	handleClose: () => void
}

export default function UploadDialog(props: UploadDialogProps) {
	const { open, handleClose } = props
	const { enqueueSnackbar } = useSnackbar()
	const { t } = useTranslation()
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

	const [file, setFile] = useState<File>()
	const [fileName, setFileName] = useState('')

	const [uploadCSV] = useUploadCSVMutation()

	const onSubmit = async (e?: FormEvent<HTMLFormElement>) => {
		e?.preventDefault()
		if (!!file) {
			let formData = new FormData()
			formData.append('csv_file', file as File)

			try {
				await uploadCSV({ body: formData }).unwrap()
				enqueueSnackbar(t('dialog.texts.uploading'), { variant: 'success' })
			}
			catch (e) {
				var errorMessage = e as ErrorResponse
				enqueueSnackbar(errorMessage.data.message, { variant: 'error' })
			}
		}
		onClose()
	}

	const onClose = () => {
		setFile(undefined)
		setFileName('')
		handleClose()
	}

	return (
		<Dialog open={open} onClose={onClose}>
			<DialogContent>
				<Box sx={isMobile ? styles.modalXs : styles.modal}>
					<Grid container alignItems='center'>
						<Grid item xs>
							<Typography fontWeight='bold'>
								{t('dialog.texts.uploadCSV')}
							</Typography>
						</Grid>
						<Grid item>
							<IconButton onClick={onClose}>
								<CloseIcon />
							</IconButton>
						</Grid>
					</Grid>
					<form autoComplete="off" onSubmit={onSubmit}>
						<Grid item container alignItems='center'>
							<Grid item>
								<label htmlFor='uploadButton' >
									<input
										type='file'
										multiple={false}
										style={{ display: "none" }}
										id='uploadButton'
										name='file'
										accept='.csv'
										onChange={(event: ChangeEvent<HTMLInputElement>) => {
											const { files } = event.target
											if (!!files?.length) {
												setFile(files[0])
												setFileName(files[0].name)
											}
										}}
									/>
									<Button
										id='uploadButton'
										data-cy='uploadButton'
										component='span'
										variant='outlined'
									>
										{t('dialog.buttons.upload')}
									</Button>
								</label>
							</Grid>
							<Grid ml={2} item xs>
								<Typography variant='body1'>
									{fileName}
								</Typography>
							</Grid>
						</Grid>
						<Grid container sx={styles.center}>
							<Grid item xs={6} sx={styles.center}>
								<Button
									data-cy='submit-import-csv'
									variant='contained'
									type='submit'
								>
									<Typography variant='body1' fontWeight='bold'>
										{t('dialog.buttons.confirm')}
									</Typography>
								</Button>
							</Grid>
						</Grid>
					</form>
				</Box>
			</DialogContent>
		</Dialog>
	)
}

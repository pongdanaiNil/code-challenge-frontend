import { IconButton } from '@mui/material'
import { Action, KeywordData } from '@utils/interface'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import styles from '../style'
import { useState } from 'react'
import ConfirmDialog from '@components/Dialog'

interface activeProps {
	action: Action
	row: KeywordData
	index: number
}

const Delete = (props: activeProps) => {
	const { row, action, index } = props
	const [open, setOpen] = useState(false)
	const id = row.id
	const { dialogTitle = '', dialogContent = '', onDelete } = action

	const handleSubmit = () => {
		onDelete?.(id)
	}

	return (
		<>
			<IconButton aria-label="delete" onClick={() => setOpen(true)} data-cy={`delete-${index}`}>
				<DeleteOutlineIcon sx={styles.deleteIcon} />
			</IconButton>
			<ConfirmDialog
				open={open}
				handleClose={() => setOpen(false)}
				handleSubmit={handleSubmit}
				dialogTitle={dialogTitle}
				dialogContent={dialogContent}
			/>
		</>
	)
}

export default Delete

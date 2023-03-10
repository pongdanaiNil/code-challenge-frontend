import { IconButton } from '@mui/material'
import { Action, KeywordData } from '@utils/interface'
import { useRouter } from 'next/router'
import BorderColorRoundedIcon from '@mui/icons-material/BorderColorRounded'
import styles from '../style'

interface activeProps {
	action: Action
	row: KeywordData
	index: number
}

const Edit = (props: activeProps) => {
	const { row, action, index } = props
	const router = useRouter()
	const id = row.id

	const handleClick = (id: number) => () => {
		router.push({
			pathname: `${action.url}/${id}/edit`
		})
	}

	return (
		<IconButton aria-label="edit" onClick={handleClick(id)} data-cy={`edit-${index}`}>
			<BorderColorRoundedIcon sx={styles.editIcon} />
		</IconButton>
	)
}

export default Edit

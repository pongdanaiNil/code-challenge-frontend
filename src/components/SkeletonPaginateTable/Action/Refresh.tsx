import { IconButton } from '@mui/material'
import { Action, KeywordData } from '@utils/interface'
import { useRouter } from 'next/router'
import styles from '../style'
import RefreshIcon from '@mui/icons-material/Refresh'

interface activeProps {
	action: Action
	row: KeywordData
	index: number
}

const Refresh = (props: activeProps) => {
	const { row, action, index } = props
	const id = row.id

	const handleClick = (emId: number) => () => {
		action.onRefresh?.(emId)
	}

	return (
		<IconButton aria-label="refresh" onClick={handleClick(id)} data-cy={`refresh-${index}`}>
			<RefreshIcon sx={styles.refreshIcon} />
		</IconButton>
	)
}

export default Refresh

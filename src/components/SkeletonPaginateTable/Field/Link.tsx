import { Typography } from '@mui/material'
import { Column, KeywordData } from '@utils/interface'
import { useRouter } from 'next/router'
import styles from '../style'

interface BaseProps {
	row: KeywordData
	column: Column
	index: number
}

const Link = ({ column, row, index }: BaseProps) => {
	const router = useRouter()

	return (
		<Typography sx={styles.link} onClick={() => router.push(`${column.path}/${row.id}`)} data-cy={`link-${index}`}>
			{eval(`row.${column.id}`)}
		</Typography>
	)
}

export default Link

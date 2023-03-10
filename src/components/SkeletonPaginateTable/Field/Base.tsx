import { Column, KeywordData } from '@utils/interface'

interface BaseProps {
	row: KeywordData
	column: Column
}

const Base = ({ column, row }: BaseProps) => {
	return !!eval(`row.${column.id}`) ? eval(`row.${column.id}`) : '-'
}

export default Base

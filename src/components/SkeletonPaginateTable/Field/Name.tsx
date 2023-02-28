import { Column, KeywordData } from '@utils/interface'

interface BaseProps {
	row: KeywordData
	column: Column
}

const Name = ({ column, row }: BaseProps) => {
	return !!eval(`row.${column.id}`)
		? eval(`row.${column.id}?.name`)
		: '-'
}

export default Name

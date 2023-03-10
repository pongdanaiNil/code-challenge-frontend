import { Column, KeywordData } from '@utils/interface'
import { camelCase, upperFirst } from 'lodash'

interface ActionProps {
	row: KeywordData
	column: Column
	index: number
}

export default function ActionLayout(props: ActionProps) {
	const { column, row, index } = props
	const { actions } = column

	return (
		<>
			{actions?.map((action) => {
				const actionType = upperFirst(camelCase(action.action))
				const Component = require(`./${actionType}`).default

				return <Component key={action.action} action={action} row={row} index={index} />
			})}
		</>
	)
}

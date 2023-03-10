import { Column, KeywordData } from '@utils/interface'
import { upperFirst, camelCase } from 'lodash'
import React from 'react'

interface FieldProps {
	row: KeywordData
	column: Column
	index: number
}

const FieldLayout = (props: FieldProps) => {
	const { column, row, index } = props
	const { id, field } = column
	const componentField = upperFirst(camelCase(field || 'base'))
	const Component = require(`./${componentField}`).default

	return <Component key={id} column={column} row={row} index={index} />
}

export default FieldLayout

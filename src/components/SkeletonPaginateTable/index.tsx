import {
	Box,
	Paper,
	Skeleton,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TablePagination,
	TableRow,
	Typography
} from '@mui/material'
import { SkeletonPaginateTableProps } from '@utils/interface'
import { ChangeEvent } from 'react'
import styles from './style'
import ActionLayout from './Action'
import FieldLayout from './Field'

export default function SkeletonPaginateTable(props: SkeletonPaginateTableProps) {
	const { columns, isFetching, tableData, perPage, page, debounceChange } = props
	return (
		<Box>
			<Paper>
				<TableContainer>
					<Table aria-label="customized table" sx={styles.table}>
						<TableHead>
							<TableRow>
								{columns.map((column) => (
									<TableCell key={`${column.id}-head`} sx={styles.column}>
										<Typography>{column.label}</Typography>
									</TableCell>
								))}
							</TableRow>
						</TableHead>
						<TableBody>
							{!isFetching
								? tableData?.data.map((row, index) => (
										<TableRow key={`${row.id}-${index}`}>
											{columns.map((column) =>
												column.id.includes('action') ? (
													<TableCell key={`${column.id}-action-${index}`} align="left">
														<ActionLayout column={column} row={row} index={index} />
													</TableCell>
												) : column.id == 'sequence' ? (
													<TableCell key={`${column.id}-sequence-${index}`}>{index + 1}.</TableCell>
												) : (
													<TableCell key={`${column.id}-field-${index}`} align="left">
														<FieldLayout column={column} row={row} index={index} />
													</TableCell>
												)
											)}
										</TableRow>
								  ))
								: [...Array(perPage)].map((i) => (
										<TableRow key={i}>
											{columns.map((column) => (
												<TableCell key={`${column.id}-${i}`}>
													<Skeleton variant="rounded" />
												</TableCell>
											))}
										</TableRow>
								  ))}
						</TableBody>
					</Table>
				</TableContainer>
				<TablePagination
					rowsPerPageOptions={[5, 10, 15, 25]}
					component="div"
					count={tableData?.count || 0}
					rowsPerPage={perPage}
					page={page}
					onPageChange={(_, page: number) => debounceChange(page, perPage)}
					onRowsPerPageChange={(e: ChangeEvent<HTMLInputElement>) => debounceChange(0, parseInt(e.target.value))}
				/>
			</Paper>
		</Box>
	)
}

import theme from 'src/theme'

const styles = {
	column: {
		backgroundColor: theme.palette.secondary.main
	},
	active: {
		color: theme.palette.success.main,
		fontWeight: 'medium'
	},
	inactive: {
		color: theme.palette.error.main,
		fontWeight: 'medium'
	},
	fullWidth: {
		width: '100%'
	},
	link: {
		fontWeight: 'medium',
		textDecoration: 'underline',
		'&:hover': {
			cursor: 'pointer'
		}
	},
	mediumText: {
		fontWeight: 'medium'
	},
	table: {
		minWidth: 1000
	},
	editIcon: {
		color: theme.palette.primary.main,
		width: `25px`,
		height: '25px'
	},
	refreshIcon: {
		color: '#000000',
		width: `25px`,
		height: '25px'
	},
	deleteIcon: {
		color: theme.palette.error.main,
		width: `25px`,
		height: '25px'
	}
}
export default styles

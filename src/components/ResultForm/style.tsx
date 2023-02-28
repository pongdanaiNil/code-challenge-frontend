import theme from 'src/theme'

const styles = {
	active: {
		fontWeight: 'medium',
		color: theme.palette.success.main
	},
	inactive: {
		fontWeight: 'medium',
		color: theme.palette.error.main
	},
	centerText: {
		display: 'flex',
		alignItems: 'center'
	},
	mediumText: {
		fontWeight: 'medium'
	},
	boldText: {
		fontWeight: 'bold'
	},
	paper: {
		padding: '30px'
	},
	editButtonGrid: {
		display: 'flex',
		justifyContent: 'end'
	},
	editButton: {
		minWidth: {
			xs: '50px',
			md: '50%'
		}
	},
	editIcon: {
		marginRight: {
			md: '6px'
		},
		padding: {
			md: '2px'
		}
	},
	skeleton: {
		height: '40px'
	}
}
export default styles

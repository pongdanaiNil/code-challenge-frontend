const DRAWER_WIDTH = 250

const styles = {
	flex: {
		display: 'flex'
	},
	fullScreen: {
		width: '100vw',
		height: '100vh',
		position: 'relative'
	},
	navigator: {
		width: DRAWER_WIDTH,
		flexShrink: 0
	}, 
	listItem: {
		paddingBottom: '60px',
		display: 'flex',
		justifyContent: 'center'
	},
	p20: {
		padding: '20px'
	},
	autoScroll: {
		overflow: 'auto'
	},
	appBar: {
		backgroundColor: 'primary.main',
		border: 'none'
	},
	ml10: {
		marginLeft: '10px'
	},
	children: {
		width: { xs: '100vw', sm: `calc(100vw - ${DRAWER_WIDTH}px)` },
		overflowX: 'auto'
	},
	active: {
		color: '#4fc3f7',
		padding: '20px'
	},
	subDrawer: {
		backgroundColor: '#EBF1F7'
	}

}
export default styles

import { createTheme } from '@mui/material/styles'

// Create a theme instance.
const theme = createTheme({
	palette: {
		primary: {
			main: '#0071BE'
		},
		secondary: {
			main: '#D7E3F0'
		},
		error: {
			main: '#FC2E2E'
		},
		info: {
			main: '#FCE72E'
		},
		success: {
			main: '#018225'
		}
	},
	typography: {
		fontFamily: 'Sarabun',
		button: {
			textTransform: 'none'
		}
	},
	components: {
		MuiTableCell: {
			styleOverrides: {
				body: {
					minWidth: '120px'
				}
			}
		}
	}
})

export default theme

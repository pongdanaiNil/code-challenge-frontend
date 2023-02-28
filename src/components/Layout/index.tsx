import {
	AppBar,
	CssBaseline,
	Drawer,
	Grid,
	IconButton,
	List,
	ListItemButton,
	ListItemText,
	Menu,
	MenuItem,
	Toolbar,
	useMediaQuery
} from '@mui/material'
import { Box } from '@mui/system'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { MouseEvent, ReactNode, useState } from 'react'
import { useTranslation } from 'react-i18next'
import theme from 'src/theme'
import MenuIcon from '@mui/icons-material/Menu'
import Link from 'next/link'
import { destroyAccessToken } from '@utils/authCookie'
import styles from './style'
import SettingsIcon from '@mui/icons-material/Settings';
import { useSignOutMutation } from '@features/Auth'
import { useSnackbar } from 'notistack'

interface Props {
	children?: ReactNode
	title?: string
}

interface DrawerMenu {
	key: string
	href: string
	label: string
}

interface DropDownItem {
	href?: string
	key: string
	label: string
	callFunction?: () => void
	data_cy: string
}

export default function ApplicationLayout(props: Props) {
	const DRAWER_WIDTH = 250
	const router = useRouter()
	const { t } = useTranslation()
	const { enqueueSnackbar } = useSnackbar()
	const { children, title = t('default.texts.appTitle') } = props
	const [mobileOpen, setMobileOpen] = useState(false)
	const [open, setOpen] = useState(true)
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
	const handleClick = (e: MouseEvent<HTMLButtonElement>) => setAnchorEl(e.currentTarget)
	const handleClose = () => setAnchorEl(null)

	const [signOut] = useSignOutMutation()

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen)
	}

	const handleToggle = () => {
		setOpen(!open)
	}

	const onSignOut = async () => {
		try {
			await signOut().unwrap()
			router.push('/sign_in')
		} catch (error: any) {
			enqueueSnackbar(error.data.error, { variant: 'error' })
		}
	}

	const drawerMenu: DrawerMenu[] = [
		{
			key: 'keyword',
			href: '/keywords',
			label: t('default.drawers.keywords')
		}
	]

	const dropDownItem: DropDownItem[] = [
		{
			key: 'sign_out',
			label: t('default.buttons.signOut'),
			callFunction: onSignOut,
			data_cy: 'sign_out'
		}
	]

	return (
		<Box sx={styles.flex}>
			<Head>
				<title>{title}</title>
			</Head>
			<CssBaseline />
			<Box component="nav" sx={open && !isMobile ? styles.navigator : {}} aria-label="mailbox folders">
				{isMobile ? (
					<Drawer
						variant="temporary"
						open={mobileOpen}
						onClose={handleDrawerToggle}
						ModalProps={{
							keepMounted: true
						}}
						sx={{
							display: 'block',
							'& .MuiDrawer-paper': {
								boxSizing: 'border-box',
								width: DRAWER_WIDTH
							},
							position: 'fixed'
						}}
					>
						<List sx={styles.autoScroll}>
							{drawerMenu.map(({ key, href, label }) => (
								<>
									<ListItemButton onClick={() => { router.push(href) }} data-cy={`menu-${key}`}>
										<ListItemText sx={router.pathname.match(href) ? styles.active : styles.p20}>{label}</ListItemText>
									</ListItemButton>
								</>
							))}
						</List>
					</Drawer>
				) : (
					<Drawer
						variant="permanent"
						sx={{
							display: open ? 'block' : 'none',
							'& .MuiDrawer-paper': {
								boxSizing: 'border-box',
								width: DRAWER_WIDTH
							}
						}}
						open
					>
						<List sx={styles.autoScroll}>
							{drawerMenu.map(({ key, href, label }) => (
								<>
									<ListItemButton onClick={() => { router.push(href) }} data-cy={`menu-${key}`}>
										<ListItemText sx={router.pathname.match(href) ? styles.active : styles.p20}>{label}</ListItemText>
									</ListItemButton>
								</>
							))}
						</List>
					</Drawer>
				)}
			</Box>
			<Box
				component="main"
				sx={{
					flexGrow: 1,
					width: open ? { sm: `calc(100% - ${DRAWER_WIDTH}px)` } : '100%',
					minHeight: '100vh'
				}}
			>
				<AppBar position="sticky" elevation={0} sx={styles.appBar}>
					<Toolbar>
						<Grid container justifyContent="space-between">
							<Grid item>
								<IconButton
									aria-label="open drawer"
									edge="start"
									onClick={handleDrawerToggle}
									sx={{ mr: 2, display: isMobile ? 'block' : 'none', color: 'secondary.main' }}
								>
									<MenuIcon />
								</IconButton>
							</Grid>
							<Grid item>
								<IconButton
									aria-label="open drawer"
									edge="start"
									onClick={handleToggle}
									sx={{ mr: 2, display: open ? 'none' : isMobile ? 'none' : 'block', color: 'secondary.main' }}
								>
									<MenuIcon />
								</IconButton>
							</Grid>
							<Grid item>
								<IconButton
									aria-label="open drawer"
									onClick={handleClick}
									color="secondary"
								>
									<SettingsIcon />
								</IconButton>
								<Menu
									id="simple-menu"
									data-cy="simple-menu"
									anchorEl={anchorEl}
									keepMounted
									open={Boolean(anchorEl)}
									onClose={handleClose}
								>
									{dropDownItem.map(({ href = '#', label, callFunction, data_cy }) => (
										<Link key={label} href={href} onClick={callFunction} passHref>
											<MenuItem data-cy={data_cy} onClick={handleClose}>
												{label}
											</MenuItem>
										</Link>
									))}
								</Menu>
							</Grid>
						</Grid>
					</Toolbar>
				</AppBar>
				<Box p={6} sx={styles.children}>
					{children}
				</Box>
			</Box>
		</Box>
	)
}

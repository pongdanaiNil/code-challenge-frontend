import { Box } from '@mui/material'
import Head from 'next/head'
import { ReactNode } from 'react'
import backgroundImage from '@public/background.jpg'
import Image from 'next/image'
import styles from './style'

interface Props {
	children?: ReactNode
	title: string
}

export default function SignInLayout(props: Props) {
	const { children, title = '' } = props

	return (
		<Box sx={styles.flex}>
			<Head>
				<title>{title}</title>
			</Head>
			<Box sx={styles.fullScreen}>
				<Image src={backgroundImage.src} fill alt={'LogoImage'} style={{ zIndex: -1 }} priority />
				{children}
			</Box>
		</Box>
	)
}

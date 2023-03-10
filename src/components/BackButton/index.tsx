import { IconButton, Typography } from '@mui/material'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/router'

interface BackButtonProp {
	href?: string
}

export default function BackButton(props: BackButtonProp) {
	const { t } = useTranslation()
	const { href } = props
	const router = useRouter()

	return (
		<IconButton
			data-cy="backButton"
			color="inherit"
			onClick={() => {
				if (href) {
					router.replace(href)
				} else {
					router.back()
				}
			}}
		>
			<ArrowBackIosNewIcon />
			<Typography sx={{ fontWeight: 'medium', textDecoration: 'underline' }}>{t('default.buttons.back')}</Typography>
		</IconButton>
	)
}

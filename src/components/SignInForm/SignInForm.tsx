import { useSignInMutation } from '@features/Auth'
import {
	FormControl,
	FormHelperText,
	Grid,
	IconButton,
	InputAdornment,
	Link,
	OutlinedInput,
	Paper,
	TextField,
	Typography
} from '@mui/material'
import { useState, MouseEvent } from 'react'
import SignInLayout from '@components/Layout/SignInLayout'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { useSnackbar } from 'notistack'
import { useRouter } from 'next/router'
import { useFormik } from 'formik'
import { useTranslation } from 'react-i18next'
import signInValidationSchema from '@utils/validates/signInValidator'
import styles from './style'
import { LoadingButton } from '@mui/lab'

interface SignInParam {
	email: string
	password: string
}

export default function SignInForm() {
	const [showPassword, setShowPassword] = useState(false)
	const { enqueueSnackbar } = useSnackbar()
	const [signIn, { isLoading }] = useSignInMutation()
	const { t } = useTranslation()

	const signInParam: SignInParam = {
		email: '',
		password: ''
	}
	const router = useRouter()

	const handleClickShowPassword = () => setShowPassword((show) => !show)

	const handleClickLink = (e: MouseEvent<HTMLSpanElement>) => {
		e.preventDefault()
		router.push('/signUp')
	}

	const formik = useFormik({
		initialValues: signInParam,
		validationSchema: signInValidationSchema,
		onSubmit: async (values) => {
			try {
				await signIn(values).unwrap()
				router.push('/')
			} catch (error: any) {
				console.log("error", error)
				enqueueSnackbar(error.data.error, { variant: 'error' })
			}
		}
	})

	return (
		<SignInLayout title="Login">
			<Grid container alignItems="center" justifyContent="center" sx={styles.fullHeight}>
				<Grid item xs={9} sm={9} md={6} lg={4} xl={3}>
					<Paper sx={styles.paper}>
						<Typography color="primary" variant="h4" fontWeight="bold" sx={styles.pb10}>
							{t('signIn.texts.login')}
						</Typography>
						<Typography variant="body2" sx={styles.subtitleText} fontWeight={500}>
							{t('signIn.texts.subLogin')}
						</Typography>
						<form autoComplete="off" onSubmit={formik.handleSubmit} style={styles.fullWidth}>
							<FormControl fullWidth>
								<Typography variant="subtitle1" fontWeight="bold">
									{t('signIn.texts.email')}
								</Typography>
								<TextField
									name="email"
									onChange={formik.handleChange}
									error={formik.touched.email && Boolean(formik.errors.email)}
									helperText={formik.touched.email && formik.errors.email}
									sx={{ pb: '20px' }}
									inputProps={{
										'data-cy': 'email',
										maxLength: 255
									}}
									size="small"
									placeholder="Email"
								/>
								<Typography variant="subtitle1" fontWeight="bold">
									{t('signIn.texts.password')}
								</Typography>
								<FormControl sx={styles.pb30}>
									<OutlinedInput
										name="password"
										id="outlined-adornment-password"
										type={showPassword ? 'text' : 'password'}
										onChange={formik.handleChange}
										error={formik.touched.password && Boolean(formik.errors.password)}
										endAdornment={
											<InputAdornment position="end">
												<IconButton
													aria-label="toggle password visibility"
													onClick={handleClickShowPassword}
													edge="end"
												>
													{showPassword ? <Visibility /> : <VisibilityOff />}
												</IconButton>
											</InputAdornment>
										}
										inputProps={{
											'data-cy': 'password',
											maxLength: 255
										}}
										size="small"
										placeholder="Password"
									/>
									{formik.touched.password && Boolean(formik.errors.password) && (
										<FormHelperText error={formik.touched.password && Boolean(formik.errors.password)}>
											{formik.touched.password && formik.errors.password}
										</FormHelperText>
									)}
								</FormControl>
								<LoadingButton variant="contained" type="submit" size="large" data-cy="signIn" loading={isLoading}>
									{t('signIn.buttons.signIn')}
								</LoadingButton>
							</FormControl>
						</form>
						<Typography variant="body2" sx={styles.signUpText} fontWeight={500} align='center'>
							{ "Don't have an account? " }
							<Link href="#" onClick={handleClickLink}> SignUp </Link>
						</Typography>
					</Paper>
				</Grid>
			</Grid>
		</SignInLayout>
	)
}

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
import signUpValidationSchema from '@utils/validates/signUpValidator'
import styles from './style'
import { LoadingButton } from '@mui/lab'
import { useSignUpMutation } from '@features/User'

interface SignUpParam {
	name: string
	email: string
	password: string
	confirmPassword: string
}

export default function SignInForm() {
	const [showPassword, setShowPassword] = useState(false)
	const { enqueueSnackbar } = useSnackbar()
	const [signUp, { isLoading }] = useSignUpMutation()
	const { t } = useTranslation()

	const signUpParam: SignUpParam = {
		name: '',
		email: '',
		password: '',
		confirmPassword: ''
	}
	const router = useRouter()

	const handleClickShowPassword = () => setShowPassword((show) => !show)

	const handleClickLink = (e: MouseEvent<HTMLSpanElement>) => {
		e.preventDefault()
		router.push('/signIn')
	}

	const formik = useFormik({
		initialValues: signUpParam,
		validationSchema: signUpValidationSchema,
		onSubmit: async (values) => {
			try {
				console.log("values", values)
				await signUp(values).unwrap()
				router.push('/signIn')
			} catch (error: any) {
				console.log("error", error)
				enqueueSnackbar(error.data.error, { variant: 'error' })
			}
		}
	})

	return (
		<SignInLayout title="Signup">
			<Grid container alignItems="center" justifyContent="center" sx={styles.fullHeight}>
				<Grid item xs={9} sm={9} md={6} lg={4} xl={3}>
					<Paper sx={styles.paper}>
						<Typography color="primary" variant="h4" fontWeight="bold" sx={styles.pb10}>
							{t('signUp.texts.signUp')}
						</Typography>
						<Typography variant="body2" sx={styles.subtitleText} fontWeight={500}>
							{t('signUp.texts.subSignUp')}
						</Typography>
						<form autoComplete="off" onSubmit={formik.handleSubmit} style={styles.fullWidth}>
							<FormControl fullWidth>
								<Typography variant="subtitle1" fontWeight="bold">
									{t('signUp.texts.name')}
								</Typography>
								<TextField
									name="name"
									onChange={formik.handleChange}
									error={formik.touched.name && Boolean(formik.errors.name)}
									helperText={formik.touched.name && formik.errors.name}
									sx={{ pb: '20px' }}
									inputProps={{
										'data-cy': 'name',
										maxLength: 255
									}}
									size="small"
									placeholder="Name"
								/>
								<Typography variant="subtitle1" fontWeight="bold">
									{t('signUp.texts.email')}
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
									{t('signUp.texts.password')}
								</Typography>
								<TextField
									name="password"
									onChange={formik.handleChange}
									error={formik.touched.password && Boolean(formik.errors.password)}
									helperText={formik.touched.password && formik.errors.password}
									sx={{ pb: '20px' }}
									inputProps={{
										'data-cy': 'password',
										maxLength: 255
									}}
									size="small"
									placeholder="Password"
								/>
								<Typography variant="subtitle1" fontWeight="bold">
									{t('signUp.texts.confirmPassword')}
								</Typography>
								<FormControl sx={styles.pb30}>
									<OutlinedInput
										name="confirmPassword"
										id="outlined-adornment-confirmPassword"
										type={showPassword ? 'text' : 'password'}
										onChange={formik.handleChange}
										error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
										endAdornment={
											<InputAdornment position="end">
												<IconButton
													aria-label="toggle confirmPassword visibility"
													onClick={handleClickShowPassword}
													edge="end"
												>
													{showPassword ? <Visibility /> : <VisibilityOff />}
												</IconButton>
											</InputAdornment>
										}
										inputProps={{
											'data-cy': 'confirmPassword',
											maxLength: 255
										}}
										size="small"
										placeholder="Confirm Password"
									/>
									{formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword) && (
										<FormHelperText error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}>
											{formik.touched.confirmPassword && formik.errors.confirmPassword}
										</FormHelperText>
									)}
								</FormControl>
								<LoadingButton variant="contained" type="submit" size="large" data-cy="signUp" loading={isLoading}>
									{t('signUp.buttons.signUp')}
								</LoadingButton>
							</FormControl>
						</form>
						<Typography variant="body2" sx={styles.signInText} fontWeight={500} align='center'>
							{ "Already have an account? " }
							<Link href="#" onClick={handleClickLink}> Login </Link>
						</Typography>
					</Paper>
				</Grid>
			</Grid>
		</SignInLayout>
	)
}

import * as yup from 'yup'
import i18n from 'src/locales/i18n'

const validationSchema = yup.object({
	name: yup
		.string()
		.required(i18n.t('default.errors.blank', { name: 'Email' }) || '')
		.max(255, i18n.t('default.errors.tooLong', { name: 'Email', number: 255 }) || ''),
	email: yup
		.string()
		.email()
		.required(i18n.t('default.errors.blank', { name: 'Email' }) || '')
		.max(255, i18n.t('default.errors.tooLong', { name: 'Email', number: 255 }) || ''),
	password: yup
		.string()
		.required(i18n.t('default.errors.blank', { name: 'Password' }) || '')
		.max(255, i18n.t('default.errors.tooLong', { name: 'Password', number: 255 }) || ''),
	confirmPassword: yup
		.string()
		.required(i18n.t('default.errors.blank', { name: 'Confirm Password' }) || '')
		.max(255, i18n.t('default.errors.tooLong', { name: 'Confirm Password', number: 255 }) || '')
		.oneOf([yup.ref('password')], i18n.t('default.errors.notmatch', { name: 'Password', name2: 'Confirm Password' }) || '')
})

export default validationSchema

import * as yup from 'yup'
import i18n from 'src/locales/i18n'

const validationSchema = yup.object({
	email: yup
		.string()
		.email()
		.required(i18n.t('default.errors.blank', { name: 'Email' }) || '')
		.max(255, i18n.t('default.errors.tooLong', { name: 'Email', number: 255 }) || ''),
	password: yup
		.string()
		.required(i18n.t('default.errors.blank', { name: 'Password' }) || '')
		.max(255, i18n.t('default.errors.tooLong', { name: 'Password', number: 255 }) || '')
})

export default validationSchema

import * as Yup from 'yup'
import i18n from '@/i18n'

export default Yup.object().shape({
  username: Yup.string()
    .min(3, i18n.t('fields.range', {min: 3, max: 20}))
    .max(20, i18n.t('fields.range', {min: 3, max: 20}))
    .required(i18n.t('fields.requered')),
  password: Yup.string()
    .min(6, i18n.t('fields.min', {min: 6}))
    .required(i18n.t('fields.requered')),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], i18n.t('fields.match'))
})

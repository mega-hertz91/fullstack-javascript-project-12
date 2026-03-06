import * as Yup from 'yup'
import i18n from '@/i18n'

export default Yup.object().shape({
  body: Yup.string()
    .min(1, i18n.t('fields.range', { min: 1, max: 1000 }))
    .max(1000, i18n.t('fields.range', { min: 1, max: 1000 }))
    .required(i18n.t('fields.requered'))
    .trim(i18n.t('fields.requered')),
})
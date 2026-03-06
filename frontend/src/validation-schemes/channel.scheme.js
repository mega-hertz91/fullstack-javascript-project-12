import * as Yup from 'yup'
import i18n from '@/i18n'

export default Yup.object().shape({
  name: Yup.string()
    .required(i18n.t('fields.requered'))
    .min(3, i18n.t('fields.range', { min: 3, max: 20 }))
    .max(20, i18n.t('fields.range', { min: 3, max: 20 })),
})

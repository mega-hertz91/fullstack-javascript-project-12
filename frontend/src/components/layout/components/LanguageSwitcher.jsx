import { useTranslation } from 'react-i18next'
import { Button, ButtonGroup } from 'react-bootstrap'

const LanguageSwitcher = ({ className }) => {
  const { i18n } = useTranslation()

  const handleChangeLanguage = async (language) => {
    await i18n.changeLanguage(language)
  }

  return (
    <ButtonGroup size="sm" className={className}>
      {i18n.languages.sort().map((language) => (
        <Button
          key={language}
          variant={i18n.language === language ? 'dark' : 'outline-dark'}
          onClick={(language) => handleChangeLanguage(language)}
        >
          {language}
        </Button>
      ))}
    </ButtonGroup>
  )
}

export default LanguageSwitcher

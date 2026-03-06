import { useState } from 'react'
import { Modal, Button, Spinner } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

/**
 * onClose - function to close the modal, passed from SimpleModal
 * onLogout - function to perform logout action, passed from parent component
 */
const LogoutModal = ({ onClose, onLogout }) => {
  const { t } = useTranslation()
  const [isLoading, setLoading] = useState(false)

  const handleLogoutClick = async () => {
    setLoading(true)
    await onLogout()
    setLoading(false)
  }

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>{t('auth.logoutConfirmTitile')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{t('auth.logoutConfirmQuestion')}</Modal.Body>
      <Modal.Footer>
        <Button variant="light" onClick={onClose}>
          {t('formAction.cancel')}
        </Button>
        <Button variant="primary" onClick={handleLogoutClick} disabled={isLoading}>
          { isLoading && <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" className="me-2" /> }
          {t('auth.logout')}
        </Button>
      </Modal.Footer>
    </>
  )
}

export default LogoutModal

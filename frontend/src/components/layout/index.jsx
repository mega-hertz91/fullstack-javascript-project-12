import { useSelector, useDispatch } from 'react-redux'
import { logout } from '@/store/reducres/auth.reducer'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

/**
 * Import Bootstrap components
 * You can customize the layout and styling as needed
 */
import { Row, Col, Button, Container } from 'react-bootstrap'
import LanguageSwitcher from './components/LanguageSwitcher'
import { AppModal, LogoutModal } from '@/components/modals/'
import { toast } from 'react-toastify'

const BaseLayout = ({ children }) => {
  const { username } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap()
    }
    catch (error) {
      toast.error(t(error.message))
    }
  }

  return (
    <Container fluid className="h-100">
      <Row className="justify-content-between h-100">
        <Col sm={12} className="flex-grow-1">
          <header className="py-2 d-flex align-items-center justify-content-end border-bottom">
            <h1 className="me-auto">
              <Link to="/">Hexlet Chat</Link>
            </h1>
            {username && (
              <AppModal
                trigger={(
                  <Button variant="primary" size="sm" className="me-auto">
                    {t('auth.logout')}
                  </Button>
                )}
              >
                <LogoutModal onLogout={handleLogout} />
              </AppModal>
            )}
            <LanguageSwitcher className="ms-2" />
          </header>
        </Col>
        <Col
          sm={12}
          className="flex-shrink-0 py-4"
          style={{ minHeight: '86vh' }}
        >
          <main className="h-100 px-2">{children}</main>
        </Col>
        <Col sm={12} className="flex-grow-1">
          <footer className="base-layout__footer">
            <p>
              &copy;
              {' '}
              {new Date().getFullYear()}
              {' '}
              Hexlet Chat.
              {' '}
              {t('common.allRightReserved')}
              .
            </p>
          </footer>
        </Col>
      </Row>
    </Container>
  )
}

export default BaseLayout

import { LoginForm } from '@/components/forms'
import { login } from '@/store/reducres/auth.reducer'
import { useDispatch } from 'react-redux'
import { ResponseStatus } from '@/constants'
import { toast } from 'react-toastify'

import BaseLayout from '@/components/layout'
import { Col } from 'react-bootstrap'

/**
 * This is the login page component. It uses the BaseLayout to provide a consistent layout for the application and includes the LoginForm component for user authentication.
 */
const Page = () => {
  const dispatch = useDispatch()

  const handleLogin = async (values, { setFieldError, resetForm }) => {
    try {
      await dispatch(login(values)).unwrap()
      resetForm()
    } catch ({ name, message, statusCode = 0 }) {
      if (name === 'RequestError' && statusCode === ResponseStatus.UNAUTHORIZED) {
        setFieldError('username', ' ')
        setFieldError('password', message)
      }

      if (name === 'RequestError' && statusCode === 0) {
        toast.error(message)
      }
    }
  }

  return (
    <BaseLayout>
      <Col xl={5} lg={6} md={8} sm={12} className="mx-auto d-flex align-items-center h-100">
        <LoginForm onSubmit={handleLogin} />
      </Col>
    </BaseLayout>
  )
}

export default Page

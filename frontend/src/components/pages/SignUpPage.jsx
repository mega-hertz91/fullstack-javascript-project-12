import { useDispatch } from 'react-redux'
import { signUp } from '@/store/reducres/auth.reducer'
import { signupScheme } from '@/validation-schemes'
import { RegisterForm } from '@/components/forms'
import { ResponseStatus } from '@/constants/'

import { Col } from 'react-bootstrap'
import BaseLayout from '@/components/layout'
import { toast } from 'react-toastify'

/**
 * This is the sign up page component. It uses the BaseLayout to provide a consistent layout for the application and includes the RegisterForm component for user registration.
 */

const Page = () => {
  const dispatch = useDispatch()

  const signupHandler = async ({ username, password }, { setFieldError, resetForm }) => {
    try {
      await dispatch(signUp({ username, password })).unwrap()
      resetForm()
    }
    catch ({ name, message, statusCode = 0 }) {
      if (name === 'RequestError' && statusCode === ResponseStatus.CONFLICT) {
        setFieldError('username', ' ')
        setFieldError('password', ' ')
        setFieldError('confirmPassword', message)
      }

      if (name === 'RequestError' && statusCode === 0) {
        toast.error(message)
      }
    }
  }

  return (
    <BaseLayout>
      <Col
        xl={5}
        lg={6}
        md={8}
        sm={12}
        className="mx-auto h-100 align-items-center d-flex"
      >
        <RegisterForm
          onSubmit={signupHandler}
          validationScheme={signupScheme}
        />
      </Col>
    </BaseLayout>
  )
}

export default Page

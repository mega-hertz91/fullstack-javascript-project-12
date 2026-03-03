import { LoginForm } from '@/components/forms';
import { login } from "@/store/reducres/auth.reducer";
import { loginScheme } from "@/validation-schemes";
import { useDispatch } from 'react-redux';
import { ResponseStatus } from "@/constants";
import { addAlert } from "@/store/reducres/alert.reducer";
import { createDangerAlert } from "@/utils/alert.util";



import BaseLayout from "@/components/layout";
import { Col, Container, Row } from "react-bootstrap";

/**
 * This is the login page component. It uses the BaseLayout to provide a consistent layout for the application and includes the LoginForm component for user authentication.
 */
const Page = () => {
  const dispatch = useDispatch();

  const handleLogin = async (values, { setFieldError, resetForm }) => {
    try {
      await dispatch(login(values)).unwrap();
      resetForm();
    } catch ({ name, message, statusCode = 0 }) {
      if (name === "RequestError" && statusCode === ResponseStatus.UNAUTHORIZED) {
        setFieldError("password", message);
        setFieldError("username", message);
      }

      if (name === "RequestError" && statusCode === 0) {
        dispatch(addAlert(createDangerAlert("Network error: " + message)));
      }
    }
  };

  return (
    <BaseLayout>
      <Container className="py-5">
        <Row>
          <Col xl={5} lg={6} md={8} sm={12} className="mx-auto">
            <LoginForm onSubmit={handleLogin} validationScheme={loginScheme} />
          </Col>
        </Row>
      </Container>
    </BaseLayout>
  );
}

export default Page;
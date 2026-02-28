import { useDispatch } from "react-redux";
import { signUp } from "@/store/reducres/auth.reducer";
import { signupScheme } from "@/validation-schemes";
import { RegisterForm } from "@/components/forms";
import { addAlert } from "@/store/reducres/alert.reducer";
import { ResponseStatus } from "@/constants/";
import { createDangerAlert } from "@/utils/alert.util";

import { Container, Row, Col } from "react-bootstrap";
import BaseLayout from "@/components/layout";

/**
 * This is the sign up page component. It uses the BaseLayout to provide a consistent layout for the application and includes the RegisterForm component for user registration.
 */

const Page = () => {
  const dispatch = useDispatch();

  const signupHandler = async ({ username, password }, { setFieldError, resetForm }) => {
    try {
      await dispatch(signUp({ username, password })).unwrap();
      resetForm();
    } catch ({name, message, statusCode = 0}) {
      if (name === "RequestError" && statusCode === ResponseStatus.CONFLICT) {
        setFieldError('username', message);
      }

      if (name === "RequestError" && statusCode === 0) {
        dispatch(addAlert(createDangerAlert('Network error: ' + message)));
      }
    }
  };

  return (
    <BaseLayout>
      <Container className="py-5">
        <Row>
          <Col xl={4} lg={6} md={8} sm={12} className="mx-auto">
            <RegisterForm
              onSubmit={signupHandler}
              validationScheme={signupScheme}
            />
          </Col>
        </Row>
      </Container>
    </BaseLayout>
  );
};

export default Page;

import { useFormik } from "formik";
import Form from "react-bootstrap/Form";
import { Button, FormGroup, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const RegisterForm = ({ onSubmit, validationScheme }) => {
  const { t } = useTranslation();

  const registerFormik = useFormik({
    initialValues: {
      username: "",
      password: "",
      confirmPassword: "", // Add repeat password field
    },
    validationSchema: validationScheme,
    onSubmit,
  });

  return (
    <Form onSubmit={registerFormik.handleSubmit} className="p-3 border rounded">
      <h1 className="fs-2">{t("auth.signUp")}</h1>
      <Form.Group>
        <Form.Label htmlFor="username">{t('fields.login')}</Form.Label>
        <Form.Control
          id="username"
          type="text"
          name="username"
          value={registerFormik.values.username}
          onChange={registerFormik.handleChange}
          isInvalid={
            !!registerFormik.errors.username && registerFormik.touched.username
          }
        />
        <Form.Control.Feedback type="invalid">
          {registerFormik.errors.username}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor="password">{t("fields.password")}</Form.Label>
        <Form.Control
          id="password"
          type="password"
          name="password"
          value={registerFormik.values.password}
          onChange={registerFormik.handleChange}
          isInvalid={
            !!registerFormik.errors.password && registerFormik.touched.password
          }
        />
        <Form.Control.Feedback type="invalid">
          {registerFormik.errors.password}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor="confirmPassword">
          {t("fields.confirmPassword")}
        </Form.Label>
        <Form.Control
          id="confirmPassword"
          type="password"
          name="confirmPassword"
          value={registerFormik.values.confirmPassword}
          onChange={registerFormik.handleChange}
          isInvalid={
            !!registerFormik.errors.confirmPassword &&
            registerFormik.touched.confirmPassword
          }
        />
        <Form.Control.Feedback type="invalid">
          {registerFormik.errors.confirmPassword}
        </Form.Control.Feedback>
      </Form.Group>
      <FormGroup className="pt-3">
        <Link to="/login">
          {t("auth.existAccount")}? {t("auth.signIn")}
        </Link>
      </FormGroup>
      <FormGroup className="pt-3">
        <Button
          disabled={!registerFormik.isValid || registerFormik.isSubmitting}
          type="submit"
        >
          {registerFormik.isSubmitting && (
            <Spinner animation="border" size="sm" className="me-2" />
          )}
          {t("auth.signUp")}
        </Button>
      </FormGroup>
    </Form>
  );
};

export default RegisterForm;

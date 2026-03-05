import { useFormik } from "formik";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

/**
 * Styles * You can customize the styles as needed
 */
import { Button, FormGroup, Spinner } from "react-bootstrap";
import Form from "react-bootstrap/Form";

const LoginForm = ({ onSubmit }) => {
  const { t } = useTranslation();

  const loginFormik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit,
  });

  return (
    <Form
      onSubmit={loginFormik.handleSubmit}
      className="p-3 border rounded w-100"
    >
      <h1 className="fs-2">{t("auth.signIn")}</h1>
      <Form.Group>
        <Form.Label htmlFor="username">{t("fields.nickName")}</Form.Label>
        <Form.Control
          id="username"
          type="text"
          name="username"
          required
          value={loginFormik.values.username}
          onChange={loginFormik.handleChange}
          isInvalid={
            !!loginFormik.errors.username && loginFormik.touched.username
          }
        />
        <Form.Control.Feedback type="invalid">
          {loginFormik.errors.username}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor="password">{t("fields.password")}</Form.Label>
        <Form.Control
          id="password"
          type="password"
          name="password"
          required
          value={loginFormik.values.password}
          onChange={loginFormik.handleChange}
          isInvalid={
            !!loginFormik.errors.password && loginFormik.touched.password
          }
        />
        <Form.Control.Feedback type="invalid">
          {loginFormik.errors.password}
        </Form.Control.Feedback>
      </Form.Group>
      <FormGroup className="pt-3">
        <p>
          {t("auth.notAccount")}? <Link to="/signup">{t("auth.signUp")}</Link>
        </p>
      </FormGroup>
      <FormGroup className="pt-3">
        <Button
          disabled={loginFormik.isSubmitting}
          type="submit"
          variant="primary"
        >
          {loginFormik.isSubmitting && (
            <Spinner animation="border" size="sm" className="me-2" />
          )}
          {t("auth.signIn")}
        </Button>
      </FormGroup>
    </Form>
  );
};

export default LoginForm;

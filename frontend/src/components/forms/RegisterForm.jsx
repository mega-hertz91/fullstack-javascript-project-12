import { useFormik } from "formik";
import { useEffect, useRef, useCallback } from "react";
import Form from "react-bootstrap/Form";
import { Button, FormGroup, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const RegisterForm = ({ onSubmit, validationScheme }) => {
  const { t } = useTranslation();
  const firstInputRef = useRef(null);

  const onFocusFirstInput = useCallback(() => {
    if (firstInputRef.current) {
      firstInputRef.current.focus();
    }
  }, []);
  
  useEffect(() => {
    onFocusFirstInput();
  }, [onFocusFirstInput]);

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
    <Form
      onSubmit={registerFormik.handleSubmit}
      className="p-4 border rounded w-100"
    >
      <h1 className="fs-2">{t("auth.signUp")}</h1>
      <Form.Group>
        <Form.Label htmlFor="username">{t("fields.login")}</Form.Label>
        <Form.Control
          ref={firstInputRef}
          id="username"
          type="text"
          name="username"
          value={registerFormik.values.username}
          onChange={registerFormik.handleChange}
          onBlur={registerFormik.handleBlur}
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
          onBlur={registerFormik.handleBlur}
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
          onBlur={registerFormik.handleBlur}
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
        <Button disabled={registerFormik.isSubmitting} type="submit">
          {registerFormik.isSubmitting && (
            <Spinner animation="border" size="sm" className="me-2" />
          )}
          {t("auth.signUpProcess")}
        </Button>
      </FormGroup>
    </Form>
  );
};

export default RegisterForm;

import { useFormik } from 'formik';
import Form from 'react-bootstrap/Form';
import { Button, FormGroup, Spinner } from "react-bootstrap";
import { Link } from 'react-router-dom';

const RegisterForm = ({ onSubmit, validationScheme }) => {
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
        className="p-3 border rounded w-50 mx-auto"
      >
        <h1 className="fs-2">Sing up</h1>
        <Form.Group>
          <Form.Label htmlFor="username">Login</Form.Label>
          <Form.Control
            id="username"
            type="text"
            name="username"
            value={registerFormik.values.username}
            onChange={registerFormik.handleChange}
            isInvalid={
              !!registerFormik.errors.username &&
              registerFormik.touched.username
            }
          />
          <Form.Control.Feedback type="invalid">
            {registerFormik.errors.username}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="password">Password</Form.Label>
          <Form.Control
            id="password"
            type="password"
            name="password"
            value={registerFormik.values.password}
            onChange={registerFormik.handleChange}
            isInvalid={
              !!registerFormik.errors.password &&
              registerFormik.touched.password
            }
          />
          <Form.Control.Feedback type="invalid">
            {registerFormik.errors.password}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="confirmPassword">Repeat password</Form.Label>
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
          <Link to="/login">Already have an account? Sign in</Link>
        </FormGroup>
        <FormGroup className="pt-3">
          <Button
            disabled={!registerFormik.isValid || registerFormik.isSubmitting}
            type="submit"
          >
            {registerFormik.isSubmitting && (
              <Spinner animation="border" size="sm" className="me-2" />
            )}
            Sign up
          </Button>
        </FormGroup>
      </Form>
    );
};

export default RegisterForm;
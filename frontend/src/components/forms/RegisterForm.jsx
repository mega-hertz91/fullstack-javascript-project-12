import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { signUp } from '../../store/reducres/auth.reducer';
import { Button, FormGroup } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';

// TODO: add form validation and error handling
const RegisterForm = () => {
    const dispatch = useDispatch();

    const registerFormik = useFormik({
      initialValues: {
        username: "",
        password: "",
        repeatPassword: "", // Add repeat password field
      },
      onSubmit: async ({username, password}, { setFieldError }) => {
        try {
            await dispatch(signUp({username, password})).unwrap();
        } catch (error) {
            setFieldError("password", error.message || "Login failed"); // TODO: set server error to the form state and display it in the form
        }
      },
    });

    return (
      <Form
        onSubmit={registerFormik.handleSubmit}
        className="p-3 border rounded w-50 mx-auto"
      >
        <h1 className="fs-2">Sing up</h1>
        <Form.Group controlId="login">
          <Form.Label htmlFor="username">Login</Form.Label>
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
        <Form.Group controlId="password">
          <Form.Label htmlFor="password">Password</Form.Label>
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
        <Form.Group controlId="repeatPassword">
          <Form.Label htmlFor="repeatPassword">Repeat password</Form.Label>
          <Form.Control
            id="repeatPassword"
            type="password"
            name="repeatPassword"
            value={registerFormik.values.repeatPassword}
            onChange={registerFormik.handleChange}
            isInvalid={
              !!registerFormik.errors.repeatPassword && registerFormik.touched.repeatPassword
            }
          />
          <Form.Control.Feedback type="invalid">
            {registerFormik.errors.repeatPassword}
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
            Sign up
          </Button>
        </FormGroup>
      </Form>
    );
};

export default RegisterForm;
import { useFormik } from 'formik';
import { useContext } from 'react';
import { AuthContext } from '../../context';
import { loginScheme } from '../../validation-schemes'
import { Button, FormGroup } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';

const LoginForm = () => {
    const { login } = useContext(AuthContext);

    const loginFormik = useFormik({
      initialValues: {
        username: "",
        password: "",
      },
      validationSchema: loginScheme,
      onSubmit: async (values, { setFieldError }) => {
        try {
            await login(values);
        } catch (error) {
            setFieldError("password", error.message || "Invalid login or password");
        }
      },
    });

    return (
      <Form onSubmit={loginFormik.handleSubmit} className="p-3 border rounded w-100">
        <Form.Group controlId="login">
          <Form.Label>Login</Form.Label>
          <Form.Control
            type="text"
            name="username"
            value={loginFormik.values.username}
            onChange={loginFormik.handleChange}
            isInvalid={!!loginFormik.errors.username && loginFormik.touched.username}
          />
          <Form.Control.Feedback type="invalid">
            {loginFormik.errors.username}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={loginFormik.values.password}
            onChange={loginFormik.handleChange}
            isInvalid={!!loginFormik.errors.password && loginFormik.touched.password}
          />
          <Form.Control.Feedback type="invalid">
            {loginFormik.errors.password}
          </Form.Control.Feedback>
        </Form.Group>
        <FormGroup className='pt-3'>
          <Button disabled={!loginFormik.isValid || loginFormik.isSubmitting} type="submit">Login</Button>
        </FormGroup>
      </Form>
    );
};

export default LoginForm;
import { useFormik } from 'formik';

const LoginForm = () => {
    const loginFormik = useFormik({
      initialValues: {
        login: "",
        password: "",
      },
      onSubmit: (values) => {
        alert(JSON.stringify(values, null, 2));
      },
    });

    return (
        <form onSubmit={loginFormik.handleSubmit}>
            <label htmlFor="login">Login</label>
            <input
                id="login"
                name="login"
                type="text"
                onChange={loginFormik.handleChange}
                value={loginFormik.values.login}
            />
            <label htmlFor="password">Password</label>
            <input
                id="password"
                name="password"
                type="password"
                onChange={loginFormik.handleChange}
                value={loginFormik.values.password}
            />
            <button type="submit">Submit</button>
        </form>
    )
}

export default LoginForm;
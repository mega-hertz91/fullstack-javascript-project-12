import { LoginForm } from '@/components/forms';
import BaseLayout from '@/components/layout';
import { login } from "@/store/reducres/auth.reducer";
import { loginScheme } from "@/validation-schemes";
import { useDispatch } from 'react-redux';


/**
 * This is the login page component. It uses the BaseLayout to provide a consistent layout for the application and includes the LoginForm component for user authentication.
 */
import { Container } from "react-bootstrap";

const Page = () => {
  const dispatch = useDispatch();

    const handleLogin = async (values) => {
      await dispatch(login(values)).unwrap();
    };

    return (
      <BaseLayout>
        <Container className='py-5'>
          <LoginForm onSubmit={handleLogin} validationScheme={loginScheme} />
        </Container>
      </BaseLayout>
    );
}

export default Page;
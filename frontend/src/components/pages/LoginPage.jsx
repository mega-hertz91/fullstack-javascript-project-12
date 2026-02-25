import { LoginForm } from '../forms';
import BaseLayout from '../layout';

/**
 * This is the login page component. It uses the BaseLayout to provide a consistent layout for the application and includes the LoginForm component for user authentication.
 */
import { Container } from "react-bootstrap";

const Page = () => {
    return (
      <BaseLayout>
        <Container className='py-5'>
          <LoginForm />
        </Container>
      </BaseLayout>
    );
}

export default Page;
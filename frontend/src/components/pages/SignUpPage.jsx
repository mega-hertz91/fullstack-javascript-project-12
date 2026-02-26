import { Container } from 'react-bootstrap';
import BaseLayout from '../layout';
import { RegisterForm } from '../forms';

/**
 * This is the sign up page component. It uses the BaseLayout to provide a consistent layout for the application and includes the RegisterForm component for user registration.
 */

const Page = () => {
    return (
      <BaseLayout>
        <Container className='py-5'>
          <RegisterForm />
        </Container>
      </BaseLayout>
    );
};

export default Page;
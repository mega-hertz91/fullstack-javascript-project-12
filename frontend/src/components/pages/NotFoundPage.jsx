import { Container, ButtonGroup, Button } from "react-bootstrap";
import BaseLayout from "@/components/layout";
import { useSelector } from "react-redux";

const Page = () => {
  const { isAuth } = useSelector((state) => state.auth);

  return (
    <BaseLayout>
      <div className="flex flex-col items-center justify-center h-screen mx-auto d-flex flex-column justify-content-center align-items-center h-100">
        <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
        <p className="mt-4 text-lg">
          The page you are looking for does not exist.
        </p>
        <ButtonGroup>
          <Button variant="primary" href="/">
            Go to Home
          </Button>
          {!isAuth && (
            <Button variant="secondary" href="/signup">
              Sign Up
            </Button>
          )}
        </ButtonGroup>
      </div>
    </BaseLayout>
  );
}

export default Page;
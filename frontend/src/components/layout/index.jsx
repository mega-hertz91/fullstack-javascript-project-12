import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/reducres/auth.reducer";
import { Link } from "react-router-dom";

/**  
 * Import Bootstrap components
 * You can customize the layout and styling as needed
 */
import { Container, ButtonGroup, Button, Alert } from "react-bootstrap";
import AlertList from "./components/AlertList";

const BaseLayout = ({ children }) => {
  const { username } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="base-layout h-100 d-flex flex-column">
      <Container>
        <AlertList />
        <header className="py-3 d-flex justify-content-between align-items-center border-bottom">
          <h1>
            <Link to="/">Chat</Link>
          </h1>
          {username && (
            <ButtonGroup aria-label="Basic example">
              <Button variant="light">{username}</Button>
              <Button variant="light" onClick={handleLogout}>
                logout
              </Button>
            </ButtonGroup>
          )}
        </header>
      </Container>
      <Container className="flex-grow-1">
        <main className="base-layout__content h-100">{children}</main>
      </Container>
      <Container>
        <footer className="base-layout__footer">
          <p>&copy; {new Date().getFullYear()} Chat. All rights reserved.</p>
        </footer>
      </Container>
    </div>
  );
};

export default BaseLayout;

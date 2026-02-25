import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/reducres/auth.reducer";

/**  
 * Import Bootstrap components
 * You can customize the layout and styling as needed
 */
import { Container, ButtonGroup, Button } from "react-bootstrap";

const BaseLayout = ({ children }) => {
  const { username } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="base-layout">
      <Container>
        <header className="py-3 d-flex justify-content-between align-items-center border-bottom">
          <h1>Chat</h1>
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
      <Container>
        <main className="base-layout__content">{children}</main>
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

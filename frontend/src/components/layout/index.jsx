import { useSelector, useDispatch } from "react-redux";
import { logout } from "@/store/reducres/auth.reducer";
import { Link } from "react-router-dom";
import { addAlert } from "@/store/reducres/alert.reducer";
import { createDangerAlert } from "@/utils/alert.util";

/**  
 * Import Bootstrap components
 * You can customize the layout and styling as needed
 */
import { Container, Button, Modal } from "react-bootstrap";
import AlertList from "./components/AlertList";
import { AppModal, LogoutModal } from "@/components/modals/";

const BaseLayout = ({ children }) => {
  const { username } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap();
    } catch (error) {
      dispatch(addAlert(createDangerAlert("Message: " + error.message)));
    }
  };

  return (
    <div className="base-layout h-100 d-flex flex-column">
      <Container>
        <AlertList />
        <header className="py-3 d-flex justify-content-between align-items-center border-bottom">
          <h1>
            <Link to="/">Hexlet Chat</Link>
          </h1>
          {username && (
            <div className="d-flex align-items-center gap-3">
              <AppModal trigger={<Button variant="primary">Logout</Button>}>
                <LogoutModal onLogout={handleLogout} />
              </AppModal>
            </div>
          )}
        </header>
      </Container>
      <Container className="flex-grow-1">
        <main className="base-layout__content h-100">{children}</main>
      </Container>
      <Container>
        <footer className="base-layout__footer">
          <p>&copy; {new Date().getFullYear()} Hexlet Chat. All rights reserved.</p>
        </footer>
      </Container>
    </div>
  );
};

export default BaseLayout;

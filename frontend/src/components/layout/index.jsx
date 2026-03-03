import { useSelector, useDispatch } from "react-redux";
import { logout } from "@/store/reducres/auth.reducer";
import { Link } from "react-router-dom";
import { addAlert } from "@/store/reducres/alert.reducer";
import { createDangerAlert } from "@/utils/alert.util";
import { useTranslation } from "react-i18next";

/**  
 * Import Bootstrap components
 * You can customize the layout and styling as needed
 */
import { Container, Button } from "react-bootstrap";
import AlertList from "./components/AlertList";
import LanguageSwitcher from "./components/LanguageSwitcher";
import { AppModal, LogoutModal } from "@/components/modals/";

const BaseLayout = ({ children }) => {
  const { username } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap();
    } catch (error) {
      dispatch(addAlert(createDangerAlert(t("auth.logoutError") + ": " + error.message)));
    }
  };

  return (
    <div className="base-layout h-100 d-flex flex-column">
      <Container>
        <AlertList />
        <header className="py-2 d-flex align-items-center justify-content-end border-bottom">
          <h1 className="me-auto">
            <Link to="/">Hexlet Chat</Link>
          </h1>
          {username && (
            <AppModal
              trigger={
                <Button variant="primary" size="sm" className="me-auto"> 
                  {t("auth.logout")}
                </Button>
              }
            >
              <LogoutModal onLogout={handleLogout} />
            </AppModal>
          )}
          <LanguageSwitcher className="ms-2" />
        </header>
      </Container>
      <Container className="flex-grow-1">
        <main className="base-layout__content h-100">{children}</main>
      </Container>
      <Container>
        <footer className="base-layout__footer">
          <p>
            &copy; {new Date().getFullYear()} Hexlet Chat.{" "}
            {t("common.allRightReserved")}.
          </p>
        </footer>
      </Container>
    </div>
  );
};

export default BaseLayout;

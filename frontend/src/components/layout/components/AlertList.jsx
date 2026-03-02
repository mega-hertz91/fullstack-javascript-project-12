import { useSelector, useDispatch } from "react-redux";
import {
  selectors as alertSelectors,
  removeAlert,
} from "@/store/reducres/alert.reducer";

import { Alert, Container } from "react-bootstrap";

const AlertList = () => {
  const dispatch = useDispatch();
  const alerts = useSelector((state) => alertSelectors.selectAll(state));

  return (
    <Container className="position-fixed" style={{ top: "5%", zIndex: 9999 }}>
      <ul className="list-unstyled m-0 p-0 w-50 mx-auto">
        {alerts.length > 0 &&
          alerts.map((alert) => (
            <li key={alert.id}>
              <Alert
                variant={alert.type}
                className="mb-1 py-1 position-relative"
              >
                {alert.message}
                <button
                  type="button"
                  className="btn-close position-absolute top-0 end-0 m-1"
                  aria-label="Close"
                  onClick={() => dispatch(removeAlert(alert.id))}
                ></button>
              </Alert>
            </li>
          ))}
      </ul>
    </Container>
  );
};

export default AlertList;

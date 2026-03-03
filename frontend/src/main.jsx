import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import ThemeProvider from "react-bootstrap/ThemeProvider";
import { store } from "./store";
import { Provider } from "react-redux";
import { I18nextProvider } from "react-i18next";

import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import i18n from "./i18n";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider
        breakpoints={["xxl", "xl", "lg", "md", "sm"]}
        minBreakpoint="sm"
      >
        <I18nextProvider i18n={i18n} defaultNS={"translation"}>
          <App />
        </I18nextProvider>
      </ThemeProvider>
    </Provider>
  </StrictMode>,
);
